const router = require('express').Router();
const path = require('path');

router.get('/key', (req,res)=>{
    res.setHeader('Content-type', "application/octet-stream");
    res.setHeader('Content-disposition', 'attachment; filename=pub_key.key');
    res.sendFile(path.resolve(__dirname+'/../cert/pub_key.crt'));
})

module.exports = router;