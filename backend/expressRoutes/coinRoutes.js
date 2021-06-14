const express = require('express');
const app = express();
const coinRoutes = express.Router();

//Require Item model in our routes module
const Coin = require('../models/Coin');

// Defined store route
coinRoutes.route('/add').post(function (req, res){
    const coin = new Coin(req.body);
    coin.save().then(item => {
        res.status(200).json({'coin': 'Coin added successfully'});

    })
    .catch(err => {
        res.status(400).send("Unable to save coin to database");
    });

});
// store data end


// Defined get data(index or listing) route start
coinRoutes.route('/').get(function (req, res) {
    Coin.find(function (err,coins) {
        if(err){
            console.log(err);
        } else {
            res.json(coins);
        } 
    });   
});
// index end




// Defined edit route

coinRoutes.route('/edit/:id').get(function (req, res) {
    const id = req.params.id;
    Coin.findById(id, function (err, coin) {
        res.json(coin); 
    })  
});
// edit end




// Defined update route
coinRoutes.route('/update/:id').post(function (req, res){
    Coin.findById(req.params.id, function (err, coin) {
        if (!coin)
        return next(new Error('Could not load Document'));
        else {
            coin.name = req.body.name;
            coin.price = req.body.price;


         coin.save().then(coin => {
              res.json('Update completed');
           })
            .catch(err => {
                res.status(400).send("Unable to update the coin to database");
            });
          }
       }); 
    });
// Defined update end



// Defined delete | remove | destroy route
coinRoutes.route('/delete/:id').get(function (req, res) {
    Coin.findByIdAndRemove({_id: req.params.id}, function(err, coin){
         if(err) res.json(err);
         else res.json('Successfully removed');
     });
 });
//  delete end code








module.exports = coinRoutes;