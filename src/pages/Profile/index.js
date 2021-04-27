import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrello, FiX } from 'react-icons/fi';
import { Card, Button, ButtonGroup } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { useSnackbar } from 'notistack';

import './styles.css';
import api from '../../services/api';

export default function Profile() {
  const [tab, setTab] = useState(0);
  const [mapTab, setMapTab] = useState(0);
  const [eventKeyIndex, seteventKeyIndex] = useState("0");
  const [labName, setLabName] = useState("");

  const [dataList, setDataList] = useState([]);

  const [isFetched, setIsFetched] = useState(false);
  const [isFetchedKits, setIsFetchedKits] = useState(false);
  const [kitSaved, setKitSaved] = useState([]);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const email = localStorage.getItem('userEmail');
  const userId = localStorage.getItem('userId');

  const history = useHistory();

  const auxDataList = dataList;

  useEffect(() => {
    Teste();
    
  }, []);

  useEffect(() => {
    console.log(kitSaved);
    if(dataList.length != 0){
      setIsFetched(true);
      setIsFetchedKits(true);
    }
  }, [dataList, kitSaved]);

  async function Teste() {
    try {
      console.log(userId);
      const respo2 = await api.get('/kits', {
        headers: {
        Authorization: userId,
      }})
      console.log("kits: ", respo2.data);
      setKitSaved(respo2.data);

      const respo = await api.get('/exportSrateegia', {
        headers: {
        Authorization: email,
      }})

      setDataList(respo.data);
      setLabName(respo.data[0].key);

      
      
    } catch(err) {
      console.log(err);
    }
  }

  function handleIndex(index) {
    console.log(index);

    seteventKeyIndex(index.toString());
  }

  function handleTab(labName, index) {
    setLabName(labName);
    setTab(index);
    setMapTab(0);
  }

  function handleMapTab(index) {
    setMapTab(index);
  }

  async function ImportToTrello(kitName, listOfQuestions) {
    console.log(kitName);

    const data = {
      email,
      labName,
      kitName,
      listOfQuestions
    };
    try {
      console.log(data);
      const response = await api.post('/importTrello', data);

      const boardId = response.data;

      const boardName = kitName;

      const dataKit = {
        userId,
        boardName,
        boardId
      };

      const response2 = await api.post('/kits', dataKit);
      setKitSaved([...kitSaved, boardName]);
      console.log(kitSaved);

      enqueueSnackbar('Board criado com sucesso!', {
        variant: "success",
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
      }});
    } catch (err) {
      enqueueSnackbar('Trello atingiu o limite de criação de boards!', {
        variant: "error",
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
      }});
   
    }

  }

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }

  async function handleDeleteKit(kitName) {
    const data = {
      userId,
      boardName: kitName
    };

    console.log(data);

    try {
      const response = await api.delete(`/kits`, {
        data: {
          boardName: kitName
        },
        headers: {
          Authorization: userId,
        }
      });

      const auxKits = kitSaved.filter(function(ele){ 
        return ele != kitName; 
      });

      setKitSaved(auxKits);

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }
    
  

  return (
    <div className="profile-container">
      <header>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <div>
        <ButtonGroup>
          { isFetched &&
            auxDataList.map((projects, index) => {
              return <Button onClick={e => handleTab(projects.key, index)} >{projects.key}</Button>
            })
          }
        </ButtonGroup>
      </div>

      <div>
        <ButtonGroup>
        { isFetched &&
          dataList[tab].value.map((map, index) => {
            return <Button onClick={e => handleMapTab(index)} >{map.key}</Button>
          })
        } 
        </ButtonGroup>
      </div>

      <div>
       <Accordion>
         { isFetched && dataList[tab].value[mapTab].value.map((map, index) => (
            <Card>
            <Card.Header>

              <button onClick={e => ImportToTrello(map.title, map.questions)} type="button">
                <FiTrello size={18} color="#E02041" />
              </button>

              { isFetchedKits && kitSaved.includes(map.title)? 
              <button type="button" onClick= {e => handleDeleteKit(map.title)}>
                <FiX size={18} color="#E02041" />
              </button> : 
              ""
              }

              <Accordion.Toggle as={Button} variant="link" eventKey={eventKeyIndex} onClick={e => handleIndex(index.toString())}>
                {map.title}
              </Accordion.Toggle>
            </Card.Header>
            { map.questions.map( questions => (
              <Accordion.Collapse eventKey={eventKeyIndex}>
              <Card.Body>{questions.question}</Card.Body>
              </Accordion.Collapse>
            )) }
          </Card>
        ))} 
      </Accordion>
      </div>
      
     
    </div>
  );
}