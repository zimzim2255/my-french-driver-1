// Global Scroll Reveal with a luxury feel
// - Adds 'lux-reveal' class to page content containers
// - Observes elements to toggle 'is-visible' when in viewport

export function applyGlobalScrollReveal(root: HTMLElement) {
  if (!root) return;
  const selector = [
    'main section',
    'main article',
    'main [class*="grid"] > *',
    'main [class*="card"]',
    'main [data-reveal]'
  ].join(',');

  const nodes = Array.from(root.querySelectorAll<HTMLElement>(selector));
  const candidates = nodes.filter((el) => !el.closest('[data-no-reveal]') && !el.classList.contains('lux-reveal'));

  // Skip elements that should not animate
  const shouldSkip = (el: HTMLElement) => el.closest('[data-no-reveal]');

  candidates.forEach((el, idx) => {
    if (shouldSkip(el as HTMLElement)) return;
    // Don't add if it's already configured
    if (!el.classList.contains('lux-reveal')) {
      el.classList.add('lux-reveal');
      // Lighter stagger to reduce layout thrash
      el.style.setProperty('--reveal-delay', `${(idx % 4) * 20}ms`);
      // Elevate cards and sections slightly
      if (/(card|section|panel|block|box)/i.test(el.className)) {
        el.classList.add('lux-elevate');
      }
    }
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const t = entry.target as HTMLElement;
          t.classList.add('is-visible');
          // Reveal once for performance
          io.unobserve(t);
        }
      });
    },
    {
      root: null,
      rootMargin: '0px 0px -15% 0px',
      threshold: 0.15,
    }
  );

  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(() => candidates.forEach((el) => io.observe(el)));
  } else {
    setTimeout(() => candidates.forEach((el) => io.observe(el)), 0);
  }

  // Return cleanup
  return () => io.disconnect();
}
