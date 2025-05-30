import server from './server'

/*Initialize the server*/
const port = process.env.PORT || 4000
server.listen(port, () => {
    console.log(`Servidor escuchando por el puerto: ${port}`)
})