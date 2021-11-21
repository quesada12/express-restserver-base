const {Router} = require('express');
const {check} = require('express-validator');

const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login',[
    check('correo','Debe ingresar un correo válido').isEmail(),
    check('password','La constraseña es obligatoria').not().isEmpty(),
    validarCampos
],login);


module.exports = router;