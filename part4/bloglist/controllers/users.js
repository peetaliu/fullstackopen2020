const bcrypt = require('bcrypt')
const User = require('../models/user')
const usersRouter = require('express').Router()

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response, next) => {
  const body = request.body
  if (!body.username || !body.password) {
    return response
      .status(401)
      .json({ error: 'username/password cannot be empty' })
  } else if (body.username.length < 3 || body.password.length < 3) {
    return response
      .status(401)
      .json({ error: 'username/password must have at least 3 characters' })
  }
  const passwordHash = await bcrypt.hash(body.password, 10)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()
  response.json(savedUser)

  next(exception)
})

module.exports = usersRouter
