"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Play } from "lucide-react"
import TrainingChart from "./charts/training-chart"
import MetricsChart from "./charts/metrics-chart"
import ConfusionMatrix from "./charts/confusion-matrix"

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

interface ProjectDetailsProps {
  project: Project | null
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  if (!project) {
    return <div className="p-6">No project selected</div>
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "training":
        return "bg-yellow-500"
      case "failed":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  // Realistic training data with proper learning curves
  const epochs = Array.from({ length: 50 }, (_, i) => i + 1)

  // Training loss - starts high, decreases with some noise
  const trainingLoss = epochs.map((epoch) => {
    const base = 2.5 * Math.exp(-epoch / 15) + 0.1
    const noise = (Math.random() - 0.5) * 0.1
    return Math.max(0.05, base + noise)
  })

  // Validation loss - similar to training but with more variance
  const validationLoss = epochs.map((epoch) => {
    const base = 2.8 * Math.exp(-epoch / 18) + 0.15
    const noise = (Math.random() - 0.5) * 0.15
    return Math.max(0.08, base + noise)
  })

  // Training accuracy - starts low, increases with plateau
  const trainingAccuracy = epochs.map((epoch) => {
    const base = 95 * (1 - Math.exp(-epoch / 12)) + 30
    const noise = (Math.random() - 0.5) * 2
    return Math.min(98, Math.max(30, base + noise))
  })

  // Validation accuracy - similar but slightly lower
  const validationAccuracy = epochs.map((epoch) => {
    const base = 92 * (1 - Math.exp(-epoch / 14)) + 28
    const noise = (Math.random() - 0.5) * 3
    return Math.min(95, Math.max(25, base + noise))
  })

  const metricsData = [
    { label: "Precision", value: 94.5, target: 90, color: "#06b6d4" },
    { label: "Recall", value: 93.8, target: 90, color: "#10b981" },
    { label: "F1-Score", value: 94.1, target: 90, color: "#8b5cf6" },
    { label: "AUC-ROC", value: 96.2, target: 95, color: "#f59e0b" },
    { label: "Specificity", value: 95.1, target: 92, color: "#ef4444" },
  ]

  // Realistic confusion matrix for binary classification
  const confusionMatrix = [
    [847, 23], // True Negative, False Positive
    [31, 899], // False Negative, True Positive
  ]
  const classLabels = ["Negative", "Positive"]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{project.name}</h1>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button size="sm">
            <Play className="h-4 w-4 mr-2" />
            Train Model
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="deployment">Deployment</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span>{project.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Task:</span>
                  <span>{project.task}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Model:</span>
                  <span>{project.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge variant="outline" className={`${getStatusColor(project.status)} text-white`}>
                    {project.status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created:</span>
                  <span>{project.createdAt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dataset Size:</span>
                  <span>1,800 samples</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Training Time:</span>
                  <span>2h 34m</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {project.accuracy && (
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-md border border-green-200">
                      <div className="text-2xl font-bold text-green-700">{project.accuracy}%</div>
                      <div className="text-sm text-green-600">Accuracy</div>
                    </div>
                  )}
                  {project.latency && (
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-md border border-blue-200">
                      <div className="text-2xl font-bold text-blue-700">{project.latency}ms</div>
                      <div className="text-sm text-blue-600">Latency</div>
                    </div>
                  )}
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-md border border-purple-200">
                    <div className="text-2xl font-bold text-purple-700">94.1%</div>
                    <div className="text-sm text-purple-600">F1-Score</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-md border border-orange-200">
                    <div className="text-2xl font-bold text-orange-700">96.2%</div>
                    <div className="text-sm text-orange-600">AUC-ROC</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {project.status === "completed" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Training Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <TrainingChart
                    title="Model Accuracy"
                    trainData={trainingAccuracy}
                    valData={validationAccuracy}
                    epochs={epochs}
                    yLabel="Accuracy (%)"
                    color1="#10b981"
                    color2="#ef4444"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <MetricsChart data={metricsData} title="Classification Metrics" />
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="training">
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Training & Validation Loss</CardTitle>
                </CardHeader>
                <CardContent>
                  <TrainingChart
                    title="Loss Curves"
                    trainData={trainingLoss}
                    valData={validationLoss}
                    epochs={epochs}
                    yLabel="Loss"
                    color1="#06b6d4"
                    color2="#ef4444"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Accuracy Curves</CardTitle>
                </CardHeader>
                <CardContent>
                  <TrainingChart
                    title="Accuracy Progress"
                    trainData={trainingAccuracy}
                    valData={validationAccuracy}
                    epochs={epochs}
                    yLabel="Accuracy (%)"
                    color1="#10b981"
                    color2="#f59e0b"
                  />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Training Logs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 rounded-md p-4 font-mono text-sm h-64 overflow-y-auto text-green-400">
                  <div className="mb-1 text-green-400">
                    [2024-01-25 14:32:15] ✓ Epoch 50/50 - Loss: 0.1234 - Accuracy: 94.2% - Val_Loss: 0.1456 -
                    Val_Accuracy: 93.8% - LR: 0.0001
                  </div>
                  <div className="mb-1 text-white">
                    [2024-01-25 14:31:42] Epoch 49/50 - Loss: 0.1267 - Accuracy: 93.9% - Val_Loss: 0.1489 -
                    Val_Accuracy: 93.5% - LR: 0.0001
                  </div>
                  <div className="mb-1 text-white">
                    [2024-01-25 14:31:09] Epoch 48/50 - Loss: 0.1298 - Accuracy: 93.7% - Val_Loss: 0.1523 -
                    Val_Accuracy: 93.2% - LR: 0.0001
                  </div>
                  <div className="mb-1 text-yellow-400">
                    [2024-01-25 14:30:36] Early stopping patience: 5/10 - Best val_loss: 0.1456 at epoch 50
                  </div>
                  <div className="mb-1 text-white">
                    [2024-01-25 14:30:03] Epoch 47/50 - Loss: 0.1334 - Accuracy: 93.4% - Val_Loss: 0.1567 -
                    Val_Accuracy: 92.9% - LR: 0.0001
                  </div>
                  <div className="mb-1 text-white">
                    [2024-01-25 14:29:30] Epoch 46/50 - Loss: 0.1367 - Accuracy: 93.1% - Val_Loss: 0.1598 -
                    Val_Accuracy: 92.6% - LR: 0.0001
                  </div>
                  <div className="mb-1 text-blue-400">
                    [2024-01-25 14:28:57] Learning rate reduced to 0.0001 (factor: 0.5)
                  </div>
                  <div className="mb-1 text-white">
                    [2024-01-25 14:28:24] Epoch 45/50 - Loss: 0.1401 - Accuracy: 92.8% - Val_Loss: 0.1634 -
                    Val_Accuracy: 92.3% - LR: 0.0002
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="metrics">
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Classification Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <MetricsChart data={metricsData} title="Performance Metrics with Targets" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Confusion Matrix</CardTitle>
                </CardHeader>
                <CardContent>
                  <ConfusionMatrix matrix={confusionMatrix} labels={classLabels} title="Classification Results" />
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>ROC Curve Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-8 rounded-md text-center">
                    <div className="text-2xl font-bold text-primary mb-2">0.962</div>
                    <div className="text-sm text-muted-foreground">AUC Score</div>
                    <div className="mt-4 text-xs text-muted-foreground">Excellent discrimination ability</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Precision-Recall</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-8 rounded-md text-center">
                    <div className="text-2xl font-bold text-primary mb-2">0.941</div>
                    <div className="text-sm text-muted-foreground">AP Score</div>
                    <div className="mt-4 text-xs text-muted-foreground">High precision across all recall levels</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Class Balance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Negative</span>
                      <span className="text-sm font-medium">870 (48.3%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "48.3%" }}></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Positive</span>
                      <span className="text-sm font-medium">930 (51.7%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "51.7%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="deployment">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Local Deployment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">Deploy model to local inference server</p>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Model Size:</span>
                    <span>44.7 MB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Format:</span>
                    <span>ONNX</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quantization:</span>
                    <span>INT8</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Deploy Locally
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cloud Deployment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">Deploy model to cloud infrastructure</p>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Instance:</span>
                    <span>t3.medium</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Auto-scaling:</span>
                    <span>Enabled</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Est. Cost:</span>
                    <span>$0.04/hour</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Deploy to Cloud
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Edge Deployment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">Optimize for edge devices</p>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Optimized Size:</span>
                    <span>12.3 MB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Target:</span>
                    <span>ARM Cortex-A</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Latency:</span>
                    <span>&lt; 50ms</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Optimize & Download
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
