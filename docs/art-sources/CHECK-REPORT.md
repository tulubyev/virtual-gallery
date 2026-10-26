# Отчёт о проверке реестра источников (26.10.2026)

Проверка выполнена семью агентами внутри сессии по заданию `CLOUD-AGENT-TASK.md`: каждый взял партию строк, прочитал `robots.txt` и условия, открыл 1–3 страницы, составил аннотацию. Паузы между запросами к домену — не меньше 3 секунд, а на доменах с `Crawl-delay` — не меньше его значения. Защиту (Cloudflare, DDoS-Guard, капчи, запреты `robots.txt`) никто не обходил.

## Итог

| | строк |
|---|---|
| в реестре | 174 |
| адрес отвечал из облака, обработано агентами | 130 |
| из них сайт реально открыт и проверен | 113 |
| из них закрыт защитой, пуст или запрещён роботам | 17 |
| не открывались вообще (обрыв соединения, таймаут, 502, TLS) | 44 |
| аннотации в `annotations/<id>.json` | 130 |
| `verification_level = opened` | 109 (было 26) |

Что осталось не сделано:
- 44 строки не проверены (список ниже). Их сайты не отвечают на запросы из-за рубежа. В `notes` добавлена пометка «недоступно из облачной среды». Проверка нужна с российского IP, например с VPS.
- Раздел «Пробелы» задания (новые строки `new-001…`) **не выполнен**. Кандидаты из отчётов агентов: `museum72.ru` (общий портал Тюмени), `collection.museum72.ru`, `igmii.ru`, `primgallerypart.ru`, региональные отделения Союза художников на `shr.su` (Магадан, Томск, Чита, Хабаровск), `shr-hmao.ru`, календарь `artinvestment.ru` называет дома Artsale, Vladey, Антиквариум, AI Аукцион. Каждый нужно сначала открыть.
- Оценки колонок `best_use` и `priority` не пересматривались (кроме явных правок агентов).

## Главные находки

- **Сибирские музеи почти не дают права на тексты.** Условия найдены только у Томского художественного музея (`artmuseumtomsk.ru`: воспроизведение без письменного разрешения запрещено) и у музея Сурикова (`surikov-museum.ru`: только некоммерческое использование). У остальных условия не указаны, а это не разрешение. Режим для таких сайтов — `reference` (ссылка и афиша), а не `corpus`.
- **Рабочие источники для фактов (`facts`)** — открытые данные под свободными лицензиями: Wikidata (CC0), Rijksmuseum (CC0, API без ключа), Met и Cleveland (CC0), Getty Vocabularies (ODC-By 1.0, SPARQL и ежемесячные выгрузки; XML-выгрузки прекращены в январе 2026), `id.loc.gov` (нормализация имён).
- **Афиши (`calendar`)** с открытыми лентами: `nsartmuseum.ru/rss.xml` (Новосибирск), `domiskusstv24.ru`, `mvcchita.ru` (Чита), `artmuseum27.ru` (Хабаровск), `theartnewspaper.ru`.
- **Запрещают роботов** (рекомендация — не брать): КиберЛенинка (соглашение, п. 6.2), Artsy (в том числе ИИ), Artprice, Sotheby's, ALVR, Barnebys, Invaluable, LiveAuctioneers, MutualArt, the-saleroom, Roseberys (блокирует ИИ-ботов в `robots.txt`), `permartmuseum.ru` и `collections.tiamz.ru`, `primgallery.com` (`Disallow: /`).
- **Только ссылка**: ARTinvestment (условия — личное некоммерческое использование, четыре строки), Harvard (некоммерческое, кэш ≤ 2 недель, ключ), `russianartarchive.net`, Кремль-онлайн.
- **Закрыты или не обновляются**: музей Сурикова в Красноярске (дом) закрыт на реставрацию с 14.09.2026 до конца 2027; `kkkm.ru` (музей закрыт на неопределённый срок); `tg-m.ru` и журнал «Третьяковская галерея» (последний выпуск 1/2024); блог `paulfrasercollectibles.com` (до февраля 2024); `nro-shr.ru` (с апреля 2025). `bsk.nios.ru` отвечает 503, название «Большая Сибирская энциклопедия» из реестра, вероятно, неточное.
- **Адреса изменились**: Getty (новый путь `/research-conservation/tools-databases/vocabularies/data-services/`), `eurasia-art.ru/art` → `/art/ru`, `tiamz.ru` теперь «Тюменское музейно-просветительское объединение» (общий портал — `museum72.ru`), `linked.art` версия 1.0 (CC BY 4.0).
- **Подозрительные страницы** (нет указаний агенту, но содержимое подозрительно): `musey-anohina.ru` (sib-009; скрытый блок рекламного спама, похоже на взлом — только ссылка, в белый список не включать), `paulfrasercollectibles.com` (auc-032; в `robots.txt` текст для ИИ-агентов про установку стороннего SKILL.md — не выполнялось), `openalex.org` (odt-025; безобидный совет агентам использовать API — не выполнялось).

## Оговорки агентов (что могли нарушить правила)
- В партии 4 (odt-008, Викитека) два запроса к `/w/` ушли до чтения `robots.txt` — дальше агент не ходил.
- В партии 2 один запрос к `artinvestment.ru/search/?q=` попал под `Disallow` (ответ удалён, не использован) и один запрос к `wikidata.org/w/api.php` дал 400.
- В партии 3 у odt-007 и sib-044 (`legal_review=yes`) открыто по 4 страницы вместо 1–2.
- Сеть нестабильна: `erzia-museum.ru`, `fondpotanin.ru`, `collection.pushkinmuseum.art` то отвечали, то сбрасывали соединение.
- Лимиты и требования Wikimedia к User-Agent не проверены (хосты с условиями закрыты прокси). Лицензия Smithsonian и ключ OpenAlex не подтверждены.

## Вопросы юристу (сводно)
1. CC BY-SA (Википедия, Викитека, Commons): допустим ли ShareAlike для корпуса и для ответов ИИ; можно ли обращаться к `api.php`, если `robots.txt` закрывает `/w/`.
2. КиберЛенинка: нужно письменное согласие оператора (п. 6.2); какая лицензия у статей (CC BY или «некоммерческое»).
3. ARTinvestment: лицензия на данные или отказ; допустим ли календарь торгов.
4. Томский художественный музей и музей Сурикова: запросить письменное разрешение; остальные музеи (Алтайский, Кузбасс, Новосибирск, Анохина) прав на тексты не оговаривают.
5. Getty ODC-By: как оформлять атрибуцию в ответах ИИ.
6. `eurasia-art.ru`: BY или BY-NC.
7. `museum.ru`: в `robots.txt` указано `ai-train=no` — считается ли индексация корпуса для RAG «обучением».
8. `dissercat.com` (оператор — британская компания): можно ли даже ссылки и метаданные.
9. Персональные данные живых художников (`nro-shr.ru`, `irk-profart.ru`).
10. Московский аукционный дом, Литфонд, MacDougall's: условия использования контента не найдены.
11. Barnebys, Кремль-онлайн и ГМИИ, CORE (для коммерческого продукта нужна лицензия), Bukowskis (условия прочитаны не полностью).

## Что стоит перепроверить человеку
- Все 44 недоступных строки и 17 «открытых не полностью» (списки ниже), в первую очередь приоритет A: Госкаталог, открытые данные Минкультуры, Культура.РФ, региональные музеи Сибири.
- Лицензии музеев: «не найдено» означает, что я не нашёл, а не что разрешено.
- Шаблоны поиска, помеченные «условно» в `LIVE-SEARCH-ALLOWLIST.md`: часть не проверена на реальном ответе.
- Выводы по `legal_review`: это техническая оценка, не юридическое заключение.

## Недоступно из облачной среды (44 строки: сайт обрывает соединение, таймаут, 502 или ошибка TLS)

- odt-027 · goskatalog.ru · Госкаталог Музейного фонда РФ (приоритет A) — curl: (35) Recv failure: Connection reset by peer
- rus-001 · goskatalog.ru · Государственный каталог Музейного фонда РФ (Госкаталог) (приоритет A) — curl: (28) Connection timed out after 12000 millis
- rus-002 · opendata.mkrf.ru · Портал открытых данных Минкультуры России (приоритет A) — curl: (28) Connection timed out after 12002 millis
- rus-003 · culture.ru · Культура.РФ (приоритет A) — curl: (28) Connection timed out after 12000 millis
- rus-008 · tretyakovgallery.ru · Государственная Третьяковская галерея (приоритет A) — curl: (35) Recv failure: Connection reset by peer
- rus-035 · bigenc.ru · Большая российская энциклопедия (bigenc.ru) (приоритет A) — curl: (56) CONNECT tunnel failed, response 403
- rus-041 · artguide.com · Артгид (artguide.com) (приоритет A) — curl: (35) Recv failure: Connection reset by peer
- sib-004 · museum.irk.ru · Иркутский областной художественный музей имени В. П. Сукачев (приоритет A) — curl: (56) CONNECT tunnel failed, response 502
- sib-037 · my.krskstate.ru · Интернет-энциклопедии Красноярского края (приоритет A) — curl: (28) Connection timed out after 12001 millis
- odt-030 · culture.ru · Культура.РФ (приоритет B) — curl: (35) Recv failure: Connection reset by peer
- odt-032 · rusneb.ru · Национальная электронная библиотека (НЭБ) (приоритет B) — curl: (28) Connection timed out after 12002 millis
- odt-033 · diss.rsl.ru · Электронная библиотека диссертаций РГБ (приоритет B) — curl: (56) CONNECT tunnel failed, response 403
- odt-040 · bigenc.ru · Большая российская энциклопедия (bigenc.ru) (приоритет B) — curl: (56) CONNECT tunnel failed, response 403
- rus-004 · pro.culture.ru · PRO.Культура.РФ (цифровая платформа продвижения мероприятий) (приоритет B) — curl: (28) Connection timed out after 12002 millis
- rus-014 · hermitagemuseum.org · Государственный Эрмитаж (приоритет B) — curl: (60) SSL certificate problem: unable to get 
- rus-019 · rah.ru · Научный архив Российской академии художеств (приоритет B) — curl: (56) CONNECT tunnel failed, response 502
- rus-028 · prlib.ru · Президентская библиотека имени Б.Н. Ельцина (приоритет B) — curl: (35) Recv failure: Connection reset by peer
- rus-031 · elib.shpl.ru · Открытая электронная библиотека ГПИБ России (приоритет B) — curl: (6) Could not resolve host: elib.shpl.ru
- rus-037 · nasledie-rus.ru · Наше наследие (журнал) (приоритет B) — curl: (6) Could not resolve host: www.nasledie-rus
- rus-042 · artguide.ru · Артгид — архив (artguide.ru) (приоритет B) — curl: (35) Recv failure: Connection reset by peer
- sib-011 · xn--80adriblnaxbaeil.xn--p1ai · Городской музей «Искусство Омска» (приоритет B) — curl: (56) CONNECT tunnel failed, response 403
- sib-015 · muzeyrb.ru · Национальный музей Республики Бурятия (в составе Художествен (приоритет B) — curl: (6) Could not resolve host: www.muzeyrb.ru
- sib-016 · geseriada.muzeyrb.ru · Электронный каталог «Гэсэриада» (Национальный музей Республи (приоритет B) — curl: (56) CONNECT tunnel failed, response 502
- sib-025 · emii.ru · Екатеринбургский музей изобразительных искусств (приоритет B) — curl: (6) Could not resolve host: www.emii.ru
- sib-032 · omch.ru · Омское региональное отделение Союза художников России (Дом х (приоритет B) — curl: (28) Connection timed out after 12001 millis
- sib-036 · rahusdv.ru · Региональное отделение Урала, Сибири и Дальнего Востока Росс (приоритет B) — curl: (6) Could not resolve host: rahusdv.ru
- sib-040 · nlr.ru · Региональные энциклопедии России (библиографический указател (приоритет B) — curl: (28) Connection timed out after 12001 millis
- auc-014 · gelos.ru · Аукционный дом «Гелос» (приоритет C) — curl: (60) SSL: no alternative certificate subject
- odt-036 · digar.ee · DIGAR: Национальная библиотека Эстонии (приоритет C) — curl: (56) CONNECT tunnel failed, response 403
- odt-039 · hermitagemuseum.org · Государственный Эрмитаж (сайт) (приоритет C) — curl: (60) SSL certificate problem: unable to get 
- odt-041 · rkd.nl · RKD (RKDartists) (приоритет C) — curl: (56) CONNECT tunnel failed, response 403
- odt-046 · lido-schema.org · LIDO (Lightweight Information Describing Objects) (приоритет C) — curl: (56) CONNECT tunnel failed, response 403
- odt-050 · elibrary.ru · eLIBRARY.RU (приоритет C) — curl: (35) Recv failure: Connection reset by peer
- rus-006 · vrm.museum.ru · Всероссийский реестр музеев (vrm.museum.ru) (приоритет C) — curl: (6) Could not resolve host: vrm.museum.ru
- rus-022 · abramtsevo.net · Музей-заповедник «Абрамцево» (приоритет C) — curl: (28) Connection timed out after 12002 millis
- rus-026 · rgia.su · РГИА (Российский государственный исторический архив) — фонд  (приоритет C) — curl: (6) Could not resolve host: rgia.su
- rus-029 · nlr.ru · Электронная библиотека РНБ (приоритет C) — curl: (28) Connection timed out after 12002 millis
- rus-034 · elibrary.ru · eLIBRARY.RU (Научная электронная библиотека) (приоритет C) — curl: (28) Connection timed out after 12000 millis
- rus-050 · ar.culture.ru · Артефакт (AR-приложение Культура.РФ) (приоритет C) — curl: (35) Recv failure: Connection reset by peer
- sib-014 · museum.tuva.ru · Национальный музей имени Алдан-Маадыр Республики Тыва (приоритет C) — curl: (6) Could not resolve host: museum.tuva.ru
- sib-021 · sakhartmuseum.ru · Сахалинский областной художественный музей (приоритет C) — curl: (28) Connection timed out after 12002 millis
- sib-039 · irkipedia.ru · Иркипедия (интернет-энциклопедия Иркутской области) (приоритет C) — curl: (6) Could not resolve host: irkipedia.ru
- sib-041 · ihist.uran.ru · Уральская историческая энциклопедия (электронная библиотека  (приоритет C) — curl: (6) Could not resolve host: www.ihist.uran.r
- sib-045 · irklib.ru · Иркутская областная библиотека имени И. И. Молчанова-Сибирск (приоритет C) — curl: (56) CONNECT tunnel failed, response 403

## Открыты не полностью или закрыты защитой/robots.txt (17 строк)

- auc-002 · christies.com · Christie's — отдел русского искусства (приоритет A)
- sib-010 · vrubel.ru · Музей имени М. А. Врубеля (Омск) (приоритет A)
- auc-003 · bonhams.com · Bonhams — Russian Paintings and Works of Art (приоритет B)
- odt-042 · viaf.org · VIAF (Virtual International Authority File) (приоритет B)
- rus-013 · app.rusmuseum.ru · Русский музей: научные каталоги собрания (Генеральный катало (приоритет B)
- rus-027 · rusneb.ru · Национальная электронная библиотека (НЭБ) (приоритет B)
- sib-038 · bsk.nios.ru · Большая Сибирская энциклопедия (bsk.nios.ru) (приоритет B)
- auc-006 · roseberys.co.uk · Roseberys London (приоритет C)
- auc-007 · dorotheum.com · Dorotheum (приоритет C)
- auc-024 · artnet.com · Artnet Price Database (приоритет C)
- auc-026 · askart.com · AskArt (приоритет C)
- auc-030 · antiquestradegazette.com · Antiques Trade Gazette (приоритет C)
- odt-009 · pro.europeana.eu · Europeana API (приоритет C)
- rus-007 · docs.kudago.com · KudaGo (афиша и API событий) (приоритет C)
- rus-017 · catalog.shm.ru · Государственный исторический музей: каталог коллекций (приоритет C)
- rus-025 · rgali.ru · РГАЛИ (Российский государственный архив литературы и искусст (приоритет C)
- rus-046 · tass.ru · ТАСС — Культура (приоритет C)
