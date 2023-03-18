const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    }, 
    priority: {
        type: Number,
        default: 0
    },
    date:{
        type: String
    },
    time :{
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, 
    checked: {
        type: Boolean,
        default: false
    }
})

const Task = mongoose.model('Task', TaskSchema)

module.exports = Task