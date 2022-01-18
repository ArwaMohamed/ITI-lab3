const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const userRouter = require('./routers/usersRouter')
// const {validateUser}= require('./userHelpers')
// const {logRequest,getUserId} = require('./generalHelpers')
// const { v4: uuidv4 } = require("uuid");

app.use(bodyParser.json())

app.use('/users',userRouter)

//Error handler
app.use((err,req,res,next)=>{
  if(err.status >= 500)
    return res.status(500).send({error:"internal server erorr"})
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

/* 
//POST 
app.post("/users", validateUser, async (req, res, next) => {
  try {
      const { username, age, password } = req.body;
      const data = await fs.promises
          .readFile("./user.json", { encoding: "utf8" })
          .then((data) => JSON.parse(data));
      const id = uuidv4();
      data.push({ id, username, age, password });
      await fs.promises.writeFile("./user.json", JSON.stringify(data), {
          encoding: "utf8",
      });
      res.send({ id, message: "sucess" });
  } catch (error) {
      next({ status: 500, internalMessage: error.message });
  }
});
PATCH
app.patch("/users/:userId", validateUser, async (req, res, next) => {
//http://localhost:3000/users/4bc79df0-38b7-43bb-ad5e-aa0799cfbee

  try{
   const {username , password,age}=req.body
   const users = await fs.promises
   .readFile("./user.json",{encoding:'utf8'})
   .then((data) => JSON.parse(data));

   const newUser = users.map((user)=>{
     if(user.id!==req.params.userId) 
      return user
    return {username , password , age, id:req.params.userId}
   })
   await fs.promises.writeFile("./user.json", JSON.stringify(newUser), {
    encoding: "utf8",
});
res.status(200).send({message:"user edited sucessfully"})
  }catch (error){
    next({status:500 , internalMessage:error.message})
  }
});

GET
app.get('/users',getUserId, async (req,res,next)=>{
  //http://localhost:3000/users?age=22
  try {
  const age = Number(req.query.age)
  const users = await fs.promises
  .readFile("./user.json", { encoding: "utf8" })
  .then((data) => JSON.parse(data));
  const filteredUsers = users.filter(user=>user.age===age)
  res.send(filteredUsers)
  } catch (error) {
  next({ status: 500, internalMessage: error.message });
  }

})

Delete
app.delete('/users/:id', async(req,res,next)=>{
try {
  const id =req.params.id
    const users = await fs.promises
    .readFile("./user.json",{encoding:'utf8'})
    .then((data) => JSON.parse(data));
    // console.log(users.splice(deletItem));
    const deletItem = users.filter((user)=>user.id ===id)
    // console.log(users.splice(deletItem,1))
      const newUser =users.splice(deletItem,1);
      await fs.promises.writeFile("./user.json", JSON.stringify(newUser), {
        encoding: "utf8",
    });
    
      return res.send({message:"user deleted"});
  
} catch (error) {
  next({ status: 404, internalMessage: error.message })
}
})



login User
app.post('/users/login',logRequest)

*/

// app.use(logRequest,validateUser)
