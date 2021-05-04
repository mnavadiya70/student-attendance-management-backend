const config = require("../config/auth.config");
const models = require("../models");
const User = models.user;

var jwt = require("jsonwebtoken");

exports.getUser = (req, res) => {
  var token = req.headers['x-access-token'];
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    
    User.findById(decoded.id, (error, user) => {
      if (error) {
        res.status(500).send({ message: error });
        return;
      }
      
      res.status(200).send(user);
    })
  });
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