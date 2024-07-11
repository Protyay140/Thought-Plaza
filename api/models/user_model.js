const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username : {
        type: String,
        required: true,
        unique: true
    },
    email : {
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profileImage :{
        type:String,
        default : 'https://cdn.pixabay.com/photo/2017/06/13/12/54/profile-2398783_1280.png'
    }
},{timestamps : true})

const User = mongoose.model('User',userSchema);

module.exports = User ; 