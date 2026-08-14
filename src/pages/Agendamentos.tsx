import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Plus, Edit, Trash2, Check, Clock, ChevronLeft, ChevronRight, Maximize2, Copy, Download } from "lucide-react";
import * as XLSX from "xlsx";
import { toast } from "sonner";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, addMonths, subMonths, isToday } from "date-fns";
import { ptBR } from "date-fns/locale";

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
  hotel: string | null;
  apartamento: string | null;
  passeio_id: number;
  data: string;
  horario: string | null;
  periodo: string | null;
  valor: number;
  valor_pago: number;
  status_pagamento: "pendente" | "parcial" | "pago";
  confirmado: boolean;
  compareceu: boolean;
  created_at: string;
  telefone: string | null;
  data_pagamento: string | null;
  codigo_moto: string | null;
}

export default function Agendamentos() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [passeios, setPasseios] = useState<Passeio[]>([]);
  const [motos, setMotos] = useState<{ id: string; ordem: number; nome: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingReserva, setEditingReserva] = useState<Reserva | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reservaToDelete, setReservaToDelete] = useState<string | null>(null);
  const [expandedDayDialogOpen, setExpandedDayDialogOpen] = useState(false);
  const [reservaDetalhe, setReservaDetalhe] = useState<Reserva | null>(null);
  
  // Filtros do popup expandido
  const [popupFilterTelefone, setPopupFilterTelefone] = useState("");
  const [popupFilterPasseio, setPopupFilterPasseio] = useState<number | "todos">("todos");
  const [popupFilterHotel, setPopupFilterHotel] = useState("");

  // Form states
  const [responsavel, setResponsavel] = useState("");
  const [participanteInput, setParticipanteInput] = useState("");
  const [participantes, setParticipantes] = useState<string>("");
  const [hotel, setHotel] = useState("");
  const [apartamento, setApartamento] = useState("");
  const [passeioId, setPasseioId] = useState<number | null>(null);
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [valor, setValor] = useState("");
  const [valorPago, setValorPago] = useState("");
  const [dataPagamento, setDataPagamento] = useState("");
  const [statusPagamento, setStatusPagamento] = useState<"pendente" | "parcial" | "pago">("pendente");
  const [confirmado, setConfirmado] = useState(false);
  const [telefone, setTelefone] = useState("");
  const [codigoMoto, setCodigoMoto] = useState("");
  const [motosSelecionadas, setMotosSelecionadas] = useState<string[]>([""]);
  const [quantidade, setQuantidade] = useState(1);

  // Sorting states
  const [sortField, setSortField] = useState<keyof Reserva | "passeio">("data");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Filter states
  const [filterData, setFilterData] = useState("");
  const [filterResponsavel, setFilterResponsavel] = useState("");
  const [filterTelefone, setFilterTelefone] = useState("");
  const [filterStatus, setFilterStatus] = useState<"todos" | "pendente" | "parcial" | "pago">("todos");
  const [filterConfirmado, setFilterConfirmado] = useState<"todos" | "sim" | "nao">("todos");
  const [filterPasseio, setFilterPasseio] = useState<number | "todos">("todos");

  useEffect(() => {
    loadData();

    // Configurar realtime para reservas
    const reservasChannel = supabase
      .channel('reservas-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'quadribahia_reservas'
        },
        (payload) => {
          console.log('Reserva atualizada em realtime:', payload);
          
          if (payload.eventType === 'INSERT') {
            setReservas((prev) => [...prev, {
              ...payload.new as any,
              status_pagamento: (payload.new as any).status_pagamento as "pendente" | "parcial" | "pago"
            }]);
          } else if (payload.eventType === 'UPDATE') {
            setReservas((prev) => prev.map((r) => 
              r.id === (payload.new as any).id 
                ? {
                    ...payload.new as any,
                    status_pagamento: (payload.new as any).status_pagamento as "pendente" | "parcial" | "pago"
                  }
                : r
            ));
          } else if (payload.eventType === 'DELETE') {
            setReservas((prev) => prev.filter((r) => r.id !== (payload.old as any).id));
          }
        }
      )
      .subscribe();

    // Configurar realtime para passeios
    const passeiosChannel = supabase
      .channel('passeios-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'quadribahia_passeios'
        },
        (payload) => {
          console.log('Passeio atualizado em realtime:', payload);
          
          if (payload.eventType === 'INSERT') {
            setPasseios((prev) => [...prev, payload.new as any]);
          } else if (payload.eventType === 'UPDATE') {
            setPasseios((prev) => prev.map((p) => 
              p.id === (payload.new as any).id ? payload.new as any : p
            ));
          } else if (payload.eventType === 'DELETE') {
            setPasseios((prev) => prev.filter((p) => p.id !== (payload.old as any).id));
          }
        }
      )
      .subscribe();

    // Cleanup
    return () => {
      supabase.removeChannel(reservasChannel);
      supabase.removeChannel(passeiosChannel);
    };
  }, []);

  const loadData = async () => {
    try {
      const [reservasRes, passeiosRes, motosRes] = await Promise.all([
        supabase.from("quadribahia_reservas").select("*").order("data", { ascending: true }),
        supabase.from("quadribahia_passeios").select("*").eq("ativo", true).order("nome"),
        supabase.from("quadribahia_motos").select("*").order("ordem"),
      ]);

      if (reservasRes.error) throw reservasRes.error;
      if (passeiosRes.error) throw passeiosRes.error;
      if (motosRes.error) throw motosRes.error;

      setReservas((reservasRes.data || []).map((r: any) => ({
        ...r,
        status_pagamento: r.status_pagamento as "pendente" | "parcial" | "pago"
      })));
      setPasseios(passeiosRes.data || []);
      setMotos((motosRes.data || []) as any);
    } catch (error: any) {
      toast.error("Erro ao carregar dados: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value || 0);
  };

  const exportarExcelAgendamentos = () => {
    const dadosExportar = sortedReservas.map((reserva) => {
      const passeio = passeios.find((p) => p.id === reserva.passeio_id);
      const [year, month, day] = reserva.data.split('-').map(Number);
      const reservaDate = new Date(year, month - 1, day);
      
      return {
        "Data": format(reservaDate, "dd/MM/yyyy", { locale: ptBR }),
        "Responsável": reserva.responsavel,
        "Participantes": reserva.participantes || "-",
        "Telefone": reserva.telefone ? formatPhoneNumber(reserva.telefone) : "-",
        "Hotel": reserva.hotel || "-",
        "Apartamento": reserva.apartamento || "-",
        "Passeio": passeio?.nome || "-",
        "Horário": reserva.horario || "-",
        "Valor Total": formatCurrency(reserva.valor),
        "Valor Pago": formatCurrency(reserva.valor_pago),
        "Status Pagamento": reserva.status_pagamento === "pago" ? "Pago" : reserva.status_pagamento === "parcial" ? "Parcial" : "Pendente",
        "Confirmado": reserva.confirmado ? "Sim" : "Não",
      };
    });

    const ws = XLSX.utils.json_to_sheet(dadosExportar);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Agendamentos");
    
    const nomeArquivo = filterData 
      ? `agendamentos_${filterData}.xlsx`
      : `agendamentos_${format(new Date(), "yyyy-MM-dd")}.xlsx`;
    
    XLSX.writeFile(wb, nomeArquivo);
    toast.success("Arquivo Excel exportado com sucesso!");
  };

  const formatPhoneNumber = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    
    // Aplica a máscara (XX) XXXXX-XXXX
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else if (numbers.length <= 11) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
    }
    // Limita a 11 dígitos
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const resetForm = () => {
    setResponsavel("");
    setParticipantes("");
    setParticipanteInput("");
    setHotel("");
    setApartamento("");
    setPasseioId(null);
    setData("");
    setHorario("");
    setValor("");
    setValorPago("");
    setDataPagamento("");
    setStatusPagamento("pendente");
    setConfirmado(false);
    setTelefone("");
    setCodigoMoto("");
    setMotosSelecionadas([""]);
    setQuantidade(1);
    setEditingReserva(null);
  };

  const openEditDialog = (reserva: Reserva) => {
    setEditingReserva(reserva);
    setResponsavel(reserva.responsavel);
    setParticipantes(reserva.participantes);
    setHotel(reserva.hotel || "");
    setApartamento(reserva.apartamento || "");
    setPasseioId(reserva.passeio_id);
    setData(reserva.data);
    setHorario(reserva.horario || "");
    setValor(reserva.valor.toString());
    setValorPago(reserva.valor_pago.toString());
    setDataPagamento(reserva.data_pagamento || "");
    setStatusPagamento(reserva.status_pagamento);
    setConfirmado(reserva.confirmado);
    setTelefone(reserva.telefone || "");
    setCodigoMoto(reserva.codigo_moto || "");
    setMotosSelecionadas([reserva.codigo_moto || ""]);
    setDialogOpen(true);
  };

  // Verificar vagas disponíveis por horário (quadriciclos disponíveis)
  const getVagasDisponiveis = (dataReserva: string, horarioReserva: string, reservaEditando?: string) => {
    const reservasNoHorario = reservas.filter((r) => 
      r.data === dataReserva && 
      r.horario === horarioReserva &&
      r.id !== reservaEditando // Não contar a reserva que está sendo editada
    );
    
    // Cada reserva = 1 quadriciclo. Máximo de 6 quadriciclos por horário
    const quadriciclосUsados = reservasNoHorario.length;
    return 6 - quadriciclосUsados;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!responsavel || !passeioId || !data || !valor) {
        toast.error("Preencha todos os campos obrigatórios");
        return;
      }

      // Validar vagas disponíveis para passeios com horário
      if (passeioSelecionado?.tem_horario && horario) {
        const vagasDisponiveis = getVagasDisponiveis(data, horario, editingReserva?.id);
        const qtdNecessaria = editingReserva ? 1 : quantidade;
        
        if (vagasDisponiveis < qtdNecessaria) {
          toast.error(`Não há vagas suficientes! Disponível: ${vagasDisponiveis}, Solicitado: ${qtdNecessaria}. Máximo de 6 quadriciclos por horário.`);
          return;
        }
      }

      const valorTotal = parseFloat(valor);
      const valorPagoNum = parseFloat(valorPago) || 0;

      // Calcular automaticamente o status de pagamento baseado nos valores
      let statusCalculado: "pendente" | "parcial" | "pago";
      if (valorPagoNum === 0) {
        statusCalculado = "pendente";
      } else if (valorPagoNum >= valorTotal) {
        statusCalculado = "pago";
      } else {
        statusCalculado = "parcial";
      }

      const reservaData = {
        responsavel,
        participantes,
        hotel: hotel || null,
        apartamento: apartamento || null,
        passeio_id: passeioId,
        data,
        horario: horario || null,
        periodo: null,
        valor: valorTotal,
        valor_pago: valorPagoNum,
        data_pagamento: valorPagoNum > 0 && dataPagamento ? dataPagamento : null,
        status_pagamento: statusCalculado,
        confirmado,
        telefone: telefone || null,
        codigo_moto: codigoMoto || null,
      };

      const deveRegistrarPagamento = valorPagoNum > 0 && !!dataPagamento;

      if (editingReserva) {
        const { error } = await supabase
          .from("quadribahia_reservas")
          .update(reservaData)
          .eq("id", editingReserva.id);
        if (error) throw error;

        // Sincroniza pagamentos (mantém 1 registro, refletindo o total pago informado)
        const { error: delPayErr } = await supabase
          .from("quadribahia_pagamentos")
          .delete()
          .eq("reserva_id", editingReserva.id);
        if (delPayErr) throw delPayErr;

        if (deveRegistrarPagamento) {
          const { error: insPayErr } = await supabase
            .from("quadribahia_pagamentos")
            .insert({
              reserva_id: editingReserva.id,
              data_pagamento: dataPagamento,
              valor_pago: valorPagoNum,
            });
          if (insPayErr) throw insPayErr;
        }

        toast.success("Reserva atualizada!");
      } else {
        // Criar múltiplas reservas baseado na quantidade, com a moto escolhida por vaga
        const reservasParaInserir = Array.from({ length: quantidade }, (_, idx) => ({
          ...reservaData,
          codigo_moto: motosSelecionadas[idx] || null,
        }));
        const { data: inserted, error } = await supabase
          .from("quadribahia_reservas")
          .insert(reservasParaInserir)
          .select("id");
        if (error) throw error;

        if (deveRegistrarPagamento && inserted?.length) {
          const pagamentosParaInserir = inserted.map((r: any) => ({
            reserva_id: r.id,
            data_pagamento: dataPagamento,
            valor_pago: valorPagoNum,
          }));
          const { error: insPayErr } = await supabase
            .from("quadribahia_pagamentos")
            .insert(pagamentosParaInserir);
          if (insPayErr) throw insPayErr;
        }

        toast.success(`${quantidade} reserva${quantidade > 1 ? 's' : ''} criada${quantidade > 1 ? 's' : ''}!`);
      }

      setDialogOpen(false);
      resetForm();
      // Não precisa mais chamar loadData(), o realtime vai atualizar automaticamente
    } catch (error: any) {
      toast.error("Erro ao salvar: " + error.message);
    }
  };

  const handleDelete = (id: string) => {
    setReservaToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!reservaToDelete) return;

    try {
      const { error } = await supabase.from("quadribahia_reservas").delete().eq("id", reservaToDelete);
      if (error) throw error;
      toast.success("Reserva excluída!");
      setDeleteDialogOpen(false);
      setReservaToDelete(null);
    } catch (error: any) {
      toast.error("Erro ao excluir: " + error.message);
    }
  };

  const addParticipante = () => {
    if (participanteInput.trim()) {
      const novosParticipantes = participantes 
        ? `${participantes}, ${participanteInput.trim()}`
        : participanteInput.trim();
      setParticipantes(novosParticipantes);
      setParticipanteInput("");
    }
  };

  const removeParticipante = (index: number) => {
    const lista = participantes.split(', ').filter((_, i) => i !== index);
    setParticipantes(lista.join(', '));
  };

  const passeioSelecionado = passeios.find((p) => p.id === passeioId);

  // Calendário
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getReservasForDay = (day: Date) => {
    return reservas.filter((r) => {
      const [year, month, dayNum] = r.data.split('-').map(Number);
      const reservaDate = new Date(year, month - 1, dayNum);
      return isSameDay(reservaDate, day);
    });
  };

  const reservasDoDia = selectedDate ? getReservasForDay(selectedDate) : [];

  // Filtrar reservas do dia no popup expandido
  const reservasDoDiaFiltradas = reservasDoDia.filter((reserva) => {
    if (popupFilterTelefone) {
      const telefoneNormalizado = reserva.telefone?.replace(/\D/g, '') || '';
      const filtroNormalizado = popupFilterTelefone.replace(/\D/g, '');
      if (!telefoneNormalizado.includes(filtroNormalizado)) {
        return false;
      }
    }
    if (popupFilterPasseio !== "todos" && reserva.passeio_id !== popupFilterPasseio) {
      return false;
    }
    if (popupFilterHotel && !(reserva.hotel || "").toLowerCase().includes(popupFilterHotel.toLowerCase())) {
      return false;
    }
    return true;
  });

  const estatisticasMes = {
    total: reservas.filter((r) => {
      const [year, month, dayNum] = r.data.split('-').map(Number);
      const reservaDate = new Date(year, month - 1, dayNum);
      return isSameMonth(reservaDate, currentMonth);
    }).length,
    confirmadas: reservas.filter((r) => {
      const [year, month, dayNum] = r.data.split('-').map(Number);
      const reservaDate = new Date(year, month - 1, dayNum);
      return isSameMonth(reservaDate, currentMonth) && r.confirmado;
    }).length,
    pago: reservas.filter((r) => {
      const [year, month, dayNum] = r.data.split('-').map(Number);
      const reservaDate = new Date(year, month - 1, dayNum);
      return isSameMonth(reservaDate, currentMonth) && r.status_pagamento === "pago";
    }).length,
  };

  const handleSort = (field: keyof Reserva | "passeio") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Filtrar reservas
  const filteredReservas = reservas.filter((reserva) => {
    // Filtro de data
    if (filterData && !reserva.data.includes(filterData)) {
      return false;
    }

    // Filtro de responsável
    if (filterResponsavel && !reserva.responsavel.toLowerCase().includes(filterResponsavel.toLowerCase())) {
      return false;
    }

    // Filtro de telefone - normalizar ambos os lados para comparação
    if (filterTelefone) {
      const telefoneNormalizado = reserva.telefone?.replace(/\D/g, '') || '';
      const filtroNormalizado = filterTelefone.replace(/\D/g, '');
      if (!telefoneNormalizado.includes(filtroNormalizado)) {
        return false;
      }
    }

    // Filtro de status
    if (filterStatus !== "todos" && reserva.status_pagamento !== filterStatus) {
      return false;
    }

    // Filtro de confirmado
    if (filterConfirmado === "sim" && !reserva.confirmado) {
      return false;
    }
    if (filterConfirmado === "nao" && reserva.confirmado) {
      return false;
    }

    // Filtro de passeio
    if (filterPasseio !== "todos" && reserva.passeio_id !== filterPasseio) {
      return false;
    }

    return true;
  });

  const sortedReservas = [...filteredReservas].sort((a, b) => {
    let aValue: any;
    let bValue: any;

    if (sortField === "passeio") {
      aValue = passeios.find((p) => p.id === a.passeio_id)?.nome || "";
      bValue = passeios.find((p) => p.id === b.passeio_id)?.nome || "";
    } else {
      aValue = a[sortField];
      bValue = b[sortField];
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const SortIcon = ({ field }: { field: keyof Reserva | "passeio" }) => {
    if (sortField !== field) return <ChevronRight className="h-4 w-4 opacity-30" />;
    return sortDirection === "asc" ? (
      <ChevronRight className="h-4 w-4 rotate-[-90deg]" />
    ) : (
      <ChevronRight className="h-4 w-4 rotate-90" />
    );
  };

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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">📅 Agendamentos</h1>
            <p className="text-sm sm:text-base text-muted-foreground">Calendário e gestão de reservas</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button size="default" className="gap-2 w-full sm:w-auto">
                <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                Nova Reserva
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl w-[95vw] max-h-[90vh] overflow-y-auto p-3 sm:p-6">
              <DialogHeader>
                <DialogTitle>{editingReserva ? "Editar Reserva" : "Nova Reserva"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="responsavel">Responsável *</Label>
                    <Input id="responsavel" value={responsavel} onChange={(e) => setResponsavel(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="passeio">Passeio *</Label>
                    <Select value={passeioId?.toString()} onValueChange={(v) => setPasseioId(parseInt(v))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {passeios.map((p) => (
                          <SelectItem key={p.id} value={p.id.toString()}>{p.nome}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Participantes (opcional)</Label>
                  <div className="flex gap-2">
                    <Input
                      value={participanteInput}
                      onChange={(e) => setParticipanteInput(e.target.value)}
                      placeholder="Nome do participante"
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addParticipante())}
                    />
                    <Button type="button" onClick={addParticipante}>Adicionar</Button>
                  </div>
                  {participantes && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {participantes.split(', ').map((p, i) => (
                        <div key={i} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2">
                          {p}
                          <button type="button" onClick={() => removeParticipante(i)} className="hover:text-destructive">×</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input 
                      id="telefone" 
                      value={telefone} 
                      onChange={(e) => setTelefone(formatPhoneNumber(e.target.value))} 
                      placeholder="(XX) XXXXX-XXXX"
                      maxLength={15}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hotel">Hotel</Label>
                    <Input id="hotel" value={hotel} onChange={(e) => setHotel(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apartamento">Apartamento</Label>
                    <Input id="apartamento" value={apartamento} onChange={(e) => setApartamento(e.target.value)} />
                  </div>
                </div>

                {editingReserva ? (
                  <div className="space-y-2">
                    <Label htmlFor="codigoMoto">Moto</Label>
                    <Select value={codigoMoto} onValueChange={setCodigoMoto}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a moto" />
                      </SelectTrigger>
                      <SelectContent>
                        {motos.map((m) => (
                          <SelectItem key={m.id} value={m.nome}>{m.nome}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label>Motos {quantidade > 1 ? `(${quantidade} vagas)` : ""}</Label>
                    <div className={quantidade > 1 ? "grid grid-cols-2 md:grid-cols-3 gap-2" : ""}>
                      {Array.from({ length: quantidade }).map((_, idx) => (
                        <Select
                          key={idx}
                          value={motosSelecionadas[idx] || ""}
                          onValueChange={(v) => {
                            setMotosSelecionadas((prev) => {
                              const arr = [...prev];
                              while (arr.length < quantidade) arr.push("");
                              arr[idx] = v;
                              return arr;
                            });
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={quantidade > 1 ? `Vaga ${idx + 1}` : "Selecione a moto"} />
                          </SelectTrigger>
                          <SelectContent>
                            {motos.map((m) => (
                              <SelectItem key={m.id} value={m.nome}>{m.nome}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ))}
                    </div>
                    {quantidade > 1 && (
                      <p className="text-xs text-muted-foreground">
                        Escolha qual moto será usada em cada vaga
                      </p>
                    )}
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="data">Data *</Label>
                    <Input id="data" type="date" value={data} onChange={(e) => setData(e.target.value)} required />
                  </div>
                  {passeioSelecionado?.tem_horario && (
                    <div className="space-y-2">
                      <Label htmlFor="horario">Horário *</Label>
                      <Select value={horario} onValueChange={setHorario}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          {passeioSelecionado.horarios_disponiveis?.map((h) => {
                            const vagas = data ? getVagasDisponiveis(data, h, editingReserva?.id) : 6;
                            const esgotado = vagas === 0;
                            return (
                              <SelectItem 
                                key={h} 
                                value={h} 
                                disabled={esgotado}
                              >
                                {h} {data && `(${vagas} vaga${vagas !== 1 ? 's' : ''})`}
                                {esgotado && " - ESGOTADO"}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>

                {!editingReserva && (
                  <div className="space-y-2">
                    <Label htmlFor="quantidade">Quantidade de Vagas *</Label>
                    <Input 
                      id="quantidade" 
                      type="number" 
                      min="1" 
                      max="6" 
                      value={quantidade} 
                      onChange={(e) => {
                        const novaQtd = Math.max(1, Math.min(6, parseInt(e.target.value) || 1));
                        setQuantidade(novaQtd);
                        setMotosSelecionadas((prev) => {
                          const arr = [...prev];
                          while (arr.length < novaQtd) arr.push("");
                          return arr.slice(0, novaQtd);
                        });
                      }} 
                    />
                    <p className="text-xs text-muted-foreground">
                      Quantas reservas criar com os mesmos dados (1 a 6)
                    </p>
                  </div>
                )}

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="valor">Valor Total (R$) *</Label>
                    <Input 
                      id="valor" 
                      type="number" 
                      step="0.01" 
                      value={valor} 
                      onChange={(e) => {
                        setValor(e.target.value);
                        // Se o status for "pago", atualizar valor_pago também
                        if (statusPagamento === "pago") {
                          setValorPago(e.target.value);
                        }
                      }} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="valorPago">Valor Pago (R$)</Label>
                    <Input 
                      id="valorPago" 
                      type="number" 
                      step="0.01" 
                      value={valorPago} 
                      onChange={(e) => {
                        const novoPago = e.target.value;
                        setValorPago(novoPago);
                        
                        // Atualizar status automaticamente baseado no valor
                        const valorTotal = parseFloat(valor) || 0;
                        const valorPagoNum = parseFloat(novoPago) || 0;
                        
                        if (valorPagoNum === 0) {
                          setStatusPagamento("pendente");
                          setDataPagamento("");
                        } else if (valorPagoNum >= valorTotal) {
                          setStatusPagamento("pago");
                          // Se não tiver data de pagamento, colocar a data de hoje
                          if (!dataPagamento) {
                            setDataPagamento(format(new Date(), "yyyy-MM-dd"));
                          }
                        } else {
                          setStatusPagamento("parcial");
                          // Se não tiver data de pagamento, colocar a data de hoje
                          if (!dataPagamento) {
                            setDataPagamento(format(new Date(), "yyyy-MM-dd"));
                          }
                        }
                      }} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="statusPagamento">Status Pagamento *</Label>
                    <Select 
                      value={statusPagamento} 
                      onValueChange={(v: any) => {
                        setStatusPagamento(v);
                        // Se marcar como "pago", definir valor_pago = valor
                        if (v === "pago") {
                          setValorPago(valor);
                          if (!dataPagamento) {
                            setDataPagamento(format(new Date(), "yyyy-MM-dd"));
                          }
                        } else if (v === "pendente") {
                          setValorPago("0");
                          setDataPagamento("");
                        } else if (v === "parcial" && !dataPagamento) {
                          setDataPagamento(format(new Date(), "yyyy-MM-dd"));
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pendente">Pendente</SelectItem>
                        <SelectItem value="parcial">Pago Parcial</SelectItem>
                        <SelectItem value="pago">Pago Total</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {(statusPagamento === "parcial" || statusPagamento === "pago") && (
                  <div className="space-y-2">
                    <Label htmlFor="dataPagamento">Data do Pagamento *</Label>
                    <Input 
                      id="dataPagamento" 
                      type="date" 
                      value={dataPagamento} 
                      onChange={(e) => setDataPagamento(e.target.value)} 
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Data em que o pagamento foi realizado
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <input type="checkbox" id="confirmado" checked={confirmado} onChange={(e) => setConfirmado(e.target.checked)} className="w-4 h-4" />
                  <Label htmlFor="confirmado" className="cursor-pointer">Reserva Confirmada</Label>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => { setDialogOpen(false); resetForm(); }} className="flex-1">Cancelar</Button>
                  <Button type="submit" className="flex-1">Salvar</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Estatísticas do Mês */}
        <div className="grid gap-3 grid-cols-3">
          <Card className="border-primary/20 shadow-lg">
            <CardHeader className="pb-2 p-3 sm:p-6">
              <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Total Mês</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">{estatisticasMes.total}</div>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 hidden sm:block">Reservas agendadas</p>
            </CardContent>
          </Card>

          <Card className="border-success/20 shadow-lg">
            <CardHeader className="pb-2 p-3 sm:p-6">
              <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Confirmadas</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-success">{estatisticasMes.confirmadas}</div>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 hidden sm:block">Confirmações</p>
            </CardContent>
          </Card>

          <Card className="border-secondary/20 shadow-lg">
            <CardHeader className="pb-2 p-3 sm:p-6">
              <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Pagas</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary">{estatisticasMes.pago}</div>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 hidden sm:block">Pagamentos</p>
            </CardContent>
          </Card>
        </div>

        {/* Calendário e Lista */}
        <div className="grid gap-4 lg:grid-cols-3">
          {/* Calendário */}
          <Card className="border-primary/20 shadow-lg lg:col-span-2">
            <CardHeader className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
                  {format(currentMonth, "MMM yyyy", { locale: ptBR })}
                </CardTitle>
                <div className="flex gap-1 sm:gap-2">
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-2 sm:p-6 pt-0">
              <div className="grid grid-cols-7 gap-1 mb-1 sm:gap-2 sm:mb-2">
                {["D", "S", "T", "Q", "Q", "S", "S"].map((day, i) => (
                  <div key={i} className="text-center text-[10px] sm:text-sm font-medium text-muted-foreground p-1 sm:p-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1 sm:gap-2">
                {/* Dias vazios antes do início do mês */}
                {Array.from({ length: monthStart.getDay() }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}
                
                {/* Dias do mês */}
                {daysInMonth.map((day) => {
                  const reservasDia = getReservasForDay(day);
                  const total = reservasDia.length;
                  const pagos = reservasDia.filter((r) => r.status_pagamento === "pago").length;
                  const parciais = reservasDia.filter((r) => r.status_pagamento === "parcial").length;
                  const pendentes = reservasDia.filter((r) => r.status_pagamento === "pendente").length;
                  const isSelected = selectedDate && isSameDay(day, selectedDate);
                  
                  return (
                    <button
                      key={day.toISOString()}
                      onClick={() => setSelectedDate(day)}
                      className={`aspect-square rounded-lg p-2 text-sm transition-all hover:shadow-md ${
                        isToday(day)
                          ? "bg-primary text-primary-foreground font-bold"
                          : isSelected
                          ? "bg-primary/20 ring-2 ring-primary"
                          : total > 0
                          ? "bg-secondary/20 hover:bg-secondary/30"
                          : "hover:bg-muted"
                      }`}
                    >
                      <div className="font-semibold">{format(day, "d")}</div>
                      {total > 0 && (
                        <div className="text-xs mt-1">
                          <div className="font-medium">{total} agend.</div>
                          <div className="flex items-center justify-center gap-1 flex-wrap">
                            {pagos > 0 && (
                              <span className="text-success flex items-center gap-0.5">
                                <Check className="h-3 w-3" />
                                {pagos}
                              </span>
                            )}
                            {parciais > 0 && (
                              <span className="text-warning flex items-center gap-0.5">
                                <span className="w-2 h-0.5 bg-warning rounded" />
                                {parciais}
                              </span>
                            )}
                            {pendentes > 0 && (
                              <span className="text-destructive flex items-center gap-0.5">
                                <span className="w-2 h-0.5 bg-destructive rounded" />
                                {pendentes}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Lista de Reservas do Dia Selecionado */}
          <Card className="border-primary/20 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  {selectedDate ? format(selectedDate, "dd 'de' MMMM", { locale: ptBR }) : "Selecione um dia"}
                </CardTitle>
                {selectedDate && reservasDoDia.length > 0 && (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setExpandedDayDialogOpen(true)}
                    className="gap-2"
                  >
                    <Maximize2 className="h-4 w-4" />
                    Expandir
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {reservasDoDia.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Clock className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Nenhuma reserva para este dia</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[500px] overflow-y-auto">
                  {reservasDoDia.map((reserva) => {
                    const passeio = passeios.find((p) => p.id === reserva.passeio_id);
                    return (
                      <div key={reserva.id} className="p-3 bg-card border border-border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-sm">{reserva.responsavel}</h4>
                              {reserva.confirmado && <Check className="h-4 w-4 text-success" />}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{passeio?.nome}</p>
                            {reserva.telefone && (
                              <p className="text-xs text-muted-foreground">
                                📱 {formatPhoneNumber(reserva.telefone)}
                              </p>
                            )}
                            <p className="text-xs text-muted-foreground">
                              {reserva.horario || "-"}
                            </p>
                            <div className="mt-2">
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                reserva.status_pagamento === "pago" ? "bg-success/20 text-success" :
                                reserva.status_pagamento === "parcial" ? "bg-warning/20 text-warning" :
                                "bg-destructive/20 text-destructive"
                              }`}>
                                {reserva.status_pagamento === "pago" ? "Pago" : reserva.status_pagamento === "parcial" ? "Parcial" : "Pendente"}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <Button size="icon" variant="ghost" onClick={() => openEditDialog(reserva)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" onClick={() => handleDelete(reserva.id)}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Dialog Expandido - Detalhes do Dia */}
        <Dialog open={expandedDayDialogOpen} onOpenChange={setExpandedDayDialogOpen}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                Agendamentos de {selectedDate && format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </DialogTitle>
            </DialogHeader>

            {/* Filtros do Popup */}
            <div className="p-4 bg-muted/30 rounded-lg border border-border mb-4">
              <h3 className="font-semibold mb-3 text-sm">Filtros</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="popupFilterTelefone" className="text-xs">Telefone</Label>
                  <Input
                    id="popupFilterTelefone"
                    placeholder="(XX) XXXXX-XXXX"
                    value={popupFilterTelefone}
                    onChange={(e) => setPopupFilterTelefone(formatPhoneNumber(e.target.value))}
                    maxLength={15}
                    className="h-9"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="popupFilterPasseio" className="text-xs">Passeio</Label>
                  <Select value={popupFilterPasseio.toString()} onValueChange={(v) => setPopupFilterPasseio(v === "todos" ? "todos" : parseInt(v))}>
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      {passeios.map((passeio) => (
                        <SelectItem key={passeio.id} value={passeio.id.toString()}>
                          {passeio.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="popupFilterHotel" className="text-xs">Hotel</Label>
                  <Input
                    id="popupFilterHotel"
                    placeholder="Nome do hotel..."
                    value={popupFilterHotel}
                    onChange={(e) => setPopupFilterHotel(e.target.value)}
                    className="h-9"
                  />
                </div>
              </div>
              {(popupFilterTelefone || popupFilterPasseio !== "todos" || popupFilterHotel) && (
                <div className="mt-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setPopupFilterTelefone("");
                      setPopupFilterPasseio("todos");
                      setPopupFilterHotel("");
                    }}
                  >
                    Limpar Filtros
                  </Button>
                </div>
              )}
            </div>

            {/* Tabela de Reservas Detalhada */}
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                Mostrando {reservasDoDiaFiltradas.length} de {reservasDoDia.length} reserva{reservasDoDia.length !== 1 ? 's' : ''}
              </div>
              
              {reservasDoDiaFiltradas.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Clock className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Nenhuma reserva encontrada</p>
                </div>
              ) : (
                <div className="overflow-x-auto border rounded-lg">
                  <table className="w-full border-collapse">
                    <thead className="bg-muted">
                      <tr className="border-b border-border">
                        <th className="p-3 text-left font-semibold">Responsável</th>
                        <th className="p-3 text-left font-semibold">Passeio</th>
                        <th className="p-3 text-left font-semibold">Horário</th>
                        <th className="p-3 text-left font-semibold">Hotel</th>
                        <th className="p-3 text-left font-semibold">Apartamento</th>
                        <th className="p-3 text-left font-semibold">Telefone</th>
                        <th className="p-3 text-left font-semibold">Valor</th>
                        <th className="p-3 text-left font-semibold">Valor Pago</th>
                        <th className="p-3 text-left font-semibold">Status</th>
                        <th className="p-3 text-center font-semibold">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reservasDoDiaFiltradas.map((reserva) => {
                        const passeio = passeios.find((p) => p.id === reserva.passeio_id);
                        return (
                          <tr 
                            key={reserva.id}
                            className={`border-b border-border/50 transition-colors ${
                              reserva.status_pagamento === "pendente" 
                                ? "bg-red-100 dark:bg-red-950/40 hover:bg-red-200 dark:hover:bg-red-950/50" 
                                : reserva.status_pagamento === "parcial"
                                ? "bg-yellow-100 dark:bg-yellow-950/40 hover:bg-yellow-200 dark:hover:bg-yellow-950/50"
                                : "hover:bg-muted/30"
                            }`}
                          >
                            <td className="p-3 text-sm">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{reserva.responsavel}</span>
                                {reserva.confirmado && <Check className="h-4 w-4 text-success" />}
                              </div>
                            </td>
                            <td className="p-3 text-sm">{passeio?.nome}</td>
                            <td className="p-3 text-sm">{reserva.horario || "-"}</td>
                            <td className="p-3 text-sm">{reserva.hotel || "-"}</td>
                            <td className="p-3 text-sm">{reserva.apartamento || "-"}</td>
                            <td className="p-3 text-sm">
                              {reserva.telefone ? (
                                <div className="flex items-center gap-2">
                                  <span>{formatPhoneNumber(reserva.telefone)}</span>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-7 w-7"
                                    onClick={() => {
                                      navigator.clipboard.writeText(reserva.telefone || "");
                                      toast.success("Telefone copiado!");
                                    }}
                                  >
                                    <Copy className="h-3 w-3" />
                                  </Button>
                                </div>
                              ) : (
                                "-"
                              )}
                            </td>
                            <td className="p-3 text-sm font-semibold">{formatCurrency(reserva.valor)}</td>
                            <td className="p-3 text-sm font-semibold text-success">{formatCurrency(reserva.valor_pago)}</td>
                            <td className="p-3">
                              <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
                                reserva.status_pagamento === "pago" ? "bg-success/20 text-success" :
                                reserva.status_pagamento === "parcial" ? "bg-warning/20 text-warning" :
                                "bg-destructive/20 text-destructive"
                              }`}>
                                {reserva.status_pagamento === "pago" ? "Pago" : reserva.status_pagamento === "parcial" ? "Parcial" : "Pendente"}
                              </span>
                            </td>
                            <td className="p-3">
                              <div className="flex gap-1 justify-center">
                                <Button 
                                  size="icon" 
                                  variant="ghost" 
                                  onClick={() => {
                                    openEditDialog(reserva);
                                    setExpandedDayDialogOpen(false);
                                  }}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  size="icon" 
                                  variant="ghost" 
                                  onClick={() => {
                                    handleDelete(reserva.id);
                                    setExpandedDayDialogOpen(false);
                                  }}
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Lista Completa de Reservas com Filtros */}
        <Card className="border-primary/20 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              📋 Todas as Reservas ({sortedReservas.length})
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2"
              onClick={exportarExcelAgendamentos}
              disabled={sortedReservas.length === 0}
            >
              <Download className="h-4 w-4" />
              Exportar Excel
            </Button>
          </CardHeader>
          <CardContent>
            {/* Filtros */}
            <div className="mb-6 p-4 bg-muted/30 rounded-lg border border-border">
              <h3 className="font-semibold mb-3 text-sm">Filtros</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="filterData" className="text-xs">Data</Label>
                  <Input
                    id="filterData"
                    type="date"
                    value={filterData}
                    onChange={(e) => setFilterData(e.target.value)}
                    className="h-9"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="filterResponsavel" className="text-xs">Responsável</Label>
                  <Input
                    id="filterResponsavel"
                    placeholder="Nome..."
                    value={filterResponsavel}
                    onChange={(e) => setFilterResponsavel(e.target.value)}
                    className="h-9"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="filterTelefone" className="text-xs">Telefone</Label>
                  <Input
                    id="filterTelefone"
                    placeholder="(XX) XXXXX-XXXX"
                    value={filterTelefone}
                    onChange={(e) => setFilterTelefone(formatPhoneNumber(e.target.value))}
                    maxLength={15}
                    className="h-9"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="filterPasseio" className="text-xs">Passeio</Label>
                  <Select value={filterPasseio.toString()} onValueChange={(v) => setFilterPasseio(v === "todos" ? "todos" : parseInt(v))}>
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      {passeios.map((passeio) => (
                        <SelectItem key={passeio.id} value={passeio.id.toString()}>
                          {passeio.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="filterStatus" className="text-xs">Status Pagamento</Label>
                  <Select value={filterStatus} onValueChange={(v: any) => setFilterStatus(v)}>
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="pendente">Pendente</SelectItem>
                      <SelectItem value="parcial">Parcial</SelectItem>
                      <SelectItem value="pago">Pago</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="filterConfirmado" className="text-xs">Confirmado</Label>
                  <Select value={filterConfirmado} onValueChange={(v: any) => setFilterConfirmado(v)}>
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="sim">Sim</SelectItem>
                      <SelectItem value="nao">Não</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {(filterData || filterResponsavel || filterTelefone || filterStatus !== "todos" || filterConfirmado !== "todos" || filterPasseio !== "todos") && (
                <div className="mt-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setFilterData("");
                      setFilterResponsavel("");
                      setFilterTelefone("");
                      setFilterStatus("todos");
                      setFilterConfirmado("todos");
                      setFilterPasseio("todos");
                    }}
                  >
                    Limpar Filtros
                  </Button>
                </div>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="p-3 text-left">
                      <button onClick={() => handleSort("data")} className="flex items-center gap-1 hover:text-primary">
                        Data <SortIcon field="data" />
                      </button>
                    </th>
                    <th className="p-3 text-left">
                      <button onClick={() => handleSort("responsavel")} className="flex items-center gap-1 hover:text-primary">
                        Responsável <SortIcon field="responsavel" />
                      </button>
                    </th>
                    <th className="p-3 text-left">
                      <button onClick={() => handleSort("telefone")} className="flex items-center gap-1 hover:text-primary">
                        Telefone <SortIcon field="telefone" />
                      </button>
                    </th>
                    <th className="p-3 text-left">
                      <button onClick={() => handleSort("passeio")} className="flex items-center gap-1 hover:text-primary">
                        Passeio <SortIcon field="passeio" />
                      </button>
                    </th>
                    <th className="p-3 text-left">
                      <button onClick={() => handleSort("horario")} className="flex items-center gap-1 hover:text-primary">
                        Horário <SortIcon field="horario" />
                      </button>
                    </th>
                    <th className="p-3 text-left">
                      <button onClick={() => handleSort("hotel")} className="flex items-center gap-1 hover:text-primary">
                        Hotel <SortIcon field="hotel" />
                      </button>
                    </th>
                    <th className="p-3 text-left">
                      <button onClick={() => handleSort("apartamento")} className="flex items-center gap-1 hover:text-primary">
                        Apartamento <SortIcon field="apartamento" />
                      </button>
                    </th>
                    <th className="p-3 text-left">
                      <button onClick={() => handleSort("valor")} className="flex items-center gap-1 hover:text-primary">
                        Valor <SortIcon field="valor" />
                      </button>
                    </th>
                    <th className="p-3 text-left">
                      <button onClick={() => handleSort("valor_pago")} className="flex items-center gap-1 hover:text-primary">
                        Valor Pago <SortIcon field="valor_pago" />
                      </button>
                    </th>
                    <th className="p-3 text-center">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedReservas.map((reserva) => {
                    const passeio = passeios.find((p) => p.id === reserva.passeio_id);
                    return (
                      <tr 
                        key={reserva.id} 
                        className={`border-b border-border/50 transition-colors cursor-pointer ${
                          reserva.status_pagamento === "pendente" 
                            ? "bg-red-100 dark:bg-red-950/40 hover:bg-red-200 dark:hover:bg-red-950/50" 
                            : reserva.status_pagamento === "parcial"
                            ? "bg-yellow-100 dark:bg-yellow-950/40 hover:bg-yellow-200 dark:hover:bg-yellow-950/50"
                            : "hover:bg-muted/30"
                        }`}
                        onClick={() => setReservaDetalhe(reserva)}
                      >
                        <td className="p-3 text-sm whitespace-nowrap">
                          {(() => {
                            const [year, month, day] = reserva.data.split('-').map(Number);
                            const reservaDate = new Date(year, month - 1, day);
                            return format(reservaDate, "dd/MM/yyyy", { locale: ptBR });
                          })()}
                        </td>
                        <td className="p-3 text-sm font-medium">{reserva.responsavel}</td>
                        <td className="p-3 text-sm">{reserva.telefone ? formatPhoneNumber(reserva.telefone) : "-"}</td>
                        <td className="p-3 text-sm">{passeio?.nome}</td>
                        <td className="p-3 text-sm">{reserva.horario || "-"}</td>
                        <td className="p-3 text-sm">{reserva.hotel || "-"}</td>
                        <td className="p-3 text-sm">{reserva.apartamento || "-"}</td>
                        <td className="p-3 text-sm font-semibold">{formatCurrency(reserva.valor)}</td>
                        <td className="p-3 text-sm font-semibold text-success">{formatCurrency(reserva.valor_pago)}</td>
                        <td className="p-3">
                          <div className="flex gap-1 justify-center" onClick={(e) => e.stopPropagation()}>
                            <Button size="icon" variant="ghost" onClick={() => openEditDialog(reserva)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" onClick={() => handleDelete(reserva.id)}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alert Dialog para confirmar exclusão */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir esta reserva? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Sim, Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialog de Detalhes da Reserva */}
      <Dialog open={!!reservaDetalhe} onOpenChange={(open) => !open && setReservaDetalhe(null)}>
        <DialogContent className="max-w-lg w-[95vw]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              📋 Detalhes da Reserva
            </DialogTitle>
          </DialogHeader>
          {reservaDetalhe && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Responsável</p>
                  <p className="font-medium">{reservaDetalhe.responsavel}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Passeio</p>
                  <p className="font-medium">{passeios.find(p => p.id === reservaDetalhe.passeio_id)?.nome || "-"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Data</p>
                  <p className="font-medium">
                    {(() => {
                      const [year, month, day] = reservaDetalhe.data.split('-').map(Number);
                      return format(new Date(year, month - 1, day), "dd/MM/yyyy", { locale: ptBR });
                    })()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Horário</p>
                  <p className="font-medium">{reservaDetalhe.horario || "-"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Hotel</p>
                  <p className="font-medium">{reservaDetalhe.hotel || "-"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Apartamento</p>
                  <p className="font-medium">{reservaDetalhe.apartamento || "-"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Telefone</p>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{reservaDetalhe.telefone ? formatPhoneNumber(reservaDetalhe.telefone) : "-"}</p>
                    {reservaDetalhe.telefone && (
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6"
                        onClick={() => {
                          navigator.clipboard.writeText(reservaDetalhe.telefone || "");
                          toast.success("Telefone copiado!");
                        }}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Confirmado</p>
                  <p className="font-medium flex items-center gap-1">
                    {reservaDetalhe.confirmado ? (
                      <><Check className="h-4 w-4 text-success" /> Sim</>
                    ) : "Não"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Valor Total</p>
                  <p className="font-medium">{formatCurrency(reservaDetalhe.valor)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Valor Pago</p>
                  <p className="font-medium text-success">{formatCurrency(reservaDetalhe.valor_pago)}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-muted-foreground">Status Pagamento</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    reservaDetalhe.status_pagamento === "pago" ? "bg-success/20 text-success" :
                    reservaDetalhe.status_pagamento === "parcial" ? "bg-warning/20 text-warning" :
                    "bg-destructive/20 text-destructive"
                  }`}>
                    {reservaDetalhe.status_pagamento === "pago" ? "Pago" : reservaDetalhe.status_pagamento === "parcial" ? "Parcial" : "Pendente"}
                  </span>
                </div>
              </div>
              {reservaDetalhe.participantes && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Participantes</p>
                  <div className="flex flex-wrap gap-1">
                    {reservaDetalhe.participantes.split(', ').map((p, i) => (
                      <span key={i} className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex gap-2 pt-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => {
                    openEditDialog(reservaDetalhe);
                    setReservaDetalhe(null);
                  }}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
                <Button 
                  variant="destructive" 
                  className="flex-1"
                  onClick={() => {
                    handleDelete(reservaDetalhe.id);
                    setReservaDetalhe(null);
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Excluir
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
