const { response } = require("express");
const {Categoria} = require('../models');


const crearCategoria = async (req,res=response) => {

    const nombre = req.body.nombre.toUpperCase();

    //Consultar si existe
    const categoriaDB = await Categoria.findOne({nombre});

    if (categoriaDB) {
        return res.status(400).json({
            msg:`La categoría ${categoriaDB.nombre} ya existe`
        })
    }

    //Guardar en BD

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria =  new Categoria(data);
    await categoria.save();

    res.status(201).json( categoria )

}

const obtenerCategorias = async (req,res = response) => {

    try {

        const { limite = 5 , desde = 0 } = req.query;
   
        //Para hacer las dos consultas al mismo tiempo porq no son dependientes
        const [total,categorias] = await Promise.all([
            Categoria.countDocuments({estado:true}),
            Categoria.find({estado:true})
            .populate('usuario','nombre')
            .limit(Number(limite)) //Parse porq son string
            .skip(Number(desde))
        ])

        res.json({
            total,
            categorias
        })
        
    } catch (error) {
        console.log(error)
        res.status(500),json({
            msg: 'Favor contacte al administrador'
        })
    }

}

const obtenerCategoria = async (req, res = response) => {
    try {

        const { id } = req.params;
   
        const categoria = await Categoria.findById(id).populate('usuario','nombre');

        if (!categoria.estado) {
            return res.status(400).json({
                msg: 'No existe la categoría'
            })
        }

        res.json(
            categoria
        )
        
    } catch (error) {
        console.log(error)
        res.status(500),json({
            msg: 'Favor contacte al administrador'
        })
    }
}

const actualizarCategoria = async (req,res=response) => {

    try {
        
        const {id} = req.params
        const nombre = req.body.nombre.toUpperCase();
    
        const categoriaDB = await Categoria.findOne({nombre});
    
        if (categoriaDB) {
            return res.status(400).json({
                msg: `Ya existe una categoría ${categoriaDB.nombre} registrada`
            })
        }
    
        //TODO: ACTUALIZAR EN LA BD
    
        const categoria = await Categoria.findByIdAndUpdate(id,{
            nombre,
            usuario: req.usuario._id
        },{new:true}).populate('usuario','nombre')
    
        return res.json(categoria)

    } catch (error) {
        console.log(error)
        res.status(500),json({
            msg: 'Favor contacte al administrador'
        })
    }

}

const borrarCategoria = async (req,res=response) => {

    try {
        
        const {id} = req.params;
    
        const categoria = await Categoria.findByIdAndUpdate(id,{estado:false},{new:true})
    
        res.json(categoria)

    } catch (error) {
        console.log(error)
        res.status(500),json({
            msg: 'Favor contacte al administrador'
        })
    }


}


module.exports = {
    obtenerCategorias,
    crearCategoria,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}