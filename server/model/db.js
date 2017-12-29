const mongoose = require('mongoose');
const DB_URL = "mongodb://localhost:27017/nodeboke";
mongoose.connect(DB_URL);
mongoose.connection.on('connected', () => {
    console.log("Mongodb start success");
});

const models = {
   users:{
       name:{
           type:String,
           require: true
       },
       pwd:{
           type:String,
           require:true
       },
       time: {
           type: Number,
           default: Date.now
       },
       ip:{
           type:String
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