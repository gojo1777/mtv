import Script from 'next/script';
import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Analytics from '../components/Analytics';
import LiveChat from '../components/LiveChat';

// SEO සහ Google Search Console සඳහා Metadata - FIXED VERSION
export const metadata = {
  metadataBase: new URL('https://movie-web-rust-eight.vercel.app'),
  title: {
    default: 'SIRIES HUB LK | සිංහල හඬකැවූ සහ උපසිරැසි ගැන්වූ චිත්‍රපට',
    template: '%s | SIRIES HUB LK'
  },
  description: 'SIRIES HUB LK වෙතින් අලුත්ම සිංහල හඬකැවූ සහ උපසිරැසි ගැන්වූ චිත්‍රපට සහ කතාමාලා නොමිලේ නරඹන්න.',
  keywords: ['SIRIES HUB LK', 'Sinhala Dubbed Movies', 'Sinhala Subtitles', 'Download Movies Sri Lanka', 'Sinhala Cartoons', 'Sinhala Anime', 'Free Movies'],
  authors: [{ name: 'SIRIES HUB LK' }],
  creator: 'SIRIES HUB LK',
  publisher: 'SIRIES HUB LK',
  
  // Open Graph (Facebook, WhatsApp)
  openGraph: {
    type: 'website',
    locale: 'si_LK',
    url: 'https://movie-web-rust-eight.vercel.app',
    siteName: 'SIRIES HUB LK',
    title: 'SIRIES HUB LK | සිංහල චිත්‍රපට',
    description: 'අලුත්ම සිංහල හඬකැවූ සහ උපසිරැසි ගැන්වූ චිත්‍රපට',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SIRIES HUB LK',
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'SIRIES HUB LK | සිංහල චිත්‍රපට',
    description: 'අලුත්ම සිංහල හඬකැවූ සහ උපසිරැසි ගැන්වූ චිත්‍රපට',
    images: ['/og-image.jpg'],
  },

  // Google Search Console Verification
  verification: {
    google: '9-U6oXYxRT5i3OpgRinZi9Tv_iFZDDG1vGoAnGQ6m70',
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="si">
      <head>
        {/* --- 💸 Adsterra Pop-under Script --- */}
        <Script 
          src="https://pl28670651.effectivegatecpm.com/a3/05/26/a305266c24399ceec90c418c2dd5660a.js"
          strategy="afterInteractive"
        />

        {/* --- 💸 PopAds Script --- */}
        <Script
          id="popads-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(){var o=window,r="e12d6ed76eb09e83888d65090dc84778",s=[["siteId",5276277],["minBid",0],["popundersPerIP","0"],["delayBetween",0],["default",false],["defaultPerDay",0],["topmostLayer","auto"]],p=["d3d3LmNkbjRhZHMuY29tL212YWxpZGF0b3IubWluLmNzcw==","ZDNnNW92Zm5nanc5YncuY2xvdWRmcm9udC5uZXQvaEpTUS9yY3VycmVuY3lGb3JtYXR0ZXIubWluLmpz"],c=-1,u,n,l=function(){clearTimeout(n);c++;if(p[c]&&!(1796745770000<(new Date).getTime()&&1<c)){u=o.document.createElement("script");u.type="text/javascript";u.async=!0;var i=o.document.getElementsByTagName("script")[0];u.src="https://"+atob(p[c]);u.crossOrigin="anonymous";u.onerror=l;u.onload=function(){clearTimeout(n);o[r.slice(0,16)+r.slice(0,16)]||l()};n=setTimeout(l,5E3);i.parentNode.insertBefore(u,i)}};if(!o[r]){try{Object.freeze(o[r]=s)}catch(e){}l()}})();
            `,
          }}
        />
      </head>
      <body style={{ 
        backgroundColor: '#0f0f0f', 
        color: '#fff', 
        margin: 0, 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        fontFamily: 'sans-serif'
      }}>
        
        {/* 📈 Analytics Tracker - සයිට් එකේ Views ගණන් කරන්නේ */}
        <Analytics />
        
        {/* Navigation Bar */}
        <Navbar />
        
        {/* ප්‍රධාන Content එක පෙන්වන තැන */}
        <main style={{ flex: 1 }}>
          {children}
        </main>

        {/* Footer Section */}
        <footer style={{
          textAlign: 'center',
          padding: '40px 20px',
          marginTop: '50px',
          borderTop: '1px solid #333',
          background: '#0a0a0a',
          color: '#888'
        }}>
          <h2 style={{ color: '#e50914', marginBottom: '10px' }}>SIRIES HUB LK</h2>
          <p style={{ margin: '5px 0' }}>ඔබට අවශ්‍ය සියලුම සිංහල උපසිරැසි සහ හඬකැවූ චිත්‍රපට එකම තැනකින්.</p>
          <p>© 2026 SIRIES HUB LK. All rights reserved.</p>
        </footer>

        {/* 💬 Live Chat - Site Wide */}
        <LiveChat />
      </body>
    </html>
  );
}
