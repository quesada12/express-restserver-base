const express = require('express')
const cors = require('cors')


class Server{

    constructor() {
        //Crea el server
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Middlewares
        this.middlewares();


        //Crean las rutas
        this.routes();

    }

    middlewares(){

        //CORS
        this.app.use(cors());

        //Directorio Publico
        this.app.use(express.static('public'));

        //Parse del Body
        this.app.use(express.json());
        
    }


    routes(){

        this.app.use(this.usuariosPath,require('../routes/usuarios'));

    }

    listen(){

        this.app.listen(this.port, () => {
            console.log(`Server listening at ${this.port}`)
        })
    }



}

module.exports = Server;