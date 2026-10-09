import { useEffect, useMemo, useState } from "react";
import { dayNames, diets, programs, resolveDay, resolveDiet, setKey, threadOf, todayIndex } from "../data";
import { catalog, MoveArt, normalizeExercise } from "../moves.jsx";
import { Bars, Spark } from "../ui";
import { AppBar, Avatar } from "./Member";

export default function Coach(props) {
  const [filter, setFilter] = useState("tumu");
  const [selected, setSelected] = useState("elif");
  const [note, setNote] = useState("");
  const index = todayIndex();
  const members = props.state.members;
  const visible = members.filter((member) => filter === "tumu" || member.status === filter);
  const current = members.find((member) => member.id === selected) ?? visible[0] ?? members[0];
  const unread = members.reduce((sum, member) => sum + member.checkins.filter((item) => !item.read).length, 0);
  const attention = members.filter((member) => member.status === "dikkat").length;
  const avg = Math.round(members.reduce((sum, member) => sum + member.compliance, 0) / members.length);

  const todayDone = useMemo(() => {
    return members.filter((member) => {
      const plan = resolveDay(member, index);
      if (plan.kind === "rest") return false;
      return plan.exercises.some((_, i) => props.state.checks[setKey(member.id, member.programId, index, i)]);
    }).length;
  }, [members, props.state.checks, index]);

  function openMember(id) {
    setSelected(id);
    setNote("");
  }

  useEffect(() => {
    if (!current?.checkins.some((item) => !item.read)) return;
    props.markRead(current.id);
  }, [current]);

  return (
    <div className="app coach">
      <AppBar
        who="Hoca · Murat Yılmaz"
        alternate="Üye ekranı"
        onAlt={() => props.go("uye")}
        onHome={() => props.go("home")}
        onReset={props.reset}
      />

      <div className="coach-stats">
        <Stat k="Aktif üye" v={members.length} />
        <Stat k="Bugün sete giren" v={todayDone} />
        <Stat k="Dikkat" v={attention} warn />
        <Stat k="Okunmamış check-in" v={unread} />
        <Stat k="Ortalama uyum" v={`${avg}%`} />
      </div>

      <div className="coach-body">
        <section className="roster">
          <div className="filters">
            {[
              ["tumu", "Tümü"],
              ["dikkat", "Dikkat"],
              ["yeni", "Yeni"],
              ["yolunda", "Yolunda"],
            ].map(([id, label]) => (
              <button key={id} className={filter === id ? "on" : ""} onClick={() => setFilter(id)}>
                {label}
              </button>
            ))}
          </div>
          <ul>
            {visible.map((member) => {
              const plan = resolveDay(member, index);
              const total = plan.exercises.length;
              const done = plan.exercises.filter((_, i) => props.state.checks[setKey(member.id, member.programId, index, i)]).length;
              const fresh = member.checkins.some((item) => !item.read);
              return (
                <li key={member.id}>
                  <button className={current?.id === member.id ? "person on" : "person"} onClick={() => openMember(member.id)}>
                    <Avatar member={member} />
                    <span className="person-copy">
                      <strong>
                        {member.name}
                        {fresh && <i className="dot-live" />}
                      </strong>
                      <small>
                        {member.goal} · {plan.kind === "rest" ? "dinlenme" : `${done}/${total} set`}
                      </small>
                    </span>
                    <em className={`tag ${member.status}`}>{labelStatus(member.status)}</em>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        {current && (
          <MemberDetail
            member={current}
            index={index}
            checks={props.state.checks}
            meals={props.state.meals}
            note={note}
            setNote={setNote}
            onProgram={(programId) => props.setProgram(current.id, programId)}
            onDiet={(dietId) => props.setDiet(current.id, dietId)}
            onCustomDay={(dayIndex, day) => props.setCustomDay(current.id, dayIndex, day)}
            onCustomDiet={(diet) => props.setCustomDiet(current.id, diet)}
            onSend={() => {
              const text = note.trim();
              if (!text) return;
              props.addMessage(current.id, "hoca", text);
              setNote("");
            }}
          />
        )}
      </div>
    </div>
  );
}

function MemberDetail({ member, index, checks, meals, note, setNote, onProgram, onDiet, onCustomDay, onCustomDiet, onSend }) {
  const diet = resolveDiet(member);
  const [editDay, setEditDay] = useState(index);
  const plan = resolveDay(member, editDay);
  const done = plan.exercises.filter((_, i) => checks[setKey(member.id, member.programId, editDay, i)]).length;

  function save(exercises) {
    onCustomDay(editDay, {
      title: plan.title,
      duration: plan.duration,
      kind: plan.kind,
      exercises,
    });
  }

  function patchExercise(i, patch) {
    save(plan.exercises.map((item, idx) => (idx === i ? { ...item, ...patch } : item)));
  }

  function saveDiet(patch) {
    onCustomDiet({
      name: diet.name,
      kcal: diet.kcal,
      protein: diet.protein,
      carb: diet.carb,
      fat: diet.fat,
      water: diet.water,
      note: diet.note,
      meals: diet.meals,
      ...patch,
    });
  }
  const eaten = diet.meals.filter((_, i) => meals[`${member.id}:meal:${i}`]).length;
  const delta = (member.weight - member.startWeight).toFixed(1);

  return (
    <section className="detail">
      <header className="detail-head">
        <Avatar member={member} size="lg" />
        <div>
          <p className="eyebrow">
            {member.level} · {member.age} yaş · üye {member.joined}
          </p>
          <h1>{member.name}</h1>
          <p className="sub">
            {member.goal} · sonraki seans {member.nextSession}
          </p>
        </div>
        <div className="detail-kpis">
          <b>{member.compliance}%</b>
          <span>uyum</span>
          <Bars done={member.compliance} total={100} />
        </div>
      </header>

      <div className="assign">
        <label>
          Program
          <select value={member.programId} onChange={(event) => onProgram(event.target.value)}>
            {programs.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Diyet
          <select value={member.dietId} onChange={(event) => onDiet(event.target.value)}>
            {diets.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="duo">
        <article className="card assign-day">
          <header>
            <h2>Hareket ataması</h2>
            <span>{done}/{plan.exercises.length} işaret</span>
          </header>
          <div className="week">
            {["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"].map((name, i) => (
              <button key={name} type="button" className={i === editDay ? "on" : ""} onClick={() => setEditDay(i)}>
                <small>{name}</small>
              </button>
            ))}
          </div>
          <p className="hint">{dayNames[editDay]} · {plan.title}. Set, tekrar ve kiloyu yazınca üye ekranı değişir.</p>
          <div className="rx-list">
            {plan.exercises.map((item, i) => {
              const marked = Boolean(checks[setKey(member.id, member.programId, editDay, i)]);
              return (
                <div key={`${item.name}-${i}`} className={marked ? "rx done" : "rx"}>
                  <div className="rx-top">
                    <MoveArt name={item.name} />
                    <label>
                      Hareket
                      <select value={item.name} onChange={(event) => {
                        const picked = catalog.find((entry) => entry.name === event.target.value);
                        if (!picked) return;
                        patchExercise(i, { name: picked.name, weight: picked.weight, rest: picked.rest, note: picked.cue });
                      }}>
                        {!catalog.some((entry) => entry.name === item.name) && <option>{item.name}</option>}
                        {catalog.map((entry) => (
                          <option key={entry.name}>{entry.name}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                  {marked && <em className="tag yolunda">yaptı</em>}
                  <div className="rx-grid">
                    <label>Set<input inputMode="numeric" value={item.setsCount} onChange={(event) => patchExercise(i, { setsCount: event.target.value })} /></label>
                    <label>Tekrar<input inputMode="numeric" value={item.reps} onChange={(event) => patchExercise(i, { reps: event.target.value })} /></label>
                    <label>Kilo<input value={item.weight} onChange={(event) => patchExercise(i, { weight: event.target.value })} /></label>
                  </div>
                  <label>
                    Nasıl yapılır
                    <textarea rows={2} value={item.note} onChange={(event) => patchExercise(i, { note: event.target.value })} />
                  </label>
                  <button type="button" className="btn btn-text" onClick={() => save(plan.exercises.filter((_, idx) => idx !== i))} disabled={plan.exercises.length < 2}>
                    Hareketi kaldır
                  </button>
                </div>
              );
            })}
          </div>
          <button
            type="button"
            className="btn btn-lime"
            onClick={() => save([...plan.exercises, normalizeExercise({ name: "Squat", sets: "3 × 8" })])}
          >
            Hareket ekle
          </button>
        </article>
        <article className="card assign-day">
          <header>
            <h2>Diyet listesi</h2>
            <span>{eaten}/{diet.meals.length} yedi</span>
          </header>
          <p className="hint">Üstteki şablon iskelet. Öğünü, yemeği ve hedefi yazınca üyenin Beslenme ekranı değişir.</p>
          <div className="rx-grid macro-fields">
            <label>Kalori<input inputMode="numeric" value={diet.kcal} onChange={(event) => saveDiet({ kcal: event.target.value })} /></label>
            <label>Protein g<input inputMode="numeric" value={diet.protein} onChange={(event) => saveDiet({ protein: event.target.value })} /></label>
            <label>Karb g<input inputMode="numeric" value={diet.carb} onChange={(event) => saveDiet({ carb: event.target.value })} /></label>
            <label>Yağ g<input inputMode="numeric" value={diet.fat} onChange={(event) => saveDiet({ fat: event.target.value })} /></label>
            <label>Su bardak<input inputMode="numeric" value={diet.water} onChange={(event) => saveDiet({ water: event.target.value })} /></label>
          </div>
          <label className="diet-note">
            Hoca notu
            <textarea rows={2} value={diet.note} placeholder="Akşam pirinci azalt, acıkırsan yoğurt ekle." onChange={(event) => saveDiet({ note: event.target.value })} />
          </label>
          <div className="rx-list">
            {diet.meals.map((meal, i) => {
              const eatenMeal = Boolean(meals[`${member.id}:meal:${i}`]);
              return (
                <div key={`${meal.name}-${i}`} className={eatenMeal ? "rx done" : "rx"}>
                  <div className="rx-grid">
                    <label>Saat<input value={meal.time} onChange={(event) => saveDiet({ meals: diet.meals.map((item, idx) => idx === i ? { ...item, time: event.target.value } : item) })} /></label>
                    <label>Öğün<input value={meal.name} onChange={(event) => saveDiet({ meals: diet.meals.map((item, idx) => idx === i ? { ...item, name: event.target.value } : item) })} /></label>
                    <label>kcal<input inputMode="numeric" value={meal.kcal} onChange={(event) => saveDiet({ meals: diet.meals.map((item, idx) => idx === i ? { ...item, kcal: event.target.value } : item) })} /></label>
                  </div>
                  <label>
                    Ne yiyecek
                    <textarea rows={2} value={meal.items} onChange={(event) => saveDiet({ meals: diet.meals.map((item, idx) => idx === i ? { ...item, items: event.target.value } : item) })} />
                  </label>
                  <button
                    type="button"
                    className="btn btn-text"
                    disabled={diet.meals.length < 2}
                    onClick={() => saveDiet({ meals: diet.meals.filter((_, idx) => idx !== i) })}
                  >
                    Öğünü kaldır
                  </button>
                </div>
              );
            })}
          </div>
          <button
            type="button"
            className="btn btn-lime"
            onClick={() => saveDiet({ meals: [...diet.meals, { time: "15:00", name: "Ara öğün", items: "150 g yoğurt", kcal: 150 }] })}
          >
            Öğün ekle
          </button>
        </article>
      </div>

      <article className="card chart-card slim">
        <header>
          <h2>
            {member.weight} kg <small>({Number(delta) > 0 ? `+${delta}` : delta})</small>
          </h2>
          <span>hedef {member.targetWeight} kg</span>
        </header>
        <Spark values={member.weightHistory} up={member.goal.includes("Yağ") || member.weight <= member.startWeight} />
      </article>

      <div className="duo">
        <article className="card">
          <header>
            <h2>Check-in</h2>
          </header>
          <ul className="feed">
            {member.checkins.map((item) => (
              <li key={item.id}>
                <div>
                  <strong>{item.at}</strong>
                  {!item.read && <em>yeni</em>}
                </div>
                <p>{item.text}</p>
                <small>
                  Enerji {item.energy}/5 · uyku {item.sleep} sa · ağrı {item.soreness}/5
                </small>
              </li>
            ))}
          </ul>
        </article>
        <article className="card">
          <header>
            <h2>Mesaj</h2>
          </header>
          <form
            className="note-form"
            onSubmit={(event) => {
              event.preventDefault();
              onSend();
            }}
          >
            <textarea
              rows={3}
              value={note}
              placeholder="Elif’in ana sayfasına düşecek kısa not."
              onChange={(event) => setNote(event.target.value)}
            />
            <button className="btn btn-lime" type="submit">
              Üyeye gönder
            </button>
          </form>
          <ul className="feed notes">
            {threadOf(member).map((item) => (
              <li key={item.id}>
                <strong>{item.from === "uye" ? "Üye" : "Hoca"} · {item.at}</strong>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

function Stat({ k, v, warn }) {
  return (
    <article className={warn ? "stat warn" : "stat"}>
      <b>{v}</b>
      <span>{k}</span>
    </article>
  );
}

function labelStatus(status) {
  if (status === "dikkat") return "Dikkat";
  if (status === "yeni") return "Yeni";
  return "Yolunda";
}
