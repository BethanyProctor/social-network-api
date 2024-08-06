const mongoose = require('mongoose')

mongoose.connect(process.env.MONGOURI || 'mongodb://localhost:27017/socialnetwork')
module.exports = mongoose.connection;