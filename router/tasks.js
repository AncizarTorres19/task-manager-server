//router/tasks.js
const { Router } = require('express');
const { check } = require('express-validator');

// Controllers
const { getTasks, getTaskByIdUser, createTask, updateTask, deleteTask } = require('../controllers/tasks');

// Middlewares
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//Obtener todas las tareas
router.get('/', validarJWT, getTasks);

//Obtener una tarea por id
router.get('/:id', validarJWT, getTaskByIdUser);

//Crear una tarea
router.post('/', [
    //middlewares
    check('description', 'La descripción es obligatoria').not().isEmpty(),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('priority', 'La prioridad es obligatoria').not().isEmpty(),
    check('userId', 'El usuario es obligatorio').not().isEmpty(),
    validarJWT
], createTask);

//Actualizar una tarea
router.put('/:id', [
    //middlewares
    check('description', 'La descripción es obligatoria').not().isEmpty(),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('priority', 'La prioridad es obligatoria').not().isEmpty(),
    check('enabled', 'El estado es obligatorio').not().isEmpty(),
    validarJWT
], updateTask);

//Eliminar una tarea
router.delete('/:id', validarJWT, deleteTask);

module.exports = router;