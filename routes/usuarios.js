const {Router} = require('express');
const {check} = require('express-validator');

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');

const { esRolValido, existeEmail, existeUsuarioPorID } = require('../helpers/db-validators');

const { validarCampos, validarJWT, esAdminRol, tieneRol } = require('../middlewares')


const router = Router();

router.get('/',[
    check('limite','El limite debe ser un numero').isNumeric(),
    check('desde','Desde debe ser un numero').isNumeric(),
    validarCampos
], usuariosGet);

//Params
router.put('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPut);


router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe ser más de 6 letras').isLength({min:6}),
    check('correo','El correo no es válido').isEmail(),
    check('correo').custom(existeEmail),
    //Validacion Manual
    // check('rol','No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRolValido),
    validarCampos
],usuariosPost);


router.patch('/', usuariosPatch);

router.delete('/:id',[
    validarJWT,
    // esAdminRol,
    tieneRol('ADMIN_ROLE','VENTAS_ROLE'),
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    validarCampos
], usuariosDelete);




module.exports = router;