import {mongoose  } from "mongoose";

const userSchema= new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  password:{ 
    type:String,
    required:true
  },
  repassword:{
    type:String,
    required:true
  },
  
},{
    timestamps:true
  });
//here it create users db(if first word is capital it will add s to it and change firstletter to lowercase )
const User = mongoose.model('User',userSchema);


export default User;
