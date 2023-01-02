const express = require('express');
const { PORT } = require('./config/serverConfig');
const bodyparser = require('body-parser');
// const { sendBasicEmail } = require('./SERVICES/email-service')

const setupAndStartServer = () => {
    const app = express();
    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({extended: true}));


    app.listen(PORT, () => {
        console.log(`Server started at port ${PORT}`);
        
        // sendBasicEmail(
        //     'pandeyasha1210@gmail.com',
        //     'harilalc66@gmail.com',
        //     'This is a testing email',
        //     'Hey, how are you, I hope you like the support'
        // );
        
    });
}

setupAndStartServer();
