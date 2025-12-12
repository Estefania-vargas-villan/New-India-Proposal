<template>
  <div>
    <div class="text-h6 text-primary">Step 7: Summary</div>

    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-subtitle1 q-mb-sm">Form Overview</div>

        <div class="row q-col-gutter-md q-mb-sm">
          <div class="col-12 col-md-6">
            <strong>Type of Cover:</strong> {{ formData.typeOfCover || 'Not specified' }}
          </div>
          <div class="col-12 col-md-6">
            <strong>Customer Type:</strong> {{ formData.customerType || 'Not specified' }}
          </div>
        </div>

        <div class="row q-col-gutter-md q-mb-sm" v-if="formData.selectedProduct">
          <div class="col-12">
            <strong>Selected Product:</strong> {{ formData.selectedProduct }}
          </div>
        </div>

        <q-expansion-item label="General Information" icon="info" class="q-mb-sm">
          <q-card>
            <q-card-section>
              <div v-if="formData.customer">
                <strong>Customer:</strong> {{ formData.customer }}
              </div>
              <div v-if="formData.broker">
                <strong>Broker:</strong> {{ formData.broker }}
              </div>
              <div v-if="formData.inceptionDate">
                <strong>Inception Date:</strong> {{ formData.inceptionDate }}
              </div>
              <div v-if="formData.policyPeriod">
                <strong>Policy Period:</strong> {{ formData.policyPeriod }}
              </div>
              <div v-if="formData.premisesLocation">
                <strong>Premises Location:</strong> {{ formData.premisesLocation }}
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-expansion-item label="Building Details" icon="home" class="q-mb-sm">
          <q-card>
            <q-card-section>
              <div v-if="formData.numberOfStoreys">
                <strong>Number of Storeys:</strong> {{ formData.numberOfStoreys }}
              </div>
              <div v-if="formData.externalWalls">
                <strong>External Walls:</strong> {{ formData.externalWalls }}
                <span v-if="formData.otherExternalWalls"> - {{ formData.otherExternalWalls }}</span>
              </div>
              <div v-if="formData.roofType">
                <strong>Roof Type:</strong> {{ formData.roofType }}
                <span v-if="formData.otherRoof"> - {{ formData.otherRoof }}</span>
              </div>
              <div v-if="formData.yearOfConstruction">
                <strong>Year of Construction:</strong> {{ formData.yearOfConstruction }}
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-expansion-item label="Insurance Amounts" icon="attach_money" class="q-mb-sm">
          <q-card>
            <q-card-section>
              <div v-if="customerType === 'Private'">
                <div class="text-subtitle2 q-mb-sm">Building Coverage</div>
                <div v-for="item in formData.buildingItems" :key="item" class="q-mb-xs">
                  • {{ getItemLabel(item, 'building') }}: {{ formatCurrency(formData.buildingAmounts[item]) }}
                </div>

                <div class="text-subtitle2 q-mt-md q-mb-sm">Contents Coverage</div>
                <div v-for="item in formData.generalContentsItems" :key="item" class="q-mb-xs">
                  • {{ getItemLabel(item, 'contents') }}: {{ formatCurrency(formData.generalContentsAmounts[item]) }}
                </div>
              </div>

              <div v-else>
                <div class="text-subtitle2 q-mb-sm">Commercial Coverage</div>
                <div v-for="item in formData.buildingItems" :key="item" class="q-mb-xs">
                  • {{ getItemLabel(item, 'commercialBuilding') }}: {{ formatCurrency(formData.buildingAmounts[item]) }}
                </div>
              </div>

              <div class="q-mt-md">
                <strong>Total Sum Insured:</strong> {{ formatCurrency(totalSumInsured) }}
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-expansion-item v-if="premiumCalculation" label="Premium Calculation" icon="calculate">
          <q-card>
            <q-card-section>
              <div v-for="item in premiumCalculation.items" :key="item.category" class="q-mb-xs">
                • {{ item.category }}: {{ formatCurrency(item.sumInsured) }} × {{ item.rate }}‰ = {{
                  formatCurrency(item.premium) }}
              </div>

              <div class="q-mt-md">
                <strong>Total Premium:</strong> {{ formatCurrency(premiumCalculation.totalPremium) }}
              </div>

              <div v-if="premiumCalculation.discountApplied" class="text-negative">
                <strong>Discount:</strong> -{{ formatCurrency(premiumCalculation.discountAmount) }}
              </div>

              <div v-if="premiumCalculation.additionalCharges">
                <div v-for="charge in premiumCalculation.additionalCharges" :key="charge.description" class="q-mb-xs">
                  • {{ charge.description }}: {{ formatCurrency(charge.amount) }}
                </div>
              </div>

              <div class="text-h6 q-mt-md text-primary">
                <strong>Final Premium:</strong> {{ formatCurrency(premiumCalculation.finalPremium) }}
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-card-section>
    </q-card>

    <!-- Declaration -->
    <q-card flat bordered class="bg-grey-1">
      <q-card-section>
        <div class="text-subtitle1 q-mb-sm">Declaration</div>

        <q-checkbox v-model="declarationConfirmed"
          label="I confirm that all information provided is true and accurate to the best of my knowledge" />

        <q-checkbox v-model="termsAccepted" label="I agree to the terms and conditions of the insurance policy" />

        <q-checkbox v-model="inspectionAuthorized" label="I authorize inspection of the premises if required" />

        <div class="q-mt-md">
          <q-input v-model="signature" label="Signature" outlined placeholder="Type your full name as signature" />
        </div>
      </q-card-section>
    </q-card>

    <!-- Action Buttons -->
    <div class="q-mt-md">
      <q-btn label="Download PDF Summary" color="primary" icon="picture_as_pdf" @click="downloadPDF"
        :disable="!isFormComplete" />

      <q-btn label="Print Summary" color="secondary" icon="print" @click="printSummary" class="q-ml-sm"
        :disable="!isFormComplete" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, } from 'vue'

const props = defineProps({
  formData: {
    type: Object,
    default: () => ({})
  },
  resetTrigger: {
    type: Boolean,
    default: false
  },
  premiumCalculation: {
    type: Object,
    default: null
  }
})

const declarationConfirmed = ref(false)
const termsAccepted = ref(false)
const inspectionAuthorized = ref(false)
const signature = ref('')

const customerType = computed(() => props.formData.customerType || 'Private')

const totalSumInsured = computed(() => {
  let total = 0

  if (customerType.value === 'Private') {
    props.formData.buildingItems?.forEach(item => {
      total += Number(props.formData.buildingAmounts?.[item]) || 0
    })

    props.formData.generalContentsItems?.forEach(item => {
      total += Number(props.formData.generalContentsAmounts?.[item]) || 0
    })
  } else {
    props.formData.buildingItems?.forEach(item => {
      total += Number(props.formData.buildingAmounts?.[item]) || 0
    })
  }

  return total
})

const isFormComplete = computed(() => {
  return declarationConfirmed.value &&
    termsAccepted.value &&
    inspectionAuthorized.value &&
    signature.value.trim() !== '' &&
    totalSumInsured.value > 0
})

// Item label mappings
const itemLabels = {
  building: {
    'main_building': 'Main Building',
    'fence': 'Fence/Boundary Wall',
    'servants_quarters': 'Servant Quarters',
    'tenants_improvements': 'Tenant Improvements',
    'landscaping': 'Landscaping',
    'swimming_pool': 'Swimming Pool',
    'gazebo': 'Gazebo',
    'bar': 'Bar',
    'storage': 'Storage',
    'solar_panels': 'Solar Panels'
  },
  contents: {
    'furniture': 'Household Furniture',
    'personal_effects': 'Personal Effects',
    'piano': 'Piano/Organ',
    'external_property': 'External Property'
  },
  commercialBuilding: {
    'main_building': 'Main Building',
    'warehouse': 'Warehouse',
    'fence': 'Fence/Boundary Wall',
    'landscaping': 'Landscaping',
    'apartment': 'Apartment',
    'laundry': 'Laundry Room',
    'swimming_pool': 'Swimming Pool',
    'tenants_improvements': 'Tenant Improvements',
    'storage': 'Storage',
    'solar_panels': 'Solar Panels'
  }
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value || 0)
}

const getItemLabel = (itemKey, category) => {
  return itemLabels[category]?.[itemKey] || itemKey
}

const downloadPDF = () => {
  console.log('Downloading PDF summary...')
}

const printSummary = () => {
  window.print()
}

const resetForm = () => {
  declarationConfirmed.value = false
  termsAccepted.value = false
  inspectionAuthorized.value = false
  signature.value = ''
}

watch(() => props.resetTrigger, (newVal) => {
  if (newVal) {
    resetForm()
  }
})

defineExpose({
  resetForm
})
</script>

<style scoped>
@media print {
  .q-btn {
    display: none !important;
  }

  .q-expansion-item__content {
    display: block !important;
  }
}
</style>