import { useTranslation } from 'react-i18next'
import { Link } from '../common/Button'

export const WalkDetails = ({ walk }) => {
  const { t, i18n } = useTranslation()
  const hi = i18n.language === 'hi'
  const title = hi ? (walk.titleHi || walk.title) : walk.title
  const summary = hi ? (walk.summaryHi || walk.summary) : walk.summary
  const duration = walk.duration || `${walk.durationMinutes} minutes`
  const price = `₹${walk.price ?? walk.priceAmount} per person`
  const facts = [
    [t('walks.meta.duration'), duration], [t('walks.meta.distance'), walk.distance],
    [t('walks.meta.meetingPoint'), walk.meetingPoint], [t('walks.meta.endingPoint'), walk.endingPoint],
    [t('walks.meta.language'), walk.language], [t('walks.meta.groupSize'), walk.groupSize],
    [t('walks.meta.price'), price], [t('walks.meta.schedule'), walk.schedule],
  ].filter(([, value]) => value)
  return (
    <article className="space-y-10">
      <div className="relative h-80 md:h-[28rem] overflow-hidden rounded-sm bg-brown/20">
        <img src={walk.image || '/images/placeholder.webp'} alt={title} className="w-full h-full object-cover" loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/placeholder.webp' }} />
      </div>
      <div className="max-w-4xl">
        <h1 className="font-cinzel text-3xl md:text-5xl text-brown leading-tight mb-4">{title}</h1>
        <p className="text-lg font-lora text-brown/80 leading-relaxed mb-8">{summary}</p>
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {facts.map(([label, value]) => <div key={label} className="bg-white border border-brown/15 p-4 rounded-sm"><p className="text-xs font-inter text-terracotta uppercase tracking-wider mb-1">{label}</p><p className="font-inter text-brown">{value}</p></div>)}
        </div>
        <section className="mb-10"><h2 className="font-cinzel text-2xl text-brown mb-4">{t('walks.story.title')}</h2><p className="font-lora text-brown/80 leading-relaxed">{walk.description}</p></section>
        {walk.highlights?.length > 0 && <section className="mb-10"><h2 className="font-cinzel text-2xl text-brown mb-4">{t('walks.highlights.title')}</h2><ul className="list-disc pl-6 space-y-2 font-lora text-brown/75">{walk.highlights.map((item) => <li key={item}>{item}</li>)}</ul></section>}
        {walk.stops?.length > 0 && <section className="mb-10"><h2 className="font-cinzel text-2xl text-brown mb-4">{t('walks.route.title')}</h2><ol className="grid sm:grid-cols-2 gap-3">{walk.stops.map((stop, i) => <li key={stop} className="flex items-start gap-3 rounded-sm border border-brown/10 bg-white p-3"><span className="w-6 h-6 rounded-full bg-terracotta text-white text-xs flex-shrink-0 flex items-center justify-center">{i + 1}</span><span className="text-sm text-brown/80">{stop}</span></li>)}</ol></section>}
        {walk.instructions?.length > 0 && <section className="mb-10"><h2 className="font-cinzel text-2xl text-brown mb-4">{t('walks.instructions.title')}</h2><ul className="list-disc pl-6 space-y-2 font-lora text-brown/75">{walk.instructions.map((item) => <li key={item}>{item}</li>)}</ul></section>}
        <div className="bg-brown p-8 rounded-sm"><h2 className="font-cinzel text-2xl text-warmwhite mb-3">{t('walks.book.title')}</h2><p className="font-lora text-white/75 mb-5">{t('walks.book.body')}</p><Link to={`/book-a-walk?walk=${walk.slug}`} className="inline-block px-8 py-4 bg-terracotta text-white font-inter font-medium rounded-sm uppercase tracking-wider">{t('walks.book.cta')}</Link></div>
      </div>
    </article>
  )
}
