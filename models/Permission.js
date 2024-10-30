const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const permissionSchema = new Schema({
    name: String,
    description: String
});

module.exports = mongoose.model('Permission', permissionSchema);
