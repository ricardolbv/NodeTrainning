const express = require('express');
const playersController = require('../controllers/playersController');


function routes(Player){
    plrRoute = express.Router();
    const controller = playersController(Player);
    plrRoute.route('/players')
        .get(controller.get)
        .post(controller.post)

    //Midleware for pre-process all the BD requests for this route
    plrRoute.use('/players/:IDplayer', (req, res, next) => {
        Player.findById(req.params.IDplayer, (err, data) => {
            if(err){
                return res.send(err);
            }
            if (data){
                req.player = data;
                return next();
            }
            return res.sendStatus(404); // Not foud!
        })
    })

    plrRoute.route('/players/:IDplayer')
        .get((req, res) => {return res.status(200).json(req.player)})

        .delete((req, res) => {
          req.player.remove((err) => {
                  return res.send(err);
              })
              return res.status(202) // Removed!
          })  

        .put((req, res) => {
            const {player} = req;
            player.Name = req.body.Name;
            player.Club = req.body.Club;
            player.League = req.body.League;
            player.Overral = req.body.Overral;

            req.player.save()
            return res.status(200).json(player);
        })

        .patch((req, res) => {
            if(req.body._id){
                delete req.body._id;
            }
            const {player} = req;
            Object.entries(req.body).forEach((item) => {
                const key = item[0];
                const value = item[1];
                player[key] = value;
            })
            req.player.save((err) => {
                if (err){
                    return res.send(err);
                }
                res.status(200);
                return res.json(player);
            })
        })
   
    return plrRoute;
}

module.exports = routes;