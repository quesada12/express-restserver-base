require('dotenv').config();
const Server = require('./models/server');

//Instancia del Server y inicializarlo

const server = new Server();

server.listen();



