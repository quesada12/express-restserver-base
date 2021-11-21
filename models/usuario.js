const {Schema,model} = require('mongoose');

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: [true,'Nombre obligatorio'],
    },

    correo: {
        type: String,
        required: [true,'Correo obligatorio'],
        unique: true
    },

    password: {
        type: String,
        required: [true,'Password obligatorio'],
    },

    img: {
        type: String,
    },

    rol: {
        type: String,
        required: true,
        emun : ['ADMIN_ROLE','USER_ROLE']
    },

    estado: {
        type: Boolean,
        default: true
    },

    google: {
        type: Boolean,
        default: false
    }

});

//Tiene q ser funcion normal para el uso del this
UsuarioSchema.methods.toJSON = function() {
    const {__v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id
    return usuario;
}


module.exports = model('Usuario',UsuarioSchema);