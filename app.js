const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/hackoverflowDB");

const studentSchema = {
    studentId: String,
    firstName: String,
    lastName: String,
    email: String,
    userName: String,
    password: String,
    address: String,
    address2: String,
    city: String,
    state: String,
    zip: String
};

const Student = mongoose.model("student", studentSchema);

const courseSchema = {
    studentname: String,
    coursename: String,
    email: String,
    phone: Number
};

const Course = mongoose.model("course", courseSchema);

const adminSchema = {
    adminId:String,
    password:String
};

const Admin= mongoose.model("admin", adminSchema);

app.get("/register/student", function (req, res) {
    res.render("student");
});

app.get("/register/course", function (req, res) {
    res.render("course");
});

app.get("/login/:type", function (req, res) {
    res.render("login", { type:req.params.type });
})

app.post("/register/student", function (req, res) {
    const student = new Student({
        studentId: req.body.studentId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        userName: req.body.userName,
        password: req.body.password,
        address: req.body.address,
        address2: req.body.address2,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip
    });

    Student.insertMany(student)
        .then(() => {
            console.log('Students saved successfully');
            res.redirect("/login/student");
        })
        .catch((error) => {
            console.error(error);
        });

});

app.post("/register/course", function (req, res) {
    var studentname = req.body.studentname;
    var coursename = req.body.coursename;
    var email = req.body.email;
    var phone = req.body.phone;
    const course = new Course({
        studentname: studentname,
        coursename: coursename,
        email: email,
        phone: phone
    });
    Course.insertMany(course)
        .then(() => {
            res.redirect("/register/student")
        })
        .catch((error) => {
            console.error(error);
        });
});

app.post("/login/student", function (req, res) {
    const userName = req.body.userName;
    const password = req.body.password;
    Student.findOne({ userName: userName, password: password })
        .then(user => {
            if (user) {
                console.log("found");
            } else {
                console.log(" not found");
            }
        })
        .catch(error => {
            console.log(error);
        });
});

app.post("/login/admin", function (req, res) {
    const adminId = req.body.userName;
    const password = req.body.password;
    console.log(adminId,password);
    Admin.findOne({ adminId:adminId, password: password })
        .then(admin => {
            if (admin) {
                console.log("found");
            } else {
                console.log(" not found");
            }
        })
        .catch(error => {
            console.log(error);
        });
});

app.listen(3000, function () {
    console.log("Server is running on http://localhost:3000");
});
