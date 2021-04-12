'use strict';

const Joi = require("joi");
module.exports = {
    method: 'POST',
    path: '/user/login',
    options: {
        auth: false,
        tags: ['api'],
        validate: {
            payload: Joi.object({
                username: Joi.string().required().min(3).example('jonny').description('username of the user'),
                password: Joi.string().required().min(3).example('password').description('Password of the user')
            })
        }
    },
    handler: async (request, h) => {
        const { userService } = request.services();
        return await userService.login(request.payload);
    }
};
