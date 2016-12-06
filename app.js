var express         = require('express'),       
    app             = express(),
    cors            = require('cors'),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    methodOverride  = require('method-override'),
    flash           = require('connect-flash'),
    config          = require('./config/config'),
    port            = process.env.PORT || '3001',
    //add models
    Employee        = require('./models/employees'),

    //add routes
    timestampRoute  = require('./routes/timestamp'),
    employeeRoute   = require('./routes/employee'),
    hoursRoute      = require('./routes/hours');
    authRoute       = require('./routes/auth');

mongoose.connect(process.env.TLC_DB);
//app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true } ));

//enable routes
app.use(employeeRoute);
app.use(timestampRoute);
app.use(hoursRoute);
app.use(authRoute)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.listen(port, function() {
    console.log('tlc listening on port ' + port);
});

