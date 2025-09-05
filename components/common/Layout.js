import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ 
  children, 
  title = 'RoanPaul Photography & Arts',
  description = 'Professional photography portfolio showcasing artistic vision and technical excellence',
  image = '/images/og-default.jpg',
  url = '',
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://roanpaul-photography.vercel.app';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${siteUrl}${image}`} />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="RoanPaul Photography & Arts" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${siteUrl}${image}`} />
        
        {/* Additional SEO */}
        <meta name="author" content="RoanPaul" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={fullUrl} />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "RoanPaul",
              "jobTitle": "Professional Photographer",
              "url": siteUrl,
              "image": `${siteUrl}/images/roanpaul-profile.jpg`,
              "sameAs": [
                // Add social media URLs here when available
              ],
              "worksFor": {
                "@type": "Organization",
                "name": "RoanPaul Photography & Arts"
              },
              "description": description
            })
          }}
        />
      </Head>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}

