import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'ar'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  // Provide a fallback locale if undefined
  const activeLocale = locale || 'en';
  
  return {
    messages: (await import(`./messages/${activeLocale}.json`)).default
  };
});

