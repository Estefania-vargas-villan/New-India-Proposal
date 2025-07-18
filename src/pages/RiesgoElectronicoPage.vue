<template>
  <q-page class="q-pa-md">
    <q-card class="q-pa-lg shadow-2" style="max-width: 500px; margin: auto">
      <q-card-section>
        <div class="text-h6">Formulario Riesgo electronico</div>
        <div class="text-subtitle2 text-grey-7">
          Diligencia la información requerida para el riesgo electronico.
        </div>
      </q-card-section>

      <q-form class="q-gutter-md q-mt-md">
        <q-input
          filled
          v-model="nombre"
          label="Ubicación de la inspección"
          dense
          standout
          :rules="[(val) => !!val || 'Campo requerido']"
        />
        <q-input
          filled
          v-model="sector"
          :options="['Bajo', 'Medio', 'Alto']"
          label="Nivel de riesgo"
          dense
          standout
          :rules="[(val) => !!val || 'Campo requerido']"
        />
        <q-input
          filled
          v-model="encuentro"
          label="Descripción del riesgo"
          dense
          standout
          :rules="[(val) => !!val || 'Campo requerido']"
        />

        <q-select
          filled
          dense
          standout
          v-model="nivelRiesgo"
          :options="['Bajo', 'Medio', 'Alto']"
          label="Nivel de riesgo"
          required
        />

        <div class="q-mt-md">
          <q-btn type="submit" label="Enviar formulario" color="primary" />
          <q-btn label="Limpiar" flat @click="limpiarFormulario" class="q-ml-sm" />
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup></script>
