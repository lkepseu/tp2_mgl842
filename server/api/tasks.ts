// server/tasks.ts
import { defineEventHandler, readBody, getQuery } from 'h3';

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

// API pour récupérer toutes les tâches
export default defineEventHandler(async (event) => {
  const method = event.node.req.method;
  const query = getQuery(event);

  if (method === 'GET') {
    return tasks; // Retourner toutes les tâches
  }

  if (method === 'POST') {
    // Ajouter une nouvelle tâche
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
    return newTask;
  }

  if (method === 'DELETE') {
    // Supprimer une tâche par ID
    const taskId = Number(query.id);
    tasks = tasks.filter((task) => task.id !== taskId);
    return { message: `Tâche ${taskId} supprimée` };
  }

  if (method === 'PUT') {
    // Mettre à jour une tâche
    const body = await readBody(event);
    const taskIndex = tasks.findIndex((task) => task.id === body.id);

    if (taskIndex !== -1) {
      tasks[taskIndex] = { ...tasks[taskIndex], ...body };
      return tasks[taskIndex];
    }
    return { error: 'Tâche non trouvée' };
  }

  return { error: 'Méthode non supportée' };
});
