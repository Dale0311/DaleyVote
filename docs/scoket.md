# properties and methods for real time data using socket.io

## Backend event emitters

### connection

everytime we logged in we subscribe to the connection

### createRoom

allows the user to create and join the room,
if participant join, must provide a password in th room

```
createRoom(socket => {
    socket.join("roomId");
})
socket.join("roomId")

scoket.on("join chat", socketId => {
    socket.join("roomId")
    io.emit("new user", socket.id)
})
```
