<template>
  <section>
    <h1 class="text-center">
📋 Liste des tâches
</h1>

    <!-- Ajout d'une tâche -->
    <form
      @submit.prevent="addTask"
      class="grid"
      style="grid-template-columns: 1fr auto; gap: 1rem; margin-bottom: 2rem"
    >
      <input v-model="newTask"
placeholder="Ajouter une nouvelle tâche"
required
class="input" />
      <button type="submit" class="contrast">
Ajouter
</button>
    </form>

    <!-- Liste -->
    <ul class="task-list">
      <li v-for="task in tasks" :key="task.id" class="task-item">
        <article class="grid" style="grid-template-columns: 1fr auto auto; align-items: center">
          <div class="grid" style="grid-template-columns: auto 1fr; gap: 1rem">
            <!-- Statut -->
            <select v-model="task.completed" @change="updateTask(task)">
              <option value="pending">
En attente
</option>
              <option value="in progress">
En cours
</option>
              <option value="done">
Terminée
</option>
            </select>

            <!-- Titre -->
            <input
              type="text"
              v-model="task.title"
              @blur="updateTask(task)"
              :disabled="isEditing !== task.id"
              class="input"
            />
          </div>

          <!-- Boutons -->
          <button @click="editTask(task.id)" class="secondary">
✏ Modifier
</button>
          <button @click="deleteTask(task.id)" class="outline">
❌ Supprimer
</button>
        </article>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: string;
}

const props = defineProps<{ tasks: Task[] }>();

const tasks = ref<Task[]>(props.tasks || []);
const newTask = ref('');
const isEditing = ref<number | null>(null);

const loadTasks = async () => {
  try {
    const response = await fetch('/api/tasks');
    const data = await response.json();
    tasks.value = data as Task[];
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches', error);
  }
};

const addTask = async () => {
  if (newTask.value.trim() === '') return;
  const newTaskData = {
    title: newTask.value.trim(),
    description: '',
    completed: 'pending',
  };

  try {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTaskData),
    });
    const data = await response.json();
    tasks.value.push(data);
    newTask.value = '';
  } catch (error) {
    console.error("Erreur lors de l'ajout de la tâche", error);
  }
};

const deleteTask = async (taskId: number) => {
  const response = await fetch(`/api/tasks?id=${taskId}`, { method: 'DELETE' });

  if (response.ok) {
    tasks.value = tasks.value.filter((task) => task.id !== taskId);
  } else {
    console.error('Erreur lors de la suppression de la tâche');
  }
};

const updateTask = async (task: Task) => {
  const response = await fetch('/api/tasks', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });

  if (response.ok) {
    console.log(`Tâche mise à jour : ${task.title}`);
  } else {
    console.error('Erreur lors de la mise à jour de la tâche');
  }

  isEditing.value = null;
};

const editTask = (taskId: number) => {
  isEditing.value = taskId;
};

onMounted(loadTasks);
</script>

<style scoped>
h1 {
  margin-bottom: 2rem;
  font-family: 'Times New Roman', serif;
}

.task-list {
  list-style: none;
  padding: 0;
}

.task-item {
  margin-bottom: 1rem;
}

input,
select {
  font-family: 'Times New Roman', serif;
}

article {
  padding: 1rem;
  border: 1px solid #dcdcdc;
  border-radius: 0.5rem;
  background: #f5f5f5;
  transition: all 0.2s ease;
}

article:hover {
  background: var(#e0e0e0);
}
</style>
