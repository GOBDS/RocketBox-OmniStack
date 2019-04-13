const express = require('express');
const app = express();

const mongose = require('mongoose')

const path = require('path');

const cors = require('cors');

app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
    socket.on('connectionRoom', box => {
        socket.join(box);
    });
});

mongose.connect('mongodb+srv://omnistack:omnistack@omnistack-lt2vu.mongodb.net/test?retryWrites=true', {
    useNewUrlParser: true
});

app.use((req, res) => {
    req.io = io;
    return next();
});

// Utiliza o 'use' para adicionar modulos
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

//Para não pegar o modulo do 'node_modules' tem que usar o './'
app.use(require('./routes'))

server.listen(process.env.PORT || 8080);