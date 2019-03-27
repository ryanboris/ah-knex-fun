const express = require('express')
const app = express()
const db = require('./config/knexConfig')
const hopesRoutes = require('./api/hopesRoutes')
const dreamsRoutes = require('./api/dreamsRoutes')

app.use(express.json())

app.use('/api/hopes', hopesRoutes)
app.use('/api/dreams', dreamsRoutes)

app.get('/', async (req, res) => {
  const results = await db('hopes')
  res.status(200).json(results)
})

app.listen(5000, () =>
  console.log('<--Server is alive and well on http://127.0.0.1:5000 yasss!')
)

//hey!
//hi there!
