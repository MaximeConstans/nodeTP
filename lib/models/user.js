'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class User extends Model {

    static get tableName() {

        return 'user';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            firstName: Joi.string().min(3).example('John').description('Firstname of the user'),
            lastName: Joi.string().min(3).example('Doe').description('Lastname of the user'),
            password: Joi.string().min(3).example('password').description('Password of the user'),
            username: Joi.string().min(3).example('Jonny').description('Username of the user'),
            email: Joi.string().min(3).example('jojolefoufou@mail.mail').description('Email of the user'),
            roles: Joi.array().items(Joi.string()).example(['user']),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        });
    }

    $beforeInsert(queryContext) {

        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
        this.roles = ['user'];
    }

    static get jsonAttributes(){

        return ['roles']
    }

    $beforeUpdate(opt, queryContext) {

        this.updatedAt = new Date();
    }

};