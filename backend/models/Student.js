const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    StudentID: Number,
    Name: String,
    Roll: Number,
    Birthday: Date,
    Address: String
});

module.exports = mongoose.model("student", StudentSchema, "students");