const express = require('express');
const ProductManager = require('./ProductManager');
const app = express();
const port = 8080;
const productManager = new ProductManager();

app.get('/', async (req, res) => {
  res.send(`
    <html>
      <head>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            font-size:  20px;
            background-color: #0D1E31;
            text-align: center;
            padding: 50px;
          }
          h1 {
            color: #3498db;
          }
          a{
            color: #D0E0F2
          }
        </style>
      </head>
      <body>
        <h1>Bienvenidos a nuestro ecommerce</h1>
        <a href="/products">VER TODOS LOS PRODUCTOS</a>
      </body>
    </html>
  `);
});


app.get('/products', async (req, res) => {
  try {
    await productManager.init();
    const allProducts = productManager.getProducts();
    const limit = req.query.limit;
    const products = limit ? allProducts.slice(0, parseInt(limit)) : allProducts;
    const productListHTML = products.map(product => `
      <li>
      <a href="/products/${product.id}">
        <strong>${product.title}</strong></a>
        <p>${product.description}</p>
        <p>Precio: ${product.price}</p>
        <p>code: ${product.code}</p>
        <p>stock: ${product.stock}</p>
      </li>
    `).join('');


    res.send(`
      <html>
        <head>
          <style>
            body {
              font-family: sans-serif;
              background-color: #0D1E31;
              padding: 20px;
            }
            li {
              display: flex;
              flex-direction: column;
              text-align: center;
              list-style-type: none;
              border: 1px solid #ddd;
              margin: 10px;
              padding: 10px;
              background-color: #fff;
              border-radius: 5px;
              width: 350px;
            }
            strong {
              color: #3498db;
            }
            h1 {
              color: white
            }
            a{
              color: #D0E0F2
            }
          </style>
        </head>
        <body>
          <h1>Productos</h1>
          <ul>
            ${productListHTML}
          </ul>
          <a href="/">Volver a Inicio</a>
        </body>
      </html>
    `);

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Error al obtener los productos.' });
  }
});


app.get('/products/:pid', async (req, res) => {
  try {
    await productManager.init();
    const pid = parseInt(req.params.pid);
    const product = await productManager.getProductById(pid);
    if (product) {
      res.send(`
      <html>
        <head>
          <style>
            body {
              background-color:#0D1E31;
              font-family: Arial, sans-serif;
              color: white;
            }
            a{
              color:#D0E0F2
            }
          </style>
        </head>
        <body>
          <h1>Detalles del Producto</h1>
          <p>ID: ${product.id}</p>
          <p>Nombre: ${product.title}</p>
          <img src="${product.image}" />
          <p>Precio: $${product.price}.00 ARS</p>
          <p>Codigo: $${product.code}</p>
          <a href="/">Volver a Inicio</a>
          <a href="/products">ver todos los productos</a>
        </body>
      </html>`);

    } else {
      res.status(404).json({ error: `Producto con ID ${pid} no encontrado.` });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Error al obtener el producto.' });
  }
});
app.listen(port, async () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
  await productManager.init();
});
