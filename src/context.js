import transmute from 'transmutation';

export default ({ db }) => ({
    login: transmute()
        .extend('player', ({ lead }) =>
            db.get(`players/${lead.platform}/${lead.id}`)),
});
