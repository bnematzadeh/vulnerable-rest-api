require('express-async-errors');
const winston = require('winston');

module.exports = function(){
    winston.add(winston.transports.File, {filename: 'logfile.log'});
    process.on('uncaughtException', (ex)=>{
        winston.error(ex.message, ex);
    })

    process.on('unhandledRejection', (ex)=>{
        winston.error(ex.message, ex);
    })
}