const User = require('../models/User');

module.exports = {

    async  export(req, res) {
        try{
            const { email } = req.body;
            const fetch = require('node-fetch');
            const user = await User.findOne({ email: email });
            const token = user.token;

            //Vai buscar todos os projetos do usuário
            let projects = fetch('https://api.strateegia.digital/projects/v1/project', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Auth': `Bearer ${token}`
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

            if(projects) {
                projects = projects.projects
                for (var project in projects) {
                    let projectId = project.id
                    let missions = fetch(`https://api.strateegia.digital/projects/v1/project/${projectId}`, {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Auth': `Bearer ${token}`
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

                    if(missions) {
                        missions = missions.missions
                        for (var mission in missions) {
                            let missionId = mission.id
                            let contents = fetch(`https://api.strateegia.digital/projects/v1/map/${missionId}`, {
                                method: 'GET',
                                headers: {
                                    'Accept': 'application/json',
                                    'Auth': `Bearer ${token}`
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

                            return res.json(contents.content);   
                        }
                    }
                }
            }
        } catch (error){
            response.json({
                error: true,
                message: error.message
            });
            
        }
    }   
};