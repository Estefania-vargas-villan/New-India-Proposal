<template>
  <div class="insurance-conditions-container">
    <div class="text-h6 text-primary q-mb-md">Step 10: Insurance & Claim History</div>
    
    <!-- Previous Insurance -->
    <div class="q-mb-lg">
      <div class="text-subtitle2 q-mb-sm">Previous Insurance History</div>
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-6">
          <q-select
            v-model="formData.previousInsurance"
            :options="yesNoOptions"
            label="Had previous insurance?"
            outlined
          />
        </div>
        <div v-if="formData.previousInsurance === 'Yes'" class="col-12 col-md-6">
          <q-input
            v-model="formData.previousInsurer"
            label="Previous Insurer"
            outlined
            placeholder="Name of previous insurance company"
          />
        </div>
      </div>
      
      <!-- Claim History -->
      <div class="row q-col-gutter-md q-mt-md">
        <div class="col-12 col-md-6">
          <q-select
            v-model="formData.previousClaims"
            :options="yesNoOptions"
            label="Any previous claims?"
            outlined
          />
        </div>
        <div v-if="formData.previousClaims === 'Yes'" class="col-12">
          <q-input
            v-model="formData.claimDetails"
            label="Claim Details"
            outlined
            type="textarea"
            rows="3"
            placeholder="Describe previous claims, amounts, and dates"
          />
        </div>
      </div>
    </div>

    <!-- Applicable Conditions & Deductibles -->
    <div class="q-mb-lg">
      <div class="text-subtitle2 q-mb-sm">Step 12: Applicable Conditions & Deductibles</div>
      
      <!-- Standard Conditions Notice -->
      <q-banner class="bg-blue-1 q-mb-md">
        <q-icon name="info" size="sm" class="q-mr-sm" />
        Standard NIA policy terms & conditions as per cover.
      </q-banner>

      <!-- Product-specific Conditions -->
      <div class="q-mb-lg">
        <div class="text-subtitle2 q-mb-sm">Standard Conditions for {{ selectedProductName }}</div>
        
        <!-- Automatic Conditions -->
        <div v-if="showIndexClause" class="q-mb-sm">
          <q-checkbox v-model="autoConditions.index" label="Subject to Index Clause" disable />
          <div class="text-caption text-grey">(Automatic - selected in Step 8)</div>
        </div>
        
        <div v-if="showSolarPanelsClause" class="q-mb-sm">
          <q-checkbox v-model="autoConditions.solarPanels" label="Subject to Solar Panels Clause" disable />
          <div class="text-caption text-grey">(Automatic - solar panels amount entered in Step 9)</div>
        </div>
        
        <div v-if="showLossOfRentClause" class="q-mb-sm">
          <q-checkbox v-model="autoConditions.lossOfRent" label="Subject to Loss of Rent Clause" disable />
          <div class="text-caption text-grey">(Automatic - selected in Step 9 question 12f)</div>
        </div>

        <!-- Product-specific Conditions List -->
        <div class="bg-grey-2 q-pa-md rounded-borders">
          <div v-for="condition in productConditions" :key="condition" class="q-mb-xs">
            <q-checkbox v-model="selectedConditions" :val="condition" :label="condition" />
          </div>
        </div>
      </div>

      <!-- Additional Clauses -->
      <div class="q-mb-lg">
        <div class="text-subtitle2 q-mb-sm">Additional Clauses</div>
        <q-input
          v-model="formData.additionalClauses"
          label="Add additional clauses if needed"
          outlined
          type="textarea"
          rows="2"
          placeholder="Enter any additional clauses not covered above"
        />
      </div>

      <!-- Excess/Deductibles -->
      <div class="q-mb-lg">
        <div class="text-subtitle2 q-mb-sm">Applicable Excess/Deductibles</div>
        
        <!-- Excess for Catastrophic Perils -->
        <div v-if="showCatastrophicExcess" class="row q-col-gutter-md q-mb-md">
          <div class="col-12 col-md-8">
            <div class="text-caption">Excess for catastrophic perils:</div>
          </div>
          <div class="col-12 col-md-4 text-right">
            <strong>2% of total sum insured</strong>
          </div>
        </div>

        <!-- Standard Excess -->
        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-12 col-md-6">
            <div class="text-caption">
              {{ getExcessLabel('standard') }}
            </div>
          </div>
          <div class="col-12 col-md-6">
            <q-input
              v-model="formData.standardExcessAmount"
              outlined
              prefix="AWG"
              type="number"
              placeholder="Enter amount"
              :hint="getExcessHint('standard')"
            />
          </div>
        </div>

        <!-- Solar Panels Excess -->
        <div v-if="showSolarPanelsExcess" class="row q-col-gutter-md q-mb-md">
          <div class="col-12 col-md-6">
            <div class="text-caption">Excess Solar Panels:</div>
          </div>
          <div class="col-12 col-md-6 text-right">
            <strong>AWG 1,500.00 each and every claim</strong>
          </div>
        </div>
      </div>

      <!-- Special Conditions for CFT/CFTE -->
      <div v-if="isCFTProduct" class="q-mb-lg bg-yellow-1 q-pa-md rounded-borders">
        <div class="text-subtitle2 q-mb-sm">Special Conditions for {{ selectedProductName }}</div>
        <div v-for="condition in cftConditions" :key="condition" class="q-mb-xs">
          <q-checkbox v-model="cftSelectedConditions" :val="condition" :label="condition" />
        </div>
      </div>
    </div>

    <!-- Summary of Conditions -->
    <div v-if="selectedConditions.length > 0" class="q-mt-lg bg-grey-2 q-pa-md rounded-borders">
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

    <!-- Validation Status -->
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

// Form data
const formData = reactive({
  previousInsurance: '',
  previousInsurer: '',
  previousClaims: '',
  claimDetails: '',
  standardExcessAmount: '',
  additionalClauses: '',
  ...props.formData
})

// Options
const yesNoOptions = ['Yes', 'No']

// Auto conditions (checked automatically based on selections)
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

// Computed properties
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

const getExcessHint = (type) => {
  return 'AWG. ---------- On each and every claim'
}

const isFormValid = computed(() => {
  // Previous insurance info if Yes is selected
  if (formData.previousInsurance === 'Yes' && !formData.previousInsurer) {
    return false
  }
  
  if (formData.previousClaims === 'Yes' && !formData.claimDetails) {
    return false
  }
  
  // Standard excess amount is required
  if (!formData.standardExcessAmount) {
    return false
  }
  
  return true
})

const validationMessage = computed(() => {
  if (!isFormValid.value) {
    if (!formData.standardExcessAmount) {
      return 'Please enter the standard excess amount'
    }
    if (formData.previousInsurance === 'Yes' && !formData.previousInsurer) {
      return 'Please specify previous insurer'
    }
    return 'Please complete all required fields'
  }
  return `Valid: ${allSelectedConditions.value.length} condition(s) selected`
})

// Methods
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
  Object.keys(formData).forEach(key => {
    formData[key] = ''
  })
  selectedConditions.value = []
  cftSelectedConditions.value = []
  autoConditions.index = props.hasIndexClause
  autoConditions.solarPanels = props.hasSolarPanels
  autoConditions.lossOfRent = props.hasLossOfRent
}

// Watchers
watch(isFormValid, (newVal) => {
  emit('validation-changed', newVal)
}, { immediate: true })

watch(formData, () => {
  emitValidation()
}, { deep: true })

watch(() => props.productType, () => {
  // Reset selected conditions when product changes
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

// Initialize
if (props.formData) {
  Object.assign(formData, props.formData)
}

// Expose methods
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
</style>