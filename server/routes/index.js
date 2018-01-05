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
        fs.exists(`uploadimg/${year}-${mouth}-${day}`, function (e) {
            if (!e) {
                fs.mkdir(`uploadimg/${year}-${mouth}-${day}`);
            }
        });
        cb(null, `uploadimg/${year}-${mouth}-${day}`);
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
    if (req.files[0].path) {
        res.json({
            code: 0,
            msg: '上传ok',
            path: req.files[0].path
        });
    }
});

// 添加文章
router.post('/addArtice', (req, res) => {
    let {title, body, sort, fmimg, dtype} = req.body;
    console.log(dtype);
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
    Articles.find({}, {__v:0},(err, doc) => {
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


module.exports = router;
