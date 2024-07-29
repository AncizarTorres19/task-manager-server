// controllers/taskController.js
const { response } = require('express');
// Prisma
const prisma = require('../database/config');

//Obtener todas las tareas
const getTasks = async (req, res = response) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json({
      ok: true,
      msg: 'Tasks fetched',
      tasks
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tasks' });
  }
};

//Obtener una tarea por Usuario
const getTaskByIdUser = async (req, res = response) => {
  const { id } = req.params;
  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId: Number(id)
      }
    });
    res.json({
      ok: true,
      msg: 'Tasks fetched',
      tasks
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tasks' });
  }
}

//Crear una tarea
const createTask = async (req, res = response) => {

  const { description, userId, priority, name } = req.body;

  // Verificar si el usuario existe
  const usuarioDB = await prisma.user.findUnique({ where: { id: userId } });

  console.log(usuarioDB);
  if (!usuarioDB) {
    return res.status(404).json({
      ok: false,
      msg: 'Usuario no encontrado'
    });
  };

  try {
    const task = await prisma.task.create({
      data: {
        description,
        name,
        priority,
        userId,
      }
    });
    res.json({
      ok: true,
      msg: 'Task created',
      task
    });
  } catch (error) {
    res.status(500).json({ error: 'Error creating task' });
  }
};

//Actualizar una tarea
const updateTask = async (req, res = response) => {
  const { id } = req.params;
  const { name, description, priority, enabled } = req.body;
  try {
    const task = await prisma.task.update({
      where: { id: Number(id) },
      data: { name, description, priority, enabled }
    });
    res.json({
      ok: true,
      msg: 'Task updated',
      task
    });
  } catch (error) {
    res.status(500).json({ error: 'Error updating task' });
  }
};

//Eliminar una tarea
const deleteTask = async (req, res = response) => {
  const { id } = req.params;
  try {
    await prisma.task.delete({
      where: { id: Number(id) }
    });
    res.json({
      ok: true,
      msg: 'Task deleted',
    });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting task' });
  }
};

module.exports = {
  getTasks,
  getTaskByIdUser,
  createTask,
  updateTask,
  deleteTask
};
