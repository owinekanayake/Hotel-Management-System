import User from "../models/user.js";
import jwt from "jsonwebtoken";

export function postUser(req, res) {
  const user = req.body;

  const newUser = new User(user);
  newUser
    .save()
    .then(() => {
      res.json({
        message: "User Created Successfully",
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        // MongoDB duplicate key error code
        res.status(400).json({
          message: "Email already exists. Please use a different email.",
        });
      } else {
        // General server error
        res.status(500).json({
          message: "User creation failed. An error occurred.",
          error: err.message,
        });
      }
    });
} 

export function loginUser(req,res){
  const credentials = req.body;
  User.findOne({email : credentials.email, password : credentials.password}).then(
    (user)=>{
      if (user == null) {
        res.status(404).json({
          message : "User Not Found"
        })
      }else{
        const payload = {
          id : user.id,
          email : user.email,
          firstName : user.firstName,
          lastName : user.lastName,
          type : user.type,
        };

        const token = jwt.sign(payload,"secret",{expiresIn : "1h"})

        res.json({
          message : "User Found",
          user : user,
          token : token
        })
      }
    }
  )
}