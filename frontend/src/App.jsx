import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext.jsx'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'

const HomePage = lazy(() => import('./pages/Home').then(m => ({ default: m.HomePage })))
const WalksPage = lazy(() => import('./pages/Walks').then(m => ({ default: m.WalksPage })))
const WalkDetailPage = lazy(() => import('./pages/WalkDetail').then(m => ({ default: m.WalkDetailPage })))
const AboutPage = lazy(() => import('./pages/About').then(m => ({ default: m.AboutPage })))
const GalleryPage = lazy(() => import('./pages/Gallery').then(m => ({ default: m.GalleryPage })))
const ContactPage = lazy(() => import('./pages/Contact').then(m => ({ default: m.ContactPage })))
const BookingPage = lazy(() => import('./pages/Booking').then(m => ({ default: m.BookingPage })))

const PageLoader = () => <div className="flex min-h-[50vh] items-center justify-center"><div className="h-9 w-9 animate-spin rounded-full border-2 border-terracotta/20 border-t-terracotta" aria-label="Loading"/></div>
const NotFoundPage = () => <main className="flex min-h-[65vh] flex-col items-center justify-center px-6 text-center"><p className="eyebrow">404 · Page not found</p><h1 className="mt-4 font-cinzel text-5xl text-brown">Lost in the lanes?</h1><p className="mt-4 max-w-md text-brown/60">This page may have moved. Let’s take you back to the stories.</p><Link to="/" className="mt-7 rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-white">Back to home</Link></main>

function App() {
  return <LanguageProvider><BrowserRouter><Header/><Suspense fallback={<PageLoader/>}><Routes>
    <Route path="/" element={<HomePage/>}/><Route path="/heritage-walks" element={<WalksPage/>}/><Route path="/heritage-walks/:slug" element={<WalkDetailPage/>}/><Route path="/about" element={<AboutPage/>}/><Route path="/gallery" element={<GalleryPage/>}/><Route path="/contact" element={<ContactPage/>}/><Route path="/book-a-walk" element={<BookingPage/>}/><Route path="*" element={<NotFoundPage/>}/>
  </Routes></Suspense><Footer/></BrowserRouter></LanguageProvider>
}
export default App
