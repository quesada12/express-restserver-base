const {Router} = require('express');
const {check} = require('express-validator');

const { cargarArchivo, actualizarImg } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');
const { validarArchivoSubir,validarCampos } = require('../middlewares');


const router = Router();

router.post('/',validarArchivoSubir,cargarArchivo)

router.put('/:coleccion/:id',[
    check('id','Debe ser ID válido').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c,['usuarios','productos'])),
    validarArchivoSubir,
    validarCampos
],actualizarImg)


module.exports = router;