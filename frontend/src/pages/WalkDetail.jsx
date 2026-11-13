import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Container } from '../components/layout/Container'
import { WalkDetails } from '../components/walks/WalkDetails'
import { walkApi } from '../services/walkApi'

export const WalkDetailPage = () => {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'hi' ? 'hi' : 'en'
  const { slug } = useParams()

  const [walk, setWalk] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!slug) {
      setLoading(false)
      setError('No walk specified')
      return
    }
    setLoading(true)
    setError(null)
    walkApi
      .getWalkBySlug(slug, lang)
      .then((data) => {
        setWalk(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message || 'Walk not found')
        setLoading(false)
      })
  }, [slug, lang])

  if (loading) {
    return (
      <main className="min-h-screen bg-warmwhite text-brown">
        <Container className="py-20">
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-brown/60 font-inter">{t('common.loading')}</p>
          </div>
        </Container>
      </main>
    )
  }

  if (error || !walk) {
    return (
      <main className="min-h-screen bg-warmwhite text-brown">
        <Container className="py-20">
          <h1 className="font-cinzel text-3xl md:text-5xl text-brown mb-4">
            {t('pages.notFound.title')}
          </h1>
          <p className="font-lora text-brown/70">{error || t('pages.notFound.body')}</p>
          <a
            href="/heritage-walks"
            className="inline-block mt-6 text-terracotta font-inter font-medium hover:underline"
          >
            {t('pages.backToWalks')}
          </a>
        </Container>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-warmwhite text-brown">
      <Container className="py-10">
        <nav className="mb-8">
          <Link
            to="/heritage-walks"
            className="text-terracotta font-inter text-sm hover:underline"
          >
            &#8592; {t('nav.walks')}
          </Link>
        </nav>
        <WalkDetails walk={walk} />
      </Container>
    </main>
  )
}
