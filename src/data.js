import { normalizeExercise } from "./moves.jsx";

export const brand = {
  name: "Murat PT Hoca",
  coach: "Murat Yılmaz",
  role: "Kişisel antrenör",
};

export const dayNames = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];

export function todayIndex(date = new Date()) {
  const d = date.getDay();
  return d === 0 ? 6 : d - 1;
}

export function formatLongDate(date = new Date()) {
  return date.toLocaleDateString("tr-TR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

const ex = (name, sets, rest, note) => ({ name, sets, rest, note });

export const programs = [
  {
    id: "donusum",
    name: "12 Haftalık Dönüşüm",
    focus: "Yağ yakımı + kuvvet",
    weeks: 12,
    days: [
      {
        title: "Üst vücut kuvvet",
        duration: "55 dk",
        kind: "train",
        exercises: [
          ex("Bench press", "4 × 8", "2 dk", "İniş 3 saniye. Ayaklar yerde, kürekler sabit."),
          ex("Yatay çekiş", "4 × 10", "90 sn", "Göğsü dayanağa yaklaştır, omuzları kulaklardan uzak tut."),
          ex("Dumbbell shoulder press", "3 × 10", "75 sn", "Bel kamburlaşmadan, son tekrar temiz."),
          ex("Face pull", "3 × 15", "45 sn", "Dirsekler yüksekte, kürekleri sık."),
        ],
      },
      {
        title: "Alt vücut kuvvet",
        duration: "60 dk",
        kind: "train",
        exercises: [
          ex("Goblet squat", "4 × 10", "90 sn", "Topuklar yerde, dizler ayak ucu yönünde."),
          ex("Hip thrust", "4 × 8", "2 dk", "Tepe noktada kalçayı 1 sn sık."),
          ex("Bulgarian split squat", "3 × 8", "75 sn", "Gövde dik, ön diz içeri kaçmasın."),
          ex("Calf raise", "3 × 15", "45 sn", "Tam esne, tepede bekle."),
        ],
      },
      {
        title: "Zone 2 yürüyüş",
        duration: "35 dk",
        kind: "light",
        exercises: [
          ex("Eğimli yürüyüş", "30 dk", "—", "Konuşabilecek tempoda. Ekrana bakıp eğilme."),
          ex("Nefes + mobilite", "5 dk", "—", "Kalça açıcı ve göğüs açma. Acele etme."),
        ],
      },
      {
        title: "Üst hipertrofi",
        duration: "50 dk",
        kind: "train",
        exercises: [
          ex("Incline dumbbell press", "4 × 10", "75 sn", "Kürekler geride, bilekler nötr."),
          ex("Lat pulldown", "4 × 12", "75 sn", "Barı köprücüğe doğru, sallanma yok."),
          ex("Lateral raise", "3 × 15", "45 sn", "Hafif ağırlık, dirsekler yumuşak."),
          ex("Cable row", "3 × 12", "60 sn", "Her tekrarda kürekleri birbirine yaklaştır."),
        ],
      },
      {
        title: "Alt vücut + core",
        duration: "60 dk",
        kind: "train",
        exercises: [
          ex("Squat", "5 × 5", "2 dk", "Derinlik tam. İnişte 3 saniye tut."),
          ex("Romen deadlift", "4 × 8", "90 sn", "Kalça geri gider, sırt nötr kalır."),
          ex("Walking lunge", "3 × 12", "60 sn", "Adım uzun, diz yere değmeden kontrol."),
          ex("Leg curl", "3 × 12", "60 sn", "Tepede 1 saniye bekle."),
          ex("Hanging knee raise", "3 × 10", "45 sn", "Sallanma yok, belden kıvırma."),
        ],
      },
      {
        title: "Kondisyon devresi",
        duration: "40 dk",
        kind: "train",
        exercises: [
          ex("Kettlebell swing", "4 × 15", "45 sn", "Kalçadan savur, kollarla çekme."),
          ex("Push-up", "4 × 8–12", "45 sn", "Gövde tahta gibi. Dizden yapmak serbest."),
          ex("Row + taşıma", "3 × 30 m", "60 sn", "Ağırlığı gövdeye yakın tut."),
        ],
      },
      {
        title: "Tam dinlenme",
        duration: "—",
        kind: "rest",
        exercises: [
          ex("Yürüyüş", "20–30 dk", "—", "Salon yok. Dışarıda rahat tempo yeter."),
          ex("Uyku hedefi", "7.5 saat", "—", "Yarınki kuvvet için asıl iş bu."),
        ],
      },
    ],
  },
  {
    id: "kuvvet",
    name: "Kuvvet Bloğu",
    focus: "Güç ve kas",
    weeks: 8,
    days: [
      {
        title: "Squat günü",
        duration: "70 dk",
        kind: "train",
        exercises: [
          ex("Back squat", "5 × 5", "3 dk", "Kemer varsa kullan. Isınmayı atlama."),
          ex("Romanian deadlift", "3 × 6", "2 dk", "Barı bacaklara yakın sürükle."),
          ex("Leg press", "3 × 10", "90 sn", "Kilidi tepede kırma."),
        ],
      },
      {
        title: "Bench günü",
        duration: "65 dk",
        kind: "train",
        exercises: [
          ex("Bench press", "5 × 5", "3 dk", "Kürekler sabit, ayaklar itiyor."),
          ex("Weighted pull-up", "4 × 6", "2 dk", "Çene barı geçsin, sallanma yok."),
          ex("Dip", "3 × 8", "90 sn", "Omuz ağrırsa ağırlığı düşür."),
        ],
      },
      {
        title: "Hafif tempo",
        duration: "30 dk",
        kind: "light",
        exercises: [
          ex("Bisiklet", "25 dk", "—", "Nefes yükselmesin, bacaklar açılsın."),
          ex("Omuz mobilitesi", "5 dk", "—", "Duvar kaydırma, 2 tur."),
        ],
      },
      {
        title: "Deadlift günü",
        duration: "70 dk",
        kind: "train",
        exercises: [
          ex("Deadlift", "5 × 3", "3 dk", "Bar ayak ortasında. Sırt kilitli kalk."),
          ex("Front squat", "3 × 5", "2 dk", "Dirsekler yüksek."),
          ex("Back extension", "3 × 12", "60 sn", "Tepede abdomene sık."),
        ],
      },
      {
        title: "Overhead günü",
        duration: "60 dk",
        kind: "train",
        exercises: [
          ex("Overhead press", "5 × 5", "2 dk", "Kalça sıkı, bel boşluğu büyümesin."),
          ex("Pendlay row", "4 × 6", "2 dk", "Her tekrarda bar yere iner."),
          ex("Farmer carry", "4 × 40 m", "90 sn", "Duruş dik, acele yok."),
        ],
      },
      {
        title: "Hacim",
        duration: "45 dk",
        kind: "train",
        exercises: [
          ex("Lunges", "3 × 10", "60 sn", "Kontrollü iniş."),
          ex("Push-up", "3 × max", "60 sn", "Temiz tekrar, yarım sayma."),
          ex("Plank", "3 × 40 sn", "30 sn", "Kalça düşmesin."),
        ],
      },
      {
        title: "Dinlenme",
        duration: "—",
        kind: "rest",
        exercises: [ex("Tam rest", "—", "—", "Yük binmez. Yarın squat var.")],
      },
    ],
  },
  {
    id: "baslangic",
    name: "Salona Alışma",
    focus: "Form ve alışkanlık",
    weeks: 4,
    days: [
      {
        title: "Tüm vücut A",
        duration: "40 dk",
        kind: "train",
        exercises: [
          ex("Goblet squat", "3 × 10", "60 sn", "Ayna karşısı. Diz içeri kaçmasın."),
          ex("Makine row", "3 × 12", "60 sn", "Göğsü yastığa değdir."),
          ex("Makine press", "3 × 12", "60 sn", "Omuzlar kulaklara çıkmasın."),
          ex("Yürüyüş bandı", "8 dk", "—", "Eğim 4, rahat tempo."),
        ],
      },
      {
        title: "Yürüyüş",
        duration: "25 dk",
        kind: "light",
        exercises: [ex("Dışarı yürüyüş", "25 dk", "—", "Salon şart değil. Telefonu bırak.")],
      },
      {
        title: "Tüm vücut B",
        duration: "40 dk",
        kind: "train",
        exercises: [
          ex("Leg press", "3 × 12", "60 sn", "Hafif kilo, tam kontrol."),
          ex("Lat pulldown", "3 × 12", "60 sn", "Barın arkasına yatma."),
          ex("Seated shoulder press", "3 × 10", "60 sn", "Ağrı olursa dur, hocaya yaz."),
          ex("Dead bug", "3 × 8", "40 sn", "Bel yerde kalsın."),
        ],
      },
      {
        title: "Mobilite",
        duration: "20 dk",
        kind: "light",
        exercises: [ex("Kalça ve göğüs açma", "20 dk", "—", "Videodaki akış. Zorlama yok.")],
      },
      {
        title: "Tüm vücut C",
        duration: "40 dk",
        kind: "train",
        exercises: [
          ex("Hip thrust", "3 × 12", "60 sn", "Çene hafif içeri, tepeyi sık."),
          ex("Chest press", "3 × 12", "60 sn", "Son tekrar zorlanacak kadar."),
          ex("Seated row", "3 × 12", "60 sn", "Omuzları geri al, sonra çek."),
          ex("Plank", "3 × 20 sn", "30 sn", "Nefes tutma."),
        ],
      },
      {
        title: "Serbest gün",
        duration: "—",
        kind: "rest",
        exercises: [ex("İstersen yürüyüş", "20 dk", "—", "Zorunlu değil.")],
      },
      {
        title: "Dinlenme",
        duration: "—",
        kind: "rest",
        exercises: [ex("Dinlen", "—", "—", "Kas burada toparlanır.")],
      },
    ],
  },
];

export const diets = [
  {
    id: "1800",
    name: "1800 kcal yağ yakımı",
    kcal: 1800,
    protein: 140,
    carb: 160,
    fat: 55,
    meals: [
      { time: "08:00", name: "Kahvaltı", items: "3 yumurta, 40 g yulaf, yaban mersini, tarçın", kcal: 420 },
      { time: "11:00", name: "Ara", items: "150 g yoğurt, 15 g badem", kcal: 220 },
      { time: "13:30", name: "Öğle", items: "150 g tavuk, 70 g pirinç (çiğ), bol salata, zeytinyağı 1 tatlı kaşığı", kcal: 520 },
      { time: "16:30", name: "Antrenman öncesi", items: "1 muz, 20 g whey veya 150 g lor", kcal: 230 },
      { time: "20:00", name: "Akşam", items: "150 g hindi veya balık, sebze, 1 dilim tam buğday", kcal: 410 },
    ],
  },
  {
    id: "2400",
    name: "2400 kcal kuvvet",
    kcal: 2400,
    protein: 170,
    carb: 260,
    fat: 70,
    meals: [
      { time: "08:00", name: "Kahvaltı", items: "4 yumurta, 2 dilim ekmek, peynir, zeytin", kcal: 620 },
      { time: "11:30", name: "Ara", items: "Muz, fıstık ezmesi 20 g, süt 200 ml", kcal: 340 },
      { time: "14:00", name: "Öğle", items: "180 g dana veya tavuk, 100 g pirinç, yoğurt", kcal: 720 },
      { time: "17:30", name: "Antrenman", items: "Pirinç patlağı 2, whey, bal 1 tatlı kaşığı", kcal: 280 },
      { time: "21:00", name: "Akşam", items: "Somon veya köfte, patates, salata", kcal: 440 },
    ],
  },
  {
    id: "1600",
    name: "1600 kcal alışma",
    kcal: 1600,
    protein: 120,
    carb: 140,
    fat: 50,
    meals: [
      { time: "08:30", name: "Kahvaltı", items: "Omlet 2 yumurta, domates, 1 dilim ekmek", kcal: 340 },
      { time: "12:30", name: "Öğle", items: "Izgara tavuk, bol salata, 4 yemek kaşığı bulgur", kcal: 480 },
      { time: "16:00", name: "Ara", items: "Elma ve 10 badem", kcal: 180 },
      { time: "19:30", name: "Akşam", items: "Çorba, ızgara balık veya hindi, yoğurt", kcal: 420 },
      { time: "21:30", name: "Gece", items: "Bitki çayı. Atıştırmalık yok.", kcal: 0 },
    ],
  },
  {
    id: "2000",
    name: "2000 kcal denge",
    kcal: 2000,
    protein: 140,
    carb: 190,
    fat: 60,
    meals: [
      { time: "08:00", name: "Kahvaltı", items: "Yulaf, süt, fıstık ezmesi, meyve", kcal: 450 },
      { time: "12:30", name: "Öğle", items: "Tavuk dürüm veya ev yemeği, ayran", kcal: 620 },
      { time: "16:00", name: "Ara", items: "Lor ve salatalık", kcal: 180 },
      { time: "19:30", name: "Akşam", items: "Et veya bakliyat, sebze, küçük porsiyon pilav", kcal: 550 },
      { time: "21:00", name: "Kapanış", items: "Yoğurt", kcal: 200 },
    ],
  },
];

export const packages = [
  {
    name: "Başlangıç",
    price: "2.500",
    note: "Salona yeni giren üye",
    points: ["4 haftalık alışma programı", "Haftada 2 hoca kontrolü", "Basit diyet iskeleti"],
  },
  {
    name: "Dönüşüm",
    price: "4.500",
    note: "En çok tercih edilen",
    featured: true,
    points: ["12 haftalık kişisel program", "Günlük diyet listesi", "Check-in ve ölçü takibi", "Program anında güncellenir"],
  },
  {
    name: "Elite",
    price: "7.500",
    note: "Sıkı takip isteyen",
    points: ["Sınırsız program revizyonu", "Günlük hoca notu", "Öğün ve antrenman onayı", "Öncelikli mesaj"],
  },
];

export const quotes = [
  {
    name: "Elif Demir",
    line: "Salona girmeden ne yapacağımı biliyorum. Set bitince işaretliyorum, Murat hoca akşam görüyor.",
  },
  {
    name: "Kerem Aydın",
    line: "Diyet kâğıtta kaybolmuyordu zaten, telefonda öğün öğün duruyor. Kuvvet günlerinde sapmıyorum.",
  },
  {
    name: "Selin Kaya",
    line: "İlk haftam. Hangi makine, kaç tekrar, yazıyor. Utanıp rastgele gezmiyorum.",
  },
];

const note = (text, at) => ({ id: cryptoId(), text, at, from: "hoca" });
const check = (energy, sleep, soreness, text, at) => ({
  id: cryptoId(),
  energy,
  sleep,
  soreness,
  text,
  at,
  read: true,
});

function cryptoId() {
  return Math.random().toString(36).slice(2, 9);
}

export function seedState() {
  return {
    checks: {},
    meals: {},
    water: { elif: 3, kerem: 6, selin: 2, burak: 1, deniz: 4, ayse: 5 },
    members: [
      {
        id: "elif",
        name: "Elif Demir",
        initials: "ED",
        tone: "lime",
        age: 29,
        goal: "Yağ yakımı, bel ölçüsü",
        level: "Orta",
        programId: "donusum",
        dietId: "1800",
        compliance: 92,
        streak: 11,
        status: "yolunda",
        weight: 64.2,
        startWeight: 68.4,
        targetWeight: 60,
        nextSession: "Bugün 19:00",
        joined: "12 Mart 2026",
        weightHistory: [68.4, 67.8, 67.1, 66.4, 65.9, 65.2, 64.8, 64.2],
        weeks: ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8"],
        measurements: { bel: 74, kalca: 98, kol: 28.5 },
        startMeasurements: { bel: 81, kalca: 104, kol: 30 },
        notes: [note("Bugün squat inişlerinde 3 saniye tut. Öğün atlama, bel bu hafta iyi gidiyor.", "Dün")],
        checkins: [check(4, 7.5, 2, "Bacak iyi geçti, uyku biraz kısaydı.", "Dün")],
      },
      {
        id: "kerem",
        name: "Kerem Aydın",
        initials: "KA",
        tone: "sand",
        age: 34,
        goal: "Kuvvet, +8 kg sıkı kilo",
        level: "İleri",
        programId: "kuvvet",
        dietId: "2400",
        compliance: 96,
        streak: 18,
        status: "yolunda",
        weight: 86.4,
        startWeight: 82.1,
        targetWeight: 90,
        nextSession: "Bugün 07:00",
        joined: "4 Ocak 2026",
        weightHistory: [82.1, 82.8, 83.4, 84.0, 84.6, 85.2, 85.9, 86.4],
        weeks: ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8"],
        measurements: { bel: 86, kalca: 102, kol: 38 },
        startMeasurements: { bel: 84, kalca: 100, kol: 36 },
        notes: [note("Overhead press’te kemer şart değil, nefesini kaçırma.", "3 Eki")],
        checkins: [check(5, 8, 3, "Deadlift günü temiz. İştah yerinde.", "Dün")],
      },
      {
        id: "selin",
        name: "Selin Kaya",
        initials: "SK",
        tone: "sky",
        age: 26,
        goal: "Alışkanlık, ilk 4 hafta",
        level: "Yeni",
        programId: "baslangic",
        dietId: "1600",
        compliance: 78,
        streak: 3,
        status: "yeni",
        weight: 72.6,
        startWeight: 73.1,
        targetWeight: 68,
        nextSession: "Bugün 18:30",
        joined: "2 Ekim 2026",
        weightHistory: [73.1, 73.0, 72.8, 72.6],
        weeks: ["H1", "H2", "H3", "H4"],
        measurements: { bel: 82, kalca: 106, kol: 29 },
        startMeasurements: { bel: 83, kalca: 107, kol: 29 },
        notes: [note("Ağırlık büyütme. Form oturunca birlikte artırırız.", "6 Eki")],
        checkins: [check(3, 6.5, 2, "Makine press’te omuz hafif gerildi, ağrı yok.", "6 Eki")],
      },
      {
        id: "burak",
        name: "Burak Özkan",
        initials: "BÖ",
        tone: "coral",
        age: 31,
        goal: "Kilo alma",
        level: "Başlangıç",
        programId: "kuvvet",
        dietId: "2400",
        compliance: 54,
        streak: 0,
        status: "dikkat",
        weight: 71,
        startWeight: 69.5,
        targetWeight: 78,
        nextSession: "2 gündür yok",
        joined: "18 Ağustos 2026",
        weightHistory: [69.5, 69.8, 70.1, 70.4, 70.6, 70.9, 71, 71],
        weeks: ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8"],
        measurements: { bel: 84, kalca: 96, kol: 31 },
        startMeasurements: { bel: 82, kalca: 95, kol: 30 },
        notes: [note("İki seanstır yoksun. Yarın 18:00 boş, yazman yeterli.", "7 Eki")],
        checkins: [check(2, 5, 1, "İş çıkışı yetişemedim.", "5 Eki")],
      },
      {
        id: "deniz",
        name: "Deniz Arslan",
        initials: "DA",
        tone: "mint",
        age: 38,
        goal: "Öğün düzeni",
        level: "Orta",
        programId: "donusum",
        dietId: "2000",
        compliance: 67,
        streak: 4,
        status: "dikkat",
        weight: 91.2,
        startWeight: 94.8,
        targetWeight: 86,
        nextSession: "Bugün 20:15",
        joined: "2 Şubat 2026",
        weightHistory: [94.8, 94.1, 93.6, 93.0, 92.4, 91.9, 91.5, 91.2],
        weeks: ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8"],
        measurements: { bel: 98, kalca: 108, kol: 34 },
        startMeasurements: { bel: 104, kalca: 112, kol: 35 },
        notes: [note("Akşam öğününü atlıyorsun, sonra gece acıkıyorsun. Listeyi bozma.", "8 Eki")],
        checkins: [check(3, 6, 2, "Öğle dışarıda kaçtı.", "8 Eki")],
      },
      {
        id: "ayse",
        name: "Ayşe Koç",
        initials: "AK",
        tone: "paper",
        age: 42,
        goal: "Koruma ve duruş",
        level: "Orta",
        programId: "donusum",
        dietId: "2000",
        compliance: 88,
        streak: 9,
        status: "yolunda",
        weight: 63.5,
        startWeight: 65.2,
        targetWeight: 63,
        nextSession: "Yarın 10:00",
        joined: "20 Kasım 2025",
        weightHistory: [65.2, 64.9, 64.6, 64.3, 64.0, 63.8, 63.6, 63.5],
        weeks: ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8"],
        measurements: { bel: 76, kalca: 99, kol: 27 },
        startMeasurements: { bel: 80, kalca: 102, kol: 28 },
        notes: [note("Hedefe geldin. Bu ay koruma, ağırlığı zıplatma.", "1 Eki")],
        checkins: [check(4, 7, 1, "Omuz rahat, tempo iyi.", "Dün")],
      },
    ],
  };
}

export function programById(id) {
  return programs.find((p) => p.id === id) ?? programs[0];
}

export function dietById(id) {
  return diets.find((d) => d.id === id) ?? diets[0];
}

function asNumber(value, fallback) {
  if (value === "" || value == null) return fallback;
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function normalizeMeal(meal = {}) {
  return {
    time: meal.time || "12:00",
    name: meal.name || "Öğün",
    items: meal.items || "",
    kcal: asNumber(meal.kcal, 0),
  };
}

export function waterGlasses(diet) {
  return Math.min(16, Math.max(4, Number(diet?.water) || 8));
}

export function resolveDiet(member) {
  const base = dietById(member.dietId);
  const saved = member.customDiet;
  const source = saved?.meals?.length ? saved : base;
  const water = asNumber(source.water, 8);
  return {
    id: base.id,
    name: source.name || base.name,
    kcal: asNumber(source.kcal, base.kcal),
    protein: asNumber(source.protein, base.protein),
    carb: asNumber(source.carb, base.carb),
    fat: asNumber(source.fat, base.fat),
    water,
    note: source.note || "",
    meals: (source.meals ?? base.meals).map(normalizeMeal),
  };
}

export function dayPlan(program, index = todayIndex()) {
  return program.days[index] ?? program.days[0];
}

export function setKey(memberId, programId, day, index) {
  return `${memberId}:${programId}:${day}:${index}`;
}

export function resolveDay(member, dayIndex = todayIndex()) {
  const saved = member.customDays?.[dayIndex] ?? member.customDays?.[String(dayIndex)];
  if (saved?.exercises?.length) {
    return {
      title: saved.title || "Antrenman",
      duration: saved.duration || "",
      kind: saved.kind || "train",
      exercises: saved.exercises.map(normalizeExercise),
    };
  }
  const day = dayPlan(programById(member.programId), dayIndex);
  return { ...day, exercises: day.exercises.map(normalizeExercise) };
}

export function threadOf(member) {
  if (member.messages?.length) return member.messages;
  return (member.notes ?? []).map((item) => ({ ...item, from: "hoca" }));
}

export const records = {
  elif: [
    { lift: "Squat", value: "70 kg" },
    { lift: "Hip thrust", value: "80 kg" },
    { lift: "Bench press", value: "40 kg" },
  ],
  kerem: [
    { lift: "Deadlift", value: "180 kg" },
    { lift: "Squat", value: "150 kg" },
    { lift: "Bench press", value: "110 kg" },
  ],
  selin: [
    { lift: "Goblet squat", value: "12 kg" },
    { lift: "Lat pulldown", value: "25 kg" },
  ],
  burak: [
    { lift: "Squat", value: "60 kg" },
    { lift: "Bench press", value: "50 kg" },
  ],
  deniz: [
    { lift: "Squat", value: "90 kg" },
    { lift: "Row", value: "70 kg" },
  ],
  ayse: [
    { lift: "Hip thrust", value: "60 kg" },
    { lift: "Squat", value: "45 kg" },
  ],
};
