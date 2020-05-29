/* Connecting mongo */
const mongoose = require('mongoose');
const connectionString = "mongodb://localhost:27017/tracker";

mongoose.connect(connectionString, {

    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false

}).then(function () {
    console.log("MONGO CONNECTED");
}).catch(function (error) {
    console.log("MONGO NOT CONNECTED", error)
});

module.exports = {
    Account=require('./Account'),
    Transaction=require('./Transaction')
};
