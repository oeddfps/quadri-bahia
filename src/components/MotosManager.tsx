import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bike, Save } from "lucide-react";
import { toast } from "sonner";

interface Moto {
  id: string;
  ordem: number;
  nome: string;
}

export function MotosManager() {
  const [motos, setMotos] = useState<Moto[]>([]);
  const [edits, setEdits] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("quadribahia_motos")
      .select("*")
      .order("ordem");
    if (error) {
      toast.error("Erro ao carregar motos: " + error.message);
    } else {
      setMotos((data || []) as Moto[]);
      const initial: Record<string, string> = {};
      (data || []).forEach((m: any) => (initial[m.id] = m.nome));
      setEdits(initial);
    }
    setLoading(false);
  };

  const handleSave = async (moto: Moto) => {
    const novoNome = (edits[moto.id] || "").trim();
    if (!novoNome) {
      toast.error("O nome da moto não pode ficar vazio");
      return;
    }
    setSaving(moto.id);
    const { error } = await supabase
      .from("quadribahia_motos")
      .update({ nome: novoNome })
      .eq("id", moto.id);
    setSaving(null);
    if (error) {
      toast.error("Erro ao salvar: " + error.message);
    } else {
      toast.success(`Moto ${moto.ordem} renomeada para "${novoNome}"`);
      load();
    }
  };

  return (
    <Card className="border-primary/20 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bike className="h-5 w-5" />
          Motos / Quadriciclos
        </CardTitle>
        <CardDescription>
          Defina o nome das 6 motos. Esses nomes aparecem na hora de criar agendamentos e no ranking do dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-sm text-muted-foreground">Carregando...</p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {motos.map((m) => (
              <div key={m.id} className="flex items-end gap-2">
                <div className="flex-1 space-y-1">
                  <label className="text-xs text-muted-foreground">Moto {m.ordem}</label>
                  <Input
                    value={edits[m.id] ?? ""}
                    onChange={(e) =>
                      setEdits((prev) => ({ ...prev, [m.id]: e.target.value }))
                    }
                    placeholder={`Moto ${m.ordem}`}
                  />
                </div>
                <Button
                  size="sm"
                  onClick={() => handleSave(m)}
                  disabled={saving === m.id || (edits[m.id] || "").trim() === m.nome}
                >
                  <Save className="h-4 w-4 mr-1" />
                  Salvar
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
