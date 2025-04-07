// tests/unit/api/server-tasks.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import handler from '../../../server/api/tasks';

let mockEvent: any;

const createEvent = (method: string, body = {}, query = {}) => ({
  node: {
    req: {
      method,
      headers: {
        'content-type': 'application/json',
      },
    },
  },
  context: {},
  body,
  query,
});

// Simule la fonction readBody
vi.mock('h3', async () => {
  const actual = await vi.importActual('h3');
  return {
    ...actual,
    readBody: (event) => Promise.resolve(event.body),
    getQuery: (event) => event.query,
  };
});

describe('API Handler - /api/tasks', () => {
  beforeEach(() => {
    // Reset base des tâches pour chaque test
    mockEvent = null;
  });

  it('GET - should return all tasks', async () => {
    mockEvent = createEvent('GET');
    const result = await handler(mockEvent);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('POST - should add a new task', async () => {
    const body = {
      title: 'Nouvelle tâche test',
      description: 'Test desc',
      date: '2025-04-07',
      time: '09:00',
    };
    mockEvent = createEvent('POST', body);

    const result = await handler(mockEvent as any);
    expect(result).toHaveProperty('id');
    expect(result.title).toBe(body.title);
    expect(result.status).toBe('pending');
    expect(result.completed).toBe(false);
  });

  it('DELETE - should remove a task by ID', async () => {
    // D'abord, ajoutons une tâche pour s'assurer que l'ID existe
    const addEvent = createEvent('POST', {
      title: 'Tâche à supprimer',
      date: '2025-04-06',
      time: '15:00',
    });
    const added = await handler(addEvent);

    // Ensuite on la supprime
    const deleteEvent = {
      node: { req: { method: 'DELETE' } },
      context: {},
      query: { id: String(added.id) },
    };

    const result = await handler(deleteEvent);
    expect(result).toHaveProperty('message');
    expect(result.message).toContain(`Tâche ${added.id} supprimée`);
  });

  it('PUT - should update a task', async () => {
    // Ajouter une tâche à mettre à jour
    const added = await handler(
      createEvent('POST', {
        title: 'Tâche à mettre à jour',
        description: '',
        date: '2025-04-06',
        time: '15:30',
      }),
    );

    const updatedFields = {
      id: added.id,
      title: 'Tâche mise à jour',
      completed: true,
    };

    const updateEvent = createEvent('PUT', updatedFields);

    const result = await handler(updateEvent);
    expect(result.title).toBe('Tâche mise à jour');
    expect(result.completed).toBe(true);
  });

  it('PUT - should return error if task not found', async () => {
    const updateEvent = createEvent('PUT', {
      id: 9999,
      title: 'Does not exist',
    });

    const result = await handler(updateEvent);
    expect(result).toHaveProperty('error');
    expect(result.error).toBe('Tâche non trouvée');
  });

  it('Unknown method - should return error', async () => {
    const unknownEvent = createEvent('PATCH');
    const result = await handler(unknownEvent);
    expect(result).toHaveProperty('error');
    expect(result.error).toBe('Méthode non supportée');
  });
});
