const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {User} = require('../models/user');

router.get('/' , async (req,res)=>{
    const users = await User.find();
    res.send(users);
})

module.exports = router;

