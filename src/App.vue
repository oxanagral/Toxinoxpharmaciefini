<template>
  <div>
    <nav>
      <!-- Liens de navigation avec Vue Router -->
      <router-link to="/">🏠 Home</router-link>
      <router-link to="/medicaments">💊 Médicaments</router-link>
    </nav>
    
    <!-- Affiche le contenu des routes définies dans Vue Router -->
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  // Ajouter le titre de la fenêtre
  document.title = "Toxinox Pharmacie"; // Le titre de l'onglet de la fenêtre
  
  // Ajouter le favicon (logo)
  const link = document.createElement('link');
  link.rel = 'icon';
  link.href = '/logoPharma.jpg'; // Le chemin vers ton logo PNG dans le dossier "public"
  document.head.appendChild(link); // Ajoute le lien du favicon dans le head
});
</script>

<style scoped>
/* Style de la barre de navigation */
nav {
  display: flex; /* Affiche les liens en ligne */
  justify-content: center; /* Centre les liens horizontalement */
  gap: 15px; /* Espacement entre les liens */
  padding: 10px;
  background: #f0f0f0; /* Couleur de fond de la barre de navigation */
}

/* Style des liens */
nav a {
  text-decoration: none; /* Supprime le soulignement des liens */
  font-size: 18px; /* Taille du texte */
  padding: 5px 10px; /* Espacement interne pour un meilleur affichage */
}

/* Effet au survol des liens */
nav a:hover {
  background: lightblue; /* Change la couleur de fond */
  border-radius: 5px; /* Arrondit les bords */
}
</style>

<style>
/* Ce style s'applique globalement car il n'est pas scoped */
/* Change la couleur de fond de toute la page */
body {
  background-color: rgb(173, 230, 197);
}
</style>
