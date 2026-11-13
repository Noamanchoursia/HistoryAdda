import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { Container } from '../components/layout/Container'

export const ContactPage = () => {
  const { t } = useTranslation()
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitStatus('sending')
    setTimeout(() => {
      setSubmitStatus('success')
    }, 1000)
  }

  return (
    <main className="min-h-screen bg-warmwhite text-brown">
      <Container className="py-20">
        <header className="mb-12 max-w-2xl">
          <h1 className="font-cinzel text-3xl md:text-5xl text-brown leading-tight mb-4">
            {t('pages.contact.title')}
          </h1>
          <p className="text-lg font-lora text-brown/70">
            {t('pages.contact.subhead')}
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-cinzel text-2xl text-brown mb-6">{t('pages.contact.channels.title')}</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-terracotta/10 flex-shrink-0 flex items-center justify-center text-terracotta font-inter font-bold mt-0.5">
                  &#9990;
                </div>
                <div>
                  <h3 className="font-cinzel text-lg text-brown mb-1">
                    {t('pages.contact.channels.whatsapp')}
                  </h3>
                  <a
                    href="https://wa.me/917441167407"
                    className="font-inter text-terracotta hover:underline text-sm"
                  >
                    +91 7441167407
                  </a>
                  <p className="text-xs text-brown/50 mt-1">
                    {t('pages.contact.channels.whatsappNote')} Phone calls are accepted only with the organiser’s prior permission.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-terracotta/10 flex-shrink-0 flex items-center justify-center text-terracotta font-inter font-bold mt-0.5">
                  &#9993;
                </div>
                <div>
                  <h3 className="font-cinzel text-lg text-brown mb-1">
                    {t('pages.contact.channels.email')}
                  </h3>
                  <a
                    href="mailto:Kanhaiyachouksey.connect@gmail.com"
                    className="font-inter text-terracotta hover:underline text-sm"
                  >
                    Kanhaiyachouksey.connect@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-terracotta/10 flex-shrink-0 flex items-center justify-center text-terracotta font-inter font-bold mt-0.5">
                  &#128247;
                </div>
                <div>
                  <h3 className="font-cinzel text-lg text-brown mb-1">
                    {t('pages.contact.channels.instagram')}
                  </h3>
                  <a
                    href="https://www.instagram.com/historyaddaa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-inter text-terracotta hover:underline text-sm"
                  >
                    @historyaddaa
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-cinzel text-2xl text-brown mb-6">{t('pages.contact.form.title')}</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-inter text-brown mb-1">
                  {t('pages.contact.form.name')}
                </label>
                <input
                  type="text"
                  className="w-full bg-brown border border-brown/30 rounded-sm px-4 py-2 text-brown focus:outline-none focus:ring-2 focus:ring-terracotta"
                  placeholder={t('pages.contact.form.namePlaceholder')}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-inter text-brown mb-1">
                  {t('pages.contact.form.email')}
                </label>
                <input
                  type="email"
                  className="w-full bg-brown border border-brown/30 rounded-sm px-4 py-2 text-brown focus:outline-none focus:ring-2 focus:ring-terracotta"
                  placeholder={t('pages.contact.form.emailPlaceholder')}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-inter text-brown mb-1">
                  {t('pages.contact.form.message')}
                </label>
                <textarea
                  rows={4}
                  className="w-full bg-brown border border-brown/30 rounded-sm px-4 py-2 text-brown focus:outline-none focus:ring-2 focus:ring-terracotta"
                  placeholder={t('pages.contact.form.messagePlaceholder')}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full btn-primary"
                disabled={submitStatus === 'sending'}
              >
                {submitStatus === 'sending' ? 'Sending…' : t('pages.contact.form.submit')}
              </button>
              {submitStatus === 'success' && (
                <p className="text-xs text-terracotta/90 text-center font-inter">
                  Message sent. We will get back to you soon.
                </p>
              )}
              <p className="text-xs text-brown/50 text-center">
                {t('pages.contact.form.note')}
              </p>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-brown/20">
          <h2 className="font-cinzel text-2xl text-brown mb-6">{t('pages.location.title')}</h2>
          <p className="font-lora text-brown/70 leading-relaxed max-w-xl">
            {t('pages.location.body')}
          </p>
        </div>
      </Container>
    </main>
  )
}
