import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bctypt from "bcrypt";
import nodemailer from "nodemailer";
import Otp from "../models/otp.js";

export function postUser(req, res) {
  const user = req.body;
  const password = req.body.password;

  const passwordHash = bctypt.hashSync(password, 10);
  user.password = passwordHash;

  const newUser = new User(user);
  newUser
    .save()
    .then(() => {
      const otp = Math.floor(1000 + Math.random() * 9000);
      
      const newOtp = new Otp({
        email : user.email,
        otp : otp
      })
    
      newOtp.save().then(()=>{
        sendOtpEmail(user.email,otp);
        res.json({
          message: "User Created Successfully",
        });
      })
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

export function loginUser(req, res) {
  const credentials = req.body;

  User.findOne({ email: credentials.email })
    .then((user) => {
      if (user == null) {
        res.status(404).json({
          message: "User not found",
        });
      } else {
        bctypt
          .compare(credentials.password, user.password)
          .then((isMatch) => {
            if (isMatch) {
              const paylord = {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                type: user.type,
              };
              const token = jwt.sign(paylord, process.env.JWT_KEY, {
                expiresIn: "1h",
              });

              res.json({
                message: "User found",
                user: user,
                token: token,
              });
            } else {
              res.status(401).json({
                message: "Invalid password",
              });
            }
          })
          .catch(() => {
            res.status(500).json({
              message: "Errpr during password comparison",
            });
          });
      }
    })
    .catch(() => {
      res.status(500).json({
        message: "Error during user lookup",
      });
    });
}

export function getUser(req,res) {
  const user = req.body.user;
  if (user == null) {
    res.json({
      message : "User Not Found"
    })
  }else{
    res.json({
      message : " User Found",
      user : user
    })
  }
}

export function isAdminValid(req){
  if(req.body.user == null){
    return false;
  }
  if(req.body.user.type != "admin"){
    return false;
  }
  return true;
}

export function isCustomerValid(req){
  if(req.body.user == null){
    return false;
  }
  
  if(req.body.user.type != "customer"){
    return false;
  }
  return true;
}

export function sendOtpEmail(email,otp) {
  
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: 'smtp.gmail.com',
    port: 587,
    secure : false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const massege = {
    from : process.env.EMAIL,
    to : email,
    subject : "Validating OTP",
    text : "Your otp is" + otp,
  }

  transporter.sendMail(massege, (err, info) => {
    if(err){
      console.log(err);
    }else{
      console.log(info);
    }
  })
}

export function verifyUserEmail(req,res){
    
  const otp = req.body.otp;
  const email = req.body.email;

  Otp.find({email : email}).sort({date : -1}).then((otpList)=>{
    if(otpList.length == 0){
      res.json({
        message : "Otp is Invalid"
      })
    }else{
      const latesOtp = otpList[0];
      if(latesOtp.otp == otp){
        User.findOneAndUpdate({email : email},{emailVerified : true}).then(()=>{
          res.json({
            message : "User email verified success fully"
          })
        });
      }else{
        res.json({
          message : "Otp is invaid"
        })
      }
    }
  })
}

export function getAllUsers(req, res) {
  if (!isAdminValid(req)) {
    res.status(403).json({
      message: "Forbidden",
    });
    return;
  }

  const pageSize = parseInt(req.body.pageSize, 10) || 10; // Default page size: 10
  const pageNumber = parseInt(req.body.pageNumber, 10) || 1; // Default page number: 1

  const skip = (pageNumber - 1) * pageSize;

  User.find()
    .skip(skip) 
    .limit(pageSize) 
    .then((users) => {
      res.json({
        message: "Users Found",
        users: users,
        pageNumber: pageNumber,
        pageSize: pageSize,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "An error occurred while retrieving users",
        error: err.message,
      });
    });
}
