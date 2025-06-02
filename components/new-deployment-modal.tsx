"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Rocket, Cpu, Smartphone, Monitor, Zap, Cloud, Server, CheckCircle, AlertCircle } from "lucide-react"
import Image from "next/image"

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

interface NewDeploymentModalProps {
  devices: EdgeDevice[]
  onClose: () => void
  onDeploy: (deploymentData: any) => void
}

export default function NewDeploymentModal({ devices, onClose, onDeploy }: NewDeploymentModalProps) {
  const [selectedModel, setSelectedModel] = useState("")
  const [selectedDevice, setSelectedDevice] = useState("")
  const [deploymentName, setDeploymentName] = useState("")
  const [optimizationLevel, setOptimizationLevel] = useState([2])
  const [enableQuantization, setEnableQuantization] = useState(false)
  const [enablePruning, setEnablePruning] = useState(false)
  const [enableNPU, setEnableNPU] = useState(false)
  const [batchSize, setBatchSize] = useState("1")
  const [maxLatency, setMaxLatency] = useState("100")
  const [description, setDescription] = useState("")

  const availableModels = [
    { id: "resnet18", name: "ResNet18", size: "44.7 MB", accuracy: "69.8%", type: "Classification" },
    { id: "resnet50", name: "ResNet50", size: "97.8 MB", accuracy: "76.1%", type: "Classification" },
    { id: "efficientnet", name: "EfficientNet-B0", size: "20.3 MB", accuracy: "77.3%", type: "Classification" },
    { id: "yolov8", name: "YOLOv8", size: "22.5 MB", accuracy: "53.9 mAP", type: "Object Detection" },
    { id: "mobilenet", name: "MobileNet-V3", size: "9.2 MB", accuracy: "75.2%", type: "Classification" },
    { id: "transformer", name: "Transformer-TSF", size: "156.2 MB", accuracy: "85.4%", type: "Time Series" },
    { id: "unet", name: "U-Net", size: "87.3 MB", accuracy: "92.1%", type: "Segmentation" },
    { id: "custom", name: "Custom Model", size: "Variable", accuracy: "Variable", type: "Custom" },
  ]

  const getDeviceTypeIcon = (type: string) => {
    switch (type) {
      case "cpu_x86":
        return <Cpu className="h-4 w-4" />
      case "arm":
        return <Smartphone className="h-4 w-4" />
      case "risc_v":
        return <Monitor className="h-4 w-4" />
      case "gpu":
        return <Zap className="h-4 w-4" />
      case "cloud":
        return <Cloud className="h-4 w-4" />
      default:
        return <Server className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "deploying":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-500"
      case "error":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <CheckCircle className="h-4 w-4" />
      case "error":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <CheckCircle className="h-4 w-4" />
    }
  }

  const onlineDevices = devices.filter((device) => device.status === "online")
  const selectedDeviceData = devices.find((device) => device.id.toString() === selectedDevice)

  const handleDeploy = () => {
    const deploymentData = {
      modelId: selectedModel,
      deviceId: selectedDevice,
      name: deploymentName,
      optimizationLevel: optimizationLevel[0],
      enableQuantization,
      enablePruning,
      enableNPU: enableNPU && selectedDeviceData?.specs.npu,
      batchSize: Number.parseInt(batchSize),
      maxLatency: Number.parseInt(maxLatency),
      description,
    }
    onDeploy(deploymentData)
  }

  const isFormValid = selectedModel && selectedDevice && deploymentName

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Rocket className="h-5 w-5" />
            New Edge Deployment
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="model" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="model">Model</TabsTrigger>
            <TabsTrigger value="device">Device</TabsTrigger>
            <TabsTrigger value="optimization">Optimization</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="model" className="space-y-4">
            <div>
              <Label className="text-base font-medium">Select Model</Label>
              <p className="text-sm text-muted-foreground mb-4">Choose a model to deploy</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableModels.map((model) => (
                <Card
                  key={model.id}
                  className={`cursor-pointer transition-colors ${
                    selectedModel === model.id ? "border-primary bg-primary/5" : "hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedModel(model.id)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{model.name}</CardTitle>
                      <Badge variant="outline">{model.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Size:</span>
                        <span>{model.size}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Accuracy:</span>
                        <span>{model.accuracy}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="device" className="space-y-4">
            <div>
              <Label className="text-base font-medium">Select Target Device</Label>
              <p className="text-sm text-muted-foreground mb-4">Choose an online device for deployment</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {onlineDevices.map((device) => (
                <Card
                  key={device.id}
                  className={`cursor-pointer transition-colors ${
                    selectedDevice === device.id.toString() ? "border-primary bg-primary/5" : "hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedDevice(device.id.toString())}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 relative">
                          <Image
                            src={device.logo || "/placeholder.svg"}
                            alt={`${device.type} logo`}
                            fill
                            className="object-contain"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg?height=40&width=40&text=DEV"
                            }}
                          />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{device.name}</CardTitle>
                          <div className="flex items-center gap-2">
                            {getDeviceTypeIcon(device.type)}
                            <span className="text-sm text-muted-foreground capitalize">
                              {device.type.replace("_", " ")}
                            </span>
                          </div>
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
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Processor:</span>
                          <br />
                          <span className="text-xs">{device.specs.processor}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Memory:</span>
                          <br />
                          <span className="text-xs">{device.specs.memory}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Power:</span>
                          <br />
                          <span className="text-xs">{device.specs.power}</span>
                        </div>
                        {device.specs.npu && (
                          <div className="text-sm">
                            <span className="text-muted-foreground">NPU:</span>
                            <br />
                            <span className="text-xs text-primary font-medium">{device.specs.npu}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="optimization" className="space-y-6">
            <div>
              <Label className="text-base font-medium">Optimization Settings</Label>
              <p className="text-sm text-muted-foreground mb-4">Configure model optimization for edge deployment</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <Label>Optimization Level</Label>
                <div className="px-3">
                  <Slider
                    value={optimizationLevel}
                    onValueChange={setOptimizationLevel}
                    max={3}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>None</span>
                    <span>Basic</span>
                    <span>Standard</span>
                    <span>Aggressive</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Level {optimizationLevel[0]}:{" "}
                  {optimizationLevel[0] === 0
                    ? "No optimization"
                    : optimizationLevel[0] === 1
                      ? "Basic optimizations for compatibility"
                      : optimizationLevel[0] === 2
                        ? "Standard optimizations for performance"
                        : "Aggressive optimizations for maximum speed"}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="quantization" checked={enableQuantization} onCheckedChange={setEnableQuantization} />
                    <Label htmlFor="quantization">Enable Quantization</Label>
                  </div>
                  <p className="text-sm text-muted-foreground ml-6">
                    Reduce model precision to INT8 for faster inference
                  </p>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="pruning" checked={enablePruning} onCheckedChange={setEnablePruning} />
                    <Label htmlFor="pruning">Enable Pruning</Label>
                  </div>
                  <p className="text-sm text-muted-foreground ml-6">
                    Remove unnecessary model parameters to reduce size
                  </p>
                </div>

                <div className="space-y-4">
                  {selectedDeviceData?.specs.npu && (
                    <>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="npu" checked={enableNPU} onCheckedChange={setEnableNPU} />
                        <Label htmlFor="npu">Enable NPU Acceleration</Label>
                      </div>
                      <p className="text-sm text-muted-foreground ml-6">
                        Use Neural Processing Unit for faster inference ({selectedDeviceData.specs.npu})
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div>
              <Label className="text-base font-medium">Deployment Settings</Label>
              <p className="text-sm text-muted-foreground mb-4">Configure deployment parameters</p>
            </div>

            <div className="space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="deployment-name">Deployment Name *</Label>
                <Input
                  id="deployment-name"
                  value={deploymentName}
                  onChange={(e) => setDeploymentName(e.target.value)}
                  placeholder="Enter deployment name"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="batch-size">Batch Size</Label>
                  <Select value={batchSize} onValueChange={setBatchSize}>
                    <SelectTrigger id="batch-size">
                      <SelectValue placeholder="Select batch size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 (Real-time)</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="8">8</SelectItem>
                      <SelectItem value="16">16</SelectItem>
                      <SelectItem value="32">32</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="max-latency">Max Latency (ms)</Label>
                  <Input
                    id="max-latency"
                    type="number"
                    value={maxLatency}
                    onChange={(e) => setMaxLatency(e.target.value)}
                    placeholder="100"
                  />
                </div>
              </div>

              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Optional description for this deployment"
                  rows={3}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleDeploy} disabled={!isFormValid}>
            <Rocket className="h-4 w-4 mr-2" />
            Deploy Model
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
