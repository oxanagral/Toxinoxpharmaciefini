<template>
  <div class="home">
    <!-- Ajouter le logo dans la page Home -->
    <img src="/logoPharma.jpg" alt="Logo Pharma" class="logo" />
    
    <h1>Bienvenue sur la Gestion des Médicaments</h1>
    <router-link to="/medicaments">
      <button>Voir les Médicaments</button>
    </router-link>
  </div>
</template>

<style scoped>
.home {
  text-align: center;
  margin-top: 50px;
}

/* Style du logo */
.logo {
  width: 150px; /* Ajuste la taille du logo */
  height: auto;
  margin-bottom: 20px; /* Espace en dessous du logo */
}

button {
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
}
</style>
