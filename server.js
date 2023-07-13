const express = require('express');
const ProductManager = require('./manager/ProductManager');
const Router = express.Router;


const app = express();
const productRouter = require('./routers/productRouter')
const cartRouter = require('./routers/cartRouter')
//const productManager = new ProductManager('./prueba.json');

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)


 // Iniciar el servidor en el puerto 8080
 app.listen(8080, () => {
    console.log('Servidor iniciado en http://localhost:8080');
  });