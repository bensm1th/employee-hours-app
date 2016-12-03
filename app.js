var express         = require('express'),       
    app             = express(),
    cors            = require('cors'),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    methodOverride  = require('method-override'),
    flash           = require('connect-flash'),
    config          = require('./config/config'),
    port            = process.env.PORT || '3000',
    //add models
    Employee        = require('./models/employees'),

    //add routes
    timestampRoute  = require('./routes/timestamp'),
    employeeRoute   = require('./routes/employee'),
    hoursRoute      = require('./routes/hours');
    authRoute       = require('./routes/auth');

mongoose.connect(config.dbLocation);

app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true } ));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(flash());


//enable routes
app.use(employeeRoute);
app.use(timestampRoute);
app.use(hoursRoute);
app.use(authRoute)

app.listen(port, function() {
    console.log('tlc listening on port ' + port);
});