<template>
  <div class="cover-required-container">
    <div class="text-h6 text-primary q-mb-md">Step 5: Cover Required</div>

    <div class="q-mb-md bg-blue-1 q-pa-md rounded-borders">
      <div class="text-subtitle2">Selected Product:</div>
      <div class="text-h6 text-primary">{{ selectedProductDisplay }}</div>
      <div v-if="selectedProduct" class="text-caption">
        {{ getProductDescription(selectedProduct) }}
      </div>
    </div>

    <div class="q-mb-lg">
      <div class="text-subtitle2 q-mb-sm">8) Cover Required *</div>

      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-6 col-lg-4">
          <q-select v-model="formData.buildingOnly" :options="yesNoOptions" label="Building Only *" outlined
            :rules="[val => !!val || 'This field is required']"
            @update:model-value="handleCoverChange('buildingOnly')" />
        </div>

        <div class="col-12 col-md-6 col-lg-4">
          <q-select v-model="formData.generalContentsOnly" :options="yesNoOptions" label="General Contents Only *"
            outlined :rules="[val => !!val || 'This field is required']"
            @update:model-value="handleCoverChange('generalContentsOnly')" />
        </div>

        <div class="col-12 col-md-6 col-lg-4">
          <q-select v-model="formData.highRisk" :options="yesNoOptions" label="High Risk *" outlined
            :rules="[val => !!val || 'This field is required']" @update:model-value="handleCoverChange('highRisk')" />
        </div>

        <div class="col-12 col-md-6 col-lg-4">
          <q-select v-model="formData.valuablesJewelry" :options="yesNoOptions" label="Valuables / Jewelry *" outlined
            :rules="[val => !!val || 'This field is required']"
            @update:model-value="handleCoverChange('valuablesJewelry')" />
        </div>

        <div class="col-12 col-md-6 col-lg-4">
          <q-select v-model="formData.solarPanels" :options="yesNoOptions" label="Solar Panels *" outlined
            :rules="[val => !!val || 'This field is required']"
            @update:model-value="handleCoverChange('solarPanels')" />
        </div>
      </div>
    </div>

    <div class="q-mb-lg">
      <div class="text-subtitle2 q-mb-sm">Policy Number *</div>
      <q-input v-model="formData.policyNumber" label="Enter Policy Number" outlined
        placeholder="Auto-generated or enter manually" :hint="policyNumberHint"
        :rules="[val => !!val || 'Policy number is required']" />
    </div>

    <div v-if="showSpecialCasesSection" class="q-mb-lg bg-yellow-1 q-pa-md rounded-borders">
      <div class="text-subtitle2 q-mb-sm">
        <q-icon name="warning" color="warning" class="q-mr-sm" />
        Special Coverage Case Detected
      </div>

      <div class="text-caption q-mb-sm">
        <strong>Condition:</strong> Building Only + High Risk selected
      </div>

      <div class="q-mt-sm">
        <div v-if="selectedProduct === 'FIR'" class="text-caption text-blue">
          <q-icon name="info" size="sm" />
          Will create second policy: <strong>CFT</strong>
        </div>
        <div v-if="selectedProduct === 'FIRA'" class="text-caption text-blue">
          <q-icon name="info" size="sm" />
          Will create second policy: <strong>CFTE</strong>
        </div>
        <div v-if="selectedProduct === 'SCAS'" class="text-caption text-blue">
          <q-icon name="info" size="sm" />
          Will create second policy: <strong>CFTE</strong>
        </div>
        <div class="text-caption text-grey q-mt-xs">
          Note: This requires an additional policy number
        </div>
      </div>
    </div>

    <div class="q-mb-lg bg-red-1 q-pa-md rounded-borders">
      <div class="text-subtitle2 q-mb-sm">Exception Manual Rate</div>
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-6">
          <q-input v-model="formData.exceptionManualRate" label="If applicable, enter manual rate" outlined
            type="number" suffix="‰" placeholder="Enter custom rate" step="0.01" min="0" />
        </div>
        <div class="col-12 col-md-6">
          <q-input v-model="formData.exceptionManualReason" label="Reason for manual rate" outlined
            placeholder="Explain why standard rates don't apply" />
        </div>
      </div>
      <div class="text-caption text-grey q-mt-xs">
        Only use if special circumstances require deviation from standard rates
      </div>
    </div>

    <div class="q-mb-lg">
      <div class="text-subtitle2 q-mb-sm">Index Clause *</div>
      <q-select v-model="formData.indexRequired" :options="yesNoOptions" label="Index required? *" outlined
        :rules="[val => !!val || 'This field is required']" />
    </div>

    <div v-if="selectedCoversCount > 0" class="q-mt-lg bg-grey-2 q-pa-md rounded-borders">
      <div class="text-subtitle2 q-mb-sm">Summary of Selected Coverage</div>

      <div class="row">
        <div class="col-12 col-md-6">
          <div v-for="cover in activeCovers" :key="cover.type" class="q-mb-xs">
            <q-icon name="check_circle" color="positive" size="sm" />
            {{ cover.type }}: <strong>{{ cover.rate }}</strong>
          </div>
        </div>

        <div class="col-12 col-md-6">
          <div class="text-caption">
            <strong>Total Covers Selected:</strong> {{ selectedCoversCount }}
          </div>
          <div v-if="showSpecialCasesSection" class="text-caption text-blue">
            <q-icon name="info" size="sm" />
            <strong>{{ getSecondaryProduct() }} Active</strong>
          </div>
          <div v-if="formData.exceptionManualRate" class="text-caption text-red">
            <q-icon name="warning" size="sm" />
            <strong>Manual Rate Applied:</strong> {{ formData.exceptionManualRate }}‰
          </div>
        </div>
      </div>
    </div>

    <div class="q-mt-md">
      <q-banner :class="isFormValid ? 'bg-positive text-white' : 'bg-warning text-dark'">
        <template v-slot:avatar>
          <q-icon :name="isFormValid ? 'check_circle' : 'warning'" />
        </template>
        {{ validationMessage }}
        <template v-if="!isFormValid" v-slot:action>
          <div class="text-caption">
            <strong>Missing:</strong> {{ missingFieldsCount }} field(s)
          </div>
        </template>
      </q-banner>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, defineEmits, defineProps } from 'vue'

const emit = defineEmits(['validation-changed', 'update:modelValue', 'cover-selected'])

const props = defineProps({
  customerType: {
    type: String,
    default: 'Private'
  },
  productType: {
    type: String,
    default: ''
  }
})

const formData = reactive({
  buildingOnly: '',
  generalContentsOnly: '',
  highRisk: '',
  valuablesJewelry: '',
  solarPanels: '',
  policyNumber: '',
  exceptionManualRate: '',
  exceptionManualReason: '',
  indexRequired: ''
})

const requiredFields = [
  'buildingOnly',
  'generalContentsOnly',
  'highRisk',
  'valuablesJewelry',
  'solarPanels',
  'policyNumber',
  'indexRequired'
]

const products = {
  'FIR': {
    name: 'Fire Only (FIR)',
    description: 'Basic fire insurance coverage',
    rates: {
      buildingOnly: '1.50‰',
      generalContentsOnly: '5.00‰',
      highRisk: '6.50‰',
      valuablesJewelry: '7.50‰',
      solarPanels: '3.00‰'
    },
    secondaryProduct: 'CFT',
    requiresSecondaryPolicy: true
  },
  'FIRA': {
    name: 'Fire All Extended (FIRA)',
    description: 'Extended fire insurance with additional coverage',
    rates: {
      buildingOnly: '2.00‰',
      generalContentsOnly: '6.00‰',
      highRisk: '8.00‰',
      valuablesJewelry: '9.00‰',
      solarPanels: '10.00‰'
    },
    secondaryProduct: 'CFTE',
    requiresSecondaryPolicy: true
  },
  'SCAS': {
    name: 'Smart Cas',
    description: 'Comprehensive insurance package for residential properties',
    rates: {
      buildingOnly: '2.25‰',
      generalContentsOnly: '6.00‰',
      highRisk: '8.00‰',
      valuablesJewelry: '9.00‰',
      solarPanels: '10.00‰'
    },
    secondaryProduct: 'CFTE',
    requiresSecondaryPolicy: true
  },
  'SECAS': {
    name: 'Smart Economy Cas',
    description: 'Economical insurance package for residential properties',
    rates: {
      buildingOnly: '2.50‰',
      generalContentsOnly: '5.50‰',
      highRisk: '10.00‰',
      valuablesJewelry: '12.00‰',
      solarPanels: '10.00‰'
    },
    secondaryProduct: '',
    requiresSecondaryPolicy: false
  }
}

const selectedProduct = ref(props.productType || '')
const yesNoOptions = ['Yes', 'No']

const selectedProductDisplay = computed(() => {
  return products[selectedProduct.value]?.name || selectedProduct.value
})

const selectedProductData = computed(() => {
  return products[selectedProduct.value] || {}
})

const selectedCoversCount = computed(() => {
  const covers = [
    formData.buildingOnly,
    formData.generalContentsOnly,
    formData.highRisk,
    formData.valuablesJewelry,
    formData.solarPanels
  ]
  return covers.filter(cover => cover === 'Yes').length
})

const hasCoverSelection = computed(() => {
  return selectedCoversCount.value > 0
})

const allRequiredFieldsFilled = computed(() => {
  return requiredFields.every(field => {
    const value = formData[field]
    return value !== null && value !== undefined && value.toString().trim() !== ''
  })
})

const missingFields = computed(() => {
  return requiredFields.filter(field => {
    const value = formData[field]
    return !value || value.toString().trim() === ''
  })
})

const missingFieldsCount = computed(() => {
  return missingFields.value.length
})

const activeCovers = computed(() => {
  const covers = []
  const coverTypes = [
    { key: 'buildingOnly', label: 'Building Only' },
    { key: 'generalContentsOnly', label: 'General Contents Only' },
    { key: 'highRisk', label: 'High Risk' },
    { key: 'valuablesJewelry', label: 'Valuables / Jewelry' },
    { key: 'solarPanels', label: 'Solar Panels' }
  ]

  coverTypes.forEach(cover => {
    if (formData[cover.key] === 'Yes') {
      covers.push({
        type: cover.label,
        rate: getCoverRate(cover.key)
      })
    }
  })

  return covers
})

const showSpecialCasesSection = computed(() => {
  return formData.buildingOnly === 'Yes' &&
    formData.highRisk === 'Yes' &&
    selectedProductData.value.requiresSecondaryPolicy
})

const policyNumberHint = computed(() => {
  if (showSpecialCasesSection.value) {
    return 'Note: Will generate 2 policy numbers'
  }
  return 'Will be auto-generated upon submission'
})

const isFormValid = computed(() => {
  return allRequiredFieldsFilled.value && hasCoverSelection.value
})

const validationMessage = computed(() => {
  if (!isFormValid.value) {
    if (missingFieldsCount.value > 0) {
      const fieldsList = missingFields.value.map(field => {
        return field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
      }).join(', ')

      return `Please fill all required fields: ${fieldsList}`
    }

    if (!hasCoverSelection.value) {
      return 'Please select at least one cover type'
    }

    return 'Please complete all required fields'
  }

  return `All fields completed: ${selectedCoversCount.value} cover(s) selected - Ready to continue`
})

const getProductDescription = (product) => {
  return products[product]?.description || ''
}

const getSecondaryProduct = () => {
  return selectedProductData.value.secondaryProduct || ''
}

const getCoverRate = (coverType) => {
  if (formData.exceptionManualRate) {
    return `${formData.exceptionManualRate}‰ (Manual)`
  }

  const rates = selectedProductData.value.rates || {}
  const rate = rates[coverType]

  if (rate) {
    return `${rate} (${selectedProduct.value})`
  }

  return 'Check rate'
}

const emitValidation = () => {
  emit('validation-changed', isFormValid.value)

  const dataToEmit = {
    ...formData,
    selectedProduct: selectedProduct.value,
    productData: selectedProductData.value,
    activeCovers: activeCovers.value,
    selectedCoversCount: selectedCoversCount.value,
    showSpecialCasesSection: showSpecialCasesSection.value,
    secondaryProduct: getSecondaryProduct(),
    isFormValid: isFormValid.value,
    missingFields: missingFields.value,
    missingFieldsCount: missingFieldsCount.value
  }
  emit('update:modelValue', dataToEmit)
}

const validate = () => {
  return isFormValid.value
}

const resetForm = () => {
  selectedProduct.value = props.productType || ''
  Object.keys(formData).forEach(key => {
    formData[key] = ''
  })
  emitValidation()
}

const generatePolicyNumber = () => {
  if (selectedProduct.value && !formData.policyNumber) {
    const timestamp = new Date().getTime().toString().slice(-4)
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    formData.policyNumber = `${selectedProduct.value}-${timestamp}-${random}`
  }
}

watch(() => selectedProduct.value, (newProduct) => {
  if (newProduct) {
    generatePolicyNumber()
  }
  emitValidation()
})

watch(isFormValid, (newVal) => {
  emit('validation-changed', newVal)
}, { immediate: true })

watch(() => props.productType, (newProduct) => {
  if (newProduct) {
    selectedProduct.value = newProduct
    generatePolicyNumber()
    emitValidation()
  }
})

watch(formData, () => {
  emitValidation()
}, { deep: true })

if (props.productType) {
  selectedProduct.value = props.productType
  generatePolicyNumber()
}

defineExpose({
  formData,
  selectedProduct,
  validate,
  resetForm,
  isFormValid,
  selectedCoversCount,
  activeCovers,
  selectedProductData,
  missingFields,
  missingFieldsCount
})
</script>

<style scoped>
.cover-required-container {
  max-width: 800px;
}

.rounded-borders {
  border-radius: 8px;
}

.bg-yellow-1 {
  background-color: rgba(255, 249, 196, 0.3);
}
</style>