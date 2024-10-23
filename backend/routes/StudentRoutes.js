const express = require("express");
const {
    getAllStudents,
    createStudent,
    getStudentById,
    updateStudent,
    deleteStudent,
} = require("../controllers/StudentController");

const router = express.Router();

router.route("/").get(getAllStudents).post(createStudent);
router.route("/:id").put(updateStudent).delete(deleteStudent);
router.route("/single/").get(getStudentById);

module.exports = router;