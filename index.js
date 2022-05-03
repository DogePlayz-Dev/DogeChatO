console.clear()
const express = require('express')
const socketio = require('socket.io')
const path = require('path')

const app = express()
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
let blExternalDevices = true // Blacklists all connections that aren't using ChromeOS
app.use((req,res,next) => {
    if(blExternalDevices && !(/\bCrOS\b/.test(req.get('User-Agent')))) return res.send('DogeChat has been abandoned.');
    next()
})

app.get('/', (req,res) => {
    res.render('index')
})

const server = require('http').createServer(app)
server.listen(3000, () => {
    console.log('The server is ready.')
})

const io = socketio(server, {cors: {origin: '*'}})
io.on('connection', (socket) => {
    let name = socket.id.slice(0,5)
    let prefix = ''
    socket.on('rename', (n) => {
        name = n
    })
    socket.on('msg', (content) => {
        io.sockets.emit('msg', {n: name, c: content})
    })
})