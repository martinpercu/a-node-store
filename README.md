# a-node-store
A node backend for a store

## Configuration
- GitIgnore in gitignore.io with -Node + Windows + Mac + Linux-
- start nmp
```sh
npm init -y
```
- We have the package.json.
- Create files ==> .editorconfig + .eslintrc.json + index.js
- In package.json add 3 scrips ===> dev, prod and lint.
```sh
npm i nodemon eslint eslint-config-prettier eslint-plugin-prettier prettier -D
```

## Express installation
- Install Express
```sh
npm i express
```
- In index.js ==> first logic for server 

## Routing start
- In index.js adding new routes. (endpoints)
- In endpoint products use .json.

## Get start
- In index.js adding new getters

## Get query Params
- In index.js adding new getters with wuery params
- Imporant install facer to greate fake data.
```sh
npm i @faker-js/faker
```
- IMPORTANT ===> ALL Specifics endpoint must be place above the dynamics ones. ===> Example with the get/products/filter. I left commented the unused wrong one.

## Refact with Router 
- Create a new folder "routes".
- Create in folder "routes" index.js ===> here we add dif. routes. 
- Create in Folder "routes" products.routers.js 
- In products.router.js bring all the path from root index relative to products.
- add a router from express ==> replace the app by the new router, cut the path "products/" and then export router with "add module.exports = router;" at the end of file.
- In routes/index create function routerApi to use the products path. Then export this function ==> "module.exports = routerApi".
- In the root index import the routerApi ===>"const routerApi = require('./routes')"
- In the root index at the end ===> "routerApi(app);"
- In folder routes add 2 other js.  categories and products. Make the same as before and add the routing in the index.js to connect everything.
- IMPORTANT add a versioning system to all endpoints. like this ==> /api/v1 
- In index.js import ==> "const express = require('express');". then in funtion routerApi create a const router from express.Router() the app.use('/api/v1') as router. Then change app.use for router.use in endpoints needed. (in this case all the 3 undpoints. products, categories and users).

## Post 
- In products.router add the post method.
- get the body from the req.body. And the response should be a message + the data. In this case is the full body".
- IMPORTANT as we use a JSON we must add the native middleware !!!
- To add this middleware ===> in the root index ==> "app.use(express.json());"
- 

 