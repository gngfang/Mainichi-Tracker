const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    transactionType: { type: String, required: true },
    transactionAmount: { type: Number, require: true },
    transactionDescription: { type: String },
    date: { type: Date },
    accounts: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account"
    }
    /* Will add account later */
}, { timestamps: true });


const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;