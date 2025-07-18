<template>
  <q-page class="q-pa-md">
    <h4>Bienvenido al Dashboard</h4>

    <p class="q-mt-sm q-mb-lg">
      Aquí puedes acceder rápidamente a los formularios activos, revisar registros recientes y
      gestionar el sistema.
    </p>

    <div class="row q-col-gutter-md">
      <q-card class="col-xs-12 col-sm-6 col-md-3" clickable to="/formularios">
        <q-card-section>
          <div class="text-h6">Fire only</div>
          <div class="text-subtitle2">Ver y llenar formularios</div>
        </q-card-section>
        <q-card-actions>
          <q-btn flat label="Ir" to="/FireOnly" icon="whatshot" color="red" />
        </q-card-actions>
      </q-card>

      <q-card class="col-xs-12 col-sm-6 col-md-3" clickable to="/FireOnly">
        <q-card-section>
          <div class="text-h6">Fire All Extended</div>
          <div class="text-subtitle2">Ver y llenar formularios</div>
        </q-card-section>
        <q-card-actions>
          <q-btn flat label="Ir" to="/FireOnly" icon="list" color="primary" />
        </q-card-actions>
      </q-card>
      <q-card class="col-xs-12 col-sm-6 col-md-3" clickable to="/FireOnly">
        <q-card-section>
          <div class="text-h6">Smart Cas</div>
          <div class="text-subtitle2">Ver y llenar formularios</div>
        </q-card-section>
        <q-card-actions>
          <q-btn flat label="Ir" icon="bolt" color="orange" to="/FireOnly" />
        </q-card-actions>
      </q-card>

      <q-card class="col-xs-12 col-sm-6 col-md-3" clickable to="/FireOnly">
        <q-card-section>
          <div class="text-h6">Smart Economy Cas</div>
          <div class="text-subtitle2">Ver y llenar formularios</div>
        </q-card-section>
        <q-card-actions>
          <q-btn flat label="Ir" icon="event" color="green" to="/FireOnly" />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>
