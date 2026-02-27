// Сводные данные всей поездки — 4 страны Восточной Африки
// Март 2026

const tripOverview = {
    title: "Восточная Африка — большое путешествие",
    subtitle: "Эфиопия → Уганда → Руанда → Бурунди",
    totalDays: "19–22 дня",
    period: "Март 2026",
    totalDistance: "~4500 км",
    transport: "Арендованный автомобиль + внутренние перелёты"
};

const countries = [
    {
        id: "ethiopia",
        name: "Эфиопия",
        flag: "🇪🇹",
        days: 7,
        route: "Аддис-Абеба → Бахр-Дар → Гондэр → Симиен → Лалибела → Аддис-Абеба",
        keyLocations: ["Лалибела", "Гондэр", "Горы Симиен", "Озеро Тана"],
        highlights: "Скальные церкви, замки, горные треки",
        fuelBudget: "$150–200",
        color: "#078930",
        link: "journey.html",
        coordinates: [38.7, 9.0]
    },
    {
        id: "uganda",
        name: "Уганда",
        flag: "🇺🇬",
        days: 6,
        route: "Кампала → Джинджа → Мёрчисон → Кибале → Королева Елизавета → Бвинди → Кисоро",
        keyLocations: ["Бвинди (гориллы)", "Мёрчисон-Фолс", "Джинджа", "Кибале"],
        highlights: "Горные гориллы, водопады, шимпанзе",
        fuelBudget: "$250–300",
        color: "#FCDC04",
        link: "uganda.html",
        coordinates: [32.5, 1.0]
    },
    {
        id: "rwanda",
        name: "Руанда",
        flag: "🇷🇼",
        days: 5,
        route: "Мусанзе → Кигали → Ньюнгве → Озеро Киву → Хуе",
        keyLocations: ["Кигали", "Парк Вулканов", "Озеро Киву", "Ньюнгве"],
        highlights: "Мемориал геноцида, вулканы, озеро",
        fuelBudget: "$100–120",
        color: "#00A1DE",
        link: "rwanda.html",
        coordinates: [29.8, -2.0]
    },
    {
        id: "burundi",
        name: "Бурунди",
        flag: "🇧🇮",
        days: 4,
        route: "Бужумбура → Исток Нила → Озеро Танганьика → Аэропорт",
        keyLocations: ["Бужумбура", "Озеро Танганьика", "Исток Нила"],
        highlights: "Озеро Танганьика, исток Нила, аутентичность",
        fuelBudget: "$80–100",
        color: "#CE1126",
        link: "burundi.html",
        coordinates: [29.3, -3.3]
    }
];

const fullRoute = [
    { country: "ethiopia", location: "Аддис-Абеба", coordinates: [38.7633, 9.0248], day: 0 },
    { country: "ethiopia", location: "Бахр-Дар", coordinates: [37.3833, 11.5833], day: 1 },
    { country: "ethiopia", location: "Гондэр", coordinates: [37.47, 12.6075], day: 2 },
    { country: "ethiopia", location: "Горы Симиен", coordinates: [38.264118, 13.306512], day: 3 },
    { country: "ethiopia", location: "Лалибела", coordinates: [39.0434, 12.0332], day: 5 },
    { country: "ethiopia", location: "Аддис-Абеба", coordinates: [38.7633, 9.0248], day: 7 },
    // Перелёт Аддис-Абеба → Энтеббе
    { country: "uganda", location: "Кампала", coordinates: [32.5825, 0.3476], day: 8 },
    { country: "uganda", location: "Джинджа", coordinates: [33.2041, 0.4244], day: 9 },
    { country: "uganda", location: "Мёрчисон-Фолс", coordinates: [31.6833, 2.2833], day: 10 },
    { country: "uganda", location: "Форт-Портал", coordinates: [30.2750, 0.6710], day: 11 },
    { country: "uganda", location: "Королева Елизавета", coordinates: [29.8983, -0.1989], day: 12 },
    { country: "uganda", location: "Бвинди", coordinates: [29.6478, -1.0489], day: 13 },
    { country: "uganda", location: "Кисоро", coordinates: [29.6850, -1.2850], day: 14 },
    // Граница Уганда → Руанда
    { country: "rwanda", location: "Мусанзе", coordinates: [29.6350, -1.4997], day: 14 },
    { country: "rwanda", location: "Кигали", coordinates: [30.0619, -1.9403], day: 15 },
    { country: "rwanda", location: "Ньюнгве", coordinates: [29.2500, -2.4830], day: 16 },
    { country: "rwanda", location: "Озеро Киву", coordinates: [29.2167, -2.0667], day: 17 },
    { country: "rwanda", location: "Хуе", coordinates: [29.7000, -2.6000], day: 18 },
    // Граница Руанда → Бурунди
    { country: "burundi", location: "Бужумбура", coordinates: [29.3639, -3.3822], day: 18 },
    { country: "burundi", location: "Озеро Танганьика", coordinates: [29.5000, -3.5000], day: 19 },
    { country: "burundi", location: "Исток Нила", coordinates: [29.7833, -3.8500], day: 20 },
    { country: "burundi", location: "Аэропорт Бужумбура", coordinates: [29.3181, -3.3240], day: 21 }
];

const totalBudget = {
    ethiopia: {
        transport: "$455–1232",
        accommodation: "$505–710",
        food: "$465",
        activities: "$698",
        other: "$145",
        total: "$2268–3250"
    },
    uganda: {
        transport: "$750–1000",
        accommodation: "$400–600",
        food: "$150–200",
        activities: "$950–1000",
        other: "$100",
        total: "$2350–2900"
    },
    rwanda: {
        transport: "$400–520",
        accommodation: "$250–400",
        food: "$100–150",
        activities: "$150–250",
        other: "$50",
        total: "$950–1370"
    },
    burundi: {
        transport: "$280–400",
        accommodation: "$150–250",
        food: "$60–100",
        activities: "$50–80",
        other: "$130",
        total: "$670–960"
    },
    grandTotal: {
        min: "$6238",
        max: "$8480",
        perPerson: "$3100–4250",
        notes: "На 2 человека, включая горилл в Уганде ($700)"
    }
};

const timeline = [
    { day: "0–7", country: "🇪🇹 Эфиопия", description: "Исторический север: Лалибела, Гондэр, Симиен" },
    { day: "8", country: "✈️ Перелёт", description: "Аддис-Абеба → Энтеббе (Уганда)" },
    { day: "8–14", country: "🇺🇬 Уганда", description: "Сафари и гориллы: Мёрчисон, Кибале, Бвинди" },
    { day: "14–18", country: "🇷🇼 Руанда", description: "Память и природа: Кигали, Ньюнгве, Киву" },
    { day: "18–21", country: "🇧🇮 Бурунди", description: "Исток Нила и озеро Танганьика" },
    { day: "21–22", country: "✈️ Вылет", description: "Бужумбура → Аддис-Абеба → Дом" }
];

const visaInfo = {
    title: "Визы для всего маршрута",
    options: [
        {
            name: "Вариант 1: East Africa Tourist Visa",
            price: "$100",
            covers: "Уганда, Руанда, Кения (90 дней)",
            notes: "Оформить в Уганде. Бурунди и Эфиопия — отдельно."
        },
        {
            name: "Вариант 2: Отдельные визы",
            details: [
                "Эфиопия: e-Visa $82 (evisa.gov.et)",
                "Уганда: e-Visa $50 (visas.immigration.go.ug)",
                "Руанда: $30 на границе или онлайн",
                "Бурунди: $90 на границе"
            ],
            total: "$252"
        }
    ],
    recommendation: "East Africa Visa + Эфиопия e-Visa + Бурунди на границе = $272 (экономия $0, но удобнее)"
};

const healthInfo = {
    vaccinations: [
        { name: "Жёлтая лихорадка", required: true, notes: "Обязательна для всех 4 стран!" },
        { name: "Гепатит A и B", required: false, notes: "Рекомендуется" },
        { name: "Брюшной тиф", required: false, notes: "Рекомендуется" },
        { name: "Менингит", required: false, notes: "Для Эфиопии в сухой сезон" }
    ],
    malaria: "Профилактика обязательна для всех стран, кроме высокогорий Эфиопии и Руанды",
    insurance: "Страховка с эвакуацией обязательна! Ближайшие хорошие госпитали — Найроби."
};
