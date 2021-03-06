'use strict';

const Joi = require("joi")
module.exports = {
    method: 'post',
    path: '/user',
    options: {
        auth: false,
        tags: ['api'],
        validate: {
            payload: Joi.object({
                firstName: Joi.string().required().min(3).example('John').description('Firstname of the user'),
                lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user'),
                password: Joi.string().required().min(3).example('password').description('Password of the user'),
                username: Joi.string().required().min(3).example('jonny').description('ername of the user'),
                email: Joi.string().required().min(3).example('jojolefoufou@mail.mail').description('Email of the user')
            })
        }
    },
    handler: async (request, h) => {

        const { userService, mailService } = request.services();
        const user = request.payload;
        const from = 'verification@mail.fr';
        const to = user.email;
        const subject =  'Votre création a été validée!';
        const content =  'La création de votre compte est résussie. Bienvenu chez nous ' + user.lastName + ' ' + user.firstName + '!';

        mailService.send(from, to, subject, content);

        return await userService.create(user);
    }
};
