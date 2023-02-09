import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


let clients = [];
let facts = [];


function eventsHandler(request, response, next) {
    const headers = {
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache'
    };
    response.writeHead(200, headers);

    const data = JSON.stringify(facts);

    response.write(data);

    const clientId = Date.now();

    const newClient = {
      id: clientId,
      response
    };

    clients.push(newClient);

    request.on('close', () => {
      console.log(`${clientId} Connection closed`);
      clients = clients.filter(client => client.id !== clientId);
    });
  }
  app.get('/events', eventsHandler);


  function sendEventsToAll(newFact) {
    clients.forEach(client => client.response.write(JSON.stringify(newFact)))
  }

  async function addFact(request, respsonse, next) {
    const newFact = request.body;
    facts.push(newFact);
    respsonse.json(newFact)
    return sendEventsToAll(newFact);
  }
  app.post('/fact', addFact);


app.get('/status', (request, response) => response.json({clients: clients.length}));


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Facts Events service listening at http://localhost:${PORT}`)
})
