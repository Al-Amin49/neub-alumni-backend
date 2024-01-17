import express from 'express'
const app = express()
const port = 4000


//health route
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Alumni listening on port  ${port}`)
})