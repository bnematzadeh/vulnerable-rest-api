const express = require('express');
const router = express.Router();
const {User} = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res)=>{

    let user = await User.findOne({'username':req.body.username});
    if(!user) return res.status(400).send('Invalid Username or Password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send({error: 'Invalid Username or Password',userId: user._id});

    const token = user.generateToken();
    res.header('X-Auth-Token', token).status(200).send(user);
})

module.exports = router;

