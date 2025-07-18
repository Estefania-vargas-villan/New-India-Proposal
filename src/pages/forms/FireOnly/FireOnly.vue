<template>
  <q-page class="q-pa-md">
    <div class="q-gutter-y-md">
      <GeneralInformation ref="generalInfoForm" />
      <BuildingConstruction ref="buildingConstructionForm" />
      <!-- Otros acordeones irán aquí -->
    </div>

    <div class="q-mt-md">
      <q-btn label="Submit" color="primary" @click="submitForm" />
      <q-btn label="Clear" flat class="q-ml-sm" @click="resetForm" />
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import GeneralInformation from './subForms/GeneralInformation.vue';
import BuildingConstruction from './subForms/BuildingDetails.vue';

const generalInfoForm = ref(null);
const buildingConstructionForm = ref(null);

const submitForm = () => {
  const formData = {
    generalInfo: generalInfoForm.value?.formData,
    buildingConstruction: buildingConstructionForm.value?.formData
  };
  console.log('Submitting:', formData);
  // Lógica de envío aquí
};

const resetForm = () => {
  generalInfoForm.value?.resetForm();
  buildingConstructionForm.value?.resetForm();
  // Resetear otros forms cuando se agreguen
};
</script>