const express = require('express');
const User = require('../models/User');
const Contact = require('../models/Contact');
const authMw = require('../middleware/authMw');
const { check, validationResult } = require('express-validator');

const router = express.Router();

//route: api/contacts
//get contacts
//private
router.get('/', authMw, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
        res.json(contacts);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ msg: "server error!" })
    }
});

//route: api/contacts
//create contacts
//private
router.post('/', [authMw, [
    check('name', 'Add a name')
        .not()
        .isEmpty()
]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, phone, type } = req.body;

        try {
            newContact = new Contact({
                user: req.user.id,
                name,
                email,
                phone,
                type
            });

            const contact = await newContact.save();

            res.json(contact);
        }
        catch (error) {
            console.error(error.message);
            return res.status(500).json({ msg: 'Server error' });
        }
    });

//route: api/contacts
//update contacts
//private
router.put('/:id', authMw, async (req, res) => {
    const { name, email, phone, type } = req.body;
    const conatctFields = {};

    if (name)
        conatctFields.name = name;

    if (email)
        conatctFields.email = email;

    if (phone)
        conatctFields.phone = phone;

    if (type)
        conatctFields.type = type;

    try {
        let contact = await Contact.findById(req.params.id);

        if (!contact)
            return res.status(404).json({ msg: 'Not Found!' });
        if (contact.user.toString() !== req.user.id)
            return res.status(401).json({ msg: 'Unauthorized!' });

        contact = await Contact.findByIdAndUpdate(req.params.id, { $set: conatctFields }, { new: true });

        res.json(contact);

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ msg: 'Server error' });
    }
});

//route: api/contacts
//delete contacts
//private
router.delete('/:id', authMw, async (req, res) => {
    try {
        let contact = await Contact.findById(req.params.id);

        if (!contact)
            return res.status(404).json({ msg: 'Not Found!' });
        if (contact.user.toString() !== req.user.id)
            return res.status(401).json({ msg: 'Unauthorized!' });

        await Contact.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Contact removed!' });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ msg: 'Server error' });
    }
});


module.exports = router;