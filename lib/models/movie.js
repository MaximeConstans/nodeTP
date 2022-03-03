'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class Movie extends Model {

    static get tableName() {

        return 'movie';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            title: Joi.string().min(1).example('Title').description('Title of the movie...'),
            description: Joi.string().min(1).example('Description').description('Description of the moovie...'),
            date: Joi.date(),
            director: Joi.string().min(1).example('Director').description('Director of the movie...'),
        });
    }
};
