// Servidor de Express
const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        // Http server
        this.server = http.createServer(this.app);

    }

    middlewares() {
        // Desplegar el directorio público
        this.app.use(express.static(path.resolve(__dirname, '../public')));

        // CORS
        this.app.use(cors());
        // Parseo del body
        this.app.use(express.json());

        //API Endpoints
        this.app.use('/api/login', require('../router/auth'));
        this.app.use('/api/tasks', require('../router/tasks'));
    }

    execute() {

        // Inicializar Middlewares
        this.middlewares();

        // Inicializar Server
        this.server.listen(this.port, () => {
            console.log('Server corriendo en puerto:', this.port);
        });
    }

}


module.exports = Server;