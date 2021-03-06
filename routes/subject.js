var express = require("express")
    router = express.Router(),
    Subject = require('../models/subject')

router.get("/", (req, res) => {
  res.redirect("/subjects")
})

router.get("/subjects", (req, res) => {
  Subject.find({}, (err, subjects) => {
    var numRecordings = 0;
    subjects.forEach(subject => {
      numRecordings += subject.classes.length;
    });
    res.render("index", {
      subjects: subjects,
      numRecordings: numRecordings
    })
  })
})

router.get("/subjects/new", (req, res) => {
  res.render('addSubject')
})

router.get("/api/subjects", (req, res) => {
  Subject.find({}, (err, subjects) => {
    res.json(subjects)
  })
})

router.get("/subjects/:subjectId", (req, res) => {
  Subject.findById(req.params.subjectId).populate("classes").exec(function(err, foundSubject) {
    res.render("classes", {
      classes: foundSubject.classes,
      subjectName: foundSubject.name
    })
    // res.json(foundSubject.classes)
  })
})

router.post("/subjects", (req, res) => {
  Subject.create(req.body, (err, newSubject) => {
    console.log(newSubject)
    res.redirect('/subjects/new')
  })
})

router.post("/api/subjects", (req, res) => {
  Subject.create(req.body, (err, newSubject) => {
    res.json(newSubject)
  })
})

router.put("/subjects/:subjectId", (req, res) => {
  Subject.findByIdAndUpdate(req.params.subjectId, req.body, {new:true}, (err, updatedSubject) => {
    res.json(updatedSubject)
  })
})

router.delete("/subjects", (req, res) => {
  Subjects.remove({}, (err) => {
    res.send("removed all")
  })
})

router.delete("/subjects/:subjectId", (req, res) => {
  Subject.findByIdAndRemove(req.params.subjectId, (err, deletedSubject) => {
    res.json(deletedSubject)
  })
})

module.exports = router