import { createRouter, createWebHistory } from "vue-router";
// Importe les fonctions nécessaires pour créer un routeur Vue

import Home from "@/pages/Home.vue";
import Medicaments from "@/pages/Medicaments.vue";
// Importe les composants qui seront affichés selon la route

const routes = [
  { path: "/", component: Home },
  // Route pour la page d'accueil ("/") qui affiche le composant Home.vue

  { path: "/medicaments", component: Medicaments },
  // Route pour "/medicaments" qui affiche le composant Medicaments.vue
];

const router = createRouter({
  history: createWebHistory(),
  // Utilise l'historique du navigateur pour la navigation (sans # dans l'URL)

  routes,
  // Définit les routes de l'application
});

export default router;
// Exporte le routeur pour l'utiliser dans l'application Vue
