import { motion } from 'framer-motion';
import { Briefcase, HeartPulse, Users } from 'lucide-react';
import { services } from '../content/site';

const icons = {
  salud: HeartPulse,
  social: Users,
  servicios: Briefcase,
} as const;

function Services() {
  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3 sm:px-6">
      {services.map((service, index) => {
        const Icon = icons[service.id];

        return (
          <motion.article
            key={service.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="flex flex-col rounded-2xl border border-brand-100 bg-white p-6 shadow-sm shadow-brand-900/5"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white">
              <Icon size={22} />
            </div>
            <h3 className="font-display text-xl font-semibold text-brand-900">
              {service.title}
            </h3>
            <p className="mt-1 text-sm font-medium text-brand-500">
              {service.subtitle}
            </p>
            <ul className="mt-4 space-y-2 border-t border-brand-100 pt-4">
              {service.roles.map((role) => (
                <li
                  key={role}
                  className="flex items-start gap-2 text-sm text-brand-800"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                  {role}
                </li>
              ))}
            </ul>
          </motion.article>
        );
      })}
    </div>
  );
}

export default Services;
