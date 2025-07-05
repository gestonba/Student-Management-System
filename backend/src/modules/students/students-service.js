const { ApiError, sendAccountVerificationEmail } = require("../../utils");
const { findAllStudents, findStudentDetail, findStudentToSetStatus, addOrUpdateStudent } = require("./students-repository");
const { findUserById } = require("../../shared/repository");

const checkStudentId = async (id) => {
    const isStudentFound = await findUserById(id);
    if (!isStudentFound) {
        throw new ApiError(404, "Student not found");
    }
}

const getAllStudents = async (payload) => {
    const students = await findAllStudents(payload);
    if (students.length <= 0) {
        throw new ApiError(404, "Students not found");
    }

    return students;
}

const getStudentDetail = async (id) => {
    await checkStudentId(id);

    const student = await findStudentDetail(id);
    if (!student) {
        throw new ApiError(404, "Student not found");
    }

    return student;
}

const addNewStudent = async (payload) => {
    const ADD_STUDENT_AND_EMAIL_SEND_SUCCESS = "Student added and verification email sent successfully.";
    const ADD_STUDENT_AND_BUT_EMAIL_SEND_FAIL = "Student added, but failed to send verification email.";
    
    try {
        const result = await addOrUpdateStudent(payload);
        if (!result.status) {
            throw new ApiError(500, result.message || "Failed to add student");
        }

        try {
            await sendAccountVerificationEmail({ userId: result.userId, userEmail: payload.email });
            return { message: ADD_STUDENT_AND_EMAIL_SEND_SUCCESS };
        } catch (error) {
            return { message: ADD_STUDENT_AND_BUT_EMAIL_SEND_FAIL }
        }
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(500, "Unable to add student: " + (error.message || "Unknown error"));
    }
}

const updateStudent = async (payload) => {
    try {
        const result = await addOrUpdateStudent(payload);
        if (!result.status) {
            throw new ApiError(500, result.message || "Failed to update student");
        }

        return { message: result.message };
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(500, "Unable to update student: " + (error.message || "Unknown error"));
    }
}

const setStudentStatus = async ({ userId, reviewerId, status }) => {
    await checkStudentId(userId);

    const affectedRow = await findStudentToSetStatus({ userId, reviewerId, status });
    if (affectedRow <= 0) {
        throw new ApiError(500, "Unable to disable student");
    }

    return { message: "Student status changed successfully" };
}

const deleteStudent = async (id) => {
    await checkStudentId(id);
    
    try {
        const affectedRow = await findStudentToSetStatus({ 
            userId: id, 
            reviewerId: null, 
            status: false 
        });
        
        if (affectedRow <= 0) {
            throw new ApiError(500, "Unable to delete student");
        }

        return { message: "Student deleted successfully" };
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(500, "Unable to delete student: " + (error.message || "Unknown error"));
    }
}

module.exports = {
    getAllStudents,
    getStudentDetail,
    addNewStudent,
    setStudentStatus,
    updateStudent,
    deleteStudent,
};
