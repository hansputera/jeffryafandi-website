const mongoose = require('mongoose');
const config = require("../config.json");

mongoose.connect(config.mongouri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

module.exports = mongoose.connection;