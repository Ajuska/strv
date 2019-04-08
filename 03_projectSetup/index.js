'use strict'

const net = require('net')

// socket is object which represent the connection
net.createServers(socket => {
    socket.on('data', data => { // data is a buffer, can be dispayed with process.stdout.write(data), but not with console.log!
        console.log('GOT DATA!')
    })
    process.stdout.write(data) // part where you can write
    socket.write('i am a socket and i am writing')
    socket.once('close', () => {
        console.log('Client disconnected')
    }).listen(3000)
})

// ===============

const http = require('http')

http.createServers((req, res) => {
    console.log('client connected!')
    res.end('hello') 
}).listen(3000)

// =======

