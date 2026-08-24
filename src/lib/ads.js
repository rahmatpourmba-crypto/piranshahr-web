import { collection, addDoc, getDocs, query, where, orderBy, serverTimestamp, deleteDoc, doc } from 'firebase/firestore'
import { db } from './firebase'

const ADS_COLLECTION = 'ads'

export async function submitAd({ title, category, description, price, city, province, phone, userId, userName }) {
  return addDoc(collection(db, ADS_COLLECTION), {
    title, category, description, price: price || null,
    city, province, phone, userId, userName,
    createdAt: serverTimestamp(),
    views: 0,
  })
}

export async function getAds({ category, city, province, search } = {}) {
  let q = query(collection(db, ADS_COLLECTION), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  let ads = snap.docs.map(d => ({ id: d.id, ...d.data() }))

  if (province) ads = ads.filter(a => a.province === province)
  if (city) ads = ads.filter(a => a.city === city)
  if (category && category !== 'همه') ads = ads.filter(a => a.category === category)
  if (search) {
    const s = search.toLowerCase()
    ads = ads.filter(a => a.title?.toLowerCase().includes(s) || a.description?.toLowerCase().includes(s) || a.category?.toLowerCase().includes(s))
  }
  return ads
}

export async function getUserAds(userId) {
  const q = query(collection(db, ADS_COLLECTION), where('userId', '==', userId), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export async function deleteAd(adId) {
  return deleteDoc(doc(db, ADS_COLLECTION, adId))
}
