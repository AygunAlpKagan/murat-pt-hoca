import { brand, dayPlan, dietById, formatLongDate, packages, programById, quotes, todayIndex } from "../data";
import { GymScene, IconBarbell, IconBottle, IconKettle, perkIcons } from "../illustrations";

const perks = [
  {
    k: "01",
    t: "Salon rehberi",
    d: "Hangi hareket, kaç set, ne kadar dinlenme. Salonda düşünmezsin, barı kaldırırsın.",
  },
  {
    k: "02",
    t: "Diyet cebinde",
    d: "Öğün öğün liste. Yediğini işaretle, akşam ne kaldığını gör.",
  },
  {
    k: "03",
    t: "Seti kapat",
    d: "Tek dokunuş. Bitirdiğin set yeşile döner, seri bozulmaz.",
  },
  {
    k: "04",
    t: "Hocandan not",
    d: "Programın değişince ana sayfana düşer. Kâğıt, WhatsApp, kaybolan liste yok.",
  },
  {
    k: "05",
    t: "Ölçü konuşur",
    d: "Kilo, bel, kalça, kol. Aynadaki his değil, haftalık çizgi.",
  },
  {
    k: "06",
    t: "Su ve tempo",
    d: "Bardak bardak su, dinlenme süresi hareketin yanında. Salon ritmi bozulmaz.",
  },
];

const gear = [
  ["Halter", IconBarbell],
  ["Kettlebell", IconKettle],
  ["Matara", IconBottle],
];

export default function Landing({ go }) {
  const program = programById("donusum");
  const day = dayPlan(program, todayIndex());
  const diet = dietById("1800");

  return (
    <div className="site">
      <header className="topnav">
        <a className="brand-mark" href="#top" onClick={(e) => { e.preventDefault(); go("home"); }}>
          <span>M</span>
          Murat PT Hoca
        </a>
        <nav className="top-links">
          <a href="#avantaj">Avantajlar</a>
          <a href="#paket">Paketler</a>
        </nav>
        <div className="nav-actions">
          <button className="btn btn-lime" onClick={() => go("uye")}>Üye girişi</button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Kişisel antrenör platformu</p>
          <h1>
            Salona gitmeden
            <br />
            önce her şey
            <br />
            <em>hazır.</em>
          </h1>
          <p className="lede">
            {brand.name} ile salona girmeden bugünün barı, seti ve tabağı hazır.
            Telefonu aç, hareketi gör, işareti koy, çık.
          </p>
          <div className="cta-row">
            <button className="btn btn-lime btn-lg" onClick={() => go("uye")}>
              Bugünkü programa gir
            </button>
          </div>
          <p className="micro">Şifre yok. Elif’in günü açık, setleri işaretleyebilirsin.</p>
        </div>

        <div className="hero-stage">
          <GymScene />
          <article className="ticket">
          <div className="ticket-top">
            <div>
              <p className="ticket-kicker">{formatLongDate()}</p>
              <h2>{day.title}</h2>
            </div>
            <span className="stamp">Hoca onaylı</span>
          </div>
          <ul className="ticket-list">
            {day.exercises.slice(0, 4).map((item) => (
              <li key={item.name}>
                <strong>{item.name}</strong>
                <span>{item.sets}</span>
              </li>
            ))}
          </ul>
          <div className="ticket-foot">
            <div>
              <small>Süre</small>
              <b>{day.duration}</b>
            </div>
            <div>
              <small>Diyet</small>
              <b>{diet.kcal} kcal</b>
            </div>
            <div>
              <small>Üye</small>
              <b>Elif D.</b>
            </div>
          </div>
          </article>
        </div>
      </section>

      <section className="gear-rail" aria-label="Salon ekipmanı">
        {gear.map(([label, Icon]) => (
          <div key={label}>
            <Icon />
            <span>{label}</span>
          </div>
        ))}
        <div>
          <strong>{day.duration}</strong>
          <span>bugünkü seans</span>
        </div>
        <div>
          <strong>{diet.kcal}</strong>
          <span>kcal liste</span>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div>
          {Array.from({ length: 2 }).map((_, loop) => (
            <p key={loop}>
              Antrenman programı · Diyet listesi · Set takibi · Check-in · Ölçü grafiği · Hoca notu · Devam serisi · Öğün onayı ·
            </p>
          ))}
        </div>
      </div>

      <section className="section paper" id="avantaj">
        <div className="section-head">
          <p className="eyebrow dark">Üyeye ne sağlar</p>
          <h2>Salonun karmaşası bitsin. Program, tabak ve hoca aynı yerde.</h2>
        </div>
        <div className="bento">
          {perks.map((item) => {
            const Icon = perkIcons[item.k];
            return (
              <article key={item.k} className="bento-card">
                <div className="perk-icon">
                  <Icon />
                </div>
                <span>{item.k}</span>
                <h3>{item.t}</h3>
                <p>{item.d}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section split-wrap">
        <article className="split-card">
          <p className="eyebrow">Üye</p>
          <h2>Telefonda bugünün işi.</h2>
          <ul>
            <li>Hareketin yanında tempo notu var.</li>
            <li>Set bitince bir dokunuşla işaretlenir.</li>
            <li>Öğünler, su ve check-in hocaya gider.</li>
            <li>Kilo çizgisi ve ölçüler üyeye de görünür.</li>
          </ul>
          <button className="btn btn-lime" onClick={() => go("uye")}>Elif’in gününü aç</button>
        </article>
        <article className="split-card ink">
          <p className="eyebrow">Hocan</p>
          <h2>Not düşer, program güncellenir.</h2>
          <ul>
            <li>İniş temposu, hareketin altında yazar.</li>
            <li>Diyet değişince liste yenilenir.</li>
            <li>Check-in akşam hocaya gider.</li>
            <li>Sen salondasın. Takip arkada kalır.</li>
          </ul>
          <button className="btn btn-lime" onClick={() => go("uye")}>Elif’in gününü aç</button>
        </article>
      </section>

      <section className="section paper" id="paket">
        <div className="section-head">
          <p className="eyebrow dark">Örnek paketler</p>
          <h2>Takip sıkılaştıkça fiyat artar. Ödeme bu demoda yok.</h2>
        </div>
        <div className="packages">
          {packages.map((item) => (
            <article key={item.name} className={item.featured ? "pack featured" : "pack"}>
              <p className="pack-note">{item.note}</p>
              <h3>{item.name}</h3>
              <p className="price">
                <b>{item.price}</b>
                <span>₺ / ay</span>
              </p>
              <ul>
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <button className={item.featured ? "btn btn-ink" : "btn btn-ghost dark"} onClick={() => go("uye")}>
                Demoda gör
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="section quotes">
        {quotes.map((item) => (
          <blockquote key={item.name}>
            <p>“{item.line}”</p>
            <footer>{item.name}</footer>
          </blockquote>
        ))}
      </section>

      <section className="closer">
        <div>
          <p className="eyebrow">Salona çıkmadan</p>
          <h2>Telefonu aç, bugünkü işi gör, barın altına gir.</h2>
        </div>
        <button className="btn btn-lime btn-lg" onClick={() => go("uye")}>Demoyu başlat</button>
      </section>

      <footer className="site-foot">
        <strong>{brand.name}</strong>
        <span>{brand.coach} · {brand.role}</span>
        <span>Üyelere özel program, diyet ve takip.</span>
      </footer>
    </div>
  );
}
