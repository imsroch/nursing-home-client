import { motion } from 'framer-motion';
import { institucionalPage } from '../content/site';

function Institucional() {
  return (
    <section
      id="institucional"
      className="scroll-mt-[5.5rem] bg-warm-50 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-block rounded-full bg-brand-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-700">
            {institucionalPage.kicker}
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-brand-900 sm:text-5xl">
            {institucionalPage.title}
          </h2>
        </motion.header>

        <div className="mt-14 space-y-8">
          {institucionalPage.sections.map((section, index) => (
            <motion.article
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sm shadow-brand-900/5 sm:p-8"
            >
              <h3 className="font-display text-xl font-semibold text-brand-800 sm:text-2xl">
                {section.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-brand-800/90 sm:text-lg">
                {section.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Institucional;
