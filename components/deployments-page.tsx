"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  Rocket,
  Cpu,
  Zap,
  Cloud,
  Monitor,
  Smartphone,
  Server,
  Play,
  Pause,
  Square,
  MoreVertical,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react"
import Image from "next/image"
import NewDeploymentModal from "./new-deployment-modal"
import RealTimeMonitoring from "./charts/real-time-monitoring"
import MetricsChart from "./charts/metrics-chart"

interface EdgeDevice {
  id: number
  name: string
  type: "cpu_x86" | "arm" | "risc_v" | "gpu" | "cloud"
  status: "online" | "offline" | "deploying" | "error"
  specs: {
    processor: string
    memory: string
    storage: string
    power: string
    npu?: string
  }
  location: string
  lastSeen: string
  deployedModels: number
  image: string
  logo: string
}

interface Deployment {
  id: number
  modelName: string
  deviceName: string
  status: "running" | "stopped" | "deploying" | "failed"
  accuracy: number
  latency: number
  throughput: number
  startTime: string
  cpuUsage: number
  memoryUsage: number
}

export default function DeploymentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [showNewDeploymentModal, setShowNewDeploymentModal] = useState(false)

  const edgeDevices: EdgeDevice[] = [
    {
      id: 1,
      name: "Raspberry Pi 5",
      type: "arm",
      status: "online",
      specs: {
        processor: "ARM Cortex-A76 Quad-core",
        memory: "8GB LPDDR4X",
        storage: "64GB microSD",
        power: "5W",
      },
      location: "Office - Desk 1",
      lastSeen: "2 minutes ago",
      deployedModels: 2,
      image: "/images/raspberry-pi.png",
      logo: "/images/arm-logo.png",
    },
    {
      id: 2,
      name: "NVIDIA Jetson Orin",
      type: "gpu",
      status: "online",
      specs: {
        processor: "ARM Cortex-A78AE + GPU",
        memory: "32GB LPDDR5",
        storage: "64GB eMMC",
        power: "15-60W",
      },
      location: "Lab - Station A",
      lastSeen: "1 minute ago",
      deployedModels: 5,
      image: "/images/nvidia-gpu.webp",
      logo: "/images/gpu-logo.png",
    },
    {
      id: 3,
      name: "StarFive VisionFive 2",
      type: "risc_v",
      status: "online",
      specs: {
        processor: "RISC-V JH7110 Quad-core",
        memory: "8GB LPDDR4",
        storage: "128GB eMMC",
        power: "8W",
      },
      location: "Research Lab",
      lastSeen: "5 minutes ago",
      deployedModels: 1,
      image: "/images/starfive-risc-v.webp",
      logo: "/images/risc-v-logo.png",
    },
    {
      id: 4,
      name: "Orange Pi 4A",
      type: "arm",
      status: "deploying",
      specs: {
        processor: "Allwinner H618 Quad-core ARM Cortex-A53",
        memory: "4GB LPDDR4",
        storage: "32GB eMMC",
        power: "5W",
        npu: "1 TOPS NPU",
      },
      location: "Development Lab",
      lastSeen: "30 seconds ago",
      deployedModels: 1,
      image: "/images/risc-v-board-1.jpeg",
      logo: "/images/arm-logo.png",
    },
    {
      id: 5,
      name: "Khadas VIM4",
      type: "arm",
      status: "offline",
      specs: {
        processor: "ARM Cortex-A78 + A55",
        memory: "8GB LPDDR4X",
        storage: "32GB eMMC",
        power: "12W",
      },
      location: "Workshop",
      lastSeen: "2 hours ago",
      deployedModels: 0,
      image: "/images/arm-board.png",
      logo: "/images/arm-logo.png",
    },
    {
      id: 6,
      name: "AWS EC2 Instance",
      type: "cloud",
      status: "online",
      specs: {
        processor: "Intel Xeon Platinum",
        memory: "64GB DDR4",
        storage: "500GB NVMe",
        power: "Variable",
      },
      location: "us-east-1",
      lastSeen: "Just now",
      deployedModels: 8,
      image: "/placeholder.svg?height=200&width=300&text=Cloud",
      logo: "/images/cloud-logo.png",
    },
  ]

  const deployments: Deployment[] = [
    {
      id: 1,
      modelName: "ResNet18-Optimized",
      deviceName: "Raspberry Pi 5",
      status: "running",
      accuracy: 94.2,
      latency: 45.3,
      throughput: 22,
      startTime: "2024-01-25 14:30",
      cpuUsage: 65,
      memoryUsage: 78,
    },
    {
      id: 2,
      modelName: "YOLOv8-Edge",
      deviceName: "NVIDIA Jetson Orin",
      status: "running",
      accuracy: 89.7,
      latency: 12.8,
      throughput: 78,
      startTime: "2024-01-25 09:15",
      cpuUsage: 45,
      memoryUsage: 52,
    },
    {
      id: 3,
      modelName: "EfficientNet-B0",
      deviceName: "StarFive VisionFive 2",
      status: "running",
      accuracy: 91.5,
      latency: 67.2,
      throughput: 15,
      startTime: "2024-01-25 16:45",
      cpuUsage: 72,
      memoryUsage: 61,
    },
    {
      id: 4,
      modelName: "MobileNet-NPU",
      deviceName: "Orange Pi 4A",
      status: "deploying",
      accuracy: 0,
      latency: 0,
      throughput: 0,
      startTime: "2024-01-25 17:20",
      cpuUsage: 25,
      memoryUsage: 30,
    },
    {
      id: 5,
      modelName: "Custom-ResNet18",
      deviceName: "AWS EC2 Instance",
      status: "running",
      accuracy: 96.1,
      latency: 8.5,
      throughput: 156,
      startTime: "2024-01-25 08:00",
      cpuUsage: 38,
      memoryUsage: 42,
    },
  ]

  const getDeviceTypeIcon = (type: string) => {
    switch (type) {
      case "cpu_x86":
        return <Cpu className="h-5 w-5" />
      case "arm":
        return <Smartphone className="h-5 w-5" />
      case "risc_v":
        return <Monitor className="h-5 w-5" />
      case "gpu":
        return <Zap className="h-5 w-5" />
      case "cloud":
        return <Cloud className="h-5 w-5" />
      default:
        return <Server className="h-5 w-5" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
      case "running":
        return "bg-green-500"
      case "deploying":
        return "bg-yellow-500"
      case "offline":
      case "stopped":
        return "bg-gray-500"
      case "error":
      case "failed":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
      case "running":
        return <CheckCircle className="h-4 w-4" />
      case "deploying":
        return <Clock className="h-4 w-4" />
      case "error":
      case "failed":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const filteredDevices = edgeDevices.filter((device) => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || device.type === filterType
    const matchesStatus = filterStatus === "all" || device.status === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const handleNewDeployment = (deploymentData: any) => {
    console.log("New deployment:", deploymentData)
    setShowNewDeploymentModal(false)
    // Here you would typically add the new deployment to your state or send it to an API
  }

  // Performance metrics for monitoring charts
  const performanceData = [
    { label: "Raspberry Pi", value: 22, color: "#06b6d4" },
    { label: "Jetson Orin", value: 78, color: "#10b981" },
    { label: "VisionFive 2", value: 15, color: "#8b5cf6" },
    { label: "AWS EC2", value: 156, color: "#f59e0b" },
  ]

  const latencyData = [
    { label: "Raspberry Pi", value: 45.3, color: "#06b6d4" },
    { label: "Jetson Orin", value: 12.8, color: "#10b981" },
    { label: "VisionFive 2", value: 67.2, color: "#8b5cf6" },
    { label: "AWS EC2", value: 8.5, color: "#f59e0b" },
  ]

  return (
    <div className="p-6 space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Edge Deployments</h1>
          <p className="text-muted-foreground">Deploy and manage models on edge devices</p>
        </div>
        <Button onClick={() => setShowNewDeploymentModal(true)}>
          <Rocket className="h-4 w-4 mr-2" />
          New Deployment
        </Button>
      </header>

      <Tabs defaultValue="devices" className="space-y-6">
        <TabsList>
          <TabsTrigger value="devices">Edge Devices</TabsTrigger>
          <TabsTrigger value="deployments">Active Deployments</TabsTrigger>
          <TabsTrigger value="monitoring">Real-time Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="devices" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search devices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="cpu_x86">x86 CPU</SelectItem>
                <SelectItem value="arm">ARM</SelectItem>
                <SelectItem value="risc_v">RISC-V</SelectItem>
                <SelectItem value="gpu">GPU</SelectItem>
                <SelectItem value="cloud">Cloud</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
                <SelectItem value="deploying">Deploying</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDevices.map((device) => (
              <Card key={device.id} className="hover:border-primary transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{device.name}</CardTitle>
                      <div className="flex items-center gap-2">
                        {getDeviceTypeIcon(device.type)}
                        <span className="text-sm text-muted-foreground capitalize">
                          {device.type.replace("_", " ")}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(device.status)}
                      <Badge variant="outline" className={`${getStatusColor(device.status)} text-white text-xs`}>
                        {device.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="w-full h-32 relative rounded-md overflow-hidden bg-muted">
                    <Image
                      src={device.image || "/placeholder.svg"}
                      alt={device.name}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=128&width=200&text=Device"
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Processor:</span>
                      <span className="text-xs">{device.specs.processor}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Memory:</span>
                      <span className="text-xs">{device.specs.memory}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Storage:</span>
                      <span className="text-xs">{device.specs.storage}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Power:</span>
                      <span className="text-xs">{device.specs.power}</span>
                    </div>
                    {device.specs.npu && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">NPU:</span>
                        <span className="text-xs text-primary font-medium">{device.specs.npu}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Location:</span>
                      <span className="text-xs">{device.location}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Models:</span>
                      <span className="text-xs">{device.deployedModels}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Last seen:</span>
                      <span className="text-xs">{device.lastSeen}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1"
                      disabled={device.status === "offline"}
                      onClick={() => setShowNewDeploymentModal(true)}
                    >
                      <Rocket className="h-3 w-3 mr-1" />
                      Deploy
                    </Button>
                    <Button size="sm" variant="outline">
                      <MoreVertical className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="deployments" className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {deployments.map((deployment) => (
              <Card key={deployment.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{deployment.modelName}</CardTitle>
                      <p className="text-sm text-muted-foreground">on {deployment.deviceName}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(deployment.status)}
                      <Badge variant="outline" className={`${getStatusColor(deployment.status)} text-white`}>
                        {deployment.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {deployment.accuracy > 0 ? `${deployment.accuracy}%` : "-"}
                      </div>
                      <div className="text-xs text-muted-foreground">Accuracy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {deployment.latency > 0 ? `${deployment.latency}ms` : "-"}
                      </div>
                      <div className="text-xs text-muted-foreground">Latency</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {deployment.throughput > 0 ? `${deployment.throughput}/s` : "-"}
                      </div>
                      <div className="text-xs text-muted-foreground">Throughput</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{deployment.cpuUsage}%</div>
                      <div className="text-xs text-muted-foreground">CPU Usage</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{deployment.memoryUsage}%</div>
                      <div className="text-xs text-muted-foreground">Memory</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium">{deployment.startTime}</div>
                      <div className="text-xs text-muted-foreground">Started</div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>CPU Usage</span>
                      <span>{deployment.cpuUsage}%</span>
                    </div>
                    <Progress value={deployment.cpuUsage} className="h-2" />

                    <div className="flex justify-between text-sm">
                      <span>Memory Usage</span>
                      <span>{deployment.memoryUsage}%</span>
                    </div>
                    <Progress value={deployment.memoryUsage} className="h-2" />
                  </div>

                  <div className="flex gap-2">
                    {deployment.status === "running" ? (
                      <Button size="sm" variant="outline">
                        <Pause className="h-3 w-3 mr-1" />
                        Pause
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline">
                        <Play className="h-3 w-3 mr-1" />
                        Start
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      <Square className="h-3 w-3 mr-1" />
                      Stop
                    </Button>
                    <Button size="sm" variant="outline">
                      <MoreVertical className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Devices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{edgeDevices.length}</div>
                <p className="text-xs text-muted-foreground">
                  {edgeDevices.filter((d) => d.status === "online").length} online
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active Deployments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{deployments.filter((d) => d.status === "running").length}</div>
                <p className="text-xs text-muted-foreground">
                  {deployments.filter((d) => d.status === "deploying").length} deploying
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Avg Latency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(
                    deployments.filter((d) => d.latency > 0).reduce((sum, d) => sum + d.latency, 0) /
                      deployments.filter((d) => d.latency > 0).length,
                  )}
                  ms
                </div>
                <p className="text-xs text-muted-foreground">across all devices</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Throughput</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{deployments.reduce((sum, d) => sum + d.throughput, 0)}/s</div>
                <p className="text-xs text-muted-foreground">inferences per second</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>CPU Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <RealTimeMonitoring title="System CPU Usage" unit="%" color="#ef4444" maxValue={100} minValue={0} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Memory Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <RealTimeMonitoring title="System Memory" unit="%" color="#06b6d4" maxValue={100} minValue={0} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Network Latency</CardTitle>
              </CardHeader>
              <CardContent>
                <RealTimeMonitoring
                  title="Network Response Time"
                  unit="ms"
                  color="#8b5cf6"
                  maxValue={200}
                  minValue={0}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Throughput by Device</CardTitle>
              </CardHeader>
              <CardContent>
                <MetricsChart data={performanceData} title="Inferences per Second" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Latency Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <MetricsChart data={latencyData} title="Average Response Time (ms)" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Power Consumption</CardTitle>
              </CardHeader>
              <CardContent>
                <RealTimeMonitoring title="Total Power Usage" unit="W" color="#f59e0b" maxValue={100} minValue={0} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {showNewDeploymentModal && (
        <NewDeploymentModal
          devices={edgeDevices}
          onClose={() => setShowNewDeploymentModal(false)}
          onDeploy={handleNewDeployment}
        />
      )}
    </div>
  )
}
