const express = require('express');
const { faker } = require('@faker-js/faker')

const router = express.Router();


router.get('/', (req, res) => {
  const users = [];
  const { size } = req.query;
  const limit = size || 12;
  for (let index = 0; index < limit; index++) {
    users.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      image: faker.internet.avatar()
    })
  }
  res.json(users)
})


module.exports = router;
