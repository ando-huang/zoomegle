var express = require('express')
    app = express()
    mongoose = require('mongoose'),
    bodyParser = require('body-parser')
    Class = require('./models/class'),
    Subject = require('./models/subject')
    
    
mongoose.connect("mongodb+srv://mattfan00:spacelf14@cluster0-uxcbq.mongodb.net/test?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})


app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname + "/public"))

app.set('view engine', 'ejs')

app.get("/", (req, res) => {
  res.redirect("/subjects")
})

app.get("/subjects", (req, res) => {
  res.send("hi from the subject page")
})

app.post("/subjects", (req, res) => {
  Subject.create(req.body, (err, newSubject) => {
    res.json(newSubject)
  })
})

app.get("/classes", (req, res) => {
  Class.find({}, (err, classes) => {
    res.render('index', {classes: classes})
  })
})

app.post("/classes", (req, res) => {
  Class.create(req.body, (err, newClass) => {
    res.json(newClass)
  })
})

app.put("/classes/:classId", (req, res) => {
  Class.findByIdAndUpdate(req.params.classId, req.body, {new:true}, (err, updatedClass) => {
    res.json(updatedClass)
  })
})

// delete all classes
app.delete("/classes", (req, res) => {
  Class.remove({}, (err) => {
    res.send('removed all')
  })
})

// delete individual class
app.delete("/classes/:classId", (req, res) => {
  Class.findByIdAndRemove(req.params.classId, (err, removedClass) => {
    res.json(removedClass)
  })
})

app.listen(3002, () => console.log("Started zoomegle server"))