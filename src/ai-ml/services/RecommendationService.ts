// src/ai-ml/services/recommendationService.ts
import { Pool } from 'pg';
import 'dotenv/config';

class RecommendationService {
  private pool: Pool;
  private userProfiles: Map<string, any>;
  private artworkFeatures: Map<string, any>;
  private collaborativeMatrix: any;

  constructor() {
    this.pool = new Pool({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });
    this.userProfiles = new Map();
    this.artworkFeatures = new Map();
    this.collaborativeMatrix = null;
  }

  // Инициализация сервиса рекомендаций
  async initialize() {
    console.log('Инициализация сервиса рекомендаций...');

    // Загрузка профилей пользователей и характеристик экспонатов
    await this.preloadData();

    // Построение начальной матрицы совместной фильтрации
    await this.buildCollaborativeMatrix();

    console.log('Сервис рекомендаций инициализирован');
  }

  // Загрузка данных пользователей и экспонатов
  async preloadData() {
    try {
      // Загрузка всех пользователей
      const usersResult = await this.pool.query('SELECT * FROM users');
      for (const user of usersResult.rows) {
        this.userProfiles.set(user.user_id.toString(), {
          ...user,
          preferences: user.preferences || {},
          interactionHistory: [] // Будет заполняться по мере необходимости
        });
      }

      // Загрузка всех экспонатов и вычисление характеристик
      const artworksResult = await this.pool.query('SELECT * FROM artworks');
      for (const artwork of artworksResult.rows) {
        this.artworkFeatures.set(artwork.artwork_id.toString(), this.computeArtworkFeatures(artwork));
      }
    } catch (error) {
      console.error('Ошибка при предварительной загрузке данных:', error);
      throw error;
    }
  }

  // Вычисление характеристик экспоната
  private computeArtworkFeatures(artwork: any) {
    return {
      artwork_id: artwork.artwork_id,
      style_vector: this.getStyleVector(artwork.style),
      tag_vector: this.getTagVector(artwork.tags),
      artist_vector: this.getArtistVector(artwork.artist_name),
      period_vector: this.getPeriodVector(artwork.year_created),
      medium_vector: this.getMediumVector(artwork.medium),
      embedding: this.generateEmbedding(artwork) // Упрощенное встраивание
    };
  }

  // Генерация вектора стиля
  private getStyleVector(style: string) {
    if (!style) return new Array(10).fill(0);

    // Простое сопоставление стилей с векторами (на практике это было бы более сложным)
    const styleVectors: { [key: string]: number[] } = {
      'импрессионизм': [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      'реализм': [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      'абстракт': [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      'кубизм': [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
      'сюрреализм': [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      'барокко': [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
      'ренессанс': [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      'модерн': [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
      'современное': [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
      'классика': [0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
    };

    const normalizedStyle = style.toLowerCase();
    return styleVectors[normalizedStyle] || new Array(10).fill(0.1);
  }

  // Генерация вектора тегов
  private getTagVector(tags: string[]) {
    if (!tags || !Array.isArray(tags)) return new Array(20).fill(0);

    // Простое представление "мешка слов" (на практике использовались бы встраивания)
    const allTags = ['пейзаж', 'портрет', 'натюрморт', 'абстракция', 'фигуратив',
                     'религиозный', 'мифологический', 'исторический', 'жанровый', 'морской пейзаж',
                     'городской пейзаж', 'цветы', 'животные', 'ню', 'война', 'мир',
                     'любовь', 'смерть', 'природа', 'урбанистический'];

    const vector = new Array(allTags.length).fill(0);
    for (let i = 0; i < allTags.length; i++) {
      if (tags.includes(allTags[i])) {
        vector[i] = 1;
      }
    }

    return vector;
  }

  // Генерация вектора художника
  private getArtistVector(artistName: string) {
    if (!artistName) return new Array(15).fill(0);

    // Простое хеширование для векторизации (на практике использовались бы встраивания художников)
    let hash = 0;
    for (let i = 0; i < artistName.length; i++) {
      hash = ((hash << 5) - hash) + artistName.charCodeAt(i);
      hash |= 0; // Преобразование в 32-битное целое
    }

    const vector = new Array(15).fill(0);
    for (let i = 0; i < 15; i++) {
      vector[i] = Math.abs(Math.sin(hash + i)) % 1;
    }

    return vector;
  }

  // Генерация вектора периода
  private getPeriodVector(yearCreated: number) {
    if (!yearCreated) return new Array(10).fill(0);

    // Нормализация по десятилетиям
    const decade = Math.floor(yearCreated / 10) * 10;
    const baseYear = 1800; // Начальный ориентир
    const maxYears = 200; // Диапазон 200 лет

    const vector = new Array(10).fill(0);
    if (decade >= baseYear && decade < baseYear + maxYears) {
      const index = Math.floor(((decade - baseYear) / maxYears) * 10);
      if (index < 10) {
        vector[index] = 1;
      }
    }

    return vector;
  }

  // Генерация вектора техники
  private getMediumVector(medium: string) {
    if (!medium) return new Array(8).fill(0);

    const mediums = ['масло', 'акварель', 'акрил', 'темпера', 'пастель', 'уголь', 'карандаш', 'смешанная техника'];
    const vector = new Array(8).fill(0);

    const index = mediums.indexOf(medium.toLowerCase());
    if (index !== -1) {
      vector[index] = 1;
    } else {
      // Если техника не распознана, распределяем активацию между похожими техниками
      vector.fill(0.125); // Равная вероятность
    }

    return vector;
  }

  // Генерация упрощенного встраивания для экспоната
  private generateEmbedding(artwork: any) {
    // Комбинирование всех векторов признаков с весами
    const styleVec = this.getStyleVector(artwork.style);
    const tagVec = this.getTagVector(artwork.tags || []);
    const artistVec = this.getArtistVector(artwork.artist_name);
    const periodVec = this.getPeriodVector(artwork.year_created);
    const mediumVec = this.getMediumVector(artwork.medium);

    // Взвешенное сочетание
    const embedding = [];
    const maxLength = Math.max(
      styleVec.length, 
      tagVec.length, 
      artistVec.length, 
      periodVec.length, 
      mediumVec.length
    );
    
    for (let i = 0; i < maxLength; i++) {
      const val = 
        (i < styleVec.length ? styleVec[i] * 0.25 : 0) +
        (i < tagVec.length ? tagVec[i] * 0.25 : 0) +
        (i < artistVec.length ? artistVec[i] * 0.20 : 0) +
        (i < periodVec.length ? periodVec[i] * 0.15 : 0) +
        (i < mediumVec.length ? mediumVec[i] * 0.15 : 0);
      embedding.push(val);
    }

    return embedding;
  }

  // Построение матрицы совместной фильтрации
  async buildCollaborativeMatrix() {
    // В реальной реализации это построило бы матрицу взаимодействий пользователь-объект
    // Для простоты сейчас используем заглушку
    console.log('Построение матрицы совместной фильтрации...');

    this.collaborativeMatrix = {
      builtAt: new Date(),
      users: Array.from(this.userProfiles.keys()),
      items: Array.from(this.artworkFeatures.keys()),
      model: 'matrix_factorization_placeholder'
    };
  }

  // Получение рекомендаций для пользователя
  async getRecommendations(userId: string, count: number = 5, filters: any = {}) {
    // Получение профиля пользователя
    const userProfile = this.userProfiles.get(userId);
    if (!userProfile) {
      throw new Error(`Пользователь не найден: ${userId}`);
    }

    // Получение истории взаимодействий пользователя
    const interactionHistory = await this.getUserInteractionHistory(userId);

    // Применение гибридного подхода к рекомендациям
    const contentBasedRecs = await this.getContentBasedRecommendations(userId, count * 2, filters);
    const collaborativeRecs = await this.getCollaborativeRecommendations(userId, count * 2, filters);

    // Объединение и ранжирование рекомендаций
    const combinedRecs = this.combineRecommendations(contentBasedRecs, collaborativeRecs, count);

    // Применение фильтра разнообразия для избегания повторяющихся рекомендаций
    const diverseRecs = this.applyDiversityFilter(combinedRecs, count);

    return diverseRecs;
  }

  // Получение рекомендаций на основе содержания
  async getContentBasedRecommendations(userId: string, count: number, filters: any) {
    const userProfile = this.userProfiles.get(userId);
    if (!userProfile) return [];

    // Получение предпочтений пользователя на основе истории взаимодействий
    const userPreferences = await this.inferUserPreferences(userId);

    // Получение всех экспонатов
    const artworksResult = await this.pool.query('SELECT * FROM artworks');
    const allArtworks = artworksResult.rows;

    // Оценка каждого экспоната на основе схожести с предпочтениями пользователя
    const scoredArtworks = allArtworks.map(artwork => {
      const artworkFeatures = this.artworkFeatures.get(artwork.artwork_id.toString());
      if (!artworkFeatures) return { ...artwork, score: 0 };

      // Расчет оценки схожести
      const score = this.calculateContentSimilarity(userPreferences, artworkFeatures);

      return { ...artwork, score };
    });

    // Сортировка по оценке и возврат лучших рекомендаций
    const sortedArtworks = scoredArtworks
      .filter(item => item.score > 0) // Включаем только элементы с положительными оценками
      .sort((a, b) => b.score - a.score)
      .slice(0, count);

    return sortedArtworks;
  }

  // Определение предпочтений пользователя из истории взаимодействий
  async inferUserPreferences(userId: string) {
    const interactions = await this.getUserInteractionHistory(userId);

    if (interactions.length === 0) {
      // Если нет истории взаимодействий, возвращаем нейтральные предпочтения
      return {
        preferredStyles: [],
        preferredTags: [],
        preferredArtists: [],
        preferredPeriods: [],
        preferredMediums: [],
        embedding: new Array(50).fill(0.1) // Заглушка
      };
    }

    // Агрегирование предпочтений из взаимодействий
    const styleCounts: { [key: string]: number } = {};
    const tagCounts: { [key: string]: number } = {};
    const artistCounts: { [key: string]: number } = {};
    const periodCounts: { [key: string]: number } = {};
    const mediumCounts: { [key: string]: number } = {};

    for (const interaction of interactions) {
      const artworkResult = await this.pool.query(
        'SELECT * FROM artworks WHERE artwork_id = $1', 
        [interaction.artwork_id]
      );
      
      if (artworkResult.rows.length === 0) continue;
      
      const artwork = artworkResult.rows[0];

      // Подсчет стилей
      if (artwork.style) {
        styleCounts[artwork.style] = (styleCounts[artwork.style] || 0) + 1;
      }

      // Подсчет тегов
      if (artwork.tags && Array.isArray(artwork.tags)) {
        for (const tag of artwork.tags) {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        }
      }

      // Подсчет художников
      artistCounts[artwork.artist_name] = (artistCounts[artwork.artist_name] || 0) + 1;

      // Подсчет периодов (по десятилетиям)
      if (artwork.year_created) {
        const decade = Math.floor(artwork.year_created / 10) * 10;
        periodCounts[decade] = (periodCounts[decade] || 0) + 1;
      }

      // Подсчет техник
      if (artwork.medium) {
        mediumCounts[artwork.medium] = (mediumCounts[artwork.medium] || 0) + 1;
      }
    }

    // Преобразование счетчиков в отсортированные массивы
    const preferredStyles = Object.entries(styleCounts)
      .sort(([,a], [,b]) => b - a)
      .map(([style]) => style);

    const preferredTags = Object.entries(tagCounts)
      .sort(([,a], [,b]) => b - a)
      .map(([tag]) => tag);

    const preferredArtists = Object.entries(artistCounts)
      .sort(([,a], [,b]) => b - a)
      .map(([artist]) => artist);

    const preferredPeriods = Object.entries(periodCounts)
      .sort(([,a], [,b]) => b - a)
      .map(([period]) => parseInt(period));

    const preferredMediums = Object.entries(mediumCounts)
      .sort(([,a], [,b]) => b - a)
      .map(([medium]) => medium);

    // Создание встраивания предпочтений на основе истории взаимодействий
    const embedding = this.createPreferenceEmbedding(preferredStyles, preferredTags, preferredArtists);

    return {
      preferredStyles,
      preferredTags,
      preferredArtists,
      preferredPeriods,
      preferredMediums,
      embedding
    };
  }

  // Создание встраивания предпочтений
  private createPreferenceEmbedding(styles: string[], tags: string[], artists: string[]) {
    // Это создаст взвешенное встраивание на основе предпочтений пользователя
    // Для простоты возвращаем заглушку
    return new Array(50).fill(0.1);
  }

  // Расчет схожести содержания между предпочтениями пользователя и экспонатом
  private calculateContentSimilarity(userPreferences: any, artworkFeatures: any) {
    // Расчет схожести по различным измерениям
    const styleSimilarity = this.calculateVectorSimilarity(
      userPreferences.embedding,
      artworkFeatures.embedding
    );

    // Дополнительные факторы могут включать:
    // - Совпадение тегов
    // - Знакомство с художником
    // - Соответствие периоду
    // - Предпочтение техники

    // Пока возвращаем схожесть по стилю как общую оценку
    return styleSimilarity;
  }

  // Расчет косинусного сходства между двумя векторами
  private calculateVectorSimilarity(vec1: number[], vec2: number[]) {
    if (vec1.length !== vec2.length) {
      throw new Error('Векторы должны иметь одинаковую длину');
    }

    let dotProduct = 0;
    let magnitude1 = 0;
    let magnitude2 = 0;

    for (let i = 0; i < vec1.length; i++) {
      dotProduct += vec1[i] * vec2[i];
      magnitude1 += vec1[i] * vec1[i];
      magnitude2 += vec2[i] * vec2[i];
    }

    magnitude1 = Math.sqrt(magnitude1);
    magnitude2 = Math.sqrt(magnitude2);

    if (magnitude1 === 0 || magnitude2 === 0) {
      return 0;
    }

    return dotProduct / (magnitude1 * magnitude2);
  }

  // Получение рекомендаций на основе совместной фильтрации
  async getCollaborativeRecommendations(userId: string, count: number, filters: any) {
    // В реальной реализации это использовало бы модель совместной фильтрации
    // Пока возвращаем заглушку
    
    // Получаем все экспонаты
    const artworksResult = await this.pool.query('SELECT * FROM artworks');
    const allArtworks = artworksResult.rows;

    // Возвращаем случайные экспонаты как заглушку
    const shuffled = [...allArtworks].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count).map(artwork => ({
      ...artwork,
      score: Math.random()
    }));
  }

  // Объединение рекомендаций на основе содержания и совместной фильтрации
  private combineRecommendations(contentRecs: any[], collaborativeRecs: any[], count: number) {
    // Создаем карту для хранения объединенных оценок
    const combinedScores = new Map();

    // Добавляем оценки на основе содержания (с весом)
    for (const item of contentRecs) {
      combinedScores.set(item.artwork_id, {
        ...item,
        contentScore: item.score || 0,
        collaborativeScore: 0,
        combinedScore: (item.score || 0) * 0.6 // Вес для рекомендаций на основе содержания
      });
    }

    // Добавляем оценки совместной фильтрации (с весом)
    for (const item of collaborativeRecs) {
      if (combinedScores.has(item.artwork_id)) {
        // Обновляем существующий элемент
        const existing = combinedScores.get(item.artwork_id);
        existing.collaborativeScore = item.score || 0;
        existing.combinedScore = (existing.contentScore * 0.6) + ((item.score || 0) * 0.4);
      } else {
        // Добавляем новый элемент
        combinedScores.set(item.artwork_id, {
          ...item,
          contentScore: 0,
          collaborativeScore: item.score || 0,
          combinedScore: (item.score || 0) * 0.4 // Вес для совместной фильтрации
        });
      }
    }

    // Преобразуем в массив и сортируем по объединенной оценке
    const allItems = Array.from(combinedScores.values());
    allItems.sort((a, b) => b.combinedScore - a.combinedScore);

    return allItems.slice(0, count);
  }

  // Применение фильтра разнообразия к рекомендациям
  private applyDiversityFilter(recommendations: any[], count: number) {
    // Эта функция обеспечивает разнообразие в рекомендациях
    // Она предотвращает появление слишком похожих элементов вместе

    if (recommendations.length <= count) {
      return recommendations;
    }

    const selected = [];
    const remaining = [...recommendations];

    while (selected.length < count && remaining.length > 0) {
      // Берем элемент с наивысшей оценкой
      const bestItem = remaining.shift();
      selected.push(bestItem);

      // Удаляем похожие элементы для обеспечения разнообразия
      const style = bestItem.style;
      if (style) {
        for (let i = remaining.length - 1; i >= 0; i--) {
          if (remaining[i].style === style && Math.random() > 0.5) {
            // Случайным образом удаляем некоторые элементы с тем же стилем для обеспечения разнообразия
            remaining.splice(i, 1);
          }
        }
      }
    }

    return selected.slice(0, count);
  }

  // Получение истории взаимодействий пользователя
  async getUserInteractionHistory(userId: string) {
    // В реальной реализации это запросило бы из базы данных историю взаимодействий пользователя
    // Пока возвращаем заглушку
    return [];
  }

  // Получение похожих экспонатов для заданного экспоната
  async getSimilarArtworks(artworkId: string, count: number = 5, userId: string | null = null) {
    const artworkResult = await this.pool.query(
      'SELECT * FROM artworks WHERE artwork_id = $1',
      [artworkId]
    );

    if (artworkResult.rows.length === 0) {
      throw new Error(`Экспонат не найден: ${artworkId}`);
    }

    const targetArtwork = artworkResult.rows[0];
    const targetFeatures = this.artworkFeatures.get(artworkId.toString());

    if (!targetFeatures) {
      throw new Error(`Характеристики не вычислены для экспоната: ${artworkId}`);
    }

    // Получаем все экспонаты, кроме целевого
    const allArtworksResult = await this.pool.query(
      'SELECT * FROM artworks WHERE artwork_id != $1',
      [artworkId]
    );
    const allArtworks = allArtworksResult.rows;

    // Расчет схожести с целевым экспонатом
    const scoredArtworks = allArtworks.map(artwork => {
      const artworkFeatures = this.artworkFeatures.get(artwork.artwork_id.toString());
      if (!artworkFeatures) return { ...artwork, similarity: 0 };

      const similarity = this.calculateVectorSimilarity(
        targetFeatures.embedding,
        artworkFeatures.embedding
      );

      return { ...artwork, similarity };
    });

    // Сортировка по схожести и возврат лучших результатов
    const sortedArtworks = scoredArtworks
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, count);

    return sortedArtworks;
  }

  // Обновление модели с новыми данными взаимодействия
  async updateModelWithInteraction(userId: string, artworkId: string, interactionType: string, rating: number | null = null) {
    // В реальной реализации это обновило бы модель рекомендаций
    // с новыми данными взаимодействия пользователя для улучшения будущих рекомендаций

    console.log(`Обновление модели с взаимодействием: пользователь ${userId}, экспонат ${artworkId}, тип ${interactionType}`);

    // Обновление профиля пользователя с новым взаимодействием
    const userProfile = this.userProfiles.get(userId);
    if (userProfile) {
      // Добавление в историю взаимодействий (в реальной реализации)
      // userProfile.interactionHistory.push({
      //     artwork_id: artworkId,
      //     interaction_type: interactionType,
      //     timestamp: new Date(),
      //     rating
      // });
    }

    // Потенциально запуск повторного обучения модели, если накопилось достаточно новых данных
    // await this.checkRetrainCondition();
  }

  // Проверка необходимости повторного обучения модели
  async checkRetrainCondition() {
    // В реальной реализации это проверило бы, накопилось ли достаточно новых данных
    // для повторного обучения модели
    // Пока возвращаем заглушку
    return false;
  }

  // Повторное обучение модели рекомендаций
  async retrainModel() {
    console.log('Повторное обучение модели рекомендаций...');

    // Перезагрузка данных
    await this.preloadData();

    // Повторное построение матрицы совместной фильтрации
    await this.buildCollaborativeMatrix();

    console.log('Модель рекомендаций успешно переобучена');
  }
}

// Экспорт синглтона
const recommendationService = new RecommendationService();
export default recommendationService;