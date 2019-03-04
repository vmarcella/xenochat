const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Function for connecting to the database
const connect = async (mongoDBUrl) => {
    try {
        await mongoose.connect(process.env.MONGODB_URL || mongoDBUrl, { useNewUrlParser: true });
        mongoose.set('debug', true);

        // eslint-disable-next-line
        console.log('Successfully connected to the database')
    } catch (e) {
        // eslint-disable-next-line
        console.log('Successfully connected to the database')
        console.error(e);
    }

    return mongoose.Connection;
};

// Export the db connection
module.exports = {
    connect,
};
