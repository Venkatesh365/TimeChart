const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require('../models/User.js');

//User Registration

exports.registerUser = async (request, response) => {
    const { email, password, firstName, lastName } = request.body;
    const hashedPassword = await bcrypt.hash(request.body.password, 10);
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      const newUser = new User ({
        email: email,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName
      });
  
      const result = await newUser.save();
      console.log(result, '>>>>>>>>>>result')
      response.send(`Created new user with ${result._id}`);
    } else {
      response.status(400);
      response.send("User already exists");
    }
}

//User Login

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    // Find user with matching username
    const dbUser = await User.findOne({ email });
    console.log(dbUser, '<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
    
    if (dbUser === null) {
        // User not found
        res.status(400).send('Invalid user');
    } else {
        // Compare password with hashed password in database
        const isPasswordMatched = await bcrypt.compare(password, dbUser.password);
        console.log(isPasswordMatched, '<<<<<<<<<<<<<')
        if (isPasswordMatched) {
            const payload = {
                email: email,
              };
              const jwtToken = jwt.sign(payload, "MY_SECRET_TOKEN");
              res.send({ jwtToken });
        // Password matched
        // res.send('Login success!');
        } else {
        // Password didn't match
        res.status(400).send('Invalid password');
        }
    }
    }