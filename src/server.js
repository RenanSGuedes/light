const express = require('express')
const nunjucks = require('nunjucks')
const path = require('path')
const routes = require('./routes')

const app = express()

app.use(express.json())

app.use(express.urlencoded({ 
  extended: true
}))

nunjucks.configure({
  express: app,
  autoescape: true,
  watch: true
})

app.use(routes)

app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'public')))



app.listen(process.env.PORT || 8088, () => console.log('Server is running...'))