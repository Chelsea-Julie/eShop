import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import { user } from '../model/index'

const userRouter = express.Router()

userRouter.use(bodyParser.json())
userRouter.get('/', (req, res) => {
    user.fetchUsers(req, res)
})

userRouter.get('/:id', (req, res) => {
    user.fetchOneUser(req, res)
})

userRouter.patch('/user/:id', (req, res) => {
    user.updated(req, res)
})

userRouter.delete('/user/:id', (req, res) => {
    user.deleteUser(req, res)
})

userRouter.post('/register', (req, res) => {
    user.registerUser(req, res)
})

userRouter.post('/login', (req, res) => {
    user.loginUser(req, res)
})

export {
    express,
    userRouter
}