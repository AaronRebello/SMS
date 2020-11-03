const express = require("express");
const router = express.Router();
const Student = require("../models/Students");

router.get('/admin/students', async (req,res)=>{
    await Student.find({}).then((student)=>{
    if(student.length > 0){
        res.status(200).json(student)
    }else{
        res.status(404).json({msg:"no resource found"})
    }
    })
})

router.post('/admin/students',(req,res)=>{
    console.log(res);
    const newStudent = Student({
        name:req.body.name,
        class:req.body.class,
        board:req.body.board,
        marks:req.body.marks,
        performance:req.body.performance,
        fees:req.body.fees,
    })
    newStudent
    .save().then((res)=>{
        res.status(200).json({msg:"successfully added"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({msg:"something went wrong"})
    })
});


router.put('/admin/student/:id',(req,res)=>{
    Student.findOneAndUpdate({_id:req.params.id},
        {
      $set: {
        name:req.body.name,
        class:req.body.class,
        board:req.body.board,
        marks:req.body.marks,
        performance:req.body.performance,
        fees:req.body.fees,
      }
    }).then((ress)=>{
        res.status(200).json(ress)
    })
    .catch((err)=>{console.log(err)})
})

router.get('admin/student/:id',(req,res)=>{
    Student.findOne({_id:req.params.id})
    .then((res)=>{
        res.status(200)
    })
    .catch((err)=>{
        console.log(err)
    })
})


router.post('/admin/student/delete/:id',(req,res)=>{
    Student.findOneAndDelete({_id:req.params.id})
    .then(()=>{
        res.status(200)
    })
    .catch((err)=>{
        console.log(err)
    })
})

module.exports = router;