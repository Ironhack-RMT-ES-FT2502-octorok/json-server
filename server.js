// process.loadEnvFile() // esto permite a node acceder a las variables .env
// require('dotenv').config()
const fs = require("fs")
if (fs.existsSync('.env')) {
  process.loadEnvFile();
} else {
  console.warn(".env file not found, using default environment variables.");
}

const jsonServer = require("json-server")

const server = jsonServer.create() // crea el código del servidor json

// middlewares son configuraciones de el servidor
const middlewares = jsonServer.defaults() // crea las configuraciones esenciales de el server

server.use(middlewares) // hacer uso de las configuraciones

const allowAccessFromAnywhere = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  next()
}

server.use(allowAccessFromAnywhere) // esto permite que cualquier cliente pueda acceder a mi servidor

const router = jsonServer.router("db.json")

server.use(router) // esto crea TODAS las rutas basicas de acceso y modificacion a la DB (get, post, patch, put, delete)

const PORT = process.env.PORT | 5005

server.listen(PORT, () => {
  console.log("Servidor andando")
  console.log(`Ejecutandose localmente en http://localhost:${PORT}`)
}) // podemos a andar el servidor y que escuche continuamente llamadas de clientes.