const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server{

    constructor() {
        //Crea el server
        this.app = express();
        this.port = process.env.PORT;


        this.paths = {
            auth: '/api/auth',
            usuarios: '/api/usuarios',
            categorias: '/api/categorias',
        }

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

        this.app.use(this.paths.auth,require('../routes/auth'));
        this.app.use(this.paths.usuarios,require('../routes/usuarios'));
        this.app.use(this.paths.categorias,require('../routes/categorias'));

    }

    listen(){

        this.app.listen(this.port, () => {
            console.log(`Server listening at ${this.port}`)
        })
    }



}

module.exports = Server;