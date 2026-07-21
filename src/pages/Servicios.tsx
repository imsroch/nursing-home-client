import { motion } from 'framer-motion';
import Services from '../components/Services';
import { serviciosPage } from '../content/site';

function Servicios() {
  return (
    <section id="servicios" className="scroll-mt-[5.5rem] bg-warm-50 py-16 sm:py-24">
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-3xl px-4 text-center sm:px-6"
      >
        <span className="inline-block rounded-full bg-brand-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-700">
          {serviciosPage.kicker}
        </span>
        <h2 className="mt-4 font-display text-3xl font-semibold text-brand-900 sm:text-5xl">
          {serviciosPage.title}
        </h2>
        <p className="mt-6 text-base leading-relaxed text-brand-800/90 sm:text-lg">
          {serviciosPage.intro}
        </p>
      </motion.header>

      <div className="mt-14">
        <Services />
      </div>
    </section>
  );
}

export default Servicios;
