import { useTranslation } from 'react-i18next'
import { SectionTitle, Link } from '../common/Button'
import { Container } from '../layout/Container'

export const FinalCTA = () => {
  const { t } = useTranslation()

  return (
    <section className="py-24 bg-brown">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <SectionTitle className="text-warmwhite">{t('final.title')}</SectionTitle>
          <p className="mt-4 text-lg font-lora text-brown/100 mb-10 leading-relaxed">
            {t('final.body')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/heritage-walks"
              className="px-8 py-4 bg-terracotta text-white font-inter font-medium rounded-sm uppercase tracking-wider hover:bg-brown/90 transition-colors focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2 focus:ring-offset-brown"
            >
              {t('cta.explore')}
            </Link>
            <Link
              to="/book-a-walk"
              className="px-8 py-4 border-2 border-gold text-gold font-inter font-medium rounded-sm uppercase tracking-wider hover:bg-gold/10 transition-colors focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-brown"
            >
              {t('cta.private')}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
