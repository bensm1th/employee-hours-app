var express     = require('express'),
    router      = express.Router( {mergeParams: true} ),
    mongoose    = require('mongoose'),
    Timestamp   = require('../models/timestamps'),
    Hours       = require('../models/hours'),
    moment      = require('moment'),
    Employee    = require('../models/employees');

//RESTful routes

//INDEX route
router.get('/hours', function(req, res) {
    res.send('you hit the hours INDEX route');
});


//NEW route
router.get('/hours/new', function(req, res) {
    res.render('hours/new');
});

//SHOW route
/*
router.get('/hours/show', function(req, res) {
    res.send('you hit the hour SHOW route');
});
*/
//CREATE route
router.post('/hours', function(req, res) {
     Employee.find({}, function(err, employees) {
        if (err) {
            console.log(err);
        } else {
            var data = [];
            employees.forEach((employee, i) => {
                Timestamp.find({'employee': employee._id}, function(err, timestamps) {
                    if (err) {
                        console.log(err);
                        res.send({status: "error"})
                    } else {
                        var sorted = sortDates(timestamps);
                        var hours = createPeriods(req.body.beginning, req.body.end, sorted, employee._id);
                        data.push({hours: hours, employee: employee});
                        if (i + 1 == employees.length) {
                            var numberOfDays = getNumberOfDays(req.body.beginning, req.body.end);
                            var allDays = arrayOfDates(req.body.beginning, numberOfDays);
                            res.send({dates: allDays, data: data, status: 'success'});
                        }
                    }
                });
            });
        }
    });
});


//EDIT route
router.get('hours/:hours_id/edit', function(req, res) {
    res.send('you hit the hours EDIT route');
});

//UPDATE route
router.put('/hours/:hours_id', function(req, res) {
    res.send('you hit the hours UPDATE route');
});

//DELETE route
router.delete('/hours/:hours_id', function(req, res) {
    res.send('you hit the hour DELETE route');
});

module.exports = router;

function getNumberOfDays(beginning, end) {

    var beginning = new Date(beginning);
    var end = new Date(end);

    var start = new Date(beginning.setHours(0,0,0,0));
    var stop = new Date(end.setHours(23,59,59,999));
    return Math.ceil((stop - start)/(86400*1000));
}
function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return moment(result).format('MM/DD');
}
function arrayOfDates(date, days) {
    var arr = [];
    for (var i = 0; i < days; i++) {
        arr.push(addDays(date, i));
    }
    return arr;
}

function objOfDates(date, days) {
    var datesObj = {};
    for (var i = 0; i < days; i++) {
        datesObj[addDays(date, i)]=0;
    }
    return datesObj;
}

function sortDates(arrayOfDates) {
    return arrayOfDates.sort(function(a,b) {
       return new Date(a.time) - new Date(b.time);
    });
}

function createPeriods(beginning, end, timestamps, id) {
    var numberOfDays = getNumberOfDays(beginning, end);
    var startClock, startTime, periodObj = {}, timePeriods= [];
    var beginning = new Date(beginning);
    var end = new Date(end);
    var start = new Date(beginning.setHours(0,0,0,0));
    var stop = new Date(end.setHours(23,59,59,999));
    var allDates = objOfDates(beginning, numberOfDays);
    
    timestamps.forEach(timestamp=> {
        if (timestamp.logIn && !startClock) {
            startClock = true;
            startTime = timestamp.time;
        }
        if (!timestamp.logIn && startClock) {
            startClock = false;
            var periodLength = timestamp.time - startTime;
            var periodStart = startTime;
            var periodEnd = timestamp.time;
            var periodString = startTime + "-" + timestamp.time;
            var periodDay = moment(startTime).format('MM/DD');
            if (allDates.hasOwnProperty(periodDay)) {
                allDates[periodDay] += periodLength;
            }
            timePeriods.push({
                periodDay: periodDay, 
                periodLength: periodLength, 
                periodString: periodString, 
                periodStart: periodStart, 
                periodEnd: periodEnd, 
                id: id
            });
        }
    });
    periodObj.timePeriods = timePeriods.filter(period=>{
        return period.periodStart > start && period.periodStart < stop;
    });
    periodObj.allDates = allDates;
    return periodObj;
}



