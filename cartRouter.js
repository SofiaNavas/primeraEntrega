const fs = require('fs');
const express = require('express');
const CartManager = require('./CartManager');
const Router = express.Router;

const app = express();
const cartRouter = Router()
const cartManager = new CartManager('./cart.json');

app.use(express.json())
app.use(express.urlencoded({extended: true}))



// Obtener todos los carritos
cartRouter.get('/', async (req, res) => {
    try {
      const limit = req.query.limit; // Obtener el límite de resultados del query param
  
      const carts = cartManager.getProducts();
  
      // Aplicar el límite si se especificó en el query param
      const limitedCarts = limit ? products.slice(0, limit) : carts;
  
      res.json(limitedCarts);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los productos' });
    }
  });
  
  // Endpoint dinamico para obtener un carrito por su ID 
  cartRouter.get('/:cid', async (req, res) => {
    const cartId = parseInt(req.params.cid); // Obtener el ID del producto como entero
    try {
       
      const cart = cartManager.getProductById(cartId);
  
      res.json(cart);
    } catch (error) {
      if (error.message === 'ID not found') {
        res.status(404).json({ error: 'Carrito no encontrado' });
      } else {
        res.status(500).json({ error: 'Error al obtener el carrito' });
      }
    }
  });


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


  // Actualizar un carrito
cartRouter.post('/:cid/product/:pid', (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    const quantity = req.body.quantity || 1;
    
    fs.readFile('cart.json', 'utf-8', (err, fileContent) => {
      if (err) {
        console.error('Error reading cart file:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      const carts = JSON.parse(fileContent) || [];
      const cart = carts.find((c) => c.id === cartId);
      if (cart) {
        const existingProduct = cart.products.find((p) => p.product.productID === productId);

        if (existingProduct) {
          existingProduct.quantity += quantity;
        } else {
          cart.products.push({ product: productId, quantity });
        }
        fs.writeFile('carrito.json', JSON.stringify(carts, null, 2), 'utf-8', (err) => {
          if (err) {
            console.error('Error writing cart file:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
          }
          res.json({ message: 'Product added to cart successfully.' });
        });
      } else {
        res.status(404).json({ error: 'Cart not found' });
      }
    });
  });
  


module.exports=cartRouter