<template>
  <div class="form">
    <!-- Champs de saisie pour les informations du médicament -->
    <input v-model="medicament.denomination" placeholder="Nom du médicament" />
    <input v-model="medicament.formepharmaceutique" placeholder="Forme pharmaceutique" />
    <input v-model="medicament.qte" type="number" placeholder="Quantité" />

    <!-- Affiche l'image actuelle (garde l'image lors de la modification) -->
    <img
      v-if="medicament.photo" 
      :src="medicament.photo.includes('data:image') ? medicament.photo : `https://apipharmacie.pecatte.fr/images/${medicament.photo}`"
      alt="Image"
      class="med-img"
    />

    <!-- Champ pour télécharger une nouvelle image -->
    <input type="file" @change="handleFileUpload" />

    <!-- Bouton d'ajout ou de modification selon le mode d'édition -->
    <button @click="submitMedicament">
      {{ isEditing ? "Modifier" : "Ajouter" }}
    </button>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from "vue"; // Importe les hooks Vue nécessaires
import axios from "axios"; // Importe Axios pour les requêtes API

const API_URL = "https://apipharmacie.pecatte.fr/api/14/medicaments"; // URL de l'API
const emit = defineEmits(["medicament-added"]); // Déclare l'événement pour ajouter un médicament

const props = defineProps({ selectedMedicament: Object }); // Récupère le médicament sélectionné pour modification
const medicament = ref({ denomination: "", formepharmaceutique: "", qte: 0, photo: "" }); // Modèle réactif pour le médicament
const isEditing = ref(false); // Variable qui indique si on est en mode édition

// Surveille les changements de selectedMedicament (mode édition)
watch(
  () => props.selectedMedicament, // Surveille les changements de selectedMedicament
  (newMed) => {
    if (newMed) {
      medicament.value = { ...newMed }; // Remplie les champs avec les données du médicament sélectionné
      isEditing.value = true; // Active le mode édition
    } else {
      resetForm(); // Si aucun médicament n'est sélectionné, réinitialise le formulaire
    }
  }
);

// Gère le téléchargement de l'image
const handleFileUpload = (event) => {
  const file = event.target.files[0]; // Récupère le fichier téléchargé
  if (!file) return; // Si aucun fichier n'est sélectionné, arrête l'exécution

  const reader = new FileReader(); // Crée un lecteur de fichier
  reader.readAsDataURL(file); // Lit le fichier comme une URL de données
  reader.onload = () => {
    medicament.value.photo = reader.result.split(",")[1]; // Convertit l'image en Base64
  };
};

// Soumet le formulaire (ajout ou modification du médicament)
const submitMedicament = async () => {
  try {
    // Conserve l'image existante si aucune nouvelle image n'est téléchargée
    if (!medicament.value.photo.includes("data:image")) {
      const existingMed = props.selectedMedicament;
      if (existingMed) {
        medicament.value.photo = existingMed.photo; // Garde l'ancienne image si pas de nouvelle image
      }
    }

    // Si on est en mode édition, on met à jour le médicament, sinon on l'ajoute
    if (isEditing.value) {
      await axios.put(API_URL, { id: medicament.value.id, ...medicament.value });
    } else {
      await axios.post(API_URL, medicament.value);
    }

    resetForm(); // Réinitialise le formulaire après soumission
    emit("medicament-added"); // Émet un événement pour rafraîchir la liste des médicaments
  } catch (error) {
    console.error("Erreur lors de l'ajout/modification :", error); // Gère les erreurs
  }
};

// Réinitialise le formulaire
const resetForm = () => {
  medicament.value = { denomination: "", formepharmaceutique: "", qte: 0, photo: "" }; // Réinitialise les champs
  isEditing.value = false; // Désactive le mode édition
};
</script>

<style scoped>
/* Style du formulaire */
.form {
  margin-bottom: 20px; /* Ajoute de l'espace sous le formulaire */
}

/* Style de l'image du médicament */
.med-img {
  width: 50px; /* Définit la largeur de l'image */
  height: 50px; /* Définit la hauteur de l'image */
  object-fit: cover; /* Ajuste l'image pour couvrir l'espace sans déformation */
  border-radius: 5px; /* Arrondit les bords de l'image */
  display: block; /* Affiche l'image en bloc */
  margin: 10px auto; /* Centre l'image horizontalement */
}

/* Style du bouton */
button {
  padding: 8px 12px; /* Ajoute de l'espace autour du texte */
  margin-top: 10px; /* Ajoute de l'espace au-dessus du bouton */
  cursor: pointer; /* Change le curseur pour indiquer un élément cliquable */
}
</style>
