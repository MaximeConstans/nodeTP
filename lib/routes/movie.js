'use strict';

const Joi = require('joi');

module.exports = {
    method: 'post',
    path: '/movie',
    options: {
        auth: false,
        tags: ['api'],
        validate: {
            payload: Joi.object({
                id: Joi.number().integer().greater(0),
                title: Joi.string().min(1).example('Title').description('Title of the movie...'),
                description: Joi.string().min(1).example('Description').description('Description of the moovie...'),
                date: Joi.date(),
                director: Joi.string().min(1).example('Director').description('Director of the movie...')
            })
        }
    },
    handler: async (request, h) => {

        const { movieService/*, mailService*/ } = request.services();
        const movie = request.payload;
        /*const from = 'verification@mail.fr';
        const to = user.email;
        const subject =  'Un nouveau film vient d'être ajouté à notre bibliothèque!';
        const content =  'Nous venons d'ajouter le film ' + movie.title + ' à notre bibliothèque. Venez le regarder!';

        mailService.send(from, to, subject, content);*/

        return await movieService.create(movie);
    }
};
