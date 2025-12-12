<template>
  <div>
    <div class="text-h6 text-primary q-mb-md">Insurance & Claim History</div>

    <div class="q-mb-lg">
      <div class="text-subtitle2 q-mb-sm">Previous Insurance History</div>
      <div class="row q-col-gutter-md">
        <div class="col-12">
          <div class="text-caption q-mb-xs">Had previous insurance? *</div>
          <div class="row q-gutter-md">
            <div class="col-auto">
              <q-radio v-model="formData.previousInsurance" val="Yes" label="Yes" />
            </div>
            <div class="col-auto">
              <q-radio v-model="formData.previousInsurance" val="No" label="No" />
            </div>
          </div>
        </div>
        
        <div v-if="formData.previousInsurance === 'Yes'" class="col-12 col-md-6">
          <q-input v-model="formData.previousInsurer" label="Previous Insurer *" outlined
            placeholder="Name of previous insurance company" />
        </div>
      </div>

      <div class="row q-col-gutter-md q-mt-md">
        <div class="col-12">
          <div class="text-caption q-mb-xs">Any previous claims? *</div>
          <div class="row q-gutter-md">
            <div class="col-auto">
              <q-radio v-model="formData.previousClaims" val="Yes" label="Yes" />
            </div>
            <div class="col-auto">
              <q-radio v-model="formData.previousClaims" val="No" label="No" />
            </div>
          </div>
        </div>
        
        <div v-if="formData.previousClaims === 'Yes'" class="col-12">
          <q-input v-model="formData.claimDetails" label="Claim Details *" outlined type="textarea" rows="3"
            placeholder="Describe previous claims, amounts, and dates" />
        </div>
      </div>
    </div>

    <div class="q-mb-lg">
      <div class="text-subtitle2 q-mb-sm">Applicable Conditions & Deductibles</div>

      <q-banner class="bg-blue-1 q-mb-md">
        <q-icon name="info" size="sm" class="q-mr-sm" />
        Standard NIA policy terms & conditions as per cover.
      </q-banner>

      <div class="q-mb-lg">
        <div class="text-subtitle2 q-mb-sm">Standard Conditions for {{ selectedProductName }}</div>

        <div v-if="showIndexClause" class="q-mb-sm">
          <q-checkbox v-model="autoConditions.index" label="Subject to Index Clause" disable />
          <div class="text-caption text-grey">(Automatic)</div>
        </div>

        <div v-if="showSolarPanelsClause" class="q-mb-sm">
          <q-checkbox v-model="autoConditions.solarPanels" label="Subject to Solar Panels Clause" disable />
          <div class="text-caption text-grey">(Automatic - solar panels amount entered )</div>
        </div>

        <div v-if="showLossOfRentClause" class="q-mb-sm">
          <q-checkbox v-model="autoConditions.lossOfRent" label="Subject to Loss of Rent Clause" disable />
          <div class="text-caption text-grey">(Automatic)</div>
        </div>

        <div class="bg-grey-2 q-pa-md rounded-borders">
          <div v-if="productConditions.length > 0">
            <div v-for="condition in productConditions" :key="condition" class="q-mb-xs">
              <q-checkbox v-model="selectedConditions" :val="condition" :label="condition" />
            </div>
          </div>
          <div v-else class="text-center text-grey q-py-md">
            No standard conditions available for this product
          </div>
        </div>
      </div>

      <div class="q-mb-lg">
        <div class="text-subtitle2 q-mb-sm">Additional Clauses</div>
        <q-input v-model="formData.additionalClauses" label="Add additional clauses if needed" outlined type="textarea"
          rows="2" placeholder="Enter any additional clauses not covered above" />
      </div>

      <div class="q-mb-lg">
        <div class="text-subtitle2 q-mb-sm">Applicable Excess/Deductibles</div>

        <div v-if="showCatastrophicExcess" class="row q-col-gutter-md q-mb-md">
          <div class="col-12 col-md-8">
            <div class="text-caption">Excess for catastrophic perils:</div>
          </div>
          <div class="col-12 col-md-4 text-right">
            <strong>2% of total sum insured</strong>
          </div>
        </div>

        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-12 col-md-6">
            <div class="text-caption">
              {{ getExcessLabel('standard') }}
            </div>
          </div>
          <div class="col-12 col-md-6">
            <q-input v-model="formData.standardExcessAmount" outlined prefix="AWG" type="number"
              placeholder="Enter amount *" :hint="getExcessHint('standard')" />
          </div>
        </div>

        <div v-if="showSolarPanelsExcess" class="row q-col-gutter-md q-mb-md">
          <div class="col-12 col-md-6">
            <div class="text-caption">Excess Solar Panels:</div>
          </div>
          <div class="col-12 col-md-6 text-right">
            <strong>AWG 1,500.00 each and every claim</strong>
          </div>
        </div>
      </div>

      <div v-if="isCFTProduct" class="q-mb-lg bg-yellow-1 q-pa-md rounded-borders">
        <div class="text-subtitle2 q-mb-sm">Special Conditions for {{ selectedProductName }}</div>
        <div v-if="cftConditions.length > 0">
          <div v-for="condition in cftConditions" :key="condition" class="q-mb-xs">
            <q-checkbox v-model="cftSelectedConditions" :val="condition" :label="condition" />
          </div>
        </div>
        <div v-else class="text-center text-grey q-py-md">
          No special conditions available
        </div>
      </div>
    </div>

    <div v-if="allSelectedConditions.length > 0" class="q-mt-lg bg-grey-2 q-pa-md rounded-borders">
      <div class="text-subtitle2 q-mb-sm">Summary of Selected Conditions</div>
      <div v-for="condition in allSelectedConditions" :key="condition" class="q-mb-xs">
        <q-icon name="check_circle" color="positive" size="sm" />
        {{ condition }}
      </div>

      <div v-if="formData.standardExcessAmount" class="q-mt-sm">
        <strong>Standard Excess:</strong> AWG {{ formData.standardExcessAmount }} on each and every claim
      </div>

      <div v-if="showCatastrophicExcess" class="q-mt-sm">
        <strong>Catastrophic Excess:</strong> 2% of total sum insured
      </div>

      <div v-if="showSolarPanelsExcess" class="q-mt-sm">
        <strong>Solar Panels Excess:</strong> AWG 1,500.00 each and every claim
      </div>
    </div>

    <div class="q-mt-md">
      <q-banner :class="isFormValid ? 'bg-positive text-white' : 'bg-warning text-dark'">
        <template v-slot:avatar>
          <q-icon :name="isFormValid ? 'check_circle' : 'warning'" />
        </template>
        {{ validationMessage }}
      </q-banner>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, defineEmits, defineProps } from 'vue'

const emit = defineEmits(['validation-changed', 'update:modelValue'])

const props = defineProps({
  productType: {
    type: String,
    default: ''
  },
  formData: {
    type: Object,
    default: () => ({})
  },
  hasSolarPanels: {
    type: Boolean,
    default: false
  },
  hasLossOfRent: {
    type: Boolean,
    default: false
  },
  hasIndexClause: {
    type: Boolean,
    default: false
  }
})

const formData = reactive({
  previousInsurance: '',
  previousInsurer: '',
  previousClaims: '',
  claimDetails: '',
  standardExcessAmount: '',
  additionalClauses: '',
  ...props.formData
})

const autoConditions = reactive({
  index: props.hasIndexClause,
  solarPanels: props.hasSolarPanels,
  lossOfRent: props.hasLossOfRent
})

const selectedConditions = ref([])
const cftSelectedConditions = ref([])

const conditionsDatabase = {
  'FIR': [
    'Subject to special conditions relating to buildings in course of construction.',
    'Acts of Terrorism and Malicious Damage are excluded from cover.',
    'Subject to Reinstatement Value Clause.',
    'Subject to Infectious Disease Exclusion Clause.',
    'Subject to Index Clause',
    'Subject to Risk Prevention warranty'
  ],
  'FIRA': [
    'Acts of Terrorism and Malicious Damage are excluded from cover',
    'Subject to Reinstatement Value Clause',
    'Subject to Infectious Disease Exclusion Clause',
    'Subject to Dynamo Exclusion Clause',
    'Subject to Risk Prevention warranty'
  ],
  'SCAS': [
    'Subject to Infectious Disease Exclusion Clause',
    'Subject to Dynamo Exclusion Clause',
    'Subject to Risk Prevention warranty'
  ],
  'SECAS': [
    'Subject to Infectious Disease Exclusion Clause',
    'Subject to Dynamo Exclusion Clause',
    'No Jewelry / valuables outside safe should not exceed AWG 900.00 (US$ 500.00)',
    'Subject to Risk Prevention warranty'
  ],
  'CFT': [
    'Acts of Terrorism and Malicious Damage are excluded from cover',
    'Subject to Infectious Disease Exclusion Clause',
    'Subject to Dynamo Exclusion Clause',
    'Subject to CFT 5 Clause',
    'Police Report Must',
    'No Jewelry / valuables outside safe should not exceed AWG 900.00 (US$ 500.00)'
  ],
  'CFTE': [
    'Acts of Terrorism and Malicious Damage are excluded from cover',
    'Subject to Infectious Disease Exclusion Clause',
    'Subject to Dynamo Exclusion Clause',
    'Subject to CFT 5 Clause',
    'Police Report Must',
    'No Jewelry / valuables outside safe should not exceed AWG 900.00 (US$ 500.00)'
  ]
}

const selectedProductName = computed(() => {
  const productNames = {
    'FIR': 'Fire Only',
    'FIRA': 'Fire All Extended',
    'SCAS': 'Smart Cas',
    'SECAS': 'Smart Economy Cas',
    'CFT': 'CFT',
    'CFTE': 'CFTE'
  }
  return productNames[props.productType] || props.productType
})

const isCFTProduct = computed(() => {
  return ['CFT', 'CFTE'].includes(props.productType)
})

const showIndexClause = computed(() => {
  return props.hasIndexClause && !isCFTProduct.value
})

const showSolarPanelsClause = computed(() => {
  return props.hasSolarPanels && !isCFTProduct.value
})

const showLossOfRentClause = computed(() => {
  return props.hasLossOfRent && !isCFTProduct.value
})

const showCatastrophicExcess = computed(() => {
  // FIRA, SCAS, SECAS, CFTE have catastrophic excess
  return ['FIRA', 'SCAS', 'SECAS', 'CFTE'].includes(props.productType)
})

const showSolarPanelsExcess = computed(() => {
  return props.hasSolarPanels && !isCFTProduct.value
})

const productConditions = computed(() => {
  return conditionsDatabase[props.productType] || []
})

const cftConditions = computed(() => {
  return conditionsDatabase[props.productType] || []
})

const allSelectedConditions = computed(() => {
  const auto = []
  if (autoConditions.index && showIndexClause.value) auto.push('Subject to Index Clause')
  if (autoConditions.solarPanels && showSolarPanelsClause.value) auto.push('Subject to Solar Panels Clause')
  if (autoConditions.lossOfRent && showLossOfRentClause.value) auto.push('Subject to Loss of Rent Clause')

  return [...auto, ...selectedConditions.value, ...cftSelectedConditions.value]
})

const getExcessLabel = (type) => {
  if (isCFTProduct.value) {
    return 'Excess Applicable:'
  }
  return type === 'catastrophic'
    ? 'Excess for catastrophic perils:'
    : 'Excess Any Other Perils:'
}

const getExcessHint = (_type) => {
  return 'AWG. ---------- On each and every claim'
}

const isFormValid = computed(() => {
  if (!formData.previousInsurance) {
    return false
  }

  if (!formData.previousClaims) {
    return false
  }

  if (formData.previousInsurance === 'Yes' && !formData.previousInsurer.trim()) {
    return false
  }

  if (formData.previousClaims === 'Yes' && !formData.claimDetails.trim()) {
    return false
  }

  if (!formData.standardExcessAmount || isNaN(formData.standardExcessAmount) || Number(formData.standardExcessAmount) <= 0) {
    return false
  }

  return true
})

const validationMessage = computed(() => {
  if (!isFormValid.value) {
    if (!formData.previousInsurance) {
      return 'Please select if you had previous insurance'
    }
    if (!formData.previousClaims) {
      return 'Please select if you had previous claims'
    }
    if (formData.previousInsurance === 'Yes' && !formData.previousInsurer.trim()) {
      return 'Please specify previous insurer'
    }
    if (formData.previousClaims === 'Yes' && !formData.claimDetails.trim()) {
      return 'Please provide claim details'
    }
    if (!formData.standardExcessAmount || isNaN(formData.standardExcessAmount) || Number(formData.standardExcessAmount) <= 0) {
      return 'Please enter a valid standard excess amount'
    }
    return 'Please complete all required fields'
  }
  return `Valid: ${allSelectedConditions.value.length} condition(s) selected`
})

const emitValidation = () => {
  const dataToEmit = {
    ...formData,
    selectedConditions: allSelectedConditions.value,
    autoConditions: { ...autoConditions }
  }

  emit('update:modelValue', dataToEmit)
  emit('validation-changed', isFormValid.value)
}

const validate = () => {
  return isFormValid.value
}

const resetForm = () => {
  formData.previousInsurance = ''
  formData.previousInsurer = ''
  formData.previousClaims = ''
  formData.claimDetails = ''
  formData.standardExcessAmount = ''
  formData.additionalClauses = ''
  
  selectedConditions.value = []
  cftSelectedConditions.value = []
  
  autoConditions.index = props.hasIndexClause
  autoConditions.solarPanels = props.hasSolarPanels
  autoConditions.lossOfRent = props.hasLossOfRent
}

watch(isFormValid, (newVal) => {
  emit('validation-changed', newVal)
}, { immediate: true })

watch(formData, () => {
  emitValidation()
}, { deep: true })

watch(() => props.productType, () => {
  selectedConditions.value = []
  cftSelectedConditions.value = []
})

watch(() => props.hasSolarPanels, (newVal) => {
  autoConditions.solarPanels = newVal
})

watch(() => props.hasLossOfRent, (newVal) => {
  autoConditions.lossOfRent = newVal
})

watch(() => props.hasIndexClause, (newVal) => {
  autoConditions.index = newVal
})

if (props.formData) {
  Object.assign(formData, props.formData)
}

watch(() => [props.hasSolarPanels, props.hasLossOfRent, props.hasIndexClause], () => {
  autoConditions.solarPanels = props.hasSolarPanels
  autoConditions.lossOfRent = props.hasLossOfRent
  autoConditions.index = props.hasIndexClause
}, { immediate: true })

defineExpose({
  formData,
  validate,
  resetForm,
  isFormValid,
  allSelectedConditions
})
</script>

<style scoped>
.insurance-conditions-container {
  max-width: 800px;
}

.rounded-borders {
  border-radius: 8px;
}

.q-radio {
  margin-right: 8px;
}
</style>