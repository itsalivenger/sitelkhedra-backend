let router = require('express').Router();
let { User } = require('../models/users.js');


//   1-Cartel sector   //
router.get('/', (req, res)=>{
    // User.find((user)=>{
        res.send({user: 'e'});
    // })
    // console.log('donde');

});

router.post("/",(req, res) => {
    console.log(req.body);
});

module.exports = router;