import { defineEventHandler, getQuery, readBody, createError } from 'h3';
import logger from '../../utils/logger';

let tasks = [
  {
    id: 1,
    title: 'Première tâche',
    description: 'Description de la première tâche',
    completed: 'pending',
  },
];

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;
  console.log('method', method);

  try {
    if (method === 'GET') {
      logger.info('📢 Récupération des tâches');
      return tasks;
    }

    if (method === 'POST') {
      console.log('event', event);
      const body = (event.node.req as any).body || (await readBody(event));
      logger.info(`📢 Création d'une nouvelle tâche : ${body.title}`);

      if (!body.title) {
        logger.error('⛔ Erreur : Titre requis');
        throw createError({ statusCode: 400, statusMessage: 'Titre requis' });
      }

      const newTask = { id: tasks.length + 1, ...body };
      tasks.push(newTask);
      logger.info(`✅ Nouvelle tâche ajoutée : ${newTask.title}`);
      console.log('newTask', newTask);
      return newTask;
    }

    if (method === 'PUT') {
      const body = (event.node.req as any).body || (await readBody(event));
      if (!body.title) {
        logger.error('⛔ Erreur : Titre requis');
        throw createError({ statusCode: 400, statusMessage: 'Titre requis' });
      }

      const index = tasks.findIndex((task) => task.id === body.id);
      if (index !== -1) tasks[index] = body;
      return tasks[index];
    }

    if (method === 'DELETE') {
      const { id } = (event.node.req as any).query || getQuery(event);

      if (!id) {
        logger.error('⛔ Erreur : ID requis');
        throw createError({ statusCode: 400, statusMessage: 'ID requis' });
      }
      tasks = tasks.filter((task) => task.id !== Number(id));
      return { message: 'Task deleted' };
    }
  } catch (error: any) {
    logger.error(`⛔ Erreur 1: ${error.message}`);
    return {
      statusCode: error.statusCode || 500,
      message: error.statusMessage || 'Erreur serveur',
    };
  }
});
