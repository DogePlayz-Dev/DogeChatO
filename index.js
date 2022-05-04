console.clear()
require('dotenv').config()
const express = require('express')
const socketio = require('socket.io')
const path = require('path')
let blExternalDevices = process.env.bl || true // Blacklists all connections that aren't using ChromeOS

const app = express()
app.use((req, res, next) => {
    if (blExternalDevices && !(/\bCrOS\b/.test(req.get('User-Agent')))) return res.send('DogeChat has been abandoned.');
    next()
})
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    res.render('index')
})

const server = require('http').createServer(app)
try {
    server.listen(process.env.PORT || 3000, () => {
        console.log('The server is ready.')
        console.log("Listening on Port " + process.env.PORT || 3000)
    })
} catch (err) {
    server.listen(3000, () => {
        console.log('The server is ready.')
        console.log("Listening on Port " + process.env.PORT || 3000)
    })
}

const io = socketio(server, { cors: { origin: '*' } })
io.on('connection', (socket) => {
    let name = socket.id.slice(0, 5)
    let prefix = ''
    function ban(){
        socket.emit('b')
    }
    socket.on('rename', (n) => {
        name = n
    })
    socket.on('msg', (content) => {
        console.log('hi')
        io.sockets.emit('msg', { n: prefix+" "+name, c: content })
    })
})