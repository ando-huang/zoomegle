var express = require('express'),
    router = express.Router(),
    Class = require('../models/class'),
    Subject = require('../models/subject')



router.post("/subjects/:subjectId/classes", (req, res) => {
  Subject.findById(req.params.subjectId, (err, foundSubject) => {
    Class.create(req.body, (err, newClass) => {
      foundSubject.classes.push(newClass)
      foundSubject.save()
      res.redirect("/subjects/" + req.params.subjectId)
    })
  })
})

router.get("/classes/new", (req, res) => {
  Subject.find({}, (err, subjects) => {
    res.render("postClasses", {subjects: subjects})
  })
})

router.post("/classes", (req, res) => {
  console.log(req.body)
  const newClass = req.body.newClass
  Subject.findById(newClass.subjectId, (err, foundSubject) => {
    Class.create(newClass, (err, newClass) => {
      foundSubject.classes.push(newClass)
      foundSubject.save()
      res.redirect("/")
    })
  })
})

module.exports = router