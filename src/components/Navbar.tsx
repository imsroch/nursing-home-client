import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { navItems, site } from '../content/site';
import { scrollToSection } from '../lib/scroll';

function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState('inicio');
  const location = useLocation();
  const navigate = useNavigate();
  const onHome = location.pathname === '/';

  useEffect(() => {
    if (!onHome) {
      setActiveId('formulario');
      return;
    }

    const sections = navItems
      .filter((item) => item.kind === 'section')
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-40% 0px -45% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [onHome]);

  useEffect(() => {
    if (!onHome) return;
    const hash = location.hash.replace('#', '');
    if (hash) {
      requestAnimationFrame(() => scrollToSection(hash));
    }
  }, [location.hash, onHome]);

  const handleSectionNav = (id: string) => {
    setOpen(false);
    if (onHome) {
      scrollToSection(id);
      return;
    }
    navigate(`/#${id}`);
  };

  const linkClass = (id: string) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
      activeId === id
        ? 'bg-white/20 text-white'
        : 'text-white/90 hover:bg-white/10 hover:text-white'
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-brand-800/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <button
          type="button"
          className="shrink-0"
          onClick={() => handleSectionNav('inicio')}
          aria-label={`Ir a inicio - ${site.name}`}
        >
          <span className="font-display text-lg font-semibold italic text-white sm:text-xl">
            {site.name}
          </span>
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) =>
            item.kind === 'route' ? (
              <Link
                key={item.id}
                to={item.href}
                onClick={() => setOpen(false)}
                className={linkClass(item.id)}
              >
                {item.label}
              </Link>
            ) : (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSectionNav(item.id)}
                className={linkClass(item.id)}
              >
                {item.label}
              </button>
            ),
          )}
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-white md:hidden"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-brand-800 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {navItems.map((item) =>
              item.kind === 'route' ? (
                <Link
                  key={item.id}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className={linkClass(item.id)}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSectionNav(item.id)}
                  className={linkClass(item.id)}
                >
                  {item.label}
                </button>
              ),
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
