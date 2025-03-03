<template>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      placeholder="Rechercher un médicament..."
      class="search-bar"
    />
  </template>
  
  <script setup>
    // Déclaration de la prop 'modelValue' pour recevoir la valeur de l'input depuis le parent
  defineProps(["modelValue"]);
  </script>
  
  <style scoped>
  .search-bar {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
  }
  </style>
  