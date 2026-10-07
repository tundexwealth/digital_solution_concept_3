const menuButton = document.querySelector('.nav-toggle');
const navigation = document.querySelector('.primary-nav');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    navigation.classList.toggle('is-open', !isOpen);
  });

  navigation.addEventListener('click', (event) => {
    if (!event.target.closest('a')) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    navigation.classList.remove('is-open');
  });
}

const heroVideo = document.querySelector('.hero-video');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const syncVideoMotion = () => {
  if (!heroVideo) return;
  if (reducedMotion.matches) {
    heroVideo.pause();
  } else {
    heroVideo.play().catch(() => {});
  }
};
syncVideoMotion();
reducedMotion.addEventListener?.('change', syncVideoMotion);

const contactForm = document.querySelector('#nexora-form');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;
    contactForm.querySelector('.form-status').textContent = 'Successfully filled form.';
  });
}

const testimonialEntries = [
  { quote: 'Nexora took time to understand what we were trying to achieve, then made the path forward feel simple. We came away with a much clearer digital experience and a team we trust.', initials: 'AM', name: 'Alex Morgan', role: 'Founder, Sample Company' },
  { quote: 'The team brought structure to a complicated project and kept the work grounded in how our customers actually use our services.', initials: 'TO', name: 'Taylor Okafor', role: 'Director, Example Business' },
  { quote: 'From the first conversation to launch, every decision had a clear reason behind it. The result feels like a natural fit for our business.', initials: 'RK', name: 'Riley King', role: 'Operations Lead, Sample Group' },
];
let activeTestimonial = 0;
document.querySelectorAll('.quote-controls button').forEach((button, index) => {
  button.addEventListener('click', () => {
    activeTestimonial = (activeTestimonial + (index === 1 ? 1 : -1) + testimonialEntries.length) % testimonialEntries.length;
    const entry = testimonialEntries[activeTestimonial];
    const section = document.querySelector('.testimonial-section');
    section.querySelector('.testimonial-main>p').textContent = `“${entry.quote}”`;
    section.querySelector('.author-monogram').textContent = entry.initials;
    section.querySelector('.quote-author b').textContent = entry.name;
    section.querySelector('.quote-author small').textContent = entry.role;
    section.querySelector('.quote-controls>span').innerHTML = `${String(activeTestimonial + 1).padStart(2, '0')} <i>—</i> 03`;
  });
});
