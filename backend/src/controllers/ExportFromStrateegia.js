const User = require('../models/User');
const bodyParser = require('body-parser');
let infoProject = [];
let infoKit = [];
let infoAllProjects = [];
let returnProjects = [];
let infoMission = [];

module.exports = {

    async  export(req, res) {
        try{
            const { email } = req.body;
            const fetch = require('node-fetch');
            const user = await User.findOne({ email: email });
            const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJnZWxAY2luLnVmcGUuYnIiLCJ1aWQiOiI2MDBmMjYzNzc0YjEyODA4YzBjMTRjZWUiLCJyb2xlcyI6W10sIm5hbWUiOiJHYWJyaWVsIEVzdGV2YW0gTG9uZ3VpbmhvcyIsImV4cCI6MTYxODc5NzU1MSwiaWF0IjoxNjE4NzgzMTUxfQ.lAU56PNGPmyfxh9grz0SGH5Ku4aBh2olvQnHARgllRlm8xu3Zyp_pZNXr-Bkq--1fPYRIu0X0o5Neh7NR5CQ1w";
            console.log(token);
            let projects;
            let missions;
            let contents;

            //Vai buscar todos os projetos do usuário
            let projectsResponse = await fetch('https://api.strateegia.digital/projects/v1/project', {
                method: 'GET',
                Authorization: `Bearer ${token}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
                })
                .then(response => {
                    console.log(
                    `Response: ${response.status} ${response.statusText}`
                    );
                    return response.text();
                })
                .then(text => projects = JSON.parse(text))
                .catch(err => console.error(err));
            if(projects) {
                projects = projects.map(function (item) { return item.projects});
                let lengthProjects = projects.length;
                for (var i = 0; i < lengthProjects; i++){
                    for (var j=0; j < projects[0].length; j++){
                        projects.push(projects[0][j]);
                    }
                    projects.shift();
                }
                lengthProjects = projects.length;
                for (var i = 0; i < lengthProjects; i++) {
                    let project = projects[i];
                    let projectId = project.id;
                    console.log("projectid");
                    let missionsResponse = await fetch(`https://api.strateegia.digital/projects/v1/project/${projectId}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                        })
                        .then(response => {
                            console.log(
                            `Response: ${response.status} ${response.statusText}`
                            );
                            return response.text();
                        })
                        .then(text => missions = JSON.parse(text))
                        .catch(err => console.error(err));
                    if(missions) {
                        missions = missions.missions;
                        let lengthMissions = missions.length;
                        for (var j = 0; j < lengthMissions; j++) {
                            let mission = missions[j];
                            let missionId = mission.id
                            console.log("missionId");
                            let contentsResponse = await fetch(`https://api.strateegia.digital/projects/v1/map/${missionId}/content`, {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${token}`
                                }
                                })
                                .then(response => {
                                    console.log(
                                    `Response: ${response.status} ${response.statusText}`
                                    );
                                    return response.text();
                                })
                                .then(text => contents = JSON.parse(text))
                                .catch(err => console.error(err));
                            // console.log(`contents`);
                            // console.log(contents);
                            // infoKit.push({
                            //     key:   mission.title,
                            //     value: contents
                            // });
                            contents = contents.content
                            console.log(contents)
                            contents = contents.map(function (item) { return item.kit});
                            infoMission.push({
                                key: mission.title,
                                value: contents
                            });
                            returnProjects.push(contents);   
                        }
                        infoProject.push({
                            key: project.title,
                            value: infoMission
                        })
                        infoMission = [];
                    }
                }
            }
        } catch (error){
            res.json({
                error: true,
                message: error.message
            });
            
        }
        return res.json(infoProject);
    }   
};