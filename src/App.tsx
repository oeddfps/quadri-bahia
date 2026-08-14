import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Agendamentos from "./pages/Agendamentos";
import Recebimentos from "./pages/Recebimentos";
import Passeios from "./pages/Passeios";
import Configuracoes from "./pages/Configuracoes";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <SidebarProvider defaultOpen={false}>
                    <div className="flex min-h-screen w-full overflow-x-hidden">
                      <AppSidebar />
                      <div className="flex-1 flex flex-col min-w-0">
                        <header className="h-12 md:h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center px-2 md:px-4 sticky top-0 z-50 safe-top">
                          <SidebarTrigger className="touch-target" />
                        </header>
                        <main className="flex-1 overflow-x-hidden safe-bottom">
                          <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/agendamentos" element={<Agendamentos />} />
                            <Route path="/recebimentos" element={<Recebimentos />} />
                            <Route path="/passeios" element={<Passeios />} />
                            <Route path="/configuracoes" element={<Configuracoes />} />
                            <Route path="*" element={<NotFound />} />
                          </Routes>
                        </main>
                      </div>
                    </div>
                  </SidebarProvider>
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
