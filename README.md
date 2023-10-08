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

## CORS fix
- Install cors
```sh
npm i cors
```
- In index.js import the cors. ===> require('cors');
- In index.js just USE it. ===> app.use(cors());
- With this will allow ANY domain. Origin.
- So we create a whitelist to allow from where get requests.
- In index.js const whitelist = [] + const option = {} with a callback.

## Refact & add enpoints & logic
- In order router add all the endpoint without the faker
- In product router refact all endpoints with (req, res, next) structure.
- Create order.router. Just structure.
- In category router add all the endpoints 
- In index add the order router.
- In folder schemas create files for category, order and user.
- Create with Joi the schemas for category, user and product (nothing with order)
- In folder services create files for category, order and user.
- In the index refact and clean.

## Docker Postgress
- Create new file docker-compose.yml with all info postgres DB
- Start Docker
```sh
docker-compose up -d postgres
```
- check what is happening ===>
```sh
docker-compose ps
```
- Close it
```sh
docker-compose down postgres
```

## Explore Postgres interfaces and terminal
- Open a bash inside the postgres 
```sh
docker-compose exec postgres bash
```
- Once in bash is more or less the same as always.
- Show files and folder by list
```sh
ls -l
```
- Important ===> "psql" ===> To get in this db something like this.
```sh
psql -h localhost -d my_store -U martin
```
- To know the db Structure ....
```sh
\d+
```
- Quit DB
```sh
\q
```
- Quit container
```sh
exit
```
- The Interface "pgAdmin"
- In docker-compose add a new service... ===> pgAdmin
- Then 
```sh
docker-compose up -d pgadmin
```
- If we make
```sh
docker-compose ps
```
We will see there are 2 services working. 
- Now in localhost 5050 we get the pgAdmin. 
- Now to add the Database info ===>
```sh
docker ps
```
- we get the container ID. ... then ===>
```sh
docker inspect "id-from-the-container"
```
- we will get in: "Networks"/"IPAddress" the IP adress. With this info configure the pgAdmin
- IMPORTANT is recommended to use the NAME and not IP adress in the pgConfig. Because this ipAdress will change if container restart in the future.
- To close all we have ...===>
```sh
docker-compose down pgadmin
docker-compose down postgres
```

## Integration Postgres with Node 
- Install pg (a node driver )
```sh
npm install pg
```
- Create new folder "libs" this will take care to connect to other API databases etc etc.
- In this new folder new file postgres.js
- In postgres.js create the client to connect to postgres . Put all in an async function and return the "client" we will use to connect.
- As example use this client in the user.service.... first import getConnection. Then use in the find() method.

## Pool Manage Connection 
- Use a Pool to share just one coneccton and share it.
- In libs folder create new file postgres.pool.js.
- In postgress.pool.js just import pool from pg and create a pool new Pool with same data as Client in postgres.
- Now use this pool, as example, in the product service.
- In products.service import this "pool".
- In products.service add this "pool" in the constructor and add a listener with a console.error.
- In products.service in the find() method use this "pool" in the query. As an asyncronious request add the const to the query and the async in find()

## Manage Environment Variables
- Create folder config + a config.js file inside.
- In config.js create the config {} and let it exportable module.export = {config}
- In postgress.pool.js import this config.
- In postgress.pool.js encode the USER + PASSWORD. Then create a const URI with. Then use this URI as connection string in the new Pool.
- Create a new files: .env (will be local) + .env.example (example like a template to know what we need to connect).
- Install dotenv (this is to read the .env in the config.js)
```sh
npm install dotenv
```
- In config.js "require('dotenv').config();"  ===> With this line is all we need to read the .env 

## ORM with Sequelize
- Sequelize will manage the connection to the DB. (sequelize.org)
- Install sequelize
```sh
npm install --save sequelize
```
- Then for postgres
```sh
npm install --save pg pg-hstore
```
- Now in folder libs add new file sequelize.js and import sequelize.
- The sequelize.js is similar to postgres.pool.js in same folder
- As example in products.service import sequelize instance and replace the postgres.pool (I left commented to see the differences). 
- IMPORTANT in async find() we can make a "normal request" ==> 'SELECT * FROM tasks'. Then with sequelize we will make the request with an ORM format.
- IMPORTANT sequelize return an array of "data" and "metadata". We will in almos all cases just the "data".

## ORM Model Creation
- We will use schemas to interact with database.
- Create new folder "db".
- Inside "db" create ne folder "models".
- In "db/models" new file user.models.js. here ==> const { Model, DataTypes, Sequelize } from sequelize.
- In user.models.js. we create the structure of table user "UserSchema". "sequelize" will create this table for us!!!. (important in creatAt the name of field is better to use 'create_at' this is normal to see in databases. Not recommende use camelcases as we use in Javascript).
- In user.models.js.  add ===> "class User extends Model" with static associate() and static config(sequelize)
- Export all this ===> "USER_TABLE, UserSchema, User"
- Then we create in "db/models" a new file "index.js" this will be the file to create and connect all the models (tables in DB) we will create in the future. Here we create a function setupModels();
- Then in libs/sequelize.js  import setupModels. We will run setupModels() just after the create the sequelize instance!!!.
- Then in libs/sequelize.js  "sequelize.sync()" with this will create the table with the structure in the UserSchema.  
- When sequelize with function setupModels() in the .init will generate a name-space called "models" with all model form in order to access to them. ===>
- In user.service.ts import { models } from libs/sequelize.
- IMPORTANT!! to know the name of this model check the "modelName" in the user.model
- In user.service.js we have an async find() with a query request 'SELECT * FROM tasks'. Now we will use sequelize to avoid use the query request. (I left commented this async find() to show changes.).

## CRUD - ORM
- We will create the CRUD for the user. 
- In user.models we need an email + password.
- In users.router the validator use the createUserSchema.
- In user.schema the createUserSchema has email+password+role. (role will be commented just for now)
- So in user.service in "async create(data)" add the logic to create the newUser.
- In add logic in: async findOne(id) + async update(id, changes) + async delete(id)
- IMPORTANT add an in in the findOne and use this method in the update() and the delete().
















 
 