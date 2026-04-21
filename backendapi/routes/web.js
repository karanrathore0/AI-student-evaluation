const express = require('express')
const AuthController = require('../controllers/AuthController')
const TeacherController = require('../controllers/TeacjerController')
const StudentController = require('../controllers/StudentController')
const route = express.Router()
const auth = require('../middleware/auth')

//student
route.post('/register',AuthController.register)
route.post('/login',AuthController.login)

//teacher
route.post('/addresult',auth,TeacherController.addResult)    
route.get('/allresult',auth,TeacherController.allResult)

//myresult
route.get('/myresult',auth,StudentController.myResult)

module.exports = route