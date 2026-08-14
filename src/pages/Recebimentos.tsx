import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, AlertCircle, DollarSign, Download, Filter, X } from "lucide-react";
import { toast } from "sonner";
import { format, parseISO, isFuture, isToday as isTodayFn, startOfDay, isWithinInterval, startOfMonth, endOfMonth } from "date-fns";
import { ptBR } from "date-fns/locale";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { downloadCsv } from "@/lib/csv";

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
  telefone: string | null;
  horario: string | null;
  periodo: string | null;
}

interface RecebimentoPorData {
  data: string;
  valorPendente: number;
  reservas: Array<{
    id: string;
    responsavel: string;
    passeio: string;
    valor: number;
    pago: number;
    pendente: number;
    telefone: string | null;
    horario: string | null;
    periodo: string | null;
    passeio_id: number;
  }>;
}

export default function Recebimentos() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [passeios, setPasseios] = useState<Passeio[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroPasseio, setFiltroPasseio] = useState("todos");
  const [filtroPeriodo, setFiltroPeriodo] = useState("todos");

  useEffect(() => {
    loadData();

    // Configurar realtime para reservas
    const channel = supabase
      .channel('recebimentos-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'quadribahia_reservas'
        },
        () => {
          console.log('Reserva atualizada - recarregando recebimentos');
          loadData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadData = async () => {
    try {
      const [reservasRes, passeiosRes] = await Promise.all([
        supabase.from("quadribahia_reservas").select("*").order("data", { ascending: true }),
        supabase.from("quadribahia_passeios").select("*").eq("ativo", true).order("nome")
      ]);

      if (reservasRes.error) throw reservasRes.error;
      if (passeiosRes.error) throw passeiosRes.error;

      setReservas(reservasRes.data || []);
      setPasseios(passeiosRes.data || []);
    } catch (error: any) {
      toast.error("Erro ao carregar dados: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(value || 0);
  };

  const exportarExcel = () => {
    const dadosExportacao = recebimentosFiltrados.map(item => 
      item.reservas.map(r => ({
        'Data': format(parseISO(item.data), "dd/MM/yyyy"),
        'Responsável': r.responsavel,
        'Passeio': r.passeio,
        'Telefone': r.telefone || "-",
        'Horário/Período': r.horario || r.periodo || "-",
        'Valor Total': r.valor,
        'Já Pago': r.pago,
        'A Receber': r.pendente
      }))
    ).flat();

    downloadCsv(dadosExportacao, `recebimentos_${format(new Date(), "dd-MM-yyyy")}.csv`);
    
    toast.success("Relatório exportado com sucesso!");
  };

  const limparFiltros = () => {
    setFiltroNome("");
    setFiltroPasseio("todos");
    setFiltroPeriodo("todos");
  };

  // Recebimentos pendentes por data (futuras e de hoje)
  const recebimentosPorData = reservas
    .filter(r => {
      const dataReserva = parseISO(r.data);
      const hoje = startOfDay(new Date());
      
      // Não mostrar se já foi pago totalmente
      if (r.status_pagamento === 'pago' && r.valor_pago >= r.valor) {
        return false;
      }
      
      // Mostrar apenas se for data futura ou hoje E tiver valor pendente
      return (isFuture(dataReserva) || isTodayFn(dataReserva)) && r.valor_pago < r.valor;
    })
    .reduce((acc, r) => {
      const dataKey = r.data;
      if (!acc[dataKey]) {
        acc[dataKey] = {
          data: dataKey,
          valorPendente: 0,
          reservas: []
        };
      }
      acc[dataKey].valorPendente += (r.valor - r.valor_pago);
      acc[dataKey].reservas.push({
        id: r.id,
        responsavel: r.responsavel,
        passeio: passeios.find(p => p.id === r.passeio_id)?.nome || 'Passeio',
        valor: r.valor,
        pago: r.valor_pago,
        pendente: r.valor - r.valor_pago,
        telefone: r.telefone,
        horario: r.horario,
        periodo: r.periodo,
        passeio_id: r.passeio_id
      });
      return acc;
    }, {} as Record<string, RecebimentoPorData>);

  const recebimentosArray = Object.values(recebimentosPorData).sort((a, b) => 
    new Date(a.data).getTime() - new Date(b.data).getTime()
  );

  // Aplicar filtros
  const recebimentosFiltrados = recebimentosArray.map(item => ({
    ...item,
    reservas: item.reservas.filter(r => {
      const matchNome = filtroNome === "" || 
        r.responsavel.toLowerCase().includes(filtroNome.toLowerCase());
      const matchPasseio = filtroPasseio === "todos" || 
        r.passeio_id.toString() === filtroPasseio;
      return matchNome && matchPasseio;
    })
  }))
  .filter(item => {
    if (item.reservas.length === 0) return false;
    
    const dataItem = parseISO(item.data);
    const hoje = new Date();
    
    if (filtroPeriodo === "hoje") {
      return isTodayFn(dataItem);
    } else if (filtroPeriodo === "semana") {
      const fimSemana = new Date(hoje);
      fimSemana.setDate(hoje.getDate() + 7);
      return isWithinInterval(dataItem, { start: hoje, end: fimSemana });
    } else if (filtroPeriodo === "mes") {
      return isWithinInterval(dataItem, { 
        start: startOfMonth(hoje), 
        end: endOfMonth(hoje) 
      });
    }
    return true;
  })
  .map(item => ({
    ...item,
    valorPendente: item.reservas.reduce((sum, r) => sum + r.pendente, 0)
  }))
  .filter(item => item.valorPendente > 0);

  const totalPendente = recebimentosFiltrados.reduce((sum, item) => sum + item.valorPendente, 0);

  // Dados para o gráfico
  const dadosGrafico = recebimentosFiltrados.slice(0, 10).map(item => ({
    data: format(parseISO(item.data), "dd/MM", { locale: ptBR }),
    valor: item.valorPendente,
    dataCompleta: format(parseISO(item.data), "dd 'de' MMMM", { locale: ptBR })
  }));

  const COLORS = ["hsl(var(--warning))", "hsl(var(--destructive))", "hsl(var(--primary))", "hsl(var(--secondary))"];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-muted-foreground">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary">Controle de Recebimentos</h1>
            <p className="text-muted-foreground">Valores a receber por data de agendamento</p>
          </div>
          <Button onClick={exportarExcel} className="gap-2">
            <Download className="h-4 w-4" />
            Exportar Excel
          </Button>
        </div>

        {/* Filtros */}
        <Card className="border-primary/20 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nome do Responsável</label>
                <Input
                  placeholder="Buscar por nome..."
                  value={filtroNome}
                  onChange={(e) => setFiltroNome(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Passeio</label>
                <Select value={filtroPasseio} onValueChange={setFiltroPasseio}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os Passeios</SelectItem>
                    {passeios.map(p => (
                      <SelectItem key={p.id} value={p.id.toString()}>{p.nome}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Período</label>
                <Select value={filtroPeriodo} onValueChange={setFiltroPeriodo}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="hoje">Hoje</SelectItem>
                    <SelectItem value="semana">Próximos 7 dias</SelectItem>
                    <SelectItem value="mes">Este Mês</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium opacity-0">Ação</label>
                <Button variant="outline" onClick={limparFiltros} className="w-full gap-2">
                  <X className="h-4 w-4" />
                  Limpar Filtros
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card de Total Pendente */}
        <Card className="border-warning/30 bg-warning/5 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <DollarSign className="h-6 w-6 text-warning" />
              Total Pendente de Recebimento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-warning">{formatCurrency(totalPendente)}</div>
            <p className="text-muted-foreground mt-1">{recebimentosFiltrados.length} data(s) com valores pendentes</p>
          </CardContent>
        </Card>

        {/* Gráfico de Valores Pendentes */}
        {dadosGrafico.length > 0 && (
          <Card className="border-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Valores Pendentes por Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dadosGrafico}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis 
                    dataKey="data" 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={11}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12}
                    tickFormatter={(value) => formatCurrency(value)}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                    formatter={(value: number) => [formatCurrency(value), "Valor Pendente"]}
                    labelFormatter={(label, payload) => {
                      if (payload && payload[0]) {
                        return payload[0].payload.dataCompleta;
                      }
                      return label;
                    }}
                  />
                  <Bar dataKey="valor" radius={[8, 8, 0, 0]}>
                    {dadosGrafico.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Tabela de Recebimentos */}
        {recebimentosFiltrados.length > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-6 w-6 text-warning" />
              <h2 className="text-2xl font-bold text-primary">Detalhamento dos Recebimentos</h2>
            </div>
            
            <Card className="border-primary/20 shadow-lg">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead>Responsável</TableHead>
                        <TableHead>Passeio</TableHead>
                        <TableHead>Telefone</TableHead>
                        <TableHead>Horário/Período</TableHead>
                        <TableHead className="text-right">Valor Total</TableHead>
                        <TableHead className="text-right">Já Pago</TableHead>
                        <TableHead className="text-right">A Receber</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recebimentosFiltrados.map((item) => (
                        item.reservas.map((reserva, idx) => (
                          <TableRow key={`${item.data}-${idx}`}>
                            {idx === 0 && (
                              <TableCell 
                                rowSpan={item.reservas.length}
                                className="font-medium border-r border-border/50 bg-muted/30"
                              >
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-warning" />
                                    <span>{format(parseISO(item.data), "dd/MM/yyyy", { locale: ptBR })}</span>
                                  </div>
                                  {isTodayFn(parseISO(item.data)) && (
                                    <span className="text-xs bg-warning/20 text-warning px-2 py-1 rounded-full">Hoje</span>
                                  )}
                                </div>
                              </TableCell>
                            )}
                            <TableCell className="font-medium">{reserva.responsavel}</TableCell>
                            <TableCell>{reserva.passeio}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {reserva.telefone || "-"}
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {reserva.horario || reserva.periodo || "-"}
                            </TableCell>
                            <TableCell className="text-right">{formatCurrency(reserva.valor)}</TableCell>
                            <TableCell className="text-right text-success font-medium">
                              {formatCurrency(reserva.pago)}
                            </TableCell>
                            <TableCell className="text-right text-warning font-bold">
                              {formatCurrency(reserva.pendente)}
                            </TableCell>
                          </TableRow>
                        ))
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Cards Agrupados por Data */}
            <div className="grid gap-4">
              {recebimentosFiltrados.map((item) => (
                <Card key={item.data} className="border-warning/30 bg-card shadow-lg">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-warning" />
                        {format(parseISO(item.data), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                        {isTodayFn(parseISO(item.data)) && (
                          <span className="text-xs bg-warning/20 text-warning px-2 py-1 rounded-full">Hoje</span>
                        )}
                      </span>
                      <span className="text-warning">{formatCurrency(item.valorPendente)}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-3">
                    <div className="text-right mb-3 pb-3 border-b border-border/50">
                      <p className="text-sm text-muted-foreground">Total do Dia</p>
                      <p className="text-2xl font-bold text-warning">{formatCurrency(item.valorPendente)}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <Card className="border-muted shadow-lg">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <div className="text-4xl">🔍</div>
                <p className="text-xl font-semibold">Nenhum resultado encontrado</p>
                <p className="text-muted-foreground">
                  {filtroNome || filtroPasseio !== "todos" || filtroPeriodo !== "todos"
                    ? "Tente ajustar os filtros para encontrar resultados"
                    : "Não há valores pendentes de recebimento"}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
