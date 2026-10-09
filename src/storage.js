import { seedState } from "./data";

const KEY = "murat-pt-hoca-v1";

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return seedState();
    const saved = JSON.parse(raw);
    if (!saved?.members?.length) return seedState();
    return saved;
  } catch {
    return seedState();
  }
}

export function saveState(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function freshState() {
  localStorage.removeItem(KEY);
  return seedState();
}
