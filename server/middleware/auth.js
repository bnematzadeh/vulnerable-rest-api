const jwt = require('jsonwebtoken');
const fs = require('fs');

function auth(req, res, next){
    const token = req.header('X-Auth-Token');
    if(!token) return res.status(401).send({error: 'JWT token is not provided'});

    const publicKey = fs.readFileSync(`${__dirname}/../cert/pub_key.crt`);
    try{
        const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256', 'HS256'], complete: true});
        req.user = decoded;
        next();
    }catch(ex){
        res.status(400).send({error: 'Invalid token'});
    }
}

module.exports = auth;