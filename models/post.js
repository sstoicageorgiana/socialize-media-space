import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    user:{
        //only post owners can edit/delete specific posts
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'//from what "table to take"
    },
    text:{
        type: String,
        required: true,
    },
    //name of the user that posts
    name: {
        type : String,
    },
    password: {
        type: String, 
        require: true,
    },
    avatar: {
        type: String, 
    },
    likes:[
        {user: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
               }
        }
    ],
    date: {
        type: Date, 
        default: Date.now,
    }
})

export default mongoose.model('Post', postSchema);  