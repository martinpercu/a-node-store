const express = require('express');
// const { faker } = require('@faker-js/faker')
const ProductsServices = require('./../services/products.services')

const router = express.Router();
const service = new ProductsServices();


router.get('/', (req, res) => {
  // const products = [];
  // const { size } = req.query;
  // const limit = size || 12;
  // for (let index = 0; index < limit; index++) {
  //   products.push({
  //     name: faker.commerce.productName(),
  //     price: parseInt(faker.commerce.price()),
  //     image: faker.image.urlPicsumPhotos()
  //   })
  // }
  const products = service.find();
  res.json(products)
})

router.get('/filter', (req, res) => {
  res.send('Je suis un filter');
})

router.get('/:id', (req, res) => {
  // const id = req.params.id; // This is the same
  const { id } = req.params;
  const product = service.findOne(id);
  res.json(product);
  // if (id === '666') {
  //   res.status(404).json({
  //     message: "product not found"
  //   });
  // } else {
  //   res.status(200).json({
  //   id,
  //   name: 'Product 1',
  //   price: 150
  //   });
  // }
})

router.post('/', (req, res) => {
  const body = req.body;
  const newProduct = service.create(body);
  res.status(201).json(newProduct);
})

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const product = service.update(id, body);
  res.json(product);
})

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const product = service.update(id, body);
  res.json(product);
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const rta = service.delete(id);
  res.json(rta);
})


// app.get('/products/filter', (req, res) => {
//   res.send('Je suis un filter');
// })

module.exports = router;
