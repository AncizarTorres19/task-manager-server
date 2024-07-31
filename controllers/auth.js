// controllers/auth.js
const { response } = require('express');
// Bcrypt
const bcrypt = require('bcryptjs');
// JWT
const { generarJWT } = require('../helpers/jwt');
// Prisma
const prisma = require('../database/config');

//Crear un nuevo usuario
const createUser = async (req, res = response) => {
    try {
        const { email, password } = req.body;

        // Verificar si el email existe
        const existeEmail = await prisma.user.findUnique({ where: { email } });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        const passwordEncriptada = bcrypt.hashSync(password, salt);

        // Guardar usuario en BD usando Prisma
        const user = await prisma.user.create({
            data: {
                ...req.body,
                password: passwordEncriptada,
            }
        });

        // Generar el JWT
        const token = await generarJWT(user.id, user.name);

        res.json({
            ok: true,
            msg: 'register',
            user,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};

//Login
const loginUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        // Verificar si el email existe
        const usuarioDB = await prisma.user.findUnique({ where: { email } });

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        };

        // Validar el password
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password no válido'
            });
        };

        // Generar el JWT
        const token = await generarJWT(usuarioDB.id, usuarioDB.name);

        res.json({
            ok: true,
            msg: 'login',
            user: usuarioDB,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};

//Revalidar token
const revalidarToken = async (req, res = response) => {

    const { uid, name } = req;

    //Generar el JWT
    const token = await generarJWT(uid, name);

    //Obtener el usuario por el uid con Prisma
    const user = await prisma.user.findUnique({ where: { id: uid } });

    res.json({
        ok: true,
        msg: 'renew',
        token,
        user
    });
};

module.exports = {
    createUser,
    loginUser,
    revalidarToken
};