import { useEffect, useMemo, useState } from "react";
import { dayNames, dayPlan, dietById, diets, programById, programs, setKey, todayIndex } from "../data";
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
      const plan = dayPlan(programById(member.programId), index);
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
              const plan = dayPlan(programById(member.programId), index);
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
            onSend={() => {
              const text = note.trim();
              if (!text) return;
              props.addNote(current.id, text);
              setNote("");
            }}
          />
        )}
      </div>
    </div>
  );
}

function MemberDetail({ member, index, checks, meals, note, setNote, onProgram, onDiet, onSend }) {
  const program = programById(member.programId);
  const diet = dietById(member.dietId);
  const plan = dayPlan(program, index);
  const done = plan.exercises.filter((_, i) => checks[`${member.id}:${index}:${i}`]).length;
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
        <article className="card">
          <header>
            <h2>
              {dayNames[index]} · {plan.title}
            </h2>
            <span>
              {done}/{plan.exercises.length} set
            </span>
          </header>
          <ul className="watch">
            {plan.exercises.map((item, i) => {
              const on = Boolean(checks[setKey(member.id, member.programId, index, i)]);
              return (
                <li key={item.name} className={on ? "on" : ""}>
                  <span className="tick" />
                  <b>{item.name}</b>
                  <small>{item.sets}</small>
                </li>
              );
            })}
          </ul>
        </article>
        <article className="card">
          <header>
            <h2>Diyet uyumu</h2>
            <span>
              {eaten}/{diet.meals.length} öğün
            </span>
          </header>
          <ul className="watch">
            {diet.meals.map((meal, i) => {
              const on = Boolean(meals[`${member.id}:meal:${i}`]);
              return (
                <li key={meal.name} className={on ? "on" : ""}>
                  <span className="tick" />
                  <b>{meal.name}</b>
                  <small>{meal.time}</small>
                </li>
              );
            })}
          </ul>
          <p className="hint">Üye ekranından işaretlenince burası dolar. Programı değiştir, üye ekranına dön.</p>
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
            <h2>Hoca notu</h2>
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
            {member.notes.map((item) => (
              <li key={item.id}>
                <strong>{item.at}</strong>
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
