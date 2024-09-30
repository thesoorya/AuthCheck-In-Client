const mongoose = require('mongoose')

const user = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
}, { timestamps: true })

const User = new mongoose.model('user', user)

module.exports = User