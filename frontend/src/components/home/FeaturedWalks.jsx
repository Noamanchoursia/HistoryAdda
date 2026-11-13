import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import { Link } from '../common/Button'
import { Container } from '../layout/Container'
import { walkApi } from '../../services/walkApi'

export const FeaturedWalks = () => {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'hi' ? 'hi' : 'en'

  const [walks, setWalks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    walkApi.getWalks(lang).then(
      (data) => {
        setWalks((data || []).slice(0, 3))
        setLoading(false)
      },
      () => setLoading(false)
    )
  }, [lang])

  if (loading) {
    return (
      <section className="py-20 bg-brown/10">
        <Container>
          <div className="text-center py-20">
            <p className="text-brown/60 font-inter">{t('common.loading')}</p>
          </div>
        </Container>
      </section>
    )
  }

  return (
    <section className="py-20 bg-brown/10">
      <Container>
        <div className="text-center mb-16">
          <h2 className="font-cinzel text-brown text-3xl md:text-5xl leading-tight mb-4">
            {t('featured.title')}
          </h2>
          <p className="mt-4 text-lg font-lora text-brown/70">
            {t('featured.subhead')}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {walks.map((walk) => (
            <article
              key={walk.slug}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-brown/10 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={walk.image || '/images/placeholder.webp'}
                  alt={walk.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/placeholder.webp' }}
                />
                <span className="absolute top-3 left-3 px-3 py-1 bg-[#251b15]/80 text-white text-xs font-inter font-medium uppercase tracking-wider rounded-sm">
                  Jabalpur heritage walk
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <Link
                  to={`/heritage-walks/${walk.slug}`}
                  className="font-cinzel text-lg text-brown group-hover:text-terracotta transition-colors mb-2"
                >
                  {walk.title}
                </Link>
                <p className="text-sm font-inter text-brown/70 leading-relaxed mb-6 flex-1">
                  {walk.summary}
                </p>
                <Link
                  to={`/heritage-walks/${walk.slug}`}
                  className="inline-flex items-center gap-1.5 text-terracotta font-inter text-sm font-medium hover:underline"
                >
                  {t('featured.readMore')}
                  <span>&#8594;</span>
                </Link>
              </div>
            </article>
          ))}
          {walks.length === 0 && (
            <div className="col-span-full text-center py-20">
              <p className="text-brown/60 font-inter">{t('pages.walks.empty')}</p>
            </div>
          )}
        </div>
        <p className="mt-8 text-xs font-inter text-brown/50 text-center">
          Every walk is led through storytelling and local heritage exploration.
        </p>
      </Container>
    </section>
  )
}
