const express = require('express');
const CartManager = require('./CartManager');
const Router = express.Router;

const app = express();
const cartRouter = Router()
const cartManager = new CartManager('./cart.json');

app.use(express.json())
app.use(express.urlencoded({extended: true}))






// Crear un nuevo carrito
cartRouter.post('/', (req, res) => {
    try {
        const cartData = req.body;
      cartManager.addProduct(cartData);
      res.status(201).json({ message: 'Product added successfully.' });
      return res.send(productData)
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
    
  });
  


module.exports=cartRouter