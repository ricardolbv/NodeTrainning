function playersController(Player){
    function get(req, res){
        const query = {};
        if (req.query.Name){
            query.Name = req.query.Name;
        }
        Player.find(query, (err, data) => {
            if (err){
                return res.send(err);
            }
            return res.status(200).json(data);
        })
    }

    function post(req, res){
        const player = new Player(req.body);
        player.save();
        return res.status(201).json(player);
    }


    return {get, post}
}

module.exports = playersController;