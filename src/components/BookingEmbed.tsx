'use client';

import { useEffect } from 'react';

const CALENDLY_URL = 'https://calendly.com/575law/consultation';

export default function BookingEmbed() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[src*="calendly"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  const handleBooking = () => {
    if (typeof window !== 'undefined') {
      const win = window;
      win.gtag?.('event', 'begin_booking', {
        event_category: 'engagement',
        event_label: 'calendly_open',
      });
      win.gtag?.('event', 'conversion', {
        send_to: 'AW-17919109486/BOOKING_CONVERSION',
      });
      win.fbq?.('track', 'Schedule');
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
      <div
        className="calendly-inline-widget"
        data-url={`${CALENDLY_URL}?hide_event_type_details=1&hide_gdpr_banner=1`}
        style={{ minWidth: '320px', height: '630px' }}
        onClick={handleBooking}
      />
      <noscript>
        <div className="p-8 text-center">
          <p className="text-gray-600 mb-4">Please enable JavaScript to book an appointment online.</p>
          <a
            href="tel:+15755551234"
            className="bg-teal-600 text-white px-6 py-3 rounded-lg inline-block hover:bg-teal-700"
          >
            Call (575) 555-1234 Instead
          </a>
        </div>
      </noscript>
    </div>
  );
}
