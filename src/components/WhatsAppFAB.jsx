import { MessageCircle } from 'lucide-react'

export default function WhatsAppFAB() {
  return (
    <a href="https://wa.me/989141688217" target="_blank" rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-40 bg-[#25D366] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
      aria-label="پشتیبانی واتساپ">
      <MessageCircle size={22} fill="white" stroke="white" />
    </a>
  )
}
