const socket = io();


socket.on("message", message => {
    console.lo(message)
})