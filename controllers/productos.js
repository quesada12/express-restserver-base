const { response, json } = require("express");
const {Producto, Categoria} = require('../models');


const crearProducto = async (req,res=response) => {

    const {nombre,estado,usuario, ...data} = req.body
    const nombreU = nombre.toUpperCase();

    //Consultar si existe
    const productoDB = await Producto.findOne({nombre});

    if (productoDB) {
        return res.status(400).json({
            msg:`La categoría ${productoDB.nombre} ya existe`
        })
    }

    //Guardar en BD

    const d = {
        nombre:nombreU,
        usuario: req.usuario._id,
        ...data
    }

    const producto =  new Producto(d);
    await producto.save();

    res.status(201).json( producto )

}

const obtenerProductos = async (req,res = response) => {

    try {

        const { limite = 5 , desde = 0 } = req.query;
   
        //Para hacer las dos consultas al mismo tiempo porq no son dependientes
        const [total,productos] = await Promise.all([
            Producto.countDocuments({estado:true}),
            Producto.find({estado:true})
            .populate('usuario','nombre')
            .populate('categoria','nombre')
            .limit(Number(limite)) //Parse porq son string
            .skip(Number(desde))
        ])

        res.json({
            total,
            productos
        })
        
    } catch (error) {
        console.log(error)
        res.status(500),json({
            msg: 'Favor contacte al administrador'
        })
    }

}

const obtenerProducto = async (req, res = response) => {
    try {

        const { id } = req.params;
   
        const producto = await Producto.findById(id)
            .populate('usuario','nombre')
            .populate('categoria','nombre')

        if (!producto.estado) {
            return res.status(400).json({
                msg: 'No existe el producto'
            })
        }

        res.json(
            producto
        )
        
    } catch (error) {
        console.log(error)
        res.status(500),json({
            msg: 'Favor contacte al administrador'
        })
    }
}

const actualizarProducto= async (req,res=response) => {

    try {
        
        const {id} = req.params
        const {estado, usuario, ...body} = req.body;

        if (body.nombre) {
            body.nombre = body.nombre.toUpperCase();
        }

        if (body.precio) {
            body.precio = Number(body.precio)
        }

        if (body.categoria) {
            const categoria = await Categoria.findById(body.categoria);
            if (!categoria) {
                return res.status(400).json({
                    msg:`La categoria no es válida`
                })
            }
        }
    
        const producto = await Producto.findByIdAndUpdate(id,{
            ...body,
            usuario: req.usuario._id
        },{new:true})
            .populate('usuario','nombre')
            .populate('categoria','nombre')
    
        return res.json(producto)

    } catch (error) {
        console.log(error)
        res.status(500),json({
            msg: 'Favor contacte al administrador'
        })
    }

}

const borrarProducto = async (req,res=response) => {

    try {
        
        const {id} = req.params;
    
        const producto = await Producto.findByIdAndUpdate(id,{estado:false},{new:true})
    
        res.json(producto)

    } catch (error) {
        console.log(error)
        res.status(500),json({
            msg: 'Favor contacte al administrador'
        })
    }


}


module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}