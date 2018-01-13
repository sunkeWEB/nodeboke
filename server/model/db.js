const mongoose = require('mongoose');
const DB_URL = "mongodb://localhost:27017/nodeboke";
mongoose.connect(DB_URL);
mongoose.connection.on('connected', () => {
    console.log("Mongodb start success");
});

let Schema = mongoose.Schema;

let usersSchema = new Schema({
    user: {
        type: String,
        require: true
    },
    pwd: {
        type: String,
        require: true
    },
    time: {
        type: Number,
        default: Date.now
    },
    ip: {
        type: String
    },
    job: {
        type: String
    },
    name: {
        type: String,
        require: true
    },
    avatar: {
        type: String,
        require: true
    },
    desc: {
        type: String
    },
    sex: {
        type: String,
        require: true
    }
});
let Users = mongoose.model('users', usersSchema);

let articlesSchemas = new Schema({
    title: {
        type: String,
        require: true
    },
    author: {
        type: String,
        default: "code巴神"
    },
    time: {
        type: Number,
        default: Date.now
    },
    body: {
        type: String,
        require: true
    },
    fmimg: {
        type: String,
        require: true
    },
    dtype: {
        type: String,
        require: true
    },
    sort: {
        type: Boolean,
        default: false
    },
    dianzan: [{
        dianzanname: String
    }],
    commits: [{
        commitsttime: {
            type: Number,
            default: Date.now
        },
        commitscontext: {
            type: String,
            require: true
        },
        commitsid: {type: Schema.Types.ObjectId, ref: 'yonghu'},
    }]
});
let articles = mongoose.model('articles', articlesSchemas);

let dtypeSchemas = new Schema({
    name: {
        type: String,
        require: true
    },
    sort: {
        type: Number,
        default: 1
    },
    time: {
        type: Number,
        default: Date.now
    },
    js: {
        type: String
    },
    ip: {
        type: String,
    }
});
let dtype = mongoose.model('dtype', dtypeSchemas);

let yonghuSchemas = new Schema({
    name: {
        type: String,
        require: true
    },
    avatar:{
        type:String,
        default:'defaultavatar.png'
    },
    pwd: {
        type: String,
        require: true
    },
    createtime: {
        type: Number,
        default: Date.now
    },
    phone: {
        type: String
    },
    mail: {
        type: String
    },
    lastip: {
        type: String
    },
    lasttime: {
        type: Number
    }
});
let yonghu = mongoose.model('yonghu', yonghuSchemas);

let timeScheams = new Schema({
    time: {
        type: String,
        require: true
    },
    sj: {
        type: String,
        require: true
    },
    create: {
        type: Number,
        default: Date.now
    }
});
let timexz = mongoose.model('timexz', timeScheams);

let calcanScheams = new Schema({
    imgurl: {
        type: String,
        require: true
    },
    js: {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    },
    time: {
        type: Number,
        default: Date.now
    },
    sort: {
        type: Number,
        default: 1
    }
});
let calcan = mongoose.model('calcan', calcanScheams);

let wzxxScheams = new Schema({
    logo: String,
    weixin: String,
    qq: String,
    wzbeiannum: String,
    wzname: String,
    showsk: {
        type: Boolean,
        default: true
    }
});
let wzxx = mongoose.model('wzxx', wzxxScheams);

let postSchema = new Schema({
    name:String,
    author: {type: Schema.Types.ObjectId, ref: 'yonghu'},
});
let Post = mongoose.model('post', postSchema);

exports.Users = Users;
exports.Dtype = dtype;
exports.Articles = articles;
exports.Yonghu = yonghu;
exports.Calcan = calcan;
exports.Timexzs = timexz;
exports.Wzxx = wzxx;
exports.Post = Post;
// const models = {
//     users: {
//     user: {
//         type: String,
//             require: true
//     },
//     pwd: {
//         type: String,
//             require: true
//     },
//     time: {
//         type: Number,
//     default: Date.now
//     },
//     ip: {
//         type: String
//     },
//     job: {
//         type: String
//     },
//     name: {
//         type: String,
//             require: true
//     },
//     avatar: {
//         type: String,
//             require: true
//     },
//     desc: {
//         type: String
//     },
//     sex: {
//         type: String,
//             require: true
//     }
// },
//     timexz: {
//         time: {
//             type: String,
//             require: true
//         },
//         sj: {
//             type: String,
//             require: true
//         },
//         create: {
//             type: Number,
//             default: Date.now
//         }
//     },
//     articles: {
//         title: {
//             type: String,
//             require: true
//         },
//         author: {
//             type: String,
//             default: "code巴神"
//         },
//         time: {
//             type: Number,
//             default: Date.now
//         },
//         body: {
//             type: String,
//             require: true
//         },
//         fmimg: {
//             type: String,
//             require: true
//         },
//         dtype: {
//             type: String,
//             require: true
//         },
//         sort: {
//             type: Boolean,
//             default: false
//         },
//         dianzan: [{
//             dianzanname: String
//         }],
//         commits: [{
//             commitsid: {
//                 type: String
//             },
//             commitsttime: {
//                 type: Number,
//                 default: Date.now
//             },
//             commitscontext: {
//                 type: String,
//                 require: true
//             },
//             commitname: {type: Schema.Types.ObjectId, ref: 'yonghu'},
//             commitavatar: {type: Schema.Types.ObjectId, ref: 'yonghu'}
//         }]
//     },
//     calcan: {
//         imgurl: {
//             type: String,
//             require: true
//         },
//         js: {
//             type: String
//         },
//         status: {
//             type: Boolean,
//             default: true
//         },
//         time: {
//             type: Number,
//             default: Date.now
//         },
//         sort: {
//             type: Number,
//             default: 1
//         }
//     },
//     dtype: {
//         name: {
//             type: String,
//             require: true
//         },
//         sort: {
//             type: Number,
//             default: 1
//         },
//         time: {
//             type: Number,
//             default: Date.now
//         },
//         js: {
//             type: String
//         },
//         ip: {
//             type: String,
//         }
//     },
//     wzxx: {
//         logo: String,
//         weixin: String,
//         qq: String,
//         wzbeiannum: String,
//         wzname: String,
//         showsk: {
//             type: Boolean,
//             default: true
//         }
//     },
//     yonghu: {
//         name: {
//             type: String,
//             require: true
//         },
//         pwd: {
//             type: String,
//             require: true
//         },
//         createtime: {
//             type: Number,
//             default: Date.now
//         },
//         phone: {
//             type: String
//         },
//         mail: {
//             type: String
//         },
//         lastip: {
//             type: String
//         },
//         lasttime: {
//             type: Number
//         }
//     }
// };
//
// for (let m in models) {
//     mongoose.model(m, new mongoose.Schema(models[m]));
// }
//
// module.exports = {
//     getModel: function (name) {
//         return mongoose.model(name);
//     }
// };