// const express = require("express");
// const bodyParser = require("body-parser");
// const ejs = require("ejs");
// const mongoose = require('mongoose');

// const app = express();
// const connectDB = require('./db');

// const controller= require('./controller')
// app.set('view engine', 'ejs');

// app.use(bodyParser.urlencoded({
//   extended: true
// }));
// app.use(express.static("public"));

// app.get("/",function(req,res){
//     res.render("course");
// })

// app.post("/",function(req,res){
//   var studentname=req.body.studentname;
//   var coursename=req.body.coursename;
//   var email=req.body.email;
//   var phone=req.body.phone;
//   console.log(studentname+" "+phone);
// });

// //connect to database
// connectDB();
// // app.get("/registratio")

// app.listen(3000, function() {
//   console.log("http://localhost:3000");
// });

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const sendmail=require("./mailsending.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/CourseReg");

const courseSchema = {
    studentname: String,
    coursename: String,
    email: String,
    phone:Number
};

const Course = mongoose.model("course", courseSchema);

//student registartion
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
// const defaultcourses = [course1, course2];


app.get("/register/course", function (req, res) {
    res.render("course");
    // Course.find({})
    // .then((foundCourses)=>{
    //   console.log(foundCourses);
    // })
    // .catch((error)=>{
    //   console.log(error);
    // })
});
app.get("/register/student", function (req, res) {
  res.render("student");
});
app.get("/dashboard", function (req, res) {
  Course.find({})
//   .then((foundCourses)=>{
//     res.render("dashboard",{studentname:foundCourses[0].studentname,
//     coursename:foundCourses[1].coursename,
//   email:foundCourses[2].email,
// phone:foundCourses[3].phone});
//     console.log(foundCourses);
  .then((foundCourses)=>{
    res.render("dashboard",{foundCourses});
  })
  .catch((error)=>{
    console.log(error);
  })
});

app.post("/register/course", function (req, res) {


  var studentname=req.body.studentname;
  var coursename=req.body.coursename;
  var email=req.body.email;
  var phone=req.body.phone;
    // const stu = new Student({
    //     studentname: student,
    //     firstName: firstName,
    //     lastName: lastName
    // });
    const course1 = new Course({
      studentname: studentname,
      coursename: coursename,
      email: email,
      phone:phone
  });
  Course.insertMany(course1)
    .then(() => {
        sendmail(email);
        // window.alert('Details saved successfully');
        res.redirect("/register/student")
    })
    .catch((error) => {
        console.error(error);
    });
});

//student
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