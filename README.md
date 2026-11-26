# ENTREATOS

> Uma história leva a outra.

O Entreatos é um protótipo acadêmico de uma plataforma de descoberta de entretenimento. A proposta é ajudar o usuário a explorar filmes, séries e animes, pesquisar títulos, conhecer detalhes e guardar produções em uma lista pessoal.

## Objetivo

Este projeto foi desenvolvido para a disciplina de Desenvolvimento de Interfaces. O foco é demonstrar estruturação com HTML, estilização com CSS e interações com JavaScript, incluindo recursos básicos de acessibilidade e persistência de preferências no navegador.

**Importante:** o Entreatos é um catálogo demonstrativo, não um serviço de streaming. Não reproduz filmes ou séries e não consulta uma base de dados externa.

## Tecnologias

- **HTML5:** estrutura semântica e formulários.
- **CSS3:** identidade visual, layout, responsividade e temas.
- **JavaScript:** catálogo, pesquisa, filtros, carrossel, recomendações, favoritos, janelas modais e validação de formulários.
- **LocalStorage:** favoritos e preferências de aparência/tamanho de fonte/contraste.
- **SessionStorage:** dados básicos do perfil demonstrativo durante a sessão do navegador.

Não foi utilizado framework CSS ou biblioteca JavaScript.

## Funcionalidades implementadas

- Catálogo local com filmes, séries e animes cadastrados em um array de objetos no `script.js`.
- Pesquisa rápida na página inicial e pesquisa no catálogo.
- Filtro do catálogo por tipo de produção.
- Cartões criados dinamicamente com JavaScript.
- Janela de detalhes de cada produção.
- Lista de favoritos persistida no `LocalStorage`.
- Carrossel horizontal de títulos em destaque, com controles anterior/próximo.
- Recomendações demonstrativas a partir de humores selecionados.
- Alternância entre tema escuro e claro.
- Controles para aumentar e diminuir o tamanho da fonte.
- Opção visual de alto contraste.
- Link para pular diretamente ao conteúdo principal.
- Janelas de detalhes e conta com suporte a Escape, retorno de foco e contenção básica do foco pela tecla Tab.
- Formulário de contato com validação no navegador.
- Interface demonstrativa de login/cadastro, sem autenticação real e sem salvar senhas.

## Estrutura dos arquivos

```text
Entreatos/
├── index.html
├── style.css
├── script.js
├── README.md
├── VERSAO.txt
└── images/
    └── posterinterestelar.webp
```

## Como executar

1. Baixe ou clone este repositório.
2. Extraia os arquivos, caso estejam compactados.
3. Abra a pasta no Visual Studio Code.
4. Abra `index.html` no navegador. Para desenvolvimento, pode usar a extensão Live Server.
5. Mantenha `index.html`, `style.css`, `script.js` e a pasta `images` na estrutura indicada para que os caminhos funcionem.

Não é necessário instalar dependências ou iniciar um servidor de backend.

## Como testar as principais funções

1. Digite um título ou gênero na pesquisa e confira os resultados.
2. Selecione um tipo no filtro do catálogo.
3. Abra os detalhes de um cartão.
4. Adicione e remova títulos da Minha Lista; atualize a página para verificar a persistência.
5. Use as setas do carrossel.
6. Selecione humores e solicite uma recomendação.
7. Alterne tema, tamanho da fonte e alto contraste; atualize a página para verificar as preferências salvas.
8. Abra a janela de conta e teste a interface demonstrativa.
9. Envie o formulário de contato com campos válidos e inválidos.
10. Use Tab, Shift+Tab e Escape para testar a navegação por teclado e o fechamento das janelas.

## Limitações conhecidas

- O catálogo é estático e cadastrado manualmente no JavaScript. Não há API ou banco de dados.
- O carrossel exibe uma seleção dos primeiros títulos cadastrados; os controles deslocam a faixa horizontalmente.
- O login/cadastro é apenas uma simulação de interface. Não verifica credenciais, não cria contas reais e não deve ser usado com senhas verdadeiras.
- O formulário de contato valida os campos localmente, mas não envia mensagens para um servidor.
- As capas estilizadas do catálogo são elementos gráficos gerados pela interface; há uma imagem local de Interestelar na seção de recomendação.
- O uso de recursos de acessibilidade não significa, por si só, conformidade integral com WCAG. Contraste, zoom, leitor de tela, foco, teclado e comportamento responsivo ainda precisam ser avaliados e documentados em testes.

## Acessibilidade e avaliação

O projeto inclui rótulos de formulário, regiões e títulos identificados, link para pular ao conteúdo, estados `aria-pressed` em controles, mensagens com `aria-live`, foco visível, operação básica por teclado e contenção de foco nas janelas modais.

Para o relatório acadêmico, registre os resultados reais dos testes de contraste e navegação. Não declare conformidade WCAG sem verificar os critérios aplicáveis e documentar as evidências.

## Histórico de versões

O desenvolvimento foi realizado incrementalmente. As versões de trabalho acrescentaram, em etapas, catálogo e pesquisa, favoritos, detalhes, carrossel, acessibilidade, conta demonstrativa, contato e melhorias de navegação/foco. Mantenha os arquivos de cada versão ou os commits no GitHub para demonstrar a evolução do projeto.

## Créditos

Projeto acadêmico desenvolvido para a disciplina de Desenvolvimento de Interfaces. Os títulos citados pertencem aos seus respectivos criadores e titulares; são utilizados apenas como exemplos de catálogo.
