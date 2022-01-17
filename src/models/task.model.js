const { model,Schema } = require('mongoose');

const taskSchema = new Schema({
  title:{
    required: true,
    type: String
  },
  description:{
    required:true,
    type: String
  }
});




module.exports =  model('Tasks', taskSchema);;
