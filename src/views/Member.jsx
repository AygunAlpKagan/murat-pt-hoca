import { useState } from "react";
import { dayNames, dayPlan, dietById, formatLongDate, programById, setKey, todayIndex } from "../data";
import { Bars, Spark } from "../ui";

const DEMO_ID = "elif";
const tabs = [
  ["bugun", "Bugün"],
  ["program", "Program"],
  ["diyet", "Diyet"],
  ["ilerleme", "İlerleme"],
  ["checkin", "Check-in"],
];

export default function Member(props) {
  const member = props.state.members.find((item) => item.id === DEMO_ID);
  const [tab, setTab] = useState("bugun");
  const [sent, setSent] = useState(false);
  const program = programById(member.programId);
  const diet = dietById(member.dietId);
  const index = todayIndex();
  const today = dayPlan(program, index);
  const setKeys = today.exercises.map((_, i) => setKey(member.id, member.programId, index, i));
  const doneSets = setKeys.filter((key) => props.state.checks[key]).length;
  const mealKeys = diet.meals.map((_, i) => `${member.id}:meal:${i}`);
  const doneMeals = mealKeys.filter((key) => props.state.meals[key]).length;
  const water = props.state.water[member.id] ?? 0;
  const latestNote = member.notes[0];

  return (
    <div className="app">
      <AppBar
        who="Üye · Elif Demir"
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
            <div>
              <b>{member.streak}</b>
              <small>gün seri</small>
            </div>
            <div>
              <b>{member.compliance}%</b>
              <small>uyum</small>
            </div>
            <div>
              <b>{member.weight}</b>
              <small>kg</small>
            </div>
          </div>
          <nav className="side-nav">
            {tabs.map(([id, label]) => (
              <button key={id} className={tab === id ? "on" : ""} onClick={() => setTab(id)}>
                {label}
              </button>
            ))}
          </nav>
          {latestNote && (
            <div className="side-note">
              <small>Hocadan</small>
              <p>{latestNote.text}</p>
            </div>
          )}
        </aside>

        <main className="stage">
          {tab === "bugun" && (
            <Today
              member={member}
              today={today}
              index={index}
              doneSets={doneSets}
              doneMeals={doneMeals}
              diet={diet}
              water={water}
              note={latestNote}
              checks={props.state.checks}
              meals={props.state.meals}
              onSet={props.toggleCheck}
              onMeal={props.toggleMeal}
              onWater={() => props.addWater(member.id)}
            />
          )}
          {tab === "program" && <Program program={program} index={index} />}
          {tab === "diyet" && (
            <Diet
              diet={diet}
              member={member}
              meals={props.state.meals}
              onMeal={props.toggleMeal}
            />
          )}
          {tab === "ilerleme" && <Progress member={member} />}
          {tab === "checkin" && (
            <Checkin
              sent={sent}
              latest={member.checkins[0]}
              onSubmit={(payload) => {
                props.addCheckin(member.id, payload);
                setSent(true);
              }}
            />
          )}
        </main>
      </div>

      <nav className="dock">
        {tabs.map(([id, label]) => (
          <button key={id} className={tab === id ? "on" : ""} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
}

function Today({ member, today, index, doneSets, doneMeals, diet, water, note, checks, meals, onSet, onMeal, onWater }) {
  return (
    <>
      <header className="stage-head">
        <div>
          <p className="eyebrow">{formatLongDate()}</p>
          <h1>{today.kind === "rest" ? "Bugün dinlenme." : today.title}</h1>
          <p className="sub">
            {dayNames[index]} · {today.duration} · {member.nextSession}
          </p>
        </div>
        <div className="today-score">
          <strong>
            {doneSets}/{today.exercises.length}
          </strong>
          <span>set tamam</span>
          <Bars done={doneSets} total={today.exercises.length} />
        </div>
      </header>

      {note && (
        <article className="callout">
          <small>Murat hoca · {note.at}</small>
          <p>{note.text}</p>
        </article>
      )}

      <section className="stack">
        {today.exercises.map((item, i) => {
          const key = setKey(member.id, member.programId, index, i);
          const on = Boolean(checks[key]);
          return (
            <button key={key} className={on ? "lift done" : "lift"} onClick={() => onSet(key)}>
              <span className="tick" aria-hidden="true" />
              <span className="lift-main">
                <strong>{item.name}</strong>
                <em>{item.note}</em>
              </span>
              <span className="lift-meta">
                <b>{item.sets}</b>
                <small>{item.rest === "—" ? "dinlenme" : `${item.rest} ara`}</small>
              </span>
            </button>
          );
        })}
      </section>

      <section className="duo">
        <article className="card">
          <header>
            <h2>Bugünün öğünleri</h2>
            <span>
              {doneMeals}/{diet.meals.length}
            </span>
          </header>
          <ul className="compact">
            {diet.meals.map((meal, i) => {
              const key = `${member.id}:meal:${i}`;
              const on = Boolean(meals[key]);
              return (
                <li key={key}>
                  <button className={on ? "row-check on" : "row-check"} onClick={() => onMeal(key)}>
                    <span className="tick" />
                    <span>
                      <b>{meal.name}</b>
                      <small>{meal.time}</small>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </article>
        <article className="card water-card">
          <header>
            <h2>Su</h2>
            <span>{water}/8 bardak</span>
          </header>
          <button className="glasses" onClick={onWater} aria-label="Bir bardak ekle">
            {Array.from({ length: 8 }).map((_, i) => (
              <i key={i} className={i < water ? "full" : ""} />
            ))}
          </button>
          <p>Dokun, bardak ekle. Sekizde sıfırlanır.</p>
        </article>
      </section>
    </>
  );
}

function Program({ program, index }) {
  const [day, setDay] = useState(index);
  const plan = program.days[day];
  return (
    <>
      <header className="stage-head">
        <div>
          <p className="eyebrow">{program.focus}</p>
          <h1>{program.name}</h1>
          <p className="sub">{program.weeks} hafta · hoca bu programı istediği an değiştirir</p>
        </div>
      </header>
      <div className="week">
        {dayNames.map((name, i) => (
          <button key={name} className={i === day ? "on" : ""} onClick={() => setDay(i)}>
            <small>{name.slice(0, 3)}</small>
            <b>{program.days[i].kind === "rest" ? "Dinlen" : program.days[i].kind === "light" ? "Hafif" : "Antrenman"}</b>
          </button>
        ))}
      </div>
      <article className="card day-sheet">
        <header>
          <h2>
            {dayNames[day]} · {plan.title}
          </h2>
          <span>{plan.duration}</span>
        </header>
        <ol className="sheet">
          {plan.exercises.map((item, i) => (
            <li key={item.name}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <strong>{item.name}</strong>
                <p>{item.note}</p>
              </div>
              <em>
                {item.sets}
                <small>{item.rest}</small>
              </em>
            </li>
          ))}
        </ol>
      </article>
    </>
  );
}

function Diet({ diet, member, meals, onMeal }) {
  return (
    <>
      <header className="stage-head">
        <div>
          <p className="eyebrow">Kişisel liste</p>
          <h1>{diet.name}</h1>
          <p className="sub">Yenilen öğünü işaretle. Hoca panelinde aynı işaret görünür.</p>
        </div>
      </header>
      <div className="macros">
        <Macro label="Kalori" value={diet.kcal} unit="kcal" />
        <Macro label="Protein" value={diet.protein} unit="g" />
        <Macro label="Karbonhidrat" value={diet.carb} unit="g" />
        <Macro label="Yağ" value={diet.fat} unit="g" />
      </div>
      <section className="stack">
        {diet.meals.map((meal, i) => {
          const key = `${member.id}:meal:${i}`;
          const on = Boolean(meals[key]);
          return (
            <button key={key} className={on ? "lift done" : "lift"} onClick={() => onMeal(key)}>
              <span className="tick" />
              <span className="lift-main">
                <strong>
                  {meal.time} · {meal.name}
                </strong>
                <em>{meal.items}</em>
              </span>
              <span className="lift-meta">
                <b>{meal.kcal}</b>
                <small>kcal</small>
              </span>
            </button>
          );
        })}
      </section>
    </>
  );
}

function Macro({ label, value, unit }) {
  return (
    <article className="macro">
      <small>{label}</small>
      <strong>
        {value}
        <span>{unit}</span>
      </strong>
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
  return (
    <>
      <header className="stage-head">
        <div>
          <p className="eyebrow">Hedef {member.targetWeight} kg</p>
          <h1>{member.weight} kg</h1>
          <p className="sub">
            Başlangıç {member.startWeight} kg · değişim {signed} kg
          </p>
        </div>
      </header>
      <article className="card chart-card">
        <header>
          <h2>Kilo çizgisi</h2>
          <span>{member.weeks.at(0)} – {member.weeks.at(-1)}</span>
        </header>
        <Spark values={member.weightHistory} up={member.weight <= member.startWeight} />
        <div className="week-labels">
          {member.weeks.map((week) => (
            <span key={week}>{week}</span>
          ))}
        </div>
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
    </>
  );
}

function Checkin({ onSubmit, sent, latest }) {
  const [energy, setEnergy] = useState(4);
  const [sleep, setSleep] = useState(7);
  const [soreness, setSoreness] = useState(2);
  const [text, setText] = useState("");

  return (
    <>
      <header className="stage-head">
        <div>
          <p className="eyebrow">Hocaya gün sonu</p>
          <h1>Bugün nasıldı?</h1>
          <p className="sub">Gönderince Murat hocanın panelinde okunmamış olarak durur.</p>
        </div>
      </header>
      <form
        className="card form"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit({ energy, sleep, soreness, text: text.trim() || "Not yok." });
          setText("");
        }}
      >
        <Scale label="Enerji" value={energy} max={5} onChange={setEnergy} />
        <label className="field">
          Uyku (saat)
          <input
            type="number"
            min="0"
            max="12"
            step="0.5"
            value={sleep}
            onChange={(event) => setSleep(Number(event.target.value))}
          />
        </label>
        <Scale label="Kas ağrısı" value={soreness} max={5} onChange={setSoreness} />
        <label className="field">
          Hocaya not
          <textarea
            rows={3}
            value={text}
            placeholder="Örn. Squat inişi rahattı, akşam öğününü erteledim."
            onChange={(event) => setText(event.target.value)}
          />
        </label>
        <button className="btn btn-lime" type="submit">
          Check-in gönder
        </button>
        {sent && <p className="ok">Gitti. Hoca panelinden Elif’i aç, not orada.</p>}
      </form>
      {latest && (
        <article className="card quiet">
          <small>Son check-in · {latest.at}</small>
          <p>{latest.text}</p>
          <span>
            Enerji {latest.energy}/5 · uyku {latest.sleep} sa · ağrı {latest.soreness}/5
          </span>
        </article>
      )}
    </>
  );
}

function Scale({ label, value, max, onChange }) {
  return (
    <div className="field">
      <span>
        {label} · {value}/{max}
      </span>
      <div className="scale">
        {Array.from({ length: max }).map((_, i) => (
          <button
            type="button"
            key={i}
            className={i < value ? "on" : ""}
            onClick={() => onChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
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
        <button className="btn btn-ghost" onClick={onAlt}>
          {alternate}
        </button>
        <button className="btn btn-text" onClick={onReset}>
          Sıfırla
        </button>
      </div>
    </header>
  );
}

export function Avatar({ member, size = "" }) {
  return <div className={`avatar ${member.tone} ${size}`}>{member.initials}</div>;
}
