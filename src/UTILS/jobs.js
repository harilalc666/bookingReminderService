const cron = require('node-cron');
const emailService = require('../services/email-service');
const sender = require('../config/emailConfig');

/**
 * 10:00 am 
 * Every 5 minutes
 * We will check are their any pending emails which was expected to be sent 
 * by now  and is pending
 */

const setUpJob = () => {
    cron.schedule('* * * * *', async() => {
        const response = await emailService.fetchpendingemails();
        response.forEach((element) => {
            sender.sendMail({
                to: element.recepientEmail,
                subject: element.subject,
                text: element.content
            }, async (err, data) => {
                if(err){
                    console.log(err);
                }else{
                    console.log(data);
                    await emailService.updateTicket(element.id, {status: "SUCCESS"});
                }
            })
        });
    })
}

module.exports = 
    setUpJob;
