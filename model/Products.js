import { connection as db } from "../config/index.js";

class Products {
    static fetchProducts ( req, res) {
        try {
            const strQry = `
            SELECT productID, prodName, category, prodDescription, prodURL, amount
            FROM Products
            `
            db.query(strQry, (err, result) => {
                if (err) throw new Error('Failed to fetch products')
                res.json({
                    status: res.statusCode,
                    data: result
                })
            })
        } catch (e) {
            res.json ({
                status: 404,
                msg: e.message
            })
        }
    }

    static recentProducts (req, res) {
        try {
            const strQry = `
                SELECT productID, prodName, category, prodDescription, prodURL, amount
                FROM Products
                ORDER BY productID DESC
                LIMIT 5;
                `
                db.query(strQry, (err, result) => {
                    if (err) throw new Error('Failed to fetch recent products')
                    res.json({
                        status: res.statusCode,
                        data: result
                    })
                })
        } catch (err) {
            res.json({
                status: 404,
                msg: err.message
            })
        }
    }

    static fetchOneProduct(req, res) {
        try {
            const strQry = 
            `SELECT productID, prodName, category, prodDescription, prodURL, amount
                FROM Products
               WHERE productID = ${req.params.id}
                `
                db.query(strQry, (err, result) => {
                    if (err) throw new Error('Failed to fetch product')
                    res.json({
                        status: res.statusCode,
                        data: result[0]
                    })
                })
                } catch (e) {
                    res.json({
                        status: 404,
                        msg: e.message
                    })
            
        }
    }

    static addProduct (req, res) {
        try {
            const strQry = `
            INSERT INTO Products
            SET?
            `
            db.query(strQry, [req.body], (err) => {
                if (err) throw new Error('Failed to add product')
                res.json({
                    status: res.statusCode,
                    msg: 'Product added successfully'
                })
            })
        } catch {
            res.json({
                status: 404,
                err: e.message
            })
        }
    
    }

    static updateProduct (req, res) {
    try {
        const strQry = ` 
        UPDATE Products 
        SET ?
        WHERE productID = ${req.params.id};
        `
        db.query(strQry, [req.body], (err) => {
            if (err) throw new Error('Failed to update product')
            res.json({
                status: res.statusCode,
                msg: 'Product updated successfully'
            })
        })
    } catch (e) {
        res.json({
            status: 404,
            err: e.message
        })
    }
    }

    static deleteProduct (req, res) {
        try {
            const strQry = `
            DELETE FROM Products
            WHERE productID = ${req.params.id}
            ` 
            db.query(strQry, (err) => {
                if (err) throw new Error('Failed to delete product')
                res.json({
                    status: res.statusCode,
                    msg: 'Product deleted successfully'
                })
            })
        } catch {
            res.json({
                status: 404,
                err: e.message
            })
        }

    }




}

export { 
    Products 
}
