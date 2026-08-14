import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  permissions: string[];
  hasPermission: (menu: string) => boolean;
  loading: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchRolesAndProfile = async (userId: string) => {
      // Verificar role de admin
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();

      setIsAdmin(!!roles);

      // Buscar permissões do usuário (pode não existir ainda)
      const { data: profile } = await supabase
        .from("user_profiles")
        .select("permissions, ativo")
        .eq("id", userId)
        .maybeSingle();

      if (!profile) {
        setPermissions([]);
        return;
      }

      if (profile.ativo === false) {
        setPermissions([]);
        toast({
          title: "Usuário inativo",
          description: "Sua conta foi desativada. Entre em contato com o administrador.",
          variant: "destructive",
        });
        await supabase.auth.signOut();
        return;
      }

      setPermissions(profile.permissions || []);
    };

    // Set up auth state listener FIRST
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        setTimeout(() => {
          fetchRolesAndProfile(session.user.id);
        }, 0);
      } else {
        setIsAdmin(false);
        setPermissions([]);
      }
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [toast]);

  const signIn = async (username: string, password: string) => {
    try {
      const normalized = username.trim().toLowerCase();

      const emails = normalized.includes("@")
        ? [normalized]
        : [`${normalized}@quadribahia.com.br`, `${normalized}@quadribahia.com`];

      let lastError: unknown = null;
      for (const email of emails) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (!error) {
          lastError = null;
          break;
        }

        lastError = error;
      }

      if (lastError) {
        toast({
          title: "Erro ao fazer login",
          description: "Usuário ou senha incorretos",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo de volta",
      });

      navigate("/");
    } catch {
      toast({
        title: "Erro ao fazer login",
        description: "Ocorreu um erro inesperado",
        variant: "destructive",
      });
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
    setPermissions([]);
    navigate("/auth");
    toast({
      title: "Logout realizado",
      description: "Até logo!",
    });
  };

  const hasPermission = (menu: string) => {
    if (isAdmin) return true; // Admin tem acesso a tudo
    return permissions.includes(menu);
  };

  return (
    <AuthContext.Provider value={{ user, session, isAdmin, permissions, hasPermission, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
