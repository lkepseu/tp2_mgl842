// tests/test.ts
import { describe, it, expect, beforeEach, vi, test } from 'vitest';
import { mount } from '@vue/test-utils';
import TaskList from '../../../components/TaskList.vue';

import { defineEventHandler, readBody } from 'h3';
import logger from '../../../utils/logger';
import taskHandler from '../../../server/api/tasks'; // Importe ton API

vi.stubGlobal(
  'fetch',
  vi.fn((url, options) => {
    if (options && options.method === 'POST') {
      return Promise.resolve({
        ok: true,
        json: async () => ({
          id: 3,
          title: 'Task 3',
          description: 'Description of Task 3',
          completed: 'pending',
        }),
      });
    }
    return Promise.resolve({
      ok: true,
      json: async () => [
        {
          id: 1,
          title: 'Task 1',
          description: 'Task description',
          completed: 'pending',
        },
        {
          id: 2,
          title: 'Task 2',
          description: 'Task description',
          completed: 'pending',
        },
      ],
    });
  }),
);

describe('TaskList', () => {
  it('GET / should render a list of tasks', () => {
    const tasks = [
      {
        id: 1,
        title: 'Task 1',
        description: 'Description of Task 1',
        completed: 'pending',
      },
      {
        id: 2,
        title: 'Task 2',
        description: 'Description of Task 2',
        completed: 'pending',
      },
    ];
    const wrapper = mount(TaskList, {
      props: { tasks },
    });
    const taskItems = wrapper.findAll('li');

    // Check if the number of task items is correct
    expect(taskItems.length).toBe(2);
    // Check if the task items are rendered correctly
    expect(taskItems[0].find("input[type='text']").element.value).toBe('Task 1');
    expect(taskItems[1].find("input[type='text']").element.value).toBe('Task 2');
  });

  // it('POST / should add a new task', async () => {
  //     // Tâches initiales
  //     const tasks = [
  //         { id: 1, title: 'Task 1', description: 'Description of Task 1', completed: 'pending' },
  //         { id: 2, title: 'Task 2', description: 'Description of Task 2', completed: 'pending' },
  //     ];
  //
  //     // Mock de la fonction fetch pour simuler l'ajout d'une nouvelle tâche
  //     global.fetch = vi.fn(() =>
  //         Promise.resolve({
  //             ok: true,
  //             json: () =>
  //                 Promise.resolve({
  //                     id: 3,
  //                     title: 'Task 3',
  //                     description: 'Description of Task 3',
  //                     completed: 'pending',
  //                 }),
  //         })
  //     ) as any;
  //
  //     // Monte le composant avec les tâches initiales
  //     const wrapper = mount(TaskList, {
  //         props: { tasks },
  //     });
  //
  //     // Trouve l'élément input pour la nouvelle tâche et simule une saisie
  //     const input = wrapper.find('input[placeholder="Ajouter une nouvelle tâche"]');
  //     expect(input.exists()).toBe(true); // Vérifie que l'élément input existe
  //
  //     // Simule la saisie dans l'input
  //     await input.setValue('Task 3');
  //
  //     // Simule l'envoi du formulaire
  //     await wrapper.find('form').trigger('submit.prevent');
  //
  //     // Vérifie que la tâche a été ajoutée
  //     const taskItems = wrapper.findAll('li');
  //     expect(taskItems.length).toBe(4); // Vérifie qu'il y a maintenant 3 tâches
  //
  //     // Vérifie que la nouvelle tâche apparaît dans la liste
  //     const newTaskItem = taskItems[2]; // La nouvelle tâche devrait être la troisième
  //     expect(newTaskItem.find('input[type="text"]').element.value).toBe('Task 3');
  // });
});
