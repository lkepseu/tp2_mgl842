<template>
  <main>
    <img
      src="/effitask_logo.png"
      alt="EffiTask Logo"
      width="200"
      class="logo"
    />
    <h1>Your Task Manager</h1>
    <p>Welcome to EffiTask! A simple tool to manage your daily tasks efficiently.</p>
    <p>
      <a href="/tasks" class="btn-link">Go to Task Dashboard</a>
    </p>
  </main>
</template>

<script setup>
// No JS needed for now
</script>

<style scoped>
template, html, body, #__nuxt, main {
  height: 100%;
  text-align: center;
  padding: 2rem;
  background-color: #000000;
  color: #f5f5f5;
  font-family: 'Times New Roman', serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  display: block;
  margin-bottom: 2rem;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #ffd700;
}

p {
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.btn-link {
  display: inline-block;
  padding: 0.6rem 1.2rem;
  background-color: #ffd700;
  color: #000;
  text-decoration: none;
  border-radius: 6px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.btn-link:hover {
  background-color: #f1c40f;
}
</style>
