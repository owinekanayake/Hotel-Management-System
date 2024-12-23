import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: {
        type: String,
        require : true,
        unique : true,
    },
    password : {
        type: String,
        require: true
    },
    firstName : {
        type: String,
        require : true
    },
    lastName : {
        type: String,
        require : true
    },
    type : {
        type : String,
        require : true,
        default: "customer"
    },
    whatsApp : {
        type:String,
        require : true,
        unique : true
    },
    phone : {
        type:String,
        require : true,
        unique : true
    },
    disabled : {
        type : Boolean,
        require : true,
        default : false
    },
    emailVerified : {
        type : Boolean,
        require : true,
        default : false
    }
});

const User = mongoose.model("User", userSchema);

export default User;