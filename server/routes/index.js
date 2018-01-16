const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
// const model = require('./../model/db');

const Articles = require('./../model/db').Articles;
const Calcan = require('./../model/db').Calcan;
const Timexzs = require('./../model/db').Timexzs;
const Dtype = require('./../model/db').Dtype;
const Wzxx = require('./../model/db').Wzxx;
const Post = require('./../model/db').Post;

router.get('/css', (req, res) => {
    let post = new Post({name:'sunke1'});
    post.save((err,doc)=>{
        res.json({
            code:0,
            data:doc
        });
    });
});


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
    Articles.find(findtj, {__v: 0}, (err, doc) => {
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

// 手机api
router.get('/infoAritic2', (req, res) => {
    let id = req.query.id;
    const {dtype} = req.query;
    let findtj = {};
    if (id) {
        findtj['_id'] = id;
    }

    if (dtype) {
        findtj['dtype'] = dtype;
    }

    console.log(findtj);

    Articles.find(findtj).sort({time: '-1'}).limit(10).exec((err, doc) => {
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
    })
});

// 删除
router.post('/delArtics', (req, res) => {
    const ariticId = req.body.ariticId;
    Articles.remove({_id: ariticId}, (err, doc) => {
        if (err) {
            res.json({
                code: 1,
                msg: "删除失败" + err
            });
        } else {
            res.json({
                code: 0,
                msg: "success",
                data: doc
            });
        }

    })
});

// 修改
router.post('/updateAritic', (req, res) => {
    let {title, body, sort, fmimg, dtype, id} = req.body;
    console.log({id});
    Articles.update({_id: id}, {title, body, sort, fmimg, dtype}, (err, doc) => {
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

router.post('/addTimexz', (req, res) => {
    const {time, sj} = req.body;
    Timexzs.create({time, sj}, (err, doc) => {
        if (err) {
            res.json({code: 1, msg: '添加失败' + err, data: []});
        } else {
            res.json({code: 0, msg: "添加成功", data: doc});
        }
    });
});

router.get('/getTimexz', (req, res) => {
    Timexzs.find({}, (err, doc) => {
        if (err) {
            res.json({
                code: 1,
                msg: "系统失败"
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

router.post('/deltimexz', (req, res) => {
    const {id} = req.body;
    Timexzs.remove({_id: id}, (err, doc) => {
        if (err) {
            res.json({
                code: 1,
                msg: "系统错误"
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

router.post('/addcalcan', (req, res) => {
    const {calcanavatar, js, sort} = req.body;
    Calcan.create({imgurl: calcanavatar, js, sort}, (err, doc) => {
        if (err) {
            res.json({
                code: 1,
                msg: "系统错误"
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

router.get('/getCalcan', (req, res) => {
    const {id} = req.query;
    let serch = {};
    if (id) {
        serch = {
            _id: id
        };
    }
    Calcan.find(serch, (err, doc) => {
        if (err) {
            res.json({
                code: 1,
                msg: "系统失败"
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

router.post('/updatecalcan', (req, res) => {
    const {id, e} = req.body;
    Calcan.findByIdAndUpdate(id, {status: e}, (err, doc) => {
        if (err) {
            res.json({
                code: 1,
                msg: "系统错误",
                err_msg: err
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


router.post('/updatecalcanOther', (req, res) => {
    const {id, sort, js, imgurl} = req.body;
    Calcan.findByIdAndUpdate(id, {sort, js, imgurl}, (err, doc) => {
        if (err) {
            res.json({
                code: 1,
                msg: "系统错误",
                err_msg: err
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

router.post('/delcalcan', (req, res) => {
    const {id} = req.body;
    Calcan.remove({_id: id}, (err, doc) => {
        if (err) {
            res.json({
                code: 1,
                msg: "系统错误"
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

router.post('/addtypes', (req, res) => {
    const {name, sort, js} = req.body;
    Dtype.create({name, sort, js}, (err, doc) => {
        if (err) {
            res.json({
                code: 1,
                msg: "系统错误",
                err_msg: err
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

router.get('/getDtype', (req, res) => {
    Dtype.find({}, null, {sort: {'sort': -1}}, (err, doc) => {
        if (err) {
            res.json({
                code: 1,
                msg: "系统错误",
                err_msg: err
            });
        } else {
            res.json({
                code: 0,
                msg: "获取数据成功",
                data: doc
            });
        }
    });
});

router.post('/deldtype', (req, res) => {
    const {id} = req.body;
    Dtype.remove({_id: id}, (err, doc) => {
        if (err) {
            res.json({
                code: 1,
                msg: "err",
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

// 博主推荐
router.get('/tjlist', (req, res) => {
    const {dtype} = req.query;
    Articles.find({dtype, sort: true}, (err, doc) => {
        if (err) {
            res.json({
                code: 1,
                msg: "获取失败"
            });
        } else {
            res.json({
                code: 0,
                msg: 'success',
                data: doc
            });
        }
    })
});

// 添加修改网站信息
router.post('/wzxx', (req, res) => {
    const {id, qq, weixin, logo, wzbeiannum, wzname, showsk} = req.body;
    if (id === '') {  //表示新建无id的时候
        Wzxx.create({qq, weixin, logo, wzbeiannum, wzname, showsk}, (err, doc) => {
            if (err) {
                res.json({
                    code: 1,
                    msg: '添加失败'
                });
            } else {
                res.json({
                    code: 0,
                    msg: "success",
                    data: doc
                });
            }
        });
    } else {
        Wzxx.findByIdAndUpdate(id, {qq, weixin, logo, wzbeiannum, wzname, showsk}, (err, doc) => {
            if (err) {
                res.json({
                    code: 1,
                    msg: '修改'
                });
            } else {
                res.json({
                    code: 0,
                    msg: "success1",
                    data: doc
                });
            }
        });
    }
});

router.get('/getwzxx', (req, res) => {
    Wzxx.find({}, (err, doc) => {
        if (err) {
            res.json({
                code: 1,
                msg: "获取数据失败",
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


router.get('/infoAritic3', (req, res) => {
    let id = req.query.id;
    let findtj = {};
    if (id) {
        findtj['_id'] = id;
    }
    Articles.findOne(findtj, {__v: 0,commits:0}, (err, doc) => {
        if (err) {
            res.json({
                code: 1,
                msg: 'error',
                data: err
            });
        } else {
            Articles.find({dtype: doc.dtype}).limit(6).exec((err1, doc1) => {
                if (err1) {
                    res.json({
                        code: 1,
                        msg: 'error',
                        data: err1
                    });
                }else{
                    res.json({
                        code: 0,
                        msg: 'success',
                        data: doc,
                        xgdata:doc1
                    });
                }
            });
        }
    });
});

// 评论入库
router.post('/pjrk', (req, res) => {
    const {userids} = req.cookies;
    const {e, id} = req.body;
    Articles.update({_id: id}, {
        $addToSet: {
            commits: {
                commitsid: userids,
                commitscontext: e
            }
        }
    },(err,doc)=>{
        if (err) {
            res.json({
                code:1,
                msg:'失败',
                err_msg:err
            });
        }else{
            res.json({
                code: 0,
                msg: "添加成功",
                data: doc
            });
        }
    })
});

// 用来读取评论的
router.get('/getariticpj', (req, res) => {
    const {id} = req.query;
    // {
    //     path: 'fans',
    //         match: { age: { $gte: 21 }},
    //     // Explicitly exclude `_id`, see http://bit.ly/2aEfTdB
    //     select: 'name -_id',
    //         options: { limit: 5 }
    // }
    Articles.findOne({_id:id}).populate({path:'commits.commitsid',select:'-_id -__v -pwd'}).exec((err,doc)=>{
        res.json({
            code:0,
            data:doc.commits
        });
    })
});

router.get('/cs', (req, res) => {
  Articles.find({_id:'5a597f89464b020e48e2b316'}).populate({path:'commitname',select:'name'}).exec((err,doc)=>{
      res.json({
          data:doc
      });
  })
});

// dianzan

router.post('/dianzan',(req,res)=>{
    const {userids} = req.cookies;
    const {e} = req.body;
    Articles.find({$and: [{'dianzan.dianzanid': userids},{_id:e}]},(err,doc)=>{
        if (doc.length===0) {  // 没有 就添加
            Articles.update({_id:e},{$addToSet: {
                    dianzan: {
                        dianzanid: userids
                    }
                }},(err,doc)=>{
                if (err) {
                    res.json({
                        code:1,
                        msg:'失败',
                        err_msg:err
                    });
                }else{
                    res.json({
                        code: 0,
                        type:0,
                        msg: "点赞成功",
                        data: doc
                    });
                }
            })
        }else {  // 取消
            Articles.update({_id:e}, {$pull: {dianzan: {dianzanid: userids}}}, (err1, doc1) => {
                if (err1) {
                    return res.json({
                        code: 1,
                        msg: "系统错误",
                        data: err1
                    });
                } else {
                    return res.json({
                        code: 0,
                        type:-1,
                        msg: "取消成功",
                        data: doc1
                    });
                }
            })
        }
    })
});

// 获取时间轴
router.get('/gettimexz',(req,res)=>{
    Timexzs.find({},{_id:0,__v:0},(err,doc)=>{
        if (err) {
            res.json({
                code:1,
                msg:'系统获取失败',
                err_msg:err
            });
        }else {
            res.json({
                code:0,
                msg:'success',
                data:doc
            });
        }
    });
});


module.exports = router;
