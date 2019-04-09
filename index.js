require('dotenv').config()
const express = require('express')
const app = express()
const dreamsRoutes = require('./api/dreamsRoutes')
const hopesRoutes = require('./api/hopesRoutes')
const db = require('./config/knexConfig')
const authRoutes = require('./api/authRoutes')
const helmet = require('helmet')
const cors = require('cors')
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const serviceAccount = require('./cred.json')
const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session)
console.log(KnexSessionStore)
console.log(session)
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// })

// let db = admin.firestore()
//hi
//hi back
const sessionConfig = {
  secret: 'alsdfldsklsdfkldflfdff',
  cookie: {
    maxAge: 1000 * 60 * 10,
    secure: false
  },
  httpOnly: true,
  resave: false,
  saveUninitialized: false,
  store: new KnexSessionStore({
    tablename: 'sessions',
    sidfieldname: 'sid',
    knex: db,
    createtable: true,
    clearInterval: 1000 * 60 * 60
  })
}

app.use(session(sessionConfig))

app.use(helmet())
app.use(cors())
app.use(express.json())

app.use('/api/dreams', dreamsRoutes)
app.use('/api/hopes', hopesRoutes)
app.use('/api', authRoutes)

app.get('/', (req, res) => {
  res.send('Hi, check out some data at /api/dreams')
})

app.listen(process.env.PORT || 5000, () =>
  console.log('<--Server is alive and well on http://127.0.0.1:5000 yasss!')
)

//hey!
//hi there!
