import { useEffect, useState } from 'react'
import i18n from '../i18n'
import { LanguageContext } from './languageContext'

const getInitialLanguage = () => {
  try {
    const stored = window.localStorage.getItem('historyadda-lang')
    return stored === 'hi' ? 'hi' : 'en'
  } catch {
    return 'en'
  }
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(getInitialLanguage)

  useEffect(() => {
    i18n.changeLanguage(language)
    try {
      window.localStorage.setItem('historyadda-lang', language)
    } catch {
      // Language switching still works when browser storage is unavailable.
    }
  }, [language])

  const changeLanguage = (nextLanguage) => setLanguage(nextLanguage === 'hi' ? 'hi' : 'en')

  return <LanguageContext.Provider value={{ language, changeLanguage }}>{children}</LanguageContext.Provider>
}
