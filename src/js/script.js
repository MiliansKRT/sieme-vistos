// Menu Mobile com fechamento automático
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

if (mobileBtn) {
    mobileBtn.addEventListener('click', toggleMenu);
}

// Fecha o menu ao clicar em qualquer link (essencial para UX mobile)
links.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks && navLinks.classList.contains('show')) {
            toggleMenu();
        }
    });
});

// Header Shrink (Efeito de redução ao rolar a página)
window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (header) {
        // Ativa o efeito após 50px de scroll
        header.classList.toggle("shrink", window.scrollY > 50);
    }
});

// Sistema de Animação de Entrada e Saída (Scroll Reveal)
const observerOptions = {
    threshold: 0.12, // Dispara quando 12% do elemento está visível
    rootMargin: "0px 0px -50px 0px" // Margem de segurança para o disparo
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            // REMOVE a classe ao sair da tela para animar novamente ao voltar
            entry.target.classList.remove('active');
        }
    });
}, observerOptions);

// Seleciona os elementos que devem ter o efeito de "surgir"
// Adicionamos as classes de conteúdo e as próprias seções para garantir fluidez
const animatedElements = document.querySelectorAll('.services-card, .about-content, .home-content, section');

animatedElements.forEach(el => {
    // Aplicamos a classe base de transição via JS para manter o SCSS limpo
    el.classList.add('reveal-effect');
    observer.observe(el);
});

// Isso garante que as animações funcionem mesmo se o SCSS demorar a carregar
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .reveal-effect {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
            will-change: opacity, transform;
        }
        
        .active { 
            opacity: 1 !important; 
            transform: translateY(0) !important; 
        }

        /* Correção para evitar cortes no Mobile e garantir altura total */
        @media (max-width: 768px) {
            #home {
                min-height: 100vh !important;
                height: auto !important;
                display: flex !important;
                padding-top: 120px !important; /* Espaço para o header fixo */
                padding-bottom: 60px !important;
            }
            .home-container {
                height: auto !important;
                min-height: min-content !important;
            }
        }
    </style>
`);

// Lógica do Acordeão do FAQ
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Fecha todos os outros (Opcional - remova se quiser permitir vários abertos)
        faqItems.forEach(otherItem => otherItem.classList.remove('active'));
        
        // Abre o atual se não estiver ativo
        if (!isActive) {
            item.classList.add('active');
        }
    });
});