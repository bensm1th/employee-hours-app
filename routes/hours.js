var express             = require('express'),
    router              = express.Router( {mergeParams: true} ),
    mongoose            = require('mongoose'),
    Timestamp           = require('../models/timestamps'),
    Hours               = require('../models/hours'),
    moment              = require('moment-timezone'),
    Employee            = require('../models/employees'),
    Table               = require('../models/tables');
    Authentication      = require('../controllers/authentication'),
    passportService     = require('../services/passport'),
    passport            = require('passport'),
    rootURL             = '/tlchours/';

const requireAuth = passport.authenticate('manager_jwt', { session: false });
/*----  RESTful routes  ----*/

//INDEX route
router.get(`${rootURL}`, requireAuth, function(req, res) {
    Table.find({}, function(err, tables) {
        res.send({tables});
    })
});


//CREATE route
router.post(`${rootURL}`, requireAuth, function(req, res) {
     Employee.find({}, function(err, employees) {
        if (err) {
            console.log(err);
        } else {
            var data = [];
            var count = 0;
            employees.forEach((employee, i) => {
                Timestamp.find({'employee': employee._id}, function(err, timestamps) {
                    if (err) {
                        console.log(err);
                        res.send({status: "error"})
                    } else {
                        //sort out all the timestamps for this employee
                        var sorted = sortDates(timestamps);
                        var hours = createPeriods(req.body.beginning, req.body.end, sorted, employee._id, employee);
                        data.push({hours: hours});
                        count++;
                        if (count == employees.length) {
                            var numberOfDays = getNumberOfDays(req.body.beginning, req.body.end);
                            var allDays = arrayOfDates(req.body.beginning, numberOfDays);
                            const tableData = {dates: allDays, data: data, status: 'success'};
                            Table.create(tableData, function(err, table) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    res.send(table)
                                }
                            });
                        }
                    }
                });
            });
        }
    });
});

//SHOW route
router.get(`${rootURL}:id`, requireAuth, function(req, res) {
    Table.findById(req.params.id, function(err, table) {
        res.send(table);
    })
});

//UPDATE route
router.put(`${rootURL}:hours_id`, requireAuth, function(req, res) {
    Table.findByIdAndUpdate(req.params.hours_id, req.body, function(err, table) {
        if (err) {
            console.log(err) 
        } else {
            res.send('you hit the hours UPDATE route');
        }
    });
});

//DELETE route
router.delete(`${rootURL}:hours_id`, requireAuth, function(req, res) {
    
    Table.findByIdAndRemove(req.params.hours_id, function(err, table) {
        if (err) {
            console.log(err);
        } else {
            res.send('table deleted');
        }
    })
});

module.exports = router;
//this will take the starting and ending dates, and return how many days total are involved.  
function getNumberOfDays(beginning, end) {

    var beginning = new Date(beginning);
    var end = new Date(end);

    var start = new Date(beginning.setHours(0,0,0,0));
    var stop = new Date(end.setHours(23,59,59,999));
    return Math.ceil((stop - start)/(86400*1000));
}
//this takes a date, and returns a string of 'days' after that date.
function addDays(date, days) {
    var result = new Date(date);
    //this looks like it takes a date, and then return a new date so many 'days' after it
    result.setDate(result.getDate() + days);
    //then, it formats that date into a specific colendar date
    return moment(result).format('MM/DD');
}

//this builds an array of all the dates, starting with the first, and ending with the last.  
function arrayOfDates(date, days) {
    var arr = [];
    //for the total number of days in the chart, do the following:
    for (var i = 0; i < days; i++) {
        //this is just a calendar date, with no time
        arr.push(addDays(date, i));
    }
    return arr;
}

//this creates a list of dates as keys, and zeros as the values, for each employee
function objOfDates(date, days) {
    var datesObj = {};
    for (var i = 0; i < days; i++) {
        // remember, add days just create a calendar date, by takeing the first param, 
        // and returning a date so many days from it, based on the second param
        datesObj[addDays(date, i)]=0;
    }
    return datesObj;
}

function sortDates(arrayOfDates) {
    return arrayOfDates.sort(function(a,b) {
       return new Date(a.time) - new Date(b.time);
    });
}

//this takes milliseconds and turns it into a duration of time worked
function hoursMinutes(milliseconds) {
    var hold = moment.duration(milliseconds);
    var hours = Math.floor(hold.asHours());
    var minutes = Math.floor(hold.asMinutes()) - hours * 60;
    return hours + ":" + minutes;
}
let id = 0;
function createPeriods(beginning, end, timestamps, eid, employee) {
    var name = employee.firstName + " " + employee.lastName;
    
    var numberOfDays = getNumberOfDays(beginning, end); //simply the number of days from the beginning to the end of the period
    var startClock, startTime, periodObj = {}, timePeriods= [];
    var beginning = new Date(beginning);
    var end = new Date(end);
    var start = new Date(beginning.setHours(0,0,0,0));
    var stop = new Date(end.setHours(23,59,59,999));
    //what is this? It's a list of dates as keys, with zeros as values
    var allDates = objOfDates(beginning, numberOfDays);
    var tableArr = [];
    
    timestamps.forEach(timestamp=> {
        // if the timestamp is a login, and the 'start clock' is set to false
        if (timestamp.logIn && !startClock) {
            //set 'start clock' to true
            startClock = true;
            //set the start time
            startTime = timestamp.time;
        }
        //if it's a log out and the clock has started
        if (!timestamp.logIn && startClock) {
            //set 'start clock' to false
            startClock = false;
            // compute the difference between the clockin and clockout
            var periodLength = timestamp.time - startTime;
            //store the starting time
            var periodStart = startTime;
            //store the ending time
            var periodEnd = timestamp.time;
            //concat the start and end times
            var periodString = startTime + "-" + timestamp.time;
            //get the day the time started, and convert it to the local time in Los Angeles
            var periodDay = moment.tz(startTime, 'America/Los_Angeles').format('MM/DD');
            console.log('------------- periodDay ----------------')
            console.log(periodDay);
            if (allDates.hasOwnProperty(periodDay)) {
                //add the hours worked to the all dates obj
                allDates[periodDay] += periodLength;
            }
            //push all the data about this time periods(between one clockin and clockout) into an array
            timePeriods.push({
                periodDay: periodDay, 
                periodLength: periodLength, 
                periodString: periodString, 
                periodStart: periodStart, 
                periodEnd: periodEnd, 
                id: eid
            });
        }
    });
    //push some data about the employee (plus an id for the table cell) into an array
    tableArr.push({name: name, employeeId: eid, id: id++});
    //we need to know the total time worked for the period.  
    var totalHours = 0;
    //loop through the properties in all dates, which is where we've been '
    for (var prop in allDates) {
        //add the time worked on each day to the total hours.  
        totalHours += allDates[prop];
        //set the property to the var 'date' since it is a date.  
        var date = prop;
        //from the intial obj, I am creating a new one with more information, useful to construct the cell on the front end
        var cell = {
            id: id++, 
            workedTime: hoursMinutes( allDates[prop]), 
            date: prop, 
            editable: false, 
            vacationTime: 0, 
            sickTime: 0, 
            absentTime: 0, 
            holiday: false, 
            employeeId: eid 
        };
        //push this 'cell' obj into an array, which I'll map over to create the table on the front end
        tableArr.push(cell);
        //format the time worked from milliseconds into hours:minutes in the original obj.  
        allDates[prop] = hoursMinutes(allDates[prop])
    }
    //formate the total hours from millseconds into hours:minutes
    totalHours = hoursMinutes(totalHours);   
    //create the cell for the last cell in the column, where the hours are totaled
    tableArr.push({totalHours: totalHours, employeeId: eid, id: id++});
    
    periodObj.tableArr = tableArr;
    return periodObj;   
}



