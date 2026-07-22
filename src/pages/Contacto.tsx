import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { Loader2, Send } from 'lucide-react';
import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { contactPage } from '../content/site';

type FormStatus = 'idle' | 'sending' | 'sent' | 'error';

function Contacto() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<FormStatus>('idle');

  const sendEmail = async (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus('sending');

    try {
      await emailjs.sendForm(
        'service_9rs64f8',
        'template_j952md5',
        formRef.current,
        { publicKey: '8PJDW7kYZCuYbZOb9' },
      );
      setStatus('sent');
      formRef.current.reset();
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const buttonLabel = {
    idle: 'Enviar',
    sending: 'Enviando...',
    sent: 'Enviado',
    error: 'Error, intentá de nuevo',
  }[status];

  return (
    <section id="contacto" className="scroll-mt-[5.5rem] bg-warm-50 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <span className="inline-block rounded-full bg-brand-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-700">
            {contactPage.kicker}
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-brand-900 sm:text-5xl">
            {contactPage.title}
          </h2>
        </motion.header>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.form
            ref={formRef}
            onSubmit={sendEmail}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-4 rounded-2xl border border-brand-100 bg-white p-6 shadow-sm shadow-brand-900/5 sm:p-8"
          >
            <div>
              <label htmlFor="user_name" className="mb-1.5 block text-sm font-medium text-brand-800">
                Nombre Completo
              </label>
              <input
                id="user_name"
                name="user_name"
                type="text"
                className="w-full rounded-xl border border-brand-200 bg-warm-50 px-4 py-3 text-brand-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
              />
            </div>
            <div>
              <label htmlFor="user_email" className="mb-1.5 block text-sm font-medium text-brand-800">
                Email
              </label>
              <input
                id="user_email"
                name="user_email"
                type="email"
                required
                className="w-full rounded-xl border border-brand-200 bg-warm-50 px-4 py-3 text-brand-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
              />
            </div>
            <div>
              <label htmlFor="user_telephone" className="mb-1.5 block text-sm font-medium text-brand-800">
                Teléfono
              </label>
              <input
                id="user_telephone"
                name="user_telephone"
                type="tel"
                className="w-full rounded-xl border border-brand-200 bg-warm-50 px-4 py-3 text-brand-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-brand-800">
                Consulta
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full resize-y rounded-xl border border-brand-200 bg-warm-50 px-4 py-3 text-brand-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              {status === 'sending' ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Send size={16} />
              )}
              {buttonLabel}
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm shadow-brand-900/5"
          >
            <iframe
              title="Ubicación Geriátrico Neuquén"
              src={contactPage.mapEmbedUrl}
              className="h-[400px] w-full lg:h-full lg:min-h-[480px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contacto;
