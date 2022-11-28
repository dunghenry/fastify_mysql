### Fastify + MySQL + Docker

### Create folder and directory

```js
npm init -y
```

### Install dependencies

```js
npm i fastify dotenv nodemon colors
```

### Delete images none

```js

docker rmi $(docker images --filter "dangling=true" -q --no-trunc)
```

### Run docker

```js
docker-compose up
```

### Format code

```js
npm run format
```
