<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white shadow-3">
      <q-toolbar class="q-px-md">
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" color="white" />
        <q-toolbar-title class="row items-center">
          <q-avatar size="42px" class="q-mr-sm">
            <img src="../assets/NewIndia.png" />
          </q-avatar>
          <span class="text-weight-bold text-h6">New India</span>
        </q-toolbar-title>

        <q-btn flat round dense icon="logout" @click="logout" color="white" class="logout-btn" />
      </q-toolbar>
    </q-header>

    <q-drawer 
      v-model="leftDrawerOpen" 
      side="left" 
      show-if-above 
      bordered 
      class="bg-grey-1 drawer-elegant shadow-1"
    >
      <div class="q-pa-md text-center drawer-header">
        <q-avatar size="70px" class="shadow-2">
          <img src="../assets/NewIndia.png" />
        </q-avatar>
        <div class="text-primary text-h6 text-weight-bold q-mt-sm">New India</div>
      </div>

      <q-separator spaced />

      <q-list padding class="drawer-list">
        <q-item clickable to="dashboard" class="drawer-item hover-bg-primary-light">
          <q-item-section avatar>
            <q-icon name="dashboard" color="primary" size="30px" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-weight-medium">Dashboard</q-item-label>
          </q-item-section>
        </q-item>

        <q-expansion-item
          expand-separator
          icon="list_alt"
          label="Forms"
          class="text-primary drawer-expansion"
          header-class="text-weight-bold hover-bg-primary-light"
        >
          <q-list padding>
            <q-item
              v-for="form in formularios"
              :key="form.ruta"
              clickable
              class="drawer-subitem hover-bg-primary-light rounded-borders"
              @click="goTo(form.ruta)"
            >
              <q-item-section avatar>
                <q-avatar color="primary-light">
                  <q-icon :name="form.icono" color="primary" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ form.titulo }}</q-item-label>
                <q-item-label caption class="text-grey-6">{{ form.descripcion }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
      </q-list>
    </q-drawer>

    <q-page-container class="bg-grey-2">
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-primary text-white shadow-2">
      <q-toolbar class="justify-center">
        <q-avatar size="50px" class="shadow-1">
          <img src="../assets/NewIndia.png" />
        </q-avatar>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const leftDrawerOpen = ref(false)

const formularios = [
  {
    titulo: 'FireOnly',
    descripcion: 'risk assessment. ',
    icono: 'whatshot',
    ruta: '/FireOnly',
  },
  // {
  //   titulo: 'Fire All Extended',
  //   descripcion: 'Plan de acción ante emergencias',
  //   icono: 'directions_run',
  //   ruta: '/FireAll',
  // },
  // {
  //   titulo: 'Smart Cas',
  //   descripcion: 'Inspección eléctrica',
  //   icono: 'bolt',
  //   ruta: '/SmartCas',
  // },
  // {
  //   titulo: 'Smart Economy Cas',
  //   descripcion: 'Registro de simulacros',
  //   icono: 'event',
  //   ruta: '/SmartEconomyCas',
  // },
]

function goTo(ruta) {
  router.push(ruta)
}

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function logout() {
  router.push('/login')
  console.log(logout, 'holaaaa')
}
</script>

<style>


.drawer-item {
  border-radius: 10px;
  margin: 6px 10px;
  transition: 0.2s ease;
}

.drawer-item:hover {
  background: #e3f2fd;
}

.drawer-subitem {
  border-radius: 8px;
  margin: 4px 14px;
}

.drawer-subitem:hover {
  background: #f0f7ff;
}

.drawer-expansion {
  margin: 4px 10px;
  border-radius: 10px;
  padding: 6px;
}

.logout-btn:hover {
  background: rgba(255,255,255,0.1);
}

</style>
