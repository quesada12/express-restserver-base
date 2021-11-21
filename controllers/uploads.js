const { response } = require("express");
const { model } = require("mongoose");
const { subirArchivo } = require("../helpers");

const { Usuario, Producto} = require('../models')


const cargarArchivo = async (req, res=response) => {

    //Consulta si hay archivos

    try {

        //Textp
        // const nombre = await subirArchivo(req.files,['txt'],'textos')
        //Img ruta
        // const nombre = await subirArchivo(req.files,undefined,'imgs');

        //Imagenes
        const nombre = await subirArchivo(req.files)
        
        res.json({
            nombre
        })
        
    } catch (msg) {
        res.status(400).json({
            msg
        })
    }


}

const actualizarImg = async (req, res=response) => {

    const {id, coleccion} = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg:`No existe un usuario con el ID ${id}`
                })
            }
        break;

        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg:`No existe un producto con el ID ${id}`
                })
            }
        break;
    
        default:
            return res.status(500).json({
                msg:'No he validado esta coleccion en imgs'
            });
    }

    const nombre = await subirArchivo(req.files,undefined,coleccion);
    modelo.img = nombre;

    await modelo.save();


    res.json(modelo)

}

module.exports = {
    cargarArchivo,
    actualizarImg
}