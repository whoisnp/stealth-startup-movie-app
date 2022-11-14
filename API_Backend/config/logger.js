const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const path = require('path');

var logger = new (winston.createLogger)({
    transports: [
        new (winston.transports.Console)({
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.align(),
                winston.format.printf(info => `{"Level1 :" ${info.level}: "Time :"${[info.timestamp]}: "Message :"${info.message}}"`),
            ),
            handleExceptions: true
        }),
        new DailyRotateFile({
            name: 'file',
            datePattern: 'YYYY-MM-DD',
            handleExceptions: true,
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.align(),
                winston.format.printf(info => `{"Level :" ${info.level}: "Time :"${[info.timestamp]}: "Message :"${info.message}}"`),
            ),
            filename: path.join(__dirname, '../logs', 'Log_%DATE%.log')
        }),
    ]
});
module.exports = logger