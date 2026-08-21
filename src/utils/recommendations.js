const RELATED_CATEGORIES = {
  "فروش": ["معاوضه غذا", "معاوضه کالا", "املاک", "خودرو"],
  "معاوضه غذا": ["فروش", "رایگان"],
  "معاوضه کالا": ["فروش", "خودرو"],
  "رایگان": ["معاوضه غذا", "گمشده", "پیداشده"],
  "استخدام": ["درخواست نیرو", "خدمات"],
  "درخواست نیرو": ["استخدام", "خدمات"],
  "گمشده": ["پیداشده", "رایگان"],
  "پیداشده": ["گمشده", "رایگان"],
  "نوبت خالی": ["استخدام", "خدمات"],
  "املاک": ["فروش", "خودرو"],
  "خودرو": ["فروش", "املاک", "معاوضه کالا"],
  "خدمات": ["استخدام", "درخواست نیرو"]
};

const URGENT_TYPES = ["رایگان", "گمشده", "پیداشده"];

function premiumSort(a, b) {
  const order = { 'فوری': 3, 'ویژه': 2, 'بالای صفحه': 1 }
  return (order[b.premium] || 0) - (order[a.premium] || 0)
}

export function getRelatedCategories(category) {
  return RELATED_CATEGORIES[category] || [];
}

export function getRecommendations(currentAd, allAds) {
  if (!currentAd || !Array.isArray(allAds)) {
    return { sameCategory: [], related: [] };
  }
  const others = allAds.filter((ad) => ad && ad.id !== currentAd.id);
  const sameCategory = others
    .filter((ad) => ad.category === currentAd.category)
    .sort(premiumSort)
    .slice(0, 3);
  const relatedCats = getRelatedCategories(currentAd.category);
  let related = others.filter(
    (ad) => ad.category !== currentAd.category && relatedCats.includes(ad.category)
  );
  if (related.length < 3) {
    const extra = others.filter(
      (ad) => ad.category !== currentAd.category && !related.includes(ad)
    );
    related = related.concat(extra);
  }
  return { sameCategory, related: related.sort(premiumSort).slice(0, 3) };
}

export function getPopularAds(allAds) {
  if (!Array.isArray(allAds)) return [];
  return [...allAds]
    .sort((a, b) => premiumSort(a, b) || String(b.date).localeCompare(String(a.date)))
    .slice(0, 6);
}

export function getUrgentAds(allAds) {
  if (!Array.isArray(allAds)) return [];
  return allAds
    .filter(
      (ad) =>
        ad.premium === 'فوری' ||
        URGENT_TYPES.includes(ad.type) || URGENT_TYPES.includes(ad.category)
    )
    .sort((a, b) => premiumSort(a, b) || String(b.date).localeCompare(String(a.date)))
    .slice(0, 4);
}

export function getSmartSuggestions(history, allAds) {
  if (!Array.isArray(history) || !Array.isArray(allAds)) return [];
  const categoryCounts = {};
  const viewedIds = new Set();
  history.forEach((entry) => {
    const id = entry && typeof entry === "object" ? entry.id : entry;
    if (id == null) return;
    viewedIds.add(id);
    let category = entry && typeof entry === "object" ? entry.category : null;
    if (!category) {
      const ad = allAds.find((item) => item.id === id);
      category = ad ? ad.category : null;
    }
    if (category) {
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    }
  });
  if (viewedIds.size === 0) return [];
  return [...allAds]
    .filter((ad) => !viewedIds.has(ad.id))
    .sort((a, b) =>
      premiumSort(a, b) ||
      (categoryCounts[b.category] || 0) - (categoryCounts[a.category] || 0)
    )
    .slice(0, 4);
}

export function sortAdsByPremium(ads) {
  if (!Array.isArray(ads)) return []
  return [...ads].sort(premiumSort)
}
