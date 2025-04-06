<template>
  <section class="task-container">
    <img src="/effitask_logo.png"
alt="EffiTask Logo"
width="100"
class="logo" />
    <!-- Formulaire pour ajouter une tâche -->
    <form @submit.prevent="addTask" class="grid task-form">
      <input v-model="newTask"
placeholder="Ajouter une nouvelle tâche"
required
class="input" />
      <input v-model="newTaskDate"
type="date"
required
class="input" />
      <input v-model="newTaskTime"
type="time"
required
class="input" />
      <button type="submit" class="contrast-button">
        <strong>Ajouter</strong>
      </button>
    </form>

    <!-- Liste des tâches -->
    <ul class="task-list">
      <li v-for="task in tasks" :key="task.id" class="task-item">
        <article class="task-card">
          <div class="task-content">
            <!-- Titre de la tâche -->
            <h2
              :class="{
                'task-completed': task.completed,
              }"
            >
              {{ task.title }}
            </h2>

            <!-- Date et Heure -->
            <h6>{{ formatDateTime(task.date, task.time) }}</h6>

            <!-- Description -->
            <textarea
              v-model="task.description"
              @blur="updateTask(task)"
              class="input-small"
              rows="1"
              cols="30"
            ></textarea>
          </div>

          <!-- Boutons sur une seule ligne -->
          <div class="task-buttons">
            <button @click="editTask(task.id)" class="button secondary">
Modifier
</button>
            <button @click="deleteTask(task.id)" class="button outline">
Supprimer
</button>
            <button @click="completeTask(task)" class="button success">
Terminer
</button>
          </div>
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
  status: string;
  date: string;
  time: string;
  completed: boolean;
}

const tasks = ref<Task[]>([]);
const newTask = ref('');
const newTaskDate = ref('');
const newTaskTime = ref('');

const loadTasks = async () => {
  try {
    const response = await fetch('/api/tasks');
    const data = await response.json();
    tasks.value = data || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches', error);
  }
};

const addTask = async () => {
  if (newTask.value.trim() === '' || !newTaskDate.value || !newTaskTime.value) return;
  const newTaskData = {
    title: newTask.value.trim(),
    description: '',
    date: newTaskDate.value,
    time: newTaskTime.value,
  };

  try {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTaskData),
    });
    const data = await response.json();
    tasks.value.unshift(data);
    newTask.value = newTaskDate.value = '';
    newTaskTime.value = '';
  } catch (error) {
    console.error("Erreur lors de l'ajout de la tâche", error);
  }
};

const deleteTask = async (taskId: number) => {
  try {
    const response = await fetch(`/api/tasks?id=${taskId}`, { method: 'DELETE' });
    if (response.ok) {
      tasks.value = tasks.value.filter((task) => task.id !== taskId);
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de la tâche', error);
  }
};

const updateTask = async (task: Task) => {
  try {
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
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la tâche', error);
  }
};

const completeTask = (task: Task) => {
  task.completed = true;
  const completedTaskIndex = tasks.value.indexOf(task);
  if (completedTaskIndex > -1) {
    tasks.value.splice(completedTaskIndex, 1);
    tasks.value.push(task);
  }
  updateTask(task);
};

const editTask = (taskId: number) => {
  // Logique d'édition si nécessaire
};

const formatDateTime = (date: string, time: string) => {
  const dateObj = new Date(`${date}T${time}`);
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} à ${hours}h${minutes}`;
};

onMounted(loadTasks);
</script>

<style scoped>
/* Background and text color */
body {
  background-color: #121212;
  color: #f0f0f0;
}

h1 {
  font-family: 'Times New Roman', serif;
  color: #ffffff;
  margin-bottom: 2rem;
}

.task-container {
  padding: 2rem;
  align-items: center;
  justify-content: center;
}

.task-form {
  grid-template-columns: 1fr 1fr 1fr auto;
  gap: 1rem;
  margin-bottom: 2rem;
}

.input {
  padding: 0.75rem;
  background-color: #333;
  border: 1px solid #444;
  border-radius: 5px;
  color: #fff;
  font-family: 'Times New Roman', serif;
}

button {
  padding: 0.75rem;
  border-radius: 5px;
  cursor: pointer;
}

.contrast-button {
  display: inline-block;
  padding: 0.6rem 1.2rem;
  background-color: #ffd700;
  color: #000;
  text-decoration: none;
  border-radius: 6px;
  font-weight: bold;
  transition: background-color 0.3s ease;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
}

button.secondary {
  background-color: #018786;
  color: #fff;
}

button.outline {
  background-color: transparent;
  border: 1px solid #f44336;
  color: #f44336;
}

button.success {
  background-color: #4caf50;
  color: #fff;
}

.task-list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Trois tâches par ligne */
  gap: 1rem;
}

.task-item {
  display: flex;
  justify-content: space-between;
}

.task-card {
  padding: 1rem;
  border: 1px solid #444;
  border-radius: 0.5rem;
  background: #1f1f1f;
  transition: background 0.3s ease;
}

.task-card:hover {
  background: #333;
}

.task-select {
  padding: 0.5rem;
  background-color: #333;
  border: 1px solid #444;
  border-radius: 5px;
  color: #fff;
}

/* Style pour les tâches terminées */
.task-completed {
  color: #4caf50;
}

.task-buttons {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.task-buttons button {
  font-size: 0.85rem; /* Ajuster la taille des boutons */
  padding: 0.5rem;
}

h2 {
  font-size: 1rem;
  margin-bottom: 1rem;
  color: #ffd700;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #ffd700;
}

.logo {
  margin-left: auto;
  margin-right: auto;
  display: block;
  margin-bottom: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
}

.input-small {
  width: fit-content; /* Ajuste la largeur selon vos besoins */
  height: auto; /* Permet la hauteur flexible pour les lignes supplémentaires */
  padding: 0.8rem; /* Réduit l'espace intérieur de l'input */
  font-size: 0.875rem; /* Réduit la taille du texte */
  resize: vertical; /* Permet à l'utilisateur de redimensionner verticalement */
  border-radius: 5px; /* Arrondir les bords pour une meilleure esthétique */
  background-color: #333; /* Couleur de fond pour une meilleure lisibilité */
  border: 1px solid #444; /* Bordure pour le champ */
  color: #fff; /* Texte en blanc */
}
</style>
