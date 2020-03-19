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

module.exports = router