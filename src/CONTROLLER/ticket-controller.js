const TicketController = require('../SERVICES/email-service');

const create = async(req,res) => {
    try {
        console.log('inside controller');
        const result = await TicketController.createNotification(req.body);
        return res.status(200).json({
            data: result,
            success: true,
            message: "Succesfully created Notification Ticket",
            err: {}
        })
    } catch (error) {
        console.log(error);
        throw{ error };
    }
}

module.exports = {
    create
}