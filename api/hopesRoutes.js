const express = require('express')
const router = express.Router()
const db = require('../config/knexConfig')
const helmet = require('helmet')
const cors = require('cors')

router.use(helmet())
router.use(cors())

router.get('/', async (req, res) => {
  try {
    const result = await db('hopes')
    res.status(200).json(result)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: '500 <-> Internal Server Error' })
  }
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { body } = req
  const { title, description } = body
  if (!title && !description) {
    return res.status(400).json({ message: 'You is bad request.' })
  }

  try {
    const results = await db('hopes')
      .where({ id })
      .update(body)

    results === 1
      ? res.status(200).json(results)
      : res.status(404).json({ message: '404 <--> Not found' })
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: '500 <-> Internal Server Error' })
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const hope = await db('hopes')
      .where({ id })
      .first()
    hope
      ? res.status(200).json(hope)
      : res.status(404).json({ message: '404 <-> Resource Not Found.' })
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: '500 <-> Internal Server Error' })
  }
})

router.post('/', async (req, res) => {
  const { title, description } = req.body
  if (!title || !description) {
    return res.status(401).json({
      message:
        '401 Bad Request - Please provide both a title and description for your dream.'
    })
  } else {
    const postedHope = await db('hopes').insert({ title, description })
    return res.status(201).json(postedHope)
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const deleted = await db('hopes')
      .where({ id })
      .del()
    deleted === 1
      ? res.status(200).json(deleted)
      : res.status(404).json({ message: '404 <--> Resource Not Found. ' })
  } catch (e) {
    res.status(500).json({ message: '500 <--> Internal Server Error' })
  }
})

module.exports = router
