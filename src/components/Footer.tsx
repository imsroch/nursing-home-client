import { footer, site } from '../content/site';
import { scrollToSection } from '../lib/scroll';

function Footer() {
  return (
    <footer className="border-t border-brand-200 bg-brand-900 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <div className="text-center sm:text-left">
          <p className="font-display text-lg font-semibold">{site.name}</p>
          <p className="text-sm text-brand-200">{site.location}</p>
        </div>
        <p className="text-center text-sm text-brand-200 sm:text-right">
          {new Date().getFullYear()} &copy; {footer.copyright}
        </p>
      </div>
      <div className="border-t border-brand-800 px-4 py-3 text-center text-xs text-brand-300">
        <button
          type="button"
          onClick={() => scrollToSection('contacto')}
          className="hover:text-white"
        >
          Contacto
        </button>
      </div>
    </footer>
  );
}

export default Footer;
