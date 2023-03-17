const express = require("express");
const app = express();
const port = process.env.PORT||4000
const userRoutes = require('./routes/userRoutes.js');
app.use(express.json())
app.use('/', userRoutes);
const { request } = require("http");
const { response } = require("express");
const { title } = require("process");
const console = require("console");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/time-chart');


const initializeDBAndServer = async () => {
  try {
    app.listen(port, () => {
      console.log("Server Running at http://localhost:4000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();


  





//   app.get("/users/", (request, response) => {
//       const jwtToken = request.headers["authorization"]?.split(" ")[1];
    
//       if (!jwtToken) {
//         response.status(401).send("Invalid Access Token");
//       } else {
//         jwt.verify(jwtToken, "MY_SECRET_TOKEN", async (error, payload) => {
//           if (error) {
//             response.send("Invalid Access Token");
//           } else {
//             const booksArray = await User.find({})
//             response.send(booksArray);
//           }
//         });
//       }
//     });
      
      
      
      
      
      