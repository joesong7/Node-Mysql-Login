

const jwt = require('jsonwebtoken');



emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
module.exports = {
  validateRegistetr: (req, res, next) => {
    if (!req.body.username || req.body.username.length < 3) {
      return res.status(400).send({
        message: "名字請輸入三個字以上"
      });
    }
    if (!req.body.email || req.body.email.search(emailRule) == -1) {
      return res.status(400).send({
        message: "信箱格式錯誤"
      });
    }

    if (!req.body.password || req.body.password.length < 6) {
      return res.status(400).send({
        message: "密碼請輸入6位數以上"
      });
    }
    if (!req.body.password_repeat || req.body.password != req.body.password_repeat) {
      return res.status(400).send({
        message: "第二次密碼輸入不對"
      });
    }
    next();
  },
  isLoggedin: (req,res,next) => {
         if(!req.headers.authorization){
          throw err;
          return res.status(400).send({
             message:"你的驗證錯誤"
          })
         }
         try{
            const token =req.headers.authorization.split(' ')[1];;
            const decoded =jwt.verify(token ,'SECRETKEY');
            req.userDate =decoded;
            next();
         }catch(err){
             throw err;
             return res.status(400).send({
                message:"你的驗證錯誤"
             })
         }
   }

}