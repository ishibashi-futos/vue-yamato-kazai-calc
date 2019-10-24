const express = require("express")
const app = express();
const PORT = (() => {
  let port = process.env.PORT
  return isNaN(port) ? 3000 : port
})()

let server = app.listen(PORT, function() {
  console.log("Starting DevServer open http://localhost:" + server.address().port);
})

// faviconをエラーにしない
app.get("/favicon.ico", (req, res) => res.status(204))
// publicディレクトリを公開対象にする
app.use(express.static("public"))

const WebSocket = require("ws").Server
let socket = new WebSocket({port: 3001})

socket.on("connection", (ws) => {
  ws.on("message", (message) => {
    console.log("Recived:" + message)
  })

  ws.on("close", () => {
    console.log("close client.")
  })
})

const chokidar = require('chokidar')

const watcher = chokidar.watch("./public/", {persistent:true})
watcher.on("ready", () => {console.log("start watch.")})
.on("change", () => {
  console.log("reload.")
  socket.clients.forEach((client) => {
    client.send("message:" + new Date())
  })
})
