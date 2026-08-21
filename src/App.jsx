import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Ads from './pages/Ads'
import Drivers from './pages/Drivers'
import CargoTransport from './pages/CargoTransport'
import Taxi from './pages/Taxi'
import About from './pages/About'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [pathname])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col scroll-smooth">
        <ScrollToTop />
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ads" element={<Ads />} />
            <Route path="/drivers" element={<Drivers />} />
            <Route path="/cargo" element={<CargoTransport />} />
            <Route path="/taxi" element={<Taxi />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
