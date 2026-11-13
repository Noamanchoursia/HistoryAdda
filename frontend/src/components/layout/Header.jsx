import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../../context/useLanguage'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { Link, Button } from '../common/Button'
import { NavLink } from 'react-router-dom'

export const Header = () => {
  const { t } = useTranslation()
  const { language, changeLanguage } = useLanguage()
  const [mobileOpen, setMobileOpen] = useState(false)
  const navItems = [
    { to: '/', label: t('nav.home') },
    { to: '/heritage-walks', label: t('nav.walks') },
    { to: '/about', label: t('nav.about') },
    { to: '/gallery', label: t('nav.gallery') },
    { to: '/contact', label: t('nav.contact') },
  ]
  const navClass = ({ isActive }) => `text-[13px] font-semibold tracking-wide transition-colors ${isActive ? 'text-gold' : 'text-white/75 hover:text-white'}`
  const toggleLanguage = () => changeLanguage(language === 'en' ? 'hi' : 'en')

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#211813]/95 text-white shadow-lg shadow-black/10 backdrop-blur-xl">
      <div className="container flex h-[76px] items-center justify-between gap-5">
        <Link to="/" className="group flex items-center gap-3 text-white no-underline">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/60 font-cinzel text-lg text-gold">H</span>
          <span className="leading-tight"><span className="block font-cinzel text-lg font-bold tracking-[.12em] text-[#f4e8d4]">HISTORY ADDA</span><span className="mt-0.5 block text-[9px] uppercase tracking-[.24em] text-gold/80">Stories of the city</span></span>
        </Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => <NavLink key={item.to} to={item.to} end={item.to === '/'} className={navClass}>{item.label}</NavLink>)}
        </nav>
        <div className="hidden items-center gap-4 lg:flex">
          <button onClick={toggleLanguage} className="rounded-full border border-white/20 px-3 py-2 text-xs font-bold tracking-wider text-white/80 transition hover:border-gold hover:text-gold" aria-label="Change language">{language === 'en' ? 'हिंदी' : 'EN'}</button>
          <Button to="/book-a-walk" className="!px-5 !py-3 !text-xs">{t('cta.book')} <ArrowUpRight size={15}/></Button>
        </div>
        <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white lg:hidden" onClick={() => setMobileOpen(v => !v)} aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen} aria-controls="mobile-navigation">
          {mobileOpen ? <X size={21}/> : <Menu size={21}/>}
        </button>
      </div>
      {mobileOpen && <div id="mobile-navigation" className="border-t border-white/10 bg-[#211813] px-5 pb-6 pt-3 lg:hidden">
        <nav className="container flex flex-col" aria-label="Mobile navigation">
          {navItems.map(item => <NavLink key={item.to} to={item.to} end={item.to === '/'} onClick={() => setMobileOpen(false)} className={({isActive}) => `border-b border-white/10 py-3 text-sm font-semibold ${isActive ? 'text-gold' : 'text-white/80'}`}>{item.label}</NavLink>)}
        </nav>
        <div className="container mt-5 flex items-center justify-between gap-4">
          <button onClick={toggleLanguage} className="text-sm font-semibold text-gold">{language === 'en' ? 'हिंदी में देखें' : 'View in English'}</button>
          <Button to="/book-a-walk" onClick={() => setMobileOpen(false)} className="!py-3">{t('cta.book')}</Button>
        </div>
      </div>}
    </header>
  )
}
