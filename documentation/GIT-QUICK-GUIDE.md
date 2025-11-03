# 🚀 Guia Rápido de Git - Para Não-Programadores

## O Que é Git?

Git é uma ferramenta que guarda versões do seu site, como um "ctrl+z" infinito. GitHub é onde essas versões ficam guardadas na nuvem.

---

## 📦 Instalação Inicial

### Windows

1. Baixe: [Git for Windows](https://git-scm.com/download/win)
2. Instale com opções padrão
3. Abra "Git Bash" (procure no menu Iniciar)

### Mac

1. Abra Terminal (Cmd + Espaço, digite "Terminal")
2. Digite: `git --version`
3. Se não instalado, siga instruções na tela

### Linux

```bash
sudo apt-get install git  # Ubuntu/Debian
sudo yum install git      # Fedora/CentOS
```

---

## ⚙️ Configuração Inicial (Só uma vez)

```bash
# Configure seu nome
git config --global user.name "Seu Nome"

# Configure seu email (mesmo do GitHub)
git config --global user.email "seu@email.com"
```

---

## 📥 Baixar o Site (Clone)

### Primeira Vez

```bash
# Navegue até onde quer salvar
cd ~/Documents  # Mac/Linux
cd C:\Users\SeuNome\Documents  # Windows

# Clone o repositório
git clone https://github.com/SEU-USUARIO/clicandomemorias.git

# Entre na pasta
cd clicandomemorias
```

---

## 🔄 Comandos Principais

### Ver Status (O que mudou?)

```bash
git status
```

**O que significa**:
- Verde = Mudanças prontas para salvar
- Vermelho = Mudanças ainda não preparadas
- Nada = Tudo sincronizado

### Adicionar Mudanças

```bash
# Adicionar arquivo específico
git add index.html

# Adicionar tudo que mudou
git add .

# Adicionar pasta específica
git add css/
```

### Salvar Mudanças (Commit)

```bash
git commit -m "Descrição do que você mudou"
```

**Exemplos de mensagens boas**:
```bash
git commit -m "Adicionar novas fotos do portfólio"
git commit -m "Atualizar texto da página sobre"
git commit -m "Corrigir telefone de contato"
git commit -m "Melhorar layout mobile"
```

### Enviar para GitHub (Push)

```bash
git push origin main
```

**O que acontece**: Suas mudanças vão para o GitHub e o site atualiza em 1-2 minutos.

### Baixar Atualizações (Pull)

```bash
git pull origin main
```

**Quando usar**: Se editou pelo GitHub web, baixe antes de editar localmente.

---

## 🎯 Workflow Completo (Passo a Passo)

### Atualizar uma Foto do Portfólio

```bash
# 1. Certifique-se que está atualizado
git pull origin main

# 2. Substitua a imagem na pasta images/portfolio/
# (Faça isso normalmente pelo explorador de arquivos)

# 3. Veja o que mudou
git status

# 4. Adicione as mudanças
git add images/portfolio/nova-foto.jpg

# 5. Salve com mensagem
git commit -m "Adicionar foto ensaio família Silva"

# 6. Envie para GitHub
git push origin main

# 7. Aguarde 1-2 minutos e veja no site!
```

### Editar Texto do Site

```bash
# 1. Puxe atualizações
git pull origin main

# 2. Abra index.html num editor de texto
# (Notepad++, VSCode, Sublime Text)

# 3. Faça suas alterações e salve

# 4. Adicione e commit
git add index.html
git commit -m "Atualizar depoimento da cliente Maria"

# 5. Envie
git push origin main
```

### Múltiplas Mudanças de Uma Vez

```bash
git pull origin main

# Faça todas as suas edições
# Adicione fotos, edite textos, etc.

# Adicione tudo
git add .

# Commit descritivo
git commit -m "Atualizar portfólio e depoimentos de janeiro"

# Envie
git push origin main
```

---

## 🆘 Problemas Comuns

### "Permission denied"

**Problema**: Não configurou autenticação
**Solução**: Configure SSH ou use HTTPS com token

#### Opção Fácil: HTTPS com Token

1. GitHub > Settings > Developer Settings > Personal Access Tokens
2. Generate New Token (classic)
3. Selecione `repo`
4. Copie o token
5. Quando pedir senha no Git, cole o token

#### Opção Avançada: SSH

```bash
# Gerar chave SSH
ssh-keygen -t ed25519 -C "seu@email.com"

# Copiar chave pública
cat ~/.ssh/id_ed25519.pub  # Mac/Linux
type %USERPROFILE%\.ssh\id_ed25519.pub  # Windows

# Cole em GitHub > Settings > SSH Keys
```

### "Merge conflict"

**Problema**: Você editou no GitHub e localmente
**Solução**:

```bash
# Baixe as mudanças
git pull origin main

# Se der conflito, abra os arquivos marcados
# Procure por <<<<<<, ======, >>>>>>
# Escolha qual versão manter
# Depois:

git add .
git commit -m "Resolver conflito"
git push origin main
```

### "Nothing to commit"

**Problema**: Você não fez mudanças
**Solução**: Está tudo OK! Não precisa fazer nada.

### "Failed to push"

**Problema**: Alguém atualizou antes de você
**Solução**:

```bash
git pull origin main
git push origin main
```

---

## 🎨 Usando Editor Visual (VSCode)

### Instalação

1. Baixe [Visual Studio Code](https://code.visualstudio.com/)
2. Instale normalmente
3. Abra VSCode
4. File > Open Folder > Selecione pasta clicandomemorias

### Interface Git no VSCode

**Barra Lateral**: Ícone de ramificação (3º de cima)

**Workflow**:
1. Edite arquivos
2. Veja mudanças na aba "Source Control"
3. Digite mensagem no campo de texto
4. Clique no ✓ (commit)
5. Clique nos "..." > Push

**Muito mais fácil!**

---

## 📝 Boas Práticas

### Mensagens de Commit

❌ **Ruins**:
- "update"
- "fix"
- "mudanças"
- "asdasd"

✅ **Boas**:
- "Adicionar 5 novas fotos de família"
- "Atualizar telefone de contato"
- "Corrigir erro de digitação na página sobre"
- "Melhorar responsividade no mobile"

### Frequência de Commits

**Muito frequente**: A cada arquivo
**Muito raro**: Uma vez por mês

**Ideal**: Agrupe mudanças relacionadas

**Exemplos**:
- 1 commit para adicionar 10 fotos novas
- 1 commit para cada seção do site que editar
- 1 commit por dia de trabalho

### Quando Fazer Push

- ✅ Sempre depois de testar localmente
- ✅ Ao final do dia de trabalho
- ✅ Antes de fechar o computador
- ❌ Com código quebrado/incompleto

---

## 🔄 Backup e Segurança

### O Git É Seu Backup

**Vantagens**:
- Histórico completo de todas as versões
- Pode voltar para qualquer versão antiga
- Sincronizado na nuvem (GitHub)

### Ver Histórico

```bash
# Ver últimos commits
git log --oneline

# Ver mudanças de um commit
git show HASH_DO_COMMIT
```

### Voltar Atrás (Desfazer)

**Desfazer última mudança (NÃO commitada)**:
```bash
git checkout -- arquivo.html
```

**Voltar para commit anterior**:
```bash
# Ver histórico
git log --oneline

# Voltar (cria novo commit)
git revert HASH_DO_COMMIT
```

**Resetar tudo (CUIDADO)**:
```bash
# Descarta TODAS mudanças não commitadas
git reset --hard
```

---

## 🌿 Branches (Avançado - Opcional)

Branches são "cópias paralelas" do site para testar sem estragar o principal.

### Criar Branch para Testar

```bash
# Criar e mudar para nova branch
git checkout -b teste-layout-novo

# Faça suas mudanças
# Commit normalmente
git add .
git commit -m "Testar novo layout"

# Envie branch
git push origin teste-layout-novo

# Se gostar, merge na main
git checkout main
git merge teste-layout-novo
git push origin main

# Delete branch de teste
git branch -d teste-layout-novo
```

---

## 📚 Recursos Úteis

### Guias Visuais
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [Learn Git Branching](https://learngitbranching.js.org/?locale=pt_BR)

### Vídeos (Português)
- "Git e GitHub para Iniciantes" - Rocketseat
- "Git Tutorial" - Código Fonte TV

### Ferramentas Gráficas (Se não gostar de comandos)

**GitHub Desktop**:
- Download: https://desktop.github.com/
- Interface visual completa
- Drag-and-drop

**GitKraken**:
- Download: https://www.gitkraken.com/
- Visual bonito
- Free para repositórios públicos

**VSCode** (Recomendado):
- Editor + Git integrado
- Melhor custo-benefício

---

## 🎯 Resumo - Comandos Diários

```bash
# 1. Antes de começar (uma vez ao dia)
git pull origin main

# 2. Depois de fazer mudanças
git add .
git commit -m "Descrição clara"
git push origin main

# 3. Ver status (quando quiser)
git status
```

**É isso!** 90% do tempo você só usa esses 3 comandos.

---

## ❓ FAQ

### Perdi minhas mudanças!
```bash
git reflog  # Veja histórico completo
git reset --hard HEAD@{1}  # Volte para estado anterior
```

### Comitei na branch errada
```bash
git reset HEAD~1  # Desfaz commit (mantém mudanças)
git checkout branch-correta
git add .
git commit -m "Mensagem"
```

### Quero deletar um commit
```bash
git revert HASH_DO_COMMIT  # Cria commit reverso (SEGURO)
# OU
git reset --hard HEAD~1  # APAGA commit (CUIDADO!)
```

### Como sei se está sincronizado?
```bash
git status
# Se mostrar "nothing to commit, working tree clean" = OK!
```

---

**Dica Final**: Pratique! Git é intimidador no início, mas depois de alguns dias usando, vira natural. E lembre-se: é quase impossível perder código permanentemente com Git! 🎉