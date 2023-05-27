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

app.get("/register/student", function (req, res) {
    res.render("student");
});

app.get("/register/course", function (req, res) {
    res.render("student");
});

app.post("/register/student", function (req, res) {
    const studentId = req.body.studentId;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

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
        })
        .catch((error) => {
            console.error(error);
        });

});

app.listen(3000, function () {
    console.log("Server is running on http://localhost:3000");
});
