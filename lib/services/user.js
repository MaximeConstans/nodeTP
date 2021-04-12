'use strict';

const { Service } = require('@hapipal/schmervice');
const Boom = require('boom');
const Encrypt = require('@maxiutlgs/iut-encrypt');
const Jwt = require('@hapi/jwt');

module.exports = class UserService extends Service {

    create(user){
        user.password = Encrypt.sha1(user.password);
        const { User } = this.server.models();

        return User.query().insertAndFetch(user);
    }

    list(){
        const { User } = this.server.models();

        // Objection retourne des promeses, il ne faut pas oublier des les await.
        return User.query().select();
    }

    remove(id){
        const { User } = this.server.models();
        if (User.query().isFind()){
            return User.query().delete().where("id", id).execute();
        }
        return 'error';
    }

    update(user, id){
        user.password = Encrypt.sha1(user.password);
        const { User } = this.server.models();
        if (User.query().isFind()){
            return User.query().update(user).where('id', id).execute();
        }
    }

    async login(credentials){
        const { User } = this.server.models();
        let sql = await User.query().select().where('username', credentials.username);
        if (Encrypt.compareSha1(credentials.password, sql[0].password)){
            return Jwt.token.generate(
                {
                    aud: 'urn:audience:iut',
                    iss: 'urn:issuer:iut',
                    firstName: sql[0].firstName,
                    lastName: sql[0].lastName,
                    email: sql[0].email,
                    scope: sql[0].roles
                },
                {
                    key: 'random_string', // La clé qui est définit dans lib/auth/strategies/jwt.js
                    algorithm: 'HS512'
                },
                {
                    ttlSec: 14400 // 4 hours
                }
            );
        }
        return Boom.unauthorized('caca');
    }
}
