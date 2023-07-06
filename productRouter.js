const express = require('express');
const ProductManager = require('./ProductManager');
const Router = express.Router;

const app = express();
const productRouter = Router()
const productManager = new ProductManager('./prueba.json');

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Obtener todos los productos
productRouter.get('/', async (req, res) => {
    try {
      const limit = req.query.limit; // Obtener el límite de resultados del query param
  
      const products = productManager.getProducts();
  
      // Aplicar el límite si se especificó en el query param
      const limitedProducts = limit ? products.slice(0, limit) : products;
  
      res.json(limitedProducts);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los productos' });
    }
  });
  
  // Endpoint dinamico para obtener un producto por su ID 
  productRouter.get('/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid); // Obtener el ID del producto como entero
    try {
       
      const product = productManager.getProductById(productId);
  
      res.json(product);
    } catch (error) {
      if (error.message === 'ID not found') {
        res.status(404).json({ error: 'Producto no encontrado' });
      } else {
        res.status(500).json({ error: 'Error al obtener el producto' });
      }
    }
  });

  // Agregar un nuevo producto
productRouter.post('/', (req, res) => {   
    try {
        const productData = req.body;
      productManager.addProduct(productData);
      res.status(201).json({ message: 'Product added successfully.' });
      return res.send(productData)
    } catch (error) {
      res.status(400).json({ error: error.message });
    }

    
  });

  // Actualizar un producto
productRouter.put('/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const updatedFields = req.body;
    try {
      productManager.updateProduct(productId, updatedFields);
      res.json({ message: 'Product updated successfully.' });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });
  
 // Eliminar un producto
productRouter.delete('/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    try {
      productManager.deleteProduct(productId);
      res.json({ message: 'Product deleted successfully.' });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });


  module.exports=productRouter