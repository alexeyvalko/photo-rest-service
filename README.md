# Photo REST service

## Description

Simple REST service for [photo app](https://github.com/alexeyvalko/photo-app). Made with [NestJS](https://nestjs.com/)


## Swagger

Swagger docs avaliable on `/docs` endpoint by default.

## Setting up an application

Before you run this app you need to get [Unsplash API KEY](https://unsplash.com/developers). 

Create `.env` file and write your key in variable (see example below).

```bash
# Unsplash configuration
UNSPLASH_ACCESS_KEY=your_key
UNSPLASH_SECRET_KEY=your_secret
```
Your next step is to configure `host` and `port`

```bash
# Server configuration
PORT=5000
HOST=localhost
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run dev

# production mode
$ npm run start:prod
```

When server is started, you'll see the message in command line:

```bash
Server is running on http://localhost:5000
```
## License

Nest is [MIT licensed](LICENSE).
