const mongoose = require('mongoose');
const DB_URL = "mongodb://localhost:27017/nodeboke";
mongoose.connect(DB_URL);
mongoose.connection.on('connected', () => {
    console.log("Mongodb start success");
});

const models = {
    users: {
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
        }
    },
    articles: {
        title: {
            type: String,
            require: true
        },
        author: {
            type: String,
            default: "code巴神"
        },
        time:{
            type:Number,
            default:Date.now
        },
        body:{
            type:String,
            require:true
        },
        fmimg:{
            type:String,
            require:true
        },
        dtype:{
            type:String,
            require:true
        },
        sort:{
            type:Boolean,
            default:false
        },
        dianzan:{
            type:Number,
            default:0
        }
    }
};

for (let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]));
}

module.exports = {
    getModel: function (name) {
        return mongoose.model(name);
    }
};