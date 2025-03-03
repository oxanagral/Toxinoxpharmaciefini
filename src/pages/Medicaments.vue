<template>
  <div>
    <!-- Titre principal -->
    <h2>📋 Gestion des Médicaments</h2>

    <!-- Barre de recherche liée à searchQuery -->
    <SearchBar v-model="searchQuery" />

    <!-- Formulaire d'ajout/modification de médicament -->
    <!-- Rafraîchit la liste après ajout et reçoit un médicament sélectionné pour l'édition -->
    <MedicamentForm @medicament-added="fetchMedicaments" :selectedMedicament="selectedMedicament" />

    <!-- Liste des médicaments -->
    <!-- Passe la liste des médicaments et la recherche en props -->
    <!-- Gère la mise à jour de la quantité, l'édition et la suppression -->
    <MedicamentList
      :medicaments="medicaments"
      :searchQuery="searchQuery"
      @quantity-updated="fetchMedicaments"
      @edit-medicament="selectMedicamentForEdit"
      @delete-medicament="deleteMedicament"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"; // Importe les fonctions réactives et le hook de montage
import axios from "axios"; // Importe Axios pour les requêtes API
import MedicamentForm from "@/components/MedicamentForm.vue"; // Formulaire de médicament
import MedicamentList from "@/components/MedicamentList.vue"; // Liste des médicaments
import SearchBar from "@/components/SearchBar.vue"; // Barre de recherche

const API_URL = "https://apipharmacie.pecatte.fr/api/14/medicaments"; // URL de l'API
const medicaments = ref([]); // Stocke la liste des médicaments
const searchQuery = ref(""); // Stocke la recherche utilisateur
const selectedMedicament = ref(null); // Stocke le médicament en cours d'édition

// ✅ Récupère la liste des médicaments depuis l'API
const fetchMedicaments = async () => {
  try {
    const response = await axios.get(API_URL);
    medicaments.value = response.data;
  } catch (error) {
    console.error("Erreur lors du chargement des médicaments :", error);
  }
};

// ✅ Sélectionne un médicament pour l'édition
const selectMedicamentForEdit = (med) => {
  selectedMedicament.value = { ...med }; // Clone l'objet pour éviter les modifications directes
};

// ✅ Supprime un médicament et met à jour la liste
const deleteMedicament = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    fetchMedicaments(); // Rafraîchit la liste après suppression
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
  }
};

// ✅ Récupère les médicaments dès que le composant est monté
onMounted(fetchMedicaments);
</script>
