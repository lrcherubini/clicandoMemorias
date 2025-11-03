/**
 * Carla Padilha Fotografia - Form Handler
 * Gerenciamento do formulário de contato
 */

(function() {
    'use strict';
    
    document.addEventListener('DOMContentLoaded', function() {
        
        const contactForm = document.getElementById('contactForm');
        const formStatus = document.getElementById('formStatus');
        
        if (!contactForm) return;
        
        // ============================================
        // VALIDAÇÃO DE EMAIL
        // ============================================
        function isValidEmail(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
        
        // ============================================
        // VALIDAÇÃO DE TELEFONE
        // ============================================
        function isValidPhone(phone) {
            // Remove caracteres não numéricos
            const cleanPhone = phone.replace(/\D/g, '');
            // Aceita telefones com 10 ou 11 dígitos
            return cleanPhone.length >= 10 && cleanPhone.length <= 11;
        }
        
        // ============================================
        // EXIBIR MENSAGEM DE STATUS
        // ============================================
        function showStatus(message, type) {
            formStatus.textContent = message;
            formStatus.className = `form-status ${type}`;
            formStatus.style.display = 'block';
            
            // Remove a mensagem após 5 segundos
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }
        
        // ============================================
        // ENVIO DO FORMULÁRIO
        // ============================================
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Limpa mensagens anteriores
            formStatus.style.display = 'none';
            
            // Coleta os dados do formulário
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                service: document.getElementById('service').value,
                message: document.getElementById('message').value.trim()
            };
            
            // ============================================
            // VALIDAÇÕES
            // ============================================
            
            // Valida nome
            if (formData.name.length < 3) {
                showStatus('Por favor, insira seu nome completo.', 'error');
                document.getElementById('name').focus();
                return;
            }
            
            // Valida email
            if (!isValidEmail(formData.email)) {
                showStatus('Por favor, insira um e-mail válido.', 'error');
                document.getElementById('email').focus();
                return;
            }
            
            // Valida telefone
            if (!isValidPhone(formData.phone)) {
                showStatus('Por favor, insira um telefone válido.', 'error');
                document.getElementById('phone').focus();
                return;
            }
            
            // Valida mensagem
            if (formData.message.length < 10) {
                showStatus('Por favor, conte-nos um pouco mais sobre o que você deseja (mínimo 10 caracteres).', 'error');
                document.getElementById('message').focus();
                return;
            }
            
            // ============================================
            // DESABILITA O BOTÃO DE ENVIO
            // ============================================
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';
            
            try {
                // ============================================
                // OPÇÃO 1: ENVIO VIA FORMSPREE (Recomendado para GitHub Pages)
                // ============================================
                // Para usar Formspree:
                // 1. Crie uma conta em https://formspree.io/
                // 2. Crie um novo formulário
                // 3. Substitua 'YOUR_FORM_ID' abaixo pelo ID do seu formulário
                
                const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
                
                const response = await fetch(FORMSPREE_ENDPOINT, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                
                if (response.ok) {
                    // Sucesso
                    showStatus('✨ Mensagem enviada com sucesso! Em breve entrarei em contato.', 'success');
                    contactForm.reset();
                    
                    // Google Analytics Event (se configurado)
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'form_submission', {
                            'event_category': 'Contact',
                            'event_label': formData.service || 'Geral'
                        });
                    }
                    
                } else {
                    throw new Error('Erro no envio');
                }
                
            } catch (error) {
                console.error('Erro ao enviar formulário:', error);
                
                // Em caso de erro, oferece alternativa via WhatsApp
                const whatsappMessage = `Olá Carla! Meu nome é ${formData.name}.%0A%0A${formData.message}%0A%0AMeu e-mail: ${formData.email}%0ATelefone: ${formData.phone}`;
                const whatsappUrl = `https://api.whatsapp.com/send?phone=5547984578291&text=${whatsappMessage}`;
                
                showStatus(
                    `Ops! Houve um problema ao enviar o formulário. Mas não se preocupe! <a href="${whatsappUrl}" target="_blank" style="color: #E07A5F; text-decoration: underline;">Clique aqui para enviar sua mensagem via WhatsApp</a>.`,
                    'error'
                );
                
                formStatus.innerHTML = `Ops! Houve um problema ao enviar o formulário. Mas não se preocupe! <a href="${whatsappUrl}" target="_blank" rel="noopener" style="color: #E07A5F; text-decoration: underline;">Clique aqui para enviar sua mensagem via WhatsApp</a>.`;
                
            } finally {
                // Reabilita o botão
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        });
        
        // ============================================
        // VALIDAÇÃO EM TEMPO REAL (OPCIONAL)
        // ============================================
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        
        // Validação de email ao sair do campo
        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                if (this.value && !isValidEmail(this.value)) {
                    this.style.borderColor = '#E07A5F';
                } else {
                    this.style.borderColor = '';
                }
            });
            
            emailInput.addEventListener('input', function() {
                if (isValidEmail(this.value)) {
                    this.style.borderColor = '#81B29A';
                }
            });
        }
        
        // Validação de telefone ao sair do campo
        if (phoneInput) {
            phoneInput.addEventListener('blur', function() {
                if (this.value && !isValidPhone(this.value)) {
                    this.style.borderColor = '#E07A5F';
                } else {
                    this.style.borderColor = '';
                }
            });
            
            phoneInput.addEventListener('input', function() {
                if (isValidPhone(this.value)) {
                    this.style.borderColor = '#81B29A';
                }
            });
        }
        
        // ============================================
        // ALTERNATIVA: ENVIO DIRETO PARA EMAIL VIA MAILTO
        // (Menos elegante, mas funciona sem backend)
        // ============================================
        /*
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value
            };
            
            const subject = encodeURIComponent(`Contato do Site - ${formData.service || 'Geral'}`);
            const body = encodeURIComponent(
                `Nome: ${formData.name}\n` +
                `E-mail: ${formData.email}\n` +
                `Telefone: ${formData.phone}\n` +
                `Tipo de ensaio: ${formData.service}\n\n` +
                `Mensagem:\n${formData.message}`
            );
            
            window.location.href = `mailto:clicandomemoriasfotografia@gmail.com?subject=${subject}&body=${body}`;
        });
        */
        
    }); // Fim do DOMContentLoaded
    
})();