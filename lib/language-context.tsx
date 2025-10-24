'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { translations, Language } from './translations'

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
  t: typeof translations.en
  toggleLanguage: () => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang] = useState<Language>('ar')

  // Set Arabic as default and RTL direction
  useEffect(() => {
    document.documentElement.dir = 'rtl'
    document.documentElement.lang = 'ar'
  }, [])

  const setLang = () => {
    // Language is now fixed to Arabic only
  }

  const toggleLanguage = () => {
    // Language switching disabled - Arabic only
  }

  const t = translations.ar

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}

