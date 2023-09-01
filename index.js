const express = require('express');
// const { faker } = require('@faker-js/faker')
const routerApi = require('./routes')




const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello Je suis un serveur en Express')
})

app.get('/new-endpoint', (req, res) => {
  res.send('Hello Je suis un nouveau ENDPOINT')
})

routerApi(app);

// app.get('/users', (req, res) => {
//   const { limit, offset } = req.query;
//   if (limit && offset) {
//     res.json({
//       limit,
//       offset
//     });
//   }else {
//     res.send('they are NOT parameters')
//   }

// })

// app.get('/categories/:categoryId/products/:productId', (req, res) => {
//   const { categoryId,  productId } = req.params;
//   res.json({
//     categoryId,
//     productId
//   })
// })


app.listen(port, () => {
  console.log('this is running in port ' + port);
})
