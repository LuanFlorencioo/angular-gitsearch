![Logo](./src/assets/logo.svg)

# Angular Gitsearch

![Angular17](https://img.shields.io/badge/Angular-v17-222?style=flat&logo=angular)
![Sass](https://img.shields.io/badge/Sass-222?style=flat&logo=sass)
![Typescript](https://img.shields.io/badge/Typescript-222?style=flat&logo=typescript)

Gitsearch é uma aplicação utilizando Angular 17 de procurar repositórios existentes do Github. Foi inspirado em um projeto que havia feito com apenas html, css e javascript durante o curso de Desenvolvimento Web Fullstack da Kenzie Academy Brasil. Neste projeto pus em prática os estudos e aprendizados em Angular.

Acesse a aplicação através do link

✔ [https://angular-gitsearch.vercel.app/](https://angular-gitsearch.vercel.app/)

## Sumário
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [API Utilizada](#api-utilizada)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Melhorias Futuras](#melhorias-futuras)
- [Como Contribuir](#como-contribuir)

## Funcionalidades

- Buscar usuários do GitHub pelo nome de usuário
- Exibir informações básicas do perfil encontrado
  - Nome
  - Bio
  - Localização
  - Seguidores
- Listar repositórios públicos do usuário

## Tecnologias Utilizadas

- Angular 17
- TypeScript
- API REST do GitHub
- Sass

## API Utilizada

### GitHub REST API

https://docs.github.com/pt/rest

Endpoints principais utilizados:
- Buscar usuário: https://api.github.com/users/{username}
- Listar repositórios: https://api.github.com/users/{username}/repos

## Estrutura do Projeto
```
src/
├── app/
│   ├── components/...
│   ├── models/...
│   ├── pages/...
│   ├── services/...
│   └── styles/...
├── assets/...
├── index.html
├── main.ts
└── styles.scss
```

## Melhorias Futuras

- Paginação dos repositórios
- Exibir detalhes dos repositórios
- Buscar por repositórios específicos
- Palheta de cores mais agradável e simples ao usuário

## Como Contribuir

Se quiser contribuir com melhorias ou sugestões, fique à vontade para abrir um **pull request** ou criar uma **issue**. Se preferir, pode até me mandar mensagem pelo **discord**

[![Discrod](https://img.shields.io/badge/discord-1a1919?style=for-the-badge&logo=discord)](https://discord.com/users/luanflorencio)

---

💻 Desenvolvido por [Luan Florencio](https://florencioo.vercel.app/) - @LuanFlorencioo

<img src="https://github.com/LuanFlorencioo.png" style="border-radius: 999px" width=200 />
