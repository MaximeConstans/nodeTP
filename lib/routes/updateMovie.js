'use strict';

const Joi = require('joi');

module.exports = {
    method: 'PATCH',
    path: '/movie/{id}',
    options: {
        auth: {
            scope: ['admin']
        },
        tags: ['api'],
        validate: {
            payload: Joi.object({
                id: Joi.number().integer().greater(0),
                title: Joi.string().min(1).example('Title').description('Title of the movie...'),
                description: Joi.string().min(1).example('Description').description('Description of the moovie...'),
                date: Joi.date(),
                director: Joi.string().min(1).example('Director').description('Director of the movie...')
            }),
            params: Joi.object({
                id: Joi.number().integer().required()
            })
        }
    },
    handler: async (request, h) => {
        const { movieService } = request.services();
        return await movieService.update(request.payload, request.params.id);
    }
};
