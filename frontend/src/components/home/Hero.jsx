import { useTranslation } from 'react-i18next'
import { ArrowRight, MapPin, Sparkles } from 'lucide-react'
import { Link } from '../common/Button'

export const Hero = () => {
  const { t } = useTranslation()
  return (
    <section className="relative isolate flex min-h-[650px] items-center overflow-hidden bg-[#241a15] sm:min-h-[720px]">
      <img src="/images/hero/hero.webp" alt={t('hero.alt')} fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover object-center" onError={(e) => { e.currentTarget.style.display = 'none' }} />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#1d1511]/95 via-[#211813]/75 to-[#211813]/20" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#211813]/60 via-transparent to-[#211813]/20" />
      <div className="container relative py-24 sm:py-32">
        <div className="max-w-3xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-black/20 px-4 py-2 text-[10px] font-bold uppercase tracking-[.24em] text-[#f1d9ad] backdrop-blur-sm"><Sparkles size={13}/> {t('tagline')}</div>
          <h1 className="max-w-3xl font-cinzel text-4xl font-medium leading-[1.16] tracking-tight text-[#fff9ef] sm:text-6xl lg:text-7xl">{t('hero.headline')}</h1>
          <p className="mt-7 max-w-xl font-lora text-base leading-8 text-white/80 sm:text-xl">{t('hero.subhead')}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link to="/heritage-walks" className="inline-flex items-center justify-center gap-3 rounded-full bg-[#b96545] px-7 py-4 text-sm font-bold text-white shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:bg-[#a65337]">{t('cta.explore')} <ArrowRight size={17}/></Link>
            <Link to="/book-a-walk" className="inline-flex items-center justify-center rounded-full border border-white/45 bg-white/5 px-7 py-4 text-sm font-bold text-white backdrop-blur transition hover:bg-white/15">{t('cta.private')}</Link>
          </div>
          <div className="mt-14 flex items-center gap-2 text-xs font-semibold tracking-wide text-white/65"><MapPin size={14} className="text-gold"/> Jabalpur, Madhya Pradesh · India</div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 hidden w-[32%] border-l border-t border-gold/25 bg-[#211813]/75 p-7 backdrop-blur-md lg:block">
        <p className="font-lora text-sm italic leading-6 text-[#f2e4cf]">“Every street has a story. Every stone remembers.”</p>
      </div>
    </section>
  )
}
