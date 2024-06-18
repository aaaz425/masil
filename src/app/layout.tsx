import './globals.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import { MockProvider } from '@/mocks/MockProvider';
import QueryProvider from '@/store/QueryProvider';

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: 'masil',
  description: '음료 마실래? 가볍게 동네 산책하듯 카페 가기',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={nunitoSans.className}>
      <body className="h-dvh">
        <QueryProvider>
          <MockProvider>{children}</MockProvider>
          <ReactQueryDevtools
            buttonPosition="bottom-left"
            initialIsOpen={false}
          />
        </QueryProvider>
      </body>
    </html>
  );
}
