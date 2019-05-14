import express from 'express';
import passport from 'passport';
// import jwt from 'jsonwebtoken'
// const router = express.Router();

module.exports = backend => {
    const users = require('../controllers/user.controller.js');

    // Register/Create a new User
    backend.post('/register', users.create);

    // Retrieve all Users
    backend.get('/profiles', users.findAll);

    // Retrieve a single user with userId
    backend.get('/profile/:userId', users.findOne);

    // Retrieve a single user by username
    backend.get('/profile', users.findByName);

    // Update a User with userId
    backend.put('/profile/:userId', users.update);

    // Delete a User with userId
    backend.delete('/profile/:userId', users.delete);
}


// // Authenticate
// router.post('/authenticate', (req, res, next) => {
//     const userName = req.body.userName;
//     const password = req.body.password;

//     User.getUserByUserName(userName, (err, user) => {
//         if(err) throw err;
//         if(!user){
//             return res.json({success: false, msg: 'User not found'});
//         }

//         User.comparePassword(password, user.password, (err, isMatch) => {
//             if(err) throw err;
//             if(isMatch){
//                 const token = jwt.sign(user, confg.secret, {
//                     expiresIn: 604800 // 1 week
//                 });

//                 res.json({
//                     success: true,
//                     token: 'JWT ' + token,
//                     user: {
//                         id: user._id,
//                         name: user.name,
//                         userName: user.userName,
//                         email: user.email
//                     }
//                 });
//             } else {
//                 return res.json({success: false, msg: 'Wrong password'});
//             }
//         });
//     });
// });

// module.exports = router;