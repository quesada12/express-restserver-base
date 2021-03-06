
const {Usuario,Role,Categoria,Producto} = require('../models')

const esRolValido =  async (rol='') => {
    const existeRol = await Role.findOne({rol})
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la BD`)
    }
}

const existeEmail = async (correo='') => {
    const existeEmail = await Usuario.findOne({correo});
    if (existeEmail) {
        throw new Error(`El email ya se encuentra registrado`)
    }
}

const existeUsuarioPorID = async (id='') => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id ${id} no existe`)
    }
}

const existeCategoriaPorID = async (id ='') => {

    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`La categoria con el id ${id} no existe`)
    }

}


const existeProductoPorID = async (id ='') => {

    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error(`El producto con el id ${id} no existe`)
    }

}

const coleccionesPermitidas = (coleccion='',coleccionesPermitidas=[]) => {

    if (!coleccionesPermitidas.includes(coleccion)) {
        throw new Error(`La colección ${coleccion} no es permitida`)
    }

    return true;
}

module.exports = {
    esRolValido,
    existeEmail,
    existeUsuarioPorID,
    existeCategoriaPorID,
    existeProductoPorID,
    coleccionesPermitidas
}