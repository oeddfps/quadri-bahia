import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Settings, Plus, UserPlus, Trash2, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Checkbox } from "@/components/ui/checkbox";
import { MotosManager } from "@/components/MotosManager";

interface UserProfile {
  id: string;
  username: string;
  permissions: string[];
  ativo: boolean;
  created_at: string;
}

const MENUS_DISPONIVEIS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'agendamentos', label: 'Agendamentos' },
  { id: 'recebimentos', label: 'Recebimentos' },
  { id: 'passeios', label: 'Passeios' },
];

export default function Configuracoes() {
  const { isAdmin, user } = useAuth();
  const [usuarios, setUsuarios] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Form states
  const [novoUsername, setNovoUsername] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [permissoesSelecionadas, setPermissoesSelecionadas] = useState<string[]>(['dashboard']);

  useEffect(() => {
    if (isAdmin) {
      loadUsuarios();
    }
  }, [isAdmin]);

  const loadUsuarios = async () => {
    try {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .order("created_at");

      if (error) throw error;
      setUsuarios(data || []);
    } catch (error: any) {
      toast.error("Erro ao carregar usuários: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCriarUsuario = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validar limite de usuários (1 master + 5 adicionais = 6 no total)
      if (usuarios.length >= 6) {
        toast.error("Limite de usuários atingido! Máximo de 6 usuários (1 master + 5 adicionais).");
        return;
      }

      if (!novoUsername || !novaSenha) {
        toast.error("Preencha todos os campos");
        return;
      }

      if (novaSenha.length < 6) {
        toast.error("A senha deve ter no mínimo 6 caracteres");
        return;
      }

      if (permissoesSelecionadas.length === 0) {
        toast.error("Selecione pelo menos uma permissão");
        return;
      }

      // Chamar edge function para criar usuário
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-user`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify({
            username: novoUsername,
            password: novaSenha,
            permissions: permissoesSelecionadas,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erro ao criar usuário');
      }

      toast.success("Usuário criado com sucesso!");
      setDialogOpen(false);
      resetForm();
      loadUsuarios();
    } catch (error: any) {
      toast.error("Erro ao criar usuário: " + error.message);
    }
  };

  const handleTogglePermissao = (menu: string) => {
    setPermissoesSelecionadas(prev => {
      if (prev.includes(menu)) {
        return prev.filter(p => p !== menu);
      } else {
        return [...prev, menu];
      }
    });
  };

  const handleToggleAtivo = async (userId: string, ativo: boolean) => {
    try {
      const { error } = await supabase
        .from("user_profiles")
        .update({ ativo: !ativo })
        .eq("id", userId);

      if (error) throw error;
      
      toast.success(`Usuário ${!ativo ? 'ativado' : 'desativado'} com sucesso`);
      loadUsuarios();
    } catch (error: any) {
      toast.error("Erro ao atualizar usuário: " + error.message);
    }
  };

  const handleDeleteUsuario = async (userId: string) => {
    if (!confirm("Tem certeza que deseja excluir este usuário?")) return;

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/delete-user`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify({ userId }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erro ao excluir usuário');
      }
      
      toast.success("Usuário excluído com sucesso");
      loadUsuarios();
    } catch (error: any) {
      toast.error("Erro ao excluir usuário: " + error.message);
    }
  };

  const resetForm = () => {
    setNovoUsername("");
    setNovaSenha("");
    setPermissoesSelecionadas(['dashboard']);
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 md:p-6 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <Shield className="h-16 w-16 mx-auto text-destructive" />
              <h2 className="text-2xl font-bold">Acesso Negado</h2>
              <p className="text-muted-foreground">
                Você não tem permissão para acessar as configurações do sistema.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-muted-foreground">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary flex items-center gap-2">
              <Settings className="h-8 w-8" />
              Configurações
            </h1>
            <p className="text-muted-foreground">Gerencie usuários e permissões do sistema</p>
          </div>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2" disabled={usuarios.length >= 6}>
                <Plus className="h-5 w-5" />
                Novo Usuário
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Novo Usuário</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCriarUsuario} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Usuário *</Label>
                  <Input
                    id="username"
                    value={novoUsername}
                    onChange={(e) => setNovoUsername(e.target.value)}
                    placeholder="Digite o usuário"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Email será: {novoUsername || 'usuario'}@quadribahia.com
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="senha">Senha *</Label>
                  <Input
                    id="senha"
                    type="password"
                    value={novaSenha}
                    onChange={(e) => setNovaSenha(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label>Permissões de Acesso *</Label>
                  <div className="space-y-2">
                    {MENUS_DISPONIVEIS.map(menu => (
                      <div key={menu.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={menu.id}
                          checked={permissoesSelecionadas.includes(menu.id)}
                          onCheckedChange={() => handleTogglePermissao(menu.id)}
                        />
                        <label
                          htmlFor={menu.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {menu.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} className="flex-1">
                    Cancelar
                  </Button>
                  <Button type="submit" className="flex-1">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Criar Usuário
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Info Card */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              <strong>Limite:</strong> Máximo de 6 usuários no sistema (1 administrador master + 5 usuários adicionais).
              Atualmente você tem <strong>{usuarios.length}</strong> usuário(s) cadastrado(s).
            </p>
          </CardContent>
        </Card>

        {/* Tabela de Usuários */}
        <Card className="border-primary/20 shadow-lg">
          <CardHeader>
            <CardTitle>Usuários do Sistema</CardTitle>
            <CardDescription>Gerencie os usuários e suas permissões de acesso</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuário</TableHead>
                    <TableHead>Permissões</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usuarios.map((usuario) => (
                    <TableRow key={usuario.id}>
                      <TableCell className="font-medium">
                        {usuario.username}
                        {usuario.id === user?.id && (
                          <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                            Você
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {usuario.permissions?.map(perm => (
                            <span key={perm} className="text-xs bg-secondary px-2 py-1 rounded">
                              {MENUS_DISPONIVEIS.find(m => m.id === perm)?.label || perm}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={usuario.ativo}
                          onCheckedChange={() => handleToggleAtivo(usuario.id, usuario.ativo)}
                          disabled={usuario.id === user?.id}
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteUsuario(usuario.id)}
                          disabled={usuario.id === user?.id}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Gerenciar Motos */}
        <MotosManager />
      </div>
    </div>
  );
}
