<template>
  <table class="medicament-table">
    <thead>
      <tr>
        <!-- En-têtes du tableau -->
        <th>Image</th>
        <th>Nom</th>
        <th>Forme</th>
        <th>Quantité</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <!-- Utilisation de v-for pour créer une ligne pour chaque médicament filtré -->
      <MedicamentItem
        v-for="med in filteredMedicaments"  
        :key="med.id"  
        :med="med"  
        @quantity-updated="$emit('quantity-updated')"  
        @edit-medicament="$emit('edit-medicament', med)" 
        @delete-medicament="$emit('delete-medicament', med.id)" 
      />
    </tbody>
  </table>
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";
import MedicamentItem from "@/components/MedicamentItem.vue";

// Définir les props reçues du parent
const props = defineProps({
  medicaments: { type: Array, default: () => [] },
  searchQuery: { type: String, default: "" },
});

// Définir les événements à émettre pour gérer les actions sur les médicaments
const emit = defineEmits(["quantity-updated", "edit-medicament", "delete-medicament"]);

// Calculer et filtrer les médicaments en fonction de la requête de recherche
const filteredMedicaments = computed(() => {
  return props.medicaments.filter((med) =>
      // Filtrage des médicaments dont la dénomination contient la requête de recherche
    med.denomination.toLowerCase().includes(props.searchQuery.toLowerCase())
  );
});
</script>

<style scoped>
.medicament-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.medicament-table th,
.medicament-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

.medicament-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}
</style>
