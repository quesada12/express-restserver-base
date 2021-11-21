const {Router} = require('express');
const {check} = require('express-validator');

const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto } = require('../controllers/productos');

const { existeCategoriaPorID, existeProductoPorID } = require('../helpers/db-validators');
const { validarJWT,validarCampos, esAdminRol } = require('../middlewares');


const router = Router();


//Crear producto - private - cualquier rol 
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','Debe ingresar una categoria válida').isMongoId(),
    check('categoria').custom(existeCategoriaPorID),
    validarCampos
],crearProducto);


//Obtener Productos - public
router.get('/',obtenerProductos);

//Obtener Producto por id - public
router.get('/:id',[
    check('id','Debe ingresar un id válido').isMongoId(),
    check('id').custom(existeProductoPorID),
    validarCampos
],obtenerProducto);

//Actualizar producto - private - cualquier rol 
router.put('/:id',[
    validarJWT,
    check('id','Debe ingresar un id válido').isMongoId(),
    check('id').custom(existeProductoPorID),
    validarCampos
],actualizarProducto);

//Eliminar producto - private - solo Admin
router.delete('/:id',[
    validarJWT,
    esAdminRol,
    check('id','Debe ingresar un id válido').isMongoId(),
    check('id').custom(existeProductoPorID),
    validarCampos
],borrarProducto);


module.exports = router;