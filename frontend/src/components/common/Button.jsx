import { cn } from '../../utils/cn'
import { Link as RouterLink } from 'react-router-dom'

const variants = {
  primary: 'bg-terracotta text-white shadow-lg shadow-terracotta/20 hover:bg-[#713b2b] hover:-translate-y-0.5 focus:ring-terracotta',
  secondary: 'border border-brown/20 bg-white text-brown hover:border-terracotta hover:text-terracotta focus:ring-brown',
  outline: 'border border-terracotta text-terracotta hover:bg-terracotta hover:text-white focus:ring-terracotta',
}

export const Button = ({ children, variant = 'primary', href, to, className, type = 'button', disabled, ...props }) => {
  const classes = cn('inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold tracking-wide transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50', variants[variant] || variants.primary, className)
  if (to || (href && href.startsWith('/'))) {
    return <RouterLink to={to || href} className={classes} aria-disabled={disabled || undefined} {...props}>{children}</RouterLink>
  }
  if (href) return <a href={href} className={classes} aria-disabled={disabled || undefined} {...props}>{children}</a>
  return <button type={type} disabled={disabled} className={classes} {...props}>{children}</button>
}

export const SectionTitle = ({ children, className }) => (
  <h2 className={cn('font-cinzel text-brown text-3xl md:text-5xl leading-tight tracking-tight', className)}>{children}</h2>
)
export const Card = ({ children, className }) => (
  <div className={cn('bg-white border border-brown/10 rounded-2xl p-6 shadow-sm', className)}>{children}</div>
)
export const Link = ({ children, className, to, ...props }) => {
  const hasTextColor = /(^|\s)text-/.test(className || '')
  return <RouterLink to={to} className={cn(!hasTextColor && 'text-terracotta', 'font-semibold transition-colors hover:text-brown', className)} {...props}>{children}</RouterLink>
}
