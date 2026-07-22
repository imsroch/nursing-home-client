import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { site } from '../content/site';
import { scrollToSection } from '../lib/scroll';
import heroImage from '../assets/fondo.avif';
import heroFallback from '../assets/fondo.jpg';

function Home() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen scroll-mt-0 overflow-hidden"
    >
      <picture className="absolute inset-0">
        <source srcSet={heroImage} type="image/avif" />
        <img
          src={heroFallback}
          alt=""
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
      </picture>
      <div className="absolute inset-0 bg-linear-to-b from-brand-950/70 via-brand-900/60 to-brand-950/80" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-4 py-20 sm:px-6">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-200"
        >
          {site.location}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-4xl font-display text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl"
        >
          {site.taglineLead}
          <span className="italic text-brand-200">{site.taglineAccent}</span>
          {site.taglineTail}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-2xl text-xl font-medium text-brand-100 sm:text-2xl"
        >
          {site.name}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <button
            type="button"
            onClick={() => scrollToSection('institucional')}
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-900 transition hover:bg-brand-50"
          >
            Conocé la institución
            <ArrowRight size={16} />
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('contacto')}
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Contactanos
          </button>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          {site.trustBadges.map((badge) => (
            <li
              key={badge}
              className="rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-50 backdrop-blur-sm"
            >
              {badge}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

export default Home;
