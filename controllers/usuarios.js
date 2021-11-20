const {request, response} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const usuariosGet = (req=request, res=response) => {

    //Query Params
    const {hola,musica,apikey=129392} = req.query;

    res.json({
        msg:'get API',
        hola,
        musica,
        apikey
    })
}

const usuariosPost = async (req, res=response) => {

    //Body
    const {nombre, correo, password, rol} = req.body;

    //Crea instancia
    const usuario = new Usuario({nombre,correo,password,rol});

    //Encriptar password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);

    //Guarda DB
    await usuario.save();

    res.json({
        usuario
    })
}

const usuariosPut = (req, res=response) => {

    //Params
    const id = req.params.id;

    res.json({
        msg:'put API',
        id
    })
}
const usuariosPatch = (req, res=response) => {
    res.json({
        msg:'patch API'
    })
}
const usuariosDelete = (req, res=response) => {
    res.json({
        msg:'delete API'
    })
}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}