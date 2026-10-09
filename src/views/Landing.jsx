import { brand, dayPlan, dietById, formatLongDate, packages, programById, quotes, todayIndex } from "../data";

const perks = [
  {
    k: "01",
    t: "Salon rehberi",
    d: "Hangi hareket, kaç set, ne kadar dinlenme, nelere dikkat. Üye salonda düşünmez, uygular.",
  },
  {
    k: "02",
    t: "Diyet cebinde",
    d: "Öğün öğün liste. Yenilen işaretlenir, hoca akşam kaça uyulduğunu görür.",
  },
  {
    k: "03",
    t: "Hoca kontrolü",
    d: "Check-in, devam serisi ve tamamlanan setler hocanın ekranına düşer.",
  },
  {
    k: "04",
    t: "Anında program",
    d: "Hoca programı veya diyeti değiştirir. Üye yenileyince yeni liste hazırdır.",
  },
  {
    k: "05",
    t: "Ölçü konuşur",
    d: "Kilo, bel, kalça, kol. His değil, haftalık çizgi.",
  },
  {
    k: "06",
    t: "Kaçıranı gör",
    d: "Gelmeyen, öğün atan, serisi kırılan üye listede ayrı durur.",
  },
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
          <button className="btn btn-ghost" onClick={() => go("hoca")}>Hoca paneli</button>
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
            {brand.name}, üyelerinin antrenmanını, diyetini ve ilerlemesini tek yerde tutar.
            Üye salonda uygular. Hoca kim yolunda, kim koptu, anında görür.
          </p>
          <div className="cta-row">
            <button className="btn btn-lime btn-lg" onClick={() => go("uye")}>
              Üye olarak dene
            </button>
            <button className="btn btn-ghost btn-lg" onClick={() => go("hoca")}>
              Hocanın ekranı
            </button>
          </div>
          <p className="micro">Canlı demo. Şifre yok — üye Elif, hoca Murat.</p>
        </div>

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
          {perks.map((item) => (
            <article key={item.k} className="bento-card">
              <span>{item.k}</span>
              <h3>{item.t}</h3>
              <p>{item.d}</p>
            </article>
          ))}
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
          <p className="eyebrow">Hoca</p>
          <h2>Altı üye, tek bakış.</h2>
          <ul>
            <li>Uyumu düşen üye “dikkat” diye ayrılır.</li>
            <li>Bugün kaç set bitmiş, ekranda durur.</li>
            <li>Program ve diyet tek seçimle değişir.</li>
            <li>Not yazılır, üyenin ana sayfasına düşer.</li>
          </ul>
          <button className="btn btn-lime" onClick={() => go("hoca")}>Murat hocanın paneli</button>
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
          <p className="eyebrow">Göstermelik hazır</p>
          <h2>Önce üye ol, setleri işaretle. Sonra hoca ekranından aynı günü gör.</h2>
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
