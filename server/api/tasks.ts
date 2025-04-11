import { defineEventHandler, readBody, getQuery } from 'h3';
import logger from '~/utils/logger';

let tasks = [
  {
    id: 1,
    title: 'Tâche 1',
    description: 'Description de la tâche 1',
    status: 'pending',
    date: '2025-04-06',
    time: '10:00',
    completed: false,
  },
  {
    id: 2,
    title: 'Tâche 2',
    description: 'Description de la tâche 2',
    status: 'pending',
    date: '2025-04-06',
    time: '11:00',
    completed: false,
  },
  {
    id: 3,
    title: 'Tâche 3',
    description: 'Description de la tâche 3',
    status: 'pending',
    date: '2025-04-06',
    time: '12:00',
    completed: false,
  },
];

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;
  const query = getQuery(event);

  logger.info(`[API][TASKS] Requête ${method} reçue`);

  if (method === 'GET') {
    try {
      logger.info(`[TASKS][GET] Récupération de ${tasks.length} tâche(s)`);
      return tasks;
    } catch (err) {
      logger.error(`[TASKS][GET] Erreur : ${err}`);
      return { error: 'Erreur lors de la récupération des tâches' };
    }
  }

  if (method === 'POST') {
    try {
      const body = await readBody(event);
      const newTask = {
        id: tasks.length + 1,
        title: body.title,
        description: body.description || '',
        status: 'pending',
        date: body.date,
        time: body.time,
        completed: false,
      };
      tasks.unshift(newTask);
      logger.info(`[TASKS][POST] Tâche ajoutée : ${newTask.title} (ID: ${newTask.id})`);
      return newTask;
    } catch (err) {
      logger.error(`[TASKS][POST] Erreur lors de l'ajout : ${err}`);
      return { error: 'Erreur lors de la création de la tâche' };
    }
  }

  if (method === 'DELETE') {
    try {
      const taskId = Number(query.id);
      const initialLength = tasks.length;
      tasks = tasks.filter((task) => task.id !== taskId);
      const deleted = initialLength !== tasks.length;

      if (deleted) {
        logger.warn(`[TASKS][DELETE] Tâche supprimée : ID ${taskId}`);
        return { message: `Tâche ${taskId} supprimée` };
      } else {
        logger.error(`[TASKS][DELETE] Tâche introuvable : ID ${taskId}`);
        return { error: `Tâche ${taskId} introuvable` };
      }
    } catch (err) {
      logger.error(`[TASKS][DELETE] Erreur : ${err}`);
      return { error: 'Erreur lors de la suppression de la tâche' };
    }
  }

  if (method === 'PUT') {
    try {
      const body = await readBody(event);
      const taskIndex = tasks.findIndex((task) => task.id === body.id);

      if (taskIndex !== -1) {
        const updatedTask = { ...tasks[taskIndex], ...body };
        tasks[taskIndex] = updatedTask;
        logger.info(`[TASKS][PUT] Tâche mise à jour : ID ${body.id}`);
        return updatedTask;
      } else {
        logger.error(`[TASKS][PUT] Tâche non trouvée : ID ${body.id}`);
        return { error: 'Tâche non trouvée' };
      }
    } catch (err) {
      logger.error(`[TASKS][PUT] Erreur : ${err}`);
      return { error: 'Erreur lors de la mise à jour de la tâche' };
    }
  }

  logger.warn(`[API][TASKS] Méthode HTTP non supportée : ${method}`);
  return { error: 'Méthode non supportée' };
});
