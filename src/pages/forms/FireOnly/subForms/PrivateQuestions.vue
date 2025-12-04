<template>
  <div>
    <div class="q-mt-md">      
      <div class="q-mb-md">
        <div class="text-subtitle2 q-mb-sm">12a) On main building(s) and structures *</div>
        <q-select
          v-model="selectedBuildingItems"
          :options="buildingOptions"
          label="Select building items to insure"
          multiple
          outlined
          emit-value
          map-options
          :rules="[val => val && val.length > 0 || 'Select at least one building item']"
        />
        
        <div v-for="item in selectedBuildingItems" :key="item" class="q-ml-md q-mt-sm">
          <q-input
            v-model="buildingAmounts[item]"
            :label="`Amount for ${getBuildingLabel(item)}`"
            type="number"
            prefix="$"
            outlined
            dense
            :rules="[val => val > 0 || 'Amount must be greater than 0']"
            @update:model-value="validate"
          />
        </div>
      </div>

      <div class="q-mb-md">
        <div class="text-subtitle2 q-mb-sm">12b) On household contents *</div>
        <q-select
          v-model="selectedContentsItems"
          :options="contentsOptions"
          label="Select contents items to insure"
          multiple
          outlined
          emit-value
          map-options
          :rules="[val => val && val.length > 0 || 'Select at least one contents item']"
          @update:model-value="validate"
        />
        
        <div v-for="item in selectedContentsItems" :key="item" class="q-ml-md q-mt-sm">
          <q-input
            v-model="contentsAmounts[item]"
            :label="`Amount for ${getContentsLabel(item)}`"
            type="number"
            prefix="$"
            outlined
            dense
            :rules="[val => val > 0 || 'Amount must be greater than 0']"
            @update:model-value="validate"
          />
        </div>
      </div>

      <div class="q-mb-md">
        <div class="text-subtitle2 q-mb-sm">12c) On high risk electronic equipment *</div>
        <q-select
          v-model="selectedHighRiskItems"
          :options="highRiskOptions"
          label="Select high risk items to insure"
          multiple
          outlined
          emit-value
          map-options
          :rules="[val => val && val.length > 0 || 'Select at least one high risk item']"
          @update:model-value="validate"
        />
        
        <div v-for="item in selectedHighRiskItems" :key="item" class="q-ml-md q-mt-sm">
          <q-input
            v-model="highRiskAmounts[item]"
            :label="`Amount for ${getHighRiskLabel(item)}`"
            type="number"
            prefix="$"
            outlined
            dense
            :rules="[val => val > 0 || 'Amount must be greater than 0']"
            @update:model-value="validate"
          />
        </div>
      </div>

      <div class="q-mb-md">
        <div class="text-subtitle2 q-mb-sm">12d) On valuables and antiques *</div>
        <q-select
          v-model="selectedValuablesItems"
          :options="valuablesOptions"
          label="Select valuables to insure"
          multiple
          outlined
          emit-value
          map-options
          :rules="[val => val && val.length > 0 || 'Select at least one valuable item']"
          @update:model-value="validate"
        />
        
        <div v-for="item in selectedValuablesItems" :key="item" class="q-ml-md q-mt-sm">
          <q-input
            v-model="valuablesAmounts[item]"
            :label="`Amount for ${getValuablesLabel(item)}`"
            type="number"
            prefix="$"
            outlined
            dense
            :rules="[val => val > 0 || 'Amount must be greater than 0']"
            @update:model-value="validate"
          />
        </div>
      </div>

      <div class="q-mb-md">
        <div class="text-subtitle2 q-mb-sm">12e) Other items *</div>
        <q-input
          v-model="otherItemsDescription"
          label="Description of other items"
          outlined
          class="q-mb-sm"
          :rules="[val => !!val || 'Description is required']"
          @update:model-value="validate"
        />
        <q-input
          v-model="otherItemsAmount"
          label="Amount for other items"
          type="number"
          prefix="$"
          outlined
          :rules="[val => val > 0 || 'Amount must be greater than 0']"
          @update:model-value="validate"
        />
      </div>

      <div class="q-mb-md">
        <div class="text-subtitle2 q-mb-sm">12f) Additional coverages *</div>
        <q-select
          v-model="selectedAdditionalCoverages"
          :options="additionalCoverageOptions"
          label="Select additional coverages"
          multiple
          outlined
          emit-value
          map-options
          :rules="[val => val && val.length > 0 || 'Select at least one additional coverage']"
          @update:model-value="validate"
        />
        
        <div v-if="selectedAdditionalCoverages.includes('loss_of_rent')" class="q-ml-md q-mt-sm">
          <q-input
            v-model="additionalCoverageValues.lossOfRentWeeks"
            label="Number of weeks for loss of rent"
            type="number"
            suffix="weeks"
            outlined
            dense
            :rules="[
              val => val > 0 || 'Weeks must be greater than 0',
              val => val <= 52 || 'Maximum 52 weeks'
            ]"
            @update:model-value="validate"
          />
          <div class="text-caption text-grey-7 q-mt-xs">
            Subject to maximum of 5% of TSI ({{ formatCurrency(maxLossOfRent) }})
          </div>
        </div>
        
        <div v-if="selectedAdditionalCoverages.includes('removal_debris')" class="q-ml-md q-mt-sm">
          <q-input
            v-model="additionalCoverageValues.removalDebrisPercentage"
            label="Percentage for removal of debris"
            type="number"
            suffix="%"
            outlined
            dense
            :rules="[
              val => val > 0 || 'Percentage must be greater than 0',
              val => val <= 10 || 'Maximum 10% of TSI'
            ]"
            @update:model-value="validate"
          />
          <div class="text-caption text-grey-7 q-mt-xs">
            Subject to maximum of 10% of TSI ({{ formatCurrency(maxRemovalDebris) }})
          </div>
        </div>
        
        <div v-if="selectedAdditionalCoverages.includes('burglary_damage')" class="q-ml-md q-mt-sm">
          <q-input
            v-model="additionalCoverageValues.burglaryDamageAmount"
            label="Amount for damage to building in burglary"
            type="number"
            prefix="$"
            outlined
            dense
            :rules="[val => val > 0 || 'Amount must be greater than 0']"
            @update:model-value="validate"
          />
        </div>
      </div>

      <q-card v-if="totalSumInsured > 0" flat bordered class="bg-blue-1 q-mt-md">
        <q-card-section>
          <div class="text-subtitle2 text-weight-medium">Total Sum Insured: {{ formatCurrency(totalSumInsured) }}</div>
          <div v-if="additionalCoverageValues.lossOfRentWeeks > 0" class="text-caption">
            Loss of Rent ({{ additionalCoverageValues.lossOfRentWeeks }} weeks): {{ formatCurrency(calculatedLossOfRent) }}
          </div>
          <div v-if="additionalCoverageValues.removalDebrisPercentage > 0" class="text-caption">
            Removal of Debris ({{ additionalCoverageValues.removalDebrisPercentage }}%): {{ formatCurrency(calculatedRemovalDebris) }}
          </div>
          <div v-if="additionalCoverageValues.burglaryDamageAmount > 0" class="text-caption">
            Burglary Damage: {{ formatCurrency(additionalCoverageValues.burglaryDamageAmount) }}
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>

      
</template>

<script setup>
import { computed, reactive, ref, watch, defineExpose } from 'vue'

const emit = defineEmits(['validation-changed'])

const selectedBuildingItems = ref([])
const selectedContentsItems = ref([])
const selectedHighRiskItems = ref([])
const selectedValuablesItems = ref([])
const otherItemsAmount = ref(null)
const otherItemsDescription = ref('')
const selectedAdditionalCoverages = ref([])

const buildingAmounts = reactive({})
const contentsAmounts = reactive({})
const highRiskAmounts = reactive({})
const valuablesAmounts = reactive({})
const additionalCoverageValues = reactive({
  lossOfRentWeeks: 0,
  removalDebrisPercentage: 0,
  burglaryDamageAmount: 0
})



const buildingLabels = [
  'On main building(s)',
  'On fence/ premises boundary wall / gates',
  'Servant quarters / outhouses / Garage',
  'Tenants interest / improvements',
  'On landscaping / pavers / garden paving',
  'On swimming-pool / pool-deck',
  'On gazebo',
  'On bar',
  'On storage',
  'On Solar Panels',
]

const contentsLabels = [
  'On household furniture, fixtures and fittings.',
  'On household personal effects / gadgets / equipment.',
  'On piano and organ.',
  'On split aircos or water heater units or moveable property outside the house but within the fence.',

]

const highRiskLabels = [
  'On Computers and Laptops',
  'On Cameras and video games',
  'On Cellular phones & I-pods',
  'Any other portable electronic equipment',

]

const valuablesLabels = [
  'On Jewellery, watches or Trinkets or Personal Ornaments or Furs or Gold and Silver.',
  'On art and antique items',
  
]

const additionalCoverageOptions = [
  { label: 'On loss of rent receivable (max 5% of TSI)', value: 'loss_of_rent' },
  { label: 'On removal of debris (max 10% of TSI)', value: 'removal_debris' },
  { label: 'On damage to building in burglary', value: 'burglary_damage' }
]


const maxLossOfRent = computed(() => {
  return totalSumInsured.value * 0.05 
})

const maxRemovalDebris = computed(() => {
  return totalSumInsured.value * 0.10 
})

const calculatedLossOfRent = computed(() => {
  const percentage = Math.min((additionalCoverageValues.lossOfRentWeeks / 52) * 0.05, 0.05)
  return totalSumInsured.value * percentage
})

const calculatedRemovalDebris = computed(() => {
  const percentage = Math.min(additionalCoverageValues.removalDebrisPercentage / 100, 0.10)
  return totalSumInsured.value * percentage
})


const buildingOptions = computed(() => 
  buildingLabels.map((label, index) => ({ label, value: index }))
)

const contentsOptions = computed(() => 
  contentsLabels.map((label, index) => ({ label, value: index }))
)

const highRiskOptions = computed(() => 
  highRiskLabels.map((label, index) => ({ label, value: index }))
)

const valuablesOptions = computed(() => 
  valuablesLabels.map((label, index) => ({ label, value: index }))
)

const getBuildingLabel = (index) => buildingLabels[index] || `Building ${index}`
const getContentsLabel = (index) => contentsLabels[index] || `Contents ${index}`
const getHighRiskLabel = (index) => highRiskLabels[index] || `High Risk ${index}`
const getValuablesLabel = (index) => valuablesLabels[index] || `Valuables ${index}`

const totalSumInsured = computed(() => {
  let total = 0
  
  selectedBuildingItems.value.forEach(item => {
    total += Number(buildingAmounts[item]) || 0
  })
  
  selectedContentsItems.value.forEach(item => {
    total += Number(contentsAmounts[item]) || 0
  })
  
  selectedHighRiskItems.value.forEach(item => {
    total += Number(highRiskAmounts[item]) || 0
  })
  
  selectedValuablesItems.value.forEach(item => {
    total += Number(valuablesAmounts[item]) || 0
  })
  
  total += Number(otherItemsAmount.value) || 0
  
  return total
})

const isFormValid = ref(false)

const validate = () => {
  console.log('=== VALIDATING PRIVATE QUESTIONS ===')
  
  const hasBuildingItems = selectedBuildingItems.value.length > 0
  const hasContentsItems = selectedContentsItems.value.length > 0
  const hasHighRiskItems = selectedHighRiskItems.value.length > 0
  const hasValuablesItems = selectedValuablesItems.value.length > 0
  const hasOtherItems = Number(otherItemsAmount.value) > 0 && !!otherItemsDescription.value

 const hasAdditionalCoverages = selectedAdditionalCoverages.value.length > 0
  if (!hasAdditionalCoverages) {
    isFormValid.value = false
    emit('validation-changed', false)
    return false
  }
  
  let additionalCoveragesValid = true
  
  if (selectedAdditionalCoverages.value.includes('loss_of_rent')) {
    if (!additionalCoverageValues.lossOfRentWeeks || additionalCoverageValues.lossOfRentWeeks <= 0) {
      additionalCoveragesValid = false
    }
  }
  
  if (selectedAdditionalCoverages.value.includes('removal_debris')) {
    if (!additionalCoverageValues.removalDebrisPercentage || additionalCoverageValues.removalDebrisPercentage <= 0) {
      additionalCoveragesValid = false
    }
  }
  
  if (selectedAdditionalCoverages.value.includes('burglary_damage')) {
    if (!additionalCoverageValues.burglaryDamageAmount || additionalCoverageValues.burglaryDamageAmount <= 0) {
      additionalCoveragesValid = false
    }
  }
  
  if (!additionalCoveragesValid) {
    isFormValid.value = false
    emit('validation-changed', false)
    return false
  }
  if (!hasBuildingItems) {
    isFormValid.value = false
    emit('validation-changed', false)
    return false
  }

  if (!hasContentsItems) {
    isFormValid.value = false
    emit('validation-changed', false)
    return false
  }

  if (!hasHighRiskItems) {
    isFormValid.value = false
    emit('validation-changed', false)
    return false
  }

  if (!hasValuablesItems) {
    isFormValid.value = false
    emit('validation-changed', false)
    return false
  }

  if (!hasOtherItems) {
    isFormValid.value = false
    emit('validation-changed', false)
    return false
  }

  if (!hasAdditionalCoverages) {
    isFormValid.value = false
    emit('validation-changed', false)
    return false
  }
  
  const hasValidBuildingAmounts = selectedBuildingItems.value.every(item => 
    Number(buildingAmounts[item]) > 0
  )
  
  if (!hasValidBuildingAmounts) {
    isFormValid.value = false
    emit('validation-changed', false)
    return false
  }
  
  const hasValidContentsAmounts = selectedContentsItems.value.every(item => 
    Number(contentsAmounts[item]) > 0
  )
  if (!hasValidContentsAmounts) {
    isFormValid.value = false
    emit('validation-changed', false)
    return false
  }
  
  const hasValidHighRiskAmounts = selectedHighRiskItems.value.every(item => 
    Number(highRiskAmounts[item]) > 0
  )
  if (!hasValidHighRiskAmounts) {
    isFormValid.value = false
    emit('validation-changed', false)
    return false
  }
  
  const hasValidValuablesAmounts = selectedValuablesItems.value.every(item => 
    Number(valuablesAmounts[item]) > 0
  )
  if (!hasValidValuablesAmounts) {
    isFormValid.value = false
    emit('validation-changed', false)
    return false
  }
  
  isFormValid.value = true
  emit('validation-changed', true)
  return true
}

const resetForm = () => {
  console.log('Resetting PrivateQuestions form')
  
  selectedBuildingItems.value = []
  selectedContentsItems.value = []
  selectedHighRiskItems.value = []
  selectedValuablesItems.value = []
  selectedAdditionalCoverages.value = []
  
  otherItemsAmount.value = null
  otherItemsDescription.value = ''
  
  Object.keys(buildingAmounts).forEach(key => delete buildingAmounts[key])
  Object.keys(contentsAmounts).forEach(key => delete contentsAmounts[key])
  Object.keys(highRiskAmounts).forEach(key => delete highRiskAmounts[key])
  Object.keys(valuablesAmounts).forEach(key => delete valuablesAmounts[key])
  
  additionalCoverageValues.lossOfRentWeeks = 0
  additionalCoverageValues.removalDebrisPercentage = 0
  additionalCoverageValues.burglaryDamageAmount = 0
  isFormValid.value = false
  emit('validation-changed', false)
}
watch(() => additionalCoverageValues, validate, { deep: true })

watch([
  selectedBuildingItems,
  selectedContentsItems,
  selectedHighRiskItems,
  selectedValuablesItems,
  otherItemsAmount,
  otherItemsDescription,
  selectedAdditionalCoverages
], validate, { deep: true })

watch(() => buildingAmounts, validate, { deep: true })
watch(() => contentsAmounts, validate, { deep: true })
watch(() => highRiskAmounts, validate, { deep: true })
watch(() => valuablesAmounts, validate, { deep: true })

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value || 0)
}

const formData = computed(() => ({
  selectedBuildingItems: selectedBuildingItems.value,
  selectedContentsItems: selectedContentsItems.value,
  selectedHighRiskItems: selectedHighRiskItems.value,
  selectedValuablesItems: selectedValuablesItems.value,
  selectedAdditionalCoverages: selectedAdditionalCoverages.value,
  otherItemsDescription: otherItemsDescription.value,
  otherItemsAmount: otherItemsAmount.value,
  additionalCoverageValues: { ...additionalCoverageValues },
  calculatedLossOfRent: calculatedLossOfRent.value,
  calculatedRemovalDebris: calculatedRemovalDebris.value,
  totalSumInsured: totalSumInsured.value,
  buildingAmounts: { ...buildingAmounts },
  contentsAmounts: { ...contentsAmounts },
  highRiskAmounts: { ...highRiskAmounts },
  valuablesAmounts: { ...valuablesAmounts },
}))

defineExpose({
 validate,
  resetForm,
  formData,
  totalSumInsured
})
</script>

<style scoped>
.q-card {
  border-radius: 8px;
}

.text-subtitle2 {
  font-weight: 500;
}
</style>