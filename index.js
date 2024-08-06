import express from 'express'
import path from 'path'
import {connection as db} from './config/index.js'
// Create an express app
const app = express()
const port = +process.env.PORT || 4000

const portfolioURL = "https://chelsea-julie.github.io/vueEOMP/data"
async function addData() {
    let data = await (await fetch(portalURL)).json()
    return data
}
const router = express.Router()
// Middleware
app.use(router, express.static('./static'),
    express.json(),
    express.urlencoded({
    extended: true
    }))
// ENDPOINT
router.get('^/$|/eShop', (req, res) => {
    res.status(200).sendFile(path.resolve('./static/html/index.html'))
})
router.get('/Users|/eShop/Users', (req, res) => {
    try {
        const strQry = `
        SELECT * 
        FROM Users;`
        db.query(strQry, (err, results) => {
            if (err) throw new Error (`Unable to fetch all users`);
            res.json({
                status: res.statusCode,
                results
            })
        })
    } catch (e) {
        res.json({
            status: 404,
            message: e.message 
        })
    }
})
router.get('*', (req, res) => {
    res.json({
        status: 404,
        message: 'Page not found'
    })
})
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})