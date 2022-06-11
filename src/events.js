const express = require('express');

function createRouter(db) {
    const router = express.Router();
    const owner = '';

    router.post('/events', (req, res, next) => {
        db.query('INSERT INTO events (owner, name, descriptions, date) VALUES (?,?,?,?)',
            [owner, req.body.name, req.body.descriptions, new Date(req.body.date)],
            (error) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({
                        status: 'error'
                    });
                } else {
                    res.status(200).json({
                        status: 'ok'
                    });
                }
            });
    });

    router.get('/events', (req, res, next) => {
        db.query("SELECT * FROM events WHERE owner=? ORDER BY date LIMIT 10 OFFSET ?",
            [owner, 10 * (req.body.page || 0)],
            (error, results) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({
                        status: 'error'
                    });
                } else {
                    res.status(200).json(results);
                }
            });
    });

    router.put('/events/:id', function (req, res, next) {
        db.query(
            'UPDATE events SET name=?, descriptions=?, date=? WHERE id=? AND owner=?',
            [req.body.name, req.body.description, new Date(req.body.date), req.params.id, owner],
            (error) => {
                if (error) {
                    res.status(500).json({
                        status: 'error'
                    });
                } else {
                    res.status(200).json({
                        status: 'ok'
                    });
                }
            }
        );
    });

    router.delete('/events/:id', function (req, res, next) {
        db.query(
            'DELETE FROM events WHERE id=? AND owner=?',
            [req.params.id, owner],
            (error) => {
                if (error) {
                    res.status(500).json({
                        status: 'error'
                    });
                } else {
                    res.status(200).json({
                        status: 'ok'
                    });
                }
            }
        );
    });

    return router;
}

module.exports = createRouter;