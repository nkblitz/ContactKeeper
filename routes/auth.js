const express = require('express');

const router = express.Router();

//route: api/auth
//get logged in user
//private
router.get('/', (req, res) => {
    res.send('get auth');
});


//route: api/auth
//authenticate user
//public
router.post('/', (req, res) => {
    res.send('authenticate auth');
});


module.exports = router;