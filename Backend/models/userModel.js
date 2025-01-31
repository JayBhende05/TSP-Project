import mongoose  from "mongoose";

const userScehma = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique: true,
    },
    password:{
        type:String,
        required:true,
    },
    phone: {
        type:String,
        unique:true,
        required:true,
    },
    address: {
        type:String,
        required:true,
    },
    answer: {
        type:String,
        required:true,
    },
    role:{
        type:Number,
        default:0
    }


},{timestamps:true})

//users database in collection get above format as defined in UserSchema
export default mongoose.model('users', userScehma);