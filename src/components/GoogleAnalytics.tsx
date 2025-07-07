
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

interface GoogleAnalyticsProps {
  trackingId: string;
}

export const GoogleAnalytics = ({ trackingId }: GoogleAnalyticsProps) => {
  useEffect(() => {
    // Initialize gtag
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', trackingId, {
        page_title: document.title,
        page_location: window.location.href,
      });
    }
  }, [trackingId]);

  return (
    <Helmet>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
      />
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${trackingId}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </script>
      
      {/* Google Search Console Verification */}
      <meta name="google-site-verification" content="YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE_HERE" />
    </Helmet>
  );
};

// Hook for tracking page views
export const usePageTracking = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname,
      });
    }
  }, []);
};

// Utility functions for tracking events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

export const trackConversion = (transactionId: string, value: number, currency = 'INR') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: value,
      currency: currency,
    });
  }
};

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}
