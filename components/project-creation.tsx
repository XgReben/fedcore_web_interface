"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { useSidebar } from "@/components/ui/sidebar"
import { Menu } from "lucide-react"

interface ProjectCreationProps {
  onCreateProject: (projectData: any) => void
}

export default function ProjectCreation({ onCreateProject }: ProjectCreationProps) {
  const { toggleSidebar } = useSidebar()

  const [formData, setFormData] = useState({
    name: "",
    task: "classification",
    model: "ResNet18",
    dataset: "",
    datasetSource: "local",
    metrics: ["accuracy"],
    lossFunction: "cross_entropy",
    edgeDevice: "cpu",
    deploymentTarget: "local",
  })

  const [datasetFile, setDatasetFile] = useState<File | null>(null)

  const tasks = [
    { value: "classification", label: "Классификация изображений" },
    { value: "object_detection", label: "Детекция объектов" },
    { value: "segmentation", label: "Сегментация" },
    { value: "ts_forecasting", label: "Прогнозирование временных рядов" },
    { value: "regression", label: "Регрессия" },
  ]

  const models = {
    classification: ["ResNet18", "ResNet50", "EfficientNet", "VGG16"],
    object_detection: ["YOLO", "SSD", "Faster R-CNN"],
    segmentation: ["U-Net", "DeepLab", "Mask R-CNN"],
    ts_forecasting: ["Transformer", "LSTM", "GRU"],
    regression: ["Linear", "Random Forest", "XGBoost"],
  }

  const metrics = [
    { id: "accuracy", label: "Точность" },
    { id: "precision", label: "Precision" },
    { id: "recall", label: "Recall" },
    { id: "f1", label: "F1 Score" },
    { id: "auc", label: "AUC" },
    { id: "mse", label: "MSE" },
    { id: "rmse", label: "RMSE" },
    { id: "mae", label: "MAE" },
    { id: "latency", label: "Задержка" },
    { id: "throughput", label: "Пропускная способность" },
  ]

  const lossFunctions = [
    { value: "cross_entropy", label: "Cross Entropy" },
    { value: "mse", label: "Mean Squared Error" },
    { value: "mae", label: "Mean Absolute Error" },
    { value: "huber", label: "Huber Loss" },
    { value: "focal", label: "Focal Loss" },
    { value: "dice", label: "Dice Loss" },
    { value: "iou", label: "IoU Loss" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCreateProject(formData)
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleMetricToggle = (metric: string) => {
    setFormData((prev) => ({
      ...prev,
      metrics: prev.metrics.includes(metric) ? prev.metrics.filter((m) => m !== metric) : [...prev.metrics, metric],
    }))
  }

  return (
    <div className="p-3 sm:p-6 relative min-h-screen itmo-grid-background">
      {/* Mobile Header */}
      <div className="flex items-center gap-4 md:hidden mb-4">
        <Button variant="ghost" size="sm" onClick={toggleSidebar} className="p-2 h-auto w-auto">
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold itmo-heading">Новый проект</h1>
      </div>

      {/* Decorative Elements - Hidden on mobile */}
      <div className="hidden sm:block itmo-dot" style={{ top: "12%", right: "20%" }}></div>
      <div className="hidden sm:block itmo-dot" style={{ top: "70%", left: "5%" }}></div>
      <div className="hidden sm:block itmo-dot" style={{ bottom: "15%", right: "8%" }}></div>
      <div className="hidden sm:block itmo-line" style={{ top: "25%", left: "15%", width: "180px" }}></div>

      <div className="relative z-10">
        <div className="hidden md:block">
          <h1 className="text-3xl lg:text-4xl font-bold mb-6 itmo-heading">Создать новый проект</h1>
          <p className="text-muted-foreground mb-8">Настройте параметры обучения модели машинного обучения</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          <Card className="itmo-card">
            <CardHeader>
              <CardTitle className="text-white text-lg sm:text-xl">Информация о проекте</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="project-name" className="text-white text-sm sm:text-base">
                  Название проекта
                </Label>
                <Input
                  id="project-name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Введите название проекта"
                  required
                  className="bg-background/50 border-purple-500/30 text-white placeholder:text-gray-400 text-sm sm:text-base"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="task-type" className="text-white text-sm sm:text-base">
                    Тип задачи
                  </Label>
                  <Select value={formData.task} onValueChange={(value) => handleInputChange("task", value)}>
                    <SelectTrigger
                      id="task-type"
                      className="bg-background/50 border-purple-500/30 text-white text-sm sm:text-base"
                    >
                      <SelectValue placeholder="Выберите задачу" />
                    </SelectTrigger>
                    <SelectContent>
                      {tasks.map((task) => (
                        <SelectItem key={task.value} value={task.value} className="text-sm sm:text-base">
                          {task.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="model" className="text-white text-sm sm:text-base">
                    Модель
                  </Label>
                  <Select value={formData.model} onValueChange={(value) => handleInputChange("model", value)}>
                    <SelectTrigger
                      id="model"
                      className="bg-background/50 border-purple-500/30 text-white text-sm sm:text-base"
                    >
                      <SelectValue placeholder="Выберите модель" />
                    </SelectTrigger>
                    <SelectContent>
                      {models[formData.task as keyof typeof models]?.map((model) => (
                        <SelectItem key={model} value={model} className="text-sm sm:text-base">
                          {model}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="itmo-card">
            <CardHeader>
              <CardTitle className="text-white text-lg sm:text-xl">Конфигурация датасета</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label className="text-white text-sm sm:text-base">Источник датасета</Label>
                <RadioGroup
                  value={formData.datasetSource}
                  onValueChange={(value) => handleInputChange("datasetSource", value)}
                  className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="local" id="local" className="border-purple-500 text-purple-500" />
                    <Label htmlFor="local" className="text-white text-sm sm:text-base">
                      Локальное хранилище
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="web" id="web" className="border-purple-500 text-purple-500" />
                    <Label htmlFor="web" className="text-white text-sm sm:text-base">
                      Web URL
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.datasetSource === "local" ? (
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="dataset-file" className="text-white text-sm sm:text-base">
                    Загрузить датасет
                  </Label>
                  <div className="border-2 border-dashed border-purple-500/50 rounded-md p-4 sm:p-6 text-center hover:border-purple-500 transition-colors bg-background/20">
                    <Input
                      id="dataset-file"
                      type="file"
                      className="hidden"
                      onChange={(e) => e.target.files && setDatasetFile(e.target.files[0])}
                      accept=".zip,.tar,.csv,.json"
                    />
                    <Label htmlFor="dataset-file" className="cursor-pointer text-white text-sm sm:text-base">
                      {datasetFile ? datasetFile.name : "Нажмите для загрузки или перетащите файл"}
                    </Label>
                    <p className="text-xs text-muted-foreground mt-2">Поддерживаемые форматы: ZIP, TAR, CSV, JSON</p>
                  </div>
                </div>
              ) : (
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="dataset-url" className="text-white text-sm sm:text-base">
                    URL датасета
                  </Label>
                  <Input
                    id="dataset-url"
                    type="url"
                    value={formData.dataset}
                    onChange={(e) => handleInputChange("dataset", e.target.value)}
                    placeholder="https://example.com/dataset.zip"
                    className="bg-background/50 border-purple-500/30 text-white placeholder:text-gray-400 text-sm sm:text-base"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="itmo-card">
            <CardHeader>
              <CardTitle className="text-white text-lg sm:text-xl">Конфигурация обучения</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label className="text-white text-sm sm:text-base">Метрики обучения</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2">
                  {metrics.map((metric) => (
                    <div key={metric.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={metric.id}
                        checked={formData.metrics.includes(metric.id)}
                        onCheckedChange={() => handleMetricToggle(metric.id)}
                        className="border-purple-500 data-[state=checked]:bg-purple-500"
                      />
                      <Label htmlFor={metric.id} className="text-white text-xs sm:text-sm">
                        {metric.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="loss-function" className="text-white text-sm sm:text-base">
                  Функция потерь
                </Label>
                <Select
                  value={formData.lossFunction}
                  onValueChange={(value) => handleInputChange("lossFunction", value)}
                >
                  <SelectTrigger
                    id="loss-function"
                    className="bg-background/50 border-purple-500/30 text-white text-sm sm:text-base"
                  >
                    <SelectValue placeholder="Выберите функцию потерь" />
                  </SelectTrigger>
                  <SelectContent>
                    {lossFunctions.map((loss) => (
                      <SelectItem key={loss.value} value={loss.value} className="text-sm sm:text-base">
                        {loss.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="itmo-card">
            <CardHeader>
              <CardTitle className="text-white text-lg sm:text-xl">Конфигурация развертывания</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="edge-device" className="text-white text-sm sm:text-base">
                    Edge устройство
                  </Label>
                  <Select value={formData.edgeDevice} onValueChange={(value) => handleInputChange("edgeDevice", value)}>
                    <SelectTrigger
                      id="edge-device"
                      className="bg-background/50 border-purple-500/30 text-white text-sm sm:text-base"
                    >
                      <SelectValue placeholder="Выберите устройство" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cpu" className="text-sm sm:text-base">
                        CPU
                      </SelectItem>
                      <SelectItem value="gpu" className="text-sm sm:text-base">
                        GPU
                      </SelectItem>
                      <SelectItem value="tpu" className="text-sm sm:text-base">
                        TPU
                      </SelectItem>
                      <SelectItem value="mobile" className="text-sm sm:text-base">
                        Mobile
                      </SelectItem>
                      <SelectItem value="raspberry-pi" className="text-sm sm:text-base">
                        Raspberry Pi
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="deployment-target" className="text-white text-sm sm:text-base">
                    Цель развертывания
                  </Label>
                  <Select
                    value={formData.deploymentTarget}
                    onValueChange={(value) => handleInputChange("deploymentTarget", value)}
                  >
                    <SelectTrigger
                      id="deployment-target"
                      className="bg-background/50 border-purple-500/30 text-white text-sm sm:text-base"
                    >
                      <SelectValue placeholder="Выберите цель" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="local" className="text-sm sm:text-base">
                        Локально
                      </SelectItem>
                      <SelectItem value="cloud" className="text-sm sm:text-base">
                        Облако
                      </SelectItem>
                      <SelectItem value="edge" className="text-sm sm:text-base">
                        Edge устройство
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center sm:justify-end">
            <Button
              type="submit"
              className="itmo-button px-6 sm:px-8 py-2 text-base sm:text-lg font-semibold w-full sm:w-auto"
            >
              Создать проект
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
