const User = require('../model/userModel')



const sample = async (req,res)=>{
    try {
        res.status(200).json({message:'in smaple funcion'})
    } catch (error) {
        
    }
}


const signup = async (req,res)=>{
    try {
console.log('jdijfd');
        const checkExist =await User.findOne({email:req.body.email})
        if(checkExist){
            res.status(409)
            res.json({status:false,error:'User is already exist'})
        }else{
            const data = new User({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password,
                is_Admin:false
               })
        
               const userData = await data.save()
               res.json({userData,status:true})
               res.status(200)
        }

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const login = async (req,res)=>{
    try {

     const userData = await User.findOne({email:req.body.email})

     if(userData){
        if(userData.password === req.body.password){
            res.json({userData,status:true})
        }else{
            res.json({status:false,error:"Incorrect password"})
        }
     }else{
        res.json({status:false,error:"Eamil not found"})
     }
      
    } catch (error) {
        console.log(error.message);
    }
}



module.exports={
sample,
signup,
login
}