import { useTranslation } from 'react-i18next'
import { SectionTitle, Link } from '../common/Button'
import { Container } from '../layout/Container'

export const GalleryPreview = () => {
  const { t } = useTranslation()

  return (
    <section className="py-20 bg-warmwhite">
      <Container>
        <div className="text-center mb-12">
          <SectionTitle>{t('gallery.title')}</SectionTitle>
          <p className="mt-4 text-lg font-lora text-brown/70">
            {t('gallery.subhead')}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="group relative aspect-square overflow-hidden rounded-2xl bg-parchment shadow-sm">
              <img
                src={`/images/gallery/gallery-0${i}.webp`}
                alt={t('gallery.alt')}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.onerror = null; e.currentTarget.src = '/images/placeholder.webp'
                }}
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-[#241a15]/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                {t('gallery.photo')}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-1.5 text-terracotta font-inter text-sm font-medium hover:underline"
          >
            {t('gallery.viewAll')}
            <span>&#8594;</span>
          </Link>
        </div>
        <p className="mt-6 text-xs font-inter text-brown/50 text-center">
          {t('gallery.draftNotice')}
        </p>
      </Container>
    </section>
  )
}
