const Teacher = require("../model/teacher.model");
const cloudinary = require("../config/cloudinary");
const { Readable } = require("stream");
const { resolve } = require("dns");

// Upload image buffer to cloudinary

const uploadCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({
            folder: "teacher-management"
        },
            (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            }
        );
        Readable.from(fileBuffer).pipe(stream);
    });
};

class teacherController {

    // Teacher List
    async getTeachers(req, res) {
        try {
            const teachers = await Teacher.find({
                is_deleted: false
            });

            return res.render("crud/list", {
                title: "Teacher Listing Page",
                teachers: teachers
            });

        } catch (error) {
            console.log(error);
            return res.redirect("/teacher");
        }
    }



    // RECYCLE BIN

    async recycleBin(req, res) {
        try {

            const teachers = await Teacher.find({
                is_deleted: true
            });

            return res.render("crud/list", {
                title: "Recycle Bin",
                teachers: teachers
            });

        } catch (error) {
            console.log(error);
            return res.redirect("/teacher");
        }
    }



    // CREATE PAGE
    async createTecher(req, res) {
        return res.render("crud/add", {
            title: "Teach Create Page"
        });
    }


    // STORE TEACHER
    async storeTeacher(req, res) {
        try {

            const { Name, Email, Phone, Address, Salary, Experience, Subject, Department, Gender, Status } = req.body;

            let imageUrl;
            if (req.file) {
                const result = await uploadCloudinary(req.file.buffer);
                imageUrl = result.secure_url;
            }

            const teacher = new Teacher({
                Name, Email, Phone, Address, Salary, Experience, Subject, Department, Gender, Status,
                image: imageUrl,
                is_deleted: false
            });

            await teacher.save();

            return res.redirect("/teacher");

        } catch (error) {

            console.log(error);
            return res.redirect("/teacher/create");

        }
    }



    // VIEW TEACHER

    async viewTeacher(req, res) {
        try {
            const id = req.params.id;

            if (!id) {
                return res.redirect("/teacher");
            }

            const teacher = await Teacher.findOne({
                _id: id,
                is_deleted: false
            });

            if (!teacher) {
                return res.redirect("/teacher");
            }

            return res.render("crud/view", {
                title: "Teacher View Page",
                teacher: teacher
            });

        } catch (error) {
            console.log(error);
            return res.redirect("/teacher");
        }
    }


    // EDIT PAGE
    async editTeacher(req, res) {
        try {
            const id = req.params.id;

            if (!id) {
                return res.redirect("/teacher");
            }

            const teacher = await Teacher.findOne({
                _id: id,
                is_deleted: false
            });

            if (!teacher) {
                return res.redirect("/teacher");
            }

            return res.render("crud/edit", {
                title: "Teacher Edit Page",
                teacher: teacher
            });

        } catch (error) {
            console.log(error);
            return res.redirect("/teacher");
        }
    }


    // UPDATE TEACHER 

    async updateTeacher(req, res) {
        try {

            const id = req.params.id;

            if (!id) {
                return res.redirect("/teacher");
            }

            const {
                Name,
                Email,
                Phone,
                Address,
                Salary,
                Experience,
                Subject,
                Department,
                Gender,
                Status
            } = req.body;

            const updateData = {
                Name,
                Email,
                Phone,
                Address,
                Salary,
                Experience,
                Subject,
                Department,
                Gender,
                Status
            };

            if (req.file) {
                const result = await uploadCloudinary(req.file.buffer);
                updateData.image = result.secure_url;
            }

            const teacher = await Teacher.findOneAndUpdate(
                {
                    _id: id,
                    is_deleted: false
                },
                updateData,
                {
                    new: true
                }
            );

            if (!teacher) {
                return res.redirect("/teacher");
            }

            return res.redirect("/teacher");

        } catch (error) {

            console.log(error);
            return res.redirect("/teacher");

        }
    }

    // SOFT DELETE 
    async deleteTeacher(req, res) {
        try {
            const id = req.params.id;

            if (!id) {
                return res.redirect("/teacher");
            }

            await Teacher.findOneAndUpdate({
                _id: id,
                is_deleted: false
            },

                {
                    is_deleted: true
                },

                {
                    new: true
                }
            );

            return res.redirect("/teacher");

        } catch (error) {

            console.log(error);
            return res.redirect("/teacher");


        }
    }

}

module.exports = new teacherController();