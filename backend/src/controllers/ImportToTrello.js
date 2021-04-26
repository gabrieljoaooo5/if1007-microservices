const User = require('../models/User');
const CryptoJS = require('crypto-js');

module.exports = {

    async  import(req, res) {
        try {
            let { email, labName, kitName, listOfQuestions } = req.body;
            const fetch = require('node-fetch');

            const encryptedEmail = CryptoJS.SHA256(email).toString(CryptoJS.enc.Base64);

            const user = await User.findOne({ email: encryptedEmail });

            let listAux = [];

            user.tokenTrello = user.tokenTrello;
            user.consumerKey = user.consumerKey;

            //Vai buscar se existe uma Organization com o nome do Lab;
            const listOfOrg = await fetch(`https://api.trello.com/1/members/me/organizations?key=${user.consumerKey}&token=${user.tokenTrello}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
                })
                .then(response => {
                    console.log(
                    `Response: ${response.status} ${response.statusText}`
                    );
                    return response.text();
                })
                .then(text => listAux = JSON.parse(text))
                .catch(err => console.error(err));
            
            let org = listAux.find(element => element.displayName === labName);


            if(!org) {

                //Caso não encontra uma Organization com o nome do Lab, irá criar uma;
                org = await fetch(`https://api.trello.com/1/organizations?key=${user.consumerKey}&token=${user.tokenTrello}&displayName=${labName}`, {
                    method: 'POST',
                    headers: {
                    'Accept': 'application/json'
                    }
                })
                    .then(response => {
                    console.log(
                        `Response: ${response.status} ${response.statusText}`
                    );
                    return response.text();
                    })
                    .catch(err => console.error(err));

                org = JSON.parse(org);
            }

            const orgId = org.id;

            console.log("orgId: ", orgId);

            if(orgId) {

                //Encontrar um Board que tenha o mesmo nome que o Kit selecionado
                // const lab = fetch(`https://api.trello.com/1/organizations/${labName}/boards?key=${user.consumerKey}&token=${user.tokenTrello}`, {
                //     method: 'GET',
                //     headers: {
                //       'Accept': 'application/json'
                //     }
                //   })
                //     .then(response => {
                //       console.log(
                //         `Response: ${response.status} ${response.statusText}`
                //       );
                //       return response.text();
                //     })
                //     .then(text => console.log(text))
                //     .catch(err => console.error(err));

                // const found = lab.find(element => element.name = kitName);

                //Criação de um novo Board, o qual terá o nome do Kit escolhido

                kitName = kitName.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                kitName = kitName.replace(' ', '%20');

                console.log(kitName);

                const auxBoard = await fetch(`https://api.trello.com/1/boards/?key=${user.consumerKey}&token=${user.tokenTrello}&idOrganization=${orgId}&name=${kitName}&defaultLists=false`, {
                method: 'POST'
                })
                .then(response => {
                    console.log(
                    `Response: ${response.status} ${response.statusText}`
                    );
                    return response.text();
                })
                .catch(err => console.error(err));

                const board = JSON.parse(auxBoard);

                console.log("BoardId: ", board.id);

                //Donelist
                const listAuxDone = await fetch(`https://api.trello.com/1/lists?key=${user.consumerKey}&token=${user.tokenTrello}&name=Done&idBoard=${board.id}`, {
                    method: 'POST'
                    })
                    .then(response => {
                        console.log(
                        `Response: ${response.status} ${response.statusText}`
                        );
                        return response.text();
                    })
                    .catch(err => console.error(err));

                //DoingList
                const listAuxDoing = await fetch(`https://api.trello.com/1/lists?key=${user.consumerKey}&token=${user.tokenTrello}&name=Doing&idBoard=${board.id}`, {
                    method: 'POST'
                    })
                    .then(response => {
                        console.log(
                        `Response: ${response.status} ${response.statusText}`
                        );
                        return response.text();
                    })
                    .catch(err => console.error(err));
                
                //ToDoList
                //Criação das listas e Cards no Board
                const listAuxToDo = await fetch(`https://api.trello.com/1/lists?key=${user.consumerKey}&token=${user.tokenTrello}&name=To%20Do&idBoard=${board.id}`, {
                    method: 'POST'
                    })
                    .then(response => {
                        console.log(
                        `Response: ${response.status} ${response.statusText}`
                        );
                        return response.text();
                    })
                    .catch(err => console.error(err));


                const list = JSON.parse(listAuxToDo);

                listOfQuestions.map(async element => {

                    

                    let question = element.question;

                    question = question.replace(/ /g, '%20');
                    question = question.replace('?', '%3F');
                    question = question.replace('?', '%3F');
                    question = question.replace('?', '%3F');
                
                    question = question.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                    

                    console.log("question", question);

                    const card = await fetch(`https://api.trello.com/1/cards?key=${user.consumerKey}&token=${user.tokenTrello}&idList=${list.id}&name=${question}`, {
                        method: 'POST'
                    })
                    .then(response => {
                        console.log(
                        `Response: ${response.status} ${response.statusText}`
                        );
                        return response.text();
                    })
                    .catch(err => console.error(err));
                });

                return res.json(board.id);
            }
            
            


              
        }   catch (error){
            res.json({
                error: true,
                message: error.message
            });
            
        }

        return res.status(204).send();  
        
    }
};