const express = require('express');
const cors = require('cors');
// const { faker } = require('@faker-js/faker')
const routerApi = require('./routes')

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')

const app = express();
const port = 3000;

app.use(express.json());

const whitelist = ['http://localhost:8080', 'https://myapp.fr'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Origin not allow'));
    }
  }
}
app.use(cors(options));

app.get('/', (req, res) => {
  res.send('Hello Je suis un serveur en Express')
})

app.get('/new-endpoint', (req, res) => {
  res.send('Hello Je suis un nouveau ENDPOINT')
})

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

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
