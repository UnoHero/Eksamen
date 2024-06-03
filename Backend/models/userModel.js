const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require("validator");

const PASSWORDLENGTH = 8;

const cartSchema = mongoose.Schema({
    itemID: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
}, { timestamps: true });

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    admin: {
        type: Boolean,
        required: true,
        default: false
    },
    password: {
        type: String,
        required: true,
        minlength: [PASSWORDLENGTH, `Passwords must have at least ${PASSWORDLENGTH} characters`]
    },
    cart: [cartSchema]
});

// Pre-save hook to hash the password
async function hashPassword(next) {
    const user = this;
    if (!user.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
}
userSchema.pre('save', hashPassword);

// Static method for user signup
userSchema.statics.signup = async function(userName, password, passwordCheck) {
    if (!userName || !password) {
        throw Error("All fields must be filled");
    }

    if (password !== passwordCheck) {
        throw Error("Passwords do not match");
    }

    // Validate password strength
    // if (!validator.isStrongPassword(password)) {
    //     throw Error("Password not strong enough");
    // }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ userName, password: hash });

    return user;
};

// Static method for user login
userSchema.statics.login = async function(userName, password) {
    if (!userName || !password) {
        throw Error("All fields must be filled");
    }

    const user = await this.findOne({ userName });
    if (!user) {
        throw Error("Incorrect Username");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw Error("Incorrect Password");
    }

    return user;
};

module.exports = mongoose.model("User", userSchema);
