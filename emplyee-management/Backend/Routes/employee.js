const router = require('express').Router();
let Employee = require('../Models/employee.model');

router.route('/').get((req, res) => {
    Employee.find()
        .then(employees => res.json(employees))
        .catch(err => res.status(400).json('Error ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const age = req.body.age;
    const position = req.body.position;
    const email = req.body.email;

    const newEmployee = new Employee({username, age, position, email});

    newEmployee.save()
        .then(() => res.json('Employee Added!'))
        .catch(err => res.status(400).json('Error ' + err));
});

router.route('/:id').get((req, res) => {
    Employee.findById(req.params.id)
        .then(employee => res.json(employee))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').delete((req, res) => {
    Employee.findByIdAndDelete(req.params.id)
        .then(() => res.json('Employee Deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/update/:id').post((req, res) => {
   Employee.findById(req.params.id)
       .then(employee => {
           employee.username = req.body.username;
           employee.age = req.body.age;
           employee.position = req.body.position;
           employee.email = req.body.email;

           employee.save()
               .then(() => res.json('Employee Updated!'))
               .catch(err => res.status(400).json('Update Error: ' + err));

       })
       .catch(err => res.status(400).json('Find by ID Error: ' + err));
});

// router.route('/updatenew/:id').post((req, res) => {
//     Employee.findByIdAndUpdate(req.params.id, {username: 'XXXXXXXXXXXXXXXXXXXXXXX'})
//         .then(value => res.json(value))
//         .catch(err => res.status(400).json('NEW UPDATE Error: ' + err));
// })

module.exports = router;