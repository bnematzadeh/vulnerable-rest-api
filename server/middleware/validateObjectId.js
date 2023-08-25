const mongoose = require('mongoose');

module.exports = function(req,res,next){
    if(!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(404).send('ObjectID is not valid');
    next();
}
