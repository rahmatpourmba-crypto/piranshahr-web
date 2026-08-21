const STORAGE_KEY = "viewHistory";
const MAX_HISTORY = 20;

function parseHistory(raw) {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

export function trackView(adId, category = null) {
  if (typeof window === "undefined" || adId == null) return;
  try {
    const history = getHistory().filter(
      (item) => (item && typeof item === "object" ? item.id : item) !== adId
    );
    history.unshift({ id: adId, category: category ?? null, timestamp: Date.now() });
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(history.slice(0, MAX_HISTORY))
    );
  } catch (error) {
    return;
  }
}

export function getHistory() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? parseHistory(raw) : [];
  } catch (error) {
    return [];
  }
}

export function clearHistory() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    return;
  }
}

export function getTopCategories() {
  const counts = {};
  getHistory().forEach((item) => {
    const category = item && typeof item === "object" ? item.category : null;
    if (category) {
      counts[category] = (counts[category] || 0) + 1;
    }
  });
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([category]) => category);
}
