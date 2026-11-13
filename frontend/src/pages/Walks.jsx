import { useTranslation } from 'react-i18next'
import { useState, useEffect, useMemo } from 'react'
import { Compass, MapPin } from 'lucide-react'
import { Container } from '../components/layout/Container'
import { WalkCard } from '../components/walks/WalkCard'
import { WalkFilters } from '../components/walks/WalkFilters'
import { walkApi } from '../services/walkApi'

export const WalksPage = () => {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'hi' ? 'hi' : 'en'
  const [walks, setWalks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)
    walkApi.getWalks(lang, { signal: controller.signal })
      .then(setWalks)
      .catch((err) => { if (err.name !== 'CanceledError') setError(err.message || 'Failed to load walks') })
      .finally(() => { if (!controller.signal.aborted) setLoading(false) })
    return () => controller.abort()
  }, [lang])

  const visibleWalks = useMemo(() => filter === 'all' ? walks : walks.filter(walk => walk.category === filter || walk.category?.toLowerCase().includes(filter)), [walks, filter])

  return <main className="page-shell bg-[#faf7f0]">
    <section className="relative overflow-hidden bg-[#251b15] py-16 text-white sm:py-24">
      <div className="absolute inset-0 opacity-15 surface-pattern" />
      <Container className="relative">
        <p className="eyebrow !text-[#d9b77d]"><Compass size={14}/> {t('tagline')}</p>
        <h1 className="mt-5 max-w-3xl font-cinzel text-4xl leading-tight text-[#fff8ec] sm:text-6xl">{t('pages.walks.title')}</h1>
        <p className="mt-5 max-w-2xl font-lora text-lg leading-8 text-white/70">{t('pages.walks.subhead')}</p>
        <div className="mt-7 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.16em] text-gold"><MapPin size={14}/> Jabalpur, Madhya Pradesh</div>
      </Container>
    </section>
    <Container className="py-12 sm:py-16">
      <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><p className="eyebrow">Choose your experience</p><h2 className="mt-2 font-cinzel text-2xl text-brown sm:text-3xl">Explore the walks</h2></div><p className="text-sm text-brown/55">{walks.length} experiences</p></div>
      <WalkFilters value={filter} onChange={setFilter}/>
      {loading && <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{[1,2,3].map(n => <div key={n} className="h-[390px] animate-pulse rounded-3xl bg-brown/5"/>)}</div>}
      {error && !loading && <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-800"><p>{error}</p><button onClick={() => window.location.reload()} className="mt-3 font-semibold underline">Try again</button></div>}
      {!loading && !error && <>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{visibleWalks.map(walk => <WalkCard key={walk.slug} walk={walk}/>)}</div>
        {visibleWalks.length === 0 && <div className="rounded-2xl border border-brown/10 bg-white px-6 py-16 text-center"><p className="font-lora text-lg text-brown/60">{t('pages.walks.empty')}</p></div>}
        <p className="mt-10 text-center text-xs text-brown/45">{t('pages.walks.draftNotice')}</p>
      </>}
    </Container>
  </main>
}
