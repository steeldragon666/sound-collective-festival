import { motion } from 'framer-motion';
import Countdown, { COUNTDOWN_TARGET } from '@/components/Countdown';
import SectionHeader from '@/components/SectionHeader';

function downloadIcs() {
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Sound Collective//Festival//EN',
    'BEGIN:VEVENT',
    'UID:sound-collective-2027@soundcollectivefestival.com',
    'DTSTAMP:20260901T000000Z',
    'DTSTART:20270220T010000Z',
    'DTEND:20270220T120000Z',
    'SUMMARY:Sound Collective Festival — Gates Open',
    'DESCRIPTION:MAOLI · Stan Walker · Katchafire · SOJA · Arrested Development · A.R.T · Bradamon · Riah + local comp winner. Strictly 18+.',
    'LOCATION:Broadwater Parklands\\, Gold Coast\\, QLD',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
  const blob = new Blob([ics], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sound-collective-2027.ics';
  a.click();
  URL.revokeObjectURL(url);
}

/** S4 — Countdown to gates on sky-deep with wave divider. */
export function CountdownSection() {
  return (
    <section className="relative bg-sky-deep">
      <div className="wave-strip animate-wave-drift" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="relative">
          <SectionHeader
            kicker="The Countdown"
            title="GATES OPEN IN"
            variant="dark"
            className="mb-10 flex-col items-center text-center [&>div]:flex [&>div]:flex-col [&>div]:items-center"
          />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7 }}
          >
            <Countdown target={COUNTDOWN_TARGET} />
          </motion.div>
          <p className="mt-10 text-center font-sans text-sm font-medium text-cream/80 md:text-base">
            Saturday 20 February 2027 · Gates 11:00am · Music 11:15am – 10:00pm · Broadwater Parklands, Gold Coast
          </p>
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={downloadIcs}
              className="group font-mono text-xs font-bold uppercase tracking-[0.18em] text-cream md:text-sm"
            >
              <span className="underline decoration-coral decoration-2 underline-offset-4">Add to calendar</span>
              <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CountdownSection;
