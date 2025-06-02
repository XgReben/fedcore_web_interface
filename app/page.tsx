"use client"

import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import AppSidebar from "@/components/app-sidebar"
import Dashboard from "@/components/dashboard"
import ProjectCreation from "@/components/project-creation"
import ProjectDetails from "@/components/project-details"
import ModelsPage from "@/components/models-page"
import DatasetsPage from "@/components/datasets-page"
import DeploymentsPage from "@/components/deployments-page"
import DocumentationPage from "@/components/documentation-page"
import SettingsModal from "@/components/settings-modal"

export default function Home() {
  const [currentView, setCurrentView] = useState("dashboard")
  const [selectedProject, setSelectedProject] = useState(null)
  const [showSettings, setShowSettings] = useState(false)
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Image Classification Model",
      task: "classification",
      model: "ResNet18",
      status: "completed",
      accuracy: 94.2,
      latency: 12.5,
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      name: "Time Series Forecasting",
      task: "ts_forecasting",
      model: "Transformer",
      status: "training",
      accuracy: null,
      latency: null,
      createdAt: "2024-01-20",
    },
    {
      id: 3,
      name: "Object Detection System",
      task: "object_detection",
      model: "YOLOv8",
      status: "completed",
      accuracy: 89.7,
      latency: 18.3,
      createdAt: "2024-01-18",
    },
    {
      id: 4,
      name: "Medical Image Segmentation",
      task: "segmentation",
      model: "U-Net",
      status: "completed",
      accuracy: 92.1,
      latency: 45.8,
      createdAt: "2024-01-12",
    },
    {
      id: 5,
      name: "Edge Classification Model",
      task: "classification",
      model: "EfficientNet",
      status: "training",
      accuracy: null,
      latency: null,
      createdAt: "2024-01-22",
    },
    {
      id: 6,
      name: "Financial Prediction Model",
      task: "regression",
      model: "LSTM",
      status: "completed",
      accuracy: 87.3,
      latency: 8.9,
      createdAt: "2024-01-10",
    },
    {
      id: 7,
      name: "Real-time Face Detection",
      task: "object_detection",
      model: "SSD MobileNet",
      status: "failed",
      accuracy: null,
      latency: null,
      createdAt: "2024-01-19",
    },
    {
      id: 8,
      name: "Document Classification",
      task: "classification",
      model: "VGG16",
      status: "completed",
      accuracy: 91.8,
      latency: 32.1,
      createdAt: "2024-01-14",
    },
    {
      id: 9,
      name: "IoT Sensor Prediction",
      task: "ts_forecasting",
      model: "GRU",
      status: "training",
      accuracy: null,
      latency: null,
      createdAt: "2024-01-23",
    },
    {
      id: 10,
      name: "Custom Vision Model",
      task: "classification",
      model: "Custom-ResNet18",
      status: "completed",
      accuracy: 96.4,
      latency: 15.2,
      createdAt: "2024-01-16",
    },
  ])

  const handleCreateProject = (projectData) => {
    const newProject = {
      id: projects.length + 1,
      ...projectData,
      status: "created",
      accuracy: null,
      latency: null,
      createdAt: new Date().toISOString().split("T")[0],
    }
    setProjects([...projects, newProject])
    setCurrentView("dashboard")
  }

  const handleProjectSelect = (project) => {
    setSelectedProject(project)
    setCurrentView("project-details")
  }

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard projects={projects} onProjectSelect={handleProjectSelect} />
      case "create-project":
        return <ProjectCreation onCreateProject={handleCreateProject} />
      case "project-details":
        return <ProjectDetails project={selectedProject} />
      case "models":
        return <ModelsPage />
      case "datasets":
        return <DatasetsPage />
      case "deployments":
        return <DeploymentsPage />
      case "documentation":
        return <DocumentationPage />
      default:
        return <Dashboard projects={projects} onProjectSelect={handleProjectSelect} />
    }
  }

  // Добавить состояние для мобильного меню
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    // Обновить SidebarProvider с мобильными настройками
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen overflow-hidden bg-background">
        <AppSidebar
          currentView={currentView}
          onViewChange={setCurrentView}
          onSettingsClick={() => setShowSettings(true)}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
        <main className="flex-1 overflow-y-auto">{renderContent()}</main>
        {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
      </div>
    </SidebarProvider>
  )
}
