# 3er-desafio
## -Servidor con Express 
### Alumno Carlos Salomon

## Consignas

##### Servidor basado en express donde podamos hacer consultas a nuestro archivo de productos

###### Utilizacion de la clase ProductManager
###### Desarrollar un servidor express que en su archivo app.js importe al archivo de ProductManager que actualmenmte tenemos.

## Aspectos a incluir

### Endpoints

##### "/"
##### "/products": debe leer el archivo de productos y devolverlos. Agregar el soporte para recibir por query param el valor ?limit= el cual reciba un limite de resultados. en caso de no recibir query de limite, devolver todos los productos.
##### "/products/:pid": debe recibir por req.params el pid (product id) y devolver solo el producto solicitado.

## CARPETA src con app.js  y ProductManager.js dentro 

