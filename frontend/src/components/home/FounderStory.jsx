import { useTranslation } from 'react-i18next'
import { SectionTitle } from '../common/Button'
import { Container } from '../layout/Container'

export const FounderStory = () => {
  const { t } = useTranslation()
  return (
    <section className="py-20 bg-brown/10">
      <Container>
        <div className="grid lg:grid-cols-[1fr_0.9fr] gap-12 items-center">
          <div>
            <p className="eyebrow mb-4">FOUNDER & HERITAGE GUIDE</p>
            <SectionTitle>{t('founder.title')}</SectionTitle>
            <h3 className="mt-6 font-cinzel text-2xl text-brown">Kanhaiya Chouksey</h3>
            <p className="mt-4 text-lg font-lora text-brown/80 leading-relaxed">{t('founder.body')}</p>
            <p className="mt-4 text-lg font-lora text-brown/80 leading-relaxed">{t('founder.body2')}</p>
            <div className="mt-6 border-l-2 border-terracotta pl-5">
              <h4 className="font-cinzel text-lg text-brown">Education</h4>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-brown/75">
                <li>• Bachelor of Arts (BA) — completed</li>
                <li>• MA in Ancient Indian History, Culture and Archaeology — Rani Durgavati University (RDVV), Jabalpur — completed</li>
                <li>• MA in Anthropology — IGNOU — pursuing</li>
                <li>• PGDM in Museology — Indira Gandhi Rashtriya Manav Sangrahalaya (IGRMS), Bhopal — pursuing</li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 items-start">
            <figure className="col-span-2 sm:col-span-1">
              <img src="/images/founder/portrait.webp" alt="Kanhaiya Chouksey, founder of Historyaddaa" className="w-full aspect-[4/5] object-cover rounded-sm" loading="lazy" />
              <figcaption className="mt-2 text-xs font-inter text-brown/60">Kanhaiya Chouksey · Founder</figcaption>
            </figure>
            <figure className="col-span-2 sm:col-span-1 sm:mt-12">
              <img src="/images/founder/guide-in-the-field.webp" alt="Kanhaiya Chouksey at a heritage location" className="w-full aspect-[3/4] object-cover rounded-sm" loading="lazy" />
              <figcaption className="mt-2 text-xs font-inter text-brown/60">Exploring Jabalpur’s heritage</figcaption>
            </figure>
          </div>
        </div>
      </Container>
    </section>
  )
}
