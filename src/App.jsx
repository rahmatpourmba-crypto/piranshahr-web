import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppFAB from './components/WhatsAppFAB'
import AuthModal from './components/AuthModal'
import ProfileModal from './components/ProfileModal'
import Home from './pages/Home'
import Ads from './pages/Ads'
import Drivers from './pages/Drivers'
import CargoTransport from './pages/CargoTransport'
import Taxi from './pages/Taxi'
import About from './pages/About'
import Submit from './pages/Submit'
import PayIrCallback from './pages/PayIrCallback'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }) }, [pathname])
  return null
}

export default function App() {
  const [showAuth, setShowAuth] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col scroll-smooth">
          <ScrollToTop />
          <Header onOpenAuth={() => setShowAuth(true)} onOpenProfile={() => setShowProfile(true)} />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ads" element={<Ads />} />
              <Route path="/drivers" element={<Drivers />} />
              <Route path="/cargo" element={<CargoTransport />} />
              <Route path="/taxi" element={<Taxi />} />
              <Route path="/about" element={<About />} />
              <Route path="/submit" element={<Submit />} />
              <Route path="/payir-callback" element={<PayIrCallback />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppFAB />
          <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
          <ProfileModal isOpen={showProfile} onClose={() => setShowProfile(false)} />
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}
