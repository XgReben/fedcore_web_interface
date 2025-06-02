"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { LayoutDashboard, PlusCircle, Brain, Database, Rocket, Settings, Github, BookOpen } from "lucide-react"

interface AppSidebarProps {
  currentView: string
  onViewChange: (view: string) => void
  onSettingsClick: () => void
  isMobileMenuOpen?: boolean
  setIsMobileMenuOpen?: (open: boolean) => void
}

export default function AppSidebar({
  currentView,
  onViewChange,
  onSettingsClick,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: AppSidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "create-project", label: "New Project", icon: PlusCircle },
    { id: "models", label: "Models", icon: Brain },
    { id: "datasets", label: "Datasets", icon: Database },
    { id: "deployments", label: "Deployments", icon: Rocket },
    { id: "documentation", label: "Documentation", icon: BookOpen },
    { id: "separator", label: "", icon: null }, // Разделитель
    { id: "github", label: "GitHub", icon: Github },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const handleViewChange = (view: string) => {
    if (view === "github") {
      window.open("https://github.com/v1docq/FedCore", "_blank")
      return
    }
    if (view === "settings") {
      onSettingsClick()
      return
    }

    onViewChange(view)
    if (setIsMobileMenuOpen) {
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar md:block">
      <SidebarHeader className="flex items-center gap-3 px-4 py-4 relative overflow-hidden bg-gradient-to-r from-purple-600/10 to-blue-600/10">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 text-white font-bold text-xl relative z-10">
          FC
        </div>
        <div className="relative z-10">
          <span className="text-2xl font-bold itmo-heading">FedCore</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarMenu>
          {menuItems.map((item) => {
            if (item.id === "separator") {
              return <div key="separator" className="my-2 border-t border-sidebar-border"></div>
            }

            return (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  isActive={currentView === item.id && item.id !== "github" && item.id !== "settings"}
                  onClick={() => handleViewChange(item.id)}
                  className="relative overflow-hidden group"
                >
                  {currentView === item.id && item.id !== "github" && item.id !== "settings" && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-md"></div>
                  )}
                  <item.icon className="h-4 w-4 relative z-10" />
                  <span className="relative z-10">{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
