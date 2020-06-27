const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const router = express.Router();

//route: api/contacts
//get contacts
//private
router.get('/', (req, res) => {
    res.send('get users');
});

//route: api/user
//Register a user
router.post('/',
    [
        check('name', 'Add a name')
            .not()
            .isEmpty(),
        check('email', 'add valid email')
            .isEmail(),
        check('password', 'Min 4 chars required')
            .isLength({ min: 4 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({ msg: 'User already exists' });
            }

            user = new User({
                name,
                email,
                password,
            });
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            user.save();
            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(payload, config.get('jwtSecret'), {
                expiresIn: "12h",
            },
                (error, token) => {
                    if (error) throw error;

                    res.send({ token });
                })
        }
        catch (error) {
            console.error(error.message);
            return res.status(500).json({ msg: 'Server error' });
        }
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