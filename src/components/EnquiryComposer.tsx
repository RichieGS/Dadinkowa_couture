import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { categories, looks, whatsappUrl, type Category } from '../data';
import { mediaCopy } from '../media';
import { External, Arrow, MediaLabel } from './Shared';
export function EnquiryComposer() {
  const [params] = useSearchParams();
  const initial = looks.find((l) => l.slug === params.get('look'));
  const [interest, setInterest] = useState(
    initial?.category ||
      (categories.includes(params.get('interest') as Category)
        ? params.get('interest')!
        : 'Agbada'),
  );
  const [reference, setReference] = useState(initial?.slug || '');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [ready, setReady] = useState('');
  const chosen = looks.find((l) => l.slug === reference);
  return (
    <form
      className="enquiry-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (!message.trim()) {
          setError('Tell the team a little about what you have in mind.');
          document.getElementById('message')?.focus();
          return;
        }
        setError('');
        window.open(
          whatsappUrl({
            interest: chosen?.category ?? interest,
            reference: chosen ? `${chosen.id} · ${chosen.title}` : undefined,
            mediaStatus: chosen?.mediaStatus,
            message,
          }),
          '_blank',
          'noopener,noreferrer',
        );
        setReady(
          'Continue the conversation in WhatsApp. If it did not open, use the direct link below. Nothing has been sent by this website.',
        );
      }}
    >
      <p className="eyebrow">START A CONVERSATION</p>
      <h2>
        What do you
        <br />
        have <i>in mind?</i>
      </h2>
      <label htmlFor="interest">I’m interested in</label>
      <select id="interest" value={interest} onChange={(e) => setInterest(e.target.value)}>
        {categories
          .filter((c) => c !== 'All')
          .map((c) => (
            <option key={c}>{c}</option>
          ))}
      </select>
      <label htmlFor="reference">
        Lookbook reference <span>(optional)</span>
      </label>
      <select
        id="reference"
        value={reference}
        onChange={(e) => {
          setReference(e.target.value);
          const selected = looks.find((look) => look.slug === e.target.value);
          if (selected) setInterest(selected.category);
        }}
      >
        <option value="">An idea of my own</option>
        {looks.map((l) => (
          <option key={l.slug} value={l.slug}>
            {l.title} · {mediaCopy(l.mediaStatus).short}
          </option>
        ))}
      </select>
      {chosen && <MediaLabel status={chosen.mediaStatus} />}
      <label htmlFor="message">Your message</label>
      <textarea
        id="message"
        required
        maxLength={600}
        rows={4}
        placeholder="Tell us about your preferred style or ask about available fabrics…"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
          setError('');
        }}
        aria-invalid={!!error}
        aria-describedby="message-hint message-error"
      />
      <div className="field-meta">
        <small id="message-hint">Please leave measurements and payment details out.</small>
        <small>{message.length}/600</small>
      </div>
      <p id="message-error" role="alert">
        {error}
      </p>
      <button className="button dark" type="submit">
        Continue on WhatsApp <Arrow />
      </button>
      <p className="small-note">
        Opens WhatsApp with your draft message. You choose whether to send it. Availability,
        fittings and orders are confirmed with the team.
      </p>
      <p role="status">{ready}</p>
      {ready && (
        <External
          href={whatsappUrl({
            interest: chosen?.category ?? interest,
            reference: chosen ? `${chosen.id} · ${chosen.title}` : undefined,
            mediaStatus: chosen?.mediaStatus,
            message,
          })}
          className="text-link"
        >
          Open your WhatsApp draft <Arrow />
        </External>
      )}
    </form>
  );
}
