const {
    Schema,
    model
  } = require("mongoose");
  
  const MySchema = new Schema({
    studentname: {
      type: String,
      required: true,
      maxlength: 50
    },
    coursename: {
      type: String,
      required: true,
      maxlength: 50
    },
    email: {
      type: String,
      required: true,
      maxlength: 50
    },
    phone: {
      type: Number,
      required: true,
      maxlength: 10
    },
    
  });
  
  const TaskModel = model("test", MySchema)
  
  module.exports = TaskModel