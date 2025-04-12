// src/app/[locale]/layout.tsx

import { notFound } from 'next/navigation';
import { Locale, hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { ReactNode } from 'react';
import { routing } from '@/i18n/routing';
import { MantineProvider, ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import theme from '@/components/core/theme/Theme';
import { VoyagerProvider } from '@/contexts/VoyagerContext';
import { PiNetworkProvider } from '@/contexts/PiNetworkContext'; // Use the updated PiNetworkProvider
import { Notifications } from '@mantine/notifications';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';

// Type definitions for incoming props
type Props = {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
};

// Static params generation for locales
export function generateStaticParams() {
  return routing.locales.map((locale: Locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Ensure valid locale and set it for static rendering
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale} {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <NextIntlClientProvider>
          <MantineProvider theme={theme}>
            <Notifications position="top-right" zIndex={10000} />
            <PiNetworkProvider> {/* PiNetworkProvider now handles SDK injection */}
              <VoyagerProvider>
                {children}
              </VoyagerProvider>
            </PiNetworkProvider>
          </MantineProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
