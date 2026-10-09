export function Spark({ values, up = true }) {
  const w = 280;
  const h = 92;
  const pad = 6;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const pts = values.map((v, i) => {
    const x = pad + (i / (values.length - 1)) * (w - pad * 2);
    const y = pad + (1 - (v - min) / span) * (h - pad * 2);
    return [x, y];
  });
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  const fill = `${line} L${pts.at(-1)[0].toFixed(1)},${h} L${pts[0][0].toFixed(1)},${h} Z`;
  return (
    <svg className="spark" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" role="img" aria-label="Kilo grafiği">
      <path d={fill} className={up ? "spark-fill" : "spark-fill down"} />
      <path d={line} className={up ? "spark-line" : "spark-line down"} />
      <circle cx={pts.at(-1)[0]} cy={pts.at(-1)[1]} r="3.5" className="spark-dot" />
    </svg>
  );
}

export function Bars({ done, total }) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    <div className="bars" aria-label={`${done} / ${total}`}>
      <span style={{ width: `${pct}%` }} />
    </div>
  );
}
