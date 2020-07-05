const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const authMw = require('../middleware/authMw');
const { check, validationResult } = require('express-validator');

const router = express.Router();

//route: api/auth
//get logged in user
//private
router.get('/', authMw, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ msg: "server error!" })
    }
   
});

router.post('/',
    [
        check('email', 'add valid email')
            .isEmail(),
        check('password', 'password required')
            .exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ msg: 'Invalid Credentials' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch)
                return res.status(400).json({ msg: 'Invalid Credentials' });

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

    }

);


module.exports = router;