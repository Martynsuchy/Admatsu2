/**
 * Global smooth scroll helper with accurate offsets for sticky header
 * and pinned multi-viewport sections.
 */
export const scrollToTarget = (targetIdOrHref: string) => {
  if (typeof window === 'undefined') return;

  // Cleanly strip any lingering hash (like #kontakt) so browser address bar remains clean (/, /en, /de)
  if (window.location.hash) {
    window.history.replaceState(null, '', window.location.pathname);
  }

  const cleanId = targetIdOrHref.replace(/^#/, '');
  const el = document.getElementById(cleanId);
  if (!el) return;

  const rect = el.getBoundingClientRect();
  const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;

  if (cleanId === 'srovnani') {
    // Notify TechComparison to reset state to 0 (old/red card dominant)
    window.dispatchEvent(new CustomEvent('tech-comparison-reset', { detail: { progress: 0 } }));

    // Land exactly at the top of the collision arena so progress is 0 and Red card is in full focus
    // Container top lands at 0 so sticky viewport (top-16) is right under the 64px navbar.
    const targetTop = rect.top + currentScrollY;
    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: 'smooth',
    });
    return;
  }

  // For sections like seo-geo, sluzby, proces, faq, kontakt:
  // Account for 64px sticky navbar + 20px breathing space so the kicker and headline are never clipped or hidden.
  const targetTop = rect.top + currentScrollY - 84;
  window.scrollTo({
    top: Math.max(0, targetTop),
    behavior: 'smooth',
  });
};
