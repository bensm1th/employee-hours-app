var express         = require('express'),       
    app             = express(),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    port            = process.env.PORT || '3001',
    path            = require('path'),
    serveStatic     = require('serve-static'),
    
    //add routes
    timestampRoute  = require('./routes/timestamp'),
    employeeRoute   = require('./routes/employee'),
    hoursRoute      = require('./routes/hours');
    authRoute       = require('./routes/auth');


mongoose.connect(process.env.TLC_DB);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true } ));

app.use(express.static(path.join(__dirname, './client/build')));

//enable routes
app.use(employeeRoute);
app.use(timestampRoute);
app.use(hoursRoute);
app.use(authRoute);

app.get('*', function (req, res) {        
    res.sendFile(path.resolve(__dirname, './client/build/index.html'));
});

app.listen(port, function() {
    console.log('tlc listening on port ' + port);
});

