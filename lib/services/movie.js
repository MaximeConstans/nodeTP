'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class MovieService extends Service {

    create(movie){
        const { Movie } = this.server.models();

        return Movie.query().insertAndFetch(movie);
    }

    list(){
        const { Movie } = this.server.models();

        // Objection retourne des promeses, il ne faut pas oublier des les await.
        return Movie.query().select();
    }

    remove(id){
        const { Movie } = this.server.models();
        if (Movie.query().isFind()){
            return Movie.query().delete().where("id", id).execute();
        }
        return 'error';
    }

    update(movie, id){
        const { Movie } = this.server.models();
        if (Movie.query().isFind()){
            return Movie.query().update(movie).where('id', id).execute();
        }
    }
}
