module.exports = function(req, res, next){
    if(req.user.payload.role !== 'ADMIN') return res.status(403).send('Access Forbidden!');

    next();
}