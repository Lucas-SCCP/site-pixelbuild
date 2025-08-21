# site-template

Site Template para utilizar de base para criação de novos sites.
Esse projeto contém toda a estrutura necessária mantendo o padrão para utilização da API.

## Configuração

1. Crie um arquivo `.env` baseado no arquivo `.env.example`.
2. Preencha as variáveis de ambiente conforme necessário:
   - `REACT_APP_WEBSITE_ID`
   - `REACT_APP_ENVIRONMENT`
   - `REACT_APP_API`
   - `REACT_APP_GA_TRACKING_ID`

## Instalação

Execute o comando abaixo para instalar as dependências:

```bash
npm install
```

## Execução em ambiente de desenvolvimento

```bash
npm start
```

O projeto estará disponível em `http://localhost:3000`.

## Build para produção

```bash
npm run build
```

## Testes

Os testes unitários estão localizados na pasta `tests`.
Para rodar todos os testes:

```bash
npm test
```

## Estrutura do Projeto

- `src/` - Código fonte principal
- `public/` - Arquivos públicos e estáticos
- `src/tests/` - Testes unitários
- `.env.example` - Exemplo de variáveis de ambiente

## Deploy

O deploy pode ser feito em qualquer serviço que suporte aplicações React (ex: Vercel, Netlify, etc). Para deploy na Vercel, utilize o arquivo `vercel.json` para configuração de rewrites.

## Observações

- Certifique-se de que as variáveis de ambiente estejam corretamente configuradas para produção.
- Para gerar o sitemap, execute:

```bash
node generate-sitemap.js
```

## Formatação de Código

Este projeto utiliza o [Prettier](https://prettier.io/) para padronização de formatação de código.

- Arquivo de configuração: `.prettierrc`
- Para formatar todos os arquivos do projeto, execute:

```bash
npx prettier --write .
```

Os arquivos ignorados pela formatação estão em `.prettierignore`.

## Scripts Úteis

Para facilitar a formatação do código, utilize o script abaixo:

```bash
npm run format
```

---
