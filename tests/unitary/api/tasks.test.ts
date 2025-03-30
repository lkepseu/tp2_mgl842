// tests/test.ts
import {describe, expect, test, vi} from 'vitest'
import { defineEventHandler, readBody } from 'h3'
import logger from '../../../utils/logger'
import taskHandler from '../../../server/api/tasks'; // Importe ton API

vi.stubGlobal('fetch', vi.fn((url, options) => {
    if(options && options.method === 'GET') {
        return Promise.resolve({
            ok: true,
            json: async () => [{ id: 1, title: 'Première tâche', description: 'Description de la première tâche', completed: 'pending' }],
        });
    }
    if (options && options.method === 'POST') {
        return Promise.resolve({
            ok: true,
            json: async () => ({ id: 3, title: 'Task 3', description: 'Description of Task 3', completed: 'pending' }),
        });
    }
    if (options && options.method === 'PUT') {
        return Promise.resolve({
            ok: true,
            json: async () => ({ id: 1, title: 'Tâche modifiée', description: 'Mise à jour', completed: 'done' }),
        });
    }
    if (options && options.method === 'DELETE') {
        return Promise.resolve({
            ok: true,
            json: async () => ({ message: 'Task deleted' }),
        });
    }
    return Promise.resolve({
        ok: true,
        json: async () => [{ id: 1, title: 'Task 1', description: 'Task description', completed: 'pending' }],
    });
}));

let tasks = [
    { id: 1, title: 'Première tâche', description: 'Description de la première tâche', completed: 'pending' }
]

describe('Unitary Tests', () => {
    // Create some unit tests here
    test('GET / Should get the list of tasks', async () => {
        const event = {
            node: {
                req: { method: 'GET' }
            }
        } as any;
        const result = await fetch('/api/tasks', { method: 'GET' });
        const data = await result.json();
        console.log("result : ", data);
        expect(data).toStrictEqual(tasks);
    })

    test('POST / Should add a new task', async () => {
        const event = {
            node: {
                req: {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: { title: 'Nouvelle tâche', description: 'Test', completed: 'pending' } as any
                }
            }
        } as any;
        const result = await fetch (
            '/api/tasks',
            { method: 'POST', body: JSON.stringify({ title: 'Task 3', description: 'Description of Task 3', completed: 'pending' }) }
        );
        const data = await result.json();
        console.log("result : ", data);
        expect(data).toStrictEqual({ id: 3, title: 'Task 3', description: 'Description of Task 3', completed: 'pending' });
    })

    test('PUT / Should update an existing task', async () => {
        const event = {
            node: {
                req: {
                    method: 'PUT',
                    headers: { 'content-type': 'application/json' },
                    body: { id: 1, title: 'Tâche modifiée', description: 'Mise à jour', completed: 'done' } as any
                }
            }
        } as any;
        const result = await fetch(
            '/api/tasks',
            { method: 'PUT', body: JSON.stringify({ id: 1, title: 'Tâche modifiée', description: 'Mise à jour', completed: 'done' }) }
        );
        const data = await result.json();
        console.log("result : ", data);
        expect(data).toStrictEqual({ id: 1, title: 'Tâche modifiée', description: 'Mise à jour', completed: 'done' });

})

    test('DELETE / Should delete a task', async () => {
        const event = {
            node: {
                req: {
                    method: 'DELETE',
                    query: { id: 1 } as any
                }
            }
        } as any;

        const result = await fetch('/api/tasks', { method: 'DELETE', body: JSON.stringify({ id: 1 }) });
        const data = await result.json();
        console.log("result : ", data);
        expect(data).toStrictEqual({ message: 'Task deleted' });
    })
});