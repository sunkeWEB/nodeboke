const express = require('express');
const utility = require('utility');
const router = express.Router();

const Users = require('./../model/db').Users;
const Yonghu = require('./../model/db').Yonghu;
// const model = require('./../model/db');
// const Users = model.getModel('users');
// const Yonghu = model.getModel('yonghu');
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/login', (req, res) => {
    const {user, pwd} = req.body;
    Users.findOne({user, pwd: md5(pwd)}, {__v: 0, pwd: 0}, (err, doc) => {
        if (doc) {
            res.cookie('userid', doc._id);
            res.json({
                code: 0,
                msg: "登陆成功",
                data: doc
            });
        } else {
            res.json({
                code: 1,
                msg: "账号或者密码错误",
                data: []
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

router.post('/updatepwd', (req, res) => {
    const {userid} = req.cookies;
    const {oldpwd, newpwd} = req.body;

    Users.findOne({_id: userid}, (err1, doc) => {
        if (doc.pwd === md5(oldpwd)) {
            Users.findByIdAndUpdate(userid, {pwd: md5(newpwd)}, (err2, doc) => {
                if (doc) {
                    res.json({
                        code: 0,
                        msg: "修改密码成功"
                    });
                } else {
                    res.json({
                        code: 1,
                        msg: "修改密码失败" + err2
                    });
                }
            });
        } else {
            return res.json({
                code: 1,
                msg: "原密码错误",
                data: []
            });
        }
    });
});

router.post('/addxx', (req, res) => {
    const {userid} = req.cookies;
    const {job, desc, name, sex, avatar} = req.body;
    Users.findByIdAndUpdate(userid, {job, desc, name, sex, avatar}, (err, doc) => {
        if (err) {
            res.json({
                code: 1,
                msg: "系统错误",
                data: [],
                err_msg: err
            });
        } else {
            res.json({
                code: 0,
                msg: "success",
                data: doc
            });
        }
    });
});

router.get('/getroot', (req, res) => {  // 如果用户没有登录  获取博主的信息   如果登录显示登录的信息  /info
    Users.findOne({user: 'root'}, (err, doc) => {
        if (err) {
            res.json({
                code: 1,
                msg: '系统错误'
            });
        } else {
            res.json({
                code: 0,
                msg: "success",
                data: doc
            });
        }
    });
});

router.post('/adduser', (req, res) => {
    const {name, pwd, emailphone} = req.body;
    let obj = {};
    if (checkPhone(emailphone)) {
        let phone = emailphone;
        obj = {name, pwd: md5(pwd), phone};
    }else if (checkeMail(emailphone)) {
        let mail = emailphone;
        obj = {name, pwd: md5(pwd), mail};
    }
    Yonghu.count({name}, (err, num) => {
        if (err) {
            res.json({
                code: 1,
                msg: "系统失败",
                err_msg: err
            });
        } else {
            if (num > 0) {
                res.json({
                    code: 1,
                    msg: "该用户名已被注册"
                });
            } else {
                Yonghu.create(obj,(err1,doc1)=>{
                    if (err) {
                        res.json({
                            code: 1,
                            msg: "系统失败",
                            err_msg: err1
                        });
                    }else{
                        res.json({
                            code: 0,
                            msg: "success",
                            err_msg: doc1
                        });
                    }
                });
            }
        }
    });
});

router.post('/loginuser',(req,res)=>{
    const {name, pwd} = req.body;
    Yonghu.findOne({name,pwd:md5(pwd)},(err,doc)=>{
        if (err) {
            res.json({
                code:1,
                msg:'系统错误',
                err_msg:err
            });
        }else {
            if (doc) {
                res.cookie('userids', doc._id);
                res.json({
                    code:0,
                    msg:"success",
                    data:doc
                });
            }else{
                res.json({
                    code:1,
                    msg:'用户名密码或账号错误',
                    data:doc
                });
            }
        }
    });
});

router.get('/info1', (req, res) => {
    const {userids} = req.cookies;
    Yonghu.findOne({_id: userids}, {__v: 0, pwd: 0}, (err, doc) => {
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

router.post('/updateuser',(req,res)=>{
    const {userids} = req.cookies;
    const {useravatar, name} = req.body;
    Yonghu.findByIdAndUpdate(userids,{avatar:useravatar,name},(err,doc)=>{
        if (err) {
            res.json({
                code:1,
                msg:"系统错误",
                err_msg:err
            });
        }else{
            res.json({
                code:0,
                msg:"success",
                data:doc
            });
        }
    })
});

router.post('/updateuserpwd',(req,res)=>{
    const {userids} = req.cookies;
    const {oldpwd, newpwd} = req.body;
    Yonghu.findOne({_id: userids}, (err1, doc) => {
        if (doc.pwd === md5(oldpwd)) {
            Yonghu.findByIdAndUpdate(userids, {pwd: md5(newpwd)}, (err2, doc) => {
                if (doc) {
                    res.json({
                        code: 0,
                        msg: "修改密码成功"
                    });
                } else {
                    res.json({
                        code: 1,
                        msg: "修改密码失败" + err2
                    });
                }
            });
        } else {
            return res.json({
                code: 1,
                msg: "原密码错误",
                data: []
            });
        }
    });
});

function md5(value) {
    const k = "397633183_@LoveLsL..*()j+s+--mmm";
    value = value + k;
    return utility.md5(utility.md5(value));
}

function checkPhone(str) {
    const re = /^1\d{10}$/;
    if (re.test(str)) {
        return true;
    } else {
        return false;
    }
}

function checkeMail(str) {
    const re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    if (re.test(str)) {
        return true;
    } else {
        return false;
    }
}

module.exports = router;