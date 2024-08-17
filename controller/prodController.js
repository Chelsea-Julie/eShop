import express from 'express';
import bodyParser from 'body-parser';
// import { verifyToken } from '../middleware/AuthenticateUser.js';

import { Products } from '../model/Products.js';

const productRouter = express.Router ()

productRouter.use(bodyParser.json())

productRouter.get('/', (req, res) => {
  Products.fetchProducts(req, res)
})

productRouter.get('/Recent', (req, res) => {
    Products.recentProducts(req, res)
  })

  productRouter.get('/:id', (req, res) => {
    Products.fetchOneProduct(req, res)
  })

  productRouter.post('/add', (req, res) => {
    Products.addProduct(req, res)
  })

  productRouter.patch('/:id', (req, res) => {
    Products.updateProduct(req, res)
  })

  productRouter.delete('/:id', (req, res) => {
    Products.deleteProduct(req, res)
  })

export {
    express,
    productRouter
}

