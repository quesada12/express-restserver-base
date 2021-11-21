const { response } = require("express")

const esAdminRol = (req,res=response, next) => {

    if (!req.usuario) {
        return res.status(500).json({
            msg:'Verificar el rol sin verificar el token'
        })
    }

    const usuario = req.usuario;

    if (usuario.rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg:`El usuario ${usuario.nombre} no es administrador`
        })
    }

    next();
}


//Recibe una lista y valida si puede ingresar
const tieneRol = ( ...roles ) => {

    //Como recibe parametros debe retornar la fx q se usaría normalmente
    return (req, res=response, next) => {

        if (!req.usuario) {
            return res.status(500).json({
                msg:'Verificar el rol sin verificar el token'
            })
        }

        if ( !roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg:`El servicio requiere uno de estos roles ${roles}`
            })
        }


        next();
    }

}

module.exports = {
    esAdminRol,
    tieneRol

}