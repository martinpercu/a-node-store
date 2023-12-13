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

# CRUD
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

## Put Patch Delete 
- In products.router create a put, patch and a delete functions.
- IMPORTANT!! Put and Patch are just conventions. Put is to replace the entire object and patch just to replace a part of the object. (in this case replace only the "price").
In the future I will add the insomnia file in the proyect in order to see this.

## Status Codes 
- In products.router post just add the .status(201). ===> "res.status(201).json({....."
- In products.router in get add conditinal to for the 404. (params received are always a string).
- IMPORTANT! ==> all params receive by "get" are string. So if you are looking for an ID and is a number===> always know is number:string.

# Services
## Refact to services 
- Create new folder "services" then a first file products.services.js.
- In products.services create a class ProductsServices and the module for export this class.
- In this new Class add the method needed. "create","find","findOne","update" and "delete".
- Then bring the logic in products.router to ProductsServices in order to create an array of products.
- Then connect the logic from get post patch put delete from router to services in "create","find","findOne","update" and "delete".

## Async 
- In product.service add in all methods the async. 
- In product.router add in all methods the async and await just before calling the service. 
- We will emulate a delayed response. ===> in product service in find() will return a promise with a setTimeout 4000
- As example in the product patch we add a try catch.

## Middleware
- Create new Folder ==> "middlewares" then a file error.handler.js
- In the error.handler Creat 2 functions to manage the errors.
- Export the 2 functions
- IN main index.js import this middlewares. 
- IMPORTANT!!! The middlewares must be implemented AFTER the ROUTER definition "routerApi(app)".
- To force an error: ==> in product service in findOne() invent a const with a unexisted method "findFalling()" (this will be the error.). In product router in router.get('/:id'... here implement a catch and try.

 
 