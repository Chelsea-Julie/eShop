import { createPool } from "mysql2";
import "dotenv/config"
let connection = createPool ({
    host : process.env.hostDb,
    user : process.env.userDb,
    password : process.env.DBpswd,
    database : process.env.DBName,
    multipleStatements : true,
    connectionLimit : 30
})
connection.on('connection', (err) => {
    if (err) throw new Error(
        'could not connect to the database, please try again later'
    )
})

export {
    connection
}