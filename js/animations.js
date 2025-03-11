// Archivo para manejar animaciones y efectos visuales

// Función para inicializar las animaciones cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: false,
            mirror: true
        });
    }

    // Efecto parallax para el hero
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    }

    // Animación de contador para estadísticas
    const counters = document.querySelectorAll('.counter-value');
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    let count = 0;
                    const updateCounter = () => {
                        const increment = target / 100;
                        if (count < target) {
                            count += increment;
                            counter.innerText = Math.ceil(count);
                            setTimeout(updateCounter, 20);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    // Efecto de typing para textos destacados
    const typingElements = document.querySelectorAll('.typing-text');
    if (typingElements.length > 0) {
        typingElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            let i = 0;
            
            const typeWriter = () => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            };
            
            const typingObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        typeWriter();
                        typingObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            typingObserver.observe(element);
        });
    }

    // Efecto de hover 3D para tarjetas
    const cards = document.querySelectorAll('.feature-item, .service-item, .team-member, .portfolio-item');
    if (cards.length > 0) {
        cards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const xc = rect.width / 2;
                const yc = rect.height / 2;
                
                const dx = x - xc;
                const dy = y - yc;
                
                this.style.transform = `perspective(1000px) rotateY(${dx / 20}deg) rotateX(${-dy / 20}deg) translateZ(10px)`;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateZ(0)';
                this.style.transition = 'all 0.5s ease';
            });
        });
    }
    
    // Efectos especiales para la sección de portafolio
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const portfolioFilters = document.querySelectorAll('.portfolio-filter-btn');
    
    // Inicializar animaciones para los elementos del portafolio
    if (portfolioItems.length > 0) {
        // Efecto de aparición escalonada
        portfolioItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(50px)';
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                            item.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
                        }, index * 150);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            
            observer.observe(item);
        });
        
        // Efecto de hover avanzado
        portfolioItems.forEach(item => {
            const overlay = item.querySelector('.portfolio-overlay');
            const link = item.querySelector('.portfolio-link');
            const img = item.querySelector('img');
            const info = item.querySelector('.portfolio-info');
            
            item.addEventListener('mouseenter', () => {
                if (overlay) overlay.style.clipPath = 'circle(150% at 50% 50%)';
                if (link) {
                    link.style.opacity = '1';
                    link.style.transform = 'translateY(0) scale(1)';
                }
                if (img) img.style.transform = 'scale(1.1)';
                if (info) info.style.backgroundColor = '#f9f9f9';
            });
            
            item.addEventListener('mouseleave', () => {
                if (overlay) overlay.style.clipPath = 'circle(0% at 50% 50%)';
                if (link) {
                    link.style.opacity = '0';
                    link.style.transform = 'translateY(30px) scale(0.8)';
                }
                if (img) img.style.transform = 'scale(1)';
                if (info) info.style.backgroundColor = 'var(--light-color)';
            });
        });
    }
    
    // Filtrado de proyectos si existen los filtros
    if (portfolioFilters.length > 0) {
        portfolioFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                // Remover clase activa de todos los filtros
                portfolioFilters.forEach(btn => btn.classList.remove('active'));
                // Añadir clase activa al filtro clickeado
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Filtrar los elementos del portafolio
                portfolioItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 200);
                    } else if (item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 200);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Animación para el menú de navegación
    const navLinks = document.querySelectorAll('nav ul li a');
    if (navLinks.length > 0) {
        navLinks.forEach((link, index) => {
            link.style.opacity = '0';
            link.style.animation = `fadeInNav 0.5s ease forwards ${index * 0.1 + 0.3}s`;
        });
    }

    // Efecto de partículas para el fondo del hero (si existe la biblioteca particles.js)
    const particlesContainer = document.getElementById('particles-js');
    if (particlesContainer && typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#ffffff' },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: false },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.4, width: 1 },
                move: { enable: true, speed: 6, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
            },
            interactivity: {
                detect_on: 'canvas',
                events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } },
                modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
            },
            retina_detect: true
        });
    }
});

// Añadir estilos CSS para las animaciones
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes fadeInNav {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
        100% { transform: translateY(0px); }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .float-animation {
        animation: float 6s ease-in-out infinite;
    }
    
    .pulse-animation {
        animation: pulse 2s infinite;
    }
`;
document.head.appendChild(animationStyles);