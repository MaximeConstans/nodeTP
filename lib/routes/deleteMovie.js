'use strict';

const Joi = require('joi');

module.exports = {
    method: 'get',
    path: '/movie/{id}',
    options: {
        auth: {
            scope: ['admin']
        },
        tags: ['api'],
        validate: {
            params: Joi.object({
                id: Joi.number().integer().required()
            })
        }
    },
    handler: async (request, h) => {
        const { movieService } = request.services();
        await movieService.remove(request.params.id);
        return '';
    }
};
