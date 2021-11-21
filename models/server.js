const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server{

    constructor() {
        //Crea el server
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        //Conectar DB
        this.conectarDB();

        //Middlewares
        this.middlewares();


        //Crean las rutas
        this.routes();

    }

    async conectarDB(){
        await dbConnection();
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

        this.app.use(this.authPath,require('../routes/auth'));
        this.app.use(this.usuariosPath,require('../routes/usuarios'));

    }

    listen(){

        this.app.listen(this.port, () => {
            console.log(`Server listening at ${this.port}`)
        })
    }



}

module.exports = Server;