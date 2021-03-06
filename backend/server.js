
const express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      mongoose = require('mongoose'),
      config = require('./config/DB'),
      morgan = require('morgan'),
      coinRoutes = require('./expressRoutes/coinRoutes'),
      adUnitRoutes = require('./expressRoutes/adunit.route'),
      businessRoutes = require('./expressRoutes/business.route');



      mongoose.Promise = global.Promise;
      mongoose.connect(config.DB).then(
          () => {console.log('Database is connected') },
          err => {      console.log('Can not connect to the database'+ err)}
        );
        

      const app = express();
      app.use(morgan('dev'));
      app.use(bodyParser.json());
      app.use(cors());
      const port = process.env.PORT || 4000;
      app.use('/coins', coinRoutes);
      app.use('/adunits', adUnitRoutes);
      app.use('/business', businessRoutes);
      

       const server = app.listen(port, function(){
         console.log('Listening on port ' + port);
       });