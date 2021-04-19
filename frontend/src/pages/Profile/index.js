import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrello } from 'react-icons/fi';
import { Card, Button, ButtonGroup } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';

import './styles.css';
import api from '../../services/api';

export default function Profile() {
  const [tab, setTab] = useState(0);
  const [eventKeyIndex, seteventKeyIndex] = useState("0");
  const [labName, setLabName] = useState("");

  const email = localStorage.getItem('userEmail');

  const history = useHistory();

  const dataList = [
    {
      "key": "MBA 2020.1",
      "value": [
        {
          "key": "MVK",
          "value": [
            {
              "id": "5f3ec4760dc8847a031933b8",
              "title": "Dúvidas",
              "description": "Método [de trabalho] cujo foco é compartilhar dúvidas com o time",
              "type": "METHOD",
              "tier": "CUSTOM",
              "questions": [
                {
                  "id": "192f1989-97e9-435b-a496-c99fb1ab1350",
                  "question": "Insira aqui suas dúvidas para que todos possam ajudar"
                }
              ],
              "references": [
                {
                  "description": "Dúvidas frequentes",
                  "url": "https://pt.m.wikipedia.org/wiki/FAQ"
                }
              ],
              "created_at": "2020-08-20T18:44:06.062",
              "updated_at": "2020-09-10T16:34:23.598"
            },
            {
              "id": "5f3eccac8e0b515ca0e519fd",
              "title": "Dona Deda",
              "description": "Método [de trabalho] cujo foco é conversar livremente sobre qualquer coisa",
              "type": "METHOD",
              "tier": "CUSTOM",
              "questions": [
                {
                  "id": "4bffc3a9-d7a4-4214-b7ff-730feb07bc0b",
                  "question": "Fale sobre o q achar relevante para a disciplina e não está relacionado nas questões essenciais de outras caixas de ferramentas"
                }
              ],
              "references": [
                {
                  "description": "Papo furado",
                  "url": "https://pt.wikipedia.org/wiki/Papo_furado"
                }
              ],
              "created_at": "2020-08-20T19:19:08.183",
              "updated_at": "2020-09-10T16:34:16.081"
            },
            {
              "id": "5f3eda7e8e0b515ca0e519ff",
              "title": "Onboard MBA",
              "description": "Método [de imersão] para identificar informações na construção de uma jornada SUFICIENTE para o estudante entender o contexto e EFICIENTE para ser usada como base para o processo de ENSINO e APRENDIZAGEM na disciplina",
              "type": "METHOD",
              "tier": "CUSTOM",
              "questions": [
                {
                  "id": "6c91f810-75d9-4f03-b459-de1f549821e6",
                  "question": "Qual sua EXPECTATIVA para esta jornada de aprendizagem?"
                },
                {
                  "id": "b862074f-8d98-43e2-8538-c8c306e2a9c8",
                  "question": "Qual área dentro da computação te interessa atualmente (que você pretende se especializar, construir carreira)?"
                },
                {
                  "id": "bf6f7fee-5923-411f-827c-9c57d2711d1b",
                  "question": "Você já se envolveu ou está envolvido em algum projeto de construção de software (aplicativo, aplicação, plataforma, sistema...)?"
                },
                {
                  "id": "807b6d46-dba7-4cc4-bc3b-fae624d7e3e8",
                  "question": "Quais PONTOS CRÍTICOS podem interferir no sucesso do seu aprendizado?"
                },
                {
                  "id": "66c79d1e-660d-4be8-964d-ec4114d8cd76",
                  "question": "Qual CENÁRIO espera ver na sua formação depois desta disciplina?"
                }
              ],
              "references": [
                {
                  "description": "Desenvolvimento de Aplicações Nativas da Nuvem com Arquitetura Baseada em Microservices",
                  "url": "https://bit.ly/vcg-microservices"
                }
              ],
              "created_at": "2020-08-20T20:18:06.517",
              "updated_at": "2021-01-18T17:52:10.763"
            },
            {
              "id": "600f312a1a7009014b5e5de1",
              "title": "mundo figital",
              "description": "O mundo físico ampliado pelo digital e orquestrado pelo social.​",
              "type": "LEARNING",
              "tier": "CUSTOM",
              "questions": [
                {
                  "id": "ed016b99-d06a-48c8-8005-eae1c04436a4",
                  "question": "Como o físico é ampliado pelo digital?​"
                },
                {
                  "id": "1a5e71bd-d53c-4cea-b543-f41107004143",
                  "question": "Como o físico é orquestrado pelo social?​"
                },
                {
                  "id": "44f023ba-d0e7-4d01-a7a0-1ce02dfcb0cb",
                  "question": "Como o mercado muda a partir do figital?​"
                },
                {
                  "id": "683d398f-4373-4ef1-97be-207d9b30dcf1",
                  "question": "Como você vislumbra o comportamento das pessoas, o consumo de produtos e serviços, e a experiência da jornada de clientes nesse futuro figital?​"
                },
                {
                  "id": "0f32d882-fa9a-4f7d-a994-3586f3222303",
                  "question": "Além das questões acima, que novas questões você propõe sobre o tema para serem respondidas pelos demais participantes?"
                }
              ],
              "references": [
                {
                  "description": "O mundo figital",
                  "url": "https://www.notion.so/andremneves/neg-cios-no-mundo-figital-cd89bac3fbfc4901990e06d210fb45d7"
                }
              ],
              "created_at": "2021-01-25T20:59:22.955",
              "updated_at": "2021-01-25T20:59:22.955"
            },
            {
              "id": "5f440895b7531e4f306d6f40",
              "title": "Arquitetura Microsserviços",
              "description": "Tópico de [aprendizagem] cujo foco é discutir essa maneira particular de projetar aplicativos de software como conjuntos de serviços implantáveis independentemente",
              "type": "LEARNING",
              "tier": "CUSTOM",
              "questions": [
                {
                  "id": "8ecba396-aaba-4f11-9ae3-6a8dfd8f5bda",
                  "question": "Considere a afirmação: \"Se considerarmos os aplicativos monolíticos como um conjunto de subsistemas lógicos abrangidos por um limite físico, os microsserviços são um conjunto de subsistemas independentes sem limite físico.\" Qual a sua opinião? Justifique e encontre um artigo (post) que fundamentam sua resposta e adicione ele nas referências."
                },
                {
                  "id": "0b9fa47d-545c-4f3f-b9a8-0c024ac26500",
                  "question": "Quais são as relações entre microsserviços e aplicações Twelve Factor?"
                },
                {
                  "id": "8dca7399-73f5-4f6a-9d38-e9a0e5b3a22a",
                  "question": "Quais são os relacionamentos com outros estilos de arquitetura de software?"
                },
                {
                  "id": "40116e34-bc7b-49cf-b8fe-b7048d1d51cb",
                  "question": "Não há um consenso quanto uma definição precisa desse estilo arquitetônico denominado microservices (do português, microsserviço), mas existem certas características comuns em torno da organização em torno da capacidade de negócios, implantação automatizada, inteligência nos terminais e controle descentralizado de linguagens e dados. Reflita sobre o que vocês estudou e escreva a SUA definição para o que é o estilo arquitetural microsserviços."
                }
              ],
              "references": [
                {
                  "description": "Microservices",
                  "url": "https://martinfowler.com/articles/microservices.html"
                },
                {
                  "description": "The Twelve-Factor App",
                  "url": "https://12factor.net/"
                },
                {
                  "description": "Introduction to Microservices, this is a seven‑part series of articles",
                  "url": "https://www.nginx.com/blog/introduction-to-microservices/"
                }
              ],
              "created_at": "2020-08-24T18:36:05.014",
              "updated_at": "2020-09-10T15:08:59.231"
            },
            {
              "id": "5f45550d8e0b515ca0e51a23",
              "title": "Jornada para Microservice",
              "description": "Migrar para um arquitetura de microservices pode ser uma estratégia de sucesso para sua aplicação ou pode ser um suicídio. Como escolher o caminho certo?",
              "type": "LEARNING",
              "tier": "CUSTOM",
              "questions": [
                {
                  "id": "41b1cb3b-3925-4639-8e7e-4a9fd17b45d4",
                  "question": "Qual o valor que as API's trouxeram para os negócios digitais hoje em dia? O que significa e qual a relevância do COMPROMISSO COM API's ou o termo API FIRST?"
                },
                {
                  "id": "585ed7df-4e48-435a-a2cf-9de66457fe14",
                  "question": "Qual o melhor exemplo, na sua opinião, de API's Open, ReRestrita e Privada? Como escolher qual utilizar na minha arquitetura?"
                },
                {
                  "id": "9dddd950-4ce4-4c8a-bd85-858248cada52",
                  "question": "O que faz esse tal de API Gateway? Quando utilizá-lo?"
                },
                {
                  "id": "dcfa82be-7c6d-4fd7-b41f-22443cff4b68",
                  "question": "Como fazer um bom Design de API? Qual a relação entre REST e RESTful?"
                }
              ],
              "references": [
                {
                  "description": "A pattern language for microservices",
                  "url": "https://microservices.io/patterns/index.html"
                },
                {
                  "description": "The cloud native application: Microservices with Spring Boot and Spring Cloud",
                  "url": "https://www.infoq.com/br/presentations/the-cloud-native-application-microservices-with-spring-boot-and-spring-cloud/"
                }
              ],
              "created_at": "2020-08-25T18:14:37.786",
              "updated_at": "2020-09-10T16:33:21.307"
            },
            {
              "id": "5f4fb3e2beb70b05f799d963",
              "title": "Aplicando Microsserviços",
              "description": "Os microsserviços são bons, mas também podem ser um mal se não forem concebidos adequadamente. Interpretações erradas podem levar a falhas irrecuperáveis!",
              "type": "LEARNING",
              "tier": "CUSTOM",
              "questions": [
                {
                  "id": "db4124e1-f4a9-4eb1-a0f2-232add5a106c",
                  "question": "Quais são os desafios técnicos em torno das implementações práticas de microsserviços?"
                },
                {
                  "id": "6d8802ed-35c2-4f4d-ba71-70f7d04bd766",
                  "question": "Quais são os principais conceitos e princípios dos Contratos Dirigidos ao Consumidor (CDC, do inglês Consumer Driven Contracts) e como esses conceitos e princípios se encaixam na abordagem de microsserviços?"
                },
                {
                  "id": "057c71ca-6ac9-4a66-90bd-c63574f03130",
                  "question": "Como a lei de Postel também pode ser relevante nesse cenário?"
                },
                {
                  "id": "a49b0b1a-201a-472d-ae74-9c3890543f06",
                  "question": "Quais são as principais soluções (padrões, estilos arquitetônicos, ferramentas etc.) a serem implementadas para: (a) Serviços orientados a mensagens; (b) Endpoints REST; (c) Protocolos de comunicação otimizados; (d) Documentação da API."
                }
              ],
              "references": [
                {
                  "description": "\"Microservices,\" in IEEE Software, vol. 35, no. 3, pp. 96-100, May/June 2018",
                  "url": "http://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=8354423&isnumber=8354413"
                },
                {
                  "description": "Why Segment Moved from Microservices to a Monolith",
                  "url": "https://www.programmableweb.com/news/why-segment-moved-microservices-to-monolith/else-where-web-case-study/2019/03/17"
                },
                {
                  "description": "Consumer Driven Contracts - a curated list",
                  "url": "https://gist.github.com/michaellihs/e302a4a8450ca28cbd51f56968157e45"
                },
                {
                  "description": "Robustness Principle Is WRONG? | Code Walks 061",
                  "url": "https://www.youtube.com/watch?v=1B4KjAhQJoQ"
                }
              ],
              "created_at": "2020-09-02T15:01:54.411",
              "updated_at": "2020-09-10T15:08:50.55"
            },
            {
              "id": "5f4557cfb7531e4f306d6f48",
              "title": "Casos de Uso de Microsserviços",
              "description": "Método [de trabalho] cujo foco é compartilhar experiências de casos de uso de microsserviços com o time",
              "type": "METHOD",
              "tier": "CUSTOM",
              "questions": [
                {
                  "id": "8fb00fd8-e93b-4f72-b016-592acd20a298",
                  "question": "Estabelecer os casos a serem pesquisados aqui."
                },
                {
                  "id": "793f7dad-e895-4210-9ae8-d84a8972d5e4",
                  "question": "Identificar similaridades e diferenças no que diz respeito a lições aprendidas?"
                },
                {
                  "id": "8fadc976-9625-48e3-856a-78926967b62b",
                  "question": "Identificar similaridades e diferenças no que diz respeito a desafios/obstáculos?"
                },
                {
                  "id": "77119aea-d350-40a0-a28d-8630919f13bf",
                  "question": "Identificar similaridades e diferenças no que diz respeito a propósitos/objetivos/motivação?"
                },
                {
                  "id": "b7dd6d5f-06e7-4f6b-9831-09d9c1efdb7f",
                  "question": "Identificar similaridades e diferenças no que diz respeito a métricas e gestão do sucesso?"
                }
              ],
              "references": [
                {
                  "description": "Challenge Based Learning at Windward School",
                  "url": "https://www.youtube.com/watch?v=SDp3xv-WoFw"
                },
                {
                  "description": "framework CBL",
                  "url": "https://www.challengebasedlearning.org/"
                }
              ],
              "created_at": "2020-08-25T18:26:23.061",
              "updated_at": "2020-09-10T16:34:02.816"
            },
            {
              "id": "5f591258562b4d266a3d376b",
              "title": "Lehman para MBA's",
              "description": "As leis de evolução de software são mais conhecidas por Leis de Lehman e são dividida em oito leis, onde as três primeiras leis foram apresentadas em 1974, a quarta, quinta e sexta lei foram apresentadas em 1980 e as duas últimas leis em 1996",
              "type": "LEARNING",
              "tier": "CUSTOM",
              "questions": [
                {
                  "id": "fcdc9433-ee82-4e62-bd65-7e428e85d566",
                  "question": "A Lei da Modificação Contínua (1974) versa que os softwares devem ser continuamente adaptados para não deixar de atender às necessidades para as quais foram criados. Já a Lei da Complexidade Crescente (1974) diz que à medida que o software sofre alterações, sua estrutura original passa a ser descaracterizada e sua complexidade aumenta, de modo que também aumenta gradativamente os custos de sua manutenção até o momento que a manutenção passe a se tornar inviável. Por fim, a Lei da Auto-Regulação (1974) por sua vez sugere que o software possui uma dinâmica própria definida, o que decide as tendências da manutenção, limitando o número de possíveis mudanças. Como lidar com estas 3 leis em um ciclo de vida de uma Microservice Based Architecture (ou Application)?"
                },
                {
                  "id": "bde340f6-b36f-4e03-92c7-64ae598bddec",
                  "question": "Como você vê a relação e medição de forças entre o que diz a Lei da Conservação da Estabilidade Organizacional (1980), a Lei da Conservação da Familiaridade (1980) e a Lei do Crescimento Contínuo (1980) no contexto de MBA's?"
                },
                {
                  "id": "758ecb04-f487-4496-bb14-476f9edbd02a",
                  "question": "Quais as relações diretas e indiretas entre as consequências da Lei da Qualidade Declinante Modificação Contínua (1996) e da Lei da Realimentação do Sistema (1996) no contexto de MBA's?"
                },
                {
                  "id": "eb03430f-7a4a-4ffb-a59f-2867474eae5d",
                  "question": "Com base no entendimento das 8 leis de Lehman, quero saber se a sua percepção sobre o que representa um caso de sucesso e de falha no desenvolvimento de MBA's mudou? O que representa uma falha épica, na sua opinião (justifique)?"
                }
              ],
              "references": [
                {
                  "description": "The Past, Present, and Future of Software Evolution",
                  "url": "https://plg.uwaterloo.ca/~migod/papers/2008/icsm08-fosm.pdf"
                },
                {
                  "description": "On the Evolution of Lehman’s Laws",
                  "url": "https://plg.uwaterloo.ca/~migod/papers/2013/lehmanPaper.pdf"
                },
                {
                  "description": "Lehman's laws of software evolution (Wikipedia)",
                  "url": "https://bit.ly/3bkPrlB"
                },
                {
                  "description": "As 8 leis de Lehman foram o Manifesto do século XX",
                  "url": "https://bit.ly/2EXyKk0"
                }
              ],
              "created_at": "2020-09-09T17:35:20.808",
              "updated_at": "2020-09-10T16:33:29.287"
            },
            {
              "id": "5f62627ceb9df263eb28a906",
              "title": "Escalabilidade & Elasticidade",
              "description": "Escalabilidade é uma característica de uma organização, sistema, modelo ou função que descreve sua capacidade de lidar e ter um bom desempenho sob uma carga de trabalho ou escopo maior ou em expansão. No contexto de MBAs, para escalar com sucesso, cada microsserviço individual precisa escalar individualmente e como parte de um sistema maior.",
              "type": "SYSTEM",
              "tier": "CUSTOM",
              "questions": [
                {
                  "id": "9ec4c320-81c3-442d-a0a3-9e56165b8f07",
                  "question": "Qual a relação (diferença, similaridade) entre escalabilidade e desempenho?"
                },
                {
                  "id": "2d265ca8-7913-43a4-bcde-93d847ebf80d",
                  "question": "O que é escalabilidade no contexto de MBAs e como eu faço para aplicá-la com sucesso? Cite 3 boas práticas e 3 riscos/obstáculos mais representativos na sua opinião."
                },
                {
                  "id": "a059d3a4-045d-43f3-862a-86047b72e37a",
                  "question": "Na maioria das implementações de microsserviços, os endpoints internos não são expostos externamente, eles são mantidos como serviços [privados]. Para expor um conjunto de serviços públicos, uma solução é utilizar um padrão chamado API Gateway. No que consiste este padrão e quando eu devo utilizá-lo? Dê exemplo de um cenário."
                },
                {
                  "id": "7a46197a-2015-4bfa-ae55-773049d57907",
                  "question": "Qual a relação entre escalabilidade e elasticidade e como podemos caracterizar a elasticidade no contexto de MBAs?"
                }
              ],
              "references": [
                {
                  "description": "Wiki | Escalabilidade",
                  "url": "https://pt.wikipedia.org/wiki/Escalabilidade"
                },
                {
                  "description": "ScienceDirect | Scalability",
                  "url": "https://www.sciencedirect.com/topics/computer-science/scalability"
                },
                {
                  "description": "How to break a Monolith into Microservices",
                  "url": "https://martinfowler.com/articles/break-monolith-into-microservices.html"
                },
                {
                  "description": "The Hardest Part About Microservices: Your Data",
                  "url": "https://blog.christianposta.com/microservices/the-hardest-part-about-microservices-data/"
                },
                {
                  "description": "The challenges of scaling microservices",
                  "url": "https://techbeacon.com/app-dev-testing/challenges-scaling-microservices"
                }
              ],
              "created_at": "2020-09-16T19:07:40.744",
              "updated_at": "2020-09-16T19:07:40.744"
            }
          ]
        },
        {
          "key": "MVP",
          "value": [
            {
              "id": "6064bf3478b5463fda36cd7a",
              "title": "Plano de MVP",
              "description": "atividade prática para apresentação do projeto de mvp",
              "type": "METHOD",
              "tier": "CUSTOM",
              "questions": [
                {
                  "id": "8b282386-fd2e-47e5-85fb-7c4b4eb562cd",
                  "question": "Qual o cenário escolhido para identificar oportunidades para o projeto?"
                },
                {
                  "id": "a14d5d8f-306d-4a3d-9266-f4dc7779bd78",
                  "question": "Que grupos de pessoas foram selecionados como foco para o projeto?"
                },
                {
                  "id": "653f585e-05ab-4508-9948-7394b57bc245",
                  "question": "Que oportunidade foi selecionada como foco para o projeto?"
                },
                {
                  "id": "fede8454-7ba1-49a1-b19a-cd8f00cb400c",
                  "question": "Que solução foi proposta para tratar a oportunidade?"
                },
                {
                  "id": "904c49ce-febe-495c-917a-453448df00b0",
                  "question": "Quais são os principais concorrentes ou fontes de referência da solução no mercado?"
                },
                {
                  "id": "113365ec-74cf-4a50-b434-1f7a33417c9a",
                  "question": "Quais os benefícios únicos da solução para o grupo de pessoas selecionadas para o projeto?"
                },
                {
                  "id": "d8302cad-d040-4e5a-a1f6-60549a679f5d",
                  "question": "Em que contexto a proposta de solução foi validada [quem, quando, onde, como]?"
                },
                {
                  "id": "94756563-b09f-4d5d-949e-cbdbc6ee873a",
                  "question": "Quais os resultados obtidos na validação?"
                },
                {
                  "id": "52ed88fa-2791-4625-bda9-2a3daebc69d9",
                  "question": "Quais os recursos serão necessários para produzir e operar a solução proposta?"
                }
              ],
              "references": [
                {
                  "description": "experimentos incrementais",
                  "url": "https://strateegia.blog/experimentos-incrementais-ef7d8986827747edbd97fa6c81cf0994"
                },
                {
                  "description": "estratégia mínima viável",
                  "url": "https://strateegia.blog/minimum-viable-strategy-36d1621a8c974880a9f93f3deebab1bf"
                }
              ],
              "created_at": "2021-03-31T18:28:04.981",
              "updated_at": "2021-03-31T18:28:04.981"
            },
            {
              "id": "6064bf3478b5463fda36cd7a",
              "title": "Plano de MVP",
              "description": "atividade prática para apresentação do projeto de mvp",
              "type": "METHOD",
              "tier": "CUSTOM",
              "questions": [
                {
                  "id": "8b282386-fd2e-47e5-85fb-7c4b4eb562cd",
                  "question": "Qual o cenário escolhido para identificar oportunidades para o projeto?"
                },
                {
                  "id": "a14d5d8f-306d-4a3d-9266-f4dc7779bd78",
                  "question": "Que grupos de pessoas foram selecionados como foco para o projeto?"
                },
                {
                  "id": "653f585e-05ab-4508-9948-7394b57bc245",
                  "question": "Que oportunidade foi selecionada como foco para o projeto?"
                },
                {
                  "id": "fede8454-7ba1-49a1-b19a-cd8f00cb400c",
                  "question": "Que solução foi proposta para tratar a oportunidade?"
                },
                {
                  "id": "904c49ce-febe-495c-917a-453448df00b0",
                  "question": "Quais são os principais concorrentes ou fontes de referência da solução no mercado?"
                },
                {
                  "id": "113365ec-74cf-4a50-b434-1f7a33417c9a",
                  "question": "Quais os benefícios únicos da solução para o grupo de pessoas selecionadas para o projeto?"
                },
                {
                  "id": "d8302cad-d040-4e5a-a1f6-60549a679f5d",
                  "question": "Em que contexto a proposta de solução foi validada [quem, quando, onde, como]?"
                },
                {
                  "id": "94756563-b09f-4d5d-949e-cbdbc6ee873a",
                  "question": "Quais os resultados obtidos na validação?"
                },
                {
                  "id": "52ed88fa-2791-4625-bda9-2a3daebc69d9",
                  "question": "Quais os recursos serão necessários para produzir e operar a solução proposta?"
                }
              ],
              "references": [
                {
                  "description": "experimentos incrementais",
                  "url": "https://strateegia.blog/experimentos-incrementais-ef7d8986827747edbd97fa6c81cf0994"
                },
                {
                  "description": "estratégia mínima viável",
                  "url": "https://strateegia.blog/minimum-viable-strategy-36d1621a8c974880a9f93f3deebab1bf"
                }
              ],
              "created_at": "2021-03-31T18:28:04.981",
              "updated_at": "2021-03-31T18:28:04.981"
            },
            {
              "id": "6064bf3478b5463fda36cd7a",
              "title": "Plano de MVP",
              "description": "atividade prática para apresentação do projeto de mvp",
              "type": "METHOD",
              "tier": "CUSTOM",
              "questions": [
                {
                  "id": "8b282386-fd2e-47e5-85fb-7c4b4eb562cd",
                  "question": "Qual o cenário escolhido para identificar oportunidades para o projeto?"
                },
                {
                  "id": "a14d5d8f-306d-4a3d-9266-f4dc7779bd78",
                  "question": "Que grupos de pessoas foram selecionados como foco para o projeto?"
                },
                {
                  "id": "653f585e-05ab-4508-9948-7394b57bc245",
                  "question": "Que oportunidade foi selecionada como foco para o projeto?"
                },
                {
                  "id": "fede8454-7ba1-49a1-b19a-cd8f00cb400c",
                  "question": "Que solução foi proposta para tratar a oportunidade?"
                },
                {
                  "id": "904c49ce-febe-495c-917a-453448df00b0",
                  "question": "Quais são os principais concorrentes ou fontes de referência da solução no mercado?"
                },
                {
                  "id": "113365ec-74cf-4a50-b434-1f7a33417c9a",
                  "question": "Quais os benefícios únicos da solução para o grupo de pessoas selecionadas para o projeto?"
                },
                {
                  "id": "d8302cad-d040-4e5a-a1f6-60549a679f5d",
                  "question": "Em que contexto a proposta de solução foi validada [quem, quando, onde, como]?"
                },
                {
                  "id": "94756563-b09f-4d5d-949e-cbdbc6ee873a",
                  "question": "Quais os resultados obtidos na validação?"
                },
                {
                  "id": "52ed88fa-2791-4625-bda9-2a3daebc69d9",
                  "question": "Quais os recursos serão necessários para produzir e operar a solução proposta?"
                }
              ],
              "references": [
                {
                  "description": "experimentos incrementais",
                  "url": "https://strateegia.blog/experimentos-incrementais-ef7d8986827747edbd97fa6c81cf0994"
                },
                {
                  "description": "estratégia mínima viável",
                  "url": "https://strateegia.blog/minimum-viable-strategy-36d1621a8c974880a9f93f3deebab1bf"
                }
              ],
              "created_at": "2021-03-31T18:28:04.981",
              "updated_at": "2021-03-31T18:28:04.981"
            },
            {
              "id": "6064bf3478b5463fda36cd7a",
              "title": "Plano de MVP",
              "description": "atividade prática para apresentação do projeto de mvp",
              "type": "METHOD",
              "tier": "CUSTOM",
              "questions": [
                {
                  "id": "8b282386-fd2e-47e5-85fb-7c4b4eb562cd",
                  "question": "Qual o cenário escolhido para identificar oportunidades para o projeto?"
                },
                {
                  "id": "a14d5d8f-306d-4a3d-9266-f4dc7779bd78",
                  "question": "Que grupos de pessoas foram selecionados como foco para o projeto?"
                },
                {
                  "id": "653f585e-05ab-4508-9948-7394b57bc245",
                  "question": "Que oportunidade foi selecionada como foco para o projeto?"
                },
                {
                  "id": "fede8454-7ba1-49a1-b19a-cd8f00cb400c",
                  "question": "Que solução foi proposta para tratar a oportunidade?"
                },
                {
                  "id": "904c49ce-febe-495c-917a-453448df00b0",
                  "question": "Quais são os principais concorrentes ou fontes de referência da solução no mercado?"
                },
                {
                  "id": "113365ec-74cf-4a50-b434-1f7a33417c9a",
                  "question": "Quais os benefícios únicos da solução para o grupo de pessoas selecionadas para o projeto?"
                },
                {
                  "id": "d8302cad-d040-4e5a-a1f6-60549a679f5d",
                  "question": "Em que contexto a proposta de solução foi validada [quem, quando, onde, como]?"
                },
                {
                  "id": "94756563-b09f-4d5d-949e-cbdbc6ee873a",
                  "question": "Quais os resultados obtidos na validação?"
                },
                {
                  "id": "52ed88fa-2791-4625-bda9-2a3daebc69d9",
                  "question": "Quais os recursos serão necessários para produzir e operar a solução proposta?"
                }
              ],
              "references": [
                {
                  "description": "experimentos incrementais",
                  "url": "https://strateegia.blog/experimentos-incrementais-ef7d8986827747edbd97fa6c81cf0994"
                },
                {
                  "description": "estratégia mínima viável",
                  "url": "https://strateegia.blog/minimum-viable-strategy-36d1621a8c974880a9f93f3deebab1bf"
                }
              ],
              "created_at": "2021-03-31T18:28:04.981",
              "updated_at": "2021-03-31T18:28:04.981"
            },
            {
              "id": "6064bf3478b5463fda36cd7a",
              "title": "Plano de MVP",
              "description": "atividade prática para apresentação do projeto de mvp",
              "type": "METHOD",
              "tier": "CUSTOM",
              "questions": [
                {
                  "id": "8b282386-fd2e-47e5-85fb-7c4b4eb562cd",
                  "question": "Qual o cenário escolhido para identificar oportunidades para o projeto?"
                },
                {
                  "id": "a14d5d8f-306d-4a3d-9266-f4dc7779bd78",
                  "question": "Que grupos de pessoas foram selecionados como foco para o projeto?"
                },
                {
                  "id": "653f585e-05ab-4508-9948-7394b57bc245",
                  "question": "Que oportunidade foi selecionada como foco para o projeto?"
                },
                {
                  "id": "fede8454-7ba1-49a1-b19a-cd8f00cb400c",
                  "question": "Que solução foi proposta para tratar a oportunidade?"
                },
                {
                  "id": "904c49ce-febe-495c-917a-453448df00b0",
                  "question": "Quais são os principais concorrentes ou fontes de referência da solução no mercado?"
                },
                {
                  "id": "113365ec-74cf-4a50-b434-1f7a33417c9a",
                  "question": "Quais os benefícios únicos da solução para o grupo de pessoas selecionadas para o projeto?"
                },
                {
                  "id": "d8302cad-d040-4e5a-a1f6-60549a679f5d",
                  "question": "Em que contexto a proposta de solução foi validada [quem, quando, onde, como]?"
                },
                {
                  "id": "94756563-b09f-4d5d-949e-cbdbc6ee873a",
                  "question": "Quais os resultados obtidos na validação?"
                },
                {
                  "id": "52ed88fa-2791-4625-bda9-2a3daebc69d9",
                  "question": "Quais os recursos serão necessários para produzir e operar a solução proposta?"
                }
              ],
              "references": [
                {
                  "description": "experimentos incrementais",
                  "url": "https://strateegia.blog/experimentos-incrementais-ef7d8986827747edbd97fa6c81cf0994"
                },
                {
                  "description": "estratégia mínima viável",
                  "url": "https://strateegia.blog/minimum-viable-strategy-36d1621a8c974880a9f93f3deebab1bf"
                }
              ],
              "created_at": "2021-03-31T18:28:04.981",
              "updated_at": "2021-03-31T18:28:04.981"
            },
            {
              "id": "6064bf3478b5463fda36cd7a",
              "title": "Plano de MVP",
              "description": "atividade prática para apresentação do projeto de mvp",
              "type": "METHOD",
              "tier": "CUSTOM",
              "questions": [
                {
                  "id": "8b282386-fd2e-47e5-85fb-7c4b4eb562cd",
                  "question": "Qual o cenário escolhido para identificar oportunidades para o projeto?"
                },
                {
                  "id": "a14d5d8f-306d-4a3d-9266-f4dc7779bd78",
                  "question": "Que grupos de pessoas foram selecionados como foco para o projeto?"
                },
                {
                  "id": "653f585e-05ab-4508-9948-7394b57bc245",
                  "question": "Que oportunidade foi selecionada como foco para o projeto?"
                },
                {
                  "id": "fede8454-7ba1-49a1-b19a-cd8f00cb400c",
                  "question": "Que solução foi proposta para tratar a oportunidade?"
                },
                {
                  "id": "904c49ce-febe-495c-917a-453448df00b0",
                  "question": "Quais são os principais concorrentes ou fontes de referência da solução no mercado?"
                },
                {
                  "id": "113365ec-74cf-4a50-b434-1f7a33417c9a",
                  "question": "Quais os benefícios únicos da solução para o grupo de pessoas selecionadas para o projeto?"
                },
                {
                  "id": "d8302cad-d040-4e5a-a1f6-60549a679f5d",
                  "question": "Em que contexto a proposta de solução foi validada [quem, quando, onde, como]?"
                },
                {
                  "id": "94756563-b09f-4d5d-949e-cbdbc6ee873a",
                  "question": "Quais os resultados obtidos na validação?"
                },
                {
                  "id": "52ed88fa-2791-4625-bda9-2a3daebc69d9",
                  "question": "Quais os recursos serão necessários para produzir e operar a solução proposta?"
                }
              ],
              "references": [
                {
                  "description": "experimentos incrementais",
                  "url": "https://strateegia.blog/experimentos-incrementais-ef7d8986827747edbd97fa6c81cf0994"
                },
                {
                  "description": "estratégia mínima viável",
                  "url": "https://strateegia.blog/minimum-viable-strategy-36d1621a8c974880a9f93f3deebab1bf"
                }
              ],
              "created_at": "2021-03-31T18:28:04.981",
              "updated_at": "2021-03-31T18:28:04.981"
            },
            {
              "id": "5f90732e9462da17a3e8b738",
              "title": "Equipe 01",
              "description": "Constituição e demais informações da equipe",
              "type": "SYSTEM",
              "tier": "CUSTOM",
              "questions": [
                {
                  "id": "161ac996-59c7-4a1d-a4ea-f7b1625b7b72",
                  "question": "Quais são so membros da sua equipe? Basta um dos membros informar a composição da mesma."
                },
                {
                  "id": "27124843-04f7-464f-995e-ce7cff8d70e7",
                  "question": "Já criou um repositório no github para a equipe? Informe aqui o link pra ele."
                },
                {
                  "id": "07bb720b-d457-42ba-a12c-1a0cd3ff41ee",
                  "question": "Quais os demais sistemas, serviços e/ou recursos que a equipe vai utilizar?"
                },
                {
                  "id": "0642cba8-d206-44ca-bfda-1a78ce995c80",
                  "question": "Tem alguma dúvida ou observação a fazer?"
                }
              ],
              "references": [],
              "created_at": "2020-10-21T17:43:10.928",
              "updated_at": "2021-03-31T21:20:32.22"
            },
            {
              "id": "5f907342d778cc2a56aa498b",
              "title": "Equipe 02",
              "description": "Constituição e demais informações da equipe",
              "type": "SYSTEM",
              "tier": "CUSTOM",
              "questions": [
                {
                  "id": "524bcaa1-5234-4999-9cd8-ce97159de1fa",
                  "question": "Quais são so membros da sua equipe? Basta um dos membros informar a composição da mesma."
                },
                {
                  "id": "0dd80c70-3a78-4d33-bc58-3af3955ba8c0",
                  "question": "Já criou um repositório no github para a equipe? Informe aqui o link pra ele."
                },
                {
                  "id": "5807b1b1-3dd5-489d-a122-1be02a65d047",
                  "question": "Quais os demais sistemas, serviços e/ou recursos que a equipe vai utilizar?"
                },
                {
                  "id": "49957eeb-eec5-4706-b8cd-e72c524a29e7",
                  "question": "Tem alguma dúvida ou observação a fazer?"
                }
              ],
              "references": [],
              "created_at": "2020-10-21T17:43:30.308",
              "updated_at": "2021-03-31T21:20:51.891"
            },
            {
              "id": "5f90734d9462da17a3e8b739",
              "title": "Equipe 03",
              "description": "Constituição e demais informações da equipe",
              "type": "SYSTEM",
              "tier": "CUSTOM",
              "questions": [
                {
                  "id": "063ae380-a7a0-462f-9a9d-b277d49e4e4e",
                  "question": "Quais são so membros da sua equipe? Basta um dos membros informar a composição da mesma."
                },
                {
                  "id": "dcd80798-f6be-4c42-aea6-be4e95eea081",
                  "question": "Já criou um repositório no github para a equipe? Informe aqui o link pra ele."
                },
                {
                  "id": "3cac08dc-0fa3-4cfc-b4db-0587b03e9ffa",
                  "question": "Quais os demais sistemas, serviços e/ou recursos que a equipe vai utilizar?"
                },
                {
                  "id": "f51d4742-92ee-43bf-b7bb-49ac1c33aab6",
                  "question": "Tem alguma dúvida ou observação a fazer?"
                }
              ],
              "references": [],
              "created_at": "2020-10-21T17:43:41.718",
              "updated_at": "2021-03-31T21:21:07.198"
            },
            {
              "id": "5f907359d778cc2a56aa498c",
              "title": "Equipe 04",
              "description": "Constituição e demais informações da equipe",
              "type": "SYSTEM",
              "tier": "CUSTOM",
              "questions": [
                {
                  "id": "b2be5eed-a2db-4e07-9377-7a7f0ae5d559",
                  "question": "Quais são so membros da sua equipe? Basta um dos membros informar a composição da mesma."
                },
                {
                  "id": "d728e240-cda6-4145-bf8d-a852ae4439c4",
                  "question": "Já criou um repositório no github para a equipe? Informe aqui o link pra ele."
                },
                {
                  "id": "97c2afcb-feeb-4db7-817b-2558fd8c4065",
                  "question": "Quais os demais sistemas, serviços e/ou recursos que a equipe vai utilizar?"
                },
                {
                  "id": "bb835949-73b9-4a55-a92a-059f872da89a",
                  "question": "Tem alguma dúvida ou observação a fazer?"
                }
              ],
              "references": [],
              "created_at": "2020-10-21T17:43:53.217",
              "updated_at": "2021-03-31T21:21:21.967"
            }
          ]
        }
      ]
    },
    {
      "key": "Testes",
      "value": [
        {
          "key": "Mapa 1",
          "value": [
            {
              "id": "5e3863690a49146ae5a55051",
              "title": "diagnóstico",
              "description": "Método [de trabalho] para identificar status do negócio",
              "type": "METHOD",
              "tier": "OFFICIAL",
              "questions": [
                {
                  "id": "ba2123e5-86bf-46f1-95fd-62d6b85d4638",
                  "question": "Quando o negócio começou?"
                },
                {
                  "id": "de977b38-bb13-457f-95ad-7dca6ea145d4",
                  "question": "Existe um produto ou serviço desenvolvido? O que é?"
                },
                {
                  "id": "d71fefc4-eaea-478c-b019-209a42ff8cfb",
                  "question": "O produto ou serviço foi avaliado no mercado? Quem avaliou e como?"
                },
                {
                  "id": "e031d4b9-c7b0-474c-9b14-68a8b47c45ad",
                  "question": "O negócio já faturou? Quantos clientes e de onde são?"
                },
                {
                  "id": "b81e9185-cc02-4c41-b11d-06729e8635b6",
                  "question": "Existe uma equipe? Qual o tamanho e formação?"
                },
                {
                  "id": "de25a0be-c0cc-4014-8414-cadacc4a5f67",
                  "question": "O negócio já recebeu algum tipo de investimento externo?"
                },
                {
                  "id": "d03188c7-a038-4f80-a9b9-cdb6c6248374",
                  "question": "Existe alguma especificidade jurídica para o negócio funcionar? Está resolvido?"
                }
              ],
              "references": [
                {
                  "description": "STARTUPS CONNECTED: diagnóstico",
                  "url": "bit.ly/2uNHDaK"
                },
                {
                  "description": "tipos de startups e níveis de maturidade",
                  "url": "bit.ly/2FNbWkb"
                }
              ],
              "created_at": "2020-02-03T18:16:09.401",
              "updated_at": "2020-08-27T15:48:34.775"
            },
            {
              "id": "6071a50078b5463fda36cd97",
              "title": "testes",
              "description": "testes",
              "type": "METHOD",
              "tier": "CUSTOM",
              "questions": [
                {
                  "id": "cd180c8b-0b11-47b9-ba55-3d0d6450aa63",
                  "question": "testes"
                },
                {
                  "id": "a8162991-e184-4cfa-88f0-5b4b48d240be",
                  "question": "teste2"
                },
                {
                  "id": "ab9db664-8869-4603-9de5-c095babcde76",
                  "question": "teste3"
                }
              ],
              "references": [
                {
                  "description": "testes",
                  "url": "http://testes.com.br"
                }
              ],
              "created_at": "2021-04-10T13:15:44.49",
              "updated_at": "2021-04-10T13:15:44.49"
            }
          ]
        }
      ]
    }
  ];

  const auxDataList = dataList;

  useEffect(() => {
    setLabName(dataList[0].key);
  }, []);

  function handleIndex(index) {
    console.log(index);

    seteventKeyIndex(index.toString());
  }

  function handleTab(labName, index) {
    setLabName(labName);
    setTab(index);
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

      console.log(response);

    } catch (err) {
      alert('Erro no cadastro, tente novamente.');
    }

  }

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }
    
  

  return (
    <div className="profile-container">
      <header>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ButtonGroup>
        {
          auxDataList.map((projects, index) => (
            <Button onClick={e => handleTab(projects.key, index)} >{projects.key}</Button>
          ))
        }
      </ButtonGroup>

      <Accordion>
        {dataList[tab].value.map((kit, index) => (
            <Card>
            <Card.Header>
              <button onClick={e => ImportToTrello(kit.key, kit.value)} type="button">
                <FiTrello size={18} color="#E02041" />
              </button>
              <Accordion.Toggle as={Button} variant="link" eventKey={eventKeyIndex} onClick={e => handleIndex(index.toString())}>
                {kit.key}
              </Accordion.Toggle>
            </Card.Header>
            { kit.value.map( questions => (
              <Accordion.Collapse eventKey={eventKeyIndex}>
              <Card.Body>{questions.title}</Card.Body>
              </Accordion.Collapse>
            )) }
          </Card>
        ))} 
      </Accordion>
    </div>
  );
}