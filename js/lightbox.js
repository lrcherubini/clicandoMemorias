// ===================================
// Lightbox Gallery System - FIXED
// ===================================
 
class PortfolioLightbox {
    constructor() {
        this.lightbox = document.getElementById('lightbox');
        
        if (!this.lightbox) {
            console.error('Lightbox element not found!');
            return;
        }
        
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
        console.log('Lightbox inicializado');
        
        // Adicionar event listeners aos portfolio items
        const portfolioItems = document.querySelectorAll('.portfolio-item[data-gallery]');
        console.log(`Encontrados ${portfolioItems.length} portfolio items`);
        
        portfolioItems.forEach(item => {
            item.style.cursor = 'pointer';
            
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const galleryName = item.getAttribute('data-gallery');
                console.log(`Clicado na galeria: ${galleryName}`);
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
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.closeLightbox());
        }
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.showPrevious());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.showNext());
        }
 
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
        console.log(`Abrindo galeria: ${galleryName}`);
        this.currentGalleryName = galleryName;
 
        // Carregar imagens da galeria
        await this.loadGalleryImages(galleryName);
 
        if (this.currentGallery.length === 0) {
            console.warn(`Nenhuma imagem encontrada para a galeria: ${galleryName}`);
            alert('Esta galeria ainda não possui imagens. Por favor, adicione as fotos reais do portfólio.');
            return;
        }
 
        console.log(`Galeria carregada com ${this.currentGallery.length} imagens`);
        this.currentIndex = 0;
        this.showImage(this.currentIndex);
        this.openLightbox();
    }
 
    async loadGalleryImages(galleryName) {
        // Primeiro, tentar carregar o gallery.json
        try {
            const jsonPath = `images/portfolio/${galleryName}/gallery.json`;
            console.log(`Tentando carregar: ${jsonPath}`);
            
            const response = await fetch(jsonPath);
            if (response.ok) {
                const data = await response.json();
                console.log('Gallery.json carregado:', data);
                
                this.currentGallery = data.images.map(img => ({
                    src: `images/portfolio/${galleryName}/${img.filename}`,
                    caption: img.caption || '',
                    alt: img.alt || `Foto da galeria ${galleryName}`
                }));
                
                return;
            }
        } catch (error) {
            console.log('Erro ao carregar gallery.json, tentando método alternativo...', error);
        }
        
        // Fallback: tentar carregar imagens com nomes padrão
        this.currentGallery = await this.tryLoadDefaultImages(galleryName);
    }
 
    async tryLoadDefaultImages(galleryName) {
        console.log('Tentando carregar imagens padrão...');
        const images = [];
        const extensions = ['jpg', 'jpeg', 'png', 'webp'];
 
        // Tentar com foto-1, foto-2, etc.
        for (let i = 1; i <= 20; i++) {
            for (let ext of extensions) {
                const filename = `foto-${i}.${ext}`;
                const src = `images/portfolio/${galleryName}/${filename}`;
 
                if (await this.imageExists(src)) {
                    images.push({
                        src: src,
                        caption: `Foto ${i}`,
                        alt: `Foto ${i} da galeria ${galleryName}`
                    });
                    console.log(`Imagem encontrada: ${src}`);
                    break;
                }
            }
        }
 
        // Se não encontrou, tentar com 1.jpg, 2.jpg, etc.
        if (images.length === 0) {
            for (let i = 1; i <= 10; i++) {
                for (let ext of extensions) {
                    const filename = `${i}.${ext}`;
                    const src = `images/portfolio/${galleryName}/${filename}`;
 
                    if (await this.imageExists(src)) {
                        images.push({
                            src: src,
                            caption: `Foto ${i}`,
                            alt: `Foto ${i} da galeria ${galleryName}`
                        });
                        console.log(`Imagem encontrada: ${src}`);
                        break;
                    }
                }
            }
        }
 
        console.log(`Total de imagens encontradas: ${images.length}`);
        return images;
    }
 
    imageExists(url) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                console.log(`✓ Imagem existe: ${url}`);
                resolve(true);
            };
            img.onerror = () => {
                console.log(`✗ Imagem não existe: ${url}`);
                resolve(false);
            };
            img.src = url;
            
            // Timeout de 3 segundos
            setTimeout(() => resolve(false), 3000);
        });
    }
 
    showImage(index) {
        if (index < 0 || index >= this.currentGallery.length) return;
 
        this.currentIndex = index;
        const image = this.currentGallery[index];
 
        console.log(`Mostrando imagem ${index + 1}:`, image);
 
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
        console.log('Abrindo lightbox');
        this.lightbox.classList.add('active');
        this.lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
 
    closeLightbox() {
        console.log('Fechando lightbox');
        this.lightbox.classList.remove('active');
        this.lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
 
        setTimeout(() => {
            this.lightboxImage.src = '';
            this.lightboxCaption.textContent = '';
            this.lightboxCounter.textContent = '';
        }, 300);
    }
}
 
// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM carregado, inicializando lightbox...');
    
    // Pequeno delay para garantir que tudo foi carregado
    setTimeout(() => {
        new PortfolioLightbox();
    }, 100);
});