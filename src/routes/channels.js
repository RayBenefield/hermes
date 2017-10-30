import express from 'express';
import transmute from 'transmutation';

export default ({ fb, domain }) => {
    const router = express();
    router.post('/facebook', (req, res) => transmute({ raw: req.body })
        .do(() => res.sendStatus(200))
        .extend('lead', fb.extractLead)
        .extend(fb.extractActionWithPayload)
        .switch('action', {
            login: transmute().extend('lead', fb.enrichLead),
        })
        .extend(domain)
        .extend('facebookMessages', fb.transform)
        .then(({ lead: { id }, facebookMessages }) =>
            fb.sendMessages({ [id]: facebookMessages }))
    );
    router.get('/facebook', (req, res) => {
        try { fb.verifyToken(req.query); } // eslint-disable-line brace-style
        catch (err) {
            console.error(err); // eslint-disable-line no-console
            return res.sendStatus(403);
        }
        return res.status(200).send(req.query['hub.challenge']);
    });
    return router;
};
