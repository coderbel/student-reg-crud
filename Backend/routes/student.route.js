
let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();
  
// Student Model
let studentSchema = require("../models/Student");
  
// CREATE Student
router.post("/create-student", async (req, res, next) => {
  const student = new studentSchema(req.body);
  const studentRes = await student.save();
  res.send(studentRes);
});
  
// READ Students
router.get("/", async (req, res) => {
  try {
    const studentRes = await studentSchema.find({});
    res.send(studentRes);
  } catch(err) {
    console.log('get all ERROR ' + err);
  }
  
});
  
// UPDATE student
router
  .route("/update-student/:id")
  // Get Single Student
  .get((req, res) => {
    studentSchema.findById(
        req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    });
  })
  
  // Update Student Data
  .put((req, res, next) => {
    studentSchema.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      (error, data) => {
        if (error) {
          return next(error);
          console.log(error);
        } else {
          res.json(data);
          console.log("Student updated successfully !");
        }
      }
    );
  });
  
// Delete Student
router.delete("/delete-student/:id", 
(req, res, next) => {
  studentSchema.findByIdAndRemove(
      req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});
  
module.exports = router;