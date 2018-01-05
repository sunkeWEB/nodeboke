const  multer=require('multer');
const storage = multer.diskStorage({
    //设置上传后文件路径，uploads文件夹会自动创建。
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        const fileFormat = (file.originalname).split(".");
        cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});
//添加配置文件到multer对象。
const upload = multer({
    storage: storage
});

//如需其他设置，请参考multer的limits,使用方法如下。
//const upload = multer({
//    storage: storage,
//    limits:{}
// });

//导出对象
module.exports = upload;