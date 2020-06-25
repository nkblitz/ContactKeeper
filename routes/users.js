const express = require('express');

const router = express.Router();

//route: api/contacts
//get contacts
//private
router.get('/', (req, res) => {
    res.send('get users');
});

//route: api/user
//Register a user
router.post('/', (req, res) => {
    res.send('Register a user');
});

//route: api/users
//update user
//private
router.put('/:id', (req, res) => {
    res.send('update user');
});

//route: api/users
//delete user
//private
router.delete('/:id', (req, res) => {
    res.send('delete user');
});


module.exports = router;