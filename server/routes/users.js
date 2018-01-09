const express = require('express');
const utility = require('utility');
const router = express.Router();
const model = require('./../model/db');
const Users = model.getModel('users');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',(req,res)=>{
    const {user, pwd} = req.body;
    Users.findOne({user,pwd:md5(pwd)},{__v:0,pwd:0},(err,doc)=>{
        if (doc) {
            res.cookie('userid',doc._id);
            res.json({
                code:0,
                msg:"登陆成功",
                data:doc
            });
        }else{
            res.json({
                code:1,
                msg:"账号或者密码错误",
                data:[]
            });
        }
    })
});

router.get('/info', (req, res) => {
    const {userid} = req.cookies;
    Users.findOne({_id: userid}, {__v: 0, pwd: 0}, (err, doc) => {
        if (doc) {
            return res.json({
                code: 0,
                msg: '获取用户数据成功',
                data: doc
            });
        } else {
            return res.json({
                code: 1,
                msg: '没找到用户相关数据'
            });
        }
    });
});

router.post('/updatepwd',(req,res)=>{
    const {userid} = req.cookies;
    const {oldpwd,newpwd} = req.body;

    Users.findOne({_id:userid},(err1,doc)=>{
        if (doc.pwd===md5(oldpwd)) {
            Users.findByIdAndUpdate(userid,{pwd:md5(newpwd)},(err2,doc)=>{
                if (doc) {
                    res.json({
                        code:0,
                        msg:"修改密码成功"
                    });
                }else{
                    res.json({
                        code:1,
                        msg:"修改密码失败"+err2
                    });
                }
            });
        }else{
            return res.json({
                code:1,
                msg:"原密码错误",
                data:[]
            });
        }
    });
});

router.post('/addxx',(req,res)=>{
    const {userid} = req.cookies;
    const {job, desc, name, sex, avatar} = req.body;
    Users.findByIdAndUpdate(userid,{job, desc, name, sex, avatar},(err,doc)=>{
        if (err) {
            res.json({
                code:1,
                msg:"系统错误",
                data:[],
                err_msg:err
            });
        }else{
            res.json({
                code:0,
                msg:"success",
                data:doc
            });
        }
    });
});

function md5(value) {
    const k = "397633183_@LoveLsL..*()j+s+--mmm";
    value = value + k;
    return utility.md5(utility.md5(value));
}

module.exports = router;