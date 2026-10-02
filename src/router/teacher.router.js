
const express = require('express');

const teacherController = require('../controller/teacher.controller');
const upload = require('../utils/multer');

const Router = express.Router();


// TEACHER LIST
Router.get(
    '/teacher',
    teacherController.getTeachers
);


// CREATE PAGE
Router.get(
    '/teacher/create',
    teacherController.createTecher
);


// STORE TEACHER
Router.post(
    '/teacher/store',
    upload.single('image'),
    teacherController.storeTeacher
);


// VIEW TEACHER
Router.get(
    '/teacher/view/:id',
    teacherController.viewTeacher
);


// EDIT PAGE
Router.get(
    '/teacher/edit/:id',
    teacherController.editTeacher
);


// UPDATE TEACHER
Router.post(
    '/teacher/update/:id',
    upload.single('image'),
    teacherController.updateTeacher
);


// DELETE
Router.get(
    '/teacher/delete/:id',
    teacherController.deleteTeacher
);


// RECYCLE BIN
Router.get(
    '/teacher/recycle-bin',
    teacherController.recycleBin
);


module.exports = Router;

