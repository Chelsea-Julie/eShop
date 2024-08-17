import express from 'express'
import path from 'path'
import { userRouter } from './controller/UserController.js'
import { productRouter } from './controller/prodController.js'

import bodyParser from 'body-parser'
import { log } from 'console'
// Create an express app
const app = express()
const port = +process.env.PORT || 4000

// Middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next()
})

app.use('/Users', userRouter)
app.use('/Products', productRouter)

app.use( express.static('./static'),
    express.json(),
    express.urlencoded({
    extended: true
    }))


app.use(bodyParser.json());


// ENDPOINT
app.get('^/$|/eShop', (req, res) => {
    res.status(200).sendFile(path.resolve('./static/html/index.html'))
})



app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})