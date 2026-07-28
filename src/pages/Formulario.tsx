import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  MessageCircle,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
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

type Step =
  | { id: 'welcome'; kind: 'welcome' }
  | {
      id: keyof FormData;
      kind: 'text' | 'tel' | 'textarea';
      question: string;
      helper?: string;
      placeholder?: string;
      required?: boolean;
    }
  | {
      id: 'cud';
      kind: 'choice';
      question: string;
      options: readonly string[];
      required: true;
    };

const emptyForm: FormData = {
  vinculo: '',
  whatsapp: '',
  salud: '',
  motivos: '',
  cobertura: '',
  cud: '',
};

const steps: Step[] = [
  { id: 'welcome', kind: 'welcome' },
  {
    id: 'vinculo',
    kind: 'text',
    question: '¿Cuál es tu vínculo con el adulto mayor?',
    helper: 'Ej: Hijo/a, Sobrino/a, Cónyuge, etc.',
    placeholder: 'Tu respuesta',
  },
  {
    id: 'whatsapp',
    kind: 'tel',
    question: '¿A qué WhatsApp te contactamos?',
    helper:
      'Código de área + número, sin 15 (10 dígitos). Ej: 11 6150-4440. Ahí te enviamos el presupuesto.',
    placeholder: '11 6150-4440',
    required: true,
  },
  {
    id: 'salud',
    kind: 'textarea',
    question: 'Contanos brevemente su estado de salud',
    helper: 'Movilidad, lucidez o diagnósticos relevantes.',
    placeholder: 'Escribí acá...',
  },
  {
    id: 'motivos',
    kind: 'textarea',
    question: '¿Por qué buscan una residencia geriátrica?',
    helper: 'Ej: cuidados permanentes, rehabilitación, compañía, etc.',
    placeholder: 'Escribí acá...',
  },
  {
    id: 'cobertura',
    kind: 'text',
    question: '¿Tiene obra social, cobertura médica o es privado?',
    placeholder: 'Ej: PAMI, Swiss Medical, privado...',
  },
  {
    id: 'cud',
    kind: 'choice',
    question: '¿Cuenta con Certificado Único de Discapacidad (CUD)?',
    options: ['Sí', 'No'],
    required: true,
  },
];

const questionSteps = steps.filter((step) => step.kind !== 'welcome');
const WHATSAPP_STEP_INDEX = steps.findIndex((step) => step.id === 'whatsapp');

function buildWhatsAppLink(raw: string): { number: string; link: string } | null {
  let digits = raw.replace(/\D/g, '');
  if (!digits) return null;

  if (digits.startsWith('00')) {
    digits = digits.slice(2);
  }

  if (digits.length === 10) {
    digits = `549${digits}`;
  } else if (digits.startsWith('54') && !digits.startsWith('549') && digits.length === 12) {
    digits = `549${digits.slice(2)}`;
  } else if (digits.startsWith('9') && digits.length === 11) {
    digits = `54${digits}`;
  }

  if (!/^549\d{10}$/.test(digits)) {
    return null;
  }

  return {
    number: digits,
    link: `https://wa.me/${digits}`,
  };
}

function whatsappStepError(raw: string): string | null {
  if (!raw.trim()) return 'Ingresá un número de WhatsApp.';
  if (!buildWhatsAppLink(raw)) {
    return 'WhatsApp inválido. Usá código de área + número (10 dígitos). Ej: 11 6150-4440';
  }
  return null;
}

function Formulario() {
  const reduceMotion = useReducedMotion();
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [whatsappTouched, setWhatsappTouched] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  const step = steps[stepIndex]!;
  const isWelcome = step.kind === 'welcome';
  const questionNumber = Math.max(0, stepIndex);
  const progress =
    status === 'success'
      ? 100
      : isWelcome
        ? 0
        : (questionNumber / questionSteps.length) * 100;

  useEffect(() => {
    if (status === 'success' || isWelcome) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 280);
    return () => window.clearTimeout(timer);
  }, [stepIndex, status, isWelcome]);

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field === 'whatsapp') {
      if (whatsappTouched) {
        setErrorMessage(whatsappStepError(value) ?? '');
      } else if (errorMessage) {
        setErrorMessage('');
      }
      return;
    }

    if (errorMessage) setErrorMessage('');
  };

  const validateCurrentStep = (): string | null => {
    if (step.kind === 'welcome') return null;

    if (step.kind === 'tel') {
      setWhatsappTouched(true);
      return whatsappStepError(formData.whatsapp);
    }

    if (step.kind === 'choice' && step.required && !formData.cud) {
      return 'Elegí una opción para continuar.';
    }

    if ('required' in step && step.required && step.kind !== 'choice') {
      const value = formData[step.id].trim();
      if (!value) return 'Completá este campo para continuar.';
    }

    return null;
  };

  const goTo = (nextIndex: number, keepError = false) => {
    setDirection(nextIndex > stepIndex ? 1 : -1);
    if (!keepError) setErrorMessage('');
    setStepIndex(nextIndex);
  };

  const goNext = () => {
    const validationError = validateCurrentStep();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    if (stepIndex < steps.length - 1) {
      goTo(stepIndex + 1);
      return;
    }

    void submitForm();
  };

  const goBack = () => {
    if (stepIndex === 0 || status === 'sending') return;
    goTo(stepIndex - 1);
  };

  const submitForm = async (cudValue = formData.cud) => {
    setErrorMessage('');

    const sheetsUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL;
    if (!sheetsUrl) {
      setStatus('error');
      setErrorMessage(
        'Falta configurar VITE_GOOGLE_SHEETS_URL. Revisá el archivo .env.local.',
      );
      return;
    }

    const wa = buildWhatsAppLink(formData.whatsapp);
    if (!wa) {
      setStatus('idle');
      setWhatsappTouched(true);
      setErrorMessage(whatsappStepError(formData.whatsapp) ?? 'WhatsApp inválido.');
      if (WHATSAPP_STEP_INDEX >= 0) goTo(WHATSAPP_STEP_INDEX, true);
      return;
    }

    if (!cudValue) {
      setStatus('error');
      setErrorMessage('Elegí si cuenta con CUD.');
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
      cud: cudValue,
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

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== 'Enter') return;

    if (step.kind === 'textarea' && !event.metaKey && !event.ctrlKey) {
      return;
    }

    event.preventDefault();
    goNext();
  };

  const selectChoice = (value: string) => {
    const whatsappError = whatsappStepError(formData.whatsapp);
    if (whatsappError) {
      setWhatsappTouched(true);
      setErrorMessage(whatsappError);
      if (WHATSAPP_STEP_INDEX >= 0) goTo(WHATSAPP_STEP_INDEX, true);
      return;
    }

    updateField('cud', value);
    window.setTimeout(() => {
      setDirection(1);
      void submitForm(value);
    }, reduceMotion ? 0 : 220);
  };

  const slideDistance = reduceMotion ? 0 : 56;
  const variants = {
    enter: (dir: number) => ({
      y: dir > 0 ? slideDistance : -slideDistance,
      opacity: 0,
      filter: reduceMotion ? 'blur(0px)' : 'blur(4px)',
    }),
    center: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
    },
    exit: (dir: number) => ({
      y: dir > 0 ? -slideDistance : slideDistance,
      opacity: 0,
      filter: reduceMotion ? 'blur(0px)' : 'blur(4px)',
    }),
  };

  const isLastQuestion = stepIndex === steps.length - 1;
  const ctaLabel = isWelcome
    ? 'Empezar'
    : isLastQuestion
      ? status === 'sending'
        ? 'Enviando...'
        : 'Enviar'
      : 'OK';
  const normalizedWhatsapp =
    step.kind === 'tel' && whatsappTouched
      ? buildWhatsAppLink(formData.whatsapp)
      : null;

  return (
    <section className="relative min-h-[calc(100vh-4.5rem)] overflow-hidden bg-warm-50">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(194,102,48,0.12),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(102,49,26,0.08),_transparent_40%)]"
      />

      <div className="relative mx-auto flex min-h-[calc(100vh-4.5rem)] max-w-3xl flex-col px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-6">
          <div className="mb-3 flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-wide text-brand-700/80">
            <span>{site.name}</span>
            {status !== 'success' && !isWelcome && (
              <span>
                {questionNumber} / {questionSteps.length}
              </span>
            )}
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-brand-100">
            <motion.div
              className="h-full rounded-full bg-brand-600"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>

        <div className="relative flex flex-1 items-center">
          <AnimatePresence mode="wait" custom={direction}>
            {status === 'success' ? (
              <motion.div
                key="success"
                custom={1}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="w-full text-center"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-brand-100 text-brand-700"
                >
                  <CheckCircle2 size={34} />
                </motion.div>
                <h1 className="font-display text-3xl font-semibold text-brand-900 sm:text-5xl">
                  ¡Listo! Recibimos tus datos.
                </h1>
                <p className="mx-auto mt-4 max-w-lg text-base text-brand-800/75 sm:text-lg">
                  Si preferís, escribinos ahora por WhatsApp:
                </p>
                <a
                  href={formularioPage.whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-900/10 transition hover:bg-brand-700"
                >
                  <MessageCircle size={18} />
                  Contactanos por WhatsApp
                </a>
              </motion.div>
            ) : (
              <motion.div
                key={step.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="w-full"
                onKeyDown={handleKeyDown}
              >
                {isWelcome ? (
                  <div className="max-w-2xl">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-600">
                      {formularioPage.kicker}
                    </p>
                    <h1 className="font-display text-4xl font-semibold leading-tight text-brand-900 sm:text-5xl">
                      {site.name}
                    </h1>
                    <p className="mt-5 text-lg text-brand-800/80">
                      {formularioPage.subtitle}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-brand-800/65 sm:text-base">
                      {formularioPage.intro}
                    </p>
                    <p className="mt-6 text-sm text-brand-800/70">
                      {formularioPage.address}
                      <br />
                      WhatsApp {formularioPage.whatsappDisplay} · {formularioPage.email}
                    </p>
                  </div>
                ) : (
                  <div className="max-w-2xl">
                    <p className="mb-3 text-sm font-semibold text-brand-600">
                      {questionNumber} →
                    </p>
                    <h2 className="font-display text-3xl font-semibold leading-tight text-brand-900 sm:text-4xl">
                      {step.question}
                    </h2>
                    {'helper' in step && step.helper && (
                      <p className="mt-3 text-base text-brand-800/65">{step.helper}</p>
                    )}

                    <div className="mt-8">
                      {step.kind === 'choice' ? (
                        <div className="flex flex-col gap-3 sm:flex-row">
                          {step.options.map((option, index) => (
                            <motion.button
                              key={option}
                              type="button"
                              whileHover={reduceMotion ? undefined : { y: -2 }}
                              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                              onClick={() => selectChoice(option)}
                              disabled={status === 'sending'}
                              className={`flex items-center gap-3 rounded-2xl border px-5 py-4 text-left text-lg font-semibold transition ${
                                formData.cud === option
                                  ? 'border-brand-600 bg-brand-600 text-white'
                                  : 'border-brand-200 bg-white text-brand-900 hover:border-brand-400'
                              }`}
                            >
                              <span className="inline-flex size-8 items-center justify-center rounded-lg border border-current/20 text-sm">
                                {String.fromCharCode(65 + index)}
                              </span>
                              {option}
                            </motion.button>
                          ))}
                        </div>
                      ) : step.kind === 'textarea' ? (
                        <textarea
                          ref={(el) => {
                            inputRef.current = el;
                          }}
                          rows={4}
                          value={formData[step.id]}
                          onChange={(e) => updateField(step.id, e.target.value)}
                          placeholder={step.placeholder}
                          className="w-full resize-none border-0 border-b-2 border-brand-200 bg-transparent px-0 py-3 text-2xl text-brand-900 outline-none transition placeholder:text-brand-300 focus:border-brand-600"
                        />
                      ) : (
                        <>
                          <input
                            ref={(el) => {
                              inputRef.current = el;
                            }}
                            type={step.kind === 'tel' ? 'tel' : 'text'}
                            inputMode={step.kind === 'tel' ? 'tel' : 'text'}
                            autoComplete={step.kind === 'tel' ? 'tel' : 'on'}
                            value={formData[step.id]}
                            onChange={(e) => updateField(step.id, e.target.value)}
                            onBlur={(e) => {
                              if (step.kind !== 'tel') return;
                              setWhatsappTouched(true);
                              setErrorMessage(
                                whatsappStepError(e.target.value) ?? '',
                              );
                            }}
                            placeholder={step.placeholder}
                            className="w-full border-0 border-b-2 border-brand-200 bg-transparent px-0 py-3 text-2xl text-brand-900 outline-none transition placeholder:text-brand-300 focus:border-brand-600"
                          />
                          {normalizedWhatsapp && (
                            <p className="mt-2 text-sm text-brand-700/70">
                              Se guardará como +{normalizedWhatsapp.number}
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )}

                {errorMessage && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-5 text-sm font-medium text-red-700"
                  >
                    {errorMessage}
                  </motion.p>
                )}

                {step.kind !== 'choice' && (
                  <div className="mt-10 flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={goNext}
                      disabled={status === 'sending'}
                      className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-900/10 transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {status === 'sending' ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <ArrowRight size={16} />
                      )}
                      {ctaLabel}
                    </button>
                    <p className="text-sm text-brand-800/55">
                      {step.kind === 'textarea'
                        ? 'Ctrl/⌘ + Enter para continuar'
                        : 'presioná Enter ↵'}
                    </p>
                  </div>
                )}

                {status === 'sending' && step.kind === 'choice' && (
                  <p className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand-700">
                    <Loader2 size={16} className="animate-spin" />
                    Enviando...
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {status !== 'success' && (
          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={goBack}
              disabled={stepIndex === 0 || status === 'sending'}
              className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-brand-800/70 transition hover:bg-brand-100 hover:text-brand-900 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ArrowLeft size={16} />
              Atrás
            </button>
            <p className="text-xs text-brand-800/45">
              Sin nombres ni datos sensibles del adulto mayor
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Formulario;
