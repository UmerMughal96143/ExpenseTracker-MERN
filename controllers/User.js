const User = require("../modal/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');





exports.addUser = async (req, res, next) => {

    User.find({
        email : req.body.email ,

    }).exec().then(
        user => {
            if(user.length >=1){
                return res.status(409).json({
                    message : "User Exist "
                })
            }else {

                bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
                  if (err) {
                    return res.status(500).json({
                      error: err,
                    });
                  } else {
                    const {newEmail , newPassword} = req.body;
                    const user = new User({
                      _id: new mongoose.Types.ObjectId(),
                      email: req.body.newEmail,
                      password: hash,
                    });
                    user
                      .save()
                      .then((result) => {
                        console.log(result);
                        res.status(201).json({
                          message: "User Created",
                        });
                      })
                      .catch((err) => {
                        console.log(err);
                        res.status(500).json({
                          error: err,
                        });
                      });
                  }
                });
            }
        }
    )
 
      
    
  
};


exports.signUser = (req , res , next) => {

    User.find({
      email: req.body.newSignInEmail,
    })
      .exec()
      .then((user) => {
        if (user.length < 1) {
          return res.status(401).json({
            message: "Auth Failed  ",
          });
        }
        bcrypt.compare(
          req.body.newSignInPassword,
          user[0].password,
          (err, result) => {
            if (err) {
              return res.status(401).json({
                message: "Auth Failed  ",
              });
            }
            if (result) {
              const token = jwt.sign(
                {
                  email: user[0].email,
                  userId: user[0]._id,
                },
                process.env.JWT_KEY,
                {
                  expiresIn: "24h",
                }
              );
              console.log(token);

              return res.status(200).json({
                message: "Auth SuccessFull",
                token: token,
              });
            }
            return res.status(401).json({
              message: "Auth Failed  ",
            });
          }
        );
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });

}