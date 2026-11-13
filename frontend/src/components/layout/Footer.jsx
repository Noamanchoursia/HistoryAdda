import { useTranslation } from 'react-i18next'
import { ArrowUpRight, Instagram, Mail, MapPin, Phone } from 'lucide-react'
import { Link } from '../common/Button'

export const Footer = () => {
  const { t } = useTranslation()
  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/heritage-walks', label: t('nav.walks') },
    { to: '/about', label: t('nav.about') },
    { to: '/gallery', label: t('nav.gallery') },
    { to: '/contact', label: t('nav.contact') },
  ]
  return <footer className="border-t border-white/10 bg-[#211813] text-white">
    <div className="container grid gap-12 py-14 md:grid-cols-[1.4fr_.8fr_1fr] md:py-16">
      <div>
        <Link to="/" className="inline-flex items-center gap-3 text-white no-underline">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/60 font-cinzel text-xl text-gold">H</span>
          <span><span className="block font-cinzel text-xl font-bold tracking-[.12em] text-[#f4e8d4]">HISTORYADDAA</span><span className="mt-1 block text-[9px] uppercase tracking-[.24em] text-gold/80">Stories of the city</span></span>
        </Link>
        <p className="mt-6 max-w-sm font-lora text-sm leading-7 text-white/60">Guided heritage walks in Jabalpur. Discover the people, places and stories that make the city unforgettable.</p>
        <a href="https://www.instagram.com/historyaddaa" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold transition hover:text-white"><Instagram size={16}/> {t('footer.instagram')} <ArrowUpRight size={13}/></a>
      </div>
      <div>
        <h3 className="mb-5 text-xs font-bold uppercase tracking-[.2em] text-gold">Explore</h3>
        <ul className="space-y-3">{links.map(item => <li key={item.to}><Link to={item.to} className="text-sm font-medium text-white/65 no-underline hover:text-gold">{item.label}</Link></li>)}</ul>
      </div>
      <div>
        <h3 className="mb-5 text-xs font-bold uppercase tracking-[.2em] text-gold">{t('footer.contact')}</h3>
        <ul className="space-y-4 text-sm text-white/65">
          <li className="flex items-start gap-3"><Phone size={16} className="mt-0.5 shrink-0 text-gold"/><a href="https://wa.me/917441167407" className="transition hover:text-white">+91 74411 67407</a></li>
          <li className="flex items-start gap-3"><Mail size={16} className="mt-0.5 shrink-0 text-gold"/><a href="mailto:Kanhaiyachouksey.connect@gmail.com" className="break-all transition hover:text-white">Kanhaiyachouksey.connect@gmail.com</a></li>
          <li className="flex items-start gap-3"><MapPin size={16} className="mt-0.5 shrink-0 text-gold"/><span>Jabalpur, Madhya Pradesh, India</span></li>
        </ul>
        <Link to="/book-a-walk" className="mt-7 inline-flex items-center gap-2 rounded-full border border-gold/50 px-5 py-3 text-xs font-bold uppercase tracking-wider text-gold no-underline transition hover:bg-gold hover:text-brown">{t('cta.book')} <ArrowUpRight size={14}/></Link>
      </div>
    </div>
    <div className="border-t border-white/10"><div className="container flex flex-col gap-2 py-5 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between"><p>{t('footer.copyright')}</p><p>Made for curious minds · Jabalpur, India</p></div></div>
  </footer>
}
