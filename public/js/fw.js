window.onerror = (message, source, lineno, colno, error) => {
  console.log(e)
}

window.onload = () => {
  let sock = new WebSocket("ws://localhost:3001");

  sock.addEventListener("open", (e) => {
    console.log("connect.")
  })
  
  sock.addEventListener("message", (e) => {
    console.log(e.data)
    location.reload()
  })
}
