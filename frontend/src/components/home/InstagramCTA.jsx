import { useTranslation } from 'react-i18next'
import { SectionTitle } from '../common/Button'
import { Container } from '../layout/Container'

export const InstagramCTA = () => {
  const { t } = useTranslation()

  return (
    <section className="py-20 bg-warmwhite">
      <Container>
        <div className="max-w-md mx-auto text-center border border-brown/30 bg-brown p-10 rounded-sm">
          <SectionTitle className="text-warmwhite">{t('instagram.title')}</SectionTitle>
          <p className="mt-4 text-lg font-lora text-brown/100 mb-8">
            {t('instagram.body')}
          </p>
          <a
            href="https://www.instagram.com/historyaddaa"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gold text-gold font-inter font-medium rounded-sm uppercase tracking-wider hover:bg-gold/10 transition-colors focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-brown"
          >
            {t('instagram.follow')}
            <span>&#8599;</span>
          </a>
        </div>
      </Container>
    </section>
  )
}
