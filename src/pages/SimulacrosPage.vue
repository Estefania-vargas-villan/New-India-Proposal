<template>
  <q-page class="q-pa-md">
    <q-card class="q-pa-lg shadow-2" style="max-width: 500px; margin: auto">
      <q-card-section>
        <div class="text-h6">Formulario de simulacro</div>
        <div class="text-subtitle2 text-grey-7">
          Diligencia la información requerida para el simulacro.
        </div>
      </q-card-section>
      <q-form @submit.prevent="enviarFormulario" class="q-gutter-md q-mt-md">
        <q-input
          filled
          v-model="nombreSimulacro"
          label="Nombre del simulacro"
          :rules="[(val) => !!val || 'Selecciona un nivel']"
          prepend-icon="warning"
        />
        <q-input
          filled
          v-model="fecha"
          label="Fecha del simulacro"
          type="date"
          :rules="[(val) => !!val || 'Selecciona un nivel']"
          prepend-icon="warning"
        />
        <q-input
          filled
          v-model="ubicacion"
          label="Ubicación"
          :rules="[(val) => !!val || 'Selecciona un nivel']"
          prepend-icon="warning"
        />

        <q-select
          filled
          v-model="tipoSimulacro"
          :options="['Incendio', 'Evacuación sísmica', 'Amenaza externa', 'Otro']"
          label="Tipo de simulacro"
          required
          :rules="[(val) => !!val || 'Selecciona un nivel']"
          prepend-icon="warning"
        />

        <q-input
          filled
          v-model="resultados"
          label="Resultados y observaciones"
          type="textarea"
          autogrow
          :rules="[(val) => !!val || 'Selecciona un nivel']"
          prepend-icon="warning"
        />

        <div class="q-mt-md">
          <q-btn type="submit" label="Registrar simulacro" color="primary" />
          <q-btn label="Limpiar" flat @click="limpiarFormulario" class="q-ml-sm" />
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const nombreSimulacro = ref('')
const fecha = ref('')
const ubicacion = ref('')
const tipoSimulacro = ref(null)
const resultados = ref('')

function enviarFormulario() {
  const datos = {
    nombreSimulacro: nombreSimulacro.value,
    fecha: fecha.value,
    ubicacion: ubicacion.value,
    tipoSimulacro: tipoSimulacro.value,
    resultados: resultados.value,
  }

  console.log('Formulario simulacro:', datos)
  alert('Formulario enviado con éxito')

  limpiarFormulario()
}

function limpiarFormulario() {
  nombreSimulacro.value = ''
  fecha.value = ''
  ubicacion.value = ''
  tipoSimulacro.value = null
  resultados.value = ''
}
</script>
