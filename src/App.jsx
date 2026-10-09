import { useEffect, useState } from "react";
import { freshState, loadState, saveState } from "./storage";
import Landing from "./views/Landing";
import Member from "./views/Member";
import Coach from "./views/Coach";

function viewFromLocation() {
  const path = location.pathname.replace(/\/+$/, "") || "/";
  if (path.endsWith("/uye")) return "uye";
  if (path.endsWith("/hoca")) return "hoca";
  const hash = location.hash.replace("#", "");
  if (hash === "uye" || hash === "hoca") return hash;
  return "home";
}

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

export default function App() {
  const [state, setState] = useState(loadState);
  const [view, setView] = useState(viewFromLocation);

  useEffect(() => {
    saveState(state);
  }, [state]);

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash === "uye" || hash === "hoca") {
      history.replaceState(null, "", `/${hash}`);
    }
    const sync = () => setView(viewFromLocation());
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  function go(next) {
    const path = next === "home" ? "/" : `/${next}`;
    history.pushState(null, "", path);
    setView(next);
    window.scrollTo(0, 0);
  }

  function patchMember(id, recipe) {
    setState((current) => ({
      ...current,
      members: current.members.map((member) => (member.id === id ? recipe(member) : member)),
    }));
  }

  function toggleKey(bucket, key) {
    setState((current) => ({
      ...current,
      [bucket]: { ...current[bucket], [key]: !current[bucket][key] },
    }));
  }

  const api = {
    state,
    go,
    toggleCheck: (key) => toggleKey("checks", key),
    toggleMeal: (key) => toggleKey("meals", key),
    addWater: (id) =>
      setState((current) => ({
        ...current,
        water: { ...current.water, [id]: ((current.water[id] ?? 0) + 1) % 9 },
      })),
    addCheckin: (id, payload) =>
      patchMember(id, (member) => ({
        ...member,
        checkins: [{ id: uid(), ...payload, at: "Bugün", read: false }, ...member.checkins],
      })),
    addNote: (id, text) =>
      patchMember(id, (member) => ({
        ...member,
        notes: [{ id: uid(), text, at: "Bugün", from: "hoca" }, ...member.notes],
      })),
    setProgram: (id, programId) => patchMember(id, (member) => ({ ...member, programId })),
    setDiet: (id, dietId) => patchMember(id, (member) => ({ ...member, dietId })),
    markRead: (id) =>
      patchMember(id, (member) => ({
        ...member,
        checkins: member.checkins.map((item) => ({ ...item, read: true })),
      })),
    reset: () => setState(freshState()),
  };

  if (view === "uye") return <Member {...api} />;
  if (view === "hoca") return <Coach {...api} />;
  return <Landing {...api} />;
}
