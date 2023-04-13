const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    priority: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean
    }
}, {timestamps: true});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;