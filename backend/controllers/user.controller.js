import User from '../models/user.model'; 

// Create and Save a new user
exports.create = (req, res) => {
    // Validate request
    if(!req.body.email) {
        return res.status(400).send({
            message: "User email can not be empty"
        });
    }

    // Create a User
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    // Save User in the database
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });

};
// module.exports.addUser = (newUser, callback) => {
//     bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(newUser.password, salt, (err, hash) => {
//             if(err) throw err;
//             newUser.password = hash;
//             newUser.save(callback);
//         });
//     });
// };

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    User.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving uesers."
        });
    });
};

// Find a single user with a username
exports.findByName = (req, res) => {
    User.findOne({
        username: req.body.username
    }).then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.body.username
            });            
        }
        res.send(user);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving uesers."
        });
    });
};

// Find a single user with a userId
exports.findOneUser = (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.id
                });            
            }
            res.send(user);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.id
                });                
            }
            return res.status(500).send({
                message: "Error retrieving User with id " + req.params.id
            });
        });
};
// module.exports.getUserById = function(id, callback){
//     User.findById(id, callback);
// };




// module.exports.getUserByUsername = function(userName, callback){
//     const query = {userName: userName}
//     User.findByOne(query, callback);
// };



// module.exports.comparePassword = (candidatePassword, hash, callback) => {
//     bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
//         if(err) throw err;
//         callback(null, isMatch);
//     });
// }

// Update a user identified by the userId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.email) {
        return res.status(400).send({
            message: "User email can not be empty"
        });
    }

    // Find user and update it with the request body
    User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    }, 
    {new: true})
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.id
                });
            }
            res.send(user);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.id
                });                
            }
            return res.status(500).send({
                message: "Error updating User with id " + req.params.id
            });
        });

};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.id)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete User with id " + req.params.id
        });
    });
};