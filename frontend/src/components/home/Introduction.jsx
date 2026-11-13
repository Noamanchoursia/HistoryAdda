import { useTranslation } from 'react-i18next'
import { SectionTitle } from '../common/Button'
import { Container } from '../layout/Container'

export const Introduction = () => {
  const { t } = useTranslation()

  return (
    <section className="py-20 bg-warmwhite">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionTitle>{t('intro.title')}</SectionTitle>
            <p className="mt-6 text-lg font-lora text-brown/80 leading-relaxed mb-6">
              {t('intro.body1')}
            </p>
            <p className="text-lg font-lora text-brown/80 leading-relaxed">
              {t('intro.body2')}
            </p>
          </div>
          <div className="flex justify-center">
            <img src="/images/founder/guide-in-the-field.webp" alt="Historyaddaa founder exploring a heritage location in Jabalpur" className="w-full max-w-md aspect-[3/4] object-cover rounded-sm" loading="lazy" />
          </div>
        </div>
      </Container>
    </section>
  )
}
