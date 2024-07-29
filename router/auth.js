//router/auth.js
const { Router } = require('express');
const { check } = require('express-validator');

// Controllers
const { createUser, revalidarToken, loginUser } = require('../controllers/auth');

// Middlewares
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//Crear un nuevo usuario
router.post('/new', [
    //middlewares
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], createUser);

//Login
router.post('/', [
    //middlewares
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], loginUser);

//Revalidar token
router.get('/renew', [
    //middlewares
    validarJWT
], revalidarToken);


module.exports = router;