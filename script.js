document.addEventListener('DOMContentLoaded', function() {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        document.body.classList.add('mobile-device');
        
        const style = document.createElement('style');
        style.textContent = `
            .skill-card, .social-link {
                transition: transform 0.2s ease !important;
            }
            
            @media (prefers-reduced-motion: reduce) {
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    const sections = document.querySelectorAll('section');
    const animationDelay = isMobile ? 100 : 200;
    
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * animationDelay);
    });

    const skillCards = document.querySelectorAll('.skill-card');
    const socialLinks = document.querySelectorAll('.social-link');
    
    if (isTouchDevice) {
        [...skillCards, ...socialLinks].forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            }, { passive: true });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }, { passive: true });
        });
    } else {
        skillCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px)';
                this.style.boxShadow = '0 12px 30px rgba(102, 126, 234, 0.2)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.05)';
            });
        });

        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.03)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    if (!isMobile) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.2}px)`;
            }
        });
    }

    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            document.documentElement.style.setProperty('--viewport-height', window.innerHeight + 'px');
        }, 100);
    });

    document.documentElement.style.setProperty('--viewport-height', window.innerHeight + 'px');

    console.log(`bioquest сайт загружен! Добро пожаловать, solv1x! (${isMobile ? 'Мобильная' : 'ПК'} версия)`);
});