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
                
                //Criação das listas e Cards no Board
                let counter = 0;
                listOfQuestions.map(async (element, currentValue) => {

                    const listAux = await fetch(`https://api.trello.com/1/lists?key=${user.consumerKey}&token=${user.tokenTrello}&name=Questao%20Essencial%20${currentValue}&idBoard=${board.id}`, {
                    method: 'POST'
                    })
                    .then(response => {
                        console.log(
                        `Response: ${response.status} ${response.statusText}`
                        );
                        return response.text();
                    })
                    .catch(err => console.error(err));

                    counter += 1;

                    const list = JSON.parse(listAux);

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