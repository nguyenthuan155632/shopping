'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

var userSchema = new Schema({
	email: String, 
	password: String, 
	admin: String,
	address: String,
	phone: String,
	birthday: Date, 
	sex: String,
	created_at: Date, 
	updated_at: Date
});

userSchema.pre('save', function(next) {
	var currentDate = new Date();
	this.created_at = currentDate;
	this.updated_at = currentDate;

	var user = this;
	// only hash the password if it has been modified (or is new)
	if (!user.isModified('password')) return next();
	// generate a salt
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
	// next();
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

// var User = mongoose.model('User', userSchema);

module.exports = mongoose.model('User', userSchema);