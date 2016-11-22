var express     = require('express'),
    router      = express.Router( {mergeParams: true} ),
    mongoose    = require('mongoose'),
    Timestamp   = require('../models/timestamps'),
    Hours       = require('../models/hours'),
    moment      = require('moment'),
    Employee    = require('../models/employees'),
    Table       = require('../models/tables');

//RESTful routes

//INDEX route
router.get('/hours/:id', function(req, res) {
    
    Table.findById(req.params.id, function(err, table) {
        console.log(table);
        res.send(table);
    })
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
            var count = 0;
            employees.forEach((employee, i) => {
                Timestamp.find({'employee': employee._id}, function(err, timestamps) {
                    if (err) {
                        console.log(err);
                        res.send({status: "error"})
                    } else {
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


//EDIT route
router.get('hours/:hours_id/edit', function(req, res) {
    res.send('you hit the hours EDIT route');
});

//UPDATE route
router.put('/hours/:hours_id', function(req, res) {
    Table.findByIdAndUpdate(req.params.hours_id, req.body, function(err, table) {
        if (err) {
            console.log(err) 
        } else {
            console.log('==== saved table =====');
            console.log(table);
            res.send('you hit the hours UPDATE route');
        }
    });
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

//this builds an array of all the dates, starting with the first, and ending with the last.  
function arrayOfDates(date, days) {
    var arr = [];
    for (var i = 0; i < days; i++) {
        arr.push(addDays(date, i));
    }
    return arr;
}

//this creates a list of dates as keys, and zeros as the values, for each employee
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

function hoursMinutes(milliseconds) {
    var hold = moment.duration(milliseconds);
    var hours = Math.floor(hold.asHours());
    var minutes = Math.floor(hold.asMinutes()) - hours * 60;
    return hours + ":" + minutes;
}
let id = 0;
function createPeriods(beginning, end, timestamps, eid, employee) {
    var name = employee.firstName + " " + employee.lastName;

    var numberOfDays = getNumberOfDays(beginning, end);
    var startClock, startTime, periodObj = {}, timePeriods= [];
    var beginning = new Date(beginning);
    var end = new Date(end);
    var start = new Date(beginning.setHours(0,0,0,0));
    var stop = new Date(end.setHours(23,59,59,999));
    var allDates = objOfDates(beginning, numberOfDays);
    var tableArr = [];
    
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
                id: eid
            });
        }
    });
    tableArr.push({name: name, employeeId: eid, id: id++});
    var totalHours = 0;
    for (var prop in allDates) {
        totalHours += allDates[prop];
        var date = prop;
        var cell = {id: id++, workedTime: hoursMinutes( allDates[prop]), date: prop, editable: false, vacationTime: 0, sickTime: 0, absentTime: 0, holiday: false, employeeId: eid };
        tableArr.push(cell);
        allDates[prop] = hoursMinutes(allDates[prop])
    }
    totalHours = hoursMinutes(totalHours);   
    tableArr.push({totalHours: totalHours, employeeId: eid, id: id++});
    //periodObj.timePeriods = timePeriods.filter(period=>{
      //  return period.periodStart > start && period.periodStart < stop;
    //});
    //periodObj.allDates = allDates;
    periodObj.tableArr = tableArr;
    return periodObj;   
}



