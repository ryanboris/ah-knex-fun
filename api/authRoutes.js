const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const db = require('../config/knexConfig')

router.get('/woohoo', (req, res) => {
  res.send('I love php.')
})

router.post('/register', async (req, res) => {
  try {
    const creds = req.body
    const hash = bcrypt.hashSync(creds.password, 14)
    creds.password = hash
    const result = await db('users').insert(creds)
    console.log(hash)
    res.status(201).json(result)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: '500 <--> Internal Server Error' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const creds = req.body
    const user = await db('users')
      .where({ username: creds.username })
      .first()
    if (user && bcrypt.compareSync(creds.password, user.password)) {
      req.session.userId = user.id
      res.status(200).json({ message: 'You is logged in. :)' })
    } else {
      res.status(401).json({ message: 'Sorry, you cannot pass!' })
    }
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: '500 <--> Internal Server Error' })
  }
})

module.exports = router
