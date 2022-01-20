require('dotenv').config()
// console.log(process.env);
// require('.env')
const express = require('express')
// const fs = require('fs')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const userRouter = require('./routers/usersRouter')
const {logRequest} = require('./generalHelpers')
const { v4: uuidv4 } = require("uuid");
const { validateUser } = require("./userHelpers");
var jwt = require('jsonwebtoken');
const serverConfig = require('./serverConfig')
const { auth } = require('./middlewares/auth')
const User = require('./models/User')
const sign = require('jsonwebtoken/sign')
require('./mongoConnect')

app.use(bodyParser.json())

app.post("/users/login", async (req, res, next) => {
  try {
      const {username, password} = req.body
      const user = await User.findOne({ username })
      if(!user) return next({status:401, message:"username or passord is incorrect"})
      if(user.password !== password) next({status:401, message:"username or passord is incorrect"})
      const payload = {id:user.id }
      const token = jwt.sign(payload,serverConfig.secret,{expiresIn:"1h"})
      // console.log(token);
      return res.status(200).send({message:"Logged in Successfully",token}) 
    
  } catch (error) {
    next({status:500 , internalMessage:error.message})
  }
})
app.post("/users", async (req, res, next) => {
  try {
      const { username, age, password } = req.body;
      const user = new User({username, age, password})
      await user.save()
      res.send({ message: "sucess" });
  } catch (error) {
      next({ status: 422, message: error.message });
  }
});

app.patch("/users/:id", auth , async (req, res, next) => {
  if(req.user.id!==req.params.id) next({status:403, message:"Authorization error"})
  try {
    const {password, age} = req.body
    req.user.password = password
    req.user.age = age
    await req.user.save()
    res.send("sucess")
  } catch (error) {

  }

});

app.get('/users', async (req,res,next)=>{
 console.log(req.token);
  try {
    const getUser = req.query.age ?{age:req.query.age}: {}
   
    const users = await User.find(getUser,{username:1,age:1})
  res.send(users)
  } catch (error) {
  next({ status: 500, internalMessage: error.message });
  }

})
app.get('/users/:userId',auth, async (req,res,next)=>{
  try {
      if(req.user.id!==req.params.userId) next({status:403, message:"Authorization error"})
  const users = await User.find({})
  res.send(users)

  } catch (error) {
    next({ status: 500, internalMessage: error.message });

  }

})

app.delete('/users/:userId',auth ,async(req,res,next)=>{
  if(req.user.id!==req.params.userId) next({status:403, message:"Authorization error"})
  try {
    const user_id = req.params.userId
    const getUser = await User.find({_id:user_id})
    console.log(getUser);
    const del = await User.deleteOne({getUser})
    return res.send({message:"delete user done"})
  } catch (error) {
    next({ status: 404, internalMessage: error.message });

  }
})


app.use((err,req,res,next)=>{
  res.status(err.status).send(err.message)
})









  
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
/*
https://www.youtube.com/playlist?list=PLdRrBA8IaU3Xp_qy8X-1u-iqeLlDCmR8a
Fork the project 
git clone {url}
npm i


Create server with the following end points 
POST /users with uuid, unique username     ==> DONE
PATCH /users/id                            ==> DONE
GET /users with age filter                 ==> DONE
Create Error handler                       ==> DONE
POST /users/login /sucess 200 , error:403  ==> DONE
GET /users/id   200,   eror:404            ==> DONE
DELETE users/id  200,    error:404         ==> DONE
complete middleware for validating user    ==> DONE
Create Route For users                     ==> DONE

Bonus
Edit patch end point to handle the sent data only
If age is not sent return all users        ==> DONE


git add .
git commit -m "message"
git push
*/

