"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSidebar } from "@/components/ui/sidebar"
import {
  Search,
  BookOpen,
  Code,
  Zap,
  Download,
  ExternalLink,
  Play,
  FileText,
  Video,
  Github,
  MessageCircle,
  Menu,
} from "lucide-react"
import { useState } from "react"

export default function DocumentationPage() {
  const { toggleSidebar } = useSidebar()
  const [searchTerm, setSearchTerm] = useState("")

  const quickStartSteps = [
    {
      title: "Установка FedCore",
      description: "Установите FedCore через pip или соберите из исходного кода",
      code: "pip install fedcore",
      icon: Download,
    },
    {
      title: "Создание проекта",
      description: "Инициализируйте новый проект машинного обучения",
      code: "fedcore init my-project",
      icon: Play,
    },
    {
      title: "Настройка модели",
      description: "Выберите архитектуру и параметры модели",
      code: "fedcore config --model resnet18 --task classification",
      icon: Code,
    },
    {
      title: "Запуск обучения",
      description: "Начните процесс обучения с оптимизацией",
      code: "fedcore train --dataset ./data --epochs 50",
      icon: Zap,
    },
  ]

  const apiMethods = [
    {
      name: "fedcore.create_model()",
      description: "Создает новую модель с заданной архитектурой",
      params: ["architecture", "task_type", "input_shape"],
      returns: "Model instance",
      example: `model = fedcore.create_model(
  architecture="resnet18",
  task_type="classification",
  input_shape=(224, 224, 3)
)`,
    },
    {
      name: "fedcore.optimize()",
      description: "Применяет оптимизации для развертывания на edge устройствах",
      params: ["model", "target_device", "optimization_level"],
      returns: "Optimized model",
      example: `optimized_model = fedcore.optimize(
  model=model,
  target_device="raspberry_pi",
  optimization_level="aggressive"
)`,
    },
    {
      name: "fedcore.deploy()",
      description: "Развертывает модель на целевом устройстве",
      params: ["model", "device_config", "monitoring"],
      returns: "Deployment status",
      example: `status = fedcore.deploy(
  model=optimized_model,
  device_config=config,
  monitoring=True
)`,
    },
  ]

  const tutorials = [
    {
      title: "Классификация изображений с ResNet",
      description: "Пошаговое руководство по созданию классификатора изображений",
      duration: "15 мин",
      level: "Начинающий",
      type: "tutorial",
      tags: ["classification", "resnet", "images"],
    },
    {
      title: "Детекция объектов с YOLO",
      description: "Обучение модели детекции объектов для edge устройств",
      duration: "25 мин",
      level: "Средний",
      type: "tutorial",
      tags: ["detection", "yolo", "edge"],
    },
    {
      title: "Оптимизация для Raspberry Pi",
      description: "Техники оптимизации моделей для ARM устройств",
      duration: "20 мин",
      level: "Продвинутый",
      type: "guide",
      tags: ["optimization", "raspberry-pi", "arm"],
    },
    {
      title: "Федеративное обучение",
      description: "Настройка распределенного обучения на нескольких устройствах",
      duration: "30 мин",
      level: "Продвинутый",
      type: "tutorial",
      tags: ["federated", "distributed", "privacy"],
    },
  ]

  const examples = [
    {
      title: "Базовая классификация",
      description: "Простой пример классификации CIFAR-10",
      language: "Python",
      code: `import fedcore

# Создание модели
model = fedcore.create_model(
    architecture="resnet18",
    task_type="classification",
    num_classes=10
)

# Загрузка данных
dataset = fedcore.load_dataset("cifar10")

# Обучение
trainer = fedcore.Trainer(model, dataset)
trainer.train(epochs=50, batch_size=32)

# Оптимизация для edge
optimized = fedcore.optimize(
    model, 
    target="raspberry_pi",
    quantization=True
)`,
    },
    {
      title: "Детекция объектов",
      description: "Обучение YOLO для детекции объектов",
      language: "Python",
      code: `import fedcore

# Создание YOLO модели
model = fedcore.create_model(
    architecture="yolov8",
    task_type="object_detection"
)

# Настройка датасета
dataset = fedcore.load_dataset(
    "custom",
    annotations="./annotations.json",
    images_dir="./images"
)

# Обучение с аугментацией
trainer = fedcore.Trainer(
    model, 
    dataset,
    augmentations=True
)
trainer.train(epochs=100)

# Развертывание
fedcore.deploy(
    model,
    device="jetson_nano",
    real_time=True
)`,
    },
  ]

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Начинающий":
        return "bg-green-500"
      case "Средний":
        return "bg-yellow-500"
      case "Продвинутый":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "tutorial":
        return <Video className="h-4 w-4" />
      case "guide":
        return <FileText className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  const filteredTutorials = tutorials.filter(
    (tutorial) =>
      tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutorial.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutorial.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="p-3 sm:p-6 space-y-4 sm:space-y-6 relative min-h-screen itmo-grid-background">
      {/* Mobile Header */}
      <div className="flex items-center gap-4 md:hidden mb-4">
        <Button variant="ghost" size="sm" onClick={toggleSidebar} className="p-2 h-auto w-auto">
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold itmo-heading">Documentation</h1>
      </div>

      {/* Decorative Elements - Hidden on mobile */}
      <div className="hidden sm:block itmo-dot" style={{ top: "10%", right: "15%" }}></div>
      <div className="hidden sm:block itmo-dot" style={{ top: "60%", left: "5%" }}></div>
      <div className="hidden sm:block itmo-dot" style={{ bottom: "20%", right: "25%" }}></div>

      <header className="relative z-10">
        <div className="hidden md:block">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2 itmo-heading">Documentation</h1>
          <p className="text-muted-foreground mb-6">Полное руководство по использованию FedCore</p>
        </div>

        <div className="relative max-w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск в документации..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-background/50 border-purple-500/30 text-sm sm:text-base"
          />
        </div>
      </header>

      <Tabs defaultValue="getting-started" className="relative z-10">
        <TabsList className="grid grid-cols-2 sm:grid-cols-4 mb-4 sm:mb-6 w-full">
          <TabsTrigger value="getting-started" className="text-xs sm:text-sm">
            Начало
          </TabsTrigger>
          <TabsTrigger value="api" className="text-xs sm:text-sm">
            API
          </TabsTrigger>
          <TabsTrigger value="tutorials" className="text-xs sm:text-sm">
            Tutorials
          </TabsTrigger>
          <TabsTrigger value="examples" className="text-xs sm:text-sm">
            Examples
          </TabsTrigger>
        </TabsList>

        <TabsContent value="getting-started" className="space-y-4 sm:space-y-6">
          <Card className="itmo-card">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 text-lg sm:text-xl">
                <Zap className="h-4 w-4 sm:h-5 sm:w-5" />
                Быстрый старт
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
                FedCore - это фреймворк для сжатия и оптимизации моделей машинного обучения, основанный на FEDOT.
                Следуйте этим шагам для начала работы.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {quickStartSteps.map((step, index) => (
                  <Card key={index} className="itmo-card">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                          {index + 1}
                        </div>
                        <step.icon className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
                        <CardTitle className="text-sm sm:text-base text-white">{step.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-3">{step.description}</p>
                      <div className="bg-gray-900 rounded-md p-2 sm:p-3 font-mono text-xs sm:text-sm overflow-x-auto">
                        <code className="text-green-400">{step.code}</code>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <Card className="itmo-card">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2 text-lg sm:text-xl">
                  <Github className="h-4 w-4 sm:h-5 sm:w-5" />
                  GitHub Repository
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm sm:text-base">
                  Исходный код, примеры и последние обновления
                </p>
                <Button
                  variant="outline"
                  className="w-full text-sm sm:text-base"
                  onClick={() => window.open("https://github.com/v1docq/FedCore", "_blank")}
                >
                  <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                  Открыть GitHub
                </Button>
              </CardContent>
            </Card>

            <Card className="itmo-card">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2 text-lg sm:text-xl">
                  <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                  Сообщество
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm sm:text-base">
                  Присоединяйтесь к сообществу разработчиков
                </p>
                <Button variant="outline" className="w-full text-sm sm:text-base">
                  <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                  Discord
                </Button>
              </CardContent>
            </Card>

            <Card className="itmo-card">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2 text-lg sm:text-xl">
                  <Download className="h-4 w-4 sm:h-5 sm:w-5" />
                  Установка
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm sm:text-base">
                  Требования: Python 3.8+, PyTorch 1.12+
                </p>
                <div className="bg-gray-900 rounded-md p-2 sm:p-3 font-mono text-xs sm:text-sm overflow-x-auto">
                  <code className="text-green-400">pip install fedcore</code>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="api" className="space-y-4 sm:space-y-6">
          <Card className="itmo-card">
            <CardHeader>
              <CardTitle className="text-white text-lg sm:text-xl">API Reference</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
                Полный справочник по API FedCore с примерами использования.
              </p>

              <div className="space-y-4 sm:space-y-6">
                {apiMethods.map((method, index) => (
                  <Card key={index} className="itmo-card">
                    <CardHeader>
                      <CardTitle className="text-base sm:text-lg text-purple-400 font-mono">{method.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground text-sm sm:text-base">{method.description}</p>

                      <div>
                        <h4 className="text-sm font-semibold text-white mb-2">Параметры:</h4>
                        <div className="flex flex-wrap gap-2">
                          {method.params.map((param, i) => (
                            <Badge key={i} variant="outline" className="font-mono text-xs">
                              {param}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-white mb-2">Возвращает:</h4>
                        <Badge variant="outline" className="font-mono text-xs bg-green-500/20 text-green-400">
                          {method.returns}
                        </Badge>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-white mb-2">Пример:</h4>
                        <div className="bg-gray-900 rounded-md p-3 sm:p-4 font-mono text-xs sm:text-sm overflow-x-auto">
                          <pre className="text-green-400">{method.example}</pre>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tutorials" className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {filteredTutorials.map((tutorial, index) => (
              <Card key={index} className="itmo-card cursor-pointer hover:border-purple-500 transition-colors">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(tutorial.type)}
                      <Badge variant="outline" className={`${getLevelColor(tutorial.level)} text-white text-xs`}>
                        {tutorial.level}
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">{tutorial.duration}</span>
                  </div>
                  <CardTitle className="text-base sm:text-lg text-white">{tutorial.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 text-sm sm:text-base">{tutorial.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {tutorial.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="examples" className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
            {examples.map((example, index) => (
              <Card key={index} className="itmo-card">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-white text-base sm:text-lg">{example.title}</CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {example.language}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm sm:text-base">{example.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 rounded-md p-3 sm:p-4 font-mono text-xs sm:text-sm overflow-x-auto max-h-64 sm:max-h-96 overflow-y-auto">
                    <pre className="text-green-400">{example.code}</pre>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline" className="text-xs sm:text-sm">
                      <Code className="h-3 w-3 mr-1" />
                      Копировать
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs sm:text-sm">
                      <Play className="h-3 w-3 mr-1" />
                      Запустить
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
