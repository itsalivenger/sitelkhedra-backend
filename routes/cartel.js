let router = require('express').Router();



//   1-Cartel sector   //
router.get('/', (req, res)=>{
    // res.send(data);
    console.log('donde');
});

router.post("/",(req, res) => {
    console.log(req.body);
});

module.exports = router;