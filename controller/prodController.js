import express from 'express';
import bodyParser from 'body-parser';
import { verifyToken } from '../middleware/AuthenticateUser.js';

import { Products } from '../model/Products.js';

const productRouter = express.Router ()

productRouter.use(bodyParser.json())

productRouter.get('/', verifyToken, (req, res) => {
  Products.fetchProducts(req, res)
})

productRouter.get('/recent', (req, res) => {
    Products.recentProducts(req, res)
  })

  productRouter.get('/;id', verifyToken, (req, res) => {
    Products.fetchOneProduct(req, res)
  })

  productRouter.post('/add', verifyToken, (req, res) => {
    Products.addProduct(req, res)
  })

  productRouter.patch('/:id', verifyToken, (req, res) => {
    Products.updateProduct(req, res)
  })

  productRouter.delete('/:id', verifyToken, (req, res) => {
    Products.deleteProduct(req, res)
  })

export {
    productRouter
}

