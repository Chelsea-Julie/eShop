import 'dotenv/config'
import jwt from 'jsonwebtoken'
const {sign, verify } = jwt 

function createToken(user) {
    return sign({
        emailAdd: user.emailAdd,
        pwd: user.pwd
    },
    process.env.SECRET_KEY, 
    { 
        expiresIn: '1h' 
    }

)
}

function verifyToken(req, res, next) {
    const token = req?.headers["authorization"] 
    if (token) {
        if (verify(token, process.env.SECRET_KEY)) {
            next()
         } else{
            res?.json({
                status: res.statuscode,
                msg:"Please provide the correct credentials"
            })
         }
} else{
    res?.json({
        status: res.status,
        msg:"please log in"
    })
}
}

export{
    createToken,
    verifyToken
}