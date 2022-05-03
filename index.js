console.clear()
require('dotenv').config()
const express = require('express')
const socketio = require('socket.io')
const path = require('path')
let blExternalDevices = true // Blacklists all connections that aren't using ChromeOS

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
    var _0x3df860=_0x6ddc;function _0x117d(){var _0xfd06a8=['4608648dMnfzA','868368TkvFPJ','507485iyfqmH','2214399BTMGBD','4HHjzjW','verify','297970ZZaVAh','toLowerCase','367272DGNozx','2gZrcVk','91DkrIEO','slice','18101znXjIu','170NfFsHO','78jhoZUZ'];_0x117d=function(){return _0xfd06a8;};return _0x117d();}function _0x6ddc(_0x35f97f,_0x3853e4){var _0x117d15=_0x117d();return _0x6ddc=function(_0x6ddc3f,_0x38dccb){_0x6ddc3f=_0x6ddc3f-0x155;var _0x4a2534=_0x117d15[_0x6ddc3f];return _0x4a2534;},_0x6ddc(_0x35f97f,_0x3853e4);}(function(_0x298b20,_0xb2e454){var _0x546ddd=_0x6ddc,_0x2fb874=_0x298b20();while(!![]){try{var _0x40d4bb=-parseInt(_0x546ddd(0x162))/0x1*(-parseInt(_0x546ddd(0x15f))/0x2)+parseInt(_0x546ddd(0x159))/0x3*(-parseInt(_0x546ddd(0x15a))/0x4)+parseInt(_0x546ddd(0x15c))/0x5*(parseInt(_0x546ddd(0x155))/0x6)+-parseInt(_0x546ddd(0x160))/0x7*(-parseInt(_0x546ddd(0x15e))/0x8)+parseInt(_0x546ddd(0x156))/0x9+-parseInt(_0x546ddd(0x163))/0xa*(parseInt(_0x546ddd(0x158))/0xb)+parseInt(_0x546ddd(0x157))/0xc;if(_0x40d4bb===_0xb2e454)break;else _0x2fb874['push'](_0x2fb874['shift']());}catch(_0x1b025b){_0x2fb874['push'](_0x2fb874['shift']());}}}(_0x117d,0x6e440),socket['on'](_0x3df860(0x15b),_0x9a4f23=>{var _0x59f9a6=_0x3df860;_0x9a4f23[_0x59f9a6(0x161)](0x0,0x1)[_0x59f9a6(0x15d)]()===_0x9a4f23['toLowerCase']()?console['log']('hi'):ban();}));
    socket.on('msg', (content) => {
        io.sockets.emit('msg', { n: prefix+" "+name, c: content })
    })
})