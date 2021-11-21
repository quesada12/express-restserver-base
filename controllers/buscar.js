const { response } = require("express");
const {ObjectId} = require('mongoose').Types;
const {Usuario,Categoria,Producto} = require('../models')

const coleccionesPermitidas = [
    'categorias',
    'productos',
    'roles',
    'usuarios',
];

const buscarUsuarios = async( termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: {
                total: 1,
                usuario: (usuario) ? [usuario] : []
            }
            
        })
    }

    const regex = new RegExp(termino, 'i');

    const usuarios = await Usuario.find({ 
        $or:[{ nombre:regex },{ correo:regex }],
        $and:[{ estado:true }]
     });

     const total = await Usuario.count({ 
        $or:[{ nombre:regex },{ correo:regex }],
        $and:[{ estado:true }]
     });

    res.json({
        results:{ total, usuarios}
    })

}

const buscarCategorias = async( termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: {
                total: 1,
                categoria: (categoria) ? [categoria] : []
            }
            
        })
    }

    const regex = new RegExp(termino, 'i');

    const categorias = await Categoria.find({ 
        $and:[{ estado:true },{ nombre: regex}]
     });

     const total = await Categoria.count({ 
        $and:[{ estado:true },{ nombre: regex}]
     });

    res.json({
        results:{ total, categorias}
    })

}

const buscarProductos = async( termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID) {
        const producto = await Producto.findById(termino).populate('categoria','nombre');
        return res.json({
            results: {
                total: 1,
                producto: (producto) ? [producto] : []
            }
            
        })
    }

    const regex = new RegExp(termino, 'i');

    const productos = await Producto.find({ 
        $and:[{ estado:true },{ nombre: regex}]
     }).populate('categoria','nombre');

     const total = await Producto.count({ 
        $and:[{ estado:true },{ nombre: regex}]
     });

    res.json({
        results:{ total, productos}
    })

}


const buscar = (req, res=response) => {

    try {
        
        const {coleccion, termino} = req.params;
    
        if (!coleccionesPermitidas.includes(coleccion)) {
            return res.status(400).json({
                msg:`Las colecciones permitidas son ${coleccionesPermitidas}`
            })
        }
    
        switch (coleccion) {
            case 'usuarios':
                buscarUsuarios(termino,res);
                break;
            case 'categorias':
                buscarCategorias(termino,res);
                break;
            case 'productos':
                buscarProductos(termino,res);
                break;
        
            default:
                res.status(500).json({
                    msg:'Coleccion no creada en búsqueda'
                })
                
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Comuniquese con el administrador'
        })
    }

}

module.exports = {
    buscar
}

