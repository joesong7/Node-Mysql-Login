const express = require('express');
const router = express.Router();
const userMiddleware = require("../middleware/users");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require("../sql/connect");

/* GET home page. */


router.post("/sign-up", userMiddleware.validateRegistetr, (req, res, next) => {
  db.query('SELECT * FROM `users` WHERE email =?', [req.body.email], (err, result) => {
    if (result && result.length) { //error
      return res.send({ message: "帳號已經有了" })
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {

          return res.status(500).send({
            message: err
          })
        } else {
          db.query('INSERT INTO `users` SET email=?,username=?,password=? ,registered=?', [req.body.email, req.body.username, hash, Date.now()], (err, result) => {
            if (err) {
              throw err;
              return res.status(400).send({
                message: err
              });
            }
            return res.status(201).send({
              message: "Registered!",
            })
          })
        }
      })

    }
  })
});

router.post("/login", (req, res, next) => {
  db.query('SELECT * FROM `users` WHERE email =?', [req.body.email],
    (err, result) => {
      if (err) {
        throw err;
        return res.status(400).send({
          message: err,
        })
      }
      if (!result.length) {
        return res.status(400).send({
          message: "帳號或密碼錯誤",
        })
      }
      bcrypt.compare(req.body.password, result[0]["password"], (bErr, bResult) => {
        if (!bResult) {
          
          return res.status(400).send({
            message: "帳號或密碼錯誤",
          })
        }
        if (bResult) {
          const token = jwt.sign({

            email: result[0].email,
            username: result[0].username,
            id: result[0].id
          }, "SECRETKEY", { expiresIn: "7d" });
          db.query(
            'UPDATE users SET last_login =now() WHERE id = ?',[result[0].id]
          )
          return res.status(200).send({
            message: "登入成功",
            token,
           
          })
        }
      })
    })



});
router.get("/secret-route",userMiddleware.isLoggedin, (req, res, next) => {
   
  console.log(req.userDate);
  res.send(req.userDate);

});
module.exports = router;
