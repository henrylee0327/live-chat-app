const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const cors = require('cors')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 5000

// Middleware
app.use(express.static('../client/build'))
app.use(cors())


app.get('/', (req, res) => {
    res.render('index.html')
})

// Socket.io API
io.on('connection', (socket) => {
    socket.on('chatroom-join', ({firstName, lastName}) => {
        socket.join({firstName, lastName})
        io.emit('message', {firstName: 'admin', message: `${firstName} has joined`})
    })

    socket.on('send-message', ({firstName, message}) => {
        io.emit('message', {firstName, message})
    })

    socket.on('disconnect', () => {
        io.emit('close-message', {firstName: 'admin', message: 'An user left'})
        socket.disconnect()
    })
})




server.listen(port, () => {
    console.log('Server is running at ' + port)
})
