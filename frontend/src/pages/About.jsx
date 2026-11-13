import { useTranslation } from 'react-i18next'
import { Link } from '../components/common/Button'
import { Container } from '../components/layout/Container'

export const AboutPage = () => {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'hi' ? 'hi' : 'en'

  return (
    <main className="min-h-screen bg-warmwhite text-brown">
      <Container className="py-20">
        <header className="mb-16">
          <h1 className="font-cinzel text-3xl md:text-5xl text-brown leading-tight mb-4">
            {t('pages.about.title')}
          </h1>
          <p className="text-lg font-lora text-brown/70">
            {t('pages.about.subhead')}
          </p>
        </header>

        <section className="mb-16">
          <h2 className="font-cinzel text-2xl text-brown mb-6">{t('pages.about.origin.title')}</h2>
          <p className="font-lora text-brown/80 leading-relaxed mb-4">
            {lang === 'hi' ? t('pages.about.origin.bodyHi') : t('pages.about.origin.body')}
          </p>
        </section>

        <section className="mb-16">
          <h2 className="font-cinzel text-2xl text-brown mb-6">{t('pages.about.mission.title')}</h2>
          <ul className="space-y-4 text-sm font-inter text-brown/70 leading-relaxed max-w-xl">
            {[
              t('pages.about.mission.item1'),
              t('pages.about.mission.item2'),
              t('pages.about.mission.item3'),
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-terracotta text-white text-[10px] flex-shrink-0 flex items-center justify-center font-inter font-bold mt-0.5">
                  {i + 1}
                </span>
                <p className="font-lora text-brown/80">{item}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="font-cinzel text-2xl text-brown mb-6">{t('pages.about.approach.title')}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-warmwhite border border-brown/20 p-6 rounded-sm">
              <h3 className="font-cinzel text-xl text-brown mb-3">{t('pages.about.approach.research.title')}</h3>
              <p className="font-lora text-brown/80 leading-relaxed">
                {t('pages.about.approach.research.body')}
              </p>
            </div>
            <div className="bg-warmwhite border border-brown/20 p-6 rounded-sm">
              <h3 className="font-cinzel text-xl text-brown mb-3">{t('pages.about.approach.experience.title')}</h3>
              <p className="font-lora text-brown/80 leading-relaxed">
                {t('pages.about.approach.experience.body')}
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="font-cinzel text-2xl text-brown mb-6">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              ['Can I join a heritage walk alone?', 'Yes. Solo participants are welcome. A public walk takes place when the minimum group size of 3 participants is met.'],
              ['Are there age restrictions?', 'No. Historyaddaa welcomes participants of all age groups.'],
              ['Is advance booking compulsory?', 'Yes. Advance booking and payment are required. Walk-in registrations are not accepted.'],
              ['What happens if it rains?', 'Walks are planned after checking the weather forecast. Carry an umbrella when required; the organiser takes necessary precautions.'],
              ['Do I need prior knowledge of history?', 'No. Anyone interested in Jabalpur, its heritage and stories is welcome.'],
              ['Are private walks available?', 'Yes. Private and customised walks are available for families, friends, educational institutions and groups. Pricing is shared separately.'],
              ['What should I bring?', 'Comfortable footwear, a water bottle, a cap or hat, and an umbrella if required.'],
              ['Which languages are available?', 'Hindi, English and Hinglish, depending on participants’ preferences.'],
            ].map(([question, answer]) => <details key={question} className="group border border-brown/15 bg-white p-5 rounded-sm"><summary className="cursor-pointer font-semibold text-brown">{question}</summary><p className="mt-3 font-lora text-sm leading-6 text-brown/70">{answer}</p></details>)}
          </div>
        </section>

        <section>
          <div className="bg-brown p-10 rounded-sm text-center">
            <h2 className="font-cinzel text-2xl text-warmwhite mb-4">{t('pages.about.contact.title')}</h2>
            <p className="text-lg font-lora text-brown/100 mb-6">
              {t('pages.about.contact.body')}
            </p>
            <Link
              to="/contact"
              className="inline-block px-8 py-4 border-2 border-gold text-gold font-inter font-medium rounded-sm uppercase tracking-wider hover:bg-gold/10 transition-colors focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-brown"
            >
              {t('pages.about.contact.cta')}
            </Link>
          </div>
        </section>
      </Container>
    </main>
  )
}
