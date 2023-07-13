const express = require('express');
const app = express();

const Router = express.Router;
const handlebars = require ('express-handlebars')
const {Server} = require('socket.io')



app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.engine('handlebars', handlebars.engine())
app.set('views', './views')
app.set('view engine', 'handlebars')

app.use(express.static('public'))

const productRouter = require('./routers/productRouter')
const cartRouter = require('./routers/cartRouter')

const products = require('./prueba.json');


const PORT = 8080
const httpServer = app.listen (PORT, ()  => console.log (`Servidor iniciado en http://localhost:${PORT}`))



const io = new Server(httpServer);

app.use('/api/products', (req, res, next) => {
  req.io = io; // Pass the io instance to the request object
  next();
}, productRouter);


app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)


app.get('/home',(req,res) => {

  const params = {
      title: 'Productos',
      products: products

  }
  return res.render('home', params)
  
})


app.get('/realtimeproducts',(req,res) => {

  const params = {
      title: 'realtimeproducts',
      products: products,

  }
  return res.render('realTimeProducts', params)
  
})

io.on('connection', (socket) => {
  console.log('New client connected');
});
