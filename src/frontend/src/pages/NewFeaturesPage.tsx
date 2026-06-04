import React, { useState } from 'react';

// ── Карточки ──────────────────────────────────────────────────────────────
import { ArtAuctionCard }        from '@/components/ui/art-auction-card';
import { AuctionParticipantCard } from '@/components/ui/auction-participant-card';
import { ArtExhibitionCard }     from '@/components/ui/art-exhibition-card';
import { ArtEventCard }          from '@/components/ui/art-event-card';
import { ArtCollectionCard }     from '@/components/ui/art-collection-card';
import { ArtCuratorCard }        from '@/components/ui/art-curator-card';
import { ArtArchiveCard }        from '@/components/ui/art-archive-card';
import { ArtProjectCard }        from '@/components/ui/art-project-card';
import { ArtStoreCard }          from '@/components/ui/art-store-card';
import { ArtStudioCard }         from '@/components/ui/art-studio-card';
import { ArtworkCard }           from '@/components/ui/artwork-card';
import { GalleryCard }           from '@/components/ui/gallery-card';
import { VirtualGalleryCard }    from '@/components/ui/virtual-gallery-card';
import { ArtGalleryCard }        from '@/components/ui/art-gallery-card';

// ── Визуализаторы ─────────────────────────────────────────────────────────
import { ArtStatsVisualizer }          from '@/components/ui/art-stats-visualizer';
import { ArtAnalyticsVisualizer }      from '@/components/ui/art-analytics-visualizer';
import { ArtMarketVisualizer }         from '@/components/ui/art-market-visualizer';
import { ArtTrendsVisualizer }         from '@/components/ui/art-trends-visualizer';
import { ArtCollectionVisualizer }     from '@/components/ui/art-collection-visualizer';
import { ArtArchiveVisualizer }        from '@/components/ui/art-archive-visualizer';
import { ArtHistoryVisualizer }        from '@/components/ui/art-history-visualizer';
import { ArtEducationVisualizer }      from '@/components/ui/art-education-visualizer';
import { ArtTechVisualizer }           from '@/components/ui/art-tech-visualizer';
import { ArtSocialNetworkVisualizer }  from '@/components/ui/art-social-network-visualizer';
import { ArtArchitectureVisualizer }   from '@/components/ui/art-architecture-visualizer';

// ─────────────────────────────────────────────────────────────────────────────
// Вспомогательные хелперы для Chart.js данных
// ─────────────────────────────────────────────────────────────────────────────
const MONTHS = ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'];

const lineDS = (label: string, color: string, data: number[]) => ({
  label, data, borderColor: color, backgroundColor: color + '33',
});
const barDS = (label: string, colors: string[], data: number[]) => ({
  label, data, backgroundColor: colors,
});

// ─────────────────────────────────────────────────────────────────────────────
// Моковые данные — Аукцион
// ─────────────────────────────────────────────────────────────────────────────
const auctionCards = [
  { title:'Звёздная ночь II', artist:'Александр Белов',
    description:'Авторская интерпретация знаменитого полотна в современной технике.',
    currentBid:45000, bidIncrement:1000, endTime:'2026-06-15T18:00:00',
    bidsCount:12, rating:4.7, tags:['постимпрессионизм','ночь','масло'],
    featured:true, imageUrl:'https://picsum.photos/seed/a1/400/300' },
  { title:'Цифровой рассвет', artist:'Мария Волкова',
    description:'NFT-работа в жанре генеративного искусства.',
    currentBid:12500, bidIncrement:500, endTime:'2026-06-20T12:00:00',
    bidsCount:7, rating:4.3, tags:['цифровое','NFT','генеративное'],
    featured:false, imageUrl:'https://picsum.photos/seed/a2/400/300' },
];

const participantCards = [
  { name:'Дмитрий Соколов', email:'d.sokolov@art.ru', joinDate:'2024-01-10',
    rating:4.8, auctionsWon:15, totalSpent:320000, activeBids:3, balance:50000 },
  { name:'Елена Орлова', email:'e.orlova@art.ru', joinDate:'2023-06-22',
    rating:4.5, auctionsWon:8, totalSpent:145000, activeBids:1, balance:20000 },
];

// ─────────────────────────────────────────────────────────────────────────────
// Выставки & События
// ─────────────────────────────────────────────────────────────────────────────
const exhibitionCards = [
  { title:'Импрессионизм: взгляд изнутри', curator:'Анна Петрова',
    description:'Уникальная выставка работ французских импрессионистов.',
    startDate:'2026-06-01', endDate:'2026-08-31', visitorCount:4200, rating:4.9,
    artworkCount:48, tags:['импрессионизм','Франция','живопись'],
    featured:true, imageUrl:'https://picsum.photos/seed/e1/400/300' },
  { title:'Цифровое будущее', curator:'Иван Климов',
    description:'Выставка современного цифрового и медиа-искусства.',
    startDate:'2026-07-15', endDate:'2026-09-15', visitorCount:1800, rating:4.6,
    artworkCount:32, tags:['цифровое','медиа','интерактив'],
    featured:false, imageUrl:'https://picsum.photos/seed/e2/400/300' },
];

const eventCards = [
  { title:'Мастер-класс: акварель', description:'Интенсивный курс акварельной живописи от ведущих мастеров.',
    date:'2026-06-28', time:'14:00', location:'Зал А, 2 этаж',
    maxAttendees:25, attendees:18, rating:4.7, tags:['акварель','обучение','живопись'],
    featured:true, imageUrl:'https://picsum.photos/seed/ev1/400/300' },
  { title:'Открытие галереи «Свет»', description:'Торжественное открытие нового виртуального пространства.',
    date:'2026-07-05', time:'19:00', location:'Главный холл',
    maxAttendees:100, attendees:67, rating:4.5, tags:['открытие','галерея','вечер'],
    featured:false, imageUrl:'https://picsum.photos/seed/ev2/400/300' },
];

// ─────────────────────────────────────────────────────────────────────────────
// Коллекции & Кураторы
// ─────────────────────────────────────────────────────────────────────────────
const collectionCards = [
  { title:'Русский авангард XX века', curator:'Наталья Смирнова',
    description:'Собрание ключевых работ русского авангарда.',
    artworkCount:120, likes:3400, rating:4.9,
    tags:['авангард','Россия','XX век'], featured:true,
    imageUrl:'https://picsum.photos/seed/c1/400/300' },
  { title:'Современная абстракция', curator:'Павел Романов',
    description:'Лучшие абстрактные работы 2020-х годов.',
    artworkCount:65, likes:1800, rating:4.6,
    tags:['абстракция','современное','2020е'], featured:false,
    imageUrl:'https://picsum.photos/seed/c2/400/300' },
];

const curatorCards = [
  { name:'Наталья Смирнова', role:'Старший куратор',
    bio:'15 лет опыта в области русского искусства XX века.',
    joinDate:'2021-03-01', rating:4.9, exhibitionsCurated:24, artworksReviewed:1200,
    approvedArtworks:980, tags:['авангард','русское искусство','живопись'], featured:true },
  { name:'Павел Романов', role:'Куратор современного искусства',
    bio:'Специализация — цифровое и медиа-искусство.',
    joinDate:'2022-09-15', rating:4.6, exhibitionsCurated:11, artworksReviewed:650,
    approvedArtworks:520, tags:['цифровое','медиа','NFT'], featured:false },
];

const collectionVisData = {
  name:'Русский авангард XX века', curator:'Наталья Смирнова',
  description:'Ключевые работы русского авангарда 1910–1970х годов.',
  artworkCount:120, likes:3400, rating:4.9, tags:['авангард','Россия'],
  creationDate:'2022-01-15', lastUpdated:'2026-05-20',
  isFeatured:true, artworksCount:120,
  popularityTrend:{
    labels: MONTHS,
    datasets:[lineDS('Просмотры','#6366f1',[800,900,1100,1000,1200,1400,1350,1500,1600,1550,1700,1900])],
  },
  artworkDistribution:{
    labels:['Живопись','Скульптура','Графика','Плакат'],
    datasets:[barDS('Кол-во',['#6366f1','#8b5cf6','#a78bfa','#c4b5fd'],[72,18,20,10])],
  },
  engagementMetrics:{ views:18400, shares:1200, comments:640, saves:3100, likes:3400 },
};

// ─────────────────────────────────────────────────────────────────────────────
// Галереи
// ─────────────────────────────────────────────────────────────────────────────
const galleryCards = [
  { name:'Галерея «Северный свет»',
    description:'Просторная виртуальная галерея скандинавского искусства.',
    location:'Виртуальное пространство — Зона 3', openingHours:'Круглосуточно',
    visitorCount:12500, rating:4.8, artworksCount:145,
    tags:['Скандинавия','природа','свет'], featured:true },
  { name:'Галерея «Восток»',
    description:'Традиционное и современное искусство Азии.',
    location:'Виртуальное пространство — Зона 7', openingHours:'Круглосуточно',
    visitorCount:8400, rating:4.5, artworksCount:98,
    tags:['Азия','каллиграфия','традиции'], featured:false },
];

const virtualGalleryCards = [
  { name:'VR-галерея «Космос»',
    description:'Полное погружение в искусство эпохи Space Age.',
    roomCount:6, artworkCount:72, visitorCount:5600, rating:4.7,
    tags:['VR','космос','иммерсивное'], featured:true },
  { name:'VR-галерея «Глубина»',
    description:'Подводный мир в работах современных художников.',
    roomCount:4, artworkCount:48, visitorCount:3200, rating:4.4,
    tags:['VR','океан','природа'], featured:false },
];

const artGalleryCards = [
  { name:'Государственный музей изящных искусств',
    description:'Крупнейшая коллекция классического европейского искусства.',
    location:'Москва, ул. Волхонка, 12', openingHours:'Вт–Вс 10:00–20:00',
    visitorCount:48000, rating:4.9, artworksCount:2400,
    tags:['классика','Европа','масштаб'], featured:true },
  { name:'Арт-центр «Новая волна»',
    description:'Площадка для современных художников.',
    location:'Санкт-Петербург, Лиговский пр., 74', openingHours:'Ежедневно 11:00–22:00',
    visitorCount:14000, rating:4.5, artworksCount:380,
    tags:['современное','галерея','молодые'], featured:false },
];

// ─────────────────────────────────────────────────────────────────────────────
// Архив
// ─────────────────────────────────────────────────────────────────────────────
const archiveCards = [
  { name:'Архив русского реализма',
    description:'Цифровой архив работ художников-реалистов XIX–XX вв.',
    curator:'Михаил Васильев', artworkCount:3400,
    dateRange:{ start:1850, end:1980 },
    tags:['реализм','Россия','XIX век'],
    preservationStatus:'excellent' as const,
    digitizationProgress:78,
    imageUrl:'https://picsum.photos/seed/ar1/400/300' },
  { name:'Архив советского плаката',
    description:'Полная коллекция советской плакатной графики.',
    curator:'Ольга Сергеева', artworkCount:1200,
    dateRange:{ start:1917, end:1991 },
    tags:['советское','плакат','графика'],
    preservationStatus:'good' as const,
    digitizationProgress:45,
    imageUrl:'https://picsum.photos/seed/ar2/400/300' },
];

const archiveVisData = {
  totalArtworks:8200, dateRange:{ start:1850, end:2024 },
  collectionCount:42, curatorCount:18, preservationStatus:'good',
  collections:[
    { name:'Русский реализм', description:'XIX–XX вв.', artworkCount:3400,
      digitizedCount:2652, totalCount:3400, period:'XIX–XX вв.',
      dateRange:{ start:1850, end:1980 }, tags:['реализм','Россия'],
      curator:'Михаил Васильев', preservationStatus:'excellent' as const },
    { name:'Советский плакат', description:'1917–1991', artworkCount:1200,
      digitizedCount:540, totalCount:1200, period:'1917–1991',
      dateRange:{ start:1917, end:1991 }, tags:['плакат','советское'],
      curator:'Ольга Сергеева', preservationStatus:'good' as const },
  ],
  digitizationProgress:{ totalArtworks:8200, digitized:5576, inProgress:820, awaitingDigitization:1804 },
  digitizationMetrics:{ digitized:5576, completionRate:68 },
  mediaTypes:{
    labels:['Живопись','Графика','Скульптура','Фото','Цифровое'],
    datasets:[barDS('Кол-во',['#6366f1','#8b5cf6','#a78bfa','#c4b5fd','#ede9fe'],[3400,2100,880,1400,420])],
  },
  mediaDistribution:{
    labels:['Живопись','Графика','Скульптура','Фото','Цифровое'],
    datasets:[barDS('Доля %',['#6366f1','#8b5cf6','#a78bfa','#c4b5fd','#ede9fe'],[41,26,11,17,5])],
  },
  temporalDistribution:{
    labels:['1850-1900','1900-1950','1950-2000','2000-2024'],
    datasets:[lineDS('Произведения','#6366f1',[1200,2800,3100,1100])],
  },
  geographicDistribution:{
    labels:['Россия','Западная Европа','США','Азия','Другие'],
    datasets:[barDS('Экспонатов',['#6366f1','#8b5cf6','#a78bfa','#c4b5fd','#ede9fe'],[4100,2200,1100,600,200])],
  },
  preservationMetrics:{ excellent:45, good:32, fair:18, poor:5 },
};

// ─────────────────────────────────────────────────────────────────────────────
// Проекты, Магазины, Студии
// ─────────────────────────────────────────────────────────────────────────────
const projectCards = [
  { title:'Арт-резиденция «Сибирь»',
    description:'Создание международной творческой резиденции для художников.',
    startDate:'2026-01-01', endDate:'2026-12-31',
    fundingGoal:2000000, fundingRaised:1250000, supporters:340, rating:4.8,
    tags:['резиденция','Сибирь','международный'], featured:true,
    imageUrl:'https://picsum.photos/seed/pr1/400/300' },
  { title:'Мобильный музей',
    description:'Путешествующая выставка по малым городам России.',
    startDate:'2026-03-01', endDate:'2026-11-30',
    fundingGoal:800000, fundingRaised:520000, supporters:180, rating:4.6,
    tags:['мобильный','регионы','доступность'], featured:false,
    imageUrl:'https://picsum.photos/seed/pr2/400/300' },
];

const storeCards = [
  { name:'Мастерская Белова',
    description:'Оригинальные работы и принты молодого художника А. Белова.',
    owner:'Александр Белов', artworkCount:45, rating:4.7,
    tags:['живопись','принты','доступно'], featured:true,
    imageUrl:'https://picsum.photos/seed/st1/400/300' },
  { name:'Цифровые миры',
    description:'NFT и цифровые работы от коллектива художников.',
    owner:'Арт-коллектив «Пиксель»', artworkCount:128, rating:4.5,
    tags:['NFT','цифровое','коллектив'], featured:false,
    imageUrl:'https://picsum.photos/seed/st2/400/300' },
];

const studioCards = [
  { name:'Студия «Лазурь»',
    description:'Профессиональная мастерская для художников-акварелистов.',
    artistCount:12, artworkCount:240, rating:4.8,
    tags:['акварель','обучение','профи'], featured:true,
    imageUrl:'https://picsum.photos/seed/su1/400/300' },
  { name:'Digital Arts Hub',
    description:'Студия цифрового и медиа-искусства.',
    artistCount:8, artworkCount:185, rating:4.5,
    tags:['цифровое','медиа','3D'], featured:false,
    imageUrl:'https://picsum.photos/seed/su2/400/300' },
];

// ─────────────────────────────────────────────────────────────────────────────
// Экспонаты (ArtworkCard)
// ─────────────────────────────────────────────────────────────────────────────
const artworkCards = [
  { title:'Московские крыши', artist:'Игорь Фёдоров', year:2023,
    imageUrl:'https://picsum.photos/seed/aw1/400/300',
    tags:['пейзаж','город','акварель'], likes:342, views:4800, rating:4.7 },
  { title:'Абстракция №5', artist:'Светлана Козлова', year:2024,
    imageUrl:'https://picsum.photos/seed/aw2/400/300',
    tags:['абстракция','масло','цвет'], likes:218, views:3100, rating:4.4 },
  { title:'Зеркало', artist:'Роман Зубков', year:2022,
    imageUrl:'https://picsum.photos/seed/aw3/400/300',
    tags:['символизм','портрет','масло'], likes:567, views:7200, rating:4.9 },
];

// ─────────────────────────────────────────────────────────────────────────────
// Данные для визуализаторов — Аналитика
// ─────────────────────────────────────────────────────────────────────────────
const statsData = {
  totalArtworks:8421, totalGalleries:48, totalVisitors:284000, totalLikes:142000,
  averageRating:4.6,
  trendingArtworks:[
    { title:'Зеркало', artist:'Роман Зубков', views:7200, likes:567, rating:4.9 },
    { title:'Московские крыши', artist:'Игорь Фёдоров', views:4800, likes:342, rating:4.7 },
    { title:'Абстракция №5', artist:'Светлана Козлова', views:3100, likes:218, rating:4.4 },
  ],
  monthlyStats:{
    labels:MONTHS,
    datasets:[lineDS('Посетители','#6366f1',[18000,16000,22000,26000,30000,38000,42000,40000,34000,28000,24000,20000])],
  },
  categoryDistribution:{
    labels:['Живопись','Скульптура','Цифровое','Графика','Фото'],
    datasets:[barDS('Работ',['#6366f1','#8b5cf6','#a78bfa','#c4b5fd','#ede9fe'],[3200,1100,2400,1200,521])],
  },
  visitorEngagement:{
    dailyActive:3800, weeklyActive:14200, monthlyActive:38000,
    avgSessionDuration:22, likesRatio:0.50, commentsRatio:0.12,
  },
};

const analyticsData = {
  viewsOverTime:{
    labels:MONTHS,
    datasets:[lineDS('Просмотры','#6366f1',[12000,14000,13500,16000,18500,21000,19500,22000,24000,23000,26000,28000])],
  },
  engagementMetrics:{
    labels:['Лайки','Комментарии','Поделились','Избранное'],
    datasets:[barDS('Вовлечённость',['#6366f1','#8b5cf6','#a78bfa','#c4b5fd'],[4200,1800,950,3100])],
  },
  topArtworks:[
    { title:'Зеркало', views:7200, likes:567, shares:124 },
    { title:'Московские крыши', views:4800, likes:342, shares:89 },
    { title:'Абстракция №5', views:3100, likes:218, shares:45 },
  ],
  visitorDemographics:{
    ageGroups:[
      { label:'18-24', value:18 }, { label:'25-34', value:32 },
      { label:'35-44', value:25 }, { label:'45+', value:25 },
    ],
    genderDistribution:[
      { label:'Женщины', value:58 }, { label:'Мужчины', value:38 }, { label:'Другое', value:4 },
    ],
  },
};

const marketData = {
  priceTrends:{
    labels:MONTHS,
    datasets:[
      lineDS('Живопись','#6366f1',[45000,48000,52000,49000,55000,60000,58000,62000,68000,65000,72000,78000]),
      lineDS('Цифровое','#8b5cf6',[12000,15000,18000,22000,25000,30000,28000,32000,38000,42000,45000,50000]),
    ],
  },
  topCategories:{
    labels:['Живопись','Скульптура','Цифровое','Графика','Фото'],
    datasets:[barDS('Продажи %',['#6366f1','#8b5cf6','#a78bfa','#c4b5fd','#ede9fe'],[38,18,22,12,10])],
  },
  marketIndicators:{ totalValue:125000000, volume:320, averagePrice:39000, priceChange:18.5 },
  topSellingArtists:[
    { name:'Роман Зубков', sales:42, growth:28 },
    { name:'Игорь Фёдоров', sales:35, growth:22 },
    { name:'Мария Волкова', sales:28, growth:45 },
  ],
  auctionResults:[
    { artwork:'Звёздная ночь II', artist:'Белов А.', hammerPrice:95000, estimate:80000, sold:true },
    { artwork:'Цифровой рассвет', artist:'Волкова М.', hammerPrice:42000, estimate:35000, sold:true },
    { artwork:'Туман', artist:'Сидоров К.', hammerPrice:0, estimate:25000, sold:false },
  ],
};

const trendsData = {
  emergingTrends:[
    { name:'AI-генеративное искусство', growthRate:42, popularity:78,
      description:'Работы созданные или соавторские с ИИ.',
      relatedArtists:['Волкова М.','Романов П.'], relatedArtworks:['Цифровой рассвет'] },
    { name:'Экологическое искусство', growthRate:28, popularity:65,
      description:'Искусство на тему природы и экологии.',
      relatedArtists:['Фёдоров И.'], relatedArtworks:['Московские крыши'] },
    { name:'VR-инсталляции', growthRate:35, popularity:72,
      description:'Иммерсивные виртуальные пространства.',
      relatedArtists:['Зубков Р.'], relatedArtworks:['Зеркало'] },
  ],
  seasonalPatterns:{
    labels:MONTHS,
    datasets:[lineDS('Активность','#6366f1',[65,60,70,75,80,95,90,88,85,92,88,100])],
  },
  genrePopularity:{
    labels:['Живопись','Цифровое','Скульптура','Фото','Перформанс'],
    datasets:[barDS('Популярность',['#6366f1','#8b5cf6','#a78bfa','#c4b5fd','#ede9fe'],[82,71,58,65,44])],
  },
  artistSpotlight:[
    { name:'Мария Волкова', growth:45, trending:true, specialty:'Цифровое/NFT', recentExhibitions:3 },
    { name:'Роман Зубков', growth:28, trending:true, specialty:'Символизм', recentExhibitions:5 },
    { name:'Игорь Фёдоров', growth:18, trending:false, specialty:'Акварель', recentExhibitions:2 },
  ],
  trendingTags:[
    { name:'#AIart', usageCount:4200 }, { name:'#VRgallery', usageCount:3100 },
    { name:'#NFT', usageCount:2800 }, { name:'#акварель', usageCount:2400 },
    { name:'#экология', usageCount:1900 },
  ],
  marketPredictions:[
    { trend:'AI-генеративное', predictedGrowth:55, confidence:82, timeframe:'2026-2027' },
    { trend:'VR-инсталляции', predictedGrowth:48, confidence:76, timeframe:'2026-2027' },
    { trend:'Экологическое', predictedGrowth:35, confidence:70, timeframe:'2026-2028' },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// История
// ─────────────────────────────────────────────────────────────────────────────
const historyData = {
  periods:[
    { name:'Импрессионизм', startDate:1860, endDate:1900,
      keyArtists:['Моне','Ренуар','Дега'], notableWorks:['Водяные лилии','Завтрак на траве'],
      characteristics:['пленэр','свет','цвет'], influence:90 },
    { name:'Авангард', startDate:1905, endDate:1935,
      keyArtists:['Малевич','Кандинский','Татлин'],
      notableWorks:['Чёрный квадрат','Композиция VIII'],
      characteristics:['абстракция','геометрия','форма'], influence:95 },
    { name:'Абстрактный экспрессионизм', startDate:1940, endDate:1965,
      keyArtists:['Поллок','Ротко','де Кунинг'],
      notableWorks:['№31','Оранжевое и жёлтое'],
      characteristics:['жест','эмоция','масштаб'], influence:85 },
  ],
  timeline:[
    { year:1874, event:'Первая выставка импрессионистов в Париже', significance:95 },
    { year:1915, event:'«Чёрный квадрат» Малевича', significance:100 },
    { year:1937, event:'Выставка «Дегенеративное искусство» в Мюнхене', significance:80 },
    { year:1959, event:'Guggenheim Museum открывается в Нью-Йорке', significance:85 },
    { year:2009, event:'Первый NFT-арт выставлен публично', significance:70 },
  ],
  regionalDevelopment:{
    labels:['Франция','Россия','США','Германия','Великобритания'],
    datasets:[barDS('Влияние',['#6366f1','#8b5cf6','#a78bfa','#c4b5fd','#ede9fe'],[92,88,84,80,76])],
  },
  artisticMovements:[
    { name:'Импрессионизм', period:'1860-1900',
      keyCharacteristics:['пленэр','свет','мгновение'],
      majorArtists:['Моне','Ренуар'], influenceScore:90 },
    { name:'Авангард', period:'1905-1935',
      keyCharacteristics:['абстракция','манифест','новизна'],
      majorArtists:['Малевич','Кандинский'], influenceScore:95 },
    { name:'Концептуализм', period:'1960-1980',
      keyCharacteristics:['идея','процесс','документация'],
      majorArtists:['Дюшан','Кошут'], influenceScore:82 },
  ],
  evolutionMetrics:{
    labels:['1850','1880','1910','1940','1970','2000','2024'],
    datasets:[lineDS('Количество движений','#6366f1',[2,5,12,18,28,42,65])],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Образование
// ─────────────────────────────────────────────────────────────────────────────
const educationData = {
  courses:[
    { title:'Основы акварели', instructor:'Смирнова А.', studentsEnrolled:245,
      completionRate:72, rating:4.8, duration:'8 недель', tags:['акварель','начинающие'] },
    { title:'Цифровая иллюстрация', instructor:'Романов П.', studentsEnrolled:380,
      completionRate:65, rating:4.6, duration:'12 недель', tags:['цифровое','иллюстрация'] },
    { title:'VR-арт: создание пространств', instructor:'Зубков Р.', studentsEnrolled:120,
      completionRate:58, rating:4.7, duration:'16 недель', tags:['VR','3D','иммерсивное'] },
  ],
  learningPaths:[
    { name:'Путь художника', description:'От основ до профессионального уровня.',
      coursesCount:4, estimatedTime:'32 недели', difficulty:'beginner' as const },
    { name:'Цифровое искусство', description:'Полный курс цифровых технологий в искусстве.',
      coursesCount:3, estimatedTime:'24 недели', difficulty:'intermediate' as const },
  ],
  studentProgress:{
    labels:MONTHS.slice(0,6),
    datasets:[lineDS('Завершённость %','#6366f1',[60,62,63,65,66,67])],
  },
  coursePopularity:{
    labels:['Акварель','Цифровое','Масло','VR/3D','Скульптура'],
    datasets:[barDS('Студенты',['#6366f1','#8b5cf6','#a78bfa','#c4b5fd','#ede9fe'],[245,380,185,120,95])],
  },
  achievementMetrics:{
    totalStudents:1450, certificatesIssued:820,
    averageCompletionTime:68, satisfactionRate:87,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Технологии
// ─────────────────────────────────────────────────────────────────────────────
const techData = {
  technologies:[
    { name:'Three.js / WebXR', description:'3D-рендеринг и VR-поддержка.',
      adoptionRate:85, userSatisfaction:88, performanceScore:90,
      usageCount:12400, tags:['3D','VR','рендеринг'] },
    { name:'AI-рекомендации', description:'Персонализированные рекомендации экспонатов.',
      adoptionRate:72, userSatisfaction:82, performanceScore:78,
      usageCount:9800, tags:['AI','ML','персонализация'] },
    { name:'RAG-система', description:'Поиск по базе знаний с AI-ответами.',
      adoptionRate:45, userSatisfaction:76, performanceScore:72,
      usageCount:6200, tags:['RAG','поиск','NLP'] },
    { name:'NFT/Блокчейн', description:'Верификация и продажа цифровых работ.',
      adoptionRate:28, userSatisfaction:70, performanceScore:65,
      usageCount:3400, tags:['NFT','блокчейн','крипто'] },
  ],
  systemMetrics:{ uptime:99.8, responseTime:145, concurrentUsers:1840, dataProcessed:2.4 },
  innovationTrends:{
    labels:MONTHS.slice(0,6),
    datasets:[lineDS('Новые технологии','#6366f1',[3,4,4,5,6,7])],
  },
  technologyAdoption:{
    labels:['Three.js','AI','RAG','NFT','WebXR'],
    datasets:[barDS('Использование %',['#6366f1','#8b5cf6','#a78bfa','#c4b5fd','#ede9fe'],[85,72,45,28,38])],
  },
  performanceMetrics:[
    { name:'Время загрузки', score:88, status:'good' as const },
    { name:'Доступность', score:99, status:'excellent' as const },
    { name:'SEO', score:76, status:'good' as const },
    { name:'Мобильность', score:82, status:'good' as const },
  ],
  securityMetrics:{
    dataEncryption:true, accessControls:92, auditLogs:true, vulnerabilityAssessment:88,
  },
  vrArMetrics:{
    vrUsers:1240, arInteractions:4800, avgSessionTime:18, satisfactionRate:84,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Социальная сеть
// ─────────────────────────────────────────────────────────────────────────────
const socialData = {
  userMetrics:{ totalUsers:12400, activeUsers:3800, newUsers:420, engagementRate:31 },
  contentMetrics:{
    totalPosts:8600, totalLikes:412000, totalShares:98000, totalComments:145000,
    avgPerUser:0.69, likesPerPost:48, commentsPerPost:17,
  },
  communityGrowth:{
    labels:MONTHS.slice(0,6),
    datasets:[lineDS('Пользователи','#6366f1',[8200,9100,9800,10600,11400,12400])],
  },
  contentDistribution:{
    labels:['Живопись','Цифровое','Скульптура','Фото','Другое'],
    datasets:[barDS('Посты',['#6366f1','#8b5cf6','#a78bfa','#c4b5fd','#ede9fe'],[38,24,14,16,8])],
  },
  topCreators:[
    { name:'Александр Белов', followers:2800, posts:145, engagement:11.4 },
    { name:'Мария Волкова', followers:1900, posts:98, engagement:11.1 },
    { name:'Игорь Фёдоров', followers:1200, posts:76, engagement:15.4 },
  ],
  trendingTopics:[
    { topic:'#AIart', mentions:4200, growth:42 },
    { topic:'#VRгалерея', mentions:3100, growth:35 },
    { topic:'#акварель', mentions:2400, growth:18 },
  ],
  interactionTypes:{
    labels:['Лайки','Комментарии','Поделились','Сохранили'],
    datasets:[barDS('Взаимодействия',['#6366f1','#8b5cf6','#a78bfa','#c4b5fd'],[412000,145000,98000,187000])],
  },
  engagementMetrics:{
    avgSessionDuration:18, returningUsers:62,
    contentCreationRate:8, socialSharingRate:23,
  },
  engagementByPlatform:[
    { name:'Web', engagementRate:31 },
    { name:'Mobile', engagementRate:28 },
    { name:'VR', engagementRate:42 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Архитектура
// ─────────────────────────────────────────────────────────────────────────────
const architectureData = {
  galleries:[
    { name:'Главное здание', location:'Москва, Волхонка 12', area:8400, capacity:600,
      constructionYear:1912, architect:'Р. Клейн',
      description:'Неоклассический архитектурный ансамбль.',
      visitorCount:48000, rating:4.9, tags:['неоклассика','исторический'] },
    { name:'Павильон «Свет»', location:'Москва, Парк Горького', area:2200, capacity:250,
      constructionYear:2018, architect:'Захидов И.',
      description:'Современный стеклянный павильон.',
      visitorCount:14000, rating:4.7, tags:['современный','стекло','устойчивый'] },
  ],
  constructionMetrics:{
    totalGalleries:12, totalArea:42600, averageCapacity:380, oldestGallery:1898, newestGallery:2023,
  },
  architecturalStyles:{
    labels:['Неоклассика','Модерн','Современный','Хай-тек','Минимализм'],
    datasets:[barDS('Галерей',['#6366f1','#8b5cf6','#a78bfa','#c4b5fd','#ede9fe'],[4,2,3,2,1])],
  },
  visitorDistribution:{
    labels:MONTHS,
    datasets:[lineDS('Посетители','#6366f1',[18000,16000,22000,26000,30000,38000,42000,40000,34000,28000,24000,20000])],
  },
  sustainabilityMetrics:{
    energyEfficiency:78, ecoFriendlyMaterials:62, naturalLighting:85, greenSpaces:70,
  },
  spaceUtilization:[
    { galleryId:'g1', galleryName:'Главное здание', utilizationRate:82, exhibitionCount:18, visitorDensity:5.7 },
    { galleryId:'g2', galleryName:'Павильон «Свет»', utilizationRate:68, exhibitionCount:12, visitorDensity:6.4 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// UI-компоненты страницы
// ─────────────────────────────────────────────────────────────────────────────
const TABS = [
  { id:'artworks',    label:'🎨 Экспонаты & Аукцион'    },
  { id:'exhibitions', label:'🖼️ Выставки & События'      },
  { id:'collections', label:'📚 Коллекции & Кураторы'   },
  { id:'analytics',   label:'📊 Аналитика & Тренды'      },
  { id:'galleries',   label:'🏛️ Галереи & Архив'         },
  { id:'platform',    label:'🚀 Платформа & Образование' },
  { id:'projects',    label:'💡 Проекты & Студии'        },
] as const;

type TabId = typeof TABS[number]['id'];

const SectionTitle: React.FC<{ title: string; desc: string }> = ({ title, desc }) => (
  <div className="mb-6">
    <h2 className="text-xl font-bold text-gray-900">{title}</h2>
    <p className="text-sm text-gray-500 mt-0.5">{desc}</p>
  </div>
);

const Divider: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex items-center gap-3 my-8">
    <div className="flex-1 h-px bg-gray-200" />
    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</span>
    <div className="flex-1 h-px bg-gray-200" />
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Главный компонент
// ─────────────────────────────────────────────────────────────────────────────
const NewFeaturesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('artworks');

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Шапка ─────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-start gap-4">
            <span className="text-4xl">🧪</span>
            <div>
              <h1 className="text-3xl font-bold mb-2">Новые функции</h1>
              <p className="text-indigo-100 max-w-2xl">
                Витрина всех подготовленных компонентов платформы. Карточки и визуализаторы
                для будущих разделов — аукцион, выставки, аналитика, коллекции и многое другое.
                Каждая секция — это готовая UI-заготовка.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Табы ──────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200 sticky top-14 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-0">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Контент ───────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Экспонаты & Аукцион */}
        {activeTab === 'artworks' && (
          <div>
            <SectionTitle
              title="Экспонаты & Аукцион"
              desc="Карточки произведений, лоты аукциона и профили участников торгов."
            />
            <Divider label="Карточки экспонатов (ArtworkCard)" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {artworkCards.map((a, i) => (
                <ArtworkCard key={i} {...a} onLike={() => {}} onView={() => {}} onShare={() => {}} />
              ))}
            </div>
            <Divider label="Лоты аукциона (ArtAuctionCard)" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {auctionCards.map((a, i) => (
                <ArtAuctionCard key={i} {...a} onBid={() => {}} onView={() => {}} />
              ))}
            </div>
            <Divider label="Участники аукциона (AuctionParticipantCard)" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {participantCards.map((p, i) => (
                <AuctionParticipantCard key={i} {...p} onBid={() => {}} onView={() => {}} />
              ))}
            </div>
          </div>
        )}

        {/* Выставки & События */}
        {activeTab === 'exhibitions' && (
          <div>
            <SectionTitle
              title="Выставки & События"
              desc="Карточки временных выставок и мероприятий."
            />
            <Divider label="Выставки (ArtExhibitionCard)" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {exhibitionCards.map((e, i) => (
                <ArtExhibitionCard key={i} {...e} onVisit={() => {}} onView={() => {}} />
              ))}
            </div>
            <Divider label="Мероприятия (ArtEventCard)" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {eventCards.map((e, i) => (
                <ArtEventCard key={i} {...e} onRegister={() => {}} onView={() => {}} />
              ))}
            </div>
          </div>
        )}

        {/* Коллекции & Кураторы */}
        {activeTab === 'collections' && (
          <div>
            <SectionTitle
              title="Коллекции & Кураторы"
              desc="Тематические подборки и профили кураторов."
            />
            <Divider label="Коллекции (ArtCollectionCard)" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {collectionCards.map((c, i) => (
                <ArtCollectionCard key={i} {...c} onVisit={() => {}} onView={() => {}} />
              ))}
            </div>
            <Divider label="Кураторы (ArtCuratorCard)" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {curatorCards.map((c, i) => (
                <ArtCuratorCard key={i} {...c} onContact={() => {}} onView={() => {}} />
              ))}
            </div>
            <Divider label="Визуализатор коллекции (ArtCollectionVisualizer)" />
            <ArtCollectionVisualizer collectionData={collectionVisData} />
          </div>
        )}

        {/* Аналитика & Тренды */}
        {activeTab === 'analytics' && (
          <div>
            <SectionTitle
              title="Аналитика & Тренды"
              desc="Дашборды с графиками — статистика платформы, рынок, тренды."
            />
            <Divider label="Общая статистика (ArtStatsVisualizer)" />
            <ArtStatsVisualizer statsData={statsData} />
            <Divider label="Аналитика просмотров (ArtAnalyticsVisualizer)" />
            <ArtAnalyticsVisualizer analyticsData={analyticsData} />
            <Divider label="Арт-рынок (ArtMarketVisualizer)" />
            <ArtMarketVisualizer marketData={marketData} />
            <Divider label="Тренды искусства (ArtTrendsVisualizer)" />
            <ArtTrendsVisualizer trendsData={trendsData} />
          </div>
        )}

        {/* Галереи & Архив */}
        {activeTab === 'galleries' && (
          <div>
            <SectionTitle
              title="Галереи & Архив"
              desc="Карточки галерей, архив произведений и история искусства."
            />
            <Divider label="Виртуальные галереи (GalleryCard)" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {galleryCards.map((g, i) => (
                <GalleryCard key={i} {...g} onView={() => {}} />
              ))}
            </div>
            <Divider label="VR-галереи (VirtualGalleryCard)" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {virtualGalleryCards.map((g, i) => (
                <VirtualGalleryCard key={i} {...g} onVisit={() => {}} onView={() => {}} />
              ))}
            </div>
            <Divider label="Физические галереи (ArtGalleryCard)" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {artGalleryCards.map((g, i) => (
                <ArtGalleryCard key={i} {...g} onVisit={() => {}} onView={() => {}} />
              ))}
            </div>
            <Divider label="Карточки архивов (ArtArchiveCard)" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {archiveCards.map((a, i) => (
                <ArtArchiveCard key={i} {...a} onView={() => {}} onDownload={() => {}} />
              ))}
            </div>
            <Divider label="Визуализатор архива (ArtArchiveVisualizer)" />
            <ArtArchiveVisualizer archiveData={archiveVisData} />
            <Divider label="История искусства (ArtHistoryVisualizer)" />
            <ArtHistoryVisualizer historyData={historyData} />
          </div>
        )}

        {/* Платформа & Образование */}
        {activeTab === 'platform' && (
          <div>
            <SectionTitle
              title="Платформа & Образование"
              desc="Технологии, социальная сеть, образовательные курсы, архитектура галерей."
            />
            <Divider label="Технологии платформы (ArtTechVisualizer)" />
            <ArtTechVisualizer techData={techData} />
            <Divider label="Социальная активность (ArtSocialNetworkVisualizer)" />
            <ArtSocialNetworkVisualizer socialData={socialData} />
            <Divider label="Образование (ArtEducationVisualizer)" />
            <ArtEducationVisualizer educationData={educationData} />
            <Divider label="Архитектура галерей (ArtArchitectureVisualizer)" />
            <ArtArchitectureVisualizer architectureData={architectureData} />
          </div>
        )}

        {/* Проекты & Студии */}
        {activeTab === 'projects' && (
          <div>
            <SectionTitle
              title="Проекты & Студии"
              desc="Краудфандинг, магазины художников и творческие студии."
            />
            <Divider label="Арт-проекты / краудфандинг (ArtProjectCard)" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {projectCards.map((p, i) => (
                <ArtProjectCard key={i} {...p} onSupport={() => {}} onView={() => {}} />
              ))}
            </div>
            <Divider label="Магазины художников (ArtStoreCard)" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {storeCards.map((s, i) => (
                <ArtStoreCard key={i} {...s} onVisit={() => {}} onView={() => {}} />
              ))}
            </div>
            <Divider label="Студии (ArtStudioCard)" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {studioCards.map((s, i) => (
                <ArtStudioCard key={i} {...s} onVisit={() => {}} onView={() => {}} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default NewFeaturesPage;
