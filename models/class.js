var mongoose = require('mongoose')

var classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Cannot be blank"
  },
  university: {
    type: String,
    required: "Cannot be blank"
  },
  subject: {
    type: String,
    required: "Cannot be blank"
  }
})

module.exports = mongoose.model("Class", classSchema)