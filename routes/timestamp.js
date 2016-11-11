var express     = require('express'),
    router      = express.Router( {mergeParams: true} ),
    mongoose    = require('mongoose'),
    Employee    = require('../models/employees'),
    Timestamp   = require('../models/timestamps');

//RESTful routes

//NEW route
router.get('/timestamp/new', function(req, res) {
    
    res.render('timestamps/new', {employee: undefined, timestamp: undefined, logState: undefined});
});

//CREATE route
router.post('/timestamp', function(req, res) {
    Employee.find({'employeeNumber': req.body.employeeNumber}, function(err, foundEmployee) {
        if (err) console.log(err);
        else {            
            Timestamp.create({ time: req.body.time, employee: foundEmployee[0]._id }, function(err, newlyCreatedTimestamp) {
            //Timestamp.create({ time: Date.now(), employee: foundEmployee[0]._id }, function(err, newlyCreatedTimestamp) {
                if (err) console.log(err);
                else {
                    var logState = "";
                    if (!foundEmployee[0].currentlyWorking) {
                        //check to see if the person clicked 'log in'
                        if (req.body.clock == 'in') {
                            //go ahead an log them in
                            newlyCreatedTimestamp.logIn = true;
                            foundEmployee[0].currentlyWorking = true;
                        } else {
                            //flag as inappropriate, because the person is trying to log out when they are already logged out
                            newlyCreatedTimestamp.logIn = false;
                            foundEmployee[0].currentlyWorking = false;
                            //do some error handling here, either directly, or fired off of when a timestamp is inappropriate
                            newlyCreatedTimestamp.inappropriate = true;
                            logState += "you were already clocked out.";
                        }
                    }
                    else {
                        //check to see if the employee clicked 'log out'
                        if (req.body.clock == 'out') {
                            //go ahead and log them out.  
                            newlyCreatedTimestamp.logIn = false;
                            foundEmployee[0].currentlyWorking = false;
                        } else {
                            //flag as inappropriate because they are trying to log in when they are already logged in 
                            newlyCreatedTimestamp.logIn = true;
                            foundEmployee[0].currentlyWorking = true;
                            newlyCreatedTimestamp.inappropriate = true;
                            logState += "you were already clocked in";
                        }
                    }
                    newlyCreatedTimestamp.save();
                    foundEmployee[0].save();
                    console.log(newlyCreatedTimestamp);
                    res.render('timestamps/new', {employee: foundEmployee[0], timestamp: newlyCreatedTimestamp, logState: logState});
                }
            });
        }
    });
});

//SHOW timestamps
router.get('/timestamp/:id', function(req, res) {
    Employee.findById(req.params.id, function(err, employee) {
        console.log(req.params.id);
        if (err) {
            console.log(err);
        } else {
            Timestamp.find({'employee': req.params.id}, function(err, timestamps) {
                if (err) {
                    console.log(err);
                } else {
                    var one = timestamps[0].time;
                    var two = timestamps[1].time;
                    var diff = ((two - one)/1000)/60;
                    console.log(two, one);
                    console.log(diff);
                }
                res.send('you hit the timestamps show route');
            });
        }
    });
});

//this route will return all the timestamps between two given dates for an employee
router.post('/timestamp2/:id', function(req, res) {
    Employee.findById(req.params.id, function(err, employee) {
        if (err) {
            console.log(err);
        } else {
            Timestamp.find({'employee': req.params.id}, function(err, timestamps) {
                if (err) {
                    console.log(err);
                } else {
                    var sorted = sortDates(timestamps);
                    var makePeriods = createPeriods(req.body.beginning, req.body.end, sorted, req.params.id);
                }
                res.json(makePeriods);
            });
        }
    });
});

router.post('/timestamp3/:id', function(req, res) {
    Employee.findById(req.params.id, function(err, employee) {
        if (err) {
            console.log(err);
        } else {
            Timestamp.find({'employee': req.params.id}, function(err, timestamps) {
                if (err) {
                    console.log(err);
                } else {
                    timestamps.forEach(stamp=> {
                        console.log(stamp.time);
                    });
                    console.log(' ');
                    console.log('===============================');
                    console.log(' ');
                    var sorted = sortDates(timestamps);
                    sorted.forEach(stamp=> {
                        console.log(stamp.time);
                    });
                }
                res.send('you hit the timestamp3 route');
            });
        }
    })
});

function getNumberOfDays(beginning, end) {
    var beginning = new Date(beginning);
    var end = new Date(end);
    return (end - beginning)/(86400*1000);
}
function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
function makeHoursInfo(period, beginning, timestamps) {
    var arr = [];
    for (var i = 0; i <= period; i++) {
        var day = addDays(beginning, i);
        var filteredTimestamps = timestamps.filter(timestamp=> {             
            return timestamp.time > day && timestamp.time < addDays(day, 1);
        });
        var workedPeriod = [];
        var startClock;
        var startTime;
        filteredTimestamps.forEach(timestamp=> {
            if (timestamp.logIn  && !startClock) {
                startClock = true;
                startTime = timestamp.time;
            }
            if (!timestamp.logIn && startClock) {
                startClock = false;
                var periodLength = timestamp.time - startTime;
                var periodString = startTime + "-" + timestamp.time;
                workedPeriod.push({period: periodString, periodLength: periodLength});
            }
        });
        arr.push({day: day, timestamps: filteredTimestamps, workedPeriod: workedPeriod});
    }
    return arr;
}

function sortDates(arrayOfDates) {
    return arrayOfDates.sort(function(a,b) {
       return new Date(a.time) - new Date(b.time);
    });
}

function createPeriods(beginning, end, timestamps, employeeId) {
    var startClock, startTime, timePeriods = [];
    var beginning = new Date(beginning);
    var end = new Date(end);
    var start = new Date(beginning.setHours(0,0,0,0));
    var stop = new Date(end.setHours(23,59,59,999));
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
            timePeriods.push({periodLength: periodLength, periodString: periodString, periodStart: periodStart, periodEnd: periodEnd, employeeId: employeeId});
        }
    });
    return timePeriods.filter(period=>{
        return period.periodStart > start && period.periodStart < stop;
    });
}
module.exports = router; 