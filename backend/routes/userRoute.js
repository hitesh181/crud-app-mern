const express = require('express');
const mongoose = require("mongoose")
const User = require("../models/userModels")
const router = express.Router()

//create operation creation
router.post("/", async(req, res)=>{
    const {name, email,age} = req.body;
    try {
        const userAdded = await User.create({
          name: name,
          email: email,
          age: age,
        });
        res.status(201).json(userAdded);
      } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
      }
});
 
//get data from database
router.get("/",async (req, res) => {
    try{
    const showAll = await User.find();
    res.status(200).json(showAll)
    }
    catch(error){
        console.log(error)
        res.send(500).json({error: error.message});
    }
})

//get single user
router.get("/:id",async (req, res) => {
    const {id} = req.params;

    try{
    const singleUser = await User.findById({_id: id});
    res.status(200).json(singleUser)
    }
    catch(error){
        console.log(error)
        res.send(500).json({error: error.message});
    }
})


//delete Operation
router.delete("/:id",async (req, res)=>{
    const {id} = req.params;
    try{
        const singleUser = await User.findByIdAndDelete({_id:id});
        res.status(200).json(singleUser);

    }
    catch(error){
        console.log(error)
        res.status(500).json({error: error.message});
    }
})

//updatingg
    router.patch("/:id", async (req, res)=>{
        const {id} = req.params;
        const {name,email,age} = req.body;
        try{
            const upDateUser = await User.findByIdAndUpdate(id, req.body,{
                new:true
            });
            res.status(200).json(upDateUser);
        }
        catch(error){
            console.log(error)
            res.status(500).json({error: error.message})
        }

    })
module.exports = router;
