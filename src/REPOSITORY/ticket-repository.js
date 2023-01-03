const { NotificationTicket } = require('../MODELS/index');
const { Op } =require('sequelize');

class TicketRepository {

    async createTicket(data) {
        try {
            console.log('inside repo', data);
            const tickets = await NotificationTicket.create(data);
            return tickets;
        } catch (error) {
            console.log(error);
            throw{ error }
        }
    }

    async get(filter) {
        try {
            const tickets = await NotificationTicket.findAll({
                where: {
                    status: filter.status,
                    notificationTime: {
                        [Op.lte]: new Date()
                    }
                }
            });
            return tickets;
        } catch (error) {
            throw error;
        }
    }

    async update(ticketId, data){
        try {
            const ticket = await NotificationTicket.findByPk(ticketId)
            if(data.status)
                ticket.status = data.status;
            await ticket.save();
            return ticket;
        } catch (error) {
            console.log(error);
            throw{ error };
        }
    }
}

module.exports = TicketRepository;

