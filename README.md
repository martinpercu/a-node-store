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

## Middleware with Boom
- Install Boom
```sh
npm i @hapi/boom
```
- In product.service import boom ==> "const boom = require('@hapi/boom')"
- Instead send an "new Error" we replace for a throw boom.notFound(); With this the notFound() in boom "knows" is a 404.
- In findOne() wi will change logic to use boom if product not found.
- In the error.handler create a boomErrorHandler function to manage the errors. IMPORTANT the "if" must be follow by an "else" to add the "next(err)".
- In product.router, just as example I left the PUT without the errorBoomHandler and the PATCH with.
- To use differents situation we will add boolean value to the products 'isBlock'. Then if this product is blocked we will show something if is not blocked another and if is not found the product another.
- In the findOne(). We implement the logic to implement differents error. So if the product isBlock ===< throw boom.conflict('Product is BLOCKED');

## Middleware validation with Joi
- Install Joi
```sh
npm i joi
```
- Create new Folder "schemas". There new file product.schema.js (usually we could find this as DTO data-transfer-object). ==> is the same.
- In product.schema create the schemas for the product.
- Now create a middleware that will use the schemas to validate it. 
- In middleware create new file "validator.handler.js". Here just a function good place to use the closure property from javascript!!!. 

## Testing the endpoints
- In products.router import the validatorHandler from middleware/validatorHandler
- In products.router import all from schemas/product.schema
- In the router.get('/:id'.... BEFORE the try-catch Add the validatorHandler with the getProductSchema adding the property 'params' to get the property from params.
- In the router.post('/',.... BEFORE start this process add validatorHandler with the createProductSchema adding the property 'body' to get the property from params.
- In the router.put('/:id', and router.patch('/:id', ... we need to mix a little bit both. IMPORTANT the middlewares are secuencial so  first validate the ID with getProductSchema then validate the products itself with updateProductSchema.
- IMPORTANT Joi will check field by field and when find an error stop the process. So if you are updating a product with more than 1 field a name + price. If we have in both fields error will return just the first one. That's is not great for UX so.... in the validatorHandler we will add { abortEarly: false } in the schema.validate().







 
 