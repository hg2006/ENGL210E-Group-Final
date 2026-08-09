const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.primary-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('open', !isOpen);
});

navigation?.addEventListener('click', (event) => {
  if (event.target.matches('a')) {
    navigation.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }
});

const sectionLinks = [...document.querySelectorAll('.primary-nav a')];
const observedSections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver((entries) => {
  const visible = entries
    .filter((entry) => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

  if (!visible) return;

  sectionLinks.forEach((link) => {
    const active = link.getAttribute('href') === `#${visible.target.id}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}, { rootMargin: '-20% 0px -65% 0px', threshold: [0, 0.15, 0.35] });

observedSections.forEach((section) => sectionObserver.observe(section));

const printRulesButton = document.querySelector('.print-button');

printRulesButton?.addEventListener('click', () => {
  document.body.classList.add('print-rules-only');
  window.print();
});

window.addEventListener('afterprint', () => {
  document.body.classList.remove('print-rules-only');
});
