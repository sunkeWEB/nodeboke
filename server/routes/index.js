const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const model = require('./../model/db');
const Articles = model.getModel('articles');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.json({title: 'Express123'});
});

// 上传图片
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const date = new Date();
        const year = date.getFullYear();
        const mouth = date.getMonth() + 1;
        const day = date.getDay();
        fs.exists(`public/uploadimg`, function (e) {
            if (!e) {
                fs.mkdir(`public/uploadimg/`);
            }
        });
        cb(null, `public/uploadimg/`);
    },
    filename: function (req, file, cb) {
        const index1 = file.originalname.lastIndexOf(".");
        const index2 = file.originalname.length;
        const postf = file.originalname.substring(index1, index2);//后缀名
        const filename = file.originalname.substring(0, index1);
        cb(null, filename + Date.now() + postf);
    }
});
const upload = multer({storage: storage});
router.post('/upload', upload.array('logo', 2), function (req, res) {
    // console.log(req.files[0]);
    console.log(req);
    if (req.files[0].path) {
        res.json({
            code: 0,
            msg: '上传ok',
            path: req.files[0].filename
        });
    }
});

// 添加文章
router.post('/addArtice', (req, res) => {
    let {title, body, sort, fmimg, dtype} = req.body;
    console.log({title, body, sort, fmimg, dtype});
    Articles.create({title, body, sort, fmimg, dtype}, (err, doc) => {
        if (err) {
            res.json({
                code: 1,
                msg: 'error',
                data: err
            });
        } else {
            res.json({
                code: 0,
                msg: 'success',
                data: doc
            });
        }
    });
});

// 返回文章
router.get('/infoAritic', (req, res) => {
    let id = req.query.id;
    let findtj = {};
    if (id) {
        findtj['_id'] = id;
    }
    Articles.find(findtj, {__v:0},(err, doc) => {
        if (err) {
            res.json({
                code: 1,
                msg: 'error',
                data: err
            });
        }else{
            res.json({
                code: 0,
                msg: 'success',
                data: doc
            });
        }
    });
});

// 删除
router.post('/delArtics',(req,res)=>{
    const ariticId = req.body.ariticId;
    Articles.remove({_id:ariticId},(err,doc)=>{
        if (err) {
            res.json({
                code:1,
                msg:"删除失败"+err
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

// 修改
router.post('/updateAritic',(req,res)=>{
    let {title, body, sort, fmimg, dtype,id} = req.body;
    console.log({id});
    Articles.update({_id:id},{title, body, sort, fmimg, dtype}, (err, doc) => {
        if (err) {
            res.json({
                code: 1,
                msg: 'error',
                data: err
            });
        } else {
            res.json({
                code: 0,
                msg: 'success',
                data: doc
            });
        }
    });
});

module.exports = router;
