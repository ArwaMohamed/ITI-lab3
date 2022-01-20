// const fs = require('fs');
// const { validateUser } = require('../userHelpers');
// const express = require('express');
// const router = express.Router();
// const { v4: uuidv4 } = require('uuid');
// const { logRequest, getUserId } = require('../generalHelpers');

// // POST
// router.post("/", validateUser, async (req, res, next) => {
//   try {
//     const { username, age, password } = req.body;
//     const data = await fs.promises
//       .readFile("./user.json", { encoding: "utf8" })
//       .then((data) => JSON.parse(data));
//     const id = uuidv4();
//     data.push({ id, username, age, password });
//     await fs.promises.writeFile("./user.json", JSON.stringify(data), {
//       encoding: "utf8",
//     });
//     res.send({ id, message: "sucess" });
//   } catch (error) {
//     next({ status: 500, internalMessage: error.message });
//   }
// });

// // PATCH
// router.patch("/:userId", validateUser, async (req, res, next) => {
//   //http://localhost:3000/users/4bc79df0-38b7-43bb-ad5e-aa0799cfbee

//   try {
//     const {username, password, age} = req.body;
//     const users = await fs.promises
//       .readFile("./user.json", { encoding: "utf8" })
//       .then((data) => JSON.parse(data));
//      const newUser = users.map((user) => {
//       if (user.id !== req.params.userId)return user;
//         //bouns
//         else if(username !==user.username)
//         return{ username:username , password, age, id: req.params.userId }
//         else if(password !==user.password)
//         return{ username, password:password, age, id: req.params.userId }
//         else if(age !==user.age)
//         return{ username:users.username, password, age:age, id: req.params.userId }

//     return { username, password, age, id: req.params.userId };
//     });
//     await fs.promises.writeFile("./user.json", JSON.stringify(newUser), {
//       encoding: "utf8",
//     });
//     res.status(200).send({ message: "user edited sucessfully" });
//   } catch (error) {
//     next({ status: 500, internalMessage: error.message });
//   }
// });
// router.get("/",async (req, res, next) => {
//   //http://localhost:3000/users?age=22
//   try {
//     const age = Number(req.query.age);
//     const users = await fs.promises
//     .readFile("./user.json", { encoding: "utf8" })
//     .then((data) => JSON.parse(data));
//     if(req.query.age){
//       const age = Number(req.query.age);
//     const filteredUsers = users.filter((user) => user.age === age);
//      res.send(filteredUsers);}
//   else{
//      const allUsers=users.map((user)=>user.username)
//           res.send({users: allUsers});
//   }
//   } catch (error) {
  
//     next({ status: 500, internalMessage: error.message });
//   }
// });
// router.get("/:id",getUserId)
// //Delete
// router.delete("/:id", async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const users = await fs.promises
//       .readFile("./user.json", { encoding: "utf8" })
//       .then((data) => JSON.parse(data));
//     // console.log(users.splice(deletItem));
//     const deletItem = users.filter((user) => user.id === id);
//     // console.log(users.splice(deletItem,1))
//     const newUser = users.splice(deletItem, 1);
//     await fs.promises.writeFile("./user.json", JSON.stringify(newUser), {
//       encoding: "utf8",
//     });

//     return res.send({ message: "user deleted" });
//   } catch (error) {
//     next({ status: 404, internalMessage: error.message });
//   }
// });

// //login User
// router.post("/login", logRequest);

// module.exports = router;
