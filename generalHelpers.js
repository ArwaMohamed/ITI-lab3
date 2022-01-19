const res = require('express/lib/response')
const fs = require('fs')


const logRequest = async(req,res,next)=>{
    try {
        const {username,password}=req.body
       const data = await fs.promises.readFile('./user.json',{encoding:'utf8'})
       const users =JSON.parse(data)
    //    console.log(username,users.username);

    const user = users.find(ele=>ele.username===username)
    return (user.password == password) ? res.send("Login sucess") : res.status(401).send("invalid creds")
    } catch (error){
        next({status:500 , internalMessage:error.message})
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
        next({ status: 500, internalMessage: error.message });
        }
}
module.exports = {
    logRequest,
    getUserId
}