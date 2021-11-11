let router = require('express').Router();

router.get('/', (req, res)=>{
    res.cookie("jwt", '', { secure: true, sameSite: 'none'});
    res.cookie("user", '', { secure: true, sameSite: 'none'});
    res.send('Cookie Set');
});

module.exports = router;