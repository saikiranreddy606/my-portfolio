/* ============================================================
   script.js — Portfolio JavaScript
   Web Design & Development Assignment
   ============================================================ */

/* ── 1. NAVBAR: change background on scroll ── */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }

  // Show/hide scroll-to-top button
  const btn = document.getElementById('scrollTopBtn');
  if (window.scrollY > 300) {
    btn.classList.add('visible');
  } else {
    btn.classList.remove('visible');
  }
});

/* ── 2. SCROLL TO TOP ── */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ── 3. TYPING ANIMATION for hero role ── */
const roles = [
  'Web Developer 💻',
  'UI/UX Enthusiast 🎨',
  'Problem Solver 🔧',
  'Creative Coder ✨'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typedRole');

function typeEffect() {
  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    typedEl.textContent = currentRole.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1600);
      return;
    }
  } else {
    typedEl.textContent = currentRole.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? 60 : 100);
}

/* ── 4. SKILL BARS: animate on scroll ── */
function animateSkillBars() {
  const bars = document.querySelectorAll('.skill-fill');
  bars.forEach(bar => {
    const rect = bar.getBoundingClientRect();
    const inView = rect.top < window.innerHeight - 60;
    if (inView && bar.style.width === '') {
      bar.style.width = bar.getAttribute('data-pct') + '%';
    }
  });
}

/* ── 5. CONTACT FORM VALIDATION (JavaScript interaction) ── */
function handleSubmit() {
  const name  = document.getElementById('contactName').value.trim();
  const email = document.getElementById('contactEmail').value.trim();
  const msg   = document.getElementById('contactMsg').value.trim();

  let valid = true;

  // Clear previous errors
  document.getElementById('nameError').textContent  = '';
  document.getElementById('emailError').textContent = '';
  document.getElementById('msgError').textContent   = '';
  document.getElementById('successMsg').style.display = 'none';

  if (!name) {
    document.getElementById('nameError').textContent = '⚠ Please enter your name.';
    valid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    document.getElementById('emailError').textContent = '⚠ Please enter your email.';
    valid = false;
  } else if (!emailRegex.test(email)) {
    document.getElementById('emailError').textContent = '⚠ Please enter a valid email address.';
    valid = false;
  }

  if (!msg) {
    document.getElementById('msgError').textContent = '⚠ Please write a message.';
    valid = false;
  }

  if (valid) {
    const btn = document.getElementById('sendBtn');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    // Simulate sending (replace with actual backend/email API if needed)
    setTimeout(() => {
      document.getElementById('successMsg').style.display = 'block';
      document.getElementById('contactName').value  = '';
      document.getElementById('contactEmail').value = '';
      document.getElementById('contactMsg').value   = '';
      btn.textContent = 'Send Message ✈';
      btn.disabled = false;
    }, 1200);
  }
}

/* ── 6. SMOOTH ACTIVE NAV LINK on scroll ── */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

function highlightNav() {
  let scrollPos = window.scrollY + 100;
  sections.forEach(section => {
    if (scrollPos >= section.offsetTop &&
        scrollPos < section.offsetTop + section.offsetHeight) {
      navLinks.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}

/* ── 7. CLOSE MOBILE MENU on link click ── */
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    const collapse = document.getElementById('navMenu');
    const bsCollapse = bootstrap.Collapse.getInstance(collapse);
    if (bsCollapse) bsCollapse.hide();
  });
});

/* ── Init ── */
window.addEventListener('load', () => {
  typeEffect();
  animateSkillBars();
});

window.addEventListener('scroll', () => {
  animateSkillBars();
  highlightNav();
});
