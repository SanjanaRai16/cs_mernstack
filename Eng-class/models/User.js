import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    profilePicture: {
       type: String 
    },
    bio: {
        type: String
    },
    followers: [{
        follower:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    }],
    following: [{
        followed : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    }],

},
{timestamps: true}
)

const User= mongoose.model('user',userSchema);
export default User;