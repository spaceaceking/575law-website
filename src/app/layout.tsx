import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "575 Law | New Mexico Bankruptcy & Debt Relief Attorney",
  description: "New Mexico bankruptcy attorney helping families eliminate debt through Chapter 7, Chapter 13, and debt settlement. Free consultation. We find the best solution for YOUR situation.",
  keywords: "New Mexico bankruptcy, debt relief attorney, Chapter 7, Chapter 13, debt settlement, foreclosure defense, debt defense, NM bankruptcy lawyer",
  openGraph: {
    title: "575 Law | New Mexico Bankruptcy & Debt Relief",
    description: "Crushing debt? We'll fight for your fresh start. Free consultation for New Mexico families.",
    type: "website",
  }
};

// TRACKING IDS
const GA_MEASUREMENT_ID = "G-X2K872R4CX"; // Google Analytics 4
const GOOGLE_ADS_ID = "AW-17919109486"; // Google Ads
const META_PIXEL_ID = "744262048414225"; // Meta/Facebook Pixel

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
            gtag('config', '${GOOGLE_ADS_ID}');
          `}
        </Script>

        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
