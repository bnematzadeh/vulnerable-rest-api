const express = require('express');
const router = express.Router();
const {User} = require('../models/user');
const auth = require('../middleware/auth');
const cacheRoute = require('../middleware/cache');


router.get(/.*/, cacheRoute, auth, async(req,res)=>{
    if(req.query.id){
        const user = await User.findOne({_id: JSON.parse(decodeURI(req.query.id))});
        return res.send({
            user
        });
    }
    const user = await User.findOne({username: req.user.payload.username});
    return res.send({
        user
    });
})

module.exports = router;