const express = require('express');
const { faker } = require('@faker-js/faker')


const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello Je suis un serveur en Express')
})

app.get('/new-endpoint', (req, res) => {
  res.send('Hello Je suis un nouveau ENDPOINT')
})

app.get('/products', (req, res) => {
  const products = [];
  const { size } = req.query;
  const limit = size || 12;
  for (let index = 0; index < limit; index++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price()),
      image: faker.image.urlPicsumPhotos()
    })
  }
  res.json(products)
})

app.get('/products/filter', (req, res) => {
  res.send('Je suis un filter');
})

app.get('/products/:id', (req, res) => {
  // const id = req.params.id; // This is the same
  const { id } = req.params;
  res.json({
    id,
    name: 'Product 1',
    price: 150
    })
})

// app.get('/products/filter', (req, res) => {
//   res.send('Je suis un filter');
// })

app.get('/users', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset
    });
  }else {
    res.send('they are NOT parameters')
  }

})

app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId,  productId } = req.params;
  res.json({
    categoryId,
    productId
  })
})


app.listen(port, () => {
  console.log('this is running in port ' + port);
})
