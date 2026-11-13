import { useTranslation } from 'react-i18next'
import { SectionTitle, Card } from '../common/Button'
import { Container } from '../layout/Container'

export const WhyHistoryAdda = () => {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'hi' ? 'hi' : 'en'

  const items = [
    {
      title: t('why.localStorytelling'),
      titleHi: 'स्थानीय कथाकार',
      body: t('why.localStorytellingBody'),
      bodyHi: 'जबलपुर की गलियों और स्मृतियों में बुनी गई कहानियां, जो केवल किताबों में नहीं मिलतीं।',
    },
    {
      title: t('why.researched'),
      titleHi: 'खोजी गई जानकारी',
      body: t('why.researchedBody'),
      bodyHi: 'हर कहानी सत्यापित स्रोतों और स्थानीय संदर्भ पर आधारित है। कोई मनगढ़ंत तथ्य नहीं।',
    },
    {
      title: t('why.privateGroup'),
      titleHi: 'निजी समूह वॉक',
      body: t('why.privateGroupBody'),
      bodyHi: 'अपने परिवार, मित्रों, संस्थान या संगठन के लिए तय तारीख पर निजी वॉक का अनुरोध करें।',
    },
  ]

  return (
    <section className="py-20 bg-warmwhite">
      <Container>
        <div className="text-center mb-16">
          <SectionTitle>{t('why.title')}</SectionTitle>
          <p className="mt-4 text-lg font-lora text-brown/70">
            {t('why.subhead')}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <Card key={i} className="h-full">
              <div className="w-10 h-10 rounded-sm bg-terracotta/10 flex items-center justify-center mb-6 text-terracotta font-inter font-bold text-xl">
                {i + 1}
              </div>
              <h3 className="font-cinzel text-xl text-brown mb-3">
                {lang === 'hi' ? item.titleHi : item.title}
              </h3>
              <p className="text-sm font-inter text-brown/70 leading-relaxed">
                {lang === 'hi' ? item.bodyHi : item.body}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
