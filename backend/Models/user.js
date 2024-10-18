const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    messages: {
        type: [String]
    },
}, {timestamps: true});

const anonymousAppUser = mongoose.model('anonymousAppUser', userSchema)

export default anonymousAppUser;