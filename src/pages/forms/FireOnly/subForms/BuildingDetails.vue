<template>
  <div>
    <div class="row q-col-gutter-md">
      <!-- Number of Storeys -->
      <div class="col-12 col-md-4">
        <q-select v-model="formData.numberOfStoreys" :options="storeyOptions" label="Number of Storeys *" outlined 
          :rules="[val => !!val || 'This field is required']" />
      </div>

      <!-- External Walls - Multiple Selection -->
      <div class="col-12 col-md-4">
        <q-select v-model="formData.externalWalls" :options="externalWallsOptions" 
          label="External Walls *" outlined multiple use-chips
          :rules="[val => val && val.length > 0 || 'Select at least one material']"
          @update:model-value="handleExternalWallsChange" />
      </div>

      <!-- Roof Type - Multiple Selection -->
      <div class="col-12 col-md-4">
        <q-select v-model="formData.roofType" :options="roofTypeOptions" 
          label="Roof *" outlined multiple use-chips
          :rules="[val => val && val.length > 0 || 'Select at least one material']"
          @update:model-value="handleRoofTypeChange" />
      </div>

      <!-- Ceiling Type - Multiple Selection -->
      <div class="col-12 col-md-4">
        <q-select v-model="formData.ceilingType" :options="ceilingTypeOptions" 
          label="Ceiling *" outlined multiple use-chips
          :rules="[val => val && val.length > 0 || 'Select at least one material']"
          @update:model-value="handleCeilingTypeChange" />
      </div>

      <!-- Floor Type - Multiple Selection -->
      <div class="col-12 col-md-4">
        <q-select v-model="formData.floorType" :options="floorTypeOptions" 
          label="Floor *" outlined multiple use-chips
          :rules="[val => val && val.length > 0 || 'Select at least one material']"
          @update:model-value="handleFloorTypeChange" />
      </div>

      <!-- Year of Construction -->
      <div class="col-12 col-md-4">
        <q-input v-model="formData.yearOfConstruction" label="Year of Construction *" outlined type="number"
          :rules="[val => !!val || 'This field is required']" />
      </div>

      <!-- Campos para "Other" selections -->
      <div class="col-12" v-if="showOtherExternalWalls">
        <q-select v-model="formData.otherExternalWalls" :options="otherExternalWallsOptions"
          label="Please specify other external walls material *" outlined multiple use-chips
          :rules="[val => val && val.length > 0 || 'This field is required']" />
      </div>

      <div class="col-12" v-if="showOtherRoof">
        <q-select v-model="formData.otherRoof" :options="otherRoofOptions"
          label="Please specify other roof material *" outlined multiple use-chips
          :rules="[val => val && val.length > 0 || 'This field is required']" />
      </div>

      <div class="col-12" v-if="showOtherCeiling">
        <q-select v-model="formData.otherCeiling" :options="otherCeilingOptions"
          label="Please specify other ceiling material *" outlined multiple use-chips
          :rules="[val => val && val.length > 0 || 'This field is required']" />
      </div>

      <div class="col-12" v-if="showOtherFloor">
        <q-select v-model="formData.otherFloor" :options="otherFloorOptions"
          label="Please specify other floor material *" outlined multiple use-chips
          :rules="[val => val && val.length > 0 || 'This field is required']" />
      </div>



      <q-banner class="q-mt-md bg-grey-2 text-grey-9">
        <template v-slot:avatar>
          <q-icon name="info" color="grey" />
        </template>
        Note: Rate is based on above selected materials. You can select multiple materials for each category.
        <div class="text-caption q-mt-xs">
          For "Other" materials, please specify the exact material(s) used.
        </div>
      </q-banner>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, watch, defineEmits, defineExpose } from 'vue'

const emit = defineEmits(['validation-changed', 'update:modelValue'])

// Inicializar como arrays para selección múltiple
const formData = reactive({
  numberOfStoreys: '',
  externalWalls: [],  // Ahora es array
  roofType: [],       // Ahora es array
  ceilingType: [],    // Ahora es array
  floorType: [],      // Ahora es array
  yearOfConstruction: '',
  otherExternalWalls: [],  // Ahora es array
  otherRoof: [],           // Ahora es array
  otherCeiling: [],        // Ahora es array
  otherFloor: [],          // Ahora es array
})

const storeyOptions = ['1', '2', '3', '4', '5+']
const externalWallsOptions = ['Concrete', 'Densglass', 'Wooden Structure', 'Other']
const roofTypeOptions = ['Roof Tiles', 'Shingles', 'Eterniet', 'Aluminium', 'Concrete', 'Other']
const ceilingTypeOptions = ['Gypsum Board', 'Wooden Structure', 'PVC/Tiles', 'Other']
const floorTypeOptions = ['Ceramic Tiles', 'Carpet', 'Wooden Deck', 'Rubberoid Tiles', 'Other']

// Opciones para campos "Other"
const otherExternalWallsOptions = ['Brick', 'Stone', 'Glass', 'Metal', 'Adobe', 'Fiber Cement', 'Other Custom Material']
const otherRoofOptions = ['Metal Sheets', 'Thatch', 'Polycarbonate', 'Fiberglass', 'Green Roof', 'Solar Panels', 'Other Custom Material']
const otherCeilingOptions = ['Plaster', 'Metal', 'Fiberboard', 'Acoustic Tiles', 'Exposed Structure', 'Other Custom Material']
const otherFloorOptions = ['Vinyl', 'Laminate', 'Marble', 'Granite', 'Terrazzo', 'Epoxy', 'Other Custom Material']

// Computed properties para mostrar/ocultar campos "Other"
const showOtherExternalWalls = computed(() => formData.externalWalls.includes('Other'))
const showOtherRoof = computed(() => formData.roofType.includes('Other'))
const showOtherCeiling = computed(() => formData.ceilingType.includes('Other'))
const showOtherFloor = computed(() => formData.floorType.includes('Other'))



// Validación del formulario
const isFormValid = computed(() => {
  // Validar campos obligatorios individuales
  if (!formData.numberOfStoreys || !formData.yearOfConstruction) {
    return false
  }

  // Validar que al menos se haya seleccionado un material en cada categoría
  if (formData.externalWalls.length === 0) return false
  if (formData.roofType.length === 0) return false
  if (formData.ceilingType.length === 0) return false
  if (formData.floorType.length === 0) return false

  // Validar campos "Other" si están seleccionados
  if (showOtherExternalWalls.value && formData.otherExternalWalls.length === 0) return false
  if (showOtherRoof.value && formData.otherRoof.length === 0) return false
  if (showOtherCeiling.value && formData.otherCeiling.length === 0) return false
  if (showOtherFloor.value && formData.otherFloor.length === 0) return false

  return true
})

// Watchers
watch(isFormValid, (newVal) => {
  emit('validation-changed', newVal)
}, { immediate: true })

watch(formData, (newVal) => {
  emit('update:modelValue', newVal)
}, { deep: true })

// Handlers para cambios en selecciones
const handleExternalWallsChange = (value) => {
  // Si se quita "Other" de la selección, limpiar los otros materiales
  if (!value.includes('Other')) {
    formData.otherExternalWalls = []
  }
}

const handleRoofTypeChange = (value) => {
  if (!value.includes('Other')) {
    formData.otherRoof = []
  }
}

const handleCeilingTypeChange = (value) => {
  if (!value.includes('Other')) {
    formData.otherCeiling = []
  }
}

const handleFloorTypeChange = (value) => {
  if (!value.includes('Other')) {
    formData.otherFloor = []
  }
}

// Métodos para exponer
const validate = () => {
  return isFormValid.value
}

const resetForm = () => {
  formData.numberOfStoreys = ''
  formData.externalWalls = []
  formData.roofType = []
  formData.ceilingType = []
  formData.floorType = []
  formData.yearOfConstruction = ''
  formData.otherExternalWalls = []
  formData.otherRoof = []
  formData.otherCeiling = []
  formData.otherFloor = []
}

// Función para obtener un resumen de los materiales seleccionados
const getMaterialSummary = () => {
  return {
    storeys: formData.numberOfStoreys,
    externalWalls: {
      primary: formData.externalWalls.filter(m => m !== 'Other'),
      other: formData.otherExternalWalls
    },
    roof: {
      primary: formData.roofType.filter(m => m !== 'Other'),
      other: formData.otherRoof
    },
    ceiling: {
      primary: formData.ceilingType.filter(m => m !== 'Other'),
      other: formData.otherCeiling
    },
    floor: {
      primary: formData.floorType.filter(m => m !== 'Other'),
      other: formData.otherFloor
    },
    constructionYear: formData.yearOfConstruction
  }
}

defineExpose({
  formData,
  validate,
  resetForm,
  isFormValid,
  getMaterialSummary
})
</script>

<style scoped>
.rounded-borders {
  border-radius: 8px;
}

.q-chip {
  margin: 2px;
}

.q-card {
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.q-banner {
  border-radius: 8px;
}
</style>