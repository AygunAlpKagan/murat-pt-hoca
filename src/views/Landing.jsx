import { brand } from "../data";

const features = [
  ["01", "Antrenman", "Set, tekrar ve dinlenme sayacı. Salonda telefonu aç, hareketi işaretle."],
  ["02", "Beslenme", "Öğün listesi ve makro. Yediğini işaretle, hedef kalori görünür kalsın."],
  ["03", "Program", "Haftalık split. Hoca değiştirince yeni gün aynı ekrana düşer."],
  ["04", "Rekor", "Squat, bench, hip thrust. Kişisel en iyiler kaybolmaz."],
  ["05", "Mesaj", "Hocayla kısa yazışma ve gün sonu check-in. Tek yerde."],
  ["06", "Ölçü", "Kilo çizgisi, bel, kalça, kol. Haftalık, his değil."],
];

export default function Landing({ go }) {
  return (
    <div className="site">
      <header className="topnav">
        <button className="brand-mark" onClick={() => go("home")}>
          <span>M</span>
          Murat PT
        </button>
        <nav className="top-links">
          <a href="#ozellik">Özellikler</a>
        </nav>
        <div className="nav-actions">
          <button className="btn btn-ghost" onClick={() => go("hoca")}>Hoca paneli</button>
          <button className="btn btn-lime" onClick={() => go("uye")}>Üye paneli</button>
        </div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Gym coach</p>
          <h1>
            Bugünün
            <br />
            antrenmanı
            <br />
            cebinde.
          </h1>
          <p className="lede">
            {brand.name}, salona giren üye için program, öğün, rekor ve hocayla mesajı tek uygulamada tutar.
            Demo açık. İkisini de gez.
          </p>
          <div className="doors">
            <button className="door" onClick={() => go("uye")}>
              <small>Üye</small>
              <strong>Elif’in günü</strong>
              <span>Antrenman, öğün, ölçü, mesaj</span>
            </button>
            <button className="door quiet" onClick={() => go("hoca")}>
              <small>Hoca</small>
              <strong>Murat’ın paneli</strong>
              <span>Üyeler, program atama, yanıt</span>
            </button>
          </div>
        </div>
        <figure className="mural">
          <img src="/hero-mural.jpg" alt="Grafiti tarzında halter tutan kaslı sporcu" />
        </figure>
      </section>

      <section className="section" id="ozellik">
        <div className="section-head">
          <p className="eyebrow">Uygulamada ne var</p>
          <h2>Antrenman, tabak, rekor, mesaj.</h2>
        </div>
        <div className="features">
          {features.map(([k, t, d]) => (
            <article key={k}>
              <span>{k}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="steps">
        <article>
          <b>1</b>
          <h3>Üye olarak gir</h3>
          <p>Bugünkü hareketleri işaretle. İstersen 90 saniyelik dinlenme sayacını başlat.</p>
        </article>
        <article>
          <b>2</b>
          <h3>Öğünü ve mesajı bırak</h3>
          <p>Yediğini işaretle, hocana bir satır yaz. Check-in enerji ve uykuyu da götürür.</p>
        </article>
        <article>
          <b>3</b>
          <h3>Hoca panelinden gör</h3>
          <p>Aynı setler, öğünler ve mesaj Murat’ın ekranında. Programı oradan değiştir.</p>
        </article>
      </section>

      <footer className="site-foot">
        <strong>{brand.name}</strong>
        <span>{brand.coach}</span>
        <button className="btn btn-lime" onClick={() => go("uye")}>Demoyu aç</button>
      </footer>
    </div>
  );
}
