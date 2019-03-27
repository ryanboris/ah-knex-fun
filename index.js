require('dotenv').config()
const express = require('express')
const app = express()
const db = require('./config/knexConfig')
const dreamsRoutes = require('./api/dreamsRoutes')
const helmet = require('helmet')
const cors = require('cors')
app.use(helmet())
app.use(cors())
app.use(express.json())

app.use('/api/dreams', dreamsRoutes)

app.listen(process.env.PORT || 5000, () =>
  console.log('<--Server is alive and well on http://127.0.0.1:5000 yasss!')
)

//hey!
//hi there!
