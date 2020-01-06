const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@cluster0-68dmg.mongodb.net/test?retryWrites=true&w=majority')

module.exports = mongoose.connection;