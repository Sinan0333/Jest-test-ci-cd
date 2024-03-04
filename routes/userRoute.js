const express = require('express')
const user_route = express.Router()

const userController = require('../controllers/userController')

user_route.get('/',userController.sample)
user_route.post('/signup',userController.signup)
user_route.post('/login',userController.login)


module.exports = user_route