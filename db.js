const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/perfume_shop';

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to MongoDB Server');
});

db.on('error', () => {
    console.log('MongoDB connection error : ', err);
});

db.on('disconnected', () => {
    console.log('MongoDB server disconnected');
})

module.exports = db;