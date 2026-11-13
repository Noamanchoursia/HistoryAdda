import { useTranslation } from 'react-i18next'
import { ArrowUpRight, Clock3, MapPin } from 'lucide-react'
import { Link } from '../common/Button'

export const WalkCard = ({ walk }) => {
  const { t, i18n } = useTranslation()
  const title = i18n.language === 'hi' ? (walk.titleHi || walk.title || walk.titleEn || 'Walk') : (walk.title || walk.titleEn || walk.titleHi || 'Walk')
  const summary = i18n.language === 'hi' ? (walk.summaryHi || walk.summary || walk.summaryEn || '') : (walk.summary || walk.summaryEn || walk.summaryHi || '')
  const slug = walk.slug || ''
  return <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-brown/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brown/10">
    <Link to={`/heritage-walks/${slug}`} className="relative block aspect-[4/3] overflow-hidden bg-parchment">
      <img src={walk.image || '/images/placeholder.webp'} alt={title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/placeholder.webp' }}/>
      <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-[#241a15]/75 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.16em] text-white backdrop-blur">{walk.duration || 'Guided heritage walk'}</span>
      <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-terracotta shadow-lg transition group-hover:bg-terracotta group-hover:text-white"><ArrowUpRight size={18}/></span>
    </Link>
    <div className="flex flex-1 flex-col p-6 sm:p-7">
      <div className="mb-3 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-wider text-brown/45"><span className="inline-flex items-center gap-1"><MapPin size={12}/> Jabalpur</span><span className="inline-flex items-center gap-1"><Clock3 size={12}/> Guided walk</span></div>
      <Link to={`/heritage-walks/${slug}`} className="font-cinzel text-xl leading-snug text-brown no-underline transition-colors group-hover:text-terracotta">{title}</Link>
      <p className="mt-3 flex-1 text-sm leading-7 text-brown/65">{summary}</p>
      <Link to={`/heritage-walks/${slug}`} className="mt-6 inline-flex items-center gap-2 border-t border-brown/10 pt-4 text-sm font-bold text-terracotta no-underline">{t('walks.readMore')} <ArrowUpRight size={15}/></Link>
    </div>
  </article>
}
