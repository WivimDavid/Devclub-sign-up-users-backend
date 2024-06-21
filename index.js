
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001
const uuid = require('uuid')

app.use(express.json())
app.use(cors())


const arrayUsers = []

//Middleware
const checkUserID = (req, res, next) => {
  const {id} = req.params

  const index = arrayUsers.findIndex(user => user.id === id)

  if (index < 0) {
    return res.status(404).json({ error: "User not found" })
  }

  req.userIndex = index  
  req.userId = id

  next()

}

//Routes
app.get('/users', (req, res) => {
  return res.json(arrayUsers)
})


app.post('/users', (req, res) => {
  const { name, age } = req.body

  const user = { id: uuid.v4(), name, age }

  arrayUsers.push(user)

  return res.status(201).json(user)
})


app.put('/users/:id', checkUserID, (req, res) => {
  const { name, age } = req.body
  const index = req.userIndex 

  const updateUser = { id, name, age }

  arrayUsers[index] = updateUser

  return res.json(updateUser)
})


app.delete('/users/:id', checkUserID,  (req, res) => {
  const index = req.userIndex 

  arrayUsers.splice(index, 1)

  return res.status(204).json()
  
})


// Port
app.listen(port, () => {
  console.log(` ➡️ Server ON port ${port} `)
})