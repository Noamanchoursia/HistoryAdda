import { useTranslation } from 'react-i18next'
import { CalendarDays, CheckCircle2, MessageCircle, ShieldCheck } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Link, Button } from '../components/common/Button'
import { Container } from '../components/layout/Container'
import { bookingApi } from '../services/bookingApi'
import { walkApi } from '../services/walkApi'


const bookingSchema = z.object({
    walk: z.string().min(1, { message: 'Please select a walk.' }),
    preferredDate: z.string().min(1, { message: 'Please select a date.' }).refine((date) => date >= new Date().toLocaleDateString('en-CA'), { message: 'Please choose today or a future date.' }),
    participants: z
      .string()
      .min(1, { message: 'Please enter number of participants.' })
      .refine((val) => {
        const n = Number(val)
        return !isNaN(n) && n >= 1 && n <= 50
      }, { message: 'Participants must be between 1 and 50.' }),
    name: z.string().min(2, { message: 'Please enter your name.' }),
    phone: z.string().trim().regex(/^(?:\+91[- ]?)?[6-9]\d{9}$/, { message: 'Enter a valid 10-digit Indian mobile number.' }),
    preferredLanguage: z.enum(['en', 'hi', 'either']),
    groupType: z.enum(['family', 'friends', 'school', 'organisation', 'other']).optional(),
    requirements: z.string().max(500, { message: 'Max 500 characters.' }).optional().or(z.literal('')),
    consent: z.boolean().refine((val) => val === true, {
      message: 'You must consent to be contacted.',
    }),
  })
export const BookingPage = () => {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'hi' ? 'hi' : 'en'
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [referenceNumber, setReferenceNumber] = useState(null)
  const [walks, setWalks] = useState([])
  const today = new Date().toLocaleDateString('en-CA')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      walk: '',
      preferredDate: '',
      participants: '',
      name: '',
      phone: '',
      preferredLanguage: 'either',
      groupType: undefined,
      requirements: '',
      consent: false,
    },
  })

  useEffect(() => {
    const controller = new AbortController()
    walkApi.getWalks(lang, { signal: controller.signal }).then(setWalks).catch(() => setWalks([]))
    return () => controller.abort()
  }, [lang])



  const onSubmit = async (data) => {
    setSubmitError(null)
    try {
      const response = await bookingApi.createEnquiry({
        walk_id: data.walk,
        preferred_date: data.preferredDate,
        participant_count: Number(data.participants),
        customer_name: data.name,
        phone: data.phone,
        preferred_language: data.preferredLanguage,
        group_type: data.groupType || null,
        requirements: data.requirements || null,
        consent: data.consent,
      })
      setReferenceNumber(response?.referenceNumber || response?.reference_number || response?.data?.referenceNumber || response?.data?.reference_number || null)
      setSubmitted(true)
    } catch (err) {
      setSubmitError(err.response?.data?.message || err.message || t('booking.submitError'))
    }
  }

  if (submitted) {
    return (
      <main className="page-shell bg-[#faf7f0] text-brown">
        <Container className="py-16 sm:py-24">
          <div className="mx-auto max-w-xl rounded-[2rem] border border-brown/10 bg-white p-8 text-center shadow-xl shadow-brown/5 sm:p-12">
            <div className="w-12 h-12 rounded-full bg-terracotta flex items-center justify-center mx-auto mb-6 text-white font-inter font-bold text-lg">
              &#10004;
            </div>
            <h1 className="font-cinzel text-3xl text-brown mb-4">{t('booking.success.title')}</h1>
            <p className="font-lora text-brown/80 mb-6">{t('booking.success.body')}</p>
            {referenceNumber && (
              <p className="text-sm text-brown/60 mb-8">
                {t('booking.success.reference')}: <span className="font-inter font-mono text-terracotta">HIST-{referenceNumber}</span>
              </p>
            )}
            <p className="text-sm font-inter text-brown/70 mb-8">
              {t('booking.success.pending')}
            </p>
            <a
              href="https://wa.me/917441167407?text=Hi%20History%20Adda%2C%20I%20am%20following%20up%20on%20my%20heritage%20walk%20enquiry."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 border-2 border-gold text-gold font-inter font-medium rounded-sm uppercase tracking-wider hover:bg-gold/10 transition-colors focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-brown"
            >
              {t('booking.success.whatsapp')}
            </a>
            <br className="hidden sm:block" />
            <Link
              to="/heritage-walks"
              className="mt-6 inline-block text-terracotta font-inter font-medium hover:underline"
            >
              {t('booking.success.back')}
            </Link>
          </div>
        </Container>
      </main>
    )
  }

  return (
    <main className="page-shell bg-[#faf7f0] text-brown">
      <section className="bg-[#251b15] py-14 text-white sm:py-20">
        <Container>
          <p className="eyebrow !text-[#d9b77d]">Plan your experience</p>
          <h1 className="mt-4 max-w-2xl font-cinzel text-4xl leading-tight text-[#fff8ec] sm:text-5xl">{t('booking.title')}</h1>
          <p className="mt-4 max-w-xl font-lora text-lg leading-8 text-white/70">{t('booking.subhead')}</p>
        </Container>
      </section>
      <Container className="grid gap-10 py-10 sm:py-14 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
        <div className="rounded-[1.75rem] border border-brown/10 bg-white p-6 shadow-xl shadow-brown/5 sm:p-9">
          <div className="mb-8 rounded-xl border border-gold/40 bg-[#faf7f0] p-5">
            <h3 className="font-cinzel text-lg text-brown">Booking & payment information</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-brown/75">
              <li>Advance payment is required to confirm a booking. Payment instructions are shared by the organiser through WhatsApp after the request.</li>
              <li>Booking requests are accepted up to 8 hours before the walk, subject to availability.</li>
              <li>Confirmation is shared after the organiser reviews and verifies the payment.</li>
              <li>Advance payments are non-refundable. If you cancel, the amount paid can be adjusted towards the next scheduled heritage walk at no additional cost.</li>
              <li>Public walks require at least 3 participants and are limited to 15 participants.</li>
              <li>Private and customised walks are available on request; pricing is shared separately.</li>
            </ul>
            <p className="mt-3 text-xs text-brown/55">Online payment gateway is not available at this stage. Do not treat this request form as a confirmed booking.</p>
          </div>
          <header className="mb-8 max-w-lg">
            <p className="eyebrow">Your details</p>
            <h2 className="mt-2 font-cinzel text-2xl text-brown">Tell us about your group</h2>
            <p className="mt-2 text-sm leading-6 text-brown/60">Share a few details and our team will get back to you to confirm the walk.</p>
          </header>

        {submitError && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            {submitError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="walk-field" className="block text-sm font-semibold text-brown">
                {t('booking.fields.walk')}
              </label>
              <select
                id="walk-field"
                {...register('walk')}
                className="field mt-2"
              >
                <option value="">{t('booking.fields.walkPlaceholder')}</option>
                {walks.map((w) => (
                  <option key={w.slug} value={w.slug}>
                    {w.title}
                  </option>
                ))}
              </select>
              {errors.walk && <p className="text-xs text-terracotta mt-1">{errors.walk.message}</p>}
            </div>
            <div>
              <label htmlFor="date-field" className="block text-sm font-semibold text-brown">
                {t('booking.fields.date')}
              </label>
              <input
                id="date-field"
                type="date"
                min={today}
                {...register('preferredDate')}
                className="field mt-2"
              />
              {errors.preferredDate && (
                <p className="text-xs text-terracotta mt-1">{errors.preferredDate.message}</p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="participants-field" className="block text-sm font-semibold text-brown">
                {t('booking.fields.participants')}
              </label>
              <input
                id="participants-field"
                type="number"
                placeholder="2"
                min="1"
                max="50"
                {...register('participants')}
                className="field mt-2"
              />
              {errors.participants && (
                <p className="text-xs text-terracotta mt-1">{errors.participants.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="name-field" className="block text-sm font-semibold text-brown">
                {t('booking.fields.name')}
              </label>
              <input
                id="name-field"
                type="text"
                autoComplete="name"
                placeholder="Your full name"
                {...register('name')}
                className="field mt-2"
              />
              {errors.name && <p className="text-xs text-terracotta mt-1">{errors.name.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-brown">
              {t('booking.fields.phone')}
            </label>
            <input
              id="phone-field"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="e.g. 9876543210"
              {...register('phone')}
              className="field mt-2"
            />
            {errors.phone && <p className="text-xs text-terracotta mt-1">{errors.phone.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-brown">
              {t('booking.fields.language')}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['en', 'hi', 'either'].map((val) => (
                <label key={val} className="flex items-center gap-2 cursor-pointer">
                  <input
                    id={val === 'en' ? 'language-field' : undefined}
                    type="radio"
                    value={val}
                    {...register('preferredLanguage')}
                    className="w-4 h-4 text-terracotta border-brown rounded focus:ring-terracotta"
                  />
                  <span className="text-xs font-inter text-brown">{t(`booking.languages.${val}`)}</span>
                </label>
              ))}
            </div>
            {errors.preferredLanguage && (
              <p className="text-xs text-terracotta mt-1">{errors.preferredLanguage.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-brown">
              {t('booking.fields.groupType')}
            </label>
            <select
              id="group-type-field"
              {...register('groupType', { setValueAs: (value) => value || undefined })}
              className="field mt-2"
            >
              <option value="">{t('booking.fields.groupTypePlaceholder')}</option>
              <option value="family">Family</option>
              <option value="friends">Friends</option>
              <option value="school">School / College</option>
              <option value="organisation">Organisation</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-brown">
              {t('booking.fields.requirements')}
            </label>
            <textarea
              id="requirements-field"
              placeholder="Anything we should know about your group?"
              rows={4}
              {...register('requirements')}
              className="field mt-2"
            />
            {errors.requirements && (
              <p className="text-xs text-terracotta mt-1">{errors.requirements.message}</p>
            )}
          </div>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              {...register('consent')}
              className="w-4 h-4 text-terracotta border-brown rounded focus:ring-terracotta mt-0.5"
            />
            <label className="text-sm font-inter text-brown/80 leading-relaxed">
              {t('booking.fields.consent.label')}
              <span className="text-terracotta font-medium">
                {' '}
                {t('booking.fields.consent.required')}
              </span>
            </label>
          </div>
          {errors.consent && <p className="text-xs text-terracotta mt-1">{errors.consent.message}</p>}

          <Button variant="primary" type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
            {isSubmitting ? t('booking.submit.loading') : t('booking.submit.label')}
          </Button>
        </form>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-28">
          <div className="rounded-[1.5rem] bg-[#251b15] p-7 text-white shadow-xl shadow-brown/10">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#d9b77d]">What happens next</p>
            <h3 className="mt-3 font-cinzel text-2xl text-[#fff8ec]">A simple plan.</h3>
            <ul className="mt-7 space-y-5 text-sm text-white/75">
              <li className="flex gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-gold"><CheckCircle2 size={17}/></span><span><b className="block text-white">We receive your enquiry</b><span className="mt-1 block leading-5">Your preferred walk and group details reach our team.</span></span></li>
              <li className="flex gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-gold"><MessageCircle size={17}/></span><span><b className="block text-white">We get in touch</b><span className="mt-1 block leading-5">We’ll contact you to discuss availability and details.</span></span></li>
              <li className="flex gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-gold"><CalendarDays size={17}/></span><span><b className="block text-white">Your walk is confirmed</b><span className="mt-1 block leading-5">We’ll share the final schedule and meeting point.</span></span></li>
            </ul>
          </div>
          <div className="rounded-[1.5rem] border border-brown/10 bg-white p-6">
            <div className="flex items-center gap-3"><ShieldCheck className="text-terracotta" size={20}/><h3 className="font-semibold">Need help?</h3></div>
            <p className="mt-2 text-sm leading-6 text-brown/60">Questions before booking? Speak directly with our team.</p>
            <a href="https://wa.me/917441167407" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-terracotta hover:text-brown"><MessageCircle size={16}/> +91 7441167407</a>
          </div>
        </aside>

        <div className="mt-2 border-t border-brown/10 pt-8 lg:col-span-2">
          <h3 className="font-cinzel text-xl text-brown mb-4">{t('booking.after.title')}</h3>
          <ul className="space-y-3 text-sm font-inter text-brown/70 max-w-lg">
            <li>{t('booking.after.step1')}</li>
            <li>{t('booking.after.step2')}</li>
            <li>{t('booking.after.step3')}</li>
          </ul>
          <p className="mt-6 text-sm font-inter text-brown/60">
            {t('booking.after.whatsapp')} <br />
            <a
              href="https://wa.me/917441167407"
              className="text-terracotta hover:underline"
            >
              +91 7441167407
            </a>
          </p>
        </div>
      </Container>
    </main>
  )
}
