<template>
  <div>
    <q-btn :label="label" :color="color" :icon="icon" :class="btnClass" :outline="outline" :flat="flat" :dense="dense"
      :size="size" @click="showResetConfirm = true" />

    <q-dialog v-model="showResetConfirm" persistent>
      <q-card class="reset-dialog-card">

        <q-card-section class="row items-center q-pb-none">
          <q-icon name="warning" size="40px" color="orange-8" class="q-mr-sm" />
          <div class="text-h6 text-weight-bold">{{ title }}</div>
        </q-card-section>

        <q-card-section>
          <div class="text-body1 text-grey-8 q-mt-sm">
            {{ message }}
          </div>
        </q-card-section>

        <q-separator />
        <q-card-actions align="right" class="q-pa-md">
          <q-btn flat :label="cancelLabel" color="grey-7" class="btn-cancel" v-close-popup :disable="loading" />
          <q-btn unelevated :label="confirmLabel" color="negative" class="btn-confirm" @click="handleReset"
            :loading="loading" :disable="loading" />
        </q-card-actions>

      </q-card>
    </q-dialog>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const emit = defineEmits(['reset', 'confirmed', 'cancelled'])
const showResetConfirm = ref(false)
const loading = ref(false)

const props = defineProps({
  label: {
    type: String,
    default: 'Reset Form'
  },
  color: {
    type: String,
    default: 'negative'
  },
  icon: {
    type: String,
    default: 'cleaning_services'
  },
  btnClass: {
    type: String,
    default: ''
  },
  outline: {
    type: Boolean,
    default: false
  },
  flat: {
    type: Boolean,
    default: false
  },
  dense: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'md'
  },

  title: {
    type: String,
    default: 'Confirm Reset'
  },
  message: {
    type: String,
    default: 'Are you sure you want to reset all the form data? All the information entered will be lost.'
  },
  cancelLabel: {
    type: String,
    default: 'Cancel'
  },
  confirmLabel: {
    type: String,
    default: 'Reset'
  },


  resetFunction: {
    type: Function,
    default: null
  },

  customConfirm: {
    type: Boolean,
    default: false
  },

  showNotification: {
    type: Boolean,
    default: true
  },
  notificationMessage: {
    type: String,
    default: 'Formulario reiniciado correctamente'
  },
  notificationType: {
    type: String,
    default: 'info'
  }
})

const handleReset = async () => {
  loading.value = true

  try {
    if (props.resetFunction) {
      await props.resetFunction()
    } else {
      emit('reset')
    }

    emit('confirmed')

    if (props.showNotification) {
      $q.notify({
        type: props.notificationType,
        message: props.notificationMessage,
        position: 'top',
        timeout: 1500,
        icon: 'check'
      })
    }

  } catch (error) {
    console.log(error)
    $q.notify({
      type: 'negative',
      message: 'Error reset the form',
      position: 'top',
      timeout: 2000
    })
  } finally {
    loading.value = false
    showResetConfirm.value = false
  }
}

const openDialog = () => {
  showResetConfirm.value = true
}

defineExpose({
  openDialog
})
</script>
<style scoped>
.reset-dialog-card {
  width: 420px;
  border-radius: 20px;
  padding: 10px;
  box-shadow: 0px 8px 28px rgba(0, 0, 0, 0.15);
  animation: fadeIn 0.25s ease-out;
}

.btn-cancel {
  font-weight: 500;
  padding: 6px 16px;
}

.btn-confirm {
  font-weight: 600;
  padding: 6px 18px;
  border-radius: 10px;
}

.reset-dialog-card .q-card__section:first-child {
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
