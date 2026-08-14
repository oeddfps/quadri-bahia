import { LayoutDashboard, Calendar, DollarSign, MapPin, Settings, LogOut } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import logoQuadribahia from "@/assets/logo-quadribahia.png";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { id: 'dashboard', title: "Dashboard Financeiro", url: "/", icon: LayoutDashboard },
  { id: 'agendamentos', title: "Agendamentos", url: "/agendamentos", icon: Calendar },
  { id: 'recebimentos', title: "Recebimentos", url: "/recebimentos", icon: DollarSign },
  { id: 'passeios', title: "Passeios", url: "/passeios", icon: MapPin },
];

export function AppSidebar() {
  const { state, open, setOpen } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;
  const { signOut, hasPermission, isAdmin } = useAuth();

  // Filtrar itens do menu baseado nas permissões
  const allowedItems = menuItems.filter(item => hasPermission(item.id));

  return (
    <Sidebar 
      className={collapsed ? "w-14" : "w-60"} 
      collapsible="icon"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <SidebarContent>
        <motion.div 
          className="flex items-center justify-center p-3"
          animate={{ 
            scale: collapsed ? 0.8 : 1,
            padding: collapsed ? "0.5rem" : "0.75rem"
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <motion.img 
            src={logoQuadribahia} 
            alt="Quadribahia Logo" 
            className="object-contain"
            animate={{ 
              width: collapsed ? 32 : 80,
              height: collapsed ? 32 : 80
            }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          />
        </motion.div>

        <SidebarGroup>
          <SidebarGroupLabel>
            <motion.span
              animate={{
                opacity: collapsed ? 0 : 1,
                display: collapsed ? "none" : "inline-block"
              }}
              transition={{ duration: 0.15 }}
            >
              Menu Principal
            </motion.span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {allowedItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="hover:bg-muted/50 transition-all duration-200 group"
                      activeClassName="bg-primary/10 text-primary font-medium"
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      <motion.span
                        animate={{
                          opacity: collapsed ? 0 : 1,
                          display: collapsed ? "none" : "inline-block"
                        }}
                        transition={{ duration: 0.15 }}
                        className="ml-3 group-hover:translate-x-1 transition-transform duration-150"
                      >
                        {item.title}
                      </motion.span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              
              {/* Configurações - apenas para admin */}
              {isAdmin && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to="/configuracoes"
                      className="hover:bg-muted/50 transition-all duration-200 group"
                      activeClassName="bg-primary/10 text-primary font-medium"
                    >
                      <Settings className="h-5 w-5 flex-shrink-0" />
                      <motion.span
                        animate={{
                          opacity: collapsed ? 0 : 1,
                          display: collapsed ? "none" : "inline-block"
                        }}
                        transition={{ duration: 0.15 }}
                        className="ml-3 group-hover:translate-x-1 transition-transform duration-150"
                      >
                        Configurações
                      </motion.span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <motion.div 
          className="mt-auto border-t"
          animate={{ padding: collapsed ? "0.5rem" : "0.75rem" }}
          transition={{ duration: 0.2 }}
        >
          <Button
            variant="ghost"
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 group transition-all duration-200"
            onClick={signOut}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            <motion.span
              animate={{
                opacity: collapsed ? 0 : 1,
                display: collapsed ? "none" : "inline-block"
              }}
              transition={{ duration: 0.15 }}
              className="ml-3 group-hover:translate-x-1 transition-transform duration-150"
            >
              Sair
            </motion.span>
          </Button>
        </motion.div>
      </SidebarContent>
    </Sidebar>
  );
}
