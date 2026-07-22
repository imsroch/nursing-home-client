import { motion } from 'framer-motion';
import { CheckCircle2, Loader2, MessageCircle, Send } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { formularioPage, site } from '../content/site';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

type FormData = {
  vinculo: string;
  whatsapp: string;
  salud: string;
  motivos: string;
  cobertura: string;
  cud: string;
};

const emptyForm: FormData = {
  vinculo: '',
  whatsapp: '',
  salud: '',
  motivos: '',
  cobertura: '',
  cud: '',
};

const fieldClass =
  'w-full rounded-xl border border-brand-200 bg-warm-50 px-4 py-3 text-brand-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200';

/** Normaliza un WhatsApp argentino a dígitos internacionales y link wa.me */
function buildWhatsAppLink(raw: string): { number: string; link: string } | null {
  let digits = raw.replace(/\D/g, '');
  if (!digits) return null;

  if (digits.startsWith('00')) {
    digits = digits.slice(2);
  }

  if (digits.length === 10) {
    digits = `549${digits}`;
  } else if (digits.startsWith('54') && !digits.startsWith('549') && digits.length >= 12) {
    digits = `549${digits.slice(2)}`;
  } else if (digits.startsWith('9') && digits.length >= 10 && !digits.startsWith('54')) {
    digits = `54${digits}`;
  }

  if (digits.length < 11 || digits.length > 15) {
    return null;
  }

  return {
    number: digits,
    link: `https://wa.me/${digits}`,
  };
}

function Formulario() {
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const sendToSheet = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const sheetsUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL;
    if (!sheetsUrl) {
      setStatus('error');
      setErrorMessage(
        'Falta configurar VITE_GOOGLE_SHEETS_URL. Revisá el archivo .env.local.',
      );
      return;
    }

    if (!formData.whatsapp.trim() || !formData.cud) {
      setStatus('error');
      setErrorMessage('Completá el WhatsApp y si cuenta con CUD.');
      return;
    }

    const wa = buildWhatsAppLink(formData.whatsapp);
    if (!wa) {
      setStatus('error');
      setErrorMessage('Ingresá un número de WhatsApp válido (ej: 11 6150-4440).');
      return;
    }

    setStatus('sending');

    const payload = {
      timestamp: new Date().toISOString(),
      vinculo: formData.vinculo.trim(),
      whatsapp: wa.number,
      wa_link: wa.link,
      salud: formData.salud.trim(),
      motivos: formData.motivos.trim(),
      cobertura: formData.cobertura.trim(),
      cud: formData.cud,
    };

    try {
      await fetch(sheetsUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });

      setStatus('success');
      setFormData(emptyForm);
    } catch (error) {
      console.error('Error al enviar el formulario', error);
      setStatus('error');
      setErrorMessage(
        'No pudimos enviar el formulario. Intentá de nuevo en unos minutos.',
      );
    }
  };

  return (
    <section className="scroll-mt-[5.5rem] bg-warm-50 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <span className="inline-block rounded-full bg-brand-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-700">
            {formularioPage.kicker}
          </span>
          <h1 className="mt-4 font-display text-3xl font-semibold text-brand-900 sm:text-5xl">
            {site.name}
          </h1>
          <p className="mt-4 text-base text-brand-800/80 sm:text-lg">
            {formularioPage.subtitle}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-brand-800/70 sm:text-base">
            Dirección: {formularioPage.address}
            <br />
            WhatsApp:{' '}
            <a
              className="font-semibold text-brand-700 underline underline-offset-2"
              href={formularioPage.whatsappLink}
              target="_blank"
              rel="noreferrer"
            >
              {formularioPage.whatsappDisplay}
            </a>
            {' · '}
            Email:{' '}
            <a
              className="font-semibold text-brand-700 underline underline-offset-2"
              href={`mailto:${formularioPage.email}`}
            >
              {formularioPage.email}
            </a>
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-brand-800/65 sm:text-base">
            {formularioPage.intro}
          </p>
        </motion.header>

        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 space-y-5 rounded-2xl border border-brand-100 bg-white p-6 text-center shadow-sm shadow-brand-900/5 sm:p-10"
          >
            <CheckCircle2 className="mx-auto text-brand-600" size={40} />
            <h2 className="font-display text-2xl font-semibold text-brand-900">
              ¡Listo! Recibimos tus datos.
            </h2>
            <p className="text-brand-800/75">
              Si preferís, escribinos ahora por WhatsApp:
            </p>
            <a
              href={formularioPage.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              <MessageCircle size={16} />
              Contactanos por WhatsApp
            </a>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={sendToSheet}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-12 space-y-5 rounded-2xl border border-brand-100 bg-white p-6 shadow-sm shadow-brand-900/5 sm:p-8"
          >
            <p className="text-base font-semibold text-brand-900">
              {formularioPage.title}
            </p>

            <div>
              <label htmlFor="vinculo" className="mb-1.5 block text-sm font-medium text-brand-800">
                1. Vínculo con el adulto mayor
              </label>
              <input
                id="vinculo"
                type="text"
                placeholder="Ej: Hijo/a, Sobrino/a, Cónyuge, etc."
                className={fieldClass}
                value={formData.vinculo}
                onChange={(e) => updateField('vinculo', e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="whatsapp" className="mb-1.5 block text-sm font-medium text-brand-800">
                2. WhatsApp
              </label>
              <input
                id="whatsapp"
                type="tel"
                inputMode="tel"
                required
                placeholder="Ej: 11 6150-4440"
                className={fieldClass}
                value={formData.whatsapp}
                onChange={(e) => updateField('whatsapp', e.target.value)}
              />
              <p className="mt-1.5 text-xs text-brand-800/60">
                Solo número de WhatsApp. Ahí te enviamos el presupuesto y la información.
              </p>
            </div>

            <div>
              <label htmlFor="salud" className="mb-1.5 block text-sm font-medium text-brand-800">
                3. Breve relato de su estado de salud
              </label>
              <textarea
                id="salud"
                rows={4}
                placeholder="Mencionar nivel de movilidad, lucidez o diagnósticos relevantes"
                className={`${fieldClass} resize-y`}
                value={formData.salud}
                onChange={(e) => updateField('salud', e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="motivos" className="mb-1.5 block text-sm font-medium text-brand-800">
                4. Motivos por los cuales busca residencia geriátrica
              </label>
              <textarea
                id="motivos"
                rows={4}
                placeholder="Ej: Necesidad de cuidados permanentes, rehabilitación, compañía, etc."
                className={`${fieldClass} resize-y`}
                value={formData.motivos}
                onChange={(e) => updateField('motivos', e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="cobertura" className="mb-1.5 block text-sm font-medium text-brand-800">
                5. Obra Social / cobertura médica / privado
              </label>
              <input
                id="cobertura"
                type="text"
                className={fieldClass}
                value={formData.cobertura}
                onChange={(e) => updateField('cobertura', e.target.value)}
              />
            </div>

            <fieldset>
              <legend className="mb-2 text-sm font-medium text-brand-800">
                6. ¿Cuenta con Certificado Único de Discapacidad (CUD)?
              </legend>
              <div className="flex gap-6">
                {(['Sí', 'No'] as const).map((option) => (
                  <label
                    key={option}
                    className="inline-flex items-center gap-2 text-sm font-medium text-brand-900"
                  >
                    <input
                      type="radio"
                      name="cud"
                      value={option}
                      required
                      checked={formData.cud === option}
                      onChange={() => updateField('cud', option)}
                      className="size-4 accent-brand-600"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </fieldset>

            {status === 'error' && errorMessage && (
              <p className="text-center text-sm font-medium text-red-700">
                {errorMessage}
              </p>
            )}

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
              {status === 'sending' ? 'Enviando...' : 'Enviar'}
            </button>
          </motion.form>
        )}
      </div>
    </section>
  );
}

export default Formulario;
