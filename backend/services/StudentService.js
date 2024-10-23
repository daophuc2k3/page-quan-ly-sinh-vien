
const StudentModel = require("../models/Student");

exports.getAllStudents = async (page, cap) => {
    return await StudentModel.find().sort({ _id: -1 }).skip(page * cap).limit(cap);
};
exports.getStudentCount = async () => {
    return await StudentModel.countDocuments();
};

exports.createStudent = async (student) => {
    return await StudentModel.create(student);
};

exports.getStudentById = async (id) => {
    return await StudentModel.findOne({ StudentID: id });
};

exports.updateStudent = async (id, student) => {
    return await StudentModel.findByIdAndUpdate(id, student);
};

exports.deleteStudent = async (id) => {
    return await StudentModel.findByIdAndDelete(id);
}