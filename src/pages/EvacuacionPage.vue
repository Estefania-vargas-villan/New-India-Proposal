<template>
  <q-page class="q-pa-md">
    <q-card class="q-pa-lg shadow-2" style="max-width: 500px; margin: auto">
      <q-card-section>
        <div class="text-h6">Formulario de evacuaciòn</div>
        <div class="text-subtitle2 text-grey-7">
          Diligencia la información requerida para la evacuacion.
        </div>
      </q-card-section>

      <q-form class="q-gutter-md q-mt-md">
        <q-input
          filled
          v-model="nombre"
          label="Nombre del responsable"
          dense
          standout
          :rules="[(val) => !!val || 'Campo requerido']"
        />
        <q-input
          filled
          v-model="sector"
          label="Zona o sector"
          dense
          standout
          :rules="[(val) => !!val || 'Campo requerido']"
        />
        <q-input
          filled
          v-model="encuentro"
          label="Punto de encuentro designado"
          dense
          standout
          :rules="[(val) => !!val || 'Campo requerido']"
        />
        <q-input
          filled
          v-model="preparación"
          label="Nivel de preparación del personal"
          dense
          standout
          :rules="[(val) => !!val || 'Campo requerido']"
        />
        <q-input
          filled
          v-model="Observaciones"
          label="Observaciones"
          dense
          standout
          :rules="[(val) => !!val || 'Campo requerido']"
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
