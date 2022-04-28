console.clear()
const express = require('express')
const socketio = require('socket.io')
const path = require('path')

const app = express()
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req,res) => {
    res.render('index')
})

const server = require('http').createServer(app)
server.listen(3000, () => {
    console.log('The server is ready.')
})

const io = socketio(server, {cors: {origin: '*'}})
io.on('connection', (socket) => {
    socket.on('rename', () => {

    })
    socket.on('msg', (msgInfo) => {

    })
})