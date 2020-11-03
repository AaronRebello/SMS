const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = Schema({
  studentId: {
    type: String,
    //todo add required
  },
  name:{
    type:String,
    required:true,
  },
  class: {
    type: String,
    required: true,
  },
  board: {
    type: String,
    required: true,
  },
  marks: {
    type: Number,
    required: true,
  },
  performance: {
    type: String,
    required: true,
  },
  fees: {
    type: Number,
    required: true,
  },
});

module.exports = Student= mongoose.model("student",studentSchema);