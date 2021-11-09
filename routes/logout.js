let router = require('express').Router();

router.get('/', (req, res)=>{
    res.cookie("jwt", '', { secure: true, samsSite: 'none'});
    res.send('Cookie Set');
});

module.exports = router;