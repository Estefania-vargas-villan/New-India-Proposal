<template>
  <q-page class="q-pa-md">
    <div class="q-mb-lg">
      <h1 class="text-h4 text-primary q-mb-sm text-center">FIRE INSURANCE QUOTATION</h1>
      <q-card flat bordered class="bg-grey-1">
        <q-card-section>
          <p class="text-body1 text-center">
            Complete this form to receive a personalized insurance quote for your property. Please
            provide accurate information about your building's characteristics, contents, and
            required coverages to correctly calculate your premium.
          </p>
          <p v-if="formSubmitted" class="text-positive text-center q-mt-sm">
            <q-icon name="check_circle" size="sm" /> Form submitted successfully!
          </p>
        </q-card-section>
      </q-card>
    </div>

    <q-card flat bordered class="q-mb-md">
      <q-expansion-item 
        v-model="expandedSections.typeOfCover" 
        expand-icon-toggle
        header-class="bg-blue-1 text-primary"
        :default-opened="true"
      >
        <template v-slot:header>
          <q-item-section>
            <q-item-label class="text-h6"> Type of Cover</q-item-label>
            <q-item-label caption>Select type of insurance coverage</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-badge :color="getSectionStatusColor('typeOfCover')" 
                    :label="getSectionStatusText('typeOfCover')" />
          </q-item-section>
        </template>

        <q-card-section>
          <div class="q-mb-md">
            <div class="text-subtitle2 q-mb-sm">Type of Cover *</div>
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-6">
                <q-radio 
                  v-model="typeOfCover" 
                  val="Fire" 
                  label="Fire Insurance"
                  @update:model-value="handleTypeOfCoverChange"
                />
              </div>
              <div class="col-12 col-md-6">
                <q-radio 
                  v-model="typeOfCover" 
                  val="Miscellaneous" 
                  label="Miscellaneous"
                  @update:model-value="handleTypeOfCoverChange"
                />
              </div>
            </div>
          </div>

          <div v-if="typeOfCover === 'Fire'" class="q-mt-md">
            <div class="text-subtitle2 q-mb-sm">Customer Type *</div>
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-6">
                <q-radio 
                  v-model="customerType" 
                  val="Private" 
                  label="Private"
                  @update:model-value="handleCustomerTypeChange"
                />
              </div>
              <div class="col-12 col-md-6">
                <q-radio 
                  v-model="customerType" 
                  val="Commercial" 
                  label="Commercial"
                  @update:model-value="handleCustomerTypeChange"
                />
              </div>
            </div>
          </div>
        </q-card-section>
      </q-expansion-item>
    </q-card>

    <q-card v-if="showGeneralInfo" flat bordered class="q-mb-md">
      <q-expansion-item v-model="expandedSections.generalInfo" expand-icon-toggle header-class="bg-blue-1 text-primary">
        <template v-slot:header>
          <q-item-section>
            <q-item-label class="text-h6">General Information</q-item-label>
            <q-item-label caption>Customer, broker, and policy details</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-badge :color="getSectionStatusColor('generalInfo')" :label="getSectionStatusText('generalInfo')" />
          </q-item-section>
        </template>

        <q-card-section>
          <GeneralInformation ref="generalInfoForm" :customer-type="customerType"
            @validation-changed="handleValidationChange('generalInfo', $event)" />
        </q-card-section>
      </q-expansion-item>
    </q-card>

<q-card v-if="showProductSelection" flat bordered class="q-mb-md">
  <q-expansion-item v-model="expandedSections.productSelection" expand-icon-toggle
    header-class="bg-blue-1 text-primary">
    <template v-slot:header>
      <q-item-section>
        <q-item-label class="text-h6">Product Selection</q-item-label>
        <q-item-label caption>Select insurance product and configure coverage</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-badge :color="getSectionStatusColor('productSelection')"
          :label="getSectionStatusText('productSelection')" />
      </q-item-section>
    </template>

    <q-card-section>
      <ProductSelection ref="productSelectionForm" 
        :customer-type="typeOfCover === 'Fire' ? customerType : 'Miscellaneous'"
        @validation-changed="handleValidationChange('productSelection', $event)"
        @product-selected="handleProductSelected" />
    </q-card-section>
  </q-expansion-item>
</q-card>
    <q-card v-if="showConstructionSection" flat bordered class="q-mb-md">
      <q-expansion-item v-model="expandedSections.construction" expand-icon-toggle header-class="bg-blue-1 text-primary">
        <template v-slot:header>
          <q-item-section>
            <q-item-label class="text-h6"> Building Construction Details</q-item-label>
            <q-item-label caption>Construction materials and safety features</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-badge :color="getSectionStatusColor('construction')" :label="getSectionStatusText('construction')" />
          </q-item-section>
        </template>

        <q-card-section>
          <BuildingDetails ref="buildingConstructionForm"
            @validation-changed="handleValidationChange('construction', $event)" />
        </q-card-section>
      </q-expansion-item>
    </q-card>

    <!-- <q-card v-if="showCoverRequired" flat bordered class="q-mb-md">
      <q-expansion-item v-model="expandedSections.coverRequired" expand-icon-toggle
        header-class="bg-blue-1 text-primary">
        <template v-slot:header>
          <q-item-section>
            <q-item-label class="text-h6">Cover Required</q-item-label>
            <q-item-label caption>Select insurance product and coverage options</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-badge :color="getSectionStatusColor('coverRequired')" :label="getSectionStatusText('coverRequired')" />
          </q-item-section>
        </template>

        <q-card-section>
          <CoverRequired ref="coverRequiredForm" :customer-type="customerType" :product-type="selectedProduct"
            @validation-changed="handleValidationChange('coverRequired', $event)" />
        </q-card-section>
      </q-expansion-item>
    </q-card> -->

    <q-card v-if="showPrivateQuestions" flat bordered class="q-mb-md">
      <q-expansion-item v-model="expandedSections.privateQuestions" expand-icon-toggle
        header-class="bg-blue-1 text-primary">
        <template v-slot:header>
          <q-item-section>
            <q-item-label class="text-h6"> Private Questions</q-item-label>
            <q-item-label caption>Building occupancy and insurance requirements</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-badge :color="getSectionStatusColor('privateQuestions')"
              :label="getSectionStatusText('privateQuestions')" />
          </q-item-section>
        </template>

        <q-card-section>
          <PrivateQuestions ref="privateQuestionsForm"
            @validation-changed="handleValidationChange('privateQuestions', $event)" />
        </q-card-section>
      </q-expansion-item>
    </q-card>

    <q-card v-if="showCommercialQuestions" flat bordered class="q-mb-md">
      <q-expansion-item v-model="expandedSections.commercialQuestions" expand-icon-toggle
        header-class="bg-blue-1 text-primary">
        <template v-slot:header>
          <q-item-section>
            <q-item-label class="text-h6"> Commercial Questions</q-item-label>
            <q-item-label caption>Business information and insurance requirements</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-badge :color="getSectionStatusColor('commercialQuestions')"
              :label="getSectionStatusText('commercialQuestions')" />
          </q-item-section>
        </template>

        <q-card-section>
          <CommercialQuestions ref="commercialQuestionsForm"
            @validation-changed="handleValidationChange('commercialQuestions', $event)" />
        </q-card-section>
      </q-expansion-item>
    </q-card>

    <q-card v-if="showInsuranceConditions" flat bordered class="q-mb-md">
      <q-expansion-item v-model="expandedSections.insuranceConditions" expand-icon-toggle
        header-class="bg-blue-1 text-primary">
        <template v-slot:header>
          <q-item-section>
            <q-item-label class="text-h6">Insurance & Claim History</q-item-label>
            <q-item-label caption>Previous insurance and policy conditions</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-badge :color="getSectionStatusColor('insuranceConditions')"
              :label="getSectionStatusText('insuranceConditions')" />
          </q-item-section>
        </template>

        <q-card-section>
          <InsuranceConditions ref="insuranceConditionsForm" :product-type="selectedProduct"
            :has-solar-panels="hasSolarPanels" :has-loss-of-rent="hasLossOfRent" :has-index-clause="hasIndexClause"
            @validation-changed="handleValidationChange('insuranceConditions', $event)" />
        </q-card-section>
      </q-expansion-item>
    </q-card>
<!-- 
    <q-card flat bordered class="q-mb-md">
      <q-expansion-item v-model="expandedSections.summary" expand-icon-toggle header-class="bg-blue-1 text-primary"
        :disable="!showSummary">
        <template v-slot:header>
          <q-item-section>
            <q-item-label class="text-h6"> Summary & Declaration</q-item-label>
            <q-item-label caption>Review and submit your insurance application</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-badge :color="getSectionStatusColor('summary')" :label="getSectionStatusText('summary')" />
          </q-item-section>
        </template>

        <q-card-section>
          <Summary ref="summaryRef" :form-data="combinedFormData" :reset-trigger="resetFlag"
            :premium-calculation="premiumCalculation" :action-data="actionData" />
        </q-card-section>
      </q-expansion-item>
    </q-card>



    <div class="q-pa-md q-gutter-sm text-center">
      <q-btn label="Calculate Premium" color="primary" @click="calculatePremium" icon="calculate"
        :disable="!isReadyForCalculation" :loading="calculating" />
      <q-btn label="Submit Request" color="positive" @click="submitForm" icon="send" :loading="submitting"
        :disable="!premiumCalculation || submitting" />
      <q-btn label="Clear Form" color="grey" @click="resetForm" icon="cleaning_services" :disable="submitting" />
      
    </div> -->
  </q-page>
</template>

<script setup>
import { ref, reactive, computed, watch} from 'vue'
import { useQuasar } from 'quasar'
import ProductSelection from './subForms/ProductSelection.vue'
import GeneralInformation from './subForms/GeneralInformation.vue'
import BuildingDetails from './subForms/BuildingDetails.vue'
import InsuranceConditions from './subForms/InsuranceConditions.vue'
import CoverRequired from './subForms/CoverRequired.vue'
import PrivateQuestions from './subForms/PrivateQuestions.vue'
import CommercialQuestions from './subForms/CommercialQuestions.vue'
import Summary from './subForms/SummaryForm.vue'

const $q = useQuasar()

const typeOfCover = ref('')
const customerType = ref('')
const selectedProduct = ref('')
const premiumCalculation = ref(null)
const formSubmitted = ref(false)
const submitting = ref(false)
const calculating = ref(false)
const resetFlag = ref(false)
const actionData = ref({})

const generalInfoForm = ref(null)
const productSelectionForm = ref(null)
const buildingConstructionForm = ref(null)
const coverRequiredForm = ref(null)
const privateQuestionsForm = ref(null)
const commercialQuestionsForm = ref(null)
const insuranceConditionsForm = ref(null)
const summaryRef = ref(null)

const expandedSections = reactive({
  typeOfCover: true,
  generalInfo: false,
  productSelection: false,
  construction: false,
  privateQuestions: false,
  commercialQuestions: false,
  insuranceConditions: false,
  summary: false
})

const sectionValidation = reactive({
  typeOfCover: false,
  generalInfo: false,
  productSelection: false,
  construction: false,
  privateQuestions: false,
  commercialQuestions: false,
  insuranceConditions: false,
  summary: false
})

const isTypeOfCoverValid = computed(() => {
  if (!typeOfCover.value) return false
  if (typeOfCover.value === 'Fire' && !customerType.value) return false
  return true
})

const showGeneralInfo = computed(() => {
  return isTypeOfCoverValid.value
})

const showProductSelection = computed(() => {
  return showGeneralInfo.value && sectionValidation.generalInfo
})

const showConstructionSection = computed(() => {
  return showProductSelection.value && sectionValidation.productSelection
})

// ELIMINADO: showCoverRequired
// const showCoverRequired = computed(() => { ... })

// MODIFICADO: Ahora Private Questions se muestra directamente después de Construction
const showPrivateQuestions = computed(() => {
  if (customerType.value !== 'Private') return false
  
  return showConstructionSection.value && sectionValidation.construction
})

// MODIFICADO: Ahora Commercial Questions se muestra directamente después de Construction
const showCommercialQuestions = computed(() => {
  if (customerType.value !== 'Commercial') return false
  
  return showConstructionSection.value && sectionValidation.construction
})

const showInsuranceConditions = computed(() => {
  let shouldShow = false
  
  if (customerType.value === 'Private') {
    shouldShow = showPrivateQuestions.value && sectionValidation.privateQuestions
  } else if (customerType.value === 'Commercial') {
    shouldShow = showCommercialQuestions.value && sectionValidation.commercialQuestions
  }
  
  return shouldShow
})

const showSummary = computed(() => {
  let shouldShow = false
  
  if (customerType.value === 'Private') {
    shouldShow = showInsuranceConditions.value && sectionValidation.insuranceConditions
  } else if (customerType.value === 'Commercial') {
    shouldShow = showInsuranceConditions.value && sectionValidation.insuranceConditions
  }
  
  return shouldShow
})

const handleTypeOfCoverChange = (value) => {
  if (value === 'Miscellaneous') {
    customerType.value = ''
  }
  
  sectionValidation.typeOfCover = isTypeOfCoverValid.value
  
  if (isTypeOfCoverValid.value) {
    setTimeout(() => {
      expandedSections.generalInfo = true
      showNotification('info', 'Proceeding to General Information')
    }, 500)
  }
}

const handleCustomerTypeChange = (value) => {
  sectionValidation.typeOfCover = isTypeOfCoverValid.value
  
  if (isTypeOfCoverValid.value) {
    setTimeout(() => {
      expandedSections.generalInfo = true
      showNotification('info', 'Proceeding to General Information')
    }, 500)
  }
}

const handleProductSelected = (product) => {
  selectedProduct.value = product
}

const handleValidationChange = (section, isValid) => {
  console.log(`Validation changed for ${section}:`, isValid)
  
  sectionValidation[section] = isValid
  
  // MODIFICADO: Eliminar referencia a coverRequired
  const nextSectionMap = {
    'generalInfo': 'productSelection',
    'productSelection': 'construction',
    'construction': () => {
      if (customerType.value === 'Private') {
        return 'privateQuestions'
      } else if (customerType.value === 'Commercial') {
        return 'commercialQuestions'
      }
      return null
    },
    'privateQuestions': 'insuranceConditions',
    'commercialQuestions': 'insuranceConditions',
    'insuranceConditions': 'summary'
  }
  
  if (isValid) {
    const nextSection = typeof nextSectionMap[section] === 'function' 
      ? nextSectionMap[section]() 
      : nextSectionMap[section]
    
    if (nextSection) {
      setTimeout(() => {
        expandedSections[nextSection] = true
        
        const sectionNames = {
          'generalInfo': 'General Information',
          'productSelection': 'Product Selection',
          'construction': 'Building Construction',
          'privateQuestions': 'Private Questions',
          'commercialQuestions': 'Commercial Questions',
          'insuranceConditions': 'Insurance & Claim History',
          'summary': 'Summary & Declaration'
        }
        
        showNotification('info', `Proceeding to ${sectionNames[nextSection]}`)
      }, 800)
    }
  }
}

const getSectionStatusColor = (section) => {
  return sectionValidation[section] ? 'positive' : 'warning'
}

const getSectionStatusText = (section) => {
  return sectionValidation[section] ? 'Complete' : 'Pending'
}

const showNotification = (type, message) => {
  $q.notify({
    type: type,
    message: message,
    position: 'top',
    timeout: 2000
  })
}

const combinedFormData = computed(() => ({
  typeOfCover: typeOfCover.value,
  customerType: customerType.value,
  selectedProduct: selectedProduct.value,
  actionData: actionData.value,
  ...(generalInfoForm.value?.formData || {}),
  ...(buildingConstructionForm.value?.formData || {}),
  ...(privateQuestionsForm.value?.formData || {}),
  ...(commercialQuestionsForm.value?.formData || {}),
  ...(insuranceConditionsForm.value?.formData || {})
}))

// Si aún necesitas estas computed properties, ajusta las referencias
const hasSolarPanels = computed(() => {
  // Si aún necesitas esta información, ahora vendría de PrivateQuestions
  return privateQuestionsForm.value?.formData?.solarPanels === 'Yes'
})

const hasLossOfRent = computed(() => {
  return privateQuestionsForm.value?.formData?.lossOfRent === 'Yes'
})

const hasIndexClause = computed(() => {
  return privateQuestionsForm.value?.formData?.indexRequired === 'Yes'
})

const isReadyForCalculation = computed(() => {
  if (customerType.value === 'Private') {
    const data = privateQuestionsForm.value?.formData
    return data?.selectedBuildingItems?.length > 0 ||
      data?.selectedContentsItems?.length > 0 ||
      data?.selectedHighRiskItems?.length > 0 ||
      data?.selectedValuablesItems?.length > 0 ||
      !!data?.otherItemsAmount
  } else {
    const data = commercialQuestionsForm.value?.formData
    return data?.selectedBuildingItems?.length > 0 ||
      data?.selectedBusinessItems?.length > 0 ||
      data?.selectedElectronicItems?.length > 0 ||
      data?.selectedStockItems?.length > 0 ||
      !!data?.otherItemsAmount
  }
})

const calculatePremium = async () => {
  calculating.value = true
  setTimeout(() => {
    calculating.value = false
    showNotification('positive', 'Premium calculated successfully')
  }, 1000)
}

const submitForm = async () => {
  submitting.value = true
  setTimeout(() => {
    submitting.value = false
    formSubmitted.value = true
    showNotification('positive', 'Form submitted successfully')
  }, 1500)
}

const resetForm = () => {  
  typeOfCover.value = ''
  customerType.value = ''
  selectedProduct.value = ''
  premiumCalculation.value = null
  formSubmitted.value = false
  
  Object.keys(expandedSections).forEach(key => {
    expandedSections[key] = false
  })
  expandedSections.typeOfCover = true
  
  Object.keys(sectionValidation).forEach(key => {
    sectionValidation[key] = false
  })
  
  const forms = [
    generalInfoForm,
    productSelectionForm,
    buildingConstructionForm,
    coverRequiredForm,
    privateQuestionsForm,
    commercialQuestionsForm,
    insuranceConditionsForm
  ]
  
  forms.forEach(form => {
    if (form.value && typeof form.value.resetForm === 'function') {
      form.value.resetForm()
    }
  })
  
  showNotification('info', 'Form has been reset')
}

watch(isTypeOfCoverValid, (newVal) => {
  sectionValidation.typeOfCover = newVal
}, { immediate: true })

// Para debug - verifica los estados de las secciones
watch(() => ({
  showInsuranceConditions: showInsuranceConditions.value,
  privateQuestionsValid: sectionValidation.privateQuestions,
  commercialQuestionsValid: sectionValidation.commercialQuestions,
  showPrivateQuestions: showPrivateQuestions.value,
  showCommercialQuestions: showCommercialQuestions.value
}), (newVal) => {
  console.log('Insurance Conditions Debug:', newVal)
})
</script>

<style scoped>
.q-card {
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.rounded-borders {
  border-radius: 8px;
}

.q-expansion-item {
  margin-bottom: 16px;
}
</style>