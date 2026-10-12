/**
 * Tokners Interactive Features & Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header scroll effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile navigation toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');

  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mainNav.classList.toggle('active');
      mobileMenuBtn.classList.toggle('active');
    });

    // Close mobile nav when clicking any link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
      });
    });
  }

  // 3. Smooth scrolling for internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const headerOffset = 90;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // 4. Parallax micro-interaction on rocket and clouds
  const comingCard = document.querySelector('.coming-card');
  const rocket = document.querySelector('.rocket-img');
  const cloudTop = document.querySelector('.cloud-top');
  const cloudBottom = document.querySelector('.cloud-bottom');

  if (comingCard && rocket) {
    comingCard.addEventListener('mousemove', (e) => {
      const rect = comingCard.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      rocket.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
      if (cloudTop) cloudTop.style.transform = `translate(${-x * 30}px, ${-y * 20}px)`;
      if (cloudBottom) cloudBottom.style.transform = `translate(${x * 30}px, ${y * 20}px)`;
    });

    comingCard.addEventListener('mouseleave', () => {
      rocket.style.transform = '';
      if (cloudTop) cloudTop.style.transform = '';
      if (cloudBottom) cloudBottom.style.transform = '';
    });
  }
});
