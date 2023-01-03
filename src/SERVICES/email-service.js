const sender = require('../config/emailConfig');
const TicketRepository = require('../REPOSITORY/ticket-repository')


const repo = new TicketRepository();

const sendBasicEmail = async (mailFrom, mailTo, mailSubject, mailBody) => {
    try {
        const response = await sender.sendMail({
            from: mailFrom,
            to: mailTo,
            subject: mailSubject,
            text: mailBody
        });
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

const createNotification = async (data) => {
    try {
        console.log('inside service');
        const response = await repo.createTicket(data);
        return response;        
    } catch (error) {
        console.log(error);
        throw{ error }
    }
}

const fetchpendingemails = async (timestamp) => {
    try {
        const pendingemails = await repo.get({status:"pending"});
        return pendingemails;
    } catch (error) {
        console.log(error);
        throw{ error }
    }
}

const updateTicket = async(ticketId, data) => {
    try {
        const result = await repo.update(ticketId, data);
        return result;
    } catch (error) {
        console.log(error);
        throw{ error }
    }
}

module.exports = {
    sendBasicEmail,
    createNotification,
    fetchpendingemails,
    updateTicket
}