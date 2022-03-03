'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.createTable('movie', (table) => {

            table.increments('id').primary();
            table.string('title').notNull();
            table.string('description').notNull()
            table.string('date').notNull()
            table.string('director').notNull()

        });
    },

    async down(knex) {

        await knex.schema.dropTableIfExists('user');
    }
};
