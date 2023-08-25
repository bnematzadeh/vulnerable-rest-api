const express = require('express');
const router = express.Router();
const {User} = require('../models/user');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res)=>{

    let user = await User.findOne({username: req.body.username});
    if(!user) return res.status(400).send('Invalid username or password');

    if(user.role !== 'ADMIN') return res.status(403).send('Only admin users can access this area');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid username or password');


    const privateKey = fs.readFileSync(__dirname+'/../cert/private_key.key');

    const token = jwt.sign({_id: user._id, name: user.name, role: user.role, username: user.username, website: user.website}, privateKey, { algorithm: 'RS256'});
    res.header('X-Auth-Token', token).status(200).send(user);
})

module.exports = router;

