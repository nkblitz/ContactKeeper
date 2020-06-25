const express = require('express');

const router = express.Router();

//route: api/contacts
//get contacts
//private
router.get('/', (req, res) => {
    res.send('get contacts for a user');
});

//route: api/contacts
//create contacts
//private
router.post('/', (req, res) => {
    res.send('add contacts for a user');
});

//route: api/contacts
//update contacts
//private
router.put('/:id', (req, res) => {
    res.send('update contacts for a user');
});

//route: api/contacts
//delete contacts
//private
router.delete('/:id', (req, res) => {
    res.send('delete contacts for a user');
});


module.exports = router;