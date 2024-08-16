import express from 'express'
import path from 'path'
import {connection as db} from './config/index.js'
import {createToken} from './middleware/AuthenticateUser.js'
import {compare, hash} from 'bcrypt'
import bodyParser from 'body-parser'
import { log } from 'console'
import { user } from './model/index.js'
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

    router.use(bodyParser.json());
// ENDPOINT
router.get('^/$|/eShop', (req, res) => {
    res.status(200).sendFile(path.resolve('./static/html/index.html'))
})
router.get('/Users|/eShop/Users', (req, res) => {
    user.fetchUsers(req, res)
})

router.post('/register', (req, res) => {
    user.registerUser(req, res)
})

// update an existing user
router.patch('/user/:id', async (req, res) => {
    try {
        let data = req.body
        if (data.pwd) {
            data.pwd = await hash(data.pwd, 12)
        }
        const strQry = `
        UPDATE Users
        SET ?
        WHERE underID = ${req.params.id}
        `
        db.query(strQry, [data], (err) => {

            if (err) throw new Error (`Unable to update user}`);
            res.json({
                status: res.statusCode,
                msg: 'User updated successfully'
            })
        })
    } catch (e) {
        res.json({
            staus:400,
            msg:e.message
        })
    }
})

router.delete('/user/:id', (req, res) => {
    try {
        const strQry = `
        DELETE FROM Users WHERE underID = ${req.params.id};
        `
        db.query(strQry, (err) => {
            if (err) throw new Error('Error deleting')
                res.json({
            status: res.statusCode,
                msg: 'User deleted successfully'
            })
        })
    } catch (e) {
        res.json({
            status: 404,
            msg: e.message
        })
    }
})
router.post('/login', (req, res) =>{
    try {
        const { emailAdd, pwd} = req.body
        const strQry = `
        SELECT *
        FROM Users 
        WHERE emailAdd = '${emailAdd}'
        `
        db.query(strQry, async (err, result) => {
            if (err) throw new Error('To login, please try again')
            if (!result?.length) {
                res.json(
                    {
                        status: 401,
                        msg: 'Invalid email'
                    }
                )
            } else {
                const isValidPass = await compare
                (pwd, result[0].pwd)
                if (isValidPass) {
                    const token = createToken({
                        emailAdd,
                        pwd
                    })
                    res.json({
                        status: res.statusCode,
                        token,
                        result: result[0]
                    })
                } else {
                    res.json(
                        {
                            status: 401,
                            msg: 'Invalid password'
                        }
                    )
                }
            } 
        })
    } catch (e) {
        
    }
})

// products routes 

router.get('/products', (req, res) => {
    try {
        const strQry = `
        SELECT * 
        FROM Products;`
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

router.post('/addProduct',  (req, res) => {
    try {
        let data = req.body
        
         
            let strQry = `
            INSERT INTO Products 
            SET ?; 
            `
            db.query(strQry, [data], (err, result) => {
                if (err) {
                    res.json({
                        status:res.statusCode,
                        msg: 'This product already exist '
                    })
                }   else {
                    res.json({
                        status: res.statusCode,

                        msg:'The product is now registered'
                    })
                }
            })
        
    } catch (err) {
        console.log(err);
    }

}

)

// getting one user


router.get('/product/:id', (req, res) => {
    try {
        const {id} = req.params
        const strQry = `SELECT * FROM Products WHERE productID = ${id};`

        db.query(strQry, (err, results) => {
            if (err) throw new Error (err);
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
}

)

router.patch('/product/:id', (req, res) => {
    try {
        let data = req.body
        
        const strQry = `
        UPDATE Products
        SET ?
        WHERE productID = ${req.params.id}
        `
        db.query(strQry, [data], (err) => {

            if (err) throw new Error (`Unable to update user}`);
            res.json({
                status: res.statusCode,
                msg: 'User updated successfully'
            })
        })
    } catch (e) {
        res.json({
            staus:400,
            msg:e.message
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