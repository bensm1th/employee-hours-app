var express             = require('express'),
    router              = express.Router( {mergeParams: true} ),
    mongoose            = require('mongoose'),
    Employee            = require('../models/employees'),
    Authentication      = require('../controllers/authentication'),
    passportService     = require('../services/passport'),
    passport            = require('passport');

const requireAuth = passport.authenticate('manager_jwt', { session: false });

//INDEX
router.get('/tlcemployee', requireAuth, function(req, res) {
    Employee.find({}, function(err, employees) {
        res.send({employees: employees});
    });
});


//CREATE
router.post('/tlcemployee/new', requireAuth, function(req, res) {
    const hourlyPay = req.body.hourlyPay ? { applies: true, rate: req.body.hourlyPay } : { applies: false };
    const salary = req.body.salary ? { applies: true, rate: req.body.salary } : { applies: false };
    Employee.find({}, function(err, employees) {
        const filterByEmployeeNumber = employees.filter(employee => {
            return employee.employeeNumber == req.body.employeeNumber;
        });
        if (filterByEmployeeNumber.length) {
            return res.status(422).json({message: 'That employee number is taken'});
        } else {
            return postEmployee();
        }
    })

    function postEmployee() {
        var newEmployee = ({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            employeeNumber: req.body.employeeNumber,
            address: req.body.address,
            phone: req.body.phone,
            DOB: req.body.DOB,
            sickDaysLeft: req.body.sickDaysLeft,
            vacationDaysLeft: req.body.vacationDaysLeft,
            hourlyPay: hourlyPay,
            salary: salary,
            timeStamps: [],
            currentlyWorking: false
        });

        Employee.create(newEmployee, function(err, employee) {
            if (err) {
                console.log(err);
            } else {
                res.send('YOU\'VE HIT THE CREATE USER ROUTE');
            }
        });
    }
});

//SHOW
router.get('/tlcemployee/:employee_id', requireAuth, function(req, res) {
    Employee.findById(req.params.employee_id).exec(function(err, employee) {
        if (err) {
            console.log(err);
        } else {
            res.send({employee: employee})
        }
    });
});

//EDIT
router.get('/tlcemployee/:id/edit', requireAuth, function(req, res) {
    Employee.findById(req.params.id, function(err, employee) {
        res.render('employees/edit', {employee: employee});
    });
});

//UPDATE
router.put('/tlcemployee/:id', requireAuth, function(req, res) {

    Employee.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, employee) {
        if (err) {
            res.send('there was an error');
        } else {
            res.send(employee);
        }
    });
    
});

//DESTROY route
router.delete('/tlcemployee/:employee_id', requireAuth, function(req, res) {
    Employee.findByIdAndRemove(req.params.employee_id, function(err, employee) {
        if (err) {
            console.log(err);
        } else {
            res.send('employee deleted');
        }
    });
});

module.exports = router;
