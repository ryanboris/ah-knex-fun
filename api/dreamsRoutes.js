const express = require('express')
const router = express.Router()
const db = require('../config/knexConfig')
const helmet = require('helmet')
const cors = require('cors')

router.use(helmet())
router.use(cors())

router.get('/', async (req, res) => {
  try {
    const result = await db('dreams')
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
    const results = await db('dreams')
      .where({ id })
      .update(body)

    results === 1
      ? res.status(200).json(results)
      : res.status(404).json({ message: '404' })
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: '500 <-> Internal Server Error' })
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const dream = await db('dreams')
      .where({ id })
      .first()
    dream
      ? res.status(200).json(dream)
      : res.status(404).json({ message: '404 <-> Resource Not Found.' })
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: '500 <-> Internal Server Error' })
  }
})

router.post('/', async (req, res) => {
  const { title, description } = req.body
  if (!title && !description) {
    return res.status(401).json({
      message:
        '401 Bad Request - Please provide both a title and description for your dream.'
    })
  } else {
    const postedDream = await db('dreams').insert({ title, description })
    res.status(201).json(postedDream)
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const deleted = await db('dreams')
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
