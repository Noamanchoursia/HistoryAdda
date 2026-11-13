import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { X, Images, ZoomIn } from 'lucide-react'
import { Container } from '../components/layout/Container'
import { galleryApi } from '../services/galleryApi'

const localGallery = Array.from({ length: 6 }, (_, index) => ({
  id: `local-gallery-${index + 1}`,
  category: 'gallery',
  alt: `History Adda heritage photograph ${index + 1}`,
  image: `/images/gallery/gallery-0${index + 1}.webp`,
  caption: '',
}))

export const GalleryPage = () => {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'hi' ? 'hi' : 'en'
  const [galleryItems, setGalleryItems] = useState(localGallery)
  const [activeCategory, setActiveCategory] = useState('all')
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    galleryApi.getGallery(lang, { signal: controller.signal })
      .then((payload) => {
        const rows = Array.isArray(payload) ? payload : payload?.data || payload?.items || []
        if (!Array.isArray(rows) || rows.length === 0) return
        setGalleryItems(rows.map((item, index) => ({
          id: item.id || `gallery-${index}`,
          category: item.category || 'gallery',
          alt: item.alt || item.caption || 'Heritage gallery photograph',
          image: item.imageUrl || item.image_url || item.image || '/images/placeholder.webp',
          caption: lang === 'hi' ? (item.captionHi || item.caption || item.captionEn) : (item.captionEn || item.caption || item.captionHi),
        })))
      })
      .catch((error) => { if (error.name !== 'CanceledError') setGalleryItems(localGallery) })
      .finally(() => { if (!controller.signal.aborted) setLoading(false) })
    return () => controller.abort()
  }, [lang])

  const categories = useMemo(() => ['all', ...new Set(galleryItems.map(item => item.category).filter(Boolean))], [galleryItems])
  const filtered = useMemo(() => activeCategory === 'all' ? galleryItems : galleryItems.filter(item => item.category === activeCategory), [galleryItems, activeCategory])
  const currentImage = currentIndex === null ? null : filtered[currentIndex]

  useEffect(() => {
    if (currentIndex === null) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setCurrentIndex(null)
      if (event.key === 'ArrowRight') setCurrentIndex(index => index === null ? null : (index + 1) % filtered.length)
      if (event.key === 'ArrowLeft') setCurrentIndex(index => index === null ? null : (index - 1 + filtered.length) % filtered.length)
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [currentIndex, filtered.length])

  return <main className="page-shell bg-[#faf7f0]">
    <section className="bg-[#251b15] py-16 text-white sm:py-24">
      <Container>
        <p className="eyebrow !text-[#d9b77d]"><Images size={14}/> Moments & memories</p>
        <h1 className="mt-5 font-cinzel text-4xl text-[#fff8ec] sm:text-6xl">{t('pages.gallery.title')}</h1>
        <p className="mt-5 max-w-2xl font-lora text-lg leading-8 text-white/70">{t('pages.gallery.subhead')}</p>
      </Container>
    </section>
    <Container className="py-12 sm:py-16">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div><p className="eyebrow">The visual archive</p><h2 className="mt-2 font-cinzel text-2xl text-brown">A glimpse of the journey</h2></div>
        <span className="text-sm text-brown/50">{filtered.length} photographs</span>
      </div>
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map(category => <button key={category} type="button" onClick={() => { setActiveCategory(category); setCurrentIndex(null) }} aria-pressed={activeCategory === category} className={`rounded-full border px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition ${activeCategory === category ? 'border-terracotta bg-terracotta text-white' : 'border-brown/15 bg-white text-brown/65 hover:border-terracotta hover:text-terracotta'}`}>{category === 'all' ? t('filters.all') : (t(`gallery.categories.${category}`, { defaultValue: category }))}</button>)}
      </div>
      {loading && <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">{Array.from({length:6},(_,i)=><div key={i} className="aspect-square animate-pulse rounded-2xl bg-brown/5"/>)}</div>}
      {!loading && <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((item, index) => <button key={item.id} type="button" onClick={() => setCurrentIndex(index)} className="group relative aspect-square overflow-hidden rounded-2xl bg-parchment text-left shadow-sm focus:outline-none focus:ring-4 focus:ring-terracotta/30">
          <img src={item.image} alt={item.alt} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/placeholder.webp' }}/>
          <span className="absolute inset-0 flex items-center justify-center bg-[#211813]/0 text-white transition group-hover:bg-[#211813]/35"><span className="flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-white/90 text-terracotta opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100"><ZoomIn size={19}/></span></span>
        </button>)}
      </div>}
      {!loading && filtered.length === 0 && <p className="rounded-2xl bg-white p-12 text-center text-brown/60">{t('pages.gallery.empty')}</p>}
      <p className="mt-10 text-center text-xs text-brown/45">{t('pages.gallery.draftNotice')}</p>
    </Container>

    {currentImage && <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#130e0b]/95 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={t('gallery.lightboxLabel')} onClick={() => setCurrentIndex(null)}>
      <button type="button" onClick={() => setCurrentIndex(null)} aria-label={t('gallery.close')} className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"><X size={21}/></button>
      <div className="relative z-10 flex max-h-[90vh] max-w-6xl flex-col items-center" onClick={event => event.stopPropagation()}>
        <img src={currentImage.image} alt={currentImage.alt} className="max-h-[78vh] max-w-full rounded-xl object-contain shadow-2xl" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/placeholder.webp' }}/>
        <p className="mt-4 text-center text-sm text-white/75">{currentImage.caption || currentImage.alt}</p>
        {filtered.length > 1 && <div className="mt-4 flex gap-3"><button type="button" onClick={() => setCurrentIndex(index => (index - 1 + filtered.length) % filtered.length)} className="rounded-full border border-white/25 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10">Previous</button><button type="button" onClick={() => setCurrentIndex(index => (index + 1) % filtered.length)} className="rounded-full border border-white/25 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10">Next</button></div>}
      </div>
    </div>}
  </main>
}
