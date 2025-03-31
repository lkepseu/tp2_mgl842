<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Liste des tâches</h1>

    <!-- Formulaire pour ajouter une tâche -->
    <form @submit.prevent="addTask" class="flex gap-2 mb-4">
      <input
        v-model="newTask"
        placeholder="Ajouter une nouvelle tâche"
        required
        class="border p-2 rounded w-full"
      />
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Ajouter</button>
    </form>

    <!-- Liste des tâches -->
    <ul>
      <li
        v-for="task in tasks"
        :key="task.id"
        class="flex items-center justify-between p-3 bg-gray-100 rounded-lg mb-2 shadow"
      >
        <div class="flex items-center space-x-3">
          <!-- Sélecteur de statut -->
          <select v-model="task.completed" @change="updateTask(task)" class="border p-1 rounded">
            <option value="pending">En attente</option>
            <option value="in progress">En cours</option>
            <option value="done">Terminée</option>
          </select>

          <!-- Champ de texte -->
          <input
            type="text"
            v-model="task.title"
            @blur="updateTask(task)"
            :disabled="isEditing !== task.id"
            class="border p-1 rounded flex-grow"
          />

          <!-- Boutons d'action -->
          <button @click="editTask(task.id)" class="text-yellow-500">✏ Modifier</button>
          <button @click="deleteTask(task.id)" class="text-red-500">❌ Supprimer</button>
        </div>
      </li>
    </ul>
  </div>
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

// Charger les tâches depuis l'API
const loadTasks = async () => {
  const response = await fetch(`/api/tasks`);
  if (response.ok) {
    tasks.value = (await response.json()) as Task[];
  } else {
    console.error('Erreur lors de la récupération des tâches');
  }
};

// Ajouter une tâche
const addTask = async () => {
  if (newTask.value.trim() === '') return;
  const newTaskData = { title: newTask.value.trim(), description: '', completed: 'pending' };

  const response = await fetch('/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTaskData),
  });

  if (response.ok) {
    const addedTask = (await response.json()) as Task;
    tasks.value.push(addedTask);
    newTask.value = '';
  } else {
    console.error("Erreur lors de l'ajout de la tâche");
  }
};

// Supprimer une tâche
const deleteTask = async (taskId: number) => {
  const response = await fetch(`/api/tasks?id=${taskId}`, { method: 'DELETE' });

  if (response.ok) {
    tasks.value = tasks.value.filter((task) => task.id !== taskId);
  } else {
    console.error('Erreur lors de la suppression de la tâche');
  }
};

// Mettre à jour une tâche (titre ou statut)
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

// Activer l'édition
const editTask = (taskId: number) => {
  isEditing.value = taskId;
};

onMounted(loadTasks);
</script>

<style scoped>
h1 {
  font-size: 2rem;
}

input {
  padding: 5px;
  margin: 5px;
}

button {
  padding: 5px;
  margin: 5px;
  cursor: pointer;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

li {
  margin-bottom: 10px;
}
</style>
