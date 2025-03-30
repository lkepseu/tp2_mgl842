// tests/test.ts
import {describe, expect, test} from 'vitest'
import { defineEventHandler, readBody } from 'h3'
import logger from '../../../utils/logger'
import taskHandler from '../../../server/api/tasks'; // Importe ton API

let tasks = [
    { id: 1, title: 'Première tâche', description: 'Description de la première tâche', completed: 'pending' }
]

describe('Unitary Tests', () => {
    // Create some unit tests here
    test('GET / Should get the list of tasks', async () => {
        const event = { node: { req: { method: 'GET' } } } as any;
        const result = await taskHandler(event)
        console.log("result : ", result)
        expect(result).toStrictEqual(tasks)
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
        const result = await taskHandler(event);
        console.log("result : ", result);
        expect(result?.title).toStrictEqual(event.node.req.body.title);
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
        const result = await taskHandler(event);
        console.log("result : ", result);
        expect(result).toStrictEqual(event.node.req.body);
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

        const result = await taskHandler(event)
        expect(result).toStrictEqual({ message: 'Task deleted' })
    })
});