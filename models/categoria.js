const {Schema,model} = require('mongoose');

const CategoriaSchema = Schema({

    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },

    estado:{
        type: Boolean,
        default: true,
        required: true
    },

    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

});

//Tiene q ser funcion normal para el uso del this
CategoriaSchema.methods.toJSON = function() {
    const {__v, estado, ...categoria} = this.toObject();
    return categoria;
}


module.exports = model('Categoria',CategoriaSchema);