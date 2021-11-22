const {Router} = require('express');
const {check} = require('express-validator');

const { cargarArchivo, actualizarImgCloudinary, mostrarImagenCloudinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');
const { validarArchivoSubir,validarCampos } = require('../middlewares');


const router = Router();

router.post('/',validarArchivoSubir,cargarArchivo)

router.put('/:coleccion/:id',[
    check('id','Debe ser ID válido').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c,['usuarios','productos'])),
    validarArchivoSubir,
    validarCampos
],actualizarImgCloudinary)

router.get('/:coleccion/:id',[
    check('id','Debe ser ID válido').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],mostrarImagenCloudinary)


module.exports = router;