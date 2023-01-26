const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
   users: [{userId:{type: Types.ObjectId, ref: 'User'}}],
   groupName: {type: String},
   sharedTodos: [{type: Types.ObjectId, ref:'SharedTodo'}],
})

module.exports = model('Group', schema)