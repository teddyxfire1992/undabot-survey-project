## INTRO

This project was created using the [create-react-app](https://github.com/facebook/create-react-app) and the following tools:

- Node v16.15.0
- Yarn 1.22.18

## STARTING THE PROJECT

To start the local frontend dev server, run the following command:

```
yarn start
```

By default, dev env will connect to the mock API ([miragejs](https://miragejs.com/)) which is bound to the following url:

```
http://localhost:3500/api/v1
```

If you want to connect to the "real" API, you can:

```
1.) navigate to the `backend` folder
2.) run the `yarn start` command
3.) by default, real API will be available on `http://localhost:5000/api/v1` - you can
set that value inside the `.env.development` file and restart the frontend dev server
```

You can also build the project and serve it locally:

```
1.) run the `yarn build` command
2.) once it's done, run the `yarn serve` command
```

# VERCEL

CI/CD pipeline has been done using the Github Actions and Vercel's CLI. The app is available on:

- [Staging (connected to develop branch)](https://undabot-survey-project-9tdq9y9kw-teddyxfire1992.vercel.app/)
- [Production (connected to main branch)](https://undabot-survey-project.vercel.app/)

## PWA

PWA was created using the service worker provided by [create-react-app](https://create-react-app.dev/docs/making-a-progressive-web-app/).

## DOCKER

To build a Docker image, run the following commands:

```
docker build . -t <your-tag-goes-here>
```

To run that image, run the following command:

```
docker run -p 3000:3000 -d <your-tag-goes-here>
```

## TESTING

There's an example test in the `/src/__tests__` folder. It can be run using the following command:

```
yarn test
```
