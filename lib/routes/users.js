'use strict';

module.exports = {
    method: 'get',
    path: '/users',
    options: {
        tags: ['api']
    },
    handler: async (request, h) => {
        const { User } = request.models();

        // Objection retourne des promeses, il ne faut pas oublier des les await.
        const userList = await User.query().select();

        return userList;
    }
};
