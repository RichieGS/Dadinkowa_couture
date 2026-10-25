import { useState } from 'react';
import { business } from '../data';
import { External, Arrow } from '../components/Shared';
import { EnquiryComposer } from '../components/EnquiryComposer';
export function Contact() {
  const [copied, setCopied] = useState('');
  return (
    <main className="page contact-page">
      <div className="page-heading contact-heading">
        <p className="eyebrow">OFFA, KWARA / LET’S TALK</p>
        <h1>
          Good style starts
          <br />
          <i>with a hello.</i>
        </h1>
        <p>
          A fabric question, a look in mind, or a fitting enquiry.
          <br />
          Speak directly with Dadinkowa Couture.
        </p>
      </div>
      <div className="contact-layout">
        <section className="contact-details" aria-label="Business contact details">
          <div>
            <p className="eyebrow">CALL OR WHATSAPP</p>
            <a className="phone" href={`tel:${business.phoneRaw}`}>
              {business.phone}
            </a>
            <div className="contact-actions">
              <External href={business.whatsapp} className="text-link">
                Open WhatsApp <Arrow />
              </External>
              <button
                className="text-link"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(business.phone);
                    setCopied('Number copied.');
                  } catch {
                    setCopied(`Copy this number: ${business.phone}`);
                  }
                }}
              >
                Copy number
              </button>
            </div>
            <p role="status">{copied}</p>
          </div>
          <div>
            <p className="eyebrow">FIND US IN OFFA</p>
            <address>{business.address}</address>
            <External href={business.map} className="text-link">
              Get directions on Google Maps <Arrow />
            </External>
            <p className="small-note">
              Please contact the team before travelling to confirm visiting arrangements.
            </p>
          </div>
          <div className="contact-social">
            <p className="eyebrow">FOLLOW THE BRAND</p>
            {Object.entries(business.socials).map(([name, url]) => (
              <External href={url} key={name}>
                {name} <Arrow />
              </External>
            ))}
          </div>
          <div className="contact-note">
            <p>Have a style reference?</p>
            <span>
              Send it directly in your WhatsApp conversation. The team can help you explore what is
              possible.
            </span>
          </div>
        </section>
        <EnquiryComposer />
      </div>
    </main>
  );
}
