/**
 * Carla Padilha Fotografia - Main JavaScript
 * Funcionalidades principais do site
 */

(function() {
    'use strict';
    
    // Espera o DOM estar completamente carregado
    document.addEventListener('DOMContentLoaded', function() {
        
        // ============================================
        // NAVEGAÇÃO MOBILE
        // ============================================
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', function() {
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                this.setAttribute('aria-expanded', !isExpanded);
                navLinks.classList.toggle('active');
            });
            
            // Fecha o menu ao clicar em um link
            const links = navLinks.querySelectorAll('a');
            links.forEach(link => {
                link.addEventListener('click', function() {
                    navLinks.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                });
            });
            
            // Fecha o menu ao clicar fora dele
            document.addEventListener('click', function(event) {
                if (!menuToggle.contains(event.target) && !navLinks.contains(event.target)) {
                    navLinks.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
        
        // ============================================
        // SMOOTH SCROLL COM OFFSET PARA NAVEGAÇÃO FIXA
        // ============================================
        const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
        const navHeight = document.querySelector('nav').offsetHeight;
        
        smoothScrollLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                
                // Ignora links vazios (#)
                if (targetId === '#' || targetId === '#!') {
                    e.preventDefault();
                    return;
                }
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = targetPosition - navHeight - 20;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Atualiza a URL sem recarregar a página
                    history.pushState(null, null, targetId);
                    
                    // Move o foco para o elemento alvo (acessibilidade)
                    targetElement.setAttribute('tabindex', '-1');
                    targetElement.focus();
                }
            });
        });
        
        // ============================================
        // NAVEGAÇÃO STICKY COM ANIMAÇÃO
        // ============================================
        const nav = document.querySelector('nav');
        let lastScrollTop = 0;
        let scrollTimeout;
        
        window.addEventListener('scroll', function() {
            clearTimeout(scrollTimeout);
            
            scrollTimeout = setTimeout(function() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                if (scrollTop > 100) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
                
                lastScrollTop = scrollTop;
            }, 10);
        }, { passive: true });
        
        // ============================================
        // INTERSECTION OBSERVER PARA ANIMAÇÕES
        // ============================================
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const fadeInObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Para de observar após animar
                    fadeInObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Aplica animação aos elementos que ainda não foram animados
        const animatedElements = document.querySelectorAll('.portfolio-item, .artistic-img');
        animatedElements.forEach(el => {
            // Verifica se o elemento não tem animação inline do CSS
            if (!el.hasAttribute('data-step')) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                fadeInObserver.observe(el);
            }
        });
        
        // ============================================
        // LAZY LOADING DE IMAGENS (FALLBACK)
        // ============================================
        if ('loading' in HTMLImageElement.prototype) {
            // O navegador suporta lazy loading nativo
            const images = document.querySelectorAll('img[loading="lazy"]');
            images.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
            });
        } else {
            // Fallback para navegadores antigos
            const lazyImages = document.querySelectorAll('img[loading="lazy"]');
            const imageObserver = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                        }
                        img.removeAttribute('loading');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => imageObserver.observe(img));
        }
        
        // ============================================
        // MENU ATIVO BASEADO NA SEÇÃO VISÍVEL
        // ============================================
        const sections = document.querySelectorAll('section[id]');
        const navItems = document.querySelectorAll('.nav-links a[href^="#"]');
        
        const highlightNav = function() {
            const scrollY = window.pageYOffset;
            
            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - navHeight - 100;
                const sectionId = section.getAttribute('id');
                
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navItems.forEach(item => {
                        item.classList.remove('active');
                        if (item.getAttribute('href') === `#${sectionId}`) {
                            item.classList.add('active');
                        }
                    });
                }
            });
        };
        
        window.addEventListener('scroll', highlightNav, { passive: true });
        
        // ============================================
        // MÁSCARA DE TELEFONE
        // ============================================
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                
                if (value.length > 11) {
                    value = value.slice(0, 11);
                }
                
                if (value.length <= 10) {
                    // Formato: (XX) XXXX-XXXX
                    value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
                } else {
                    // Formato: (XX) X XXXX-XXXX
                    value = value.replace(/^(\d{2})(\d{1})(\d{4})(\d{0,4}).*/, '($1) $2 $3-$4');
                }
                
                e.target.value = value;
            });
        }
        
        // ============================================
        // PERFORMANCE: DEBOUNCE PARA SCROLL
        // ============================================
        function debounce(func, wait = 10, immediate = true) {
            let timeout;
            return function() {
                const context = this, args = arguments;
                const later = function() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                const callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        }
        
        // ============================================
        // ACESSIBILIDADE: SKIP TO CONTENT
        // ============================================
        const skipLink = document.createElement('a');
        skipLink.href = '#home';
        skipLink.textContent = 'Pular para o conteúdo principal';
        skipLink.className = 'sr-only';
        skipLink.style.cssText = `
            position: absolute;
            left: -9999px;
            z-index: 999;
            padding: 1em;
            background-color: #000;
            color: #fff;
            text-decoration: none;
        `;
        
        skipLink.addEventListener('focus', function() {
            this.style.left = '0';
        });
        
        skipLink.addEventListener('blur', function() {
            this.style.left = '-9999px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // ============================================
        // DETECÇÃO DE PREFERÊNCIA DE MOVIMENTO REDUZIDO
        // ============================================
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            // Desabilita animações suaves para usuários que preferem menos movimento
            document.documentElement.style.scrollBehavior = 'auto';
        }
        
        // ============================================
        // LOG DE INICIALIZAÇÃO
        // ============================================
        console.log('%c✨ Carla Padilha Fotografia', 'color: #E07A5F; font-size: 20px; font-weight: bold;');
        console.log('%cSite carregado com sucesso!', 'color: #3D405B; font-size: 14px;');
        
    }); // Fim do DOMContentLoaded
    
})();