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
|Column|Type|Description|
|---|---|---|
|`name`|String|name of the habit|

|Method|Endpoint|Description|
|---|---|---|
|`GET`|/habits|returns all habits|
|`GET`|/habits/:id|returns habit|
|`POST`|/habits|create a new habit must include a `name` param|

### Goals
|Column|Type|Description|
|---|---|---|
|`name`|String|name of the goal|
|`complete`|Boolean|is goal complete or not|
|`timeFrame`|Number|number of years to complete goal|
|`completedAt`|Date|when the goal was completed|

|Method|Endpoint|Description|
|---|---|---|
|`GET`|/goals|returns all goals|
|`GET`|/goals/:id|returns goal |
|`POST`|/goals|create a new goal must include a `name` and `timeFrame` param|

### Weights
|Column|Type|Description|
|---|---|---|
|`amount`|Float|amount I weigh|

|Method|Endpoint|Description|
|---|---|---|
|`GET`|/weights|returns all weights|
|`POST`|/weights|create a new weight|
