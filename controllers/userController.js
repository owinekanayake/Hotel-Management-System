import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bctypt from "bcrypt";

export function postUser(req, res) {
  const user = req.body;
  const password = req.body.password;

  const passwordHash = bctypt.hashSync(password, 10);
  user.password = passwordHash;

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
