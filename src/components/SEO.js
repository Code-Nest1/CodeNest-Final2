import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, url, image }) {
  // Fallbacks if no specific props are passed
  const siteTitle = "Code Nest"; 
  const defaultDescription = "Code Nest - Expert mobile app and web development services.";
  const siteUrl = "https://codenest.us.com";
  const defaultImage = "https://codenest.us.com/logo.png"; // Replace with your actual og-image URL if you have one

  // Ensure the URL is valid
  const currentUrl = url ? url : siteUrl; 

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      
      {/* CRITICAL: Canonical Tag (Fixed) */}
      <link rel="canonical" href={currentUrl} />

      {/* Facebook / Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title || siteTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || defaultImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || siteTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={image || defaultImage} />
    </Helmet>
  );
}