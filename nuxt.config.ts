
import { defineNuxtConfig } from 'nuxt/config';
import PrimeVue from 'primevue/config';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';

export default defineNuxtConfig({
  plugins: [{ src: '~/plugins/primevue.js', mode: 'client' }],
  app: {
    head: {
      title: 'EffiTask - Application de gestion de tâches',
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.amber.min.css',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap',
        },
      ],
    },
  },
  nitro: {
    preset: 'vercel'
  },

  compatibilityDate: '2025-04-06',
});
