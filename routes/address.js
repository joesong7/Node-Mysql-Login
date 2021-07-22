const express = require('express');
const router = express.Router();
const db = require("../sql/connect");

router.get("/address/:id", (req, res, next) => {
     
    db.query("SELECT * FROM `address` WHERE u_id =?",[req.params.id],(err,result)=>{
      if(err){
        throw err;
        return res.status(400).send({
          message: err,
        })
      }
      if (!result.length) {
        return res.status(400).send({
          message: "查無id",
        })
      }
      return res.status(200).json(
        result
     );
   })
 
});
router.post("/address", (req, res, next) => {
     
  db.query("INSERT INTO `address` SET u_id=?,name=?,phone=? ",[req.body.id,req.body.name,req.body.phone],(err,result)=>{
    if(err){
      throw err;
      return res.status(400).send({
        message: err,
      })
    }
    return res.status(200).send({
      message: "新增成功",
    })
 })

});
router.delete("/address/delete/:id", (req, res, next) => {
     
  db.query("DELETE FROM `address` WHERE id =? ",[req.params.id],(err,result)=>{
    if(err){
      throw err;
      return res.status(400).send({
        message: err,
      })
    }
    return res.status(200).send({
      message: "刪除成功",
    })
 })

});




module.exports = router;  