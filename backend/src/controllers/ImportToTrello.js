const User = require('../models/User');

module.exports = {

    async  import(req, res) {
        const { email, labName, kitName, listOfQuestions } = req.body;
        const fetch = require('node-fetch');

        const user = await User.findOne({ email: email });


        //Vai buscar se existe uma Organization com o nome do Lab;
        let org = fetch(`https://api.trello.com/1/organizations/${labName}?key=${user.consumerKey}&token=${user.tokenTrello}`, {
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
            .then(text => console.log(text))
            .catch(err => console.error(err));

        if(!org) {

            //Caso não encontra uma Organization com o nome do Lab, irá criar uma;
            org = fetch(`https://api.trello.com/1/organizations?key=${user.consumerKey}&token=${user.tokenTrello}&displayName=${labName}`, {
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
                .then(text => console.log(text))
                .catch(err => console.error(err));
        }

        const orgId = org.id;

        if(org) {

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
            const board = fetch(`https://api.trello.com/1/boards/?key=${user.consumerKey}&token=${user.tokenTrello}&idOrganization=${orgId}&name=${kitName}`, {
            method: 'POST'
            })
            .then(response => {
                console.log(
                `Response: ${response.status} ${response.statusText}`
                );
                return response.text();
            })
            .then(text => console.log(text))
            .catch(err => console.error(err));
            
            //Criação das listas e Cards no Board
            let counter = 0;
            listOfQuestions.array.forEach(element => {
                
                const list = fetch(`https://api.trello.com/1/lists?key=${user.consumerKey}&token=${user.tokenTrello}&name='Questão Essencial '${counter}&idBoard=${board.id}`, {
                method: 'POST'
                })
                .then(response => {
                    console.log(
                    `Response: ${response.status} ${response.statusText}`
                    );
                    return response.text();
                })
                .then(text => console.log(text))
                .catch(err => console.error(err));

                const card = fetch(`https://api.trello.com/1/cards?key=${user.consumerKey}&token=${user.tokenTrello}&idList=${list.id}$name=${element}`, {
                    method: 'POST'
                })
                .then(response => {
                    console.log(
                    `Response: ${response.status} ${response.statusText}`
                    );
                    return response.text();
                })
                .then(text => console.log(text))
                .catch(err => console.error(err));

                counter++;
            });           
        }  


        return res.json(org);    
    }
};