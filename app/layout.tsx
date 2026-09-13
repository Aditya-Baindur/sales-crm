import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, pageMetadata } from "@/lib/seo";
import ScrollToTop from "@/components/_common/scroll-to-top";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...pageMetadata({
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    path: "/",
  }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={geist.variable}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: 'history.scrollRestoration="manual"',
          }}
        />
      </head>
      <body className="relative z-0 font-sans antialiased">
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
