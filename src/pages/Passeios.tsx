import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Calendar } from "lucide-react";

interface Passeio {
  id: number;
  nome: string;
  descricao: string | null;
  ativo: boolean;
  tem_horario: boolean;
  horarios_disponiveis: string[] | null;
}

interface PrecoPasseio {
  id: string;
  passeio_id: number;
  valor: number;
  data_inicio: string;
  data_fim: string | null;
  ativo: boolean;
}

export default function Passeios() {
  const queryClient = useQueryClient();
  const [dialogAberto, setDialogAberto] = useState(false);
  const [dialogPrecos, setDialogPrecos] = useState(false);
  const [passeioSelecionado, setPasseioSelecionado] = useState<Passeio | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    ativo: true,
    tem_horario: false,
    horarios_disponiveis: [] as string[],
  });
  const [novoHorario, setNovoHorario] = useState("");
  const [precosForm, setPrecosForm] = useState<Array<{
    id?: string;
    valor: string;
    data_inicio: string;
    data_fim: string;
    ativo: boolean;
  }>>([]);

  // Configurar realtime para passeios e preços
  useEffect(() => {
    const passeiosChannel = supabase
      .channel('passeios-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'quadribahia_passeios'
        },
        () => {
          console.log('Passeio atualizado - recarregando');
          queryClient.invalidateQueries({ queryKey: ['passeios'] });
        }
      )
      .subscribe();

    const precosChannel = supabase
      .channel('precos-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'quadribahia_passeios_precos'
        },
        () => {
          console.log('Preço atualizado - recarregando');
          queryClient.invalidateQueries({ queryKey: ['todos_precos'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(passeiosChannel);
      supabase.removeChannel(precosChannel);
    };
  }, [queryClient]);

  // Buscar passeios
  const { data: passeiosData = [], isLoading } = useQuery({
    queryKey: ["passeios"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("quadribahia_passeios")
        .select("*")
        .order("id");
      if (error) throw error;
      return data as Passeio[];
    },
  });

  // Ordenar para sempre colocar quadribahia no topo
  const passeios = passeiosData.sort((a, b) => {
    const nomeA = a.nome.toLowerCase();
    const nomeB = b.nome.toLowerCase();
    if (nomeA.includes('quadribahia')) return -1;
    if (nomeB.includes('quadribahia')) return 1;
    return 0;
  });

  // Buscar todos os preços ativos
  const { data: todosPrecos = [] } = useQuery({
    queryKey: ["todos_precos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("quadribahia_passeios_precos")
        .select("*")
        .eq("ativo", true)
        .order("data_inicio", { ascending: false });
      if (error) throw error;
      return data as PrecoPasseio[];
    },
  });

  // Mutação para criar/atualizar passeio
  const mutationPasseio = useMutation({
    mutationFn: async () => {
      if (passeioSelecionado) {
        const { error } = await supabase
          .from("quadribahia_passeios")
          .update({
            nome: formData.nome,
            descricao: formData.descricao,
            ativo: formData.ativo,
            tem_horario: formData.tem_horario,
            horarios_disponiveis: formData.horarios_disponiveis,
          })
          .eq("id", passeioSelecionado.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("quadribahia_passeios")
          .insert({
            nome: formData.nome,
            descricao: formData.descricao,
            ativo: formData.ativo,
            tem_horario: formData.tem_horario,
            horarios_disponiveis: formData.horarios_disponiveis,
          });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["passeios"] });
      queryClient.invalidateQueries({ queryKey: ["todos_precos"] });
      setDialogAberto(false);
      toast({ title: passeioSelecionado ? "Passeio atualizado!" : "Passeio criado!" });
      resetForm();
    },
    onError: (error) => {
      toast({ title: "Erro ao salvar passeio", description: String(error), variant: "destructive" });
    },
  });

  // Mutação para deletar passeio
  const mutationDeletar = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from("quadribahia_passeios")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["passeios"] });
      toast({ title: "Passeio deletado!" });
    },
    onError: (error) => {
      toast({ title: "Erro ao deletar", description: String(error), variant: "destructive" });
    },
  });

  // Mutação para salvar preços
  const mutationPrecos = useMutation({
    mutationFn: async () => {
      if (!passeioSelecionado) return;

      // Buscar preços atuais
      const { data: precosAtuais } = await supabase
        .from("quadribahia_passeios_precos")
        .select("*")
        .eq("passeio_id", passeioSelecionado.id);

      // Deletar preços que foram removidos
      const precosIds = precosForm.filter(p => p.id).map(p => p.id);
      const precosParaDeletar = (precosAtuais || []).filter(p => !precosIds.includes(p.id));
      
      for (const preco of precosParaDeletar) {
        const { error } = await supabase
          .from("quadribahia_passeios_precos")
          .delete()
          .eq("id", preco.id);
        if (error) throw error;
      }

      // Inserir ou atualizar preços
      for (const preco of precosForm) {
        const precoData = {
          passeio_id: passeioSelecionado.id,
          valor: parseFloat(preco.valor),
          data_inicio: preco.data_inicio,
          data_fim: preco.data_fim || null,
          ativo: preco.ativo,
        };

        if (preco.id) {
          const { error } = await supabase
            .from("quadribahia_passeios_precos")
            .update(precoData)
            .eq("id", preco.id);
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from("quadribahia_passeios_precos")
            .insert(precoData);
          if (error) throw error;
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos_precos"] });
      toast({ title: "Preços atualizados!" });
      setDialogPrecos(false);
      setPasseioSelecionado(null);
      setPrecosForm([]);
    },
    onError: (error) => {
      toast({ title: "Erro ao salvar preços", description: String(error), variant: "destructive" });
    },
  });

  const resetForm = () => {
    setFormData({
      nome: "",
      descricao: "",
      ativo: true,
      tem_horario: false,
      horarios_disponiveis: [],
    });
    setPasseioSelecionado(null);
  };

  const abrirEdicao = (passeio: Passeio) => {
    setPasseioSelecionado(passeio);
    setFormData({
      nome: passeio.nome,
      descricao: passeio.descricao || "",
      ativo: passeio.ativo,
      tem_horario: passeio.tem_horario,
      horarios_disponiveis: passeio.horarios_disponiveis || [],
    });
    setDialogAberto(true);
  };

  const abrirPrecos = async (passeio: Passeio) => {
    setPasseioSelecionado(passeio);
    setDialogPrecos(true);
    
    // Buscar preços do passeio
    const { data: precosData } = await supabase
      .from("quadribahia_passeios_precos")
      .select("*")
      .eq("passeio_id", passeio.id)
      .order("data_inicio", { ascending: false });
    
    if (precosData && precosData.length > 0) {
      setPrecosForm(precosData.map(p => ({
        id: p.id,
        valor: p.valor.toString(),
        data_inicio: p.data_inicio,
        data_fim: p.data_fim || "",
        ativo: p.ativo,
      })));
    } else {
      setPrecosForm([]);
    }
  };

  const adicionarHorario = () => {
    if (novoHorario && !formData.horarios_disponiveis.includes(novoHorario)) {
      setFormData({
        ...formData,
        horarios_disponiveis: [...formData.horarios_disponiveis, novoHorario],
      });
      setNovoHorario("");
    }
  };

  const removerHorario = (horario: string) => {
    setFormData({
      ...formData,
      horarios_disponiveis: formData.horarios_disponiveis.filter(h => h !== horario),
    });
  };

  const adicionarPreco = () => {
    if (precosForm.length < 2) {
      setPrecosForm([
        ...precosForm,
        { valor: "", data_inicio: "", data_fim: "", ativo: true },
      ]);
    }
  };

  const removerPreco = (index: number) => {
    setPrecosForm(precosForm.filter((_, i) => i !== index));
  };

  const atualizarPreco = (index: number, campo: string, valor: any) => {
    const novosPrecos = [...precosForm];
    novosPrecos[index] = { ...novosPrecos[index], [campo]: valor };
    setPrecosForm(novosPrecos);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary">Gerenciar Passeios</h1>
          <p className="text-muted-foreground">Configure passeios e seus preços por período</p>
        </div>
        <Dialog open={dialogAberto} onOpenChange={(open) => {
          setDialogAberto(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Passeio
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {passeioSelecionado ? "Editar Passeio" : "Novo Passeio"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="nome">Nome do Passeio</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  placeholder="Ex: Passeio de Quadriciclo"
                />
              </div>

              <div>
                <Label htmlFor="descricao">Descrição do Passeio</Label>
                <Textarea
                  id="descricao"
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  placeholder="Descreva tudo que está incluído neste passeio..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.ativo}
                  onCheckedChange={(checked) => setFormData({ ...formData, ativo: checked })}
                />
                <Label>Passeio ativo</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.tem_horario}
                  onCheckedChange={(checked) => setFormData({ ...formData, tem_horario: checked })}
                />
                <Label>Tem horários específicos</Label>
              </div>

              {formData.tem_horario && (
                <div>
                  <Label>Horários Disponíveis</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      type="time"
                      value={novoHorario}
                      onChange={(e) => setNovoHorario(e.target.value)}
                      placeholder="Ex: 09:00"
                    />
                    <Button type="button" onClick={adicionarHorario}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.horarios_disponiveis.map((horario) => (
                      <div
                        key={horario}
                        className="flex items-center gap-1 bg-secondary px-3 py-1 rounded-md"
                      >
                        <span>{horario}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removerHorario(horario)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setDialogAberto(false)}>
                  Cancelar
                </Button>
                <Button onClick={() => mutationPasseio.mutate()}>
                  Salvar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Passeios</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Valores</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {passeios.map((passeio) => {
                const precosPasseio = todosPrecos.filter(p => p.passeio_id === passeio.id);

                return (
                  <TableRow key={passeio.id}>
                    <TableCell className="font-medium">
                      <div>
                        <div>{passeio.nome}</div>
                        {passeio.descricao && (
                          <div className="text-xs text-muted-foreground mt-1 max-w-md truncate">
                            {passeio.descricao}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          passeio.ativo
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {passeio.ativo ? "Ativo" : "Inativo"}
                      </span>
                    </TableCell>
                    <TableCell>
                      {precosPasseio.length > 0 ? (
                        <div className="space-y-1">
                          {precosPasseio.map((preco) => (
                            <div key={preco.id} className="text-sm">
                              <span className="font-medium">
                                {new Intl.NumberFormat("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                }).format(preco.valor)}
                              </span>
                              <span className="text-muted-foreground text-xs ml-2">
                                {preco.data_fim 
                                  ? `(${new Date(preco.data_inicio).toLocaleDateString()} - ${new Date(preco.data_fim).toLocaleDateString()})`
                                  : `(a partir de ${new Date(preco.data_inicio).toLocaleDateString()})`
                                }
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">Sem valores configurados</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => abrirPrecos(passeio)}
                    >
                      <Calendar className="h-4 w-4 mr-1" />
                      Preços
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => abrirEdicao(passeio)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        if (confirm("Tem certeza que deseja deletar este passeio?")) {
                          mutationDeletar.mutate(passeio.id);
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog de Preços */}
      <Dialog open={dialogPrecos} onOpenChange={(open) => {
        setDialogPrecos(open);
        if (!open) {
          setPasseioSelecionado(null);
          setPrecosForm([]);
        }
      }}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Configurar Preços - {passeioSelecionado?.nome}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Button 
              onClick={adicionarPreco} 
              className="gap-2"
              disabled={precosForm.length >= 2}
            >
              <Plus className="h-4 w-4" />
              Adicionar Período de Preço {precosForm.length >= 2 && "(Máximo 2)"}
            </Button>

            {precosForm.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                Nenhum preço configurado. Clique em "Adicionar Período de Preço" para começar.
              </div>
            )}

            {precosForm.map((preco, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label>Valor (R$)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={preco.valor}
                        onChange={(e) => atualizarPreco(index, "valor", e.target.value)}
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <Label>Data Início</Label>
                      <Input
                        type="date"
                        value={preco.data_inicio}
                        onChange={(e) => atualizarPreco(index, "data_inicio", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Data Fim (opcional)</Label>
                      <Input
                        type="date"
                        value={preco.data_fim}
                        onChange={(e) => atualizarPreco(index, "data_fim", e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Deixe vazio para preço vigente a partir da data início
                      </p>
                    </div>
                    <div className="flex items-end gap-2">
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={preco.ativo}
                          onCheckedChange={(checked) => atualizarPreco(index, "ativo", checked)}
                        />
                        <Label>Ativo</Label>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removerPreco(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setDialogPrecos(false)}>
                Cancelar
              </Button>
              <Button onClick={() => mutationPrecos.mutate()}>
                Salvar Preços
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
