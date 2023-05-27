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
    lastName: String
};

const Student = mongoose.model("student", studentSchema);

const student1 = new Student({
    studentId: "123",
    firstName: "suchith",
    lastName: "kumar"
});
const student2 = new Student({
    studentId: "123",
    firstName: "suchith",
    lastName: "kumar"
});

const defaultStudents = [student1, student2];
Student.insertMany(defaultStudents)
    .then(() => {
        console.log('Students saved successfully');
    })
    .catch((error) => {
        console.error(error);
    });

app.get("/register/student", function (req, res) {
    res.render("student");
});

app.post("/register/student", function (req, res) {
    const studentId = req.body.studentId;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    // Save the student to the database
    const student = new Student({
        studentId: studentId,
        firstName: firstName,
        lastName: lastName
    });

    student.save()
        .then(() => {
            console.log("Student inserted successfully");
            res.redirect("/register/student");
        })
        .catch((error) => {
            console.error("Error inserting student:", error);
            res.redirect("/register/student");
        });
});

app.listen(3000, function () {
    console.log("Server is running on http://localhost:3000");
});
