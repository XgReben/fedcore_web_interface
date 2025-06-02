# FedCore Web Interface

## 📋 Содержание

- [О проекте](#о-проекте)
- [Основные возможности](#основные-возможности)
- [Архитектура системы](#архитектура-системы)
- [Технологический стек](#технологический-стек)
- [Установка и запуск](#установка-и-запуск)
- [Структура проекта](#структура-проекта)
- [Компоненты интерфейса](#компоненты-интерфейса)
- [API и интеграции](#api-и-интеграции)
- [Развертывание](#развертывание)

## 🎯 О проекте

**FedCore Web Interface** — это современный веб-интерфейс для платформы автоматической оптимизации, адаптации и развертывания моделей машинного обучения. Проект разработан в рамках исследований ИТМО и предоставляет интуитивно понятный интерфейс для работы с федеративным обучением, оптимизацией моделей и их развертыванием на edge-устройствах.

### 🎨 Дизайн-система ИТМО

Интерфейс выполнен в фирменном стиле ИТМО с использованием:
- **Цветовая палитра**: Фиолетовый (#8B5CF6), синий (#3B82F6), зеленый (#10B981)
- **Типографика**: Современные шрифты с градиентными заголовками
- **Анимации**: Плавные переходы и hover-эффекты
- **Адаптивность**: Полная поддержка мобильных устройств

## ✨ Основные возможности

### 🏠 Dashboard (Панель управления)
- **Обзор проектов**: Карточки с информацией о статусе, точности и задержке
- **Метрики в реальном времени**: Общее количество проектов, завершенных и в процессе обучения
- **Быстрый доступ**: Переход к деталям проекта одним кликом
- **Фильтрация**: Поиск и сортировка проектов по различным критериям

### 🚀 Создание проектов
- **Мастер создания**: Пошаговый процесс настройки нового проекта
- **Выбор задач**: Классификация, детекция объектов, сегментация, прогнозирование временных рядов
- **Конфигурация моделей**: Поддержка ResNet, YOLO, EfficientNet, Transformer и других
- **Настройка датасетов**: Загрузка локальных файлов или подключение внешних источников
- **Метрики обучения**: Настройка accuracy, precision, recall, F1-score, AUC и других
- **Edge-оптимизация**: Выбор целевых устройств и параметров развертывания

### 🧠 Управление моделями
- **Библиотека моделей**: Каталог предобученных и пользовательских моделей
- **Детальная информация**: Размер, точность, задержка, количество загрузок
- **Фильтрация и поиск**: По типу задачи, архитектуре, тегам
- **Рейтинговая система**: Оценки и отзывы пользователей
- **Интеграция**: Простое подключение к проектам

### 📊 Работа с датасетами
- **Каталог датасетов**: Публичные и приватные наборы данных
- **Статистика**: Размер, количество образцов, формат данных
- **Предварительный просмотр**: Визуализация структуры данных
- **Управление версиями**: Отслеживание изменений в датасетах
- **Аннотации**: Поддержка различных форматов разметки

### 🎯 Детали проектов и аналитика
- **Обзор проекта**: Полная информация о конфигурации и статусе
- **Графики обучения**: Интерактивные диаграммы loss и accuracy
- **Метрики производительности**: Confusion matrix, ROC-кривые, precision-recall
- **Логи обучения**: Детальная информация о процессе в реальном времени
- **Сравнение моделей**: Анализ различных конфигураций

### 🚀 Edge-развертывание
- **Управление устройствами**: Мониторинг Raspberry Pi, NVIDIA Jetson, RISC-V плат
- **Статус устройств**: Онлайн/офлайн, характеристики, местоположение
- **Мастер развертывания**: Пошаговая настройка развертывания
- **Оптимизация моделей**: Квантизация, прунинг, NPU-ускорение
- **Мониторинг в реальном времени**: CPU, память, задержка, пропускная способность

### 📚 Документация и обучение
- **Быстрый старт**: Пошаговые инструкции для начинающих
- **API Reference**: Полное описание всех методов и параметров
- **Туториалы**: Практические примеры использования
- **Примеры кода**: Готовые решения для типовых задач
- **Интеграция с GitHub**: Прямые ссылки на репозиторий

### ⚙️ Настройки и конфигурация
- **Языковые настройки**: Русский и английский интерфейс
- **Темы оформления**: Светлая и темная темы
- **Облачные провайдеры**: Настройка AWS, GCP, Azure
- **Локальные устройства**: Конфигурация IP, портов, протоколов

## 🏗️ Архитектура системы

### Frontend Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                    Next.js App Router                       │
├─────────────────────────────────────────────────────────────┤
│  Components Layer                                           │
│  ├── Pages (Dashboard, Projects, Models, etc.)             │
│  ├── UI Components (shadcn/ui)                             │
│  ├── Charts (Custom SVG visualizations)                    │
│  └── Modals (Settings, Deployment, etc.)                   │
├─────────────────────────────────────────────────────────────┤
│  State Management                                           │
│  ├── React Hooks (useState, useEffect)                     │
│  ├── Context API (Theme, Sidebar)                          │
│  └── Local Storage (Settings, Preferences)                 │
├─────────────────────────────────────────────────────────────┤
│  Styling & Design System                                   │
│  ├── Tailwind CSS (Utility-first)                          │
│  ├── ITMO Brand Colors & Components                        │
│  ├── Responsive Design (Mobile-first)                      │
│  └── Dark/Light Theme Support                              │
└─────────────────────────────────────────────────────────────┘
```

### Component Hierarchy
```
App
├── Layout (Global layout with theme provider)
├── Sidebar (Navigation with ITMO branding)
├── Dashboard (Project overview and metrics)
├── ProjectCreation (Multi-step form wizard)
├── ProjectDetails (Detailed analytics and charts)
├── ModelsPage (Model catalog and management)
├── DatasetsPage (Dataset management)
├── DeploymentsPage (Edge device management)
├── DocumentationPage (Help and tutorials)
└── SettingsModal (Configuration panel)
```

## 🛠️ Технологический стек

### Core Technologies
- **[Next.js 14](https://nextjs.org/)** - React фреймворк с App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Типизированный JavaScript
- **[React 18](https://reactjs.org/)** - Библиотека для создания пользовательских интерфейсов
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS фреймворк

### UI Components & Design
- **[shadcn/ui](https://ui.shadcn.com/)** - Современные React компоненты
- **[Radix UI](https://www.radix-ui.com/)** - Низкоуровневые UI примитивы
- **[Lucide React](https://lucide.dev/)** - Иконки
- **[next/font](https://nextjs.org/docs/basic-features/font-optimization)** - Оптимизация шрифтов

### Data Visualization
- **Custom SVG Charts** - Собственные компоненты для визуализации
- **Real-time Monitoring** - Графики в реальном времени
- **Interactive Dashboards** - Интерактивные панели управления

### Development Tools
- **[ESLint](https://eslint.org/)** - Линтер для JavaScript/TypeScript
- **[Prettier](https://prettier.io/)** - Форматтер кода
- **[Husky](https://typicode.github.io/husky/)** - Git hooks
- **[lint-staged](https://github.com/okonet/lint-staged)** - Линтинг staged файлов

## 🚀 Установка и запуск

### Системные требования
- **Node.js** 18.0 или выше
- **npm** 9.0 или выше (или yarn/pnpm)
- **Git** для клонирования репозитория

### Быстрый старт

1. **Клонирование репозитория**
```bash
git clone https://github.com/v1docq/FedCore-Web-Interface.git
cd FedCore-Web-Interface
```

2. **Установка зависимостей**
```bash
npm install
```
# или
```
yarn install
```
# или
```
pnpm install
```

3. **Настройка переменных окружения**
```bash
cp .env.example .env.local
```

Отредактируйте `.env.local`:
```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000

# Authentication (если используется)
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# Database (если используется)
DATABASE_URL=postgresql://user:password@localhost:5432/fedcore

# Cloud Providers (опционально)
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
```

4. **Запуск в режиме разработки**
```bash
npm run dev
```
# или
yarn dev
# или
```
pnpm dev
```

5. **Открытие в браузере**
Перейдите по адресу [http://localhost:3000](http://localhost:3000)

### Дополнительные команды

```bash
# Сборка для продакшена
npm run build

# Запуск продакшен версии
npm run start

# Линтинг
npm run lint

# Форматирование кода
npm run format

# Проверка типов TypeScript
npm run type-check
```

## 📁 Структура проекта

```
fedcore-web-interface/
├── 📁 app/                          # Next.js App Router
│   ├── 📄 layout.tsx               # Корневой layout
│   ├── 📄 page.tsx                 # Главная страница
│   ├── 📄 globals.css              # Глобальные стили
│   └── 📁 api/                     # API routes (если используются)
│
├── 📁 components/                   # React компоненты
│   ├── 📁 ui/                      # shadcn/ui компоненты
│   │   ├── 📄 button.tsx
│   │   ├── 📄 card.tsx
│   │   ├── 📄 sidebar.tsx
│   │   └── ...
│   │
│   ├── 📁 charts/                  # Компоненты графиков
│   │   ├── 📄 line-chart.tsx
│   │   ├── 📄 bar-chart.tsx
│   │   ├── 📄 training-chart.tsx
│   │   └── ...
│   │
│   ├── 📄 dashboard.tsx            # Главная панель
│   ├── 📄 project-creation.tsx     # Создание проектов
│   ├── 📄 project-details.tsx      # Детали проекта
│   ├── 📄 models-page.tsx          # Страница моделей
│   ├── 📄 datasets-page.tsx        # Страница датасетов
│   ├── 📄 deployments-page.tsx     # Страница развертывания
│   ├── 📄 documentation-page.tsx   # Документация
│   ├── 📄 settings-modal.tsx       # Настройки
│   └── 📄 app-sidebar.tsx          # Боковая панель
│
├── 📁 hooks/                       # Custom React hooks
│   ├── 📄 use-mobile.tsx           # Определение мобильных устройств
│   └── 📄 use-theme.tsx            # Управление темами
│
├── 📁 lib/                         # Утилиты и конфигурация
│   ├── 📄 utils.ts                 # Общие утилиты
│   └── 📄 constants.ts             # Константы
│
├── 📁 public/                      # Статические файлы
│   ├── 📁 images/                  # Изображения
│   │   ├── 📄 pytorch-logo.png
│   │   ├── 📄 tensorflow-logo.png
│   │   ├── 📄 yolo-logo.png
│   │   └── ...
│   └── 📄 favicon.ico
│
├── 📁 types/                       # TypeScript типы
│   ├── 📄 project.ts
│   ├── 📄 model.ts
│   └── 📄 device.ts
│
├── 📄 package.json                 # Зависимости и скрипты
├── 📄 tailwind.config.ts           # Конфигурация Tailwind
├── 📄 tsconfig.json                # Конфигурация TypeScript
├── 📄 next.config.mjs              # Конфигурация Next.js
├── 📄 .env.example                 # Пример переменных окружения
├── 📄 .gitignore                   # Git ignore файл
└── 📄 README.md                    # Документация
```

## 🧩 Компоненты интерфейса

### 🏠 Dashboard Component
**Файл**: `components/dashboard.tsx`

Главная панель управления с обзором всех проектов:

```typescript
interface DashboardProps {
  projects: Project[]
  onProjectSelect: (project: Project) => void
}
```

**Функциональность**:
- Отображение карточек проектов с метриками
- Статистика по статусам (завершено, в процессе, ошибки)
- Адаптивная сетка для разных размеров экрана
- Интеграция с ITMO дизайн-системой

### 🚀 Project Creation Component
**Файл**: `components/project-creation.tsx`

Мастер создания новых проектов ML:

```typescript
interface ProjectCreationProps {
  onCreateProject: (projectData: ProjectData) => void
}
```

**Этапы создания**:
1. **Информация о проекте**: Название, тип задачи, модель
2. **Конфигурация датасета**: Локальная загрузка или URL
3. **Настройки обучения**: Метрики, функции потерь
4. **Параметры развертывания**: Edge-устройства, оптимизация

### 📊 Project Details Component
**Файл**: `components/project-details.tsx`

Детальная аналитика проекта с вкладками:

**Вкладки**:
- **Overview**: Общая информация и ключевые метрики
- **Training**: Графики обучения (loss, accuracy, validation)
- **Metrics**: Confusion matrix, ROC-кривые, метрики классификации
- **Deployment**: Опции развертывания (локально, облако, edge)

### 🧠 Models Page Component
**Файл**: `components/models-page.tsx`

Каталог доступных моделей:

```typescript
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
```

**Возможности**:
- Фильтрация по типу задачи и архитектуре
- Поиск по названию и описанию
- Рейтинговая система
- Интеграция с проектами

### 📊 Datasets Page Component
**Файл**: `components/datasets-page.tsx`

Управление датасетами:

```typescript
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
```

### 🚀 Deployments Page Component
**Файл**: `components/deployments-page.tsx`

Управление edge-развертыванием:

**Вкладки**:
- **Edge Devices**: Список подключенных устройств
- **Active Deployments**: Активные развертывания с метриками
- **Real-time Monitoring**: Мониторинг в реальном времени

### 📈 Charts Components
**Директория**: `components/charts/`

Набор компонентов для визуализации данных:

- **LineChart**: Линейные графики для временных рядов
- **BarChart**: Столбчатые диаграммы для сравнения
- **DonutChart**: Круговые диаграммы для распределений
- **TrainingChart**: Специализированные графики обучения
- **ConfusionMatrix**: Матрица ошибок для классификации
- **RealTimeChart**: Графики в реальном времени
- **MetricsChart**: Диаграммы метрик производительности

### ⚙️ Settings Modal Component
**Файл**: `components/settings-modal.tsx`

Модальное окно настроек с вкладками:

- **General**: Язык, тема оформления
- **Cloud**: Настройки облачных провайдеров
- **Local Device**: Конфигурация локальных устройств

## 🔌 API и интеграции

### Backend Integration
Интерфейс предназначен для интеграции с FedCore backend API:

```typescript
// Примеры API endpoints
const API_ENDPOINTS = {
  projects: '/api/projects',
  models: '/api/models',
  datasets: '/api/datasets',
  devices: '/api/devices',
  deployments: '/api/deployments',
  training: '/api/training',
  monitoring: '/api/monitoring'
}
```

### WebSocket Connections
Для real-time обновлений:

```typescript
// WebSocket для мониторинга обучения
const trainingSocket = new WebSocket(`${WS_URL}/training/${projectId}`)

// WebSocket для мониторинга устройств
const deviceSocket = new WebSocket(`${WS_URL}/devices`)
```

### External Integrations
- **GitHub API**: Интеграция с репозиториями
- **Cloud Providers**: AWS, GCP, Azure APIs
- **Docker Registry**: Для контейнеризации моделей
- **MLflow**: Отслеживание экспериментов

## 🎨 Дизайн-система и стилизация

### ITMO Brand Colors
```css
:root {
  --itmo-purple: 271 91% 65%;
  --itmo-green: 142 76% 36%;
  --itmo-blue: 217 91% 60%;
  --itmo-red: 0 84% 60%;
  --itmo-yellow: 45 93% 47%;
  --itmo-pink: 330 81% 60%;
}
```

### Component Styling
- **Cards**: Градиентные границы и backdrop-blur эффекты
- **Buttons**: Градиентные фоны с hover анимациями
- **Typography**: Градиентные заголовки в стиле ИТМО
- **Grid Background**: Декоративная сетка с радиальными градиентами

### Responsive Design
- **Mobile-first**: Дизайн начинается с мобильных устройств
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch-friendly**: Увеличенные области касания на мобильных
- **Adaptive Navigation**: Коллапсирующая боковая панель

## 🚀 Развертывание

### Vercel (Рекомендуется)
```bash
# Установка Vercel CLI
npm i -g vercel

# Развертывание
vercel

# Продакшен развертывание
vercel --prod
```

### Docker
```dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

### Netlify
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Environment Variables
```env
# Production environment variables
NEXT_PUBLIC_API_URL=https://api.fedcore.itmo.ru
NEXT_PUBLIC_WS_URL=wss://api.fedcore.itmo.ru
NEXTAUTH_URL=https://fedcore.itmo.ru
DATABASE_URL=postgresql://...
```

---

<div align="center">
  <p>Сделано с ❤️ в ИТМО</p>
  <p>© 2024 ITMO University. Все права защищены.</p>
</div>
