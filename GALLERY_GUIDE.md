# Guia: Sistema de Galeria com Lightbox

## 📸 Como Funciona

O site agora possui um sistema de galeria com lightbox exclusivo para cada categoria de portfólio. Quando o visitante clica em um portfolio-item, abre-se uma galeria em tela cheia com navegação entre as fotos.

## 🗂️ Estrutura de Diretórios

```
images/
└── portfolio/
    ├── familias/
    │   ├── gallery.json
    │   ├── foto-1.jpg
    │   ├── foto-2.jpg
    │   └── foto-3.jpg
    ├── gestantes/
    │   ├── gallery.json
    │   ├── foto-1.jpg
    │   └── foto-2.jpg
    └── 15anos/
        ├── gallery.json
        └── foto-1.jpg
```

## 📝 Configuração das Galerias

### Método 1: Usando gallery.json (Recomendado)

Crie um arquivo `gallery.json` em cada pasta de galeria com a seguinte estrutura:

```json
{
  "title": "Famílias",
  "description": "Momentos de conexão e leveza no cotidiano",
  "images": [
    {
      "filename": "foto-1.jpg",
      "caption": "Família reunida no parque",
      "alt": "Ensaio de família ao ar livre em Joinville"
    },
    {
      "filename": "foto-2.jpg",
      "caption": "Momentos de conexão",
      "alt": "Pais brincando com filhos"
    }
  ]
}
```

**Campos:**
- `filename`: Nome do arquivo da imagem (obrigatório)
- `caption`: Legenda que aparece abaixo da foto no lightbox (opcional)
- `alt`: Texto alternativo para acessibilidade (opcional)

### Método 2: Nomes de Arquivo Automáticos

Se você não criar um `gallery.json`, o sistema tentará carregar automaticamente imagens com os seguintes padrões de nome:

- `foto-1.jpg`, `foto-2.jpg`, `foto-3.jpg`, etc.
- `1.jpg`, `2.jpg`, `3.jpg`, etc.

O sistema tenta até 20 imagens e suporta as extensões: `.jpg`, `.jpeg`, `.png`, `.webp`

## ➕ Como Adicionar Novas Galerias

### Passo 1: Criar a Pasta

```bash
mkdir -p images/portfolio/nova-galeria
```

### Passo 2: Adicionar as Fotos

Coloque suas fotos na pasta. Exemplo:
```
images/portfolio/nova-galeria/
├── foto-1.jpg
├── foto-2.jpg
└── foto-3.jpg
```

### Passo 3: Criar gallery.json (opcional)

```json
{
  "title": "Nova Galeria",
  "description": "Descrição da nova galeria",
  "images": [
    {
      "filename": "foto-1.jpg",
      "caption": "Primeira foto",
      "alt": "Descrição da foto 1"
    }
  ]
}
```

### Passo 4: Adicionar no HTML

No arquivo `index.html`, adicione um novo portfolio-item:

```html
<article class="portfolio-item" data-gallery="nova-galeria">
    <img src="caminho/para/foto-capa.jpg"
         alt="Descrição da galeria"
         class="portfolio-img"
         loading="lazy">
    <div class="portfolio-overlay">
        <h3>Título da Galeria</h3>
        <p>Descrição breve</p>
        <span class="view-gallery">Ver galeria</span>
    </div>
</article>
```

**IMPORTANTE:** O valor do atributo `data-gallery` deve corresponder ao nome da pasta!

## 🎨 Funcionalidades

### Navegação

- **Mouse:** Clique nas setas ← → para navegar
- **Teclado:**
  - `←` (seta esquerda): Foto anterior
  - `→` (seta direita): Próxima foto
  - `Esc`: Fechar galeria
- **Contador:** Mostra "X / Total" de fotos

### Recursos

- ✅ Navegação circular (da última volta para primeira)
- ✅ Animação suave ao trocar fotos
- ✅ Legendas personalizadas por foto
- ✅ Contador de fotos
- ✅ Responsivo em todos os dispositivos
- ✅ Acessível via teclado
- ✅ Fecha clicando no fundo escuro

## 🔧 Manutenção

### Adicionar Fotos a uma Galeria Existente

1. Adicione a foto na pasta da galeria
2. Edite o `gallery.json` adicionando a nova entrada
3. As fotos aparecem na ordem definida no JSON

### Remover Fotos

1. Remova a entrada do `gallery.json`
2. Opcionalmente, delete o arquivo físico da foto

### Renomear Galeria

1. Renomeie a pasta em `images/portfolio/`
2. Atualize o atributo `data-gallery` no HTML
3. Atualize referências no `gallery.json` se necessário

## 📱 Responsividade

O lightbox foi projetado para funcionar perfeitamente em:
- 💻 Desktop (navegação com mouse e teclado)
- 📱 Tablets (touch)
- 📱 Smartphones (swipe - em desenvolvimento)

## 🎯 Próximos Passos Sugeridos

1. Adicionar suporte a gestos de swipe em dispositivos móveis
2. Implementar lazy loading nas galerias
3. Adicionar zoom nas imagens
4. Implementar compartilhamento de fotos
5. Adicionar efeito de slideshow automático (opcional)

## ❓ Troubleshooting

**Problema:** Galeria não abre ou mostra "nenhuma imagem encontrada"
- ✅ Verifique se o `data-gallery` corresponde ao nome da pasta
- ✅ Verifique se as imagens estão na pasta correta
- ✅ Verifique o `gallery.json` (sintaxe JSON correta)
- ✅ Verifique o console do navegador para erros

**Problema:** Imagens não carregam
- ✅ Verifique os caminhos no `gallery.json`
- ✅ Verifique as extensões dos arquivos
- ✅ Verifique permissões dos arquivos

**Problema:** Estilo quebrado
- ✅ Verifique se `css/main.css` foi atualizado
- ✅ Limpe o cache do navegador
- ✅ Verifique se não há conflitos com outros estilos

## 📞 Suporte

Para dúvidas ou problemas, consulte a documentação completa ou entre em contato.
