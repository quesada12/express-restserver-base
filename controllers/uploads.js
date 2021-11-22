const path = require('path')
const fs = require('fs')

const cloudinary = require('cloudinary').v2 
cloudinary.config(process.env.CLOUDINARY_URL);


const { response } = require("express");
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

    //Limpiar imgs previas
    if (modelo.img) {
        const pathImagen = path.join(__dirname,'../uploads/',coleccion,modelo.img);
        if (fs.existsSync(pathImagen)) {
            fs.unlinkSync(pathImagen)
        }
    }


    const nombre = await subirArchivo(req.files,undefined,coleccion);
    modelo.img = nombre;

    await modelo.save();

    res.json(modelo)

}

const actualizarImgCloudinary = async (req, res=response) => {

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

    //Limpiar imgs previas
    if (modelo.img) {
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[nombreArr.length - 1];
        const [public_id] = nombre.split('.');
        cloudinary.uploader.destroy(public_id);
    }

    const {tempFilePath} = req.files.archivo
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath);

    modelo.img = secure_url;

    await modelo.save();

    res.json(modelo)

}


const mostrarImagen = async (req, res=response) => {

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

    //Limpiar imgs previas
    if (modelo.img) {
        const pathImagen = path.join(__dirname,'../uploads/',coleccion,modelo.img);
        if (fs.existsSync(pathImagen)) {
            return res.sendFile(pathImagen)
        }
    }

    res.sendFile(path.join(__dirname,'../assets/no-image.jpeg'));
}

const mostrarImagenCloudinary = async (req, res=response) => {

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

    //Limpiar imgs previas
    if (modelo.img) {
        return res.json({
            img:modelo.img
        })
    }

    res.sendFile(path.join(__dirname,'../assets/no-image.jpeg'));
}


module.exports = {
    cargarArchivo,
    actualizarImg,
    mostrarImagen,
    actualizarImgCloudinary,
    mostrarImagenCloudinary
}