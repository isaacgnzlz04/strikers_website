import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * SEO Component for managing page-specific meta tags
 * 
 * @param {string} title - Page title (will be appended with site name)
 * @param {string} description - Page description for search results
 * @param {string} keywords - Comma-separated keywords
 * @param {string} canonical - Canonical URL for the page
 * @param {string} ogType - Open Graph type (default: website)
 * @param {string} ogImage - Open Graph image URL
 * @param {object} schema - JSON-LD structured data object
 */
const SEO = ({
  title = "Mainlee Strikers - Bowling Alley, Parties & Events in Russellville, AR",
  description = "Premier bowling alley in Russellville, AR. Birthday parties, corporate events, leagues, arcade games & sports bar. Book your party today!",
  keywords = "bowling alley Russellville AR, birthday party venue, corporate events, bowling leagues, arcade games",
  canonical = "https://www.mainleestrikers.com/",
  ogType = "website",
  ogImage = "https://www.mainleestrikers.com/og-image.jpg",
  schema = null,
}) => {
  const fullTitle = title.includes('Mainlee Strikers') 
    ? title 
    : `${title} | Mainlee Strikers - Russellville, AR`;

  // Force immediate title update on navigation
  useEffect(() => {
    document.title = fullTitle;
  }, [fullTitle]);

  return (
    <Helmet prioritizeSeoTags>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Mainlee Strikers" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonical} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      
      {/* Structured Data (Schema.org) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
