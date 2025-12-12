<template>
  <q-page class="flex flex-center bg-grey-2 q-pa-md">

    <q-card
      class="q-pa-lg shadow-4 rounded-borders bg-white"
      style="min-width: 360px; width: 100%; max-width: 420px; border-radius: 20px;"
    >
      <q-card-section class="row items-center q-gutter-sm  justify-center ">
        <q-avatar size="60px">
          <img src="../assets/NewIndia.png" />
        </q-avatar>
        <div class="q-mr-md">
          <div class="text-h5 text-weight-bold q-mt-sm">New India</div>
          <div class="text-subtitle2 text-grey-7 q-mt-xs">Log in to continue.</div>
        </div>
      </q-card-section>

      <q-card-section class="">
        <q-input
          filled
          v-model="username"
          label="User"
          dense
          rounded
          standout
          :rules="[val => !!val || 'The user is required']"
          class="input-login"
        />
        <q-input
          filled
          v-model="password"
          type="password"
          label="Password"
          dense
          rounded
          standout
          :rules="[val => !!val || 'Password is required']"
          class="input-login"
        />
      </q-card-section>

      <q-card-actions class="q-mb-lg" align="center">
        <q-btn
          color="primary"
          label="Enter"
          unelevated
          class="full-width q-pa-md btn-login"
          @click="irALogin"
        />
        <p class="q-ml-md text-red ">*Log in with any username and password</p>
      </q-card-actions>
    </q-card>

  </q-page>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

export default {
  setup() {
    const router = useRouter()
    const $q = useQuasar()

    const username = ref('')
    const password = ref('')

    const irALogin = () => {
      if (!username.value || !password.value) {
        $q.notify({
          type: 'negative',
          message: 'Por favor, completa todos los campos',
          icon: 'warning',
          timeout: 2500
        })
        return
      }

      $q.notify({
        type: 'positive',
        message: `Welcome, ${username.value}!`,
        icon: 'check_circle',
        timeout: 2500
      })

      router.push('/dashboard')
    }

    return {
      username,
      password,
      irALogin
    }
  }
}
</script>

<style scoped>
.input-login >>> .q-field__control {
  font-size: 16px;
}

.btn-login {
  font-size: 16px;
  font-weight: 600;
  border-radius: 12px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn-login:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.dashboard-page {
  min-height: 100vh;
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
