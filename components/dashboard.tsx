"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import { Menu } from "lucide-react"
import Image from "next/image"

interface Project {
  id: number
  name: string
  task: string
  model: string
  status: string
  accuracy: number | null
  latency: number | null
  createdAt: string
}

interface DashboardProps {
  projects: Project[]
  onProjectSelect: (project: Project) => void
}

export default function Dashboard({ projects, onProjectSelect }: DashboardProps) {
  const { toggleSidebar } = useSidebar()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "status-success"
      case "training":
        return "status-warning"
      case "failed":
        return "status-error"
      default:
        return "bg-gray-500"
    }
  }

  const getModelLogo = (model: string) => {
    const modelLower = model.toLowerCase()

    if (modelLower.includes("resnet")) {
      return "/images/pytorch-logo.png"
    } else if (modelLower.includes("efficientnet")) {
      return "/images/pytorch-logo.png"
    } else if (modelLower.includes("vgg")) {
      return "/images/pytorch-logo.png"
    } else if (modelLower.includes("yolo")) {
      return "/images/yolo-logo.png"
    } else if (modelLower.includes("ssd")) {
      return "/images/tensorflow-logo.png"
    } else if (modelLower.includes("faster r-cnn")) {
      return "/images/tensorflow-logo.png"
    } else if (modelLower.includes("u-net")) {
      return "/images/neural-network-logo.png"
    } else if (modelLower.includes("transformer")) {
      return "/images/neural-network-logo.png"
    } else if (modelLower.includes("lstm") || modelLower.includes("gru")) {
      return "/images/neural-network-logo.png"
    } else if (modelLower.includes("pytorch")) {
      return "/images/pytorch-logo.png"
    } else if (modelLower.includes("tensorflow")) {
      return "/images/tensorflow-logo.png"
    } else {
      return "/images/neural-network-logo.png"
    }
  }

  return (
    <div className="p-3 sm:p-6 space-y-4 sm:space-y-6 relative min-h-screen itmo-grid-background">
      {/* Mobile Header */}
      <div className="flex items-center gap-4 md:hidden mb-4">
        <Button variant="ghost" size="sm" onClick={toggleSidebar} className="p-2 h-auto w-auto">
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold itmo-heading">Dashboard</h1>
      </div>

      {/* Decorative Dots - Hidden on mobile */}
      <div className="hidden sm:block itmo-dot" style={{ top: "15%", left: "85%" }}></div>
      <div className="hidden sm:block itmo-dot" style={{ top: "65%", left: "8%" }}></div>
      <div className="hidden sm:block itmo-dot" style={{ top: "40%", right: "15%" }}></div>
      <div className="hidden sm:block itmo-dot" style={{ bottom: "25%", left: "25%" }}></div>

      {/* Decorative Lines - Hidden on mobile */}
      <div className="hidden sm:block itmo-line" style={{ top: "20%", left: "10%", width: "200px" }}></div>
      <div className="hidden sm:block itmo-line" style={{ bottom: "30%", right: "10%", width: "150px" }}></div>

      <header className="relative z-10">
        <div className="hidden md:block">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2 itmo-heading">Dashboard</h1>
          <p className="text-muted-foreground mb-6">Управление проектами машинного обучения</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <Card className="itmo-metric-card relative overflow-hidden">
            <CardHeader className="pb-2 relative z-10">
              <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Всего проектов</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 relative z-10">
              <div className="text-2xl sm:text-3xl font-bold text-purple-400">{projects.length}</div>
              <div className="text-xs text-muted-foreground mt-1">активных проектов</div>
            </CardContent>
          </Card>

          <Card className="itmo-metric-card relative overflow-hidden">
            <CardHeader className="pb-2 relative z-10">
              <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Завершено</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 relative z-10">
              <div className="text-2xl sm:text-3xl font-bold text-green-400">
                {projects.filter((p) => p.status === "completed").length}
              </div>
              <div className="text-xs text-muted-foreground mt-1">успешно обучено</div>
            </CardContent>
          </Card>

          <Card className="itmo-metric-card relative overflow-hidden">
            <CardHeader className="pb-2 relative z-10">
              <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">В обучении</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 relative z-10">
              <div className="text-2xl sm:text-3xl font-bold text-yellow-400">
                {projects.filter((p) => p.status === "training").length}
              </div>
              <div className="text-xs text-muted-foreground mt-1">в процессе</div>
            </CardContent>
          </Card>
        </div>
      </header>

      <section className="relative z-10">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-white">Недавние проекты</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="itmo-card cursor-pointer hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 group"
              onClick={() => onProjectSelect(project)}
            >
              <CardHeader className="pb-2 relative z-10">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 relative">
                      <Image
                        src={getModelLogo(project.model) || "/placeholder.svg"}
                        alt={`${project.model} logo`}
                        fill
                        className="object-contain"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg?height=32&width=32&text=ML"
                        }}
                      />
                    </div>
                    <Badge
                      variant="outline"
                      className={`${getStatusColor(project.status)} text-white text-xs border-none`}
                    >
                      {project.status}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-sm sm:text-base leading-tight text-white group-hover:text-purple-300 transition-colors">
                  {project.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 relative z-10">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-muted-foreground">Задача:</span>
                  <span className="text-xs text-white truncate ml-2">{project.task}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-muted-foreground">Модель:</span>
                  <span className="text-xs text-white truncate ml-2">{project.model}</span>
                </div>
                {project.accuracy && (
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground">Точность:</span>
                    <span className="text-xs text-green-400 font-medium">{project.accuracy}%</span>
                  </div>
                )}
                {project.latency && (
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground">Задержка:</span>
                    <span className="text-xs text-blue-400 font-medium">{project.latency}ms</span>
                  </div>
                )}
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-muted-foreground">Создан:</span>
                  <span className="text-xs text-white">{project.createdAt}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
