# Архитектурные диаграммы

## Текущая архитектура

```mermaid
graph TB
    subgraph "Frontend (React/TypeScript)"
        A[App.tsx] --> B[Components]
        B --> C[Three.js 3D Viewer]
        B --> D[UI Components shadcn/ui]
        A --> E[Pages per Role]
    end

    subgraph "Backend (Node.js/Express)"
        F[server.ts] --> G[Routes]
        G --> H[Controllers]
        H --> I[Services Layer]
        I --> J[Database PostgreSQL]
        I --> K[Redis Cache]
        I --> L[S3 Storage]
    end

    subgraph "AI/ML Layer"
        M[ArtworkAnalyzer] --> N[TensorFlow.js]
        O[RecommendationService] --> P[Rule-based Logic]
    end

    subgraph "IoT Integration"
        Q[IoTController] --> R[Sensor Data]
        R --> S[Feedback System]
    end

    E --> F
    H --> M
    H --> Q
    I --> J
    I --> K
    I --> L
```

## Предлагаемая архитектура после улучшений

```mermaid
graph TB
    subgraph "Frontend (React/TypeScript)"
        A[App.tsx] --> B[Components]
        B --> C[Three.js 3D Viewer + LOD]
        B --> D[UI Components shadcn/ui]
        A --> E[Pages per Role]
        C --> F[WebXR VR/AR]
    end

    subgraph "API Gateway"
        G[Express Server] --> H[Routes]
        H --> I[Middleware Security]
        I --> J[Rate Limiting]
        I --> K[CORS]
        I --> L[Auth/JWT]
    end

    subgraph "Core Services"
        M[ArtworkService] --> N[Database Layer]
        O[GalleryService] --> N
        P[UserService] --> N
        Q[RecommendationService] --> R[AI Models]
    end

    subgraph "AI/ML Services"
        R --> S[TensorFlow.js Models]
        R --> T[Real ML Algorithms]
        R --> U[Computer Vision]
        R --> V[NLP Processing]
    end

    subgraph "Infrastructure Services"
        W[S3Service] --> X[S3 Storage]
        Y[CacheService] --> Z[Redis Cluster]
        AA[IoTService] --> BB[Sensor Network]
    end

    subgraph "External Integrations"
        CC[NFTService] --> DD[Blockchain]
        EE[CDNService] --> FF[CloudFront]
        GG[NotificationService] --> HH[WebSocket/Socket.IO]
    end

    E --> G
    H --> M
    H --> O
    H --> P
    M --> W
    O --> Y
    P --> AA
    Q --> CC
    Q --> EE
    Q --> GG
```

## Архитектурные слои

```mermaid
graph LR
    subgraph "Presentation Layer"
        A[React Components]
        B[Three.js 3D]
        C[WebXR VR/AR]
    end

    subgraph "Application Layer"
        D[Controllers]
        E[Routes]
        F[Middleware]
    end

    subgraph "Domain Layer"
        G[Business Services]
        H[Domain Models]
        I[Business Rules]
    end

    subgraph "Infrastructure Layer"
        J[Database]
        K[External APIs]
        L[File Storage]
        M[Cache]
        N[IoT Devices]
    end

    A --> D
    B --> D
    C --> D
    D --> G
    E --> D
    F --> E
    G --> H
    G --> I
    H --> J
    I --> K
    I --> L
    I --> M
    I --> N
```

## План миграции

```mermaid
gantt
    title План улучшений проекта
    dateFormat  YYYY-MM-DD
    section Фаза 1: Архитектура
    Консолидация сервисов          :done,    des1, 2024-01-15, 2w
    Унификация маршрутов            :done,    des2, 2024-01-15, 1w
    TypeScript strict mode          :active,  des3, 2024-01-22, 1w
    section Фаза 2: Качество
    Расширение тестирования         :         des4, 2024-01-29, 3w
    Интеграционные тесты            :         des5, 2024-02-05, 2w
    Code quality gates              :         des6, 2024-02-12, 1w
    section Фаза 3: AI/ML
    Реальные ML модели              :         des7, 2024-02-19, 4w
    Компьютерное зрение             :         des8, 2024-02-26, 2w
    Продвинутые алгоритмы           :         des9, 2024-03-04, 2w
    section Фаза 4: Производительность
    3D оптимизация                  :         des10, 2024-03-11, 2w
    Кэширование                     :         des11, 2024-03-18, 2w
    Горизонтальное масштабирование  :         des12, 2024-03-25, 2w
    section Фаза 5: Новые функции
    VR/AR интеграция                :         des13, 2024-04-01, 3w
    Многопользовательский режим     :         des14, 2024-04-08, 3w
    Блокчейн интеграция             :         des15, 2024-04-15, 3w
```

## Компоненты для рефакторинга

```mermaid
stateDiagram-v2
    [*] --> CurrentArchitecture
    CurrentArchitecture --> ConsolidationPhase: Фаза 1
    ConsolidationPhase --> QualityPhase: Фаза 2
    QualityPhase --> AIMLPhase: Фаза 3
    AIMLPhase --> PerformancePhase: Фаза 4
    PerformancePhase --> FeaturesPhase: Фаза 5
    FeaturesPhase --> [*]

    state CurrentArchitecture as "Текущая архитектура
    - Дублирование сервисов
    - Смешанная типизация
    - Rule-based AI
    - Недостаточное тестирование"

    state ConsolidationPhase as "Фаза 1: Консолидация
    - Унификация сервисов
    - Удаление дубликатов
    - Строгая типизация"

    state QualityPhase as "Фаза 2: Качество
    - 80%+ test coverage
    - ESLint без ошибок
    - Интеграционные тесты"

    state AIMLPhase as "Фаза 3: AI/ML
    - TensorFlow.js модели
    - Computer vision
    - Продвинутые алгоритмы"

    state PerformancePhase as "Фаза 4: Производительность
    - 3D LOD optimization
    - Redis caching
    - CDN integration"

    state FeaturesPhase as "Фаза 5: Новые функции
    - VR/AR полная поддержка
    - Multi-user режим
    - NFT и блокчейн"