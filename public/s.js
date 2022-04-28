const socket = io()
socket.connect()
socket.on('connect', () => {
    console.log(`%c Connected to the Server as ${socket.id}`, 'color: rgb(0,255,0)')
})