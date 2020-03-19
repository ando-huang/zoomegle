var express = require('express')
    app = express()
    mongoose = require('mongoose'),
    bodyParser = require('body-parser')
    Class = require('./models/class')


    
    
mongoose.connect("mongodb+srv://mattfan00:spacelf14@cluster0-uxcbq.mongodb.net/test?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})


app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname + "/public"))

app.set('view engine', 'ejs')


app.get("/", (req, res) => {
  Class.find({}, (err, classes) => {
    res.render('index', {classes: classes})
  })
})

app.post("/", (req, res) => {
  Class.create(req.body, (err, newClass) => {
    res.json(newClass)
  })
})

app.put("/:classId", (req, res) => {
  Class.findByIdAndUpdate(req.params.classId, req.body, {new:true}, (err, updatedClass) => {
    res.json(updatedClass)
  })
})

// delete all classes
app.delete("/", (req, res) => {
  Class.remove({}, (err) => {
    res.send('removed all')
  })
})

// delete individual class
app.delete("/:classId", (req, res) => {
  Class.findByIdAndRemove(req.params.classId, (err, removedClass) => {
    res.json(removedClass)
  })
})

app.listen(3002, () => console.log("Started zoomegle server"))