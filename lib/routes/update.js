'use strict';

const Joi = require("joi");
module.exports = {
    method: 'PATCH',
    path: '/user/{id}',
    options: {
        auth: {
            scope: [ 'admin' ]
        },
        tags: ['api'],
        validate: {
            payload: Joi.object({
                firstName: Joi.string().required().min(3).example('John').description('Firstname of the user'),
                lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user'),
                password: Joi.string().required().min(3).example('password').description('Password of the user'),
                username: Joi.string().required().min(3).example('jonny').description('ername of the user'),
                email: Joi.string().required().min(3).example('jojolefoufou@mail.mail').description('Email of the user')
            }),
            params: Joi.object({
                id: Joi.number().integer().required()
            })
        }
    },
    handler: async (request, h) => {
        const { userService } = request.services();
        return await userService.update(request.payload, request.params.id);
    }
};
