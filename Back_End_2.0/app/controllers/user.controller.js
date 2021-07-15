var mongoose = require('mongoose'),
  User = mongoose.model('User');

var bcrypt = require("bcryptjs");


// Authentification
exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};

// Users 
exports.get = function(req, res) {
    User.find().then(users => {
        return res.status(200).json(users);
    });
};
exports.getId = function(req, res) {
    User.findOne({_id: req.params.id,})
        .then((user) => {
            return res.status(200).json(user);
        });
};
exports.update = function(req, res) {
  let user = {}
  if (req.body.username) user.username = req.body.username
  if (req.body.email) user.email = req.body.email
  if (req.body.password) user.password = bcrypt.hashSync(req.body.password, 8)
  if (req.body.service) user.service = req.body.service
  if (req.body.radios) user.radios = req.body.radios

  console.log(user);

  User.findOne({_id: req.params.id})
  .then((usr) => {
      usr.username = user.username ? user.username : usr.username;
      usr.email = user.email ? user.email : usr.email;
      usr.password = user.password ? user.password : usr.password;
      usr.service = user.service ? user.service : usr.service;
      usr.radios = user.radios ? user.radios : usr.radios;

      usr.save().then(final => {res.json(final)})
      return res.status(200).json({ message: "User has been updated" });
  }).catch((err) => {
      console.log(err)
  })
};
exports.delete = function(req, res) {
    User.findOne({_id: req.params.id,})
        .then((user) => {
            user.deleteOne();
            return res.status(200).json({ message: "User has been deleted" });
        });
};