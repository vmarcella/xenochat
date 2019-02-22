const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Function for connecting to the database
const connect = async (mongoDBUrl) => {
    try {
        await mongoose.connect(mongoDBUrl || process.env.MONGODB_URL, { useNewUrlParser: true })
        mongoose.set('debug', true);

        // eslint-disable-next-line
        console.log('Successfully connected to the database')
        return mongoose.Connection;
    } catch (e) {
        // eslint-disable-next-line
        console.log('Successfully connected to the database')
        console.error(e);
    }
}


module.exports = {
    connect
}
