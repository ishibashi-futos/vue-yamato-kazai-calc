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

const itemsSource = (() => {
  result = []
  for (let i = 1; i< 10; i++) {
    result.push({
      name: `name_${i.toString().padStart(5, "0")}`,
      W: Math.round(i * Math.random()) * 10,
      D: Math.round(i * Math.random()) * 5,
      H: Math.round(i * Math.random()) * 10,
      subtotal: ""
    })
  }
  return result
})()

var app = new Vue({
  el: "#app",
  data: {
    message: "Hello, Vue",
    grid: {
      headers: ["name", "W", "D", "H", "3 sides total", "option", "rank", ""],
      itemsSource: itemsSource
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
      let index = parseInt(e.srcElement.id.replace(/[w|h|d]-/, ""))
      let subtotal = 0
      "whd".split("").forEach((key) => subtotal += parseInt(document.getElementById(`${key}-${index}`).value))
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
    },
    sort: function (e) {
      const thead = document.getElementsByTagName("thead")[0]
      if (!thead.classList.contains("sort_desc")) {
        thead.classList.replace("sort_asc", "sort_desc")
        this.grid.itemsSource = this.grid.itemsSource.sort((a, b) => {
          const p = e.srcElement.id.replace("_h", "")
          if(a[p] < b[p]) return -1
          if(a[p] > b[p]) return 1
          return 0
        })
      } else {
        thead.classList.replace("sort_desc", "sort_asc")
        this.grid.itemsSource = this.grid.itemsSource.sort((a, b) => {
          const p = e.srcElement.id.replace("_h", "")
          if(a[p] < b[p]) return -1
          if(a[p] > b[p]) return 1
          return 0
        }).reverse()
      }
    }
  }
})
