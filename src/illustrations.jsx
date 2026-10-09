function Plate({ x, y, fill, label }) {
  return (
    <g>
      <circle cx={x} cy={y} r="74" fill={fill} />
      <circle cx={x} cy={y} r="46" fill="#10120c" />
      <circle cx={x} cy={y} r="14" fill={fill} />
      <text x={x} y={y + 92} textAnchor="middle" fill="#9b9e93" fontFamily="Outfit, sans-serif" fontSize="16">
        {label}
      </text>
    </g>
  );
}

export function GymScene() {
  return (
    <svg className="gym-scene" viewBox="0 0 640 520" role="img" aria-label="Squat rack, halter ve plakalar">
      <rect width="640" height="520" rx="36" fill="#14160f" />
      <rect x="24" y="24" width="592" height="472" rx="28" fill="#10120c" stroke="#2a2e22" />
      <text x="52" y="68" fill="#d6ff3c" fontFamily="Syne, sans-serif" fontSize="18" letterSpacing="3">
        RACK 04
      </text>
      <path d="M48 86 H592" stroke="#d6ff3c" strokeWidth="3" opacity="0.35" />
      <line x1="92" y1="100" x2="92" y2="430" stroke="#2a2f23" strokeWidth="12" />
      <line x1="548" y1="100" x2="548" y2="430" stroke="#2a2f23" strokeWidth="12" />
      <line x1="78" y1="132" x2="562" y2="132" stroke="#34392c" strokeWidth="8" />

      <Plate x={150} y={228} fill="#d6ff3c" label="20 KG" />
      <Plate x={490} y={228} fill="#f3efe4" label="20 KG" />
      <rect x="132" y="218" width="376" height="20" rx="10" fill="#f4f1e8" />

      <g>
        <circle cx="320" cy="168" r="22" fill="#f3efe4" />
        <path d="M286 214 h68 a18 18 0 0 1 18 18 v62 h-104 v-62 a18 18 0 0 1 18-18z" fill="#f3efe4" />
        <path d="M292 300 l-36 78 h28 l22-48 24 48 h28 l-38-78z" fill="#d6ff3c" />
      </g>

      <g transform="translate(64 360)">
        <path d="M34 6c-18 6-24 24-16 38 6 10 18 12 24 6 4 16 20 22 32 16 14-4 18-20 12-32 12-6 16-20 8-32-8-12-26-14-36-4-6-6-18-4-24 8z" fill="#d6ff3c" />
        <rect x="36" y="58" width="14" height="22" rx="5" fill="#10120c" />
      </g>
      <g transform="translate(500 348)">
        <rect y="18" width="22" height="42" rx="6" fill="#d6ff3c" />
        <rect x="62" y="18" width="22" height="42" rx="6" fill="#f3efe4" />
        <rect x="18" y="30" width="48" height="14" rx="7" fill="#f4f1e8" />
      </g>
      <path d="M120 448 H520" stroke="#d6ff3c" strokeWidth="3" opacity="0.45" />
    </svg>
  );
}

export function IconBarbell() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect x="4" y="22" width="10" height="20" rx="3" fill="#d6ff3c" />
      <rect x="50" y="18" width="10" height="28" rx="3" fill="#10110e" />
      <rect x="16" y="28" width="32" height="8" rx="4" fill="#10110e" />
    </svg>
  );
}

export function IconKettle() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M32 16c-8 0-12 6-12 12 0 4 2 6 2 6-8 4-12 12-12 20 0 8 8 10 22 10s22-2 22-10c0-8-4-16-12-20 0 0 2-2 2-6 0-6-4-12-12-12z" fill="#d6ff3c" />
      <path d="M24 18c2-6 14-6 16 0" fill="none" stroke="#10110e" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function IconPlate() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="22" fill="none" stroke="#10110e" strokeWidth="6" />
      <circle cx="32" cy="32" r="6" fill="#d6ff3c" />
    </svg>
  );
}

export function IconBottle() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect x="24" y="8" width="16" height="8" rx="3" fill="#10110e" />
      <path d="M22 18h20l4 8v26a6 6 0 0 1-6 6H24a6 6 0 0 1-6-6V26z" fill="#d6ff3c" />
      <path d="M20 36h24" stroke="#10110e" strokeWidth="3" />
    </svg>
  );
}

export function IconCheck() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="22" fill="#d6ff3c" />
      <path d="M20 33l8 8 16-18" fill="none" stroke="#10110e" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconChart() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M10 46 L24 34 L36 40 L54 18" fill="none" stroke="#10110e" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="54" cy="18" r="4" fill="#d6ff3c" stroke="#10110e" strokeWidth="3" />
    </svg>
  );
}

export const perkIcons = {
  "01": IconBarbell,
  "02": IconPlate,
  "03": IconCheck,
  "04": IconKettle,
  "05": IconChart,
  "06": IconBottle,
};
