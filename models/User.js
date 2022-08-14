import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type : String,
        require: true
    },
    email: {
        type: String, 
        require: true,
        unique: true
    },
    password: {
        type: String, 
        require: true,
    },
    avatar: {
        type: String, 
    },
    date: {
        type: Date, 
        default: Date.now,
    }
})

export default mongoose.model('User', userSchema);  