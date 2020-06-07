/* Connecting mongo */
const mongoose = require('mongoose');
const connectionString = "mongodb+srv://xscullark:bluetee2@cluster1-qxtmc.mongodb.net/<dbname>?retryWrites=true&w=majority";

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
    Account: require('./Account'),
    Transaction: require('./Transaction'),
    User: require('./User'),
    Contributors: require('./Contributors')
};

