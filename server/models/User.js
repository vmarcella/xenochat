const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

// Create the user schema
// timestamps will keep track of the updated and created at tags
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        select: false,
    },
},
{
    timestamps: true,
});

// handle when the user has updated their password
userSchema.pre('save', function (next) {
    const user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (error, hash) => {
                if (err) next(err);

                user.password = hash;
                return next();
            });
        });
    }
});

// Create a function which will allow us to securely compare passwords
// of users that are stored within the database
userSchema.methods.comparePassword = function (password, done) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        done(err, isMatch);
    });
};

module.exports = mongoose.model('User', userSchema);
