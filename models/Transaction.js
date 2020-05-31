const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    transactionType: { type: String, required: true },
    transactionAmount: { type: Number, require: true },
    transactionDescription: { type: String },
    date: { type: String }
    /* accounts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account"
    }] */
    /* Will add account later */
});



const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;