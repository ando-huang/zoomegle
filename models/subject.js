var mongoose = require('mongoose')

var subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Cannot be blank'
  },
  classes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class"
    }
  ]
})

module.exports = mongoose.model('Subject', subjectSchema)