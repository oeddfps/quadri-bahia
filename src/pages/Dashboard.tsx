import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, DollarSign, TrendingUp, Clock, TrendingDown, Bike, Download, CalendarDays, Filter, ChevronDown, ChevronUp, Check, X } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { toast } from "sonner";
import { format, startOfWeek, addDays, isSameDay, subDays, startOfYear, eachMonthOfInterval, endOfYear, startOfMonth, endOfMonth, subMonths, getYear, eachDayOfInterval, isWithinInterval, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { downloadCsv } from "@/lib/csv";

interface Metricas {
  total_reservas: number;
  total_arrecadado: number;
  total_pago: number;
  total_pendente: number;
  total_confirmadas: number;
  reservas_hoje: number;
  total_hoje: number;
  reservas_semana: number;
  total_semana: number;
  reservas_mes: number;
  total_mes: number;
}

interface Passeio {
  id: number;
  nome: string;
  tem_horario: boolean;
  horarios_disponiveis: string[] | null;
}

interface Reserva {
  id: string;
  responsavel: string;
  participantes: string;
  passeio_id: number;
  data: string;
  valor: number;
  valor_pago: number;
  status_pagamento: string;
  confirmado: boolean;
  data_pagamento: string | null;
  hotel: string | null;
  apartamento: string | null;
  telefone: string | null;
  codigo_moto: string | null;
}

interface Pagamento {
  id: string;
  reserva_id: string;
  data_pagamento: string;
  valor_pago: number;
  created_at: string;
}

interface FluxoCaixaDiario {
  data: Date;
  dataFormatada: string;
  passeiosDoDia: number; // Pagamentos de passeios que aconteceram naquele dia (ou pagamentos atrasados computados no dia do passeio)
  qtdPasseiosDoDia: number;
  adiantamentos: number; // Pagamentos de passeios futuros (parciais/antecipados)
  qtdAdiantamentos: number;
  aReceber: number;
  qtdAReceber: number;
  total: number;
  reservasRecebidas: Reserva[];
  reservasAReceber: Reserva[];
  reservasAdiantadas: Reserva[];
  pagamentosRecebidos: Pagamento[];
  pagamentosDoDia: Pagamento[];
  pagamentosAdiantados: Pagamento[];
}

type PeriodoFiltro = "ultimos7" | "ultimos30" | "esteMes" | "proximos30" | "customizado";

// Função auxiliar para parsear data sem problema de fuso horário (fora do componente)
const parseLocalDate = (dateStr: string) => {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
};

export default function Dashboard() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [passeios, setPasseios] = useState<Passeio[]>([]);
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [periodoFiltro, setPeriodoFiltro] = useState<PeriodoFiltro>("ultimos30");
  const [motoPeriodoFiltro, setMotoPeriodoFiltro] = useState<"dia" | "semana" | "mes" | "total" | "personalizado">("mes");
  const [motoDataInicio, setMotoDataInicio] = useState<Date | undefined>(subDays(new Date(), 7));
  const [motoDataFim, setMotoDataFim] = useState<Date | undefined>(new Date());
  const [dataInicio, setDataInicio] = useState<Date | undefined>(subDays(new Date(), 29));
  const [dataFim, setDataFim] = useState<Date | undefined>(new Date());
  const [diaDetalhes, setDiaDetalhes] = useState<FluxoCaixaDiario | null>(null);
  const [fluxoExpandido, setFluxoExpandido] = useState(true);
  const [reservaPagando, setReservaPagando] = useState<Reserva | null>(null);
  const [dataPagamentoSelecionada, setDataPagamentoSelecionada] = useState<Date | undefined>(new Date());
  const [reservaDetalhe, setReservaDetalhe] = useState<Reserva | null>(null);

  // Calcula métricas diretamente dos dados (lógica correta de caixa)
  const metricas = useMemo(() => {
    // Total de reservas
    const total_reservas = reservas.length;
    
    // Valor total de todas as reservas
    const total_arrecadado = reservas.reduce((sum, r) => sum + r.valor, 0);
    
    // Já Recebido: SOMA de todos os pagamentos na tabela quadribahia_pagamentos
    // Representa o dinheiro que JÁ ENTROU no caixa
    const total_pago = pagamentos.reduce((sum, p) => sum + p.valor_pago, 0);
    
    // A Receber: SOMA de (valor - valor_pago) onde status != 'pago' e há saldo
    // Representa o dinheiro que AINDA VAI ENTRAR no caixa
    const total_pendente = reservas
      .filter(r => r.status_pagamento !== 'pago' && (r.valor - r.valor_pago) > 0)
      .reduce((sum, r) => sum + (r.valor - r.valor_pago), 0);
    
    // Confirmadas
    const total_confirmadas = reservas.filter(r => r.confirmado).length;
    
    // Reservas de hoje
    const hoje = new Date();
    const reservas_hoje = reservas.filter(r => isSameDay(parseLocalDate(r.data), hoje)).length;
    const total_hoje = reservas
      .filter(r => isSameDay(parseLocalDate(r.data), hoje))
      .reduce((sum, r) => sum + r.valor, 0);
    
    // Reservas da semana
    const inicioSemana = startOfWeek(hoje, { locale: ptBR });
    const fimSemana = addDays(inicioSemana, 6);
    const reservasSemana = reservas.filter(r => {
      const dataReserva = parseLocalDate(r.data);
      return dataReserva >= inicioSemana && dataReserva <= fimSemana;
    });
    const reservas_semana = reservasSemana.length;
    const total_semana = reservasSemana.reduce((sum, r) => sum + r.valor, 0);
    
    // Reservas do mês
    const inicioMes = startOfMonth(hoje);
    const fimMes = endOfMonth(hoje);
    const reservasMes = reservas.filter(r => {
      const dataReserva = parseLocalDate(r.data);
      return dataReserva >= inicioMes && dataReserva <= fimMes;
    });
    const reservas_mes = reservasMes.length;
    const total_mes = reservasMes.reduce((sum, r) => sum + r.valor, 0);

    return {
      total_reservas,
      total_arrecadado,
      total_pago,
      total_pendente,
      total_confirmadas,
      reservas_hoje,
      total_hoje,
      reservas_semana,
      total_semana,
      reservas_mes,
      total_mes
    };
  }, [reservas, pagamentos]);

  useEffect(() => {
    loadData();

    const channelReservas = supabase
      .channel('dashboard-reservas-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'quadribahia_reservas'
        },
        () => {
          loadData();
        }
      )
      .subscribe();

    const channelPagamentos = supabase
      .channel('dashboard-pagamentos-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'quadribahia_pagamentos'
        },
        () => {
          loadData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channelReservas);
      supabase.removeChannel(channelPagamentos);
    };
  }, []);

  // Atualiza datas baseado no filtro selecionado
  useEffect(() => {
    const hoje = new Date();
    switch (periodoFiltro) {
      case "ultimos7":
        setDataInicio(subDays(hoje, 6));
        setDataFim(hoje);
        break;
      case "ultimos30":
        // Mostra o mês completo atual
        setDataInicio(startOfMonth(hoje));
        setDataFim(endOfMonth(hoje));
        break;
      case "esteMes":
        setDataInicio(startOfMonth(hoje));
        setDataFim(endOfMonth(hoje));
        break;
      case "proximos30":
        setDataInicio(hoje);
        setDataFim(addDays(hoje, 29));
        break;
      // customizado: não altera as datas, usuário escolhe manualmente
    }
  }, [periodoFiltro]);

  async function loadData() {
    try {
      const [reservasRes, passeiosRes, pagamentosRes] = await Promise.all([
        supabase.from("quadribahia_reservas").select("*").order("data", { ascending: false }),
        supabase.from("quadribahia_passeios").select("*").eq("ativo", true).order("nome"),
        supabase.from("quadribahia_pagamentos").select("*").order("data_pagamento", { ascending: false })
      ]);

      if (reservasRes.error) throw new Error(`reservas: ${reservasRes.error.message}`);
      if (passeiosRes.error) throw new Error(`passeios: ${passeiosRes.error.message}`);
      if (pagamentosRes.error) throw new Error(`pagamentos: ${pagamentosRes.error.message}`);

      // Supabase retorna numeric como string às vezes; normalizar para number
      const reservasData = (reservasRes.data || []).map((r: any) => ({
        ...r,
        valor: Number(r.valor) || 0,
        valor_pago: Number(r.valor_pago) || 0,
      })) as Reserva[];

      const pagamentosData = (pagamentosRes.data || []).map((p: any) => ({
        ...p,
        valor_pago: Number(p.valor_pago) || 0,
      })) as Pagamento[];


      setReservas(reservasData);
      setPasseios(passeiosRes.data || []);
      setPagamentos(pagamentosData);

    } catch (error: any) {
      toast.error("Erro ao carregar dados: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(value || 0);
  };


  // Calcula o fluxo de caixa diário usando tabela de pagamentos
  // LÓGICA: Pagamentos de passeios passados ou do dia -> computar na DATA DO PASSEIO
  //         Pagamentos de passeios futuros (adiantamentos) -> computar na DATA DO PAGAMENTO
  const fluxoCaixaDiario = useMemo(() => {
    if (!dataInicio || !dataFim) return [];

    const dias = eachDayOfInterval({ start: dataInicio, end: dataFim });
    
    return dias.map(dia => {
      // PAGAMENTOS DO DIA: pagamentos onde a data do passeio == dia (independente de quando foi pago)
      // Inclui pagamentos atrasados que foram registrados depois
      const pagamentosDoDia = pagamentos.filter(p => {
        const reserva = reservas.find(r => r.id === p.reserva_id);
        if (!reserva) return false;
        const dataPasseio = parseLocalDate(reserva.data);
        const dataPagamento = parseLocalDate(p.data_pagamento);
        // Se pagamento foi feito no dia do passeio ou depois, computa no dia do passeio
        return dataPagamento >= dataPasseio && isSameDay(dataPasseio, dia);
      });

      // ADIANTAMENTOS: pagamentos feitos ANTES do passeio, computados na data do pagamento
      const pagamentosAdiantados = pagamentos.filter(p => {
        const reserva = reservas.find(r => r.id === p.reserva_id);
        if (!reserva) return false;
        const dataPasseio = parseLocalDate(reserva.data);
        const dataPagamento = parseLocalDate(p.data_pagamento);
        // Se pagamento foi feito antes do passeio, computa na data do pagamento
        return dataPagamento < dataPasseio && isSameDay(dataPagamento, dia);
      });

      const passeiosDoDia = pagamentosDoDia.reduce((sum, p) => sum + p.valor_pago, 0);
      const adiantamentos = pagamentosAdiantados.reduce((sum, p) => sum + p.valor_pago, 0);
      
      // Reservas correspondentes
      const reservasRecebidas = reservas.filter(r => 
        pagamentosDoDia.some(p => p.reserva_id === r.id)
      );
      const reservasAdiantadas = reservas.filter(r => 
        pagamentosAdiantados.some(p => p.reserva_id === r.id)
      );

      // A Receber no Dia X: soma (valor - valor_pago) onde data = X e status != 'pago'
      const reservasAReceber = reservas.filter(r => {
        const valorPendente = r.valor - r.valor_pago;
        return valorPendente > 0 && 
               r.status_pagamento !== 'pago' && 
               isSameDay(parseLocalDate(r.data), dia);
      });
      const aReceber = reservasAReceber.reduce((sum, r) => sum + (r.valor - r.valor_pago), 0);

      // Todos os pagamentos que aparecem neste dia (para referência)
      const pagamentosRecebidos = [...pagamentosDoDia, ...pagamentosAdiantados];

      return {
        data: dia,
        dataFormatada: format(dia, "dd/MM/yyyy", { locale: ptBR }),
        passeiosDoDia,
        qtdPasseiosDoDia: pagamentosDoDia.length,
        adiantamentos,
        qtdAdiantamentos: pagamentosAdiantados.length,
        aReceber,
        qtdAReceber: reservasAReceber.length,
        total: passeiosDoDia + adiantamentos + aReceber,
        reservasRecebidas,
        reservasAReceber,
        reservasAdiantadas,
        pagamentosRecebidos,
        pagamentosDoDia,
        pagamentosAdiantados
      };
    }).filter(d => d.passeiosDoDia > 0 || d.adiantamentos > 0 || d.aReceber > 0);
  }, [reservas, pagamentos, dataInicio, dataFim]);

  // Dados para gráfico de barras empilhadas - usando a mesma lógica do fluxoCaixaDiario
  const dadosGraficoFluxo = useMemo(() => {
    if (!dataInicio || !dataFim) return [];

    const dias = eachDayOfInterval({ start: dataInicio, end: dataFim });
    
    return dias.map(dia => {
      // PAGAMENTOS DO DIA: pagamentos onde a data do passeio == dia
      let passeiosDoDia = 0;
      pagamentos.forEach(p => {
        const reserva = reservas.find(r => r.id === p.reserva_id);
        if (reserva) {
          const dataPasseio = parseLocalDate(reserva.data);
          const dataPagamento = parseLocalDate(p.data_pagamento);
          if (dataPagamento >= dataPasseio && isSameDay(dataPasseio, dia)) {
            passeiosDoDia += p.valor_pago;
          }
        }
      });

      // ADIANTAMENTOS: pagamentos feitos ANTES do passeio, computados na data do pagamento
      let adiantamentos = 0;
      pagamentos.forEach(p => {
        const reserva = reservas.find(r => r.id === p.reserva_id);
        if (reserva) {
          const dataPasseio = parseLocalDate(reserva.data);
          const dataPagamento = parseLocalDate(p.data_pagamento);
          if (dataPagamento < dataPasseio && isSameDay(dataPagamento, dia)) {
            adiantamentos += p.valor_pago;
          }
        }
      });

      // A Receber: soma de valores pendentes de passeios neste dia
      const reservasAReceber = reservas.filter(r => {
        const valorPendente = r.valor - r.valor_pago;
        return valorPendente > 0 && 
               r.status_pagamento !== 'pago' && 
               isSameDay(parseLocalDate(r.data), dia);
      });
      const aReceber = reservasAReceber.reduce((sum, r) => sum + (r.valor - r.valor_pago), 0);

      return {
        name: format(dia, "dd/MM", { locale: ptBR }),
        passeiosDoDia,
        adiantamentos,
        aReceber
      };
    });
  }, [reservas, pagamentos, dataInicio, dataFim]);

  // Totais do período
  const totaisPeriodo = useMemo(() => {
    return fluxoCaixaDiario.reduce((acc, dia) => ({
      passeiosDoDia: acc.passeiosDoDia + dia.passeiosDoDia,
      adiantamentos: acc.adiantamentos + dia.adiantamentos,
      aReceber: acc.aReceber + dia.aReceber,
      total: acc.total + dia.total,
      qtdPasseiosDoDia: acc.qtdPasseiosDoDia + dia.qtdPasseiosDoDia,
      qtdAdiantamentos: acc.qtdAdiantamentos + dia.qtdAdiantamentos,
      qtdAReceber: acc.qtdAReceber + dia.qtdAReceber
    }), { passeiosDoDia: 0, adiantamentos: 0, aReceber: 0, total: 0, qtdPasseiosDoDia: 0, qtdAdiantamentos: 0, qtdAReceber: 0 });
  }, [fluxoCaixaDiario]);

  // Estatísticas totais por status de pagamento
  const statusTotais = {
    pendente: {
      qtd: reservas.filter(r => r.status_pagamento === 'pendente').length,
      valor: reservas.filter(r => r.status_pagamento === 'pendente').reduce((sum, r) => sum + (r.valor - r.valor_pago), 0)
    },
    parcial: {
      qtd: reservas.filter(r => r.status_pagamento === 'parcial').length,
      valor: reservas.filter(r => r.status_pagamento === 'parcial').reduce((sum, r) => sum + (r.valor - r.valor_pago), 0)
    },
    pago: {
      qtd: reservas.filter(r => r.status_pagamento === 'pago').length,
      valor: reservas.filter(r => r.status_pagamento === 'pago').reduce((sum, r) => sum + r.valor_pago, 0)
    }
  };

  // Receita mensal do ano - usando tabela de pagamentos
  const receitaMensalAno = eachMonthOfInterval({
    start: startOfYear(new Date()),
    end: endOfYear(new Date())
  }).map(mes => {
    const pagamentosMes = pagamentos.filter(p => {
      const dataPgto = parseLocalDate(p.data_pagamento);
      return dataPgto >= startOfMonth(mes) && dataPgto <= endOfMonth(mes);
    });
    const total = pagamentosMes.reduce((sum, p) => sum + p.valor_pago, 0);
    return {
      name: format(mes, "MMM", { locale: ptBR }),
      receita: total
    };
  });

  // Quadriciclos agendados
  const quadriciclosDiario = Array.from({ length: 30 }, (_, i) => {
    const dia = subDays(new Date(), 29 - i);
    const reservasDia = reservas.filter(r => isSameDay(parseLocalDate(r.data), dia));
    return {
      name: format(dia, "dd/MM", { locale: ptBR }),
      quadriciclos: reservasDia.length
    };
  });

  const quadriciclosMensal = Array.from({ length: 12 }, (_, i) => {
    const mes = subMonths(new Date(), 11 - i);
    const inicioMes = startOfMonth(mes);
    const fimMes = endOfMonth(mes);
    const reservasMes = reservas.filter(r => {
      const dataReserva = parseLocalDate(r.data);
      return dataReserva >= inicioMes && dataReserva <= fimMes;
    });
    return {
      name: format(mes, "MMM/yy", { locale: ptBR }),
      quadriciclos: reservasMes.length
    };
  });

  const anoAtual = getYear(new Date());
  const quadriciclosAnual = Array.from({ length: 5 }, (_, i) => {
    const ano = anoAtual - 4 + i;
    const reservasAno = reservas.filter(r => getYear(parseLocalDate(r.data)) === ano);
    return {
      name: String(ano),
      quadriciclos: reservasAno.length
    };
  });

  const totalQuadriciclos = reservas.length;

  // Exportar para CSV
  const exportarExcel = () => {
    const dados = fluxoCaixaDiario.map(dia => ({
      'Data': dia.dataFormatada,
      'Recebido do Dia (R$)': dia.passeiosDoDia.toFixed(2),
      'Qtd Dia': dia.qtdPasseiosDoDia,
      'Adiantamentos (R$)': dia.adiantamentos.toFixed(2),
      'Qtd Adiantamentos': dia.qtdAdiantamentos,
      'A Receber (R$)': dia.aReceber.toFixed(2),
      'Qtd A Receber': dia.qtdAReceber,
      'Total do Dia (R$)': dia.total.toFixed(2)
    }));

    // Adicionar linha de totais
    dados.push({
      'Data': 'TOTAL',
      'Recebido do Dia (R$)': totaisPeriodo.passeiosDoDia.toFixed(2),
      'Qtd Dia': totaisPeriodo.qtdPasseiosDoDia,
      'Adiantamentos (R$)': totaisPeriodo.adiantamentos.toFixed(2),
      'Qtd Adiantamentos': totaisPeriodo.qtdAdiantamentos,
      'A Receber (R$)': totaisPeriodo.aReceber.toFixed(2),
      'Qtd A Receber': totaisPeriodo.qtdAReceber,
      'Total do Dia (R$)': totaisPeriodo.total.toFixed(2)
    });

    
    const periodoNome = dataInicio && dataFim 
      ? `${format(dataInicio, "dd-MM-yyyy")}_a_${format(dataFim, "dd-MM-yyyy")}`
      : "periodo";
    
    downloadCsv(dados, `fluxo_caixa_${periodoNome}.csv`);
    toast.success("Relatório exportado com sucesso!");
  };

  const getPasseioNome = (passeioId: number) => {
    return passeios.find(p => p.id === passeioId)?.nome || "Passeio não encontrado";
  };

  // Função para registrar pagamento do restante na data específica
  const marcarComoPago = async (reserva: Reserva, dataPagamento: Date) => {
    try {
      const dataFormatada = format(dataPagamento, "yyyy-MM-dd");
      const valorRestante = reserva.valor - reserva.valor_pago;
      
      // Insere o pagamento do valor restante na tabela de pagamentos
      const { error: pagamentoError } = await supabase
        .from("quadribahia_pagamentos")
        .insert({
          reserva_id: reserva.id,
          data_pagamento: dataFormatada,
          valor_pago: valorRestante
        });

      if (pagamentoError) throw pagamentoError;

      // Atualiza a reserva para pago
      const { error: reservaError } = await supabase
        .from("quadribahia_reservas")
        .update({
          status_pagamento: "pago",
          valor_pago: reserva.valor
        })
        .eq("id", reserva.id);

      if (reservaError) throw reservaError;
      
      toast.success(`${reserva.responsavel}: ${formatCurrency(valorRestante)} recebido em ${format(dataPagamento, "dd/MM/yyyy")}!`);
      setReservaPagando(null);
      setDataPagamentoSelecionada(new Date());
      loadData(); // Recarrega dados
    } catch (error: any) {
      toast.error("Erro ao registrar pagamento: " + error.message);
    }
  };

  // Abre o popover para escolher data de pagamento
  const abrirPagamento = (reserva: Reserva) => {
    setReservaPagando(reserva);
    setDataPagamentoSelecionada(new Date());
  };

  // Função para remover todos os pagamentos de uma reserva (volta para pendente)
  const removerPagamento = async (reserva: Reserva) => {
    try {
      // Remove todos os pagamentos dessa reserva
      const { error: pagamentoError } = await supabase
        .from("quadribahia_pagamentos")
        .delete()
        .eq("reserva_id", reserva.id);

      if (pagamentoError) throw pagamentoError;

      // Atualiza a reserva para pendente
      const { error: reservaError } = await supabase
        .from("quadribahia_reservas")
        .update({
          status_pagamento: "pendente",
          valor_pago: 0,
          data_pagamento: null
        })
        .eq("id", reserva.id);

      if (reservaError) throw reservaError;
      toast.success(`${reserva.responsavel} voltou para PENDENTE!`);
      loadData(); // Recarrega dados
    } catch (error: any) {
      toast.error("Erro ao remover pagamento: " + error.message);
    }
  };

  // Função para registrar um pagamento parcial
  const registrarPagamentoParcial = async (reserva: Reserva, valor: number, dataPagamento: Date) => {
    try {
      const dataFormatada = format(dataPagamento, "yyyy-MM-dd");
      const novoValorPago = reserva.valor_pago + valor;
      const novoStatus = novoValorPago >= reserva.valor ? "pago" : "parcial";
      
      // Insere o pagamento na tabela de pagamentos
      const { error: pagamentoError } = await supabase
        .from("quadribahia_pagamentos")
        .insert({
          reserva_id: reserva.id,
          data_pagamento: dataFormatada,
          valor_pago: valor
        });

      if (pagamentoError) throw pagamentoError;

      // Atualiza a reserva
      const { error: reservaError } = await supabase
        .from("quadribahia_reservas")
        .update({
          status_pagamento: novoStatus,
          valor_pago: Math.min(novoValorPago, reserva.valor),
          data_pagamento: reserva.data_pagamento || dataFormatada
        })
        .eq("id", reserva.id);

      if (reservaError) throw reservaError;
      
      toast.success(`${reserva.responsavel}: ${formatCurrency(valor)} recebido em ${format(dataPagamento, "dd/MM/yyyy")}!`);
      loadData(); // Recarrega dados
    } catch (error: any) {
      toast.error("Erro ao registrar pagamento: " + error.message);
    }
  };

  // Atualiza os detalhes do dia quando os dados mudam (para atualização em tempo real no modal)
  useEffect(() => {
    if (diaDetalhes) {
      // Recalcula os dados do dia selecionado
      const dia = diaDetalhes.data;
      
      // PAGAMENTOS DO DIA: pagamentos onde a data do passeio == dia (independente de quando foi pago)
      const pagamentosDoDia = pagamentos.filter(p => {
        const reserva = reservas.find(r => r.id === p.reserva_id);
        if (!reserva) return false;
        const dataPasseio = parseLocalDate(reserva.data);
        const dataPagamento = parseLocalDate(p.data_pagamento);
        return dataPagamento >= dataPasseio && isSameDay(dataPasseio, dia);
      });

      // ADIANTAMENTOS: pagamentos feitos ANTES do passeio, computados na data do pagamento
      const pagamentosAdiantados = pagamentos.filter(p => {
        const reserva = reservas.find(r => r.id === p.reserva_id);
        if (!reserva) return false;
        const dataPasseio = parseLocalDate(reserva.data);
        const dataPagamento = parseLocalDate(p.data_pagamento);
        return dataPagamento < dataPasseio && isSameDay(dataPagamento, dia);
      });

      const passeiosDoDia = pagamentosDoDia.reduce((sum, p) => sum + p.valor_pago, 0);
      const adiantamentos = pagamentosAdiantados.reduce((sum, p) => sum + p.valor_pago, 0);
      
      // Reservas correspondentes
      const reservasRecebidas = reservas.filter(r => 
        pagamentosDoDia.some(p => p.reserva_id === r.id)
      );
      const reservasAdiantadas = reservas.filter(r => 
        pagamentosAdiantados.some(p => p.reserva_id === r.id)
      );

      const reservasAReceber = reservas.filter(r => {
        const valorPendente = r.valor - r.valor_pago;
        return valorPendente > 0 && 
               r.status_pagamento !== 'pago' && 
               isSameDay(parseLocalDate(r.data), dia);
      });
      const aReceber = reservasAReceber.reduce((sum, r) => sum + (r.valor - r.valor_pago), 0);

      const pagamentosRecebidos = [...pagamentosDoDia, ...pagamentosAdiantados];

      setDiaDetalhes({
        data: dia,
        dataFormatada: format(dia, "dd/MM/yyyy", { locale: ptBR }),
        passeiosDoDia,
        qtdPasseiosDoDia: pagamentosDoDia.length,
        adiantamentos,
        qtdAdiantamentos: pagamentosAdiantados.length,
        aReceber,
        qtdAReceber: reservasAReceber.length,
        total: passeiosDoDia + adiantamentos + aReceber,
        reservasRecebidas,
        reservasAReceber,
        reservasAdiantadas,
        pagamentosRecebidos,
        pagamentosDoDia,
        pagamentosAdiantados
      });
    }
  }, [reservas, pagamentos, diaDetalhes?.data]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-muted-foreground">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-2 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">Dashboard Financeiro</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Visão completa do desempenho financeiro</p>
        </div>

        {/* Métricas Principais */}
        <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
          <Card className="border-primary/20 shadow-lg hover:shadow-xl transition-all" title="Quantidade total de reservas cadastradas">
            <CardHeader className="flex flex-row items-center justify-between pb-2 p-3 sm:p-6">
              <CardTitle className="text-xs sm:text-sm font-medium">📅 Total Reservas</CardTitle>
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </CardHeader>
            <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">{metricas.total_reservas}</div>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">✅ {metricas.total_confirmadas} confirmadas</p>
            </CardContent>
          </Card>

          <Card className="border-secondary/20 shadow-lg hover:shadow-xl transition-all" title="Soma do valor total de todas as reservas">
            <CardHeader className="flex flex-row items-center justify-between pb-2 p-3 sm:p-6">
              <CardTitle className="text-xs sm:text-sm font-medium">💰 Valor Total</CardTitle>
              <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-secondary" />
            </CardHeader>
            <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
              <div className="text-lg sm:text-2xl md:text-3xl font-bold text-secondary truncate">{formatCurrency(metricas.total_arrecadado)}</div>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">Valor dos passeios</p>
            </CardContent>
          </Card>

          <Card className="border-success/20 shadow-lg hover:shadow-xl transition-all" title="Total que JÁ ENTROU no caixa (soma de todos os valores pagos)">
            <CardHeader className="flex flex-row items-center justify-between pb-2 p-3 sm:p-6">
              <CardTitle className="text-xs sm:text-sm font-medium">💵 Já Recebido</CardTitle>
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-success" />
            </CardHeader>
            <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
              <div className="text-lg sm:text-2xl md:text-3xl font-bold text-success truncate">{formatCurrency(metricas.total_pago)}</div>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">Entrou no caixa</p>
            </CardContent>
          </Card>

          <Card className="border-warning/20 shadow-lg hover:shadow-xl transition-all" title="Total que AINDA VAI ENTRAR no caixa (valores pendentes e parciais)">
            <CardHeader className="flex flex-row items-center justify-between pb-2 p-3 sm:p-6">
              <CardTitle className="text-xs sm:text-sm font-medium">⏳ A Receber</CardTitle>
              <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-warning" />
            </CardHeader>
            <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
              <div className="text-lg sm:text-2xl md:text-3xl font-bold text-warning truncate">{formatCurrency(metricas.total_pendente)}</div>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">Pendente</p>
            </CardContent>
          </Card>
        </div>

        {/* Ranking de Motos */}
        {(() => {
          const hoje = new Date();
          hoje.setHours(0, 0, 0, 0);

          const inicioSemana = new Date(hoje);
          inicioSemana.setDate(hoje.getDate() - hoje.getDay()); // domingo
          const fimSemana = new Date(inicioSemana);
          fimSemana.setDate(inicioSemana.getDate() + 6);

          const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
          const fimMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);

          const dentro = (d: Date, ini: Date, fim: Date) => d >= ini && d <= fim;

          const reservasFiltradas = reservas.filter(r => {
            if (!r.codigo_moto || !r.data) return false;
            const d = parseLocalDate(r.data);
            if (motoPeriodoFiltro === "dia") return d.getTime() === hoje.getTime();
            if (motoPeriodoFiltro === "semana") return dentro(d, inicioSemana, fimSemana);
            if (motoPeriodoFiltro === "mes") return dentro(d, inicioMes, fimMes);
            if (motoPeriodoFiltro === "personalizado") {
              if (!motoDataInicio || !motoDataFim) return true;
              const ini = new Date(motoDataInicio); ini.setHours(0,0,0,0);
              const fim = new Date(motoDataFim); fim.setHours(0,0,0,0);
              return dentro(d, ini, fim);
            }
            return true; // total
          });

          const motoCount: Record<string, number> = {};
          reservasFiltradas.forEach(r => {
            if (r.codigo_moto) {
              motoCount[r.codigo_moto] = (motoCount[r.codigo_moto] || 0) + 1;
            }
          });
          const motoRanking = Object.entries(motoCount).sort(([, a], [, b]) => b - a);
          const maxCount = motoRanking[0]?.[1] || 1;

          const labelPeriodo: Record<typeof motoPeriodoFiltro, string> = {
            dia: "hoje",
            semana: "nesta semana",
            mes: "neste mês",
            total: "no total",
            personalizado: motoDataInicio && motoDataFim
              ? `${format(motoDataInicio, "dd/MM/yy")} - ${format(motoDataFim, "dd/MM/yy")}`
              : "período personalizado",
          };

          return (
            <Card className="border-primary/20 shadow-lg">
              <CardHeader className="pb-2 p-3 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg flex-1">
                    <Bike className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    🏍️ Ranking de Motos
                    <span className="text-sm font-normal text-muted-foreground">({labelPeriodo[motoPeriodoFiltro]})</span>
                  </CardTitle>
                  <Select value={motoPeriodoFiltro} onValueChange={(v) => setMotoPeriodoFiltro(v as typeof motoPeriodoFiltro)}>
                    <SelectTrigger className="w-full sm:w-[160px] h-9">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dia">Por dia (hoje)</SelectItem>
                      <SelectItem value="semana">Por semana</SelectItem>
                      <SelectItem value="mes">Por mês</SelectItem>
                      <SelectItem value="total">Total geral</SelectItem>
                      <SelectItem value="personalizado">Personalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {motoPeriodoFiltro === "personalizado" && (
                  <div className="flex flex-col sm:flex-row gap-2 mt-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className="justify-start h-9">
                          <CalendarDays className="h-4 w-4 mr-2" />
                          {motoDataInicio ? format(motoDataInicio, "dd/MM/yyyy") : "Data início"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent mode="single" selected={motoDataInicio} onSelect={setMotoDataInicio} initialFocus className="p-3 pointer-events-auto" />
                      </PopoverContent>
                    </Popover>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className="justify-start h-9">
                          <CalendarDays className="h-4 w-4 mr-2" />
                          {motoDataFim ? format(motoDataFim, "dd/MM/yyyy") : "Data fim"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent mode="single" selected={motoDataFim} onSelect={setMotoDataFim} initialFocus className="p-3 pointer-events-auto" />
                      </PopoverContent>
                    </Popover>
                  </div>
                )}
              </CardHeader>
              <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
                {motoRanking.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-6">
                    Nenhuma saída de moto registrada {labelPeriodo[motoPeriodoFiltro]}.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {motoRanking.map(([moto, count], idx) => (
                      <div key={moto} className="flex items-center gap-3">
                        <span className={`text-sm font-bold w-6 text-center ${idx === 0 ? 'text-amber-500' : idx === 1 ? 'text-gray-400' : idx === 2 ? 'text-amber-700' : 'text-muted-foreground'}`}>
                          {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `${idx + 1}º`}
                        </span>
                        <span className="text-sm font-semibold min-w-[70px]">{moto}</span>
                        <div className="flex-1 bg-muted rounded-full h-4 overflow-hidden">
                          <div
                            className="h-full bg-primary/70 rounded-full transition-all"
                            style={{ width: `${(count / maxCount) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-primary min-w-[60px] text-right">{count} saída{count !== 1 ? 's' : ''}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })()}

        {/* Fluxo de Caixa Diário */}
        <Card className="border-primary/20 shadow-lg">
          <CardHeader className="p-3 sm:p-6">
            <div className="flex flex-col gap-3">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <CalendarDays className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                Fluxo de Caixa
              </CardTitle>
              
              <div className="flex flex-wrap items-center gap-2">
                {/* Filtro de período */}
                <Select value={periodoFiltro} onValueChange={(v) => setPeriodoFiltro(v as PeriodoFiltro)}>
                  <SelectTrigger className="w-full sm:w-[180px] h-9">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ultimos7">Últimos 7 dias</SelectItem>
                    <SelectItem value="ultimos30">Mês Atual</SelectItem>
                    <SelectItem value="proximos30">Próximos 30 dias</SelectItem>
                    <SelectItem value="customizado">Customizado</SelectItem>
                  </SelectContent>
                </Select>

                {/* Seletor de data customizado */}
                {periodoFiltro === "customizado" && (
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className="flex-1 sm:flex-initial">
                          {dataInicio ? format(dataInicio, "dd/MM/yy") : "Início"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={dataInicio}
                          onSelect={setDataInicio}
                          locale={ptBR}
                        />
                      </PopoverContent>
                    </Popover>
                    <span className="text-muted-foreground text-sm">até</span>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className="flex-1 sm:flex-initial">
                          {dataFim ? format(dataFim, "dd/MM/yy") : "Fim"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={dataFim}
                          onSelect={setDataFim}
                          locale={ptBR}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                )}

                <div className="flex gap-2 ml-auto">
                  <Button variant="outline" size="sm" onClick={exportarExcel} className="gap-1">
                    <Download className="h-4 w-4" />
                    <span className="hidden sm:inline">Exportar</span>
                  </Button>

                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setFluxoExpandido(!fluxoExpandido)}
                  >
                    {fluxoExpandido ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          
          {fluxoExpandido && (
            <CardContent className="space-y-4 sm:space-y-6 p-3 sm:p-6">
              {/* Cards de Resumo do Período - 5 categorias */}
              <div className="grid gap-2 sm:gap-3 grid-cols-2 sm:grid-cols-5">
                <Card className="bg-success/10 border-success/30">
                  <CardContent className="pt-2 sm:pt-4 p-2 sm:p-4">
                    <div className="text-center">
                      <p className="text-[9px] sm:text-sm text-muted-foreground">
                        💵 Do Dia
                      </p>
                      <p className="text-xs sm:text-xl md:text-2xl font-bold text-success truncate">{formatCurrency(totaisPeriodo.passeiosDoDia)}</p>
                      <p className="text-[9px] sm:text-xs text-muted-foreground mt-0.5 hidden sm:block">{totaisPeriodo.qtdPasseiosDoDia} pgtos</p>
                    </div>
                  </CardContent>
                </Card>


                <Card className="bg-blue-500/10 border-blue-500/30">
                  <CardContent className="pt-2 sm:pt-4 p-2 sm:p-4">
                    <div className="text-center">
                      <p className="text-[9px] sm:text-sm text-muted-foreground">
                        🔵 Adiantamentos
                      </p>
                      <p className="text-xs sm:text-xl md:text-2xl font-bold text-blue-500 truncate">{formatCurrency(totaisPeriodo.adiantamentos)}</p>
                      <p className="text-[9px] sm:text-xs text-muted-foreground mt-0.5 hidden sm:block">{totaisPeriodo.qtdAdiantamentos} pgtos</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-warning/10 border-warning/30">
                  <CardContent className="pt-2 sm:pt-4 p-2 sm:p-4">
                    <div className="text-center">
                      <p className="text-[9px] sm:text-sm text-muted-foreground">
                        💰 A Receber
                      </p>
                      <p className="text-xs sm:text-xl md:text-2xl font-bold text-warning truncate">{formatCurrency(totaisPeriodo.aReceber)}</p>
                      <p className="text-[9px] sm:text-xs text-muted-foreground mt-0.5 hidden sm:block">{totaisPeriodo.qtdAReceber} reservas</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-primary/10 border-primary/30">
                  <CardContent className="pt-2 sm:pt-4 p-2 sm:p-4">
                    <div className="text-center">
                      <p className="text-[9px] sm:text-sm text-muted-foreground">
                        📊 Total
                      </p>
                      <p className="text-xs sm:text-xl md:text-2xl font-bold text-primary truncate">{formatCurrency(totaisPeriodo.total)}</p>
                      <p className="text-[9px] sm:text-xs text-muted-foreground mt-0.5 hidden sm:block">Período</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Gráfico de Barras Empilhadas */}
              <div className="h-[200px] sm:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dadosGraficoFluxo}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis 
                      dataKey="name" 
                      stroke="hsl(var(--muted-foreground))" 
                      fontSize={9} 
                      angle={-45} 
                      textAnchor="end" 
                      height={50}
                      interval={Math.floor(dadosGraficoFluxo.length / 8)}
                      tick={{ fontSize: 9 }}
                    />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} width={50} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        fontSize: "12px"
                      }}
                      formatter={(value, name) => [
                        formatCurrency(Number(value)),
                        name === "passeiosDoDia" ? "💵 Do Dia" : 
                        name === "adiantamentos" ? "🔵 Adiantamentos" : "💰 A Receber"
                      ]}
                    />
                    <Legend 
                      formatter={(value) => 
                        value === "passeiosDoDia" ? "💵 Do Dia" : 
                        value === "adiantamentos" ? "🔵 Adiantamentos" : "💰 A Receber"
                      }
                      wrapperStyle={{ fontSize: "12px" }}
                    />
                    <Bar dataKey="passeiosDoDia" stackId="a" fill="hsl(var(--success))" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="adiantamentos" stackId="a" fill="hsl(210, 100%, 50%)" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="aReceber" stackId="a" fill="hsl(var(--warning))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Tabela de Fluxo Diário - Mobile cards, Desktop table */}
              {fluxoCaixaDiario.length > 0 ? (
                <>
                  {/* Mobile: Cards view */}
                  <div className="sm:hidden space-y-2">
                    {fluxoCaixaDiario.map((dia, index) => (
                      <Card 
                        key={index} 
                        className="cursor-pointer active:bg-muted/50 transition-colors"
                        onClick={() => setDiaDetalhes(dia)}
                      >
                        <CardContent className="p-3">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <CalendarDays className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium text-sm">{dia.dataFormatada}</span>
                            </div>
                            <Badge variant="outline" className="text-xs">Ver</Badge>
                          </div>
                          <div className="grid grid-cols-4 gap-1 mt-2 text-center">
                            <div>
                              <p className="text-[9px] text-muted-foreground">Do Dia</p>
                              <p className="text-[10px] font-semibold text-success">{formatCurrency(dia.passeiosDoDia)}</p>
                            </div>
                            <div>
                              <p className="text-[9px] text-muted-foreground">Adiant.</p>
                              <p className="text-[10px] font-semibold text-blue-500">{formatCurrency(dia.adiantamentos)}</p>
                            </div>
                            <div>
                              <p className="text-[9px] text-muted-foreground">A Receber</p>
                              <p className="text-[10px] font-semibold text-warning">{formatCurrency(dia.aReceber)}</p>
                            </div>
                            <div>
                              <p className="text-[9px] text-muted-foreground">Total</p>
                              <p className="text-[10px] font-bold text-primary">{formatCurrency(dia.total)}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Desktop: Table view */}
                  <div className="hidden sm:block rounded-lg border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead className="font-semibold">📅 Data</TableHead>
                          <TableHead className="font-semibold text-success">💵 Recebido</TableHead>
                          <TableHead className="font-semibold text-blue-500">🔵 Adiantamentos</TableHead>
                          <TableHead className="font-semibold text-warning">💰 A Receber</TableHead>
                          <TableHead className="font-semibold text-primary">📊 Total</TableHead>
                          <TableHead className="font-semibold text-center">Detalhes</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {fluxoCaixaDiario.map((dia, index) => (
                          <TableRow 
                            key={index}
                            className="hover:bg-muted/30 cursor-pointer transition-colors"
                            onClick={() => setDiaDetalhes(dia)}
                          >
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                                {dia.dataFormatada}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span className="font-semibold text-success">{formatCurrency(dia.passeiosDoDia)}</span>
                                {dia.qtdPasseiosDoDia > 0 && (
                                  <span className="text-xs text-muted-foreground">{dia.qtdPasseiosDoDia} pgto(s)</span>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span className="font-semibold text-blue-500">{formatCurrency(dia.adiantamentos)}</span>
                                {dia.qtdAdiantamentos > 0 && (
                                  <span className="text-xs text-muted-foreground">{dia.qtdAdiantamentos} pgto(s)</span>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span className="font-semibold text-warning">{formatCurrency(dia.aReceber)}</span>
                                {dia.qtdAReceber > 0 && (
                                  <span className="text-xs text-muted-foreground">{dia.qtdAReceber} reserva(s)</span>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="font-bold text-primary">{formatCurrency(dia.total)}</span>
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                                Ver detalhes
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Nenhum dado encontrado
                </div>
              )}
            </CardContent>
          )}
        </Card>

        {/* Modal de Detalhes do Dia */}
        <Dialog open={!!diaDetalhes} onOpenChange={() => setDiaDetalhes(null)}>
          <DialogContent className="max-w-3xl w-[95vw] max-h-[85vh] overflow-y-auto p-3 sm:p-6">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
                <CalendarDays className="h-4 w-4 sm:h-5 sm:w-5" />
                {diaDetalhes?.dataFormatada}
              </DialogTitle>
            </DialogHeader>

            {diaDetalhes && (
              <div className="space-y-4 sm:space-y-6">
                {/* Resumo do dia */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-4">
                  <Card className="bg-success/10 border-success/30">
                    <CardContent className="pt-2 sm:pt-4 p-2 sm:p-4 text-center">
                      <p className="text-[9px] sm:text-sm text-muted-foreground">💵 Do Dia</p>
                      <p className="text-xs sm:text-xl font-bold text-success">{formatCurrency(diaDetalhes.passeiosDoDia)}</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-blue-500/10 border-blue-500/30">
                    <CardContent className="pt-2 sm:pt-4 p-2 sm:p-4 text-center">
                      <p className="text-[9px] sm:text-sm text-muted-foreground">🔵 Adiantamentos</p>
                      <p className="text-xs sm:text-xl font-bold text-blue-500">{formatCurrency(diaDetalhes.adiantamentos)}</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-warning/10 border-warning/30">
                    <CardContent className="pt-2 sm:pt-4 p-2 sm:p-4 text-center">
                      <p className="text-[9px] sm:text-sm text-muted-foreground">💰 A Receber</p>
                      <p className="text-xs sm:text-xl font-bold text-warning">{formatCurrency(diaDetalhes.aReceber)}</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-primary/10 border-primary/30">
                    <CardContent className="pt-2 sm:pt-4 p-2 sm:p-4 text-center">
                      <p className="text-[9px] sm:text-sm text-muted-foreground">📊 Total</p>
                      <p className="text-xs sm:text-xl font-bold text-primary">{formatCurrency(diaDetalhes.total)}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Pagamentos recebidos DO DIA - separando os que tiveram adiantamento anterior */}
                {diaDetalhes.pagamentosDoDia.length > 0 && (() => {
                  // Separar pagamentos do dia: aqueles que tiveram adiantamento anterior vs pagos sem adiantamento
                  const pagamentosSemAdiantamento: typeof diaDetalhes.pagamentosDoDia = [];
                  const pagamentosComAdiantamentoAnterior: { pagamento: typeof diaDetalhes.pagamentosDoDia[0], adiantamentos: Pagamento[] }[] = [];
                  
                  diaDetalhes.pagamentosDoDia.forEach(p => {
                    const reserva = reservas.find(r => r.id === p.reserva_id);
                    if (!reserva) return;
                    
                    // Verificar se esta reserva teve pagamentos ANTES do dia do passeio (adiantamentos)
                    const dataPasseio = parseLocalDate(reserva.data);
                    const adiantamentosAnteriores = pagamentos.filter(pg => 
                      pg.reserva_id === reserva.id && 
                      parseLocalDate(pg.data_pagamento) < dataPasseio
                    );
                    
                    if (adiantamentosAnteriores.length > 0) {
                      pagamentosComAdiantamentoAnterior.push({ pagamento: p, adiantamentos: adiantamentosAnteriores });
                    } else {
                      pagamentosSemAdiantamento.push(p);
                    }
                  });
                  
                  return (
                    <>
                      {/* Pagamentos do dia SEM adiantamento anterior - Verde */}
                      {pagamentosSemAdiantamento.length > 0 && (
                        <div>
                          <h3 className="font-semibold text-success mb-2 text-sm sm:text-base">💵 Pagamentos do Dia ({pagamentosSemAdiantamento.length})</h3>
                          <div className="space-y-2">
                            {pagamentosSemAdiantamento.map(p => {
                              const reserva = reservas.find(r => r.id === p.reserva_id);
                              if (!reserva) return null;
                              return (
                                <Card 
                                  key={p.id} 
                                  className="bg-success/5 hover:bg-success/10 transition-colors cursor-pointer"
                                  onClick={() => setReservaDetalhe(reserva)}
                                >
                                  <CardContent className="py-2 px-3 sm:py-3 sm:px-4">
                                    <div className="flex justify-between items-center gap-2">
                                      <div className="flex-1 min-w-0">
                                        <p className="font-medium text-sm truncate hover:underline">{reserva.hotel || 'Hotel não informado'}{reserva.apartamento ? ` - ${reserva.apartamento}` : ''}</p>
                                        <p className="text-xs text-muted-foreground truncate">
                                          {getPasseioNome(reserva.passeio_id)}
                                        </p>
                                      </div>
                                      <p className="font-bold text-success text-sm whitespace-nowrap">{formatCurrency(p.valor_pago)}</p>
                                    </div>
                                  </CardContent>
                                </Card>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      
                      {/* Pagamentos do dia COM adiantamento anterior - Laranja */}
                      {pagamentosComAdiantamentoAnterior.length > 0 && (
                        <div>
                          <h3 className="font-semibold text-orange-500 mb-2 text-sm sm:text-base">🟠 Recebido (com adiantamento) ({pagamentosComAdiantamentoAnterior.length})</h3>
                          <div className="space-y-2">
                            {pagamentosComAdiantamentoAnterior.map(({ pagamento: p, adiantamentos }) => {
                              const reserva = reservas.find(r => r.id === p.reserva_id);
                              if (!reserva) return null;
                              const totalAdiantado = adiantamentos.reduce((sum, ad) => sum + ad.valor_pago, 0);
                              return (
                                <Card 
                                  key={p.id} 
                                  className="bg-orange-500/5 border-orange-500/30 hover:bg-orange-500/10 transition-colors cursor-pointer"
                                  onClick={() => setReservaDetalhe(reserva)}
                                >
                                  <CardContent className="py-2 px-3 sm:py-3 sm:px-4">
                                    <div className="flex justify-between items-center gap-2">
                                      <div className="flex-1 min-w-0">
                                        <p className="font-medium text-sm truncate hover:underline">{reserva.hotel || 'Hotel não informado'}{reserva.apartamento ? ` - ${reserva.apartamento}` : ''}</p>
                                        <p className="text-xs text-muted-foreground truncate">
                                          {getPasseioNome(reserva.passeio_id)}
                                        </p>
                                        <div className="text-[10px] text-orange-400 mt-0.5">
                                          {adiantamentos.map((ad, idx) => (
                                            <span key={ad.id}>
                                              {idx > 0 && ' | '}
                                              💰 {format(parseLocalDate(ad.data_pagamento), "dd/MM", { locale: ptBR })}: {formatCurrency(ad.valor_pago)}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                      <div className="text-right">
                                        <p className="font-bold text-orange-500 text-sm whitespace-nowrap">{formatCurrency(p.valor_pago)}</p>
                                        <p className="text-[10px] text-orange-400">+ {formatCurrency(totalAdiantado)} ant.</p>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </>
                  );
                })()}

                {/* Adiantamentos pagos */}
                {diaDetalhes.pagamentosAdiantados.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-blue-500 mb-2 text-sm sm:text-base">🔵 Adiantamentos Recebidos ({diaDetalhes.pagamentosAdiantados.length})</h3>
                    <div className="space-y-2">
                      {diaDetalhes.pagamentosAdiantados.map(p => {
                        const reserva = reservas.find(r => r.id === p.reserva_id);
                        if (!reserva) return null;
                        const dataPasseio = parseLocalDate(reserva.data);
                        return (
                          <Card 
                            key={p.id} 
                            className="bg-blue-500/5 hover:bg-blue-500/10 transition-colors cursor-pointer"
                            onClick={() => setReservaDetalhe(reserva)}
                          >
                            <CardContent className="py-2 px-3 sm:py-3 sm:px-4">
                              <div className="flex justify-between items-center gap-2">
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm truncate hover:underline">{reserva.hotel || 'Hotel não informado'}{reserva.apartamento ? ` - ${reserva.apartamento}` : ''}</p>
                                  <p className="text-xs text-muted-foreground truncate">
                                    {getPasseioNome(reserva.passeio_id)}
                                  </p>
                                  <p className="text-xs text-blue-400">
                                    📅 Passeio: {format(dataPasseio, "dd/MM/yyyy", { locale: ptBR })}
                                  </p>
                                </div>
                                <p className="font-bold text-blue-500 text-sm whitespace-nowrap">{formatCurrency(p.valor_pago)}</p>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Valores a receber */}
                {diaDetalhes.reservasAReceber.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-warning mb-2 text-sm sm:text-base">💰 A Receber ({diaDetalhes.reservasAReceber.length})</h3>
                    <div className="space-y-2">
                      {diaDetalhes.reservasAReceber.map(r => (
                        <Card 
                          key={r.id} 
                          className="bg-warning/5 hover:bg-warning/10 transition-colors cursor-pointer"
                          onClick={() => setReservaDetalhe(r)}
                        >
                          <CardContent className="py-2 px-3 sm:py-3 sm:px-4">
                            <div className="flex justify-between items-center gap-2">
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm truncate hover:underline">
                                  {r.hotel ? `${r.hotel}${r.apartamento ? ` - ${r.apartamento}` : ''}` : 'Nome do Hotel não informado'}
                                </p>
                                <p className="text-xs text-muted-foreground truncate">
                                  {getPasseioNome(r.passeio_id)}
                                </p>
                                {r.telefone && <p className="text-xs text-muted-foreground">📱 {r.telefone}</p>}
                              </div>
                              <div className="flex items-center gap-1">
                                <p className="font-bold text-warning text-sm whitespace-nowrap">{formatCurrency(r.valor - r.valor_pago)}</p>
                                <Popover open={reservaPagando?.id === r.id} onOpenChange={(open) => !open && setReservaPagando(null)}>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-success hover:text-success hover:bg-success/10 h-8 w-8 p-0"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        abrirPagamento(r);
                                      }}
                                    >
                                      <Check className="h-4 w-4" />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-3" align="end" onClick={(e) => e.stopPropagation()}>
                                    <div className="space-y-3">
                                      <div className="text-sm font-medium">
                                        Pagar {formatCurrency(r.valor - r.valor_pago)}
                                      </div>
                                      <CalendarComponent
                                        mode="single"
                                        selected={dataPagamentoSelecionada}
                                        onSelect={setDataPagamentoSelecionada}
                                        locale={ptBR}
                                        className="rounded-md border pointer-events-auto"
                                      />
                                      <Button
                                        className="w-full"
                                        size="sm"
                                        onClick={() => dataPagamentoSelecionada && marcarComoPago(r, dataPagamentoSelecionada)}
                                        disabled={!dataPagamentoSelecionada}
                                      >
                                        <Check className="h-4 w-4 mr-2" />
                                        Confirmar
                                      </Button>
                                    </div>
                                  </PopoverContent>
                                </Popover>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Modal de Detalhes da Reserva */}
        <Dialog open={!!reservaDetalhe} onOpenChange={() => setReservaDetalhe(null)}>
          <DialogContent className="max-w-md w-[95vw] p-4 sm:p-6">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
                👤 Detalhes da Reserva
              </DialogTitle>
            </DialogHeader>

            {reservaDetalhe && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Responsável</p>
                    <p className="font-semibold">{reservaDetalhe.responsavel}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Passeio</p>
                    <p className="font-semibold">{getPasseioNome(reservaDetalhe.passeio_id)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Data</p>
                    <p className="font-semibold">{format(parseLocalDate(reservaDetalhe.data), "dd/MM/yyyy", { locale: ptBR })}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Valor Total</p>
                    <p className="font-semibold text-primary">{formatCurrency(reservaDetalhe.valor)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Valor Pago</p>
                    <p className="font-semibold text-success">{formatCurrency(reservaDetalhe.valor_pago)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Status</p>
                    <Badge variant={
                      reservaDetalhe.status_pagamento === 'pago' ? 'default' :
                      reservaDetalhe.status_pagamento === 'parcial' ? 'secondary' : 'destructive'
                    }>
                      {reservaDetalhe.status_pagamento === 'pago' ? '✅ Pago' :
                       reservaDetalhe.status_pagamento === 'parcial' ? '⏳ Parcial' : '❌ Pendente'}
                    </Badge>
                  </div>
                </div>

                <div className="border-t pt-3 space-y-2">
                  {reservaDetalhe.hotel && (
                    <div>
                      <p className="text-xs text-muted-foreground">Hotel</p>
                      <p className="font-medium">{reservaDetalhe.hotel}</p>
                    </div>
                  )}
                  {reservaDetalhe.apartamento && (
                    <div>
                      <p className="text-xs text-muted-foreground">Apartamento</p>
                      <p className="font-medium">{reservaDetalhe.apartamento}</p>
                    </div>
                  )}
                  {reservaDetalhe.telefone && (
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Telefone</p>
                        <p className="font-medium">{reservaDetalhe.telefone}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText(reservaDetalhe.telefone || '');
                          toast.success("Telefone copiado!");
                        }}
                      >
                        📋 Copiar
                      </Button>
                    </div>
                  )}
                  {reservaDetalhe.participantes && (
                    <div>
                      <p className="text-xs text-muted-foreground">Participantes</p>
                      <p className="font-medium">{reservaDetalhe.participantes}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <Card className="border-primary/20 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bike className="h-5 w-5 text-primary" />
              Quadriciclos Agendados
              <span className="ml-auto text-2xl font-bold text-primary">{totalQuadriciclos} total</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="diario" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="diario">Últimos 30 dias</TabsTrigger>
                <TabsTrigger value="mensal">Últimos 12 meses</TabsTrigger>
                <TabsTrigger value="anual">Por Ano</TabsTrigger>
              </TabsList>
              <TabsContent value="diario">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={quadriciclosDiario}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={10} angle={-45} textAnchor="end" height={60} interval={2} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} allowDecimals={false} />
                    <Tooltip contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }} formatter={(value) => [value, "Quadriciclos"]} />
                    <Bar dataKey="quadriciclos" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="mensal">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={quadriciclosMensal}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} angle={-45} textAnchor="end" height={60} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} allowDecimals={false} />
                    <Tooltip contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }} formatter={(value) => [value, "Quadriciclos"]} />
                    <Bar dataKey="quadriciclos" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="anual">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={quadriciclosAnual}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} allowDecimals={false} />
                    <Tooltip contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }} formatter={(value) => [value, "Quadriciclos"]} />
                    <Bar dataKey="quadriciclos" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Estatísticas de Pagamento */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-primary">Totais por Status de Pagamento</h2>
          
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-destructive/30 bg-destructive/5 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-destructive" />
                  Pendente de Pagamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-destructive">{statusTotais.pendente.qtd}</div>
                <p className="text-sm text-muted-foreground mt-1">reservas</p>
                <p className="text-2xl font-semibold text-destructive mt-3">{formatCurrency(statusTotais.pendente.valor)}</p>
                <p className="text-xs text-muted-foreground">valor total pendente</p>
              </CardContent>
            </Card>

            <Card className="border-warning/30 bg-warning/5 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4 text-warning" />
                  Pagamento Parcial
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-warning">{statusTotais.parcial.qtd}</div>
                <p className="text-sm text-muted-foreground mt-1">reservas</p>
                <p className="text-2xl font-semibold text-warning mt-3">{formatCurrency(statusTotais.parcial.valor)}</p>
                <p className="text-xs text-muted-foreground">faltando para completar</p>
              </CardContent>
            </Card>

            <Card className="border-success/30 bg-success/5 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-success" />
                  Pago Inteiro
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-success">{statusTotais.pago.qtd}</div>
                <p className="text-sm text-muted-foreground mt-1">reservas</p>
                <p className="text-2xl font-semibold text-success mt-3">{formatCurrency(statusTotais.pago.valor)}</p>
                <p className="text-xs text-muted-foreground">valor total pago</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Receita Mensal do Ano - Por data de PAGAMENTO */}
        <Card className="border-success/20 shadow-lg" title="Valores que efetivamente entraram no caixa em cada mês (por data de pagamento)">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-success" />
              💵 Receita Recebida Mensal {new Date().getFullYear()}
            </CardTitle>
            <p className="text-xs text-muted-foreground">Valores recebidos por mês (data do pagamento)</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={receitaMensalAno}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }} formatter={value => [formatCurrency(Number(value)), "💵 Receita Recebida"]} />
                <Bar dataKey="receita" fill="hsl(var(--success))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
