<template>
  <q-page class="q-pa-md bg-grey-1">
    <div class="text-center q-mb-lg">
      <h4 class="text-primary">Gestión de Formularios</h4>
      <p class="text-grey-7">Selecciona el tipo de formulario que deseas diligenciar o revisar:</p>
    </div>

    <div class="row q-col-gutter-md q-mx-auto" style="max-width: 900px">
      <q-card
        v-for="form in formularios"
        :key="form.titulo"
        class="col-xs-12 col-sm-6 col-md-3 q-hoverable cursor-pointer"
        @click="$router.push(form.ruta)"
        flat
        bordered
      >
        <q-card-section class="text-center">
          <q-icon :name="form.icono" size="40px" color="primary" class="q-mb-sm" />
          <div class="text-subtitle1 text-bold">{{ form.titulo }}</div>
          <div class="text-caption text-grey-7">{{ form.descripcion }}</div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
const formularios = [
  {
    titulo: 'FireOnly',
    descripcion: 'Reporte y evaluación de riesgos por incendio',
    icono: 'whatshot',
    ruta: '/FireOnly',
  },
  {
    titulo: 'Riesgo eléctrico',
    descripcion: 'Identificación de puntos críticos eléctricos',
    icono: 'bolt',
    ruta: '/electronico',
  },
  {
    titulo: 'Evacuación',
    descripcion: 'Plan de acción ante emergencias',
    icono: 'directions_run',
    ruta: '/evacuacion',
  },
  {
    titulo: 'Simulacros',
    descripcion: 'Registro de simulacros realizados',
    icono: 'event',
    ruta: '/simulacros',
  },
]
</script>
