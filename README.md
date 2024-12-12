# Boiler Plate - Nuxt

## Table of Contents
1. [Technical stack](#technical-stack)
2. [How to use](#how-to-use)

## Technical stack
In this project, you'll use:
- [Nuxt](https://nuxt.com/docs/getting-started/introduction)
- [Shadcn Vue](https://www.shadcn-vue.com/docs/introduction.html)
- [Nuxt Scheduler](https://github.com/jurassicjs/nuxt-scheduler)
- [Nuxt Mailer](https://github.com/jurassicjs/nuxt-mailer)
- [Prisma](https://www.prisma.io/docs/orm)
- [Eslint](https://eslint.org/docs/latest/)

## How to use
1. Clone this repository
```shell
# SSH
git clone git@github.com:loicmaes/Nuxt-Template.git MyNuxtProject

# HTTP
git clone https://github.com/loicmaes/Nuxt-Template.git MyNuxtProject
```

2. Go to your project folder and install dependencies
```shell
cd MyNuxtProject

# NPM
npm install
# YARN
yarn install
# PNPM
pnpm install
```

3. Configure your environment in a .env
```shell
# Copy .env with default values
cp .env.example .env
```
There is an example of a working configuration
```dotenv
DATABASE_URL="postgres://postgres:******@localhost:5432/myDb?schema=public"

NUXT_MAILER_HOST="smtp.ionos.fr"
NUXT_MAILER_PORT="465"
NUXT_MAILER_USER="***@***.**"
NUXT_MAILER_PASS="*********"
NUXT_MAILER_FROM_ADDRESS="***&***.**"
NUXT_MAILER_FROM_NAME="My Nuxt Application - Mail System"

NUXT_PUBLIC_API_URL="http://localhost:3000"
```

4. Start your development server and see how it works!
```shell
# NPM
npm run dev
# YARN
yarn dev
# PNPM
pnpm dev
```

---

> Made with ❤️ by [**Loïc MAES**](https://www.maesloic.fr/) &copy; 2024
