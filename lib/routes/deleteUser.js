'use strict';

const Joi = require("joi")
module.exports = {
    method: 'get',
    path: '/user/{id}',
    options: {
        auth: {
            scope: [ 'admin' ]
        },
        tags: ['api'],
        validate: {
            params: Joi.object({
                id: Joi.number().integer().required()
            })
        }
    },
    handler: async (request, h) => {
        const { userService } = request.services();
        await userService.remove(request.params.id);
        return '';
    }
};
