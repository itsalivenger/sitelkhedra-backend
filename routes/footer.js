const router = require('express').Router();
const Subscriber = require('../models/subscription.js');

router.post('/', async (req, res)=> {
    let { email } = req.body;
    try{
        let user = await Subscriber.findOne({ email });
        if(user.email === email){
            let addedUser = await Subscriber.create({ email });
            res.send(addedUser);
        }else{
            res.send({msg: "you're already subscribed"});
        }
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
})
module.exports = router;