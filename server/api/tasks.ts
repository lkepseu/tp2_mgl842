import { defineEventHandler, getQuery, readBody } from 'h3'

let tasks = [
    { id: 1, title: 'Première tâche', description: 'Description de la première tâche', status: 'pending' }
]

export default defineEventHandler(async (event) => {
    const method = event.node.req.method

    if (method === 'GET') {
        return tasks
    }

    if (method === 'POST') {
        const body = await readBody(event)
        const newTask = { id: tasks.length + 1, ...body }
        tasks.push(newTask)
        return newTask
    }

    if (method === 'PUT') {
        const body = await readBody(event)
        const index = tasks.findIndex((task) => task.id === body.id)
        if (index !== -1) tasks[index] = body
        return tasks[index]
    }

    if (method === 'DELETE') {
        const { id } = getQuery(event)
        tasks = tasks.filter((task) => task.id !== Number(id))
        return { message: 'Task deleted' }
    }
})
