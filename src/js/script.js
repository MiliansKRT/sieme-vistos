// Menu Mobile com fechamento automático
const mobileBtn = document.querySelector('.btn-mobile');
const navLinks = document.getElementById('nav-links');
const icon = document.querySelector('.btn-mobile i');
const links = document.querySelectorAll('#nav-links a');

const toggleMenu = () => {
    navLinks.classList.toggle('show');
    icon.classList.toggle('fa-times');
    icon.classList.toggle('fa-bars');
};

mobileBtn.addEventListener('click', toggleMenu);

// Fecha o menu ao clicar em qualquer link (essencial para UX mobile)
links.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('show')) toggleMenu();
    });
});

// Header Shrink (Efeito ao rolar a página)
window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    header.classList.toggle("shrink", window.scrollY > 80);
});

// Reveal Animation (Animação ao aparecer na tela)
// Isso faz com que os elementos surjam elegantemente
const observerOptions = {
    threshold: 0.15 // Dispara quando 15% do elemento estiver visível
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Seleciona o que deve ser animado
document.querySelectorAll('.services-card, .about-content, .home-content').forEach(el => {
    el.style.opacity = "0"; // Começa invisível
    el.style.transform = "translateY(30px)"; // Começa um pouco abaixo
    el.style.transition = "all 0.8s ease-out";
    observer.observe(el);
});

// CSS inline para as animações funcionarem (ou você pode pôr no SCSS)
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .active { 
            opacity: 1 !important; 
            transform: translateY(0) !important; 
        }
    </style>
`);