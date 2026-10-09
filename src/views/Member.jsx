import { useEffect, useState } from "react";
import { dayNames, formatLongDate, programById, records, resolveDay, resolveDiet, setKey, threadOf, todayIndex, waterGlasses } from "../data";
import { MoveArt } from "../moves.jsx";
import { Bars, Spark } from "../ui";

const DEMO_ID = "elif";
const tabs = [
  ["bugun", "Bugün"],
  ["program", "Program"],
  ["beslenme", "Beslenme"],
  ["ilerleme", "İlerleme"],
  ["mesaj", "Mesaj"],
];

export default function Member(props) {
  const member = props.state.members.find((item) => item.id === DEMO_ID);
  const [tab, setTab] = useState("bugun");
  const [rest, setRest] = useState(0);
  const program = programById(member.programId);
  const diet = resolveDiet(member);
  const index = todayIndex();
  const today = resolveDay(member, index);
  const setKeys = today.exercises.map((_, i) => setKey(member.id, member.programId, index, i));
  const doneSets = setKeys.filter((key) => props.state.checks[key]).length;
  const latest = threadOf(member).find((item) => item.from === "hoca");

  useEffect(() => {
    if (rest <= 0) return undefined;
    const id = setTimeout(() => setRest((value) => value - 1), 1000);
    return () => clearTimeout(id);
  }, [rest]);

  function markSet(key) {
    const turningOn = !props.state.checks[key];
    props.toggleCheck(key);
    if (turningOn) setRest(90);
  }

  return (
    <div className="app">
      <AppBar
        who="Elif Demir"
        alternate="Hoca paneli"
        onAlt={() => props.go("hoca")}
        onHome={() => props.go("home")}
        onReset={props.reset}
      />
      <div className="app-body">
        <aside className="side">
          <div className="who">
            <Avatar member={member} />
            <div>
              <strong>{member.name}</strong>
              <span>{member.goal}</span>
            </div>
          </div>
          <div className="side-stats">
            <div><b>{member.streak}</b><small>gün seri</small></div>
            <div><b>{member.compliance}%</b><small>uyum</small></div>
            <div><b>{member.weight}</b><small>kg</small></div>
          </div>
          <nav className="side-nav">
            {tabs.map(([id, label]) => (
              <button key={id} className={tab === id ? "on" : ""} onClick={() => setTab(id)}>{label}</button>
            ))}
          </nav>
        </aside>
        <main className="stage">
          {tab === "bugun" && (
            <Today
              member={member}
              today={today}
              index={index}
              doneSets={doneSets}
              diet={diet}
              water={props.state.water[member.id] ?? 0}
              note={latest}
              checks={props.state.checks}
              meals={props.state.meals}
              rest={rest}
              onSet={markSet}
              onRest={() => setRest(rest > 0 ? 0 : 90)}
              onMeal={props.toggleMeal}
              onWater={() => props.addWater(member.id)}
            />
          )}
          {tab === "program" && <Program member={member} program={program} index={index} />}
          {tab === "beslenme" && (
            <Diet diet={diet} member={member} meals={props.state.meals} onMeal={props.toggleMeal} />
          )}
          {tab === "ilerleme" && <Progress member={member} />}
          {tab === "mesaj" && <Chat member={member} onSend={props.addMessage} onCheckin={props.addCheckin} />}
        </main>
      </div>
      <nav className="dock">
        {tabs.map(([id, label]) => (
          <button key={id} className={tab === id ? "on" : ""} onClick={() => setTab(id)}>{label}</button>
        ))}
      </nav>
    </div>
  );
}

function Today({ member, today, index, doneSets, diet, water, note, checks, meals, rest, onSet, onRest, onMeal, onWater }) {
  const eaten = diet.meals.filter((_, i) => meals[`${member.id}:meal:${i}`]).length;
  return (
    <>
      <header className="stage-head">
        <div>
          <p className="eyebrow">{formatLongDate()}</p>
          <h1>{today.kind === "rest" ? "Dinlenme" : today.title}</h1>
          <p className="sub">{dayNames[index]} · {today.duration} · {member.nextSession}</p>
        </div>
        <div className="today-score">
          <strong>{doneSets}/{today.exercises.length}</strong>
          <span>set</span>
          <Bars done={doneSets} total={today.exercises.length} />
        </div>
      </header>

      {note && (
        <article className="callout">
          <small>Murat hoca · {note.at}</small>
          <p>{note.text}</p>
        </article>
      )}

      <div className={`timer ${rest > 0 ? "live" : ""}`}>
        <div>
          <b>{rest > 0 ? formatClock(rest) : "90 sn"}</b>
          <span>{rest > 0 ? "dinlenme" : "set arası"}</span>
        </div>
        <button className="btn btn-lime" onClick={onRest}>{rest > 0 ? "Sayacı kapat" : "Dinlenmeyi başlat"}</button>
      </div>

      <section className="stack">
        {today.exercises.map((item, i) => {
          const key = setKey(member.id, member.programId, index, i);
          const on = Boolean(checks[key]);
          return (
            <button key={key} className={on ? "lift done" : "lift"} onClick={() => onSet(key)}>
              <span className="tick" />
              <MoveArt name={item.name} />
              <span className="lift-main">
                <strong>{item.name}</strong>
                <em>{item.setsCount && item.reps ? `${item.setsCount} set · ${item.reps} tekrar` : item.sets} · {item.weight}</em>
                <small>{item.note}</small>
              </span>
              <span className="lift-meta">
                <b>{item.sets}</b>
                <small>{item.weight}</small>
              </span>
            </button>
          );
        })}
      </section>

      <section className="duo">
        <article className="card">
          <header>
            <h2>Öğünler</h2>
            <span>{eaten}/{diet.meals.length}</span>
          </header>
          <ul className="compact">
            {diet.meals.map((meal, i) => {
              const key = `${member.id}:meal:${i}`;
              const on = Boolean(meals[key]);
              return (
                <li key={key}>
                  <button className={on ? "row-check on" : "row-check"} onClick={() => onMeal(key)}>
                    <span className="tick" />
                    <span><b>{meal.time} · {meal.name}</b><small>{meal.items}</small><small>{meal.kcal} kcal</small></span>
                  </button>
                </li>
              );
            })}
          </ul>
        </article>
        <article className="card">
          <header>
            <h2>Su</h2>
            <span>{water}/{waterGlasses(diet)}</span>
          </header>
          <button className="glasses" onClick={onWater} aria-label="Bir bardak ekle">
            {Array.from({ length: waterGlasses(diet) }).map((_, i) => <i key={i} className={i < water ? "full" : ""} />)}
          </button>
          <p className="hint">Hedef {waterGlasses(diet)} bardak. Dokununca artar.</p>
        </article>
      </section>
    </>
  );
}

function Program({ member, program, index }) {
  const [day, setDay] = useState(index);
  const plan = resolveDay(member, day);
  return (
    <>
      <header className="stage-head">
        <div>
          <p className="eyebrow">{program.focus}</p>
          <h1>{program.name}</h1>
          <p className="sub">{program.weeks} hafta · hoca bunu panelden değiştirir</p>
        </div>
      </header>
      <div className="week">
        {["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"].map((name, i) => (
          <button key={name} className={i === day ? "on" : ""} onClick={() => setDay(i)}>
            <small>{name}</small>
            <b>{program.days[i].kind === "rest" ? "Dinlen" : program.days[i].kind === "light" ? "Hafif" : "İş"}</b>
          </button>
        ))}
      </div>
      <article className="card">
        <header>
          <h2>{dayNames[day]} · {plan.title}</h2>
          <span>{plan.duration}</span>
        </header>
        <ol className="sheet">
          {plan.exercises.map((item, i) => (
            <li key={`${item.name}-${i}`}>
              <MoveArt name={item.name} />
              <div>
                <strong>{item.name}</strong>
                <p>{item.note}</p>
              </div>
              <em>{item.sets}<small>{item.weight}</small></em>
            </li>
          ))}
        </ol>
      </article>
    </>
  );
}

function Diet({ diet, member, meals, onMeal }) {
  const eaten = diet.meals.filter((_, i) => meals[`${member.id}:meal:${i}`]).length;
  const ratio = eaten / diet.meals.length;
  return (
    <>
      <header className="stage-head">
        <div>
          <p className="eyebrow">Bugünün listesi</p>
          <h1>{diet.name}</h1>
          <p className="sub">Hocanın yazdığı liste. Yediğini işaretle, ekranında da dolar.</p>
        </div>
      </header>
      {diet.note && <p className="coach-note">{diet.note}</p>}
      <div className="macros">
        <Ring label="Kalori" value={diet.kcal} unit="kcal" pct={Math.round(ratio * 100)} />
        <Ring label="Protein" value={diet.protein} unit="g" pct={Math.min(100, Math.round(ratio * 100))} />
        <Ring label="Karb" value={diet.carb} unit="g" pct={Math.min(100, Math.round(ratio * 90))} />
        <Ring label="Yağ" value={diet.fat} unit="g" pct={Math.min(100, Math.round(ratio * 80))} />
      </div>
      <section className="stack">
        {diet.meals.map((meal, i) => {
          const key = `${member.id}:meal:${i}`;
          const on = Boolean(meals[key]);
          return (
            <button key={key} className={on ? "lift done" : "lift"} onClick={() => onMeal(key)}>
              <span className="tick" />
              <span className="lift-main">
                <strong>{meal.time} · {meal.name}</strong>
                <em>{meal.items}</em>
                <small>{meal.kcal} kcal</small>
              </span>
            </button>
          );
        })}
      </section>
    </>
  );
}

function Ring({ label, value, unit, pct }) {
  return (
    <article className="macro">
      <div className="ring" style={{ background: `conic-gradient(#d6ff3c ${pct}%, #2a2e22 0)` }}>
        <span>{pct}%</span>
      </div>
      <small>{label}</small>
      <strong>{value}<em>{unit}</em></strong>
    </article>
  );
}

function Progress({ member }) {
  const delta = (member.weight - member.startWeight).toFixed(1);
  const signed = Number(delta) > 0 ? `+${delta}` : delta;
  const rows = [
    ["Bel", member.startMeasurements.bel, member.measurements.bel],
    ["Kalça", member.startMeasurements.kalca, member.measurements.kalca],
    ["Kol", member.startMeasurements.kol, member.measurements.kol],
  ];
  const lifts = records[member.id] ?? [];
  return (
    <>
      <header className="stage-head">
        <div>
          <p className="eyebrow">Hedef {member.targetWeight} kg</p>
          <h1>{member.weight} kg</h1>
          <p className="sub">Başlangıç {member.startWeight} kg · {signed} kg</p>
        </div>
      </header>
      <article className="card chart-card">
        <header><h2>Kilo</h2><span>{member.weeks.at(0)} – {member.weeks.at(-1)}</span></header>
        <Spark values={member.weightHistory} up={member.weight <= member.startWeight} />
      </article>
      <div className="measure">
        {rows.map(([label, start, now]) => (
          <article key={label}>
            <small>{label}</small>
            <strong>{now}</strong>
            <span>{(now - start).toFixed(1)} cm</span>
          </article>
        ))}
      </div>
      <article className="card">
        <header><h2>Rekorlar</h2></header>
        <ul className="watch">
          {lifts.map((item) => (
            <li key={item.lift} className="on">
              <span className="tick" />
              <b>{item.lift}</b>
              <small>{item.value}</small>
            </li>
          ))}
        </ul>
      </article>
    </>
  );
}

function Chat({ member, onSend, onCheckin }) {
  const [text, setText] = useState("");
  const [energy, setEnergy] = useState(4);
  const [sent, setSent] = useState(false);
  const thread = threadOf(member);
  return (
    <>
      <header className="stage-head">
        <div>
          <p className="eyebrow">Murat hoca</p>
          <h1>Mesaj</h1>
          <p className="sub">Yazdığın satır hoca panelinde aynı anda durur.</p>
        </div>
      </header>
      <ul className="thread">
        {thread.map((item) => (
          <li key={item.id} className={item.from === "uye" ? "mine" : ""}>
            <small>{item.from === "uye" ? "Sen" : "Hoca"} · {item.at}</small>
            <p>{item.text}</p>
          </li>
        ))}
      </ul>
      <form
        className="composer"
        onSubmit={(event) => {
          event.preventDefault();
          const value = text.trim();
          if (!value) return;
          onSend(member.id, "uye", value);
          setText("");
        }}
      >
        <input value={text} placeholder="Hocaya yaz" onChange={(event) => setText(event.target.value)} />
        <button className="btn btn-lime" type="submit">Gönder</button>
      </form>
      <form
        className="card form"
        onSubmit={(event) => {
          event.preventDefault();
          onCheckin(member.id, { energy, sleep: 7, soreness: 2, text: "Gün sonu check-in." });
          setSent(true);
        }}
      >
        <Scale label="Enerji" value={energy} max={5} onChange={setEnergy} />
        <button className="btn btn-ghost" type="submit">Check-in bırak</button>
        {sent && <p className="ok">Check-in hocaya gitti.</p>}
      </form>
    </>
  );
}

function Scale({ label, value, max, onChange }) {
  return (
    <div className="field">
      <span>{label} · {value}/{max}</span>
      <div className="scale">
        {Array.from({ length: max }).map((_, i) => (
          <button type="button" key={i} className={i < value ? "on" : ""} onClick={() => onChange(i + 1)}>{i + 1}</button>
        ))}
      </div>
    </div>
  );
}

function formatClock(total) {
  const m = Math.floor(total / 60);
  const s = String(total % 60).padStart(2, "0");
  return `${m}:${s}`;
}

export function AppBar({ who, alternate, onAlt, onHome, onReset }) {
  return (
    <header className="appbar">
      <button className="brand-mark" onClick={onHome}>
        <span>M</span>
        Murat PT
      </button>
      <div className="appbar-actions">
        <span className="who-pill">{who}</span>
        {alternate ? <button className="btn btn-ghost" onClick={onAlt}>{alternate}</button> : null}
        <button className="btn btn-text" onClick={onReset}>Sıfırla</button>
      </div>
    </header>
  );
}

export function Avatar({ member, size = "" }) {
  return <div className={`avatar ${member.tone} ${size}`}>{member.initials}</div>;
}
