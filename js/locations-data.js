// Достопримечательности Эфиопии — по документу «Эфиопия_достопримечательности.docx»
// Координаты проверены по ЮНЕСКО, GeoHack, Wikipedia и др. Формат: [долгота E, широта N]
const locations = [
  {
    id: 1,
    name: "Лалибела — скальные церкви",
    coordinates: [39.0434, 12.0332], // UNESCO / общепринятые координаты церквей
    region: "Амхара",
    category: "historic",
    isUnesco: true,
    photoUrl: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800",
    description: "Лалибела — город в горах на севере Эфиопии, знаменитый 11 монолитными христианскими церквями XII–XIII веков, высеченными в скале. Объект Всемирного наследия ЮНЕСКО (1978). Церковь Святого Георгия (Бет Гиоргис) в форме креста — самый узнаваемый символ. Культурно-историческая достопримечательность.",
    photos: ["https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800", "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800"]
  },
  {
    id: 2,
    name: "Аксум (Акшум) — стелы и руины",
    coordinates: [38.72337, 14.12109], // UNESCO / latlong.info
    region: "Тыграй",
    category: "historic",
    isUnesco: true,
    photoUrl: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800",
    description: "Древний город Аксум — столица Аксумского царства (I–X вв.). Объект ЮНЕСКО (1980). Знаменит гигантскими стелами (обелисками), царскими гробницами, руинами дворцов. По преданию в церкви Святой Марии Сионской хранится Ковчег Завета. Культурно-историческая достопримечательность.",
    photos: ["https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800", "https://images.unsplash.com/photo-1484318571209-661cf29a69c3?w=800"]
  },
  {
    id: 3,
    name: "Гондэр — Фасил-Гебби (замковый комплекс)",
    coordinates: [37.47, 12.6075], // Wikipedia: 12°36′27″N 37°28′12″E
    region: "Амхара",
    category: "historic",
    isUnesco: true,
    photoUrl: "https://images.unsplash.com/photo-1523482580671-f216ba185691?w=800",
    description: "Гондэр — «африканский Камелот». Крепостной город Фасил-Гебби (XVII–XVIII вв.) включён в список ЮНЕСКО (1979). Замки императоров, дворцы, церкви в стиле барокко с индийским и арабским влиянием. Культурно-историческая достопримечательность.",
    photos: ["https://images.unsplash.com/photo-1523482580671-f216ba185691?w=800", "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800"]
  },
  {
    id: 4,
    name: "Харар-Джугол — старый город",
    coordinates: [42.137778, 9.308889], // UNESCO / GeoHack
    region: "Харари",
    category: "historic",
    isUnesco: true,
    photoUrl: "https://images.unsplash.com/photo-1523482580671-f216ba185691?w=800",
    description: "Харар — священный город ислама, объект ЮНЕСКО (2006). Старая крепость Харар-Джугол с узкими улочками, более 80 мечетей и святынь. Уникальная традиция кормления гиен по вечерам. Дом Артура Рембо. Культурно-историческая достопримечательность.",
    photos: ["https://images.unsplash.com/photo-1523482580671-f216ba185691?w=800", "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800"]
  },
  {
    id: 5,
    name: "Национальный парк Симиен (горы Сымен)",
    coordinates: [38.264118, 13.306512], // GeoHack — центр парка
    region: "Амхара",
    category: "nature",
    isUnesco: true,
    photoUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
    description: "Горы Симиен — объект ЮНЕСКО (1978). Один из самых живописных горных массивов Африки с вершинами выше 4000 м. Эндемичные виды: гелада (бабуин), эфиопский волк, горная коза валья. Треккинг, панорамы ущелий и плато. Природная достопримечательность.",
    photos: ["https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"]
  },
  {
    id: 6,
    name: "Озеро Тана и островные монастыри",
    coordinates: [37.25, 12.0], // Britannica / latitude.to — центр озера
    region: "Амхара",
    category: "nature",
    isUnesco: false,
    photoUrl: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800",
    description: "Озеро Тана — крупнейшее озеро Эфиопии, исток Голубого Нила. На островах — древние монастыри с фресками (XIII–XVIII вв.). Природно-культурная достопримечательность.",
    photos: ["https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800", "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800"]
  },
  {
    id: 7,
    name: "Водопад Голубого Нила (Тис-Ысат / Tis Abay)",
    coordinates: [37.5878, 11.4905], // GeoHack / Wikipedia
    region: "Амхара",
    category: "nature",
    isUnesco: false,
    photoUrl: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800",
    description: "Водопад Тис-Ысат (Тис-Аббай) — «дымящая вода» на Голубом Ниле. Ширина около 400 м в сезон дождей, высота до 45 м. Один из самых зрелищных водопадов Африки. Природная достопримечательность.",
    photos: ["https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800", "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800"]
  },
  {
    id: 8,
    name: "Данакильская впадина (Эрта-Але, Даллол)",
    coordinates: [40.66139, 13.60639], // Erta Ale (Wikipedia); Dallol ~14.24, 40.3
    region: "Афар",
    category: "nature",
    isUnesco: false,
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
    description: "Впадина Данакиль — одно из самых жарких мест на Земле. Вулкан Эрта-Але с лавовым озером, Даллол с кислотными озёрами и солью всех цветов. Природная и геологическая достопримечательность.",
    photos: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800", "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800"]
  },
  {
    id: 9,
    name: "Национальный парк Бале (горы Бале)",
    coordinates: [39.734817, 6.885713], // GeoHack — в документе долгота была ошибочно 39.93
    region: "Оромия",
    category: "nature",
    isUnesco: false,
    photoUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    description: "Горы Бале — высокогорные плато и леса. Эндемики: эфиопский волк, горная ньяла, множество птиц. Санетти-Плато называют «африканской Арктикой». Природная достопримечательность.",
    photos: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800", "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800"]
  },
  {
    id: 10,
    name: "Долина Омо (Омо-Вэлли) — племенные территории",
    coordinates: [36.567, 5.783], // Джинка — главная база для посещения долины Омо
    region: "Южные нации",
    category: "culture",
    isUnesco: false,
    photoUrl: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=800",
    description: "Долина нижнего течения реки Омо — один из важнейших палеоантропологических регионов мира. Традиционные племена: Мурси, Хамар, Каро, Дассанеч и др. Культурно-этнографическая достопримечательность.",
    photos: ["https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=800", "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800"]
  },
  {
    id: 11,
    name: "Национальный парк Аваш",
    coordinates: [39.993255, 9.078332], // GeoHack
    region: "Афар / Оромия",
    category: "nature",
    isUnesco: false,
    photoUrl: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800",
    description: "Национальный парк Аваш — долина нижнего течения реки Аваш, один из важнейших палеонтологических районов Африки. Останки гоминид. Природная достопримечательность.",
    photos: ["https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800"]
  },
  {
    id: 12,
    name: "Озёра Рифтовой долины (Зивай, Лангано, Хавасса, Аваса)",
    coordinates: [38.4879, 7.0401], // Озеро Хавасса (Wikipedia) — центр региона
    region: "Оромия / Южные нации",
    category: "nature",
    isUnesco: false,
    photoUrl: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800",
    description: "Цепочка озёр Великой Рифтовой долины: Зивай, Лангано, Хавасса, Аваса. Птицы, гиппопотамы, уникальная природа. Природная достопримечательность.",
    photos: ["https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800", "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800"]
  },
  {
    id: 13,
    name: "Национальный музей Эфиопии (скелет «Люси»)",
    coordinates: [38.761944, 9.038333], // latlong.net / GeoHack
    region: "Аддис-Абеба",
    category: "museum",
    isUnesco: false,
    photoUrl: "https://images.unsplash.com/photo-1484318571209-661cf29a69c3?w=800",
    description: "Национальный музей Эфиопии в Аддис-Абебе. Главный экспонат — скелет австралопитека «Люси» (3,2 млн лет). Археологические и этнографические коллекции. Музейная и культурная достопримечательность.",
    photos: ["https://images.unsplash.com/photo-1484318571209-661cf29a69c3?w=800", "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800"]
  },
  {
    id: 14,
    name: "Рынок Меркато (Addis Mercato)",
    coordinates: [38.738889, 9.030556], // GeoHack / Wikipedia
    region: "Аддис-Абеба",
    category: "urban",
    isUnesco: false,
    photoUrl: "https://images.unsplash.com/photo-1484318571209-661cf29a69c3?w=800",
    description: "Меркато — один из крупнейших открытых рынков Африки. Традиционные ремёсла, ткани, специи, бытовая утварь. Городская и культурная достопримечательность Аддис-Абебы.",
    photos: ["https://images.unsplash.com/photo-1484318571209-661cf29a69c3?w=800"]
  },
  {
    id: 15,
    name: "Собор Святой Троицы (Аддис-Абеба)",
    coordinates: [38.766562, 9.030799], // GeoHack / latitude.to
    region: "Аддис-Абеба",
    category: "religious",
    isUnesco: false,
    photoUrl: "https://images.unsplash.com/photo-1484318571209-661cf29a69c3?w=800",
    description: "Кафедральный собор Святой Троицы — главный собор Эфиопской православной церкви в столице. Религиозная и культурная достопримечательность.",
    photos: ["https://images.unsplash.com/photo-1484318571209-661cf29a69c3?w=800"]
  },
  {
    id: 16,
    name: "Гора Энтото и дворец Менелика",
    coordinates: [38.7633, 9.0248], // GeoHack — дворец Менелика (Menelik Palace)
    region: "Аддис-Абеба",
    category: "historic",
    isUnesco: false,
    photoUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
    description: "Гора Энтото — историческое место, где император Менелик II основал столицу. Дворец Менелика, церкви, панорама Аддис-Абебы. Историческая и природная достопримечательность.",
    photos: ["https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800", "https://images.unsplash.com/photo-1484318571209-661cf29a69c3?w=800"]
  },
  {
    id: 17,
    name: "Мемориал Красного Террора (Red Terror Martyrs Museum)",
    coordinates: [38.76323, 9.010204], // OSM / Wikipedia — у Мескель-сквер
    region: "Аддис-Абеба",
    category: "museum",
    isUnesco: false,
    photoUrl: "https://images.unsplash.com/photo-1484318571209-661cf29a69c3?w=800",
    description: "Мемориал жертвам «красного террора» — музей памяти жертв репрессий 1977–1978 годов. Музейная и мемориальная достопримечательность.",
    photos: ["https://images.unsplash.com/photo-1484318571209-661cf29a69c3?w=800"]
  },
  {
    id: 18,
    name: "Тиграйские скальные церкви (Абуна-Йемата-Гух)",
    coordinates: [39.343071, 13.91526], // Wikipedia — церковь Абуна-Йемата-Гух
    region: "Тыграй",
    category: "historic",
    isUnesco: false,
    photoUrl: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800",
    description: "Скальные церкви Тиграя, высеченные в песчаниковых горах. Абуна-Йемата-Гух — одна из самых труднодоступных церквей в мире. Культурно-религиозная достопримечательность.",
    photos: ["https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800", "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800"]
  },
  {
    id: 19,
    name: "Парк Абиджатта-Шалла (озёра)",
    coordinates: [38.518681, 7.529554], // GeoHack
    region: "Оромия",
    category: "nature",
    isUnesco: false,
    photoUrl: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800",
    description: "Национальный парк Абиджатта-Шалла — два озера в Рифтовой долине. Фламинго и другие водоплавающие птицы. Природная достопримечательность.",
    photos: ["https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800", "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800"]
  },
  {
    id: 20,
    name: "Дыре-Дауа (колониальный город)",
    coordinates: [41.8661, 9.5931], // Wikipedia / fallingrain.com
    region: "Дыре-Дауа",
    category: "urban",
    isUnesco: false,
    photoUrl: "https://images.unsplash.com/photo-1523482580671-f216ba185691?w=800",
    description: "Дыре-Дауа — второй по величине город Эфиопии с колониальной архитектурой и оживлённым рынком. Городская и историческая достопримечательность.",
    photos: ["https://images.unsplash.com/photo-1523482580671-f216ba185691?w=800", "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800"]
  }
];
