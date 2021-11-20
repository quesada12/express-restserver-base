const {request, response} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const usuario = require('../models/usuario');

//Query Params Como verlos
// const {hola,musica,apikey=129392} = req.query;


const usuariosGet = async (req=request, res=response) => {

    const { limite = 5 , desde = 0 } = req.query;
   
    //Para hacer las dos consultas al mismo tiempo porq no son dependientes
    const [total,usuarios] = await Promise.all([
        Usuario.countDocuments({estado:true}),
        Usuario.find({estado:true})
        .limit(Number(limite)) //Parse porq son string
        .skip(Number(desde))
    ])

    res.json({
        total,
        usuarios
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

    res.json(usuario)
}


const usuariosPut = async (req, res=response) => {

    //Params
    const {id} = req.params;
    
    const {_id, password,google,correo, ...resto} = req.body;

    //Validar si quiere cambiar pass
    if (password) {
        const salt = bcryptjs.genSaltSync();
        //Asignar el nuevo pass al resto de props
        resto.password = bcryptjs.hashSync(password,salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto,{new: true}); //new true, devuelve objeto actualizado

    res.json(usuario)
}


const usuariosPatch = (req, res=response) => {
    res.json({
        msg:'patch API'
    })
}
const usuariosDelete = async (req, res=response) => {

    const {id} = req.params;

    //FISICAMENTE
    // const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});

    res.json({
        usuario
    })
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}