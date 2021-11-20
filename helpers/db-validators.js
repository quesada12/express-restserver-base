const Role = require('../models/role');
const Usuario = require('../models/usuario');

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

module.exports = {
    esRolValido,
    existeEmail
}