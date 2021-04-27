const Kit = require('../models/Kit');
const User = require('../models/User');


module.exports = {
    async store(req, res) {
        const { userId, boardId, boardName } = req.body;

        const isActive = true;

        let kit = await Kit.findOne({ boardId: boardId });

        if(!kit) {
            kit = await Kit.create({ boardId, boardName, userId, isActive });
        }

        return res.json(kit);
    },

    async index(req, res) {
        const userId = req.headers.authorization;

        const kits = await Kit.find({ userId: userId });

        const kitsReturn = [];

        kits.map(element => {
            kitsReturn.push(element.boardName)
        })
        console.log(kitsReturn)

        return res.json(kitsReturn);
    },

    async delete(req, res) {
        const { boardName } = req.body;

        const userId = req.headers.authorization;

        console.log("userId: ", userId, " boardId: ", boardName);

        const fetch = require('node-fetch');

        const user = await User.findOne({ _id: userId });
        const kit = await( await Kit.findOne({ boardName: boardName })).delete();

        if(kit) {
            const token = user.tokenTrello;
            const key = user.consumerKey;
            const boardId = kit.boardId;

            fetch(`https://api.trello.com/1/boards/${boardId}?key=${key}&token=${token}`, {
            method: 'DELETE'
            })
            .then(response => {
                console.log(
                `Response: ${response.status} ${response.statusText}`
                );
                return response.text();
            })
            .then(text => console.log(text))
            .catch(err => console.error(err));
        }
        
        return res.json(kit);        
    }
};