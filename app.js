var express = require('express')
    app = express()

app.use(express.static(__dirname + "/public"))

app.set('view engine', 'ejs')

app.get("/", (req, res) => {
  res.render('index')
})

app.listen(3002, () => console.log("Started zoomegle server"))