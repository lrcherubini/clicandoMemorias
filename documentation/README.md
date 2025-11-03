# Carla Padilha Fotografia - Site Oficial

Site oficial da fotógrafa Carla Padilha - Clicando Memórias. Especializada em ensaios de família, gestantes, 15 anos e retratos corporativos em Joinville, SC.

## 🎨 Sobre o Projeto

Este site foi desenvolvido com foco em:
- **SEO otimizado** para aparecer nas primeiras páginas de busca
- **Performance** com carregamento rápido
- **Acessibilidade** seguindo padrões WCAG
- **Design responsivo** para todos os dispositivos
- **Experiência do usuário** intuitiva e agradável

## 🚀 Tecnologias Utilizadas

- HTML5 Semântico
- CSS3 com variáveis customizadas
- JavaScript Vanilla (sem dependências)
- Google Analytics
- Schema.org para Rich Snippets
- Open Graph e Twitter Cards

## 📁 Estrutura do Projeto

```
clicandomemorias/
├── index.html              # Página principal
├── css/
│   ├── main.css           # Estilos principais
│   └── responsive.css     # Media queries
├── js/
│   ├── main.js            # Scripts principais
│   └── form-handler.js    # Gerenciamento de formulário
├── images/
│   ├── portfolio/         # Imagens do portfólio
│   └── about/             # Imagens da seção sobre
├── sitemap.xml            # Mapa do site para SEO
├── robots.txt             # Instruções para crawlers
├── CNAME                  # Domínio personalizado
└── README.md              # Este arquivo
```

## 🔧 Configuração

### 1. GitHub Pages

1. Faça fork ou clone este repositório
2. Vá em Settings > Pages
3. Em "Source", selecione "Deploy from a branch"
4. Em "Branch", selecione "main" e "/root"
5. Clique em "Save"

### 2. Domínio Personalizado

O arquivo `CNAME` já está configurado com `clicandomemorias.com.br`. Para usar:

1. No seu provedor de domínio, configure os DNS:
   - Tipo: A
   - Host: @
   - Valor: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   
   - Tipo: CNAME
   - Host: www
   - Valor: seu-usuario.github.io

2. Aguarde a propagação DNS (pode levar até 48h)

### 3. Formulário de Contato

O site está configurado para usar Formspree. Para ativar:

1. Crie uma conta em [Formspree.io](https://formspree.io/)
2. Crie um novo formulário
3. Copie o ID do formulário
4. Edite `js/form-handler.js` e substitua `YOUR_FORM_ID` pelo seu ID

### 4. Google Analytics

O código do Google Analytics já está inserido no HTML com o ID: `G-Q7EWY2RP2B`

## 📱 Imagens

### Imagens Necessárias

Substitua os placeholders pelas imagens reais:

**Portfólio:**
- `images/portfolio/familias-1.jpg` até `familias-10.jpg`
- `images/portfolio/gestantes-1.jpg` até `gestantes-10.jpg`
- `images/portfolio/15anos-1.jpg` até `15anos-10.jpg`

**Sobre:**
- `images/about/carla-profile.jpg`

**SEO:**
- `images/og-image.jpg` (1200x630px) - Para compartilhamento em redes sociais
- `images/twitter-image.jpg` (1200x675px)

**Favicons:**
- `favicon-32x32.png`
- `favicon-16x16.png`
- `apple-touch-icon.png` (180x180px)

### Otimização de Imagens

Recomendações:
- Formato: WebP ou JPEG otimizado
- Qualidade: 80-85%
- Portfólio: máximo 800x800px
- Peso: máximo 200kb por imagem

Ferramentas recomendadas:
- [TinyPNG](https://tinypng.com/)
- [Squoosh](https://squoosh.app/)
- [ImageOptim](https://imageoptim.com/)

## 🎯 SEO e Performance

### Otimizações Implementadas

✅ Meta tags completas (title, description, keywords)
✅ Open Graph para redes sociais
✅ Schema.org JSON-LD
✅ Sitemap.xml
✅ Robots.txt
✅ Lazy loading de imagens
✅ Minificação de código
✅ Performance otimizada (LCP, FID, CLS)
✅ Mobile-first design
✅ Acessibilidade (ARIA labels, navegação por teclado)

### Palavras-chave Principais

- fotógrafa joinville
- ensaio de família joinville
- fotografia gestante joinville
- ensaio 15 anos joinville
- fotógrafa família SC

## 📊 Análise e Monitoramento

### Google Search Console

1. Acesse [Google Search Console](https://search.google.com/search-console)
2. Adicione a propriedade: `https://clicandomemorias.com.br`
3. Verifique a propriedade via HTML tag ou DNS
4. Envie o sitemap: `https://clicandomemorias.com.br/sitemap.xml`

### Google Analytics

Já configurado. Acesse [Google Analytics](https://analytics.google.com/) para ver:
- Visitantes
- Páginas mais acessadas
- Origem do tráfego
- Conversões (envios de formulário)

## 🌐 Redes Sociais

Perfis configurados no site:
- Instagram: [@clicandomemoriasfotografia](https://www.instagram.com/clicandomemoriasfotografia)
- WhatsApp: (47) 9 8457-8291
- Email: clicandomemoriasfotografia@gmail.com

## 🔄 Atualizações

Para atualizar o site:

1. Edite os arquivos localmente
2. Commit as mudanças:
   ```bash
   git add .
   git commit -m "Descrição da atualização"
   git push origin main
   ```
3. O GitHub Pages atualizará automaticamente em 1-2 minutos

## 📝 Manutenção

### Atualizar Portfólio

1. Adicione novas imagens em `images/portfolio/`
2. Edite `index.html` na seção `#portfolio`
3. Mantenha os alt texts descritivos para SEO

### Atualizar Depoimentos

Edite a seção `#experiencia` no `index.html` com novos depoimentos reais.

### Atualizar Sitemap

Sempre que adicionar novas páginas:
1. Edite `sitemap.xml`
2. Atualize a data `<lastmod>`
3. Reenvie no Google Search Console

## 🆘 Suporte

Para dúvidas ou problemas:
- Abra uma issue no GitHub
- Contate o desenvolvedor

## 📄 Licença

© 2025 Carla Padilha Fotografia. Todos os direitos reservados.

---

**Desenvolvido com ❤️ para Clicando Memórias**