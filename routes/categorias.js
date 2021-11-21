const {Router} = require('express');
const {check} = require('express-validator');

const { obtenerCategorias, crearCategoria, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorID } = require('../helpers/db-validators');
const { validarJWT,validarCampos, esAdminRol } = require('../middlewares');


const router = Router();

//Obtener categorias - public
router.get('/',obtenerCategorias);

//Obtener categorias por id - public
router.get('/:id',[
    check('id','Debe ingresar un id válido').isMongoId(),
    check('id').custom(existeCategoriaPorID),
    validarCampos
],obtenerCategoria);

//Crear categoria - private - cualquier rol 
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearCategoria);

//Actualizar categoria - private - cualquier rol 
router.put('/:id',[
    validarJWT,
    check('id','Debe ingresar un id válido').isMongoId(),
    check('id').custom(existeCategoriaPorID),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],actualizarCategoria);

//Eliminar categoria - private - solo Admin
router.delete('/:id',[
    validarJWT,
    esAdminRol,
    check('id','Debe ingresar un id válido').isMongoId(),
    check('id').custom(existeCategoriaPorID),
    validarCampos
],borrarCategoria);


module.exports = router;