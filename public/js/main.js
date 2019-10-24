window.onerror = (message, source, lineno, colno, error) => {
  console.log(e)
}
const rank = [
  {sidesTotal: 80, rank: "SS"},
  {sidesTotal: 120, rank: "S"},
  {sidesTotal: 160, rank: "A"},
  {sidesTotal: 200, rank: "B"},
  {sidesTotal: 250, rank: "C"},
  {sidesTotal: 300, rank: "D"},
  {sidesTotal: 350, rank: "E"},
  {sidesTotal: 400, rank: "F"},
  {sidesTotal: 450, rank: "G"},
]

var app = new Vue({
  el: "#app",
  data: {
    message: "Hello, Vue",
    grid: {
      headers: ["name", "W", "D", "H", "3 sides total", "option", "rank", ""],
      itemsSource: (() => {
        result = []
        for (let i = 1; i< 10; i++) {
          result.push({
            name: `name_${i.toString().padStart(5, "0")}`,
            w: Math.round(i * Math.random()) * 10,
            d: Math.round(i * Math.random()) * 5,
            h: Math.round(i * Math.random()) * 10,
            subtotal: ""
          })
        }
        return result
      })(),
    },
    options: (() => {
      result = []
      for (let i = 1; i< 10; i++) {
        result.push({value: i, label: `label${i}`})
      }
      return result
    })(),
    rank: rank
  },
  methods: {
    remove: function (e) {
      let i = e.srcElement.id
      this.grid.itemsSource.splice(i, 1)
    },
    updateSubTotal: function (e) {
      let index = Number(e.srcElement.id.replace(/[w|h|d]-/, ""))
      let subtotal = 0
      "whd".split("").forEach((key) => subtotal += Number(document.getElementById(`${key}-${index}`).value))
      let updateVal = ""
      this.rank.some((item) => {
        if (subtotal > 460) {
          updateVal = "この商品は送れません"
          return false
        }
        if (item.sidesTotal >= subtotal) {
          updateVal = item.rank
          return true
        }
        return false
      })
      this.grid.itemsSource[index].subtotal = updateVal
    }
  }
})

let sock = new WebSocket("ws://localhost:3001");

sock.addEventListener("open", (e) => {
  console.log("connect.")
})

sock.addEventListener("message", (e) => {
  console.log(e.data)
  location.reload()
})
