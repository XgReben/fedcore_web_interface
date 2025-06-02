"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, Upload, Database } from "lucide-react"
import Image from "next/image"

interface Dataset {
  id: number
  name: string
  type: string
  task: string
  size: string
  samples: number
  format: string
  isPublic: boolean
  description: string
  tags: string[]
  lastModified: string
}

export default function DatasetsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterTask, setFilterTask] = useState("all")
  const [filterType, setFilterType] = useState("all")

  const datasets: Dataset[] = [
    {
      id: 1,
      name: "CIFAR-10",
      type: "Image",
      task: "classification",
      size: "163 MB",
      samples: 60000,
      format: "PNG",
      isPublic: true,
      description: "60,000 32x32 color images in 10 classes, with 6,000 images per class",
      tags: ["computer-vision", "classification", "benchmark"],
      lastModified: "2024-01-15",
    },
    {
      id: 2,
      name: "ImageNet",
      type: "Image",
      task: "classification",
      size: "150 GB",
      samples: 14197122,
      format: "JPEG",
      isPublic: true,
      description: "Large scale image database designed for visual object recognition research",
      tags: ["computer-vision", "large-scale", "benchmark"],
      lastModified: "2024-01-10",
    },
    {
      id: 3,
      name: "COCO 2017",
      type: "Image",
      task: "object_detection",
      size: "25 GB",
      samples: 330000,
      format: "JPEG + JSON",
      isPublic: true,
      description: "Common Objects in Context dataset for object detection and segmentation",
      tags: ["object-detection", "segmentation", "annotations"],
      lastModified: "2024-01-08",
    },
    {
      id: 4,
      name: "Time Series Energy",
      type: "Tabular",
      task: "ts_forecasting",
      size: "45 MB",
      samples: 26304,
      format: "CSV",
      isPublic: false,
      description: "Energy consumption time series data for forecasting applications",
      tags: ["timeseries", "energy", "forecasting"],
      lastModified: "2024-01-20",
    },
    {
      id: 5,
      name: "Custom Medical Images",
      type: "Image",
      task: "segmentation",
      size: "2.3 GB",
      samples: 15000,
      format: "DICOM",
      isPublic: false,
      description: "Medical imaging dataset for diagnostic segmentation",
      tags: ["medical", "custom", "healthcare"],
      lastModified: "2024-01-18",
    },
    {
      id: 6,
      name: "Financial Data",
      type: "Tabular",
      task: "regression",
      size: "120 MB",
      samples: 500000,
      format: "CSV",
      isPublic: false,
      description: "Financial market data for price prediction and analysis",
      tags: ["finance", "regression", "market-data"],
      lastModified: "2024-01-22",
    },
  ]

  const getDatasetIcon = (type: string, task: string) => {
    if (type.toLowerCase() === "image") {
      if (task === "classification") {
        return "/images/pytorch-logo.png" // fallback to existing
      } else if (task === "object_detection") {
        return "/images/yolo-logo.png"
      } else if (task === "segmentation") {
        return "/images/neural-network-logo.png" // fallback to existing
      } else {
        return "/images/neural-network-logo.png"
      }
    } else if (type.toLowerCase() === "tabular") {
      if (task === "ts_forecasting") {
        return "/images/neural-network-logo.png" // fallback to existing
      } else {
        return "/images/neural-network-logo.png" // fallback to existing
      }
    } else {
      return "/images/neural-network-logo.png"
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

  const filteredDatasets = datasets.filter((dataset) => {
    const matchesSearch =
      dataset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dataset.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTask = filterTask === "all" || dataset.task === filterTask
    const matchesType = filterType === "all" || dataset.type.toLowerCase() === filterType.toLowerCase()

    return matchesSearch && matchesTask && matchesType
  })

  return (
    <div className="p-6 space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Datasets</h1>
          <p className="text-muted-foreground">Manage and explore your datasets</p>
        </div>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload Dataset
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Datasets</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="text-xl font-bold">{datasets.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Public</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="text-xl font-bold">{datasets.filter((d) => d.isPublic).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Private</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="text-xl font-bold">{datasets.filter((d) => !d.isPublic).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Samples</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="text-xl font-bold">
              {(datasets.reduce((sum, d) => sum + d.samples, 0) / 1000000).toFixed(1)}M
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search datasets..."
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
            <SelectItem value="image">Image</SelectItem>
            <SelectItem value="tabular">Tabular</SelectItem>
            <SelectItem value="text">Text</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDatasets.map((dataset) => (
          <Card key={dataset.id} className="hover:border-primary transition-colors">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 relative">
                    <Image
                      src={getDatasetIcon(dataset.type, dataset.task) || "/placeholder.svg"}
                      alt={`${dataset.type} dataset logo`}
                      fill
                      className="object-contain"
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        e.currentTarget.src = "/placeholder.svg?height=40&width=40&text=DATA"
                      }}
                    />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{dataset.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{dataset.type}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  {dataset.isPublic ? (
                    <Badge variant="outline" className="bg-green-500 text-white text-xs">
                      Public
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-orange-500 text-white text-xs">
                      Private
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{dataset.description}</p>

              <div className="flex flex-wrap gap-1">
                {dataset.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Task:</span>
                  <Badge variant="outline" className={`${getTaskColor(dataset.task)} text-white text-xs`}>
                    {dataset.task}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Size:</span>
                  <span>{dataset.size}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Samples:</span>
                  <span>{dataset.samples.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Format:</span>
                  <span>{dataset.format}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Modified:</span>
                  <span>{dataset.lastModified}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  <Download className="h-3 w-3 mr-1" />
                  Use Dataset
                </Button>
                <Button size="sm" variant="outline">
                  <Database className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
