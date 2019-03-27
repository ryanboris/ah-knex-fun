const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('sane on /api/hopes')
})

module.exports = router
