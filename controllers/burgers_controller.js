var express = require('express');
var router = express.Router();
var Burger = require('../models')["Burger"];

router.get('/', function(req, res) {
  res.redirect('/index');
});

//Renders the index page using the array of objects from the Burger table
router.get('/index', function(req, res) {
  Burger.findAll({})
    .then(function(result) {
      console.log(result);
      var burgersObject = {burgers: result};
      res.render('index', burgersObject);
    });
});

//Adds a new burger when the burger creation form is completed
router.post('/burgers/create', function(req, res) {
  var newBurger = req.body;

  Burger.create({
    name: newBurger.name,
    devoured: false
  }).then(function(result) {
    res.redirect('/index');
  });
});

//Changes a burger to devoured when the devoured button is pressed
router.put('/burgers/update/:id', function(req, res) {
  chosenID = req.params.id;

  Burger.findOne({
    where: {
      id: chosenID
    }
  }).then(function(result) {
    if (result) {
      result.updateAttributes({
        devoured: req.body.devoured
      });
    }
    res.redirect('/index');
  });
});

module.exports = router;