// scripts/populate-db.ts
import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import 'dotenv/config';

async function populateDatabase() {
  const pool = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  try {
    console.log('Заполнение базы данных тестовыми данными...');
    const client = await pool.connect();

    // Хешируем пароль для тестовых пользователей
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Создаем тестовых пользователей для разных ролей
    // Примечание: в текущей структуре таблицы users нет колонки role,
    // поэтому мы будем хранить роль в JSONB поле preferences
    const testUsers = [
      {
        username: 'admin_user',
        email: 'admin@example.com',
        password_hash: hashedPassword,
        preferences: JSON.stringify({ role: 'admin', first_name: 'Админ', last_name: 'Главный' })
      },
      {
        username: 'curator_user',
        email: 'curator@example.com',
        password_hash: hashedPassword,
        preferences: JSON.stringify({ role: 'curator', first_name: 'Куратор', last_name: 'Искусства' })
      },
      {
        username: 'staff_user',
        email: 'staff@example.com',
        password_hash: hashedPassword,
        preferences: JSON.stringify({ role: 'staff', first_name: 'Сотрудник', last_name: 'Галереи' })
      },
      {
        username: 'tour_guide_user',
        email: 'tourguide@example.com',
        password_hash: hashedPassword,
        preferences: JSON.stringify({ role: 'tour_guide', first_name: 'Гид', last_name: 'Экскурсовод' })
      },
      {
        username: 'auction_participant_user',
        email: 'auction@example.com',
        password_hash: hashedPassword,
        preferences: JSON.stringify({ role: 'auction_participant', first_name: 'Участник', last_name: 'Аукциона' })
      }
    ];

    for (const user of testUsers) {
      const result = await client.query(
        `INSERT INTO users (username, email, password_hash, preferences)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (email) DO NOTHING
         RETURNING user_id`,
        [user.username, user.email, user.password_hash, user.preferences]
      );
      // Извлекаем роль из preferences для вывода
      const role = JSON.parse(user.preferences).role;
      console.log(`Пользователь ${user.username} (${role}) добавлен с ID:`, result.rows[0]?.user_id);
    }

    // Создаем тестовые экспонаты
    const testArtworks = [
      {
        title: 'Мона Лиза',
        artist_name: 'Леонардо да Винчи',
        year_created: 1503,
        medium: 'Масло',
        dimensions: '77 см × 53 см',
        style: 'Ренессанс',
        description: 'Одна из самых известных картин в мире',
        image_url: 'https://example.com/mona_lisa.jpg',
        tags: ['ренессанс', 'портрет', 'италия']
      },
      {
        title: 'Звёздная ночь',
        artist_name: 'Винсент Ван Гог',
        year_created: 1889,
        medium: 'Масло',
        dimensions: '73.7 см × 92.1 см',
        style: 'Постимпрессионизм',
        description: 'Картина Ван Гога, изображающая ночной пейзаж',
        image_url: 'https://example.com/starry_night.jpg',
        tags: ['постимпрессионизм', 'пейзаж', 'нидерланды']
      },
      {
        title: 'Девушка с жемчужной серёжкой',
        artist_name: 'Иоганнес Вермеер',
        year_created: 1665,
        medium: 'Масло',
        dimensions: '44.5 см × 39 см',
        style: 'Барокко',
        description: 'Известна как "голландская Мона Лиза"',
        image_url: 'https://example.com/girl_with_pearl_earring.jpg',
        tags: ['барокко', 'портрет', 'нидерланды']
      }
    ];

    for (const artwork of testArtworks) {
      // Преобразуем массив тегов в формат PostgreSQL
      const tagsArray = `{${artwork.tags.map(tag => `"${tag}"`).join(',')}}`;

      // Проверим, существует ли уже экспонат с таким названием
      const existingArtwork = await client.query(
        'SELECT artwork_id FROM artworks WHERE title = $1',
        [artwork.title]
      );

      if (existingArtwork.rows.length === 0) {
        // Если экспонат не существует, вставляем его
        const result = await client.query(
          `INSERT INTO artworks (title, artist_name, year_created, medium, dimensions, style, description, image_url, tags)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
           RETURNING artwork_id`,
          [artwork.title, artwork.artist_name, artwork.year_created, artwork.medium,
           artwork.dimensions, artwork.style, artwork.description, artwork.image_url,
           tagsArray]
        );
        console.log(`Экспонат "${artwork.title}" добавлен с ID:`, result.rows[0]?.artwork_id);
      } else {
        console.log(`Экспонат "${artwork.title}" уже существует с ID:`, existingArtwork.rows[0].artwork_id);
      }
    }

    // Создаем тестовую галерею
    // Проверим, существует ли таблица galleries
    try {
      const galleryResult = await client.query(
        `INSERT INTO galleries (name, description)
         VALUES ($1, $2)
         ON CONFLICT (name) DO NOTHING
         RETURNING gallery_id`,
        ['Основная галерея', 'Главная галерея виртуального музея']
      );
      console.log('Галерея "Основная галерея" добавлена с ID:', galleryResult.rows[0]?.gallery_id);
    } catch (galleryErr: any) {
      console.log('Таблица galleries не существует или структура отличается:', galleryErr.message);
    }

    client.release();
    
    console.log('\nТестовые данные успешно добавлены!');
    console.log('\nТестовые учетные записи:');
    console.log('Администратор: admin@example.com / password123');
    console.log('Куратор: curator@example.com / password123');
    console.log('Сотрудник: staff@example.com / password123');
    console.log('Гид: tourguide@example.com / password123');
    console.log('Участник аукциона: auction@example.com / password123');
  } catch (err) {
    console.error('Ошибка при заполнении базы данных:', err);
  } finally {
    await pool.end();
    console.log('Подключение закрыто');
  }
}

populateDatabase();