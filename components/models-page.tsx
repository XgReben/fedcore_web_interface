"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, Upload, Star, Zap } from "lucide-react"
import Image from "next/image"

interface Model {
  id: number
  name: string
  type: string
  task: string
  size: string
  accuracy: number
  latency: number
  downloads: number
  rating: number
  isCustom: boolean
  description: string
  tags: string[]
}

export default function ModelsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterTask, setFilterTask] = useState("all")
  const [filterType, setFilterType] = useState("all")

  const models: Model[] = [
    {
      id: 1,
      name: "ResNet18",
      type: "CNN",
      task: "classification",
      size: "44.7 MB",
      accuracy: 69.8,
      latency: 12.5,
      downloads: 15420,
      rating: 4.8,
      isCustom: false,
      description: "Deep residual network with 18 layers for image classification",
      tags: ["pytorch", "pretrained", "imagenet"],
    },
    {
      id: 2,
      name: "ResNet50",
      type: "CNN",
      task: "classification",
      size: "97.8 MB",
      accuracy: 76.1,
      latency: 25.3,
      downloads: 23150,
      rating: 4.9,
      isCustom: false,
      description: "Deep residual network with 50 layers for image classification",
      tags: ["pytorch", "pretrained", "imagenet"],
    },
    {
      id: 3,
      name: "EfficientNet-B0",
      type: "CNN",
      task: "classification",
      size: "20.3 MB",
      accuracy: 77.3,
      latency: 8.7,
      downloads: 18900,
      rating: 4.7,
      isCustom: false,
      description: "Efficient convolutional neural network optimized for mobile devices",
      tags: ["pytorch", "efficient", "mobile"],
    },
    {
      id: 4,
      name: "YOLOv8",
      type: "CNN",
      task: "object_detection",
      size: "22.5 MB",
      accuracy: 53.9,
      latency: 15.2,
      downloads: 31200,
      rating: 4.9,
      isCustom: false,
      description: "You Only Look Once v8 for real-time object detection",
      tags: ["tensorflow", "realtime", "detection"],
    },
    {
      id: 5,
      name: "Transformer-TSF",
      type: "Transformer",
      task: "ts_forecasting",
      size: "156.2 MB",
      accuracy: 85.4,
      latency: 45.8,
      downloads: 8750,
      rating: 4.6,
      isCustom: false,
      description: "Transformer model for time series forecasting",
      tags: ["pytorch", "timeseries", "forecasting"],
    },
    {
      id: 6,
      name: "U-Net",
      type: "CNN",
      task: "segmentation",
      size: "87.3 MB",
      accuracy: 92.1,
      latency: 28.4,
      downloads: 12500,
      rating: 4.7,
      isCustom: false,
      description: "Convolutional network for biomedical image segmentation",
      tags: ["pytorch", "medical", "segmentation"],
    },
    {
      id: 7,
      name: "VGG16",
      type: "CNN",
      task: "classification",
      size: "528 MB",
      accuracy: 71.3,
      latency: 45.2,
      downloads: 18700,
      rating: 4.5,
      isCustom: false,
      description: "Very deep convolutional network for large-scale image recognition",
      tags: ["pytorch", "pretrained", "classic"],
    },
    {
      id: 8,
      name: "SSD MobileNet",
      type: "CNN",
      task: "object_detection",
      size: "27.3 MB",
      accuracy: 48.2,
      latency: 18.7,
      downloads: 9800,
      rating: 4.4,
      isCustom: false,
      description: "Single Shot MultiBox Detector with MobileNet backbone",
      tags: ["tensorflow", "mobile", "detection"],
    },
    {
      id: 9,
      name: "LSTM-Forecaster",
      type: "RNN",
      task: "ts_forecasting",
      size: "45.8 MB",
      accuracy: 78.9,
      latency: 12.3,
      downloads: 6700,
      rating: 4.3,
      isCustom: false,
      description: "Long Short-Term Memory network for time series prediction",
      tags: ["pytorch", "timeseries", "rnn"],
    },
    {
      id: 10,
      name: "Custom-ResNet18",
      type: "CNN",
      task: "classification",
      size: "44.7 MB",
      accuracy: 94.2,
      latency: 12.5,
      downloads: 0,
      rating: 0,
      isCustom: true,
      description: "Custom trained ResNet18 for specific classification task",
      tags: ["custom", "trained", "optimized"],
    },
  ]

  const getModelLogo = (name: string, type: string) => {
    const nameLower = name.toLowerCase()

    if (nameLower.includes("resnet")) {
      return "/images/pytorch-logo.png" // fallback to existing
    } else if (nameLower.includes("efficientnet")) {
      return "/images/pytorch-logo.png" // fallback to existing
    } else if (nameLower.includes("vgg")) {
      return "/images/pytorch-logo.png" // fallback to existing
    } else if (nameLower.includes("yolo")) {
      return "/images/yolo-logo.png"
    } else if (nameLower.includes("ssd")) {
      return "/images/tensorflow-logo.png" // fallback to existing
    } else if (nameLower.includes("faster r-cnn")) {
      return "/images/tensorflow-logo.png" // fallback to existing
    } else if (nameLower.includes("u-net")) {
      return "/images/neural-network-logo.png" // fallback to existing
    } else if (nameLower.includes("transformer")) {
      return "/images/neural-network-logo.png" // fallback to existing
    } else if (nameLower.includes("lstm") || nameLower.includes("gru")) {
      return "/images/neural-network-logo.png" // fallback to existing
    } else if (type.toLowerCase().includes("cnn")) {
      return "/images/neural-network-logo.png"
    } else if (type.toLowerCase().includes("transformer")) {
      return "/images/neural-network-logo.png"
    } else if (type.toLowerCase().includes("rnn")) {
      return "/images/neural-network-logo.png"
    } else {
      return "/images/neural-network-logo.png" // default
    }
  }

  const getTaskColor = (task: string) => {
    switch (task) {
      case "classification":
        return "bg-blue-500"
      case "object_detection":
        return "bg-green-500"
      case "segmentation":
        return "bg-purple-500"
      case "ts_forecasting":
        return "bg-orange-500"
      case "regression":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const filteredModels = models.filter((model) => {
    const matchesSearch =
      model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTask = filterTask === "all" || model.task === filterTask
    const matchesType = filterType === "all" || model.type.toLowerCase() === filterType.toLowerCase()

    return matchesSearch && matchesTask && matchesType
  })

  return (
    <div className="p-6 space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Models</h1>
          <p className="text-muted-foreground">Browse and manage machine learning models</p>
        </div>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload Model
        </Button>
      </header>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search models..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterTask} onValueChange={setFilterTask}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Filter by task" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tasks</SelectItem>
            <SelectItem value="classification">Classification</SelectItem>
            <SelectItem value="object_detection">Object Detection</SelectItem>
            <SelectItem value="segmentation">Segmentation</SelectItem>
            <SelectItem value="ts_forecasting">Time Series</SelectItem>
            <SelectItem value="regression">Regression</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="cnn">CNN</SelectItem>
            <SelectItem value="transformer">Transformer</SelectItem>
            <SelectItem value="rnn">RNN</SelectItem>
            <SelectItem value="lstm">LSTM</SelectItem>
            <SelectItem value="gru">GRU</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModels.map((model) => (
          <Card key={model.id} className="hover:border-primary transition-colors">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 relative">
                    <Image
                      src={getModelLogo(model.name, model.type) || "/placeholder.svg"}
                      alt={`${model.name} logo`}
                      fill
                      className="object-contain"
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        e.currentTarget.src = "/placeholder.svg?height=40&width=40&text=ML"
                      }}
                    />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{model.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{model.type}</p>
                  </div>
                </div>
                {model.isCustom && (
                  <Badge variant="outline" className="bg-purple-500 text-white">
                    Custom
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{model.description}</p>

              <div className="flex flex-wrap gap-1">
                {model.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Task:</span>
                  <Badge variant="outline" className={`${getTaskColor(model.task)} text-white text-xs`}>
                    {model.task}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Size:</span>
                  <span>{model.size}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Accuracy:</span>
                  <span>{model.accuracy}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Latency:</span>
                  <span>{model.latency}ms</span>
                </div>
                {!model.isCustom && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Downloads:</span>
                      <span>{model.downloads.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Rating:</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{model.rating}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  <Download className="h-3 w-3 mr-1" />
                  Use Model
                </Button>
                <Button size="sm" variant="outline">
                  <Zap className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
