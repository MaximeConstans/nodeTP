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
        const { movieService, mailService } = request.services();

        const movie = request.payload;
        /*const from = 'verification@mail.fr';
        const to = user.email;
        const subject =  'La bibliothèque vient d'être modifiée!';
        const content =  'Il y a eu des changements dans notre bibliothèque et un de ces changements concerne un film que vous aimé. Votre film en favori, ' + movie.title + ' a été modifié, l'ocasion de le revoir !';

        mailService.send(from, to, subject, content);*/

        return await movieService.create(movie);
        return await movieService.update(request.payload, request.params.id);
    }
};
