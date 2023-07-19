const socket = io()  // al cliente lo estamos mandando a conectar con el servdor websocket

console.log(socket)

socket.on('connect', () => {
    console.log('Connected to server'); // Add this log
  });
  
  socket.on('nuevoProducto', (data) => {
    console.log('New product received:', data); });

socket.on('nuevoProducto', (data) => {
    const product = (data);
    const table = document.getElementById('productos');
    const row = document.createElement('tr');
  
    row.innerHTML = `
      <td>${product.id}</td>
      <td>${product.title}</td>
      <td>${product.description}</td>
      <td>${product.code}</td>
      <td>${product.price}</td>
      <td>${product.status}</td>
      <td>${product.stock}</td>
      <td>${product.category}</td>
    `;
  
    table.appendChild(row);
  });


  socket.on('deleteProduct', (productId) => {
    
    const row = document.querySelector(`tr[data-product-id="${productId}"]`);
    if (row) {
    row.remove();
  }
    
  });
  