// ===================================
// Lightbox Gallery System
// ===================================

class PortfolioLightbox {
    constructor() {
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImage = this.lightbox.querySelector('.lightbox-image');
        this.lightboxCaption = this.lightbox.querySelector('.lightbox-caption');
        this.lightboxCounter = this.lightbox.querySelector('.lightbox-counter');
        this.closeBtn = this.lightbox.querySelector('.lightbox-close');
        this.prevBtn = this.lightbox.querySelector('.lightbox-prev');
        this.nextBtn = this.lightbox.querySelector('.lightbox-next');

        this.currentGallery = [];
        this.currentIndex = 0;
        this.currentGalleryName = '';

        this.init();
    }

    init() {
        // Adicionar event listeners aos portfolio items
        const portfolioItems = document.querySelectorAll('.portfolio-item[data-gallery]');
        portfolioItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const galleryName = item.getAttribute('data-gallery');
                this.openGallery(galleryName);
            });

            // Acessibilidade via teclado
            item.setAttribute('tabindex', '0');
            item.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const galleryName = item.getAttribute('data-gallery');
                    this.openGallery(galleryName);
                }
            });
        });

        // Event listeners dos controles do lightbox
        this.closeBtn.addEventListener('click', () => this.closeLightbox());
        this.prevBtn.addEventListener('click', () => this.showPrevious());
        this.nextBtn.addEventListener('click', () => this.showNext());

        // Fechar ao clicar no fundo
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.closeLightbox();
            }
        });

        // Navegação por teclado
        document.addEventListener('keydown', (e) => {
            if (!this.lightbox.classList.contains('active')) return;

            switch(e.key) {
                case 'Escape':
                    this.closeLightbox();
                    break;
                case 'ArrowLeft':
                    this.showPrevious();
                    break;
                case 'ArrowRight':
                    this.showNext();
                    break;
            }
        });
    }

    async openGallery(galleryName) {
        this.currentGalleryName = galleryName;

        // Carregar imagens da galeria
        await this.loadGalleryImages(galleryName);

        if (this.currentGallery.length === 0) {
            console.warn(`Nenhuma imagem encontrada para a galeria: ${galleryName}`);
            alert('Esta galeria ainda não possui imagens.');
            return;
        }

        this.currentIndex = 0;
        this.showImage(this.currentIndex);
        this.openLightbox();
    }

    async loadGalleryImages(galleryName) {
        // Tentar carregar imagens da galeria
        // Como estamos em ambiente estático, vamos buscar por um arquivo JSON
        // ou tentar carregar imagens conhecidas

        try {
            // Tentar carregar configuração de galeria
            const response = await fetch(`/images/portfolio/${galleryName}/gallery.json`);
            if (response.ok) {
                const data = await response.json();
                this.currentGallery = data.images.map(img => ({
                    src: `/images/portfolio/${galleryName}/${img.filename}`,
                    caption: img.caption || '',
                    alt: img.alt || `Foto da galeria ${galleryName}`
                }));
            } else {
                // Fallback: tentar carregar imagens com nomes padrão
                this.currentGallery = await this.tryLoadDefaultImages(galleryName);
            }
        } catch (error) {
            console.log('Tentando carregar imagens padrão...');
            this.currentGallery = await this.tryLoadDefaultImages(galleryName);
        }
    }

    async tryLoadDefaultImages(galleryName) {
        // Tentar carregar até 20 imagens com nomes sequenciais
        const images = [];
        const extensions = ['jpg', 'jpeg', 'png', 'webp'];

        for (let i = 1; i <= 20; i++) {
            for (let ext of extensions) {
                const filename = `foto-${i}.${ext}`;
                const src = `/images/portfolio/${galleryName}/${filename}`;

                if (await this.imageExists(src)) {
                    images.push({
                        src: src,
                        caption: '',
                        alt: `Foto ${i} da galeria ${galleryName}`
                    });
                    break; // Encontrou com esta extensão, pular para próximo número
                }
            }
        }

        // Se não encontrou nenhuma imagem, tentar também com nomes sem número
        if (images.length === 0) {
            for (let i = 1; i <= 5; i++) {
                for (let ext of extensions) {
                    const filename = `${i}.${ext}`;
                    const src = `/images/portfolio/${galleryName}/${filename}`;

                    if (await this.imageExists(src)) {
                        images.push({
                            src: src,
                            caption: '',
                            alt: `Foto ${i} da galeria ${galleryName}`
                        });
                        break;
                    }
                }
            }
        }

        return images;
    }

    imageExists(url) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
        });
    }

    showImage(index) {
        if (index < 0 || index >= this.currentGallery.length) return;

        this.currentIndex = index;
        const image = this.currentGallery[index];

        // Animação de transição
        this.lightboxImage.style.opacity = '0';

        setTimeout(() => {
            this.lightboxImage.src = image.src;
            this.lightboxImage.alt = image.alt;
            this.lightboxCaption.textContent = image.caption;
            this.lightboxCounter.textContent = `${index + 1} / ${this.currentGallery.length}`;

            this.lightboxImage.style.opacity = '1';
        }, 150);

        // Mostrar/ocultar botões de navegação
        this.prevBtn.style.display = this.currentGallery.length > 1 ? 'block' : 'none';
        this.nextBtn.style.display = this.currentGallery.length > 1 ? 'block' : 'none';
    }

    showPrevious() {
        let newIndex = this.currentIndex - 1;
        if (newIndex < 0) {
            newIndex = this.currentGallery.length - 1; // Loop para o final
        }
        this.showImage(newIndex);
    }

    showNext() {
        let newIndex = this.currentIndex + 1;
        if (newIndex >= this.currentGallery.length) {
            newIndex = 0; // Loop para o início
        }
        this.showImage(newIndex);
    }

    openLightbox() {
        this.lightbox.classList.add('active');
        this.lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Prevenir scroll da página
    }

    closeLightbox() {
        this.lightbox.classList.remove('active');
        this.lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Restaurar scroll

        // Limpar imagem após fechar
        setTimeout(() => {
            this.lightboxImage.src = '';
            this.lightboxCaption.textContent = '';
            this.lightboxCounter.textContent = '';
        }, 300);
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioLightbox();
});
