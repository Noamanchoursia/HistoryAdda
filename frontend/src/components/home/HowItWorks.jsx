import { useTranslation } from 'react-i18next'
import { SectionTitle, Card } from '../common/Button'
import { Container } from '../layout/Container'

const steps = [
  { num: '01', title: 'Choose an experience', titleHi: 'अनुभव चुनें', body: 'Browse heritage walks and pick one that interests you.', bodyHi: 'हेरिटेज वॉक देखें और अपनी रुचि का अनुभव चुनें।' },
  { num: '02', title: 'Request a date', titleHi: 'तारीख का अनुरोध करें', body: 'Submit your preferred date, group size, and contact details.', bodyHi: 'अपनी पसंदीदा तारीख, समूह आकार और संपर्क विवरण जमा करें।' },
  { num: '03', title: 'Receive confirmation', titleHi: 'पुष्टि प्राप्त करें', body: 'History Adda checks availability and confirms the final price and details.', bodyHi: 'History Adda उपलब्धता की जांच करता है और अंतिम मूल्य और विवरण की पुष्टि करता है।' },
  { num: '04', title: 'Join the walk', titleHi: 'वॉक में शामिल हों', body: 'Meet your guide at the agreed meeting point and walk through Jabalpur\u2019s heritage.', bodyHi: 'नियुक्त मिलन बिंदु पर अपने गाइड से मिलें और जबलपुर की धरोहर के माध्यम से टहलें।' },
]

export const HowItWorks = () => {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'hi' ? 'hi' : 'en'

  return (
    <section className="py-20 bg-brown">
      <Container>
        <div className="text-center mb-16">
          <SectionTitle className="text-warmwhite">{t('how.title')}</SectionTitle>
          <p className="mt-4 text-lg font-lora text-brown/100">
            {t('how.subhead')}
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <Card key={i} className="bg-transparent border border-gold/30 p-6 text-center">
              <div className="w-10 h-10 rounded-sm bg-gold text-brown flex items-center justify-center mx-auto mb-6 font-inter font-bold text-sm uppercase tracking-wider">
                {step.num}
              </div>
              <h3 className="font-cinzel text-lg text-warmwhite mb-3">
                {lang === 'hi' ? step.titleHi : step.title}
              </h3>
              <p className="text-sm font-inter text-brown/100 leading-relaxed">
                {lang === 'hi' ? step.bodyHi : step.body}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
