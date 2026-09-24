import React, { useState, useEffect, useRef, useMemo } from 'react';
import { fetchWithAuth } from '../services/api';
import { MapPin, Clock, Users, Star, Eye, GalleryVerticalEnd, Search } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  text: string;
  time: string;
}

interface Museum {
  name: string;
  city: string;
  description: string;
  url: string;
  domain: string;
  color: string;
  badge: string;
  badgeColor: string;
  icon: string;
}

const MUSEUMS: Museum[] = [
  {
    name: 'The Metropolitan Museum of Art',
    city: 'Нью-Йорк, США',
    description: 'Более 490 000 произведений от древности до современности. Открытый API с доступом к изображениям в высоком разрешении.',
    url: 'https://www.metmuseum.org/art/collection',
    domain: 'metmuseum.org',
    color: 'red',
    badge: 'Open Access',
    badgeColor: 'green',
    icon: '🏛',
  },
  {
    name: 'Musée du Louvre',
    city: 'Париж, Франция',
    description: 'Крупнейший музей мира: более 380 000 экспонатов, включая Мону Лизу и Венеру Милосскую. Виртуальные туры по залам.',
    url: 'https://www.louvre.fr/en/online-tours',
    domain: 'louvre.fr',
    color: 'amber',
    badge: 'Virtual Tours',
    badgeColor: 'amber',
    icon: '👑',
  },
  {
    name: 'Государственный Эрмитаж',
    city: 'Санкт-Петербург, Россия',
    description: 'Более 3 миллионов экспонатов: от скифского золота до импрессионистов. Виртуальные экскурсии по залам Зимнего дворца.',
    url: 'https://www.hermitagemuseum.org/wps/portal/hermitage/explore/collections',
    domain: 'hermitagemuseum.org',
    color: 'emerald',
    badge: 'Virtual Tours',
    badgeColor: 'emerald',
    icon: '🏰',
  },
  {
    name: 'Rijksmuseum',
    city: 'Амстердам, Нидерланды',
    description: 'Более 700 000 объектов голландского и мирового искусства. Rijksstudio позволяет скачивать изображения бесплатно.',
    url: 'https://www.rijksmuseum.nl/en/rijksstudio',
    domain: 'rijksmuseum.nl',
    color: 'orange',
    badge: 'Open Access',
    badgeColor: 'green',
    icon: '🖼',
  },
  {
    name: 'The National Gallery',
    city: 'Лондон, Великобритания',
    description: 'Более 2 600 картин XIII-XX веков: Леонардо, Рембрандт, Тёрнер, Ван Гог. Детальные описания каждого полотна.',
    url: 'https://www.nationalgallery.org.uk/paintings',
    domain: 'nationalgallery.org.uk',
    color: 'indigo',
    badge: 'Free Access',
    badgeColor: 'indigo',
    icon: '🎨',
  },
  {
    name: 'Google Arts & Culture',
    city: '2 000+ музеев мира',
    description: 'Единая платформа доступа к коллекциям тысяч музеев. Art Camera — сверхвысокое разрешение, виртуальные туры 360.',
    url: 'https://artsandculture.google.com/',
    domain: 'artsandculture.google.com',
    color: 'purple',
    badge: 'Open Access',
    badgeColor: 'green',
    icon: '🔍',
  },
  {
    name: 'ГМИИ им. А.С. Пушкина',
    city: 'Москва, Россия',
    description: 'Более 700 000 произведений: от египетских древностей до живописи Ренуара, Моне, Пикассо. Онлайн-каталог коллекций.',
    url: 'https://www.pushkinmuseum.art/data/fonds/index.php?lang=en',
    domain: 'pushkinmuseum.art',
    color: 'rose',
    badge: 'Online Catalog',
    badgeColor: 'rose',
    icon: '🏛',
  },
  {
    name: 'Galleria degli Uffizi',
    city: 'Флоренция, Италия',
    description: 'Шедевры итальянского Возрождения: Боттичелли, Рафаэль, Караваджо. Онлайн-выставки и детальные описания коллекций.',
    url: 'https://www.uffizi.it/en/online-exhibitions',
    domain: 'uffizi.it',
    color: 'teal',
    badge: 'Online Exhibitions',
    badgeColor: 'teal',
    icon: '☀',
  },
  {
    name: 'WikiArt',
    city: 'Визуальная энциклопедия',
    description: 'Более 250 000 произведений 3 600 художников. Удобный поиск по стилям, жанрам и эпохам с подробными описаниями.',
    url: 'https://www.wikiart.org/',
    domain: 'wikiart.org',
    color: 'sky',
    badge: 'Open Access',
    badgeColor: 'green',
    icon: '🎨',
  },
];

const TOPIC_CARDS = [
  {
    label: 'Виды искусства',
    description: 'Живопись, скульптура, графика, декоративное искусство',
    question: 'Расскажи об основных направлениях в живописи',
    color: 'purple',
    icon: '🎨',
  },
  {
    label: 'Техники',
    description: 'Масло, акварель, темпера, фреска, гравюра',
    question: 'Какие техники живописи существуют?',
    color: 'amber',
    icon: '🖌',
  },
  {
    label: 'История',
    description: 'От античности до современного искусства',
    question: 'Расскажи об основных эпохах в истории искусства',
    color: 'blue',
    icon: '📜',
  },
  {
    label: 'Художники',
    description: 'Биографии, стили и главные произведения мастеров',
    question: 'Расскажи о великих художниках эпохи Возрождения',
    color: 'green',
    icon: '👤',
  },
];

const QUICK_QUESTIONS = [
  'Что такое импрессионизм?',
  'Техники Ван Гога',
  'Что такое барокко?',
  'Кубизм и Пикассо',
  'Сюрреализм и Дали',
  'Рембрандт и свет',
  'Моне и пленэр',
  'Что такое абстрактное искусство?',
  'История фотографии как искусства',
  'Поп-арт: Уорхол и Лихтенштейн',
];

const QUICK_QUESTION_COUNT = 6;

function selectRandomQuickQuestions(): string[] {
  const questions = [...QUICK_QUESTIONS];

  for (let i = questions.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[randomIndex]] = [questions[randomIndex], questions[i]];
  }

  return questions.slice(0, QUICK_QUESTION_COUNT);
}

const DEMO_ANSWERS: Array<{ keywords: string[]; answer: string }> = [
  {
    keywords: ['импрессионизм', 'impressionism'],
    answer:
      'Импрессионизм — художественное направление, возникшее во Франции в 1860–70-х годах. Художники стремились передать мимолётные впечатления от природы и повседневной жизни, работая на открытом воздухе (пленэр). Характерные черты: короткие, видимые мазки, яркие цвета, игра света и тени. Главные представители: Клод Моне, Огюст Ренуар, Эдгар Дега, Камиль Писсарро.',
  },
  {
    keywords: ['ван гог', 'van gogh', 'вангог'],
    answer:
      'Винсент ван Гог (1853–1890) — нидерландский постимпрессионист. Его техника отличается энергичными, вихреобразными мазками и насыщенной палитрой. Он использовал чистые, незамешанные цвета прямо из тюбика, наносил краску толстым слоем (импасто) для создания рельефной текстуры. Известные работы: «Звёздная ночь», «Подсолнухи», «Ночная терраса кафе».',
  },
  {
    keywords: ['возрождение', 'ренессанс', 'renaissance'],
    answer:
      'Эпоха Возрождения (XIV–XVII вв.) — культурный расцвет, начавшийся в Италии. Художники вновь обратились к античным идеалам красоты и реализма. Перспектива, анатомия и светотень (кьяроскуро) стали главными инструментами. Великие мастера: Леонардо да Винчи, Микеланджело, Рафаэль, Боттичелли, Тициан.',
  },
  {
    keywords: ['живопись', 'техник', 'масл', 'акварел', 'темпер', 'фреск'],
    answer:
      'Основные техники живописи:\n• Масляная — краска на основе масла, медленно сохнет, даёт богатую глубину цвета (Рембрандт, Рубенс).\n• Акварель — прозрачные водорастворимые пигменты на бумаге, лёгкость и воздушность.\n• Темпера — пигменты на яичной эмульсии, быстро сохнет, точные штрихи (иконопись, Боттичелли).\n• Фреска — роспись по свежей штукатурке, долговечна (Микеланджело — Сикстинская капелла).\n• Акрил — современная синтетическая краска, быстро сохнет, универсальна.',
  },
  {
    keywords: ['историй', 'эпох', 'период', 'стил', 'направлени'],
    answer:
      'Главные эпохи в истории искусства:\n• Античность (до V в.) — идеализированные формы, мифология.\n• Средневековье (V–XIV вв.) — религиозные темы, плоскостность.\n• Возрождение (XIV–XVII вв.) — реализм, перспектива, гуманизм.\n• Барокко (XVII в.) — драматизм, пышность, контрасты света.\n• Классицизм и романтизм (XVIII–XIX вв.) — идеалы разума vs. чувства.\n• Импрессионизм и постимпрессионизм (XIX в.) — свет, цвет, ощущение.\n• Модернизм и авангард (XX в.) — кубизм, сюрреализм, абстракционизм.',
  },
  {
    keywords: ['художник', 'мастер', 'живописец', 'скульптор'],
    answer:
      'Среди величайших художников в истории:\n• Леонардо да Винчи — учёный и художник, «Мона Лиза», «Тайная вечеря».\n• Микеланджело — скульптор и живописец, «Давид», роспись Сикстинской капеллы.\n• Рембрандт — мастер светотени, психологические портреты.\n• Клод Моне — основатель импрессионизма, серия «Кувшинки».\n• Пабло Пикассо — создатель кубизма, «Герника».\n• Сальвадор Дали — символ сюрреализма, «Постоянство памяти».',
  },
  {
    keywords: ['скульптур'],
    answer:
      'Скульптура — вид изобразительного искусства, создающий объёмные формы. Основные материалы: мрамор, бронза, дерево, глина. Техники: высекание (субтрактивный метод), лепка, литьё. Шедевры: «Давид» Микеланджело (мрамор), «Мыслитель» Родена (бронза), «Венера Милосская» (Древняя Греция).',
  },
  {
    keywords: ['барокко', 'baroque'],
    answer:
      'Барокко — стиль XVII — начала XVIII века, зародившийся в Италии. Отличается драматизмом, пышностью форм, динамикой, контрастами света и тени (тенебризм). В живописи барокко господствуют сложные ракурсы, диагональные композиции, эмоциональная насыщенность. Главные мастера: Петер Пауль Рубенс, Микеланджело Меризи да Караваджо, Диего Веласкес, Рембрандт ван Рейн. Архитектурные примеры: собор Святого Петра в Риме, Версальский дворец.',
  },
  {
    keywords: ['кубизм', 'cubism'],
    answer:
      'Кубизм — авангардное направление начала XX века, основанное Пабло Пикассо и Жоржем Браком около 1907 года. Художники разбивали объекты на геометрические фрагменты и изображали их с нескольких точек зрения одновременно, отказываясь от традиционной перспективы. Различают аналитический кубизм (монохромный, 1908–1912) и синтетический кубизм (коллажи, яркие цвета, 1912–1920). Знаковые работы: «Авиньонские девицы» Пикассо, «Скрипка и кувшин» Брака.',
  },
  {
    keywords: ['сюрреализм', 'surrealism'],
    answer:
      'Сюрреализм — художественное и литературное движение 1920–1930-х годов, вдохновлённое теориями Фрейда о бессознательном. Художники стремились освободить творчество от логики и разума, изображая сны, галлюцинации и фантастические образы с фотографической точностью. Основатель движения — писатель Андре Бретон. Крупнейшие живописцы: Сальвадор Дали («Постоянство памяти»), Рене Магритт («Вероломство образов»), Хуан Миро, Макс Эрнст.',
  },
  {
    keywords: ['абстракц', 'абстрактн', 'абстракционизм', 'abstract'],
    answer:
      'Абстрактное искусство отказывается от изображения узнаваемых предметов, выражая идеи через цвет, форму, линию и фактуру. Зародилось в начале XX века. Основные ветви:\n• Абстрактный экспрессионизм (США, 1940–50-е) — Джексон Поллок (дриппинг), Марк Ротко (цветовые поля).\n• Геометрическая абстракция — Казимир Малевич («Чёрный квадрат»), Пит Мондриан (сетки и первичные цвета).\n• Лирическая абстракция — Василий Кандинский, считавший живопись близкой к музыке.',
  },
  {
    keywords: ['фотографи', 'photography', 'фото'],
    answer:
      'Фотография как вид искусства насчитывает почти два века истории. Изобретена в 1839 году (дагерротип Луи Дагера). Основные жанры: пейзаж, портрет, стрит-фотография, документальная, абстрактная. Пионеры художественной фотографии: Анри Картье-Брессон («решающий момент»), Ансел Адамс (пейзажи Йосемити), Дорис Ланж (документальные снимки Великой депрессии). Сегодня цифровая фотография и мобильные устройства сделали этот вид искусства доступным каждому.',
  },
  {
    keywords: ['рембрандт', 'rembrandt'],
    answer:
      'Рембрандт ван Рейн (1606–1669) — нидерландский мастер эпохи золотого века голландской живописи. Прославился виртуозным владением светотенью (кьяроскуро): свет у него словно исходит изнутри фигур, оставляя фон в густой тени. Создал более 300 картин, 300 офортов и 2 000 рисунков. Ключевые работы: «Ночной дозор», «Возвращение блудного сына», многочисленные автопортреты, отражающие всю его жизнь. Его психологическая глубина в портретах не имеет равных в западной живописи.',
  },
  {
    keywords: ['моне', 'claude monet', 'клод моне'],
    answer:
      'Клод Моне (1840–1926) — французский живописец, основоположник импрессионизма. Его картина «Впечатление. Восходящее солнце» (1872) дала название всему движению. Моне работал сериями, изображая один объект при разном освещении: стога сена, соборы Руана, лондонский парламент в тумане. Последние 30 лет жизни посвятил созданию серии «Водяные лилии» в саду Живерни. Основные черты: растворение контуров в свете, вибрирующий мазок, пленэрная живопись.',
  },
  {
    keywords: ['пикассо', 'picasso'],
    answer:
      'Пабло Пикассо (1881–1973) — испанский художник, скульптор и график, один из самых влиятельных мастеров XX века. Прошёл путь от реализма через «Голубой» и «Розовый» периоды к изобретению кубизма совместно с Жоржем Браком (около 1907 г.). Важнейшие работы: «Авиньонские девицы» (1907) — поворотный момент модернизма; «Герника» (1937) — антивоенная фреска-протест. Суммарно создал около 20 000 произведений в живописи, скульптуре, керамике и графике.',
  },
  {
    keywords: ['дали', 'сальвадор', 'salvador dali', 'dalí'],
    answer:
      'Сальвадор Дали (1904–1989) — испанский живописец, крупнейший представитель сюрреализма. Разработал «параноидно-критический метод»: намеренное введение себя в состояние галлюцинации для рождения образов. Его живопись сочетает фотографическую детальность с абсурдными, сновидческими сценами. Знаковые полотна: «Постоянство памяти» (тающие часы), «Сон, вызванный полётом пчелы», «Искушение святого Антония». Также снимал фильмы с Луисом Бунюэлем и сотрудничал с Хичкоком.',
  },
  {
    keywords: ['романтизм', 'romanticism', 'романтик'],
    answer:
      'Романтизм — художественное движение конца XVIII — первой половины XIX века, возникшее как реакция на рационализм Просвещения и промышленную революцию. Прославлял чувство, воображение, природу, героизм и экзотику. В живописи — бурные пейзажи, исторические сцены, ориентальные мотивы. Главные художники: Эжен Делакруа («Свобода, ведущая народ»), Каспар Давид Фридрих (туманные пейзажи), Уильям Тёрнер (световые эффекты), Франсиско Гойя (поздние «чёрные картины»).',
  },
  {
    keywords: ['экспрессионизм', 'expressionism'],
    answer:
      'Экспрессионизм — направление начала XX века, сложившееся прежде всего в Германии и Австрии. Художники деформировали реальность, чтобы выразить внутренние эмоции и тревогу. Характерны резкие цвета, угловатые линии, искажённые формы. Группы: «Мост» (Эрнст Людвиг Кирхнер, Эрих Хеккель) и «Синий всадник» (Василий Кандинский, Франц Марк). Предшественник — Эдвард Мунк с его картиной «Крик» (1893), ставшей иконой экспрессионизма.',
  },
  {
    keywords: ['поп-арт', 'pop art', 'попарт', 'поп арт'],
    answer:
      'Поп-арт — движение 1950–1960-х годов, возникшее в Великобритании и США. Художники обратились к образам массовой культуры: рекламе, комиксам, упаковке товаров, знаменитостям. Бросало вызов элитарности «высокого» искусства. Главные представители: Энди Уорхол («Мэрилин Монро», банки супа Campbell), Рой Лихтенштейн (картины в стиле комиксов), Джаспер Джонс (флаги и мишени), Ричард Гамильтон (Великобритания). Повлиял на дизайн, рекламу и всю визуальную культуру второй половины XX века.',
  },
  {
    keywords: ['реализм', 'realism', 'реалист'],
    answer:
      'Реализм в искусстве — направление середины XIX века, провозгласившее верность изображению действительности без идеализации. Художники обратились к повседневной жизни простых людей, труду, социальным проблемам. Зародился во Франции. Ключевые фигуры: Гюстав Курбе («Похороны в Орнане», «Дробильщики камня»), Жан-Франсуа Милле (крестьянский труд), Оноре Домье (карикатура и живопись). В России — Передвижники: Илья Репин («Бурлаки на Волге»), Василий Суриков, Иван Крамской.',
  },
  {
    keywords: ['леонардо', 'da vinci', 'да винчи', 'давинчи'],
    answer:
      'Леонардо да Винчи (1452–1519) — итальянский гений эпохи Возрождения: живописец, скульптор, архитектор, учёный и изобретатель. В живописи разработал технику сфумато — мягкое растушёвывание контуров, создающее воздушную дымку. Главные работы: «Мона Лиза» (Лувр), «Тайная вечеря» (Милан), «Витрувианский человек» (рисунок). Его записные книжки содержат чертежи летательных аппаратов, анатомические зарисовки и гидравлические машины, опередившие эпоху на столетия.',
  },
  {
    keywords: ['микеланджело', 'michelangelo'],
    answer:
      'Микеланджело Буонарроти (1475–1564) — итальянский скульптор, живописец, архитектор и поэт эпохи Высокого Возрождения. Считал скульптуру высшим из искусств: «освобождал» фигуру из камня, убирая лишнее. Шедевры скульптуры: «Давид» (Флоренция), «Пьета» (Рим), «Моисей». В живописи — роспись потолка Сикстинской капеллы (1508–1512) и фреска «Страшный суд» (1536–1541). Как архитектор завершил строительство купола собора Святого Петра в Риме.',
  },
  {
    keywords: ['готик', 'gothic', 'готическ'],
    answer:
      'Готическая архитектура — стиль, господствовавший в Западной Европе с XII по XVI век. Возникла во Франции как развитие романского стиля. Главные черты: стрельчатые арки, нервюрные своды, аркбутаны (внешние опорные дуги), позволявшие строить невероятно высокие и светлые интерьеры с огромными витражными окнами. Символизировала устремлённость к небу и Богу. Знаковые памятники: Нотр-Дам де Пари, Кёльнский собор, Вестминстерское аббатство, Шартрский собор. Неоготика XIX века возродила этот стиль в романтическом духе.',
  },
  {
    keywords: ['барочн архитектур', 'baroque architecture', 'архитектур барокко', 'архитектур', 'барочн зодч'],
    answer:
      'Архитектура барокко (XVII — начало XVIII века) отличается пышностью, динамизмом форм, обилием скульптурного декора и театральным использованием пространства. Характерны куполa, изогнутые фасады, обманчивые перспективы (trompe-l\'œil) и грандиозные ансамбли. Мастера стиля: Джан Лоренцо Бернини (площадь Святого Петра, колоннада), Франческо Борромини (церковь Сан-Карло-алле-Куатро-Фонтане), Кристофер Рен (собор Святого Павла в Лондоне). Версальский дворцово-парковый комплекс — вершина барочного ансамблевого мышления.',
  },
  {
    keywords: ['модернизм архитектур', 'modernist architecture', 'современн архитектур', 'баухаус', 'bauhaus', 'ле корбюзье', 'le corbusier', 'функционализм'],
    answer:
      'Модернистская архитектура (с 1920-х по 1970-е годы) отвергла исторические орнаменты и провозгласила принцип «форма следует функции». Опирается на новые материалы — железобетон, сталь, стекло. Ключевые движения: Баухаус (Германия, Вальтер Гропиус), интернациональный стиль, брутализм. Главные архитекторы: Ле Корбюзье (вилла Савой, Марсельский жилой блок), Мис ван дер Роэ (стеклянные небоскрёбы), Фрэнк Ллойд Райт (органическая архитектура, «Дом над водопадом»). Постмодернизм в 1970–80-е годы возродил интерес к декору и историческим отсылкам.',
  },
  {
    keywords: ['ар нуво', 'art nouveau', 'модерн', 'jugendstil', 'югендстиль'],
    answer:
      'Ар нуво (фр. «новое искусство») — международный стиль рубежа XIX–XX веков (около 1890–1910 гг.). Вдохновлялся природными формами: извивающимися линиями, растительными орнаментами, цветами, насекомыми. Стремился стереть границу между «высоким» и прикладным искусством. В архитектуре: Антони Гауди (Саграда Фамилия, Дом Бальо в Барселоне), Виктор Орта (Брюссель), Гектор Гимар (входы в парижское метро). В декоративном искусстве прославился Луи Комфорт Тиффани (витражи и лампы). В живописи — Густав Климт («Поцелуй»).',
  },
  {
    keywords: ['ар деко', 'art deco', 'арт деко'],
    answer:
      'Ар деко — стиль 1920–1930-х годов, пришедший на смену ар нуво. Сочетает роскошь с геометричностью и машинной эстетикой: чёткие прямые линии, зигзаги, ступенчатые формы, экзотические материалы (слоновая кость, лак, хромированный металл). Вдохновлялся египетским искусством, кубизмом и технологическим оптимизмом. Иконы архитектуры: небоскрёб Крайслер-билдинг и Эмпайр-стейт-билдинг в Нью-Йорке. В декоративном искусстве — мебель, ювелирные украшения Cartier и Van Cleef & Arpels, плакаты Кассандра.',
  },
  {
    keywords: ['керамик', 'ceramics', 'гончарн', 'фарфор', 'гобелен', 'tapestry', 'ювелирн', 'jewellery', 'jewelry', 'декоративн', 'прикладн', 'ремёсл', 'ремесл'],
    answer:
      'Декоративно-прикладное искусство охватывает предметы, сочетающие эстетическую и практическую функции.\n• Керамика и фарфор: от древнегреческих ваз до китайского фарфора династии Мин и европейского мейсенского фарфора XVIII века.\n• Гобелен (шпалера): тканые настенные картины, расцвет в Средневековье и Возрождении (Фламандские мастерские, Гобеленовая мануфактура в Париже).\n• Ювелирное искусство: от скифского золота и египетских украшений до фаберже, модерна Тиффани и геометрии ар деко.\n• Стекло: витражи готических соборов, венецианское муранское стекло, арт-нуво Эмиля Галле.\n• Мебель и интерьер: барочные кабинеты, рококо, ампир, Arts & Crafts Уильяма Морриса.',
  },
];

function getDemoAnswer(question: string): string {
  const q = question.toLowerCase();
  for (const entry of DEMO_ANSWERS) {
    if (entry.keywords.some(kw => q.includes(kw))) {
      return entry.answer;
    }
  }
  return 'В демо-режиме AI-сервис недоступен. Попробуйте спросить об одной из следующих тем — на них доступны заготовленные ответы:\n• Стили и движения: импрессионизм, барокко, кубизм, сюрреализм, абстракционизм, романтизм, экспрессионизм, реализм, поп-арт\n• Архитектура: готика, барочная архитектура, модернизм (Баухаус, Ле Корбюзье)\n• Декоративное искусство: ар нуво, ар деко, керамика, гобелен, ювелирное искусство\n• Художники: Ван Гог, Моне, Пикассо, Дали, Рембрандт, Леонардо да Винчи, Микеланджело\n• Техники живописи: масло, акварель, темпера, фреска, акрил\n• Другое: эпохи в истории искусства, Возрождение, скульптура, фотография';
}

interface Gallery {
  id: string;
  name: string;
  description: string;
  location: string;
  openingHours: string;
  visitorCount: number;
  tags: string[];
  featured: boolean;
  rating: number;
  artworksCount: number;
  color: string;
  icon: string;
}

const GALLERIES: Gallery[] = [
  {
    id: '1', icon: '🎨', color: 'purple',
    name: 'Галерея современного искусства',
    description: 'Коллекция современных произведений от ведущих художников 21 века.',
    location: 'Центральный район, ул. Искусств, 15',
    openingHours: 'Ежедневно 10:00–20:00',
    visitorCount: 12500, tags: ['современное', 'экспериментальное', 'цифровое'], featured: true,
    rating: 4.8, artworksCount: 1240,
  },
  {
    id: '2', icon: '🏛', color: 'indigo',
    name: 'Классическая галерея',
    description: 'Шедевры живописи и скульптуры от мастеров прошлых эпох.',
    location: 'Исторический квартал, пр. Культуры, 42',
    openingHours: 'Пн–Пт 9:00–18:00, Сб–Вс 10:00–17:00',
    visitorCount: 8700, tags: ['классическое', 'живопись', 'скульптура'], featured: true,
    rating: 4.7, artworksCount: 850,
  },
  {
    id: '3', icon: '💻', color: 'sky',
    name: 'Галерея цифрового искусства',
    description: 'Инновационные работы, созданные с использованием цифровых технологий.',
    location: 'Технопарк, здание 5, эт. 3',
    openingHours: 'Круглосуточно',
    visitorCount: 5400, tags: ['цифровое', 'интерактивное', 'VR'], featured: false,
    rating: 4.6, artworksCount: 420,
  },
  {
    id: '4', icon: '🧵', color: 'orange',
    name: 'Галерея народного искусства',
    description: 'Традиционные ремесла и народные промыслы со всего мира.',
    location: 'Этноквартал, ул. Ремесел, 7',
    openingHours: 'Пн–Вс 11:00–19:00',
    visitorCount: 3200, tags: ['народное', 'ремесла', 'традиции'], featured: false,
    rating: 4.5, artworksCount: 680,
  },
  {
    id: '5', icon: '🌸', color: 'emerald',
    name: 'Музей импрессионизма',
    description: 'Коллекция работ импрессионистов 19-го века.',
    location: 'Парк культуры, ул. Художников, 25',
    openingHours: 'Вт–Вс 10:00–18:00',
    visitorCount: 7200, tags: ['импрессионизм', '19 век', 'Франция'], featured: true,
    rating: 4.9, artworksCount: 320,
  },
  {
    id: '6', icon: '📡', color: 'blue',
    name: 'Современные инсталляции',
    description: 'Интерактивные и мультимедийные инсталляции современных художников.',
    location: 'Арт-квартал, ул. Инноваций, 8',
    openingHours: 'Пн–Сб 12:00–21:00',
    visitorCount: 4100, tags: ['инсталляция', 'интерактив', 'цифровое'], featured: false,
    rating: 4.4, artworksCount: 150,
  },
];

const colorClasses: Record<string, { bg: string; text: string; border: string; hover: string }> = {
  purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'hover:border-purple-200', hover: 'group-hover:bg-purple-200' },
  amber:  { bg: 'bg-amber-100',  text: 'text-amber-600',  border: 'hover:border-amber-200',  hover: 'group-hover:bg-amber-200'  },
  blue:   { bg: 'bg-blue-100',   text: 'text-blue-600',   border: 'hover:border-blue-200',   hover: 'group-hover:bg-blue-200'   },
  green:  { bg: 'bg-green-100',  text: 'text-green-600',  border: 'hover:border-green-200',  hover: 'group-hover:bg-green-200'  },
  red:    { bg: 'bg-red-100',    text: 'text-red-600',    border: 'hover:border-red-300',    hover: 'group-hover:bg-red-200'    },
  orange: { bg: 'bg-orange-100', text: 'text-orange-600', border: 'hover:border-orange-300', hover: 'group-hover:bg-orange-200' },
  indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', border: 'hover:border-indigo-300', hover: 'group-hover:bg-indigo-200' },
  rose:   { bg: 'bg-rose-100',   text: 'text-rose-600',   border: 'hover:border-rose-300',   hover: 'group-hover:bg-rose-200'   },
  emerald:{ bg: 'bg-emerald-100',text: 'text-emerald-600',border: 'hover:border-emerald-300',hover: 'group-hover:bg-emerald-200'},
  teal:   { bg: 'bg-teal-100',   text: 'text-teal-600',   border: 'hover:border-teal-300',   hover: 'group-hover:bg-teal-200'   },
  sky:    { bg: 'bg-sky-100',    text: 'text-sky-600',    border: 'hover:border-sky-300',    hover: 'group-hover:bg-sky-200'    },
};

const badgeClasses: Record<string, string> = {
  green:  'bg-green-100 text-green-700',
  amber:  'bg-amber-100 text-amber-700',
  emerald:'bg-emerald-100 text-emerald-700',
  indigo: 'bg-indigo-100 text-indigo-700',
  rose:   'bg-rose-100 text-rose-700',
  teal:   'bg-teal-100 text-teal-700',
};

function now(): string {
  return new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' });
}

const WELCOME_MESSAGE: Message = {
  role: 'assistant',
  text: 'Здравствуйте! Я ваш AI-ассистент по искусству. Могу ответить на вопросы об истории искусства, техниках, художниках на основе загруженных документов.',
  time: 'Только что',
};

const CHAT_STORAGE_KEY = 'artwiki_chat_history';
const MAX_STORED_MESSAGES = 20;

function loadStoredMessages(): Message[] {
  try {
    const raw = localStorage.getItem(CHAT_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Message[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
  }
  return [WELCOME_MESSAGE];
}

const ArtWikiPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(loadStoredMessages);
  const [quickQuestions] = useState(selectRandomQuickQuestions);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiStatus, setAiStatus] = useState<'checking' | 'online' | 'demo'>('checking');
  const [museumModal, setMuseumModal] = useState<{ url: string; name: string } | null>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [gallerySearch, setGallerySearch] = useState('');

  const filteredGalleries = useMemo(() =>
    GALLERIES.filter(g =>
      g.name.toLowerCase().includes(gallerySearch.toLowerCase()) ||
      g.description.toLowerCase().includes(gallerySearch.toLowerCase()) ||
      g.tags.some(t => t.toLowerCase().includes(gallerySearch.toLowerCase()))
    ),
  [gallerySearch]);

  useEffect(() => {
    checkAiStatus();
  }, []);

  useEffect(() => {
    try {
      const toStore = messages.slice(-MAX_STORED_MESSAGES);
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(toStore));
    } catch {
    }
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function checkAiStatus() {
    try {
      const res = await fetchWithAuth('/api/ai/health');
      const data = await res.json();
      setAiStatus(data.status === 'connected' ? 'online' : 'demo');
    } catch {
      setAiStatus('demo');
    }
  }

  async function sendMessage(text?: string) {
    const question = (text ?? input).trim();
    if (!question || loading) return;
    setInput('');
    const userMsg: Message = { role: 'user', text: question, time: now() };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    if (aiStatus === 'demo') {
      await new Promise(r => setTimeout(r, 600));
      setMessages(prev => [...prev, { role: 'assistant', text: getDemoAnswer(question), time: now() }]);
      setLoading(false);
      return;
    }

    try {
      const history = messages
        .slice(-10)
        .map(m => ({ role: m.role, content: m.text }));
      const res = await fetchWithAuth('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: question, history }),
      });
      const data = await res.json();
      const reply = data.reply ?? data.message ?? data.answer ?? 'Ответ получен.';
      setMessages(prev => [...prev, { role: 'assistant', text: reply, time: now() }]);
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', text: getDemoAnswer(question), time: now() },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function clearChat() {
    try {
      localStorage.removeItem(CHAT_STORAGE_KEY);
    } catch {
    }
    setMessages([{ ...WELCOME_MESSAGE, time: now() }]);
    setShowClearConfirm(false);
  }

  function openMuseum(museum: Museum) {
    setIframeLoaded(false);
    setMuseumModal({ url: museum.url, name: museum.name });
  }

  function closeMuseum() {
    setMuseumModal(null);
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 -m-4 md:-m-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        {/* Page Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span>📖</span>
            Энциклопедия искусства
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">ArtWiki</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Ваш персональный гид в мире искусства. Задайте вопрос AI-ассистенту и получите ответ на основе обширной базы знаний.
          </p>
        </div>

        {/* Topic Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {TOPIC_CARDS.map(card => {
            const c = colorClasses[card.color] ?? colorClasses.purple;
            return (
              <button
                key={card.label}
                onClick={() => sendMessage(card.question)}
                className={`bg-white/95 backdrop-blur-sm rounded-xl p-5 border border-gray-100 ${c.border} hover:shadow-md transition-all cursor-pointer group text-left`}
              >
                <div className={`w-10 h-10 ${c.bg} rounded-lg flex items-center justify-center mb-3 ${c.hover} transition-colors`}>
                  <span className="text-xl">{card.icon}</span>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{card.label}</h3>
                <p className="text-xs text-gray-500">{card.description}</p>
              </button>
            );
          })}
        </div>

        {/* AI Chat */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <span className="text-xl">🤖</span>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">AI Ассистент</h2>
          </div>

          <div className="bg-white/95 rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <span className="text-xl">🤖</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Art Assistant</h3>
                  <p className="text-white/70 text-xs">Эксперт по истории искусства</p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  {showClearConfirm ? (
                    <div className="flex items-center gap-2 bg-white/15 rounded-full px-3 py-1">
                      <span className="text-white text-xs">Очистить чат?</span>
                      <button
                        onClick={clearChat}
                        className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-500 hover:bg-red-600 text-white transition-colors"
                      >
                        Да
                      </button>
                      <button
                        onClick={() => setShowClearConfirm(false)}
                        className="px-2 py-0.5 rounded-full text-xs font-medium bg-white/25 hover:bg-white/35 text-white transition-colors"
                      >
                        Нет
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowClearConfirm(true)}
                      disabled={loading || messages.length <= 1}
                      title="Новый разговор"
                      className="px-3 py-1 rounded-full text-xs font-medium bg-white/15 hover:bg-white/25 text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
                    >
                      <span>✕</span> Новый разговор
                    </button>
                  )}
                  <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 backdrop-blur-sm ${
                    aiStatus === 'online' ? 'bg-white/20 text-white' :
                    aiStatus === 'demo'   ? 'bg-amber-500/20 text-white' :
                    'bg-white/20 text-white'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${
                      aiStatus === 'online' ? 'bg-green-400' :
                      aiStatus === 'demo'   ? 'bg-amber-400' :
                      'bg-gray-400 animate-pulse'
                    }`} />
                    {aiStatus === 'online' ? 'Онлайн' : aiStatus === 'demo' ? 'Демо-режим' : 'Проверка...'}
                  </span>
                </div>
              </div>
            </div>

            {/* Demo mode banner */}
            {aiStatus === 'demo' && (
              <div className="flex items-center gap-2 px-4 py-2.5 bg-amber-50 border-b border-amber-200 text-amber-800 text-xs">
                <span className="text-base">⚠️</span>
                <span>
                  <strong>Демо-режим:</strong> AI-сервис сейчас недоступен. Ответы ниже — заготовленные тексты по популярным темам об искусстве.
                </span>
              </div>
            )}

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">🤖</span>
                    </div>
                  )}
                  <div className={`rounded-2xl p-3 max-w-[85%] shadow-sm ${
                    msg.role === 'assistant'
                      ? 'bg-white rounded-tl-none'
                      : 'bg-indigo-600 text-white rounded-tr-none'
                  }`}>
                    <p className={`text-sm ${msg.role === 'user' ? 'text-white' : 'text-gray-700'}`}>{msg.text}</p>
                    <p className={`text-xs mt-2 ${msg.role === 'user' ? 'text-white/60' : 'text-gray-400'}`}>{msg.time}</p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">🤖</span>
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-none p-3 shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            <div className="px-4 py-3 bg-white border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-2">Быстрые вопросы:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map(q => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-xs bg-gray-100 hover:bg-indigo-100 text-gray-700 hover:text-indigo-700 px-3 py-1.5 rounded-full transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-100">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') sendMessage(); }}
                  placeholder="Спросите об искусстве..."
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={loading || !input.trim()}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-3 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ➤
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* World Museums */}
        <div>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-3">
              <span>🌐</span>
              Мировые музеи и коллекции
            </div>
            <p className="text-gray-600 max-w-xl mx-auto text-sm">
              Открытые коллекции крупнейших музеев мира. Нажмите на карточку, чтобы открыть онлайн-коллекцию.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {MUSEUMS.map(museum => {
              const c = colorClasses[museum.color] ?? colorClasses.purple;
              const bc = badgeClasses[museum.badgeColor] ?? 'bg-green-100 text-green-700';
              return (
                <button
                  key={museum.name}
                  onClick={() => openMuseum(museum)}
                  className={`bg-white/95 rounded-xl p-5 border border-gray-100 ${c.border} hover:shadow-lg transition-all group text-left w-full`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 ${c.bg} rounded-lg flex items-center justify-center ${c.hover} transition-colors`}>
                      <span className="text-lg">{museum.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">{museum.name}</h4>
                      <p className="text-xs text-gray-400">{museum.city}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{museum.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className={`${c.text} font-medium flex items-center gap-1`}>
                      🔗 {museum.domain}
                    </span>
                    <span className={`${bc} px-2 py-0.5 rounded-full`}>{museum.badge}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Virtual Galleries ── */}
        <div className="mt-14">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-3">
              <span>🏛</span>
              Виртуальные галереи
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Исследуйте коллекции</h2>
            <p className="text-gray-600 max-w-xl mx-auto text-sm">
              Immersive 3D-пространства с произведениями искусства со всего мира.
              Нажмите на карточку, чтобы посетить галерею.
            </p>
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto mb-8 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={gallerySearch}
              onChange={e => setGallerySearch(e.target.value)}
              placeholder="Поиск галерей по названию или тегу..."
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
            />
          </div>

          {/* Gallery cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredGalleries.map(gallery => {
              const c = colorClasses[gallery.color] ?? colorClasses.purple;
              return (
                <div
                  key={gallery.id}
                  className={`bg-white/95 rounded-xl p-5 border border-gray-100 ${c.border} hover:shadow-lg transition-all group text-left relative`}
                >
                  {gallery.featured && (
                    <span className="absolute top-3 right-3 bg-amber-100 text-amber-700 text-xs font-medium px-2 py-0.5 rounded-full">
                      Рекомендуем
                    </span>
                  )}

                  {/* Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-11 h-11 ${c.bg} rounded-xl flex items-center justify-center ${c.hover} transition-colors flex-shrink-0`}>
                      <span className="text-xl">{gallery.icon}</span>
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm leading-tight">{gallery.name}</h4>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs text-gray-500">{gallery.rating.toFixed(1)}</span>
                        <span className="text-gray-300 text-xs">·</span>
                        <span className="text-xs text-gray-400">{gallery.artworksCount} экспонатов</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-3 leading-relaxed">{gallery.description}</p>

                  {/* Meta */}
                  <div className="space-y-1.5 mb-3">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <MapPin className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                      <span className="truncate">{gallery.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Clock className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                      <span>{gallery.openingHours}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Users className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                      <span>{gallery.visitorCount.toLocaleString()} посетителей</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {gallery.tags.map(tag => (
                      <span key={tag} className={`text-xs px-2 py-0.5 rounded-full ${c.bg} ${c.text} font-medium`}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Button */}
                  <button className={`w-full flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium transition-all ${c.bg} ${c.text} hover:opacity-80`}>
                    <Eye className="h-4 w-4" />
                    Посетить галерею
                  </button>
                </div>
              );
            })}
          </div>

          {filteredGalleries.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GalleryVerticalEnd className="h-8 w-8 text-indigo-500" />
              </div>
              <p className="text-gray-500 text-sm">Галереи не найдены. Попробуйте другой запрос.</p>
              <button
                onClick={() => setGallerySearch('')}
                className="mt-3 text-xs text-indigo-600 hover:text-indigo-700 underline"
              >
                Сбросить поиск
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Museum Modal */}
      {museumModal && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeMuseum} />
          <div className="absolute inset-4 md:inset-8 lg:inset-12 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-gray-50 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <span>🌐</span>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm md:text-base truncate">{museumModal.name}</h3>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <a
                  href={museumModal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1 px-3 py-1.5 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                >
                  🔗 <span className="hidden sm:inline">Открыть на сайте</span>
                </a>
                <button
                  onClick={closeMuseum}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200 transition-colors text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="flex-1 relative">
              {!iframeLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-3" />
                    <p className="text-sm text-gray-500">Загрузка сайта музея...</p>
                  </div>
                </div>
              )}
              <iframe
                src={museumModal.url}
                className="w-full h-full border-0"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-popups-to-escape-sandbox"
                allowFullScreen
                onLoad={() => setIframeLoaded(true)}
                title={museumModal.name}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtWikiPage;
