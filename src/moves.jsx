export const catalog = [
  { name: "Squat", weight: "70 kg", rest: "2 dk", cue: "Ayaklar omuz genişliğinde. Kalça geri, dizler ayak ucu yönünde, iniş 3 saniye." },
  { name: "Goblet squat", weight: "16 kg", rest: "90 sn", cue: "Dambılı göğüste tut. Topuklar yerde, dirsekler dizlerin içinden." },
  { name: "Bench press", weight: "40 kg", rest: "2 dk", cue: "Kürekler sabit, ayaklar yerde. Bar göğse iner, bilekler düz kalır." },
  { name: "Incline dumbbell press", weight: "14 kg", rest: "75 sn", cue: "Sırt dayanakta. Dambıllar omuz hizasına iner, dirsekler 45 derece." },
  { name: "Shoulder press", weight: "12 kg", rest: "75 sn", cue: "Kaburga sıkı. Bar çenenin önünden yukarı, bel boşluğu büyümez." },
  { name: "Lat pulldown", weight: "35 kg", rest: "75 sn", cue: "Göğsü açık tut. Barı köprücüğe çek, sallanma yok." },
  { name: "Seated row", weight: "30 kg", rest: "75 sn", cue: "Önce kürekleri sık, sonra çek. Omuzlar kulaklara çıkmasın." },
  { name: "Romen deadlift", weight: "50 kg", rest: "90 sn", cue: "Dizler hafif kırık. Kalça geri gider, sırt düz, bar bacaklara yakın." },
  { name: "Hip thrust", weight: "60 kg", rest: "90 sn", cue: "Kürekler sehpada. Tepede kalçayı 1 saniye sık, beli kırma." },
  { name: "Walking lunge", weight: "12 kg", rest: "60 sn", cue: "Adım uzun. Arka diz yere değmeden kontrol, gövde dik." },
  { name: "Leg curl", weight: "25 kg", rest: "60 sn", cue: "Kalça sehpada sabit. Topuğu kalçaya çek, tepede 1 saniye." },
  { name: "Hanging knee raise", weight: "vücut", rest: "45 sn", cue: "Omuzlar kulaklardan uzak. Dizleri göğse çek, sallanma yok." },
  { name: "Plank", weight: "vücut", rest: "30 sn", cue: "Dirsekler omuz altında. Kalça düşmez, nefes akıyor." },
  { name: "Eğimli yürüyüş", weight: "—", rest: "—", cue: "Konuşabilecek tempo. Ekrana bakıp belini kırma." },
];

const weights = Object.fromEntries(catalog.map((item) => [item.name, item.weight]));
const cues = Object.fromEntries(catalog.map((item) => [item.name, item.cue]));
const rests = Object.fromEntries(catalog.map((item) => [item.name, item.rest]));

export function kindFor(name = "") {
  const text = name.toLowerCase();
  if (/uyku|dinlen/.test(text)) return "rest";
  if (/swing|kettlebell/.test(text)) return "hinge";
  if (/shoulder|overhead|lateral|face pull/.test(text)) return "press";
  if (/bench|incline|chest|press|push|şınav/.test(text)) return "bench";
  if (/squat/.test(text)) return "squat";
  if (/deadlift|romen|hip thrust|hinge/.test(text)) return "hinge";
  if (/lunge|bulgarian|split/.test(text)) return "lunge";
  if (/row|çekiş|pulldown|pull/.test(text)) return "row";
  if (/curl/.test(text)) return "curl";
  if (/plank|knee|dead bug|core|raise/.test(text)) return "core";
  if (/yürüyüş|walk|bisiklet|mobilite|dinlen/.test(text)) return "walk";
  if (/calf/.test(text)) return "calf";
  return "squat";
}

export function normalizeExercise(item) {
  const match = String(item.sets ?? "").match(/(\d+)\s*[×xX]\s*(\d+)/);
  const setsCount = item.setsCount ?? (match ? match[1] : "");
  const reps = item.reps ?? (match ? match[2] : "");
  const sets = setsCount && reps ? `${setsCount} × ${reps}` : item.sets || "3 × 10";
  const known = catalog.find((entry) => entry.name === item.name);
  return {
    name: item.name,
    setsCount,
    reps,
    sets,
    weight: item.weight || known?.weight || weights[item.name] || "kendi kilosu",
    rest: item.rest && item.rest !== "—" ? item.rest : known?.rest || rests[item.name] || "90 sn",
    note: item.note || known?.cue || cues[item.name] || "Kontrollü in, temiz çık.",
  };
}

export function MoveArt({ name }) {
  const kind = kindFor(name);
  return (
    <span className={`move-art ${kind}`} aria-hidden="true">
      <svg viewBox="0 0 64 64">
        <Art kind={kind} />
      </svg>
    </span>
  );
}

function Art({ kind }) {
  if (kind === "bench") {
    return (
      <>
        <rect x="6" y="40" width="52" height="6" rx="2" fill="#3a4030" />
        <path d="M14 36c8-10 28-10 36 0v6H14z" fill="#f4efe4" />
        <circle cx="18" cy="24" r="5" fill="#f4efe4" />
        <path d="M22 22h16l6-8h6" fill="none" stroke="#d6ff3c" strokeWidth="4" strokeLinecap="round" />
      </>
    );
  }
  if (kind === "hinge") {
    return (
      <>
        <circle cx="46" cy="16" r="5" fill="#f4efe4" />
        <path d="M44 22 L22 34 L18 52" fill="none" stroke="#f4efe4" strokeWidth="7" strokeLinecap="round" />
        <path d="M22 34 H52" stroke="#d6ff3c" strokeWidth="5" strokeLinecap="round" />
        <circle cx="52" cy="34" r="6" fill="#d6ff3c" />
      </>
    );
  }
  if (kind === "lunge") {
    return (
      <>
        <circle cx="34" cy="12" r="5" fill="#f4efe4" />
        <path d="M34 18 v16" stroke="#f4efe4" strokeWidth="7" strokeLinecap="round" />
        <path d="M34 28 L18 46" stroke="#d6ff3c" strokeWidth="7" strokeLinecap="round" />
        <path d="M34 32 L50 50" stroke="#f4efe4" strokeWidth="7" strokeLinecap="round" />
      </>
    );
  }
  if (kind === "row") {
    return (
      <>
        <circle cx="14" cy="18" r="5" fill="#f4efe4" />
        <path d="M18 22 L40 34" stroke="#f4efe4" strokeWidth="7" strokeLinecap="round" />
        <path d="M28 30 L22 46" stroke="#d6ff3c" strokeWidth="6" strokeLinecap="round" />
        <path d="M40 34 H54" stroke="#d6ff3c" strokeWidth="5" strokeLinecap="round" />
      </>
    );
  }
  if (kind === "press") {
    return (
      <>
        <circle cx="32" cy="14" r="5" fill="#f4efe4" />
        <path d="M32 20 v16" stroke="#f4efe4" strokeWidth="7" strokeLinecap="round" />
        <path d="M18 18 H46" stroke="#d6ff3c" strokeWidth="5" strokeLinecap="round" />
        <circle cx="14" cy="18" r="5" fill="#d6ff3c" />
        <circle cx="50" cy="18" r="5" fill="#d6ff3c" />
        <path d="M32 36 L22 54 M32 36 L42 54" stroke="#f4efe4" strokeWidth="6" strokeLinecap="round" />
      </>
    );
  }
  if (kind === "curl") {
    return (
      <>
        <circle cx="40" cy="14" r="5" fill="#f4efe4" />
        <path d="M38 20 v18" stroke="#f4efe4" strokeWidth="7" strokeLinecap="round" />
        <path d="M36 28 q-14 2-10 16" fill="none" stroke="#d6ff3c" strokeWidth="6" strokeLinecap="round" />
        <circle cx="22" cy="46" r="5" fill="#d6ff3c" />
      </>
    );
  }
  if (kind === "core") {
    return (
      <>
        <path d="M10 16 H54" stroke="#3a4030" strokeWidth="4" strokeLinecap="round" />
        <circle cx="32" cy="28" r="5" fill="#f4efe4" />
        <path d="M32 34 v10" stroke="#f4efe4" strokeWidth="6" strokeLinecap="round" />
        <path d="M32 42 L22 54 M32 42 L42 52" stroke="#d6ff3c" strokeWidth="6" strokeLinecap="round" />
      </>
    );
  }
  if (kind === "walk") {
    return (
      <>
        <circle cx="36" cy="12" r="5" fill="#f4efe4" />
        <path d="M34 18 L28 34 L18 48" stroke="#f4efe4" strokeWidth="6" strokeLinecap="round" />
        <path d="M30 32 L46 46" stroke="#d6ff3c" strokeWidth="6" strokeLinecap="round" />
        <path d="M18 48 H30 M40 46 H54" stroke="#d6ff3c" strokeWidth="4" strokeLinecap="round" />
      </>
    );
  }
  if (kind === "rest") {
    return (
      <>
        <path d="M18 40c0-10 8-16 14-16 2 0 4 2 4 4 6-2 14 2 14 10 6 1 10 6 8 12H16c-2-4 0-8 2-10z" fill="#d6ff3c" />
        <circle cx="46" cy="18" r="6" fill="#f4efe4" />
      </>
    );
  }
  if (kind === "calf") {
    return (
      <>
        <circle cx="32" cy="12" r="5" fill="#f4efe4" />
        <path d="M32 18 v20" stroke="#f4efe4" strokeWidth="7" strokeLinecap="round" />
        <path d="M24 48 h16 l4 8 H22z" fill="#d6ff3c" />
      </>
    );
  }
  return (
    <>
      <circle cx="32" cy="12" r="5" fill="#f4efe4" />
      <path d="M32 18 v14" stroke="#f4efe4" strokeWidth="7" strokeLinecap="round" />
      <path d="M16 24 H48" stroke="#d6ff3c" strokeWidth="5" strokeLinecap="round" />
      <circle cx="12" cy="24" r="5" fill="#d6ff3c" />
      <circle cx="52" cy="24" r="5" fill="#d6ff3c" />
      <path d="M26 32 L16 52 M38 32 L50 52" stroke="#f4efe4" strokeWidth="6" strokeLinecap="round" />
    </>
  );
}
