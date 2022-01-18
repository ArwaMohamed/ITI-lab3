const res = require('express/lib/response')
const fs = require('fs')


const logRequest = async(req,res,next)=>{
    try {
        const {username,password}=req.body
       const data = await fs.promises.readFile('./user.json',{encoding:'utf8'})
       const users =JSON.parse(data)
    //    console.log(username,users.username);

       users.map((user)=>{
        if(user.username===username && user.password === password) 
         return res.status(200).send({message:"Login sucess"})
        return res.status(403).send({message:"Try Again"})
      })
    } catch (error){
        next({status:403 , internalMessage:error.message})
      }
   
}

const getUserId = async(req,res,next)=>{
    try {
    const id =req.params.id
    const users = await fs.promises
    .readFile("./user.json",{encoding:'utf8'})
    .then((data) => JSON.parse(data));

    const filteredUsers = users.filter(user=>user.id===id)
    res.send(filteredUsers)
        next()
    } catch (error) {
        next({ status: 404, internalMessage: error.message });
        }
}
module.exports = {
    logRequest,
    getUserId
}