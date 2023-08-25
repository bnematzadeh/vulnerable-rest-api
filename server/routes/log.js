const router = require('express').Router();
const path = require('path');

router.get('/', (req,res)=>{
    res.setHeader('Content-type', "application/octet-stream");
    res.setHeader('Content-disposition', 'attachment; filename=logfile.log');
    res.sendFile(path.resolve(__dirname+'/../logfile.log'));
})

module.exports = router;