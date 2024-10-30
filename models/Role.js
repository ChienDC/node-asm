const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    permissions: [{ type: String }]
});

module.exports = mongoose.models.Role || mongoose.model('Role', roleSchema);
