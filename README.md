<br />
<p align="center">
  <h3 align="center">Reddit clone✔️</h3>

  <p align="center">
    A full stack reddit clone built using the yarn workspace template. This repo contains a express backend and a next js frontend
    <br />
    <br />
    <a href="">View Demo</a>
    ·
    <a href="">Report Bug</a>
    ·
    <a href="">Request Feature</a>
    ·
    <a href="">Blog</a>
  </p>
</p>


## Structure

| Codebase              |      Description          |
| :-------------------- | :-----------------------: |
| [Akagi](akagi)        |      Backend API          |
| [Kaguya](kaguya)      |     Next js Client        |

### 🏗️ Built With

<div>

[<img src="https://img.shields.io/badge/-Next-FFFFFF?style=for-the-badge&labelColor=black&logo=nextdotjs&logoColor=white">](https://nextjs.org/)

[<img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&labelColor=black&logo=redux&logoColor=white">](https://redux.js.org/)

[<img src="https://img.shields.io/badge/-Svelte-FD5602?style=for-the-badge&labelColor=black&logo=svelte&logoColor=FD5602">](https://svelte.dev/)

[<img src="https://img.shields.io/badge/-SCSS-cc6699?style=for-the-badge&labelColor=black&logo=sass&logoColor=cc6699">](https://sass-lang.com/)

[<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&labelColor=black&logo=tailwind-css&logoColor=white" >](https://tailwindcss.com/)

[<img src="https://img.shields.io/badge/-Nodejs-3C873A?style=for-the-badge&labelColor=black&logo=node.js&logoColor=3C873A">](https://nodejs.org/en/)

[<img src="https://img.shields.io/badge/-PostgresQL-00758f?style=for-the-badge&labelColor=black&logo=postgresql&logoColor=00758f" >](https://www.postgresql.org/)

[<img src="https://img.shields.io/badge/redis-CC0000.svg?&style=for-the-badge&labelColor=black&logo=redis&logoColor=white">](https://redis.io/)

[<img src="https://img.shields.io/badge/-Typescript-007acc?style=for-the-badge&labelColor=black&logo=typescript&logoColor=007acc">](https://www.typescriptlang.org/)

</div>

---

## 🧩 Getting Started

To get a local copy up and running follow these simple steps.

### Starting the development server with docker 🐳

#### Prerequisites

Make sure you have Docker and docker-compose installed on your machine.

#### Steps to start the server

1. Add environment file .env in akagi directory with the variables fiven in the .env.example file.
2. Run the following command in the project directory itself.

      ```sh
      docker-compose -f docker-compose.debug.yml up --build
      ```

3. Open <http://localhost:5000> to view it in the browser.

### Starting the development server without docker 📡

#### Prerequisites

Make sure you have Node, Redis and TypeScript installed on your machine.

> **_NOTE:_**
>
>_The project was made with node version 14.17._

#### Steps to start the server 

1. Add environment files in backend directory.

      `akagi/.env` file

      ```env
      NODE_ENV=development

      MONGO_URI=

      DB_HOST=
      DB_PORT=
      DB_USERNAME=
      DB_PASSWORD=
      DB_DATABASE=

      REDIS_URI=


      LINKEDLIST_ACCESS_TOKEN_SECRET=
      LINKEDLIST_REFRESH_TOKEN_SECRET=


      LINKEDLIST_API_GOOGLE_CLIENT_ID=
      LINKEDLIST_API_GOOGLE_CLIENT_SECRET=
      LINKEDLIST_API_GOOGLE_CALLBACK_URL=

      LINKEDLIST_GITHUB_CLIENT_ID=
      LINKEDLIST_GITHUB_CLIENT_SECRET=
      LINKEDLIST_GITHUB_CALLBACK_URL=

      MAIL_USER=
      MAIL_PASSWORD=
      ```

2. To install all the dependencies run the following command in backend directory.

      ```sh
      yarn 
      ```

3. Run the following command in to buid the dist directory.

      ```sh
      yarn build
      ```

4. Run the following command in to start server.

      ```sh
      yarn dev
      ```

5. Your server should be running on port [5000](http://localhost:5000).


#### Steps to start the client

1. Add environment files in frontend directory.
      `kaguya/.env` file

      ```env
      NODE_ENV = "development"
      NEXT_APP_PRODUCTION_API_ENDPOINT = "production_url"
      NEXT_APP_DEVELOPMENT_API_ENDPOINT = "http://localhost:5000"
      ```

2. To install all the dependencies run the following command in Frontend directory.

      ```sh
      yarn install
      ```

3. Run the following command in the Frontend directory to start Svelte app.

      ```sh
      yarn dev
      ```

5. Open <http://localhost:3000> to view it in the browser.

## 🔐 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Suggestions and Bug Reports
Since this is an open source project all suggestions, requests and bug reports are always welcomed. If you have any don't forget to leave them in the issues section. But we recommend creating an issue or replying in a comment to let us know what you are working on first that way we don't overwrite each other.

Don't forget to checkout the [CONTRIBUTING.md](CONTRIBUTING.md) for more info on how to contribute to this project.

## Branches

- staging -> pr this branch for everything
- prod -> don't even think of touching it, this is what's running in prod