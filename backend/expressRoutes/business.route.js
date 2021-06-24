const express = require('express');
const app = express();
const businessRoutes = express.Router();

let Business = require('../models/Business');

// Add data Defined store route 
businessRoutes.route('/add').post(function(req, res) {
    let business = new Business(req.body);
    business.save()
        .then(business => {
        res.status(200).json({'business': 'business in added successfully'});
        console.log(business);    
        })
        .catch(err => {
        res.status(400).send("unable to save to database");
     });
});


// Defined get data(index or Listing) route

businessRoutes.route('/').get(function (req, res){
    Business.find(function (err, data){
        if(err){
            console.log(err);
        } else {
            res.json(data);
        }
    });
});


// edit by id
businessRoutes.route('/edit/:id').get(function (req, res) {
    let id = req.params.id;
    Business.findById(id, function (err, data){
            res.json(data);
    });
});


//  Defined update route
businessRoutes.route('/update/:id').post(function (req, res) {
    Business.findById(req.params.id, function(err, data) {
    if (!data)
      return next(new Error('Could not load Document'));
    else {
        data.person_name = req.body.person_name;
        data.business_name = req.body.business_name;
        data.business_get_number = req.body.business_get_number;


        data.save().then(data => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});



// Defined delete | remove | destroy route
businessRoutes.route('/delete/:id').get(function (req, res) {
    Business.findByIdAndRemove({_id: req.params.id}, function(err, data){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});







module.exports = businessRoutes;