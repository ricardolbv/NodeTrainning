const express = require('express');

function routes(Player){
    plrRoute = express.Router();
    plrRoute.route('/player/:namePlayer')
        .get((req, res) => {
            Player.findById(req.params.namePlayer, (err, data) => {
                if(err){
                    res.status(404);
                    return res.send(err);
                }
                return res.json(data);
            })
        })

    return plrRoute;
}

module.exports = routes;