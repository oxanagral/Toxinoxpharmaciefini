<template>
  <tr>
    <!-- Affiche l'image du médicament -->
    <td>
      <img :src="`https://apipharmacie.pecatte.fr/images/${med.photo}`" alt="Image" class="med-img" />
    </td>
    <!-- Affiche la dénomination du médicament -->
    <td>{{ med.denomination }}</td>
    <!-- Affiche la forme pharmaceutique du médicament -->
    <td>{{ med.formepharmaceutique }}</td>
    <td>
      <!-- Boutons pour ajuster la quantité du médicament -->
      <button @click="decreaseQuantity" :disabled="med.qte === 0">➖</button>
      {{ med.qte }}
      <button @click="increaseQuantity">➕</button>
    </td>
    <td>
      <!-- Boutons pour modifier ou supprimer le médicament -->
      <button @click="$emit('edit-medicament', med)">✏ Modifier</button>
      <button @click="$emit('delete-medicament', med.id)">🗑 Supprimer</button>
    </td>
  </tr>
</template>

<script setup>
import axios from "axios"; // Importe Axios pour les requêtes API
import { defineProps, defineEmits } from "vue"; // Importe les hooks Vue nécessaires

const API_URL = "https://apipharmacie.pecatte.fr/api/14/medicaments"; // URL de l'API
const props = defineProps(["med"]); // Définit les propriétés du médicament
const emit = defineEmits(["quantity-updated"]); // Déclare l'événement pour mettre à jour la quantité

// Fonction pour augmenter la quantité du médicament
const increaseQuantity = async () => {
  await axios.put(API_URL, { id: props.med.id, qte: props.med.qte + 1 }); // Envoie une requête pour mettre à jour la quantité
  emit("quantity-updated"); // Émet un événement pour signaler que la quantité a été mise à jour
};

// Fonction pour diminuer la quantité du médicament
const decreaseQuantity = async () => {
  if (props.med.qte > 0) { // Vérifie si la quantité est supérieure à 0
    await axios.put(API_URL, { id: props.med.id, qte: props.med.qte - 1 }); // Envoie une requête pour diminuer la quantité
    emit("quantity-updated"); // Émet un événement pour signaler que la quantité a été mise à jour
  }
};
</script>

<style scoped>
/* Style de l'image du médicament */
.med-img {
  width: 50px; /* Définit la largeur de l'image */
  height: 50px; /* Définit la hauteur */
  object-fit: cover; /* Ajuste l'image pour couvrir l'espace sans déformation */
  border-radius: 5px; /* Arrondit les bords de l'image */
}

/* Style des boutons */
button {
  margin: 0 5px; /* Ajoute de l'espace autour des boutons */
  padding: 5px 8px; /* Ajoute de l'espace autour du texte du bouton */
  cursor: pointer; /* Change le curseur pour indiquer un élément cliquable */
}

/* Style au survol des boutons */
button:hover {
  background-color: #e0e0e0; 
}
</style>
