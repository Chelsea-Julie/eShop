import express from 'express'
import path from 'path'
import {connection as db} from './config/index.js'
import {createToken} from './middleware/AuthenticateUser.js'
import {compare, hash} from 'bcrypt'
import bodyParser from 'body-parser'
import { log } from 'console'
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

router.post('/register', async (req, res) => {
    try {
        let data = req.body
        data.pwd = await hash(data.pwd,12)
            // payload
            let user = {
                emailAdd: data.emailAdd,
                pwd: data.pwd
            }
            let strQry = `
            INSERT INTO Users 
             SET ?; 
            `
            db.query(strQry, [data], (err) => {
                if (err) {
                    res.json({
                        status:res.statusCode,
                        msg: 'This email address already exists'
                    })
                }   else {
                    const token = createToken(user)
                    res.json({
                        token,
                        msg:'You are now registered'
                    })
                }
            })
        
    } catch (err) {
        console.log(err);
    }

}

)

router.get('./')

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

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})