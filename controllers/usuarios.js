const {request, response} = require('express')


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

const usuariosPost = (req, res=response) => {

    //Body
    const {nombre,edad} = req.body;

    res.json({
        msg:'post API',
        nombre,
        edad
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