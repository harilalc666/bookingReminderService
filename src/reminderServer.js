const express = require('express');
const { PORT } = require('./config/serverConfig');
const bodyparser = require('body-parser');
// const { sendBasicEmail } = require('./SERVICES/email-service')
const TicketControll = require('./CONTROLLER/ticket-controller');
const job = require('./UTILS/jobs');

const {subscribeMessage, createChannel} = require('./UTILS/messageQueue');
const { REMINDER_BINDING_KEY } = require('./config/serverConfig')
const EmailService = require('./SERVICES/email-service');

const setupAndStartServer = () => {
    const app = express();
    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({extended: true}));

    app.post('/api/v1/tickets', TicketControll.create)
    app.listen(PORT, async () => {
        console.log(`Server started at port ${PORT}`);

        const channel = await createChannel();
        subscribeMessage(channel, EmailService.subscribeEvents, REMINDER_BINDING_KEY);

        job();
        // sendBasicEmail(
        //     'pandeyasha1210@gmail.com',
        //     'harilalc66@gmail.com',
        //     'This is a testing email',
        //     'Hey, how are you, I hope you like the support'
        // );
        
    });
}

setupAndStartServer();
