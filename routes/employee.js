var express     = require('express'),
    router      = express.Router( {mergeParams: true} ),
    mongoose    = require('mongoose'),
    Employee    = require('../models/employees');



//INDEX
router.get('/employee', function(req, res) {
    Employee.find({}, function(err, employees) {
        res.render('employees/index', {employees: employees});
    });
});

//NEW 
router.get('/employee/new', function(req, res) {
    res.render('employees/new');
});

//CREATE
router.post('/employee/new', function(req, res) {

    var newEmployee = ({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        employeeNumber: req.body.employeeNumber,
        address: req.body.address,
        phone: req.body.phone,
        DOB: req.body.DOB,
        sickDaysLeft: req.body.sickDaysLeft,
        vacationDaysLeft: req.body.vacationDaysLeft,
        hourlyPay: { applies: false, rate: 0},
        salary: { applies: true, rate: 1234},
        timeStamps: [],
        currentlyWorking: false
    });
    Employee.create(newEmployee, function(err, employee) {
        if (err) {
            console.log(err);
        } else {
            console.log(employee);
            res.send('YOU\'VE HIT THE CREATE USER ROUTE');
        }
    });
});

//SHOW
router.get('/employee/:id', function(req, res) {
    Employee.findById(req.params.id).exec(function(err, employee) {
        if (err) {
            console.log(err);
        } else {
            res.render('employees/show', {employee: employee});
        }
    });
});

//EDIT
router.get('/employee/:id/edit', function(req, res) {
    Employee.findById(req.params.id, function(err, employee) {
        res.render('employees/edit', {employee: employee});
    });
});

//UPDATE
router.put('/employee/:id', function(req, res) {
    Employee.findByIdAndUpdate(req.params.id, req.body.employee, function(err, employee) {
        if (err) {
            res.redirect("/employee");
        } else {
            res.redirect("/employee/" + req.params.id);
        }
    });
    
});

module.exports = router;
