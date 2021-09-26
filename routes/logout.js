let router = require('express').Router();

router.get('/', (req, res)=>{
    res.cookie("jwt", '');
    res.send('Cookie Set');
});

module.exports = router;