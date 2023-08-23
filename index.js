const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello Je suis un serveur en Express')
})

app.listen(port, () => {
  console.log('this is running in port ' + port);
})
