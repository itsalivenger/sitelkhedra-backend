let router = require('express').Router();
let { User } = require('../models/users.js');
let ClientHistory = require('../models/clientHistory.js')


//   1-Cartel sector   //
router.get('/', (req, res)=>{
    // User.find((user)=>{
        res.send({user: 'e'});
    // })
    // console.log('donde');

});

router.post("/", async (req, res) => {
    console.log(req.body);
    let { data, email } = req.body;
    try{
        let clientToUpdate = await ClientHistory.findOneAndUpdate({ email }, {$push: { order: {$each: data} }});
        res.send({msg: 'success'});
    }
    catch(err){
        res.statusCode(err.statusCode).send(err);
    }
});


router.delete('/', async (req, res)=>{
    let { email } = req.body;
    let userCartel = await User.findOneAndUpdate({ email }, {$set: {cartel: []}});
    res.send({msg: 'deleted'})
})
module.exports = router;