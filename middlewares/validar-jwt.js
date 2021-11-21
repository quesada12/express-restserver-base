const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async(req=request,res=response,next) => {

    const token = req.header('x-token');
    
    if (!token) {
        return res.status(401).json({
            msg:"No hay token en la petición"
        })
    }

    try {

        const {uid} = jwt.verify(token,process.env.SECRETORPRIVATEKEY);

        //Cargar el usuario
        const usuario  = await Usuario.findById(uid);


        //Usuario no existe 
        if (!usuario) {
            return res.status(401).json({
                msg:"Token no válido"
            })
        }

        //Verificar si el usuario esta activo
        if (!usuario.estado) {
            return res.status(401).json({
                msg:"Token no válido"
            })
        }
        
        //Pasa el uid para el controlador 
        req.usuario = usuario;
        
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:"Token no válido"
        })
    }

}

module.exports = {
    validarJWT
}