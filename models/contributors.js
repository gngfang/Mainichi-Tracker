const mongoose = require('mongoose');

const contributorsSchema = new mongoose.Schema({
name: { type: String, },
about:{ type: String,},
}, { timestamps: true });
const Contributors = mongoose.model('Contributors', contributorsSchema);
module.exports = Contributors;
 