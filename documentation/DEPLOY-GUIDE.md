# 🚀 Guia de Deploy - GitHub Pages

## Passo a Passo Completo

### 1️⃣ Preparar o Repositório

#### Opção A: Criar Novo Repositório

1. Acesse [GitHub](https://github.com) e faça login
2. Clique no botão "New" para criar novo repositório
3. Configure:
   - **Repository name**: `clicandomemorias` (ou outro nome)
   - **Description**: "Site oficial Carla Padilha Fotografia"
   - **Public** (para GitHub Pages gratuito)
   - ✅ Marque "Add a README file"
4. Clique em "Create repository"

#### Opção B: Usar Repositório Existente

Se já tem um repositório, pule para o passo 2.

---

### 2️⃣ Upload dos Arquivos

#### Via GitHub Web (Mais Simples)

1. No seu repositório, clique em "Add file" > "Upload files"
2. Arraste todos os arquivos e pastas:
   ```
   index.html
   css/
   js/
   images/
   sitemap.xml
   robots.txt
   CNAME
   README.md
   ```
3. Adicione mensagem de commit: "Initial commit - Site completo"
4. Clique em "Commit changes"

#### Via Git Command Line (Avançado)

```bash
# Clone o repositório
git clone https://github.com/SEU-USUARIO/clicandomemorias.git
cd clicandomemorias

# Adicione todos os arquivos
git add .

# Commit
git commit -m "Initial commit - Site completo"

# Push
git push origin main
```

---

### 3️⃣ Ativar GitHub Pages

1. No repositório, vá em **Settings** (⚙️)
2. No menu lateral, clique em **Pages**
3. Em "Source":
   - Selecione **Deploy from a branch**
   - Branch: **main**
   - Folder: **/ (root)**
4. Clique em **Save**
5. Aguarde 1-2 minutos
6. Acesse: `https://SEU-USUARIO.github.io/clicandomemorias/`

✅ **Site publicado!**

---

### 4️⃣ Configurar Domínio Personalizado

#### No GitHub

1. Ainda em **Settings > Pages**
2. Em "Custom domain", digite: `clicandomemorias.com.br`
3. Clique em **Save**
4. Aguarde a verificação DNS

#### No Provedor de Domínio

Configure os DNS records:

**Tipo A** (4 registros):
```
Host: @
Valor: 185.199.108.153
Valor: 185.199.109.153
Valor: 185.199.110.153
Valor: 185.199.111.153
TTL: 3600
```

**Tipo CNAME**:
```
Host: www
Valor: SEU-USUARIO.github.io
TTL: 3600
```

**Importante**: A propagação DNS pode levar até 48 horas.

#### Verificar DNS

Teste a propagação em: [DNSChecker.org](https://dnschecker.org/)

---

### 5️⃣ Ativar HTTPS

1. Aguarde a propagação DNS completar
2. Volte em **Settings > Pages**
3. ✅ Marque **Enforce HTTPS**
4. Aguarde alguns minutos

O GitHub Pages fornece certificado SSL gratuito via Let's Encrypt.

---

### 6️⃣ Configurar Formspree

1. Acesse [Formspree.io](https://formspree.io/)
2. Crie uma conta gratuita
3. Clique em "New Form"
4. Configure:
   - **Form Name**: "Contato Site"
   - **Your email**: clicandomemoriasfotografia@gmail.com
5. Copie o **Form ID** (algo como `abc123def`)
6. Edite o arquivo `js/form-handler.js`:
   ```javascript
   const FORMSPREE_ENDPOINT = 'https://formspree.io/f/abc123def';
   ```
7. Commit e push das alterações:
   ```bash
   git add js/form-handler.js
   git commit -m "Configurar Formspree"
   git push origin main
   ```

---

### 7️⃣ Google Search Console

1. Acesse [Google Search Console](https://search.google.com/search-console)
2. Clique em "Adicionar propriedade"
3. Selecione "Prefixo do URL"
4. Digite: `https://clicandomemorias.com.br`
5. Verifique a propriedade (métodos):

#### Método 1: HTML Tag (Mais Fácil)
```html
<!-- Cole no <head> do index.html -->
<meta name="google-site-verification" content="SEU_CÓDIGO_AQUI" />
```

#### Método 2: DNS (Recomendado)
Adicione um registro TXT no DNS:
```
Host: @
Tipo: TXT
Valor: google-site-verification=SEU_CÓDIGO
```

6. Após verificar, envie o sitemap:
   - URL: `https://clicandomemorias.com.br/sitemap.xml`

---

### 8️⃣ Google Analytics (Já Configurado)

O código já está no site: `G-Q7EWY2RP2B`

Para verificar se funciona:
1. Acesse [Google Analytics](https://analytics.google.com/)
2. Faça login
3. Verifique se o site aparece
4. Acesse o site e veja se aparece em "Realtime"

---

## 🔧 Manutenção e Atualizações

### Atualizar Conteúdo

#### Via GitHub Web
1. Navegue até o arquivo que quer editar
2. Clique no ícone de lápis (✏️)
3. Faça as alterações
4. Scroll até o fim, adicione mensagem
5. Clique em "Commit changes"
6. Aguarde 1-2 minutos para o site atualizar

#### Via Git
```bash
# Edite os arquivos localmente
# Depois:
git add .
git commit -m "Descrição da atualização"
git push origin main
```

### Adicionar Novas Fotos

1. Otimize as imagens primeiro (TinyPNG, Squoosh)
2. Upload para `images/portfolio/`
3. Edite `index.html` para incluir as novas imagens
4. Commit e push

---

## ❌ Troubleshooting

### Problema: Site não aparece

**Solução**:
1. Verifique se está acessando a URL correta
2. Aguarde 1-2 minutos após o commit
3. Limpe o cache do navegador (Ctrl+Shift+R)
4. Verifique em Settings > Pages se está "Active"

### Problema: Domínio personalizado não funciona

**Solução**:
1. Verifique DNS no [DNSChecker](https://dnschecker.org/)
2. Aguarde até 48h para propagação
3. Verifique se o arquivo CNAME existe no repositório
4. Tente remover e adicionar o domínio novamente

### Problema: Formulário não envia

**Solução**:
1. Verifique se substituiu `YOUR_FORM_ID` no código
2. Teste o endpoint direto no Formspree dashboard
3. Verifique console do navegador (F12) para erros
4. Use alternativa WhatsApp (já implementada como fallback)

### Problema: Imagens não carregam

**Solução**:
1. Verifique caminhos relativos das imagens
2. Verifique se os arquivos foram feitos upload
3. Verifique case-sensitive nos nomes (Linux diferencia maiúsculas)
4. Use sempre caminhos relativos: `images/foto.jpg` (não `/images/`)

### Problema: CSS/JS não aplicam

**Solução**:
1. Limpe cache do navegador (Ctrl+Shift+R)
2. Verifique caminhos dos arquivos no HTML
3. Abra DevTools (F12) > Console para ver erros
4. Aguarde alguns minutos para CDN do GitHub atualizar

---

## 📱 Testes Pós-Deploy

### ✅ Checklist Final

- [ ] Site carrega sem erros
- [ ] Todas as imagens aparecem
- [ ] Links de navegação funcionam
- [ ] Menu mobile abre/fecha
- [ ] Formulário de contato funciona
- [ ] Links do WhatsApp funcionam
- [ ] Links do Instagram funcionam
- [ ] Google Maps carrega
- [ ] Site é responsivo (teste em mobile)
- [ ] HTTPS está ativo (cadeado verde)
- [ ] Analytics está rastreando visitas

### Ferramentas de Teste

**Performance**:
- [PageSpeed Insights](https://pagespeed.web.dev/)
- Meta: Score > 90

**Mobile**:
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- Teste real em smartphone

**SEO**:
- [Rich Results Test](https://search.google.com/test/rich-results)
- Verifique se Schema.org está válido

**Acessibilidade**:
- [WAVE](https://wave.webaim.org/)
- [Lighthouse](https://web.dev/measure/) (Chrome DevTools)

---

## 🎯 Próximos Passos

### Imediato (Primeira Semana)
1. ✅ Deploy completo
2. ✅ Domínio configurado
3. ✅ Google Tools configurados
4. Substituir imagens placeholder
5. Coletar primeiros depoimentos reais

### Curto Prazo (Primeiro Mês)
1. Criar Google Business Profile
2. Publicar posts no Instagram sobre o site
3. Solicitar avaliações de clientes
4. Monitorar Analytics diariamente
5. Ajustar conteúdo baseado em feedback

### Médio Prazo (3-6 Meses)
1. Adicionar blog para SEO
2. Conseguir backlinks locais
3. Otimizar baseado em dados do Search Console
4. Considerar Google Ads
5. Expandir portfólio regularmente

---

## 📞 Suporte

Se precisar de ajuda:

1. **GitHub Issues**: Para problemas técnicos do código
2. **GitHub Docs**: https://docs.github.com/pages
3. **Formspree Docs**: https://help.formspree.io/
4. **Google Search Console Help**: https://support.google.com/webmasters

---

## 🎉 Parabéns!

Seu site está no ar! Agora é manter atualizado e acompanhar os resultados.

**Lembre-se**: SEO é um trabalho contínuo. Seja paciente e consistente!

---

**Desenvolvido com ❤️ para Clicando Memórias**