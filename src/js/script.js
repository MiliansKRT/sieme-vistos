// Menu Mobile
const mobileBtn = document.querySelector('.btn-mobile');
const navLinks = document.getElementById('nav-links');
const icon = document.querySelector('.btn-mobile i');
const links = document.querySelectorAll('#nav-links a');

const toggleMenu = () => {
    if (navLinks && icon) {
        navLinks.classList.toggle('show');
        icon.classList.toggle('fa-times');
        icon.classList.toggle('fa-bars');
    }
};

if (mobileBtn) mobileBtn.addEventListener('click', toggleMenu);

links.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks?.classList.contains('show')) toggleMenu();
    });
});

// --- SISTEMA DE ANIMAÇÃO OTIMIZADO ---
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -80px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // USAMOS 'revealed' EM VEZ DE 'active' PARA NÃO CONFLITAR COM O FAQ
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

const animatedElements = document.querySelectorAll(
    '.home-content, .home-image-wrapper, .services-card, .schedule-wrapper, .about-content, .faq-item, .title'
);

animatedElements.forEach(el => {
    el.classList.add('reveal-effect');
    observer.observe(el);
});

// Lógica do FAQ (Mantém como estava, usando .active)
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(otherItem => otherItem.classList.remove('active'));
        if (!isActive) item.classList.add('active');
    });
});