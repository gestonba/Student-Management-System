const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent } = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    const filters = req.query;
    const students = await getAllStudents(filters);
    res.json({ students }); // Frontend expects an object with a students key
});

const handleAddStudent = asyncHandler(async (req, res) => {
    const payload = req.body;
    const result = await addNewStudent(payload);
    res.json(result);
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    const studentId = req.params.id;
    const payload = { ...req.body, userId: Number(studentId) };
    const result = await updateStudent(payload);
    res.json(result);
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const studentId = Number(req.params.id);
    const student = await getStudentDetail(studentId);
    res.json(student);

});

const handleStudentStatus = asyncHandler(async (req, res) => {
    const userId = Number(req.params.id);
    const { status } = req.body;
    const reviewerId = req.user?.id || null;
    const result = await setStudentStatus({ userId, reviewerId, status });
    res.status(200).json({ success: true, message: result.message });
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
};
