<p align="center">
  <img src="http://i.imgur.com/khI1zOw.png" alt="bia logo" />
</p>

## Bia Backend
> In Greek mythology, Bia, was the personification of force and raw energy

Bia is a personal productivity CLI.  This is the backend API that communicates
with the CLI.

## Development
```shell
npm run dev   # sets up mongo and server
npm test      # run test suite
npm run build # compile es6 for deployment
```

### Habits
|Method|Endpoint|Description|
|---|---|---|
|`GET`|/habits|returns all habits|
|`GET`|/habits/:description|returns habit with that description|
|`POST`|/habits|create a new habit must include a `description` param|
