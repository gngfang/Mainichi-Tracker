const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    accountNumber: { type: String, required: true, unique: true },
    accountType: { type: String, require: true },
    institution: { type: String },
    startingBalance: { type: Number, require: true },
    description: { type: String },
    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction"
    }]
    /* Will add transaction later */
});


const Account = mongoose.model('Account', accountSchema);
module.exports = Account;