const User=require("../models/user");

module.exports={
    
    //GET DEFAULT
    index:async (req,res,next)=>{
        const users=await User.find({});
        res.status(200).json(users);
    },
    //POST
    newUser:async(req,res,next)=>{
        const newUser=new User(req.body);
        const user=await newUser.save();
        res.status(200).json(user);
    },
    //GET ONLY USER
    getUser:async(req,res,next)=>{
        const {userId}=req.params;
        const user=await User.findById(userId);
        res.status(200).json(user);
    },
    //PUT ONLY USER
    replaceUser:async(req,res,next)=>{
        const {userId}=req.params;
        const newUser=req.body;
        const oldUser=await User.findByIdAndUpdate(userId,newUser);
        res.status(200).json({success:true});
    },
    
    updateUser:async(req,res,next)=>{
        const {userId}=req.params;
        const newUser=req.body;
        const oldUser=User.findByIdAndUpdate(userId,newUser);
        res.status(200).json({success:true});
    },
    deleteUser:async(req,res,next)=>{
        const {userId}=req.params;
        await User.findByIdAndRemove(userId);
        res.status(200).json({success:true});
    }
}