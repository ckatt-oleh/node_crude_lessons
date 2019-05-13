import express from 'express';
import User from '../models/user';
import passport from 'passport';
import jwt from 'jsonwebtoken'
const router = express.Router();


// Register
router.post('/register', (req, res) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        userName: req.body.userName,
        password: req.body.password
    });
    User.addUser(newUser, (err, user) => {
        if(err){
            res.json({success: false, msg: 'Failed to registered user'});
        } else {
            res.json({success: true, msg: 'User registered'})
        }
    })
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    const userName = req.body.userName;
    const password = req.body.password;

    User.getUserByUserName(userName, (err, user) => {
        if(err) throw err;
        if(!user){
            return res.json({success: false, msg: 'User not found'});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign(user, confg.secret, {
                    expiresIn: 604800 // 1 week
                });

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        userName: user.userName,
                        email: user.email
                    }
                });
            } else {
                return res.json({success: false, msg: 'Wrong password'});
            }
        });
    });
});

// Profile
router.get('/profile', (req, res, next) => {
    res.send('PROFILE');
});

module.exports = router;