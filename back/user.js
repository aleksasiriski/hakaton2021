var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    role: String,
    createdAt: Date,
    updatedAt: Date
}, { collection: "users" });

userSchema.pre("save", function (next) {
    var currentDate = new Date();
    this.updatedAt = currentDate;
    if (!this.createdAt)
        this.createdAt = currentDate;
    next();
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("user", userSchema);