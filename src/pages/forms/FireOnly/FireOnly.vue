<template>
  <q-page class="q-pa-md">
    <div class="q-mb-lg">
      <h1 class="text-h4 text-primary q-mb-sm text-center">FIRE INSURANCE QUOTATION</h1>
      <q-card flat bordered class="bg-grey-1">
        <q-card-section>
          <p class="text-body1 text-center q-mb-md">
            Complete this form to receive a personalized insurance quote for your property. Please
            provide accurate information about your building's characteristics, contents, and
            required coverages to correctly calculate your premium.
          </p>
          <div style="margin: 0 35rem 0 35rem; ">
            <q-banner class="  bg-blue-2 text-red-10 q-mb-md shadow-2 " rounded>
              <q-icon name="warning" class="q-mr-sm " />
              Please fill in all fields to continue to the next form.
            </q-banner>
          </div>
          <p v-if="formSubmitted" class="text-positive text-center q-mt-sm">
            <q-icon name="check_circle" size="sm" /> Form submitted successfully!
          </p>
        </q-card-section>
      </q-card>
    </div>

    <q-card flat bordered class="q-mb-md">
      <q-expansion-item v-model="expandedSections.typeOfCover" expand-icon-toggle header-class="bg-blue-1 text-primary"
        :default-opened="true">
        <template v-slot:header>
          <q-item-section>
            <q-item-label class="text-h6"> Type of Cover</q-item-label>
            <q-item-label caption>Select type of insurance coverage</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-badge :color="getSectionStatusColor('typeOfCover')" :label="getSectionStatusText('typeOfCover')" />
          </q-item-section>
        </template>

        <q-card-section>
          <div class="q-mb-md">
            <div class="text-subtitle2 q-mb-sm">Type of Cover *</div>
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-6">
                <q-radio v-model="typeOfCover" val="Fire" label="Fire Insurance"
                  @update:model-value="handleTypeOfCoverChange" />
              </div>
              <div class="col-12 col-md-6">
                <q-radio v-model="typeOfCover" val="Miscellaneous" label="Miscellaneous"
                  @update:model-value="handleTypeOfCoverChange" />
              </div>
            </div>
          </div>

          <div v-if="typeOfCover" class="q-mt-md">
            <div class="text-subtitle2 q-mb-sm">Customer Type *</div>
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-6">
                <q-radio v-model="customerType" val="Private" label="Private"
                  @update:model-value="handleCustomerTypeChange" />
              </div>
              <div class="col-12 col-md-6">
                <q-radio v-model="customerType" val="Commercial" label="Commercial"
                  @update:model-value="handleCustomerTypeChange" />
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
          <ProductSelection ref="productSelectionForm" :customer-type="customerType" :type-of-cover="typeOfCover"
            @validation-changed="handleValidationChange('productSelection', $event)"
            @product-selected="handleProductSelected" />
        </q-card-section>
      </q-expansion-item>
    </q-card>

    <div v-if="showMiscellaneousFormSection">
      <q-card flat bordered class="q-mb-md">
        <q-expansion-item v-model="expandedSections.miscellaneousForm" expand-icon-toggle
          header-class="bg-blue-1 text-primary">
          <template v-slot:header>
            <q-item-section>
              <q-item-label class="text-h6">{{ selectedMiscellaneousFormTitle }}</q-item-label>
              <q-item-label caption>Complete the form for {{ selectedProduct }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-badge :color="getSectionStatusColor('miscellaneousForm')"
                :label="getSectionStatusText('miscellaneousForm')" />
            </q-item-section>
          </template>

          <q-card-section>
            <div v-if="selectedProduct === 'CAR'">
              <ContractorsAllRiskForm ref="contractorsAllRiskForm"
                @validation-changed="handleMiscellaneousValidationChange"
                @form-submitted="handleMiscellaneousFormSubmitted" />
            </div>

            <div v-else-if="selectedProduct === 'PA'">
              <PersonalAccidentForm ref="personalAccidentForm" @validation-changed="handleMiscellaneousValidationChange"
                @form-submitted="handleMiscellaneousFormSubmitted" />
            </div>

            <div v-else-if="selectedProduct === 'PI' && customerType === 'Commercial'">
              <ProfessionalIndemnityForm ref="professionalIndemnityForm"
                @validation-changed="handleMiscellaneousValidationChange"
                @form-submitted="handleMiscellaneousFormSubmitted" />
            </div>

            <div v-else-if="selectedProduct === 'PI' && customerType === 'Private'">
              <ProfessionalIndemnityDoctorForm ref="professionalIndemnityPrivateForm"
                @validation-changed="handleMiscellaneousValidationChange"
                @form-submitted="handleMiscellaneousFormSubmitted" />
            </div>

            <div v-else-if="selectedProduct === 'PLC' || selectedProduct === 'TOL'">
              <PublicLiabilityForm ref="publicLiabilityForm" @validation-changed="handleMiscellaneousValidationChange"
                @form-submitted="handleMiscellaneousFormSubmitted" />
            </div>

            <div v-else-if="selectedProduct === 'MIT'">
              <MoneyInTransitForm ref="moneyInTransitForm" @validation-changed="handleMiscellaneousValidationChange"
                @form-submitted="handleMiscellaneousFormSubmitted" />
            </div>

            <div v-else-if="selectedProduct === 'PLG'">
              <PlateGlassForm ref="plateGlassForm" @validation-changed="handleMiscellaneousValidationChange"
                @form-submitted="handleMiscellaneousFormSubmitted" />
            </div>

            <div v-else-if="['BUHU', 'BUR', 'CFT', 'CFTE', 'PLI'].includes(selectedProduct)">
              <PlateGlassForm ref="burglaryCashTransitForm" @validation-changed="handleMiscellaneousValidationChange"
                @form-submitted="handleMiscellaneousFormSubmitted" />
            </div>

            <div v-else>
              <div class="text-center q-pa-xl">
                <q-icon name="description" size="xl" color="primary" />
                <div class="text-h6 q-mt-md">Form: {{ selectedMiscellaneousFormTitle }}</div>
                <div class="text-subtitle1 q-mt-sm">Product: {{ selectedProduct }}</div>
                <p class="q-mt-lg">This form will be implemented soon.</p>
                <q-input v-model="genericFormData.name" label="Name *" class="q-mt-md"
                  :rules="[val => !!val || 'Name is required']" />
                <q-input v-model="genericFormData.description" label="Description *" type="textarea" class="q-mt-md"
                  :rules="[val => !!val || 'Description is required']" />
                <q-btn label="Mark as Complete" color="primary" @click="handleGenericFormComplete" class="q-mt-md" />
              </div>
            </div>


          </q-card-section>
        </q-expansion-item>
      </q-card>
    </div>
    <div v-if="typeOfCover === 'Fire'">
      <q-card v-if="showConstructionSection" flat bordered class="q-mb-md">
        <q-expansion-item v-model="expandedSections.construction" expand-icon-toggle
          header-class="bg-blue-1 text-primary">
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
    </div>

    <q-card v-if="showAllSectionsComplete" flat bordered class="q-mb-md bg-positive-1">
      <q-card-section>
        <div class="text-h6 text-center q-mb-md">Final Declaration</div>

        <div class="row q-col-gutter-md q-mb-md text-center">
          <div class="col-12 col-md-6">
            <q-checkbox v-model="declarationAccepted"
              label="I declare that all information provided is true and accurate" />
          </div>
          <div class="col-12 col-md-6">
            <q-checkbox v-model="termsAccepted" label="I accept the terms and conditions" />
          </div>
        </div>

        <div v-if="showAllSectionsComplete" class="text-center">
          <q-banner class="bg-primary text-white">
            <template v-slot:avatar>
              <q-icon name="check_circle" />
            </template>
            All required sections are complete! You can now calculate premium and submit.
          </q-banner>
        </div>
      </q-card-section>
    </q-card>

    <div class="q-pa-md q-gutter-sm text-center">
      <q-btn label="Calculate Premium" color="primary" @click="calculatePremium" icon="calculate"
        :disable="!isReadyForCalculation" :loading="calculating" />
      <q-btn label="Submit Request" color="positive" @click="submitForm" icon="send" :loading="submitting"
        :disable="!isReadyForSubmission || submitting" />
      <q-btn label="Clear Form" color="grey" @click="showResetConfirmation" icon="cleaning_services"
        :disable="submitting" />
    </div>

    <q-dialog v-model="showResetDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="warning" text-color="white" />
          <span class="q-ml-sm text-h6">Clear Form</span>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Are you sure you want to clear all form data? This action cannot be undone.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Clear All" color="negative" @click="performReset" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import ProductSelection from './subForms/ProductSelection.vue'
import GeneralInformation from './subForms/GeneralInformation.vue'
import BuildingDetails from './subForms/BuildingDetails.vue'
import InsuranceConditions from './subForms/InsuranceConditions.vue'
import PrivateQuestions from './subForms/PrivateQuestions.vue'
import CommercialQuestions from './subForms/CommercialQuestions.vue'
import ContractorsAllRiskForm from './subForms/ContractorsAllRiskForm.vue'
import PersonalAccidentForm from './subForms/PersonalAccidentForm.vue'
import ProfessionalIndemnityForm from './subForms/ProfessionalIndemnityForm.vue'
import PublicLiabilityForm from './subForms/PublicLiabilityForm.vue'
import MoneyInTransitForm from './subForms/MoneyInTransitForm.vue'
import PlateGlassForm from './subForms/CommercialProposalFrom.vue'
import ProfessionalIndemnityDoctorForm from './subForms/ProfessionalIndemnityDoctorForm.vue'

const $q = useQuasar()

const typeOfCover = ref('')
const customerType = ref('')
const selectedProduct = ref('')
// const premiumCalculation = ref(null)
const formSubmitted = ref(false)
const submitting = ref(false)
const calculating = ref(false)
const miscellaneousSubmitting = ref(false)
const actionData = ref({})
const genericFormData = ref({
  name: '',
  description: ''
})
const declarationAccepted = ref(false)
const termsAccepted = ref(false)
const showResetDialog = ref(false)

const contractorsAllRiskForm = ref(null)
const moneyInTransitForm = ref(null)
const plateGlassForm = ref(null)
const professionalIndemnityForm = ref(null)
const professionalIndemnityPrivateForm = ref(null)
const publicLiabilityForm = ref(null)
const burglaryCashTransitForm = ref(null)
const personalAccidentForm = ref(null)

const generalInfoForm = ref(null)
const productSelectionForm = ref(null)
const buildingConstructionForm = ref(null)
const privateQuestionsForm = ref(null)
const commercialQuestionsForm = ref(null)
const insuranceConditionsForm = ref(null)

const expandedSections = reactive({
  typeOfCover: true,
  generalInfo: false,
  productSelection: false,
  miscellaneousForm: false,
  construction: false,
  privateQuestions: false,
  commercialQuestions: false,
  insuranceConditions: false,
})

const sectionValidation = reactive({
  typeOfCover: false,
  generalInfo: false,
  productSelection: false,
  miscellaneousForm: false,
  construction: false,
  privateQuestions: false,
  commercialQuestions: false,
  insuranceConditions: false,
})

const resetFlag = ref(0)

const showAllSectionsComplete = computed(() => {
  if (typeOfCover.value === 'Fire') {
    if (customerType.value === 'Private') {
      return sectionValidation.typeOfCover &&
        sectionValidation.generalInfo &&
        sectionValidation.productSelection &&
        sectionValidation.construction &&
        sectionValidation.privateQuestions &&
        sectionValidation.insuranceConditions
    } else if (customerType.value === 'Commercial') {
      return sectionValidation.typeOfCover &&
        sectionValidation.generalInfo &&
        sectionValidation.productSelection &&
        sectionValidation.construction &&
        sectionValidation.commercialQuestions &&
        sectionValidation.insuranceConditions
    }
  } else if (typeOfCover.value === 'Miscellaneous') {
    const hasValidProduct = selectedProduct.value &&
      selectedProduct.value !== '' &&
      selectedProduct.value !== 'Select Product'

    return sectionValidation.typeOfCover &&
      sectionValidation.generalInfo &&
      sectionValidation.productSelection &&
      sectionValidation.miscellaneousForm &&
      hasValidProduct
  }
  return false
})

const selectedMiscellaneousFormTitle = computed(() => {
  const productNames = {
    'CAR': 'Contractors All Risk',
    'PA': 'Personal Accident',
    'PI': customerType.value === 'Commercial' ? 'Professional Indemnity' : 'Professional Indemnity (Doctor)',
    'PLC': 'Public Liability',
    'TOL': 'Third Party Liability',
    'MIT': 'Money in Transit',
    'PLG': 'Plate Glass',
    'BUHU': 'Burglary & Housebreaking',
    'BUR': 'Burglary',
    'CFT': 'Cash in Transit',
    'CFTE': 'Cash in Transit Extended',
    'PLI': 'Product Liability'
  }
  return productNames[selectedProduct.value] || selectedProduct.value
})

const showMiscellaneousFormSection = computed(() => {
  return typeOfCover.value === 'Miscellaneous' && selectedProduct.value && sectionValidation.productSelection
})


const isTypeOfCoverValid = computed(() => {
  if (!typeOfCover.value) return false;
  if (!customerType.value) return false;
  return true;
})

const showGeneralInfo = computed(() => {
  return isTypeOfCoverValid.value;
})

const showProductSelection = computed(() => {
  return showGeneralInfo.value && sectionValidation.generalInfo && customerType.value;
})

const showConstructionSection = computed(() => {
  if (typeOfCover.value === 'Fire') {
    return showProductSelection.value && sectionValidation.productSelection;
  }
  return false;
})

const showPrivateQuestions = computed(() => {
  if (typeOfCover.value !== 'Fire' || customerType.value !== 'Private') return false;
  return showConstructionSection.value && sectionValidation.construction;
})

const showCommercialQuestions = computed(() => {
  if (typeOfCover.value !== 'Fire' || customerType.value !== 'Commercial') return false;
  return showConstructionSection.value && sectionValidation.construction;
})

const showInsuranceConditions = computed(() => {
  if (typeOfCover.value === 'Fire') {
    if (customerType.value === 'Private') {
      return showPrivateQuestions.value && sectionValidation.privateQuestions;
    } else if (customerType.value === 'Commercial') {
      return showCommercialQuestions.value && sectionValidation.commercialQuestions;
    }
  }
  return false;
})

const isReadyForCalculation = computed(() => {
  if (typeOfCover.value === 'Fire') {
    if (customerType.value === 'Private') {
      const data = privateQuestionsForm.value?.formData
      const hasItems = data?.selectedBuildingItems?.length > 0 ||
        data?.selectedContentsItems?.length > 0 ||
        data?.selectedHighRiskItems?.length > 0 ||
        data?.selectedValuablesItems?.length > 0 ||
        !!data?.otherItemsAmount

      return hasItems && showAllSectionsComplete.value
    } else if (customerType.value === 'Commercial') {
      const data = commercialQuestionsForm.value?.formData
      const hasItems = data?.selectedBuildingItems?.length > 0 ||
        data?.selectedBusinessItems?.length > 0 ||
        data?.selectedElectronicItems?.length > 0 ||
        data?.selectedStockItems?.length > 0 ||
        !!data?.otherItemsAmount

      return hasItems && showAllSectionsComplete.value
    }
  }
  else if (typeOfCover.value === 'Miscellaneous') {
    return sectionValidation.miscellaneousForm &&
      showAllSectionsComplete.value &&
      isMiscellaneousFormReallyComplete.value
  }
  return false
})

const isMiscellaneousFormReallyComplete = computed(() => {
  if (typeOfCover.value !== 'Miscellaneous' || !selectedProduct.value) {
    return false
  }

  try {
    const formRef = getCurrentMiscellaneousFormRef()

    if (formRef?.value) {
      if (typeof formRef.value.validate === 'function') {
        return formRef.value.validate()
      } else if (typeof formRef.value.isFormValid === 'boolean') {
        return formRef.value.isFormValid
      } else if (formRef.value.isFormValid !== undefined) {
        return formRef.value.isFormValid
      }
    }

    if (selectedProduct.value === 'GENERIC') {
      return genericFormData.value.name.trim() !== '' &&
        genericFormData.value.description.trim() !== ''
    }

    return sectionValidation.miscellaneousForm
  } catch (error) {
    console.warn('Error checking form completion:', error)
    return sectionValidation.miscellaneousForm
  }
})


const isReadyForSubmission = computed(() => {
  return showAllSectionsComplete.value &&
    declarationAccepted.value &&
    termsAccepted.value &&
    premiumCalculation.value &&
    !submitting.value
})

const handleTypeOfCoverChange = (_value) => {
  sectionValidation.typeOfCover = isTypeOfCoverValid.value;

  if (isTypeOfCoverValid.value) {
    setTimeout(() => {
      expandedSections.generalInfo = true;
      showNotification('info', 'Proceeding to General Information');
    }, 500);
  }
}

const handleCustomerTypeChange = (_value) => {
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

  if (typeOfCover.value === 'Miscellaneous') {
    setTimeout(() => {
      expandedSections.miscellaneousForm = true
      showNotification('info', `Proceeding to ${selectedMiscellaneousFormTitle.value}`)
    }, 800)
  }
}

const handleValidationChange = (section, isValid) => {
  sectionValidation[section] = isValid

  const nextSectionMap = {
    'generalInfo': 'productSelection',
    'productSelection': () => {
      if (typeOfCover.value === 'Miscellaneous') {
        return 'miscellaneousForm'
      } else {
        return 'construction'
      }
    },
    'construction': () => {
      if (customerType.value === 'Private') {
        return 'privateQuestions'
      } else if (customerType.value === 'Commercial') {
        return 'commercialQuestions'
      }
      return null
    },
    'privateQuestions': 'insuranceConditions',
    'commercialQuestions': 'insuranceConditions'
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
          'miscellaneousForm': selectedMiscellaneousFormTitle.value,
          'construction': 'Building Construction',
          'privateQuestions': 'Private Questions',
          'commercialQuestions': 'Commercial Questions',
          'insuranceConditions': 'Insurance & Claim History'
        }

        showNotification('info', `Proceeding to ${sectionNames[nextSection]}`)
      }, 800)
    }
  }
}

const handleMiscellaneousValidationChange = (isValid) => {
  sectionValidation.miscellaneousForm = isValid

  if (isValid && typeOfCover.value === 'Miscellaneous') {
    showNotification('success', `${selectedMiscellaneousFormTitle.value} form is now complete!`)
  }
}

const handleGenericFormComplete = () => {
  if (!genericFormData.value.name.trim() || !genericFormData.value.description.trim()) {
    showNotification('warning', 'Please fill in both Name and Description fields')
    return
  }

  sectionValidation.miscellaneousForm = true
  showNotification('positive', 'Form marked as complete')
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
const handleMiscellaneousFormSubmitted = (formData) => {
  console.log('Miscellaneous form submitted from child:', formData)

  actionData.value = {
    ...actionData.value,
    miscellaneousData: formData,
    submissionType: 'Miscellaneous',
    customerType: customerType.value,
    product: selectedProduct.value,
    productName: selectedMiscellaneousFormTitle.value,
    submittedAt: new Date().toISOString()
  }

  sectionValidation.miscellaneousForm = true
  miscellaneousSubmitting.value = false

  showNotification('positive', `${selectedMiscellaneousFormTitle.value} submitted successfully!`)

  setTimeout(() => {
    showNotification('info', 'You can now calculate the premium.')
  }, 1000)
}

const getCurrentMiscellaneousFormRef = () => {
  const formRefs = {
    'CAR': contractorsAllRiskForm,
    'PA': personalAccidentForm,
    'PI': customerType.value === 'Commercial' ? professionalIndemnityForm : professionalIndemnityPrivateForm,
    'PLC': publicLiabilityForm,
    'TOL': publicLiabilityForm,
    'MIT': moneyInTransitForm,
    'PLG': plateGlassForm,
    'BUHU': burglaryCashTransitForm,
    'BUR': burglaryCashTransitForm,
    'CFT': burglaryCashTransitForm,
    'CFTE': burglaryCashTransitForm,
    'PLI': burglaryCashTransitForm
  }

  return formRefs[selectedProduct.value]
}
const getCurrentMiscellaneousFormData = async () => {
  if (typeOfCover.value !== 'Miscellaneous' || !selectedProduct.value) {
    throw new Error('No miscellaneous product selected')
  }

  if (!isMiscellaneousFormReallyComplete.value) {
    throw new Error('Please complete all required fields')
  }

  const currentFormRef = getCurrentMiscellaneousFormRef()

  if (currentFormRef?.value) {
    if (typeof currentFormRef.value.getFormData === 'function') {
      const data = currentFormRef.value.getFormData()
      if (data && Object.keys(data).length > 0) {
        return data
      }
    } else if (currentFormRef.value.formData) {
      return currentFormRef.value.formData
    } else if (currentFormRef.value.data) {
      return currentFormRef.value.data
    }
  }

  if (selectedProduct.value === 'GENERIC') {
    if (!genericFormData.value.name.trim() || !genericFormData.value.description.trim()) {
      throw new Error('Please complete all required fields')
    }
    return {
      ...genericFormData.value,
      formType: selectedProduct.value,
      formName: selectedMiscellaneousFormTitle.value
    }
  }


  const basicData = {
    productType: selectedProduct.value,
    productName: selectedMiscellaneousFormTitle.value,
    customerType: customerType.value,
    timestamp: new Date().toISOString()
  }

  return basicData
}
const combinedFormData = computed(() => ({
  typeOfCover: typeOfCover.value,
  customerType: customerType.value,
  selectedProduct: selectedProduct.value,
  actionData: actionData.value,
  declarationAccepted: declarationAccepted.value,
  termsAccepted: termsAccepted.value,
  ...(generalInfoForm.value?.formData || {}),
  ...(buildingConstructionForm.value?.formData || {}),
  ...(privateQuestionsForm.value?.formData || {}),
  ...(commercialQuestionsForm.value?.formData || {}),
  ...(insuranceConditionsForm.value?.formData || {}),
  miscellaneousData: genericFormData.value
}))

const hasSolarPanels = computed(() => {
  return privateQuestionsForm.value?.formData?.solarPanels === 'Yes'
})

const hasLossOfRent = computed(() => {
  return privateQuestionsForm.value?.formData?.lossOfRent === 'Yes'
})

const hasIndexClause = computed(() => {
  return privateQuestionsForm.value?.formData?.indexRequired === 'Yes'
})

const calculatePremium = async () => {
  if (!isReadyForCalculation.value) {
    showNotification('warning', 'Please complete all required forms before calculating premium')
    return
  }

  calculating.value = true

  try {
    await new Promise(resolve => setTimeout(resolve, 1500))

    let calculatedPremium = 0

    if (typeOfCover.value === 'Miscellaneous') {
      const formData = await getCurrentMiscellaneousFormData()

      const productPremiums = {
        'CAR': 1200,
        'PA': 450,
        'PI': customerType.value === 'Commercial' ? 1800 : 1200,
        'PLC': 750,
        'TOL': 600,
        'MIT': 900,
        'PLG': 550,
        'BUHU': 850,
        'BUR': 800,
        'CFT': 1100,
        'CFTE': 1300,
        'PLI': 950
      }

      calculatedPremium = productPremiums[selectedProduct.value] || 500

      if (selectedProduct.value === 'CAR' && formData.financial?.contractPrice) {
        calculatedPremium += formData.financial.contractPrice * 0.001
      }
    }

    premiumCalculation.value = {
      amount: calculatedPremium,
      currency: 'AWG',
      breakdown: [
        { label: 'Base Premium', value: calculatedPremium * 0.7 },
        { label: 'Taxes', value: calculatedPremium * 0.1 },
        { label: 'Service Fee', value: calculatedPremium * 0.05 },
        { label: 'Risk Surcharge', value: calculatedPremium * 0.15 }
      ],
      total: calculatedPremium
    }

    showNotification('positive', `Premium calculated successfully: AWG ${calculatedPremium.toFixed(2)}`)

  } catch (error) {
    console.error('Error calculating premium:', error)
    showNotification('negative', 'Error calculating premium. Please try again.')
  } finally {
    calculating.value = false
  }
}

const submitForm = async () => {
  if (!isReadyForSubmission.value) {
    if (!declarationAccepted.value || !termsAccepted.value) {
      showNotification('warning', 'Please accept the declaration and terms before submitting')
    } else if (!premiumCalculation.value) {
      showNotification('warning', 'Please calculate premium before submitting')
    } else {
      showNotification('warning', 'Please complete all requirements before submitting')
    }
    return
  }

  submitting.value = true

  try {
    let miscellaneousFormData = {}

    if (typeOfCover.value === 'Miscellaneous') {
      try {
        miscellaneousFormData = await getCurrentMiscellaneousFormData()
      } catch (error) {
        console.warn('Could not get form data:', error)
        miscellaneousFormData = actionData.value.miscellaneousData || {}
      }
    }

    const submissionData = {
      typeOfCover: typeOfCover.value,
      customerType: customerType.value,
      selectedProduct: selectedProduct.value,
      ...combinedFormData.value,
      premiumCalculation: premiumCalculation.value,
      miscellaneousFormData: miscellaneousFormData,
      submittedAt: new Date().toISOString(),
      referenceNumber: `INS-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }

    console.log('Complete form submitted:', submissionData)

    await new Promise(resolve => setTimeout(resolve, 2000))

    formSubmitted.value = true

    showNotification('positive', `Form submitted successfully! Reference: ${submissionData.referenceNumber}`)


  } catch (error) {
    console.error('Error submitting form:', error)
    showNotification('negative', 'Error submitting form. Please try again.')
  } finally {
    submitting.value = false
  }
}


const showResetConfirmation = () => {
  if (submitting.value) {
    showNotification('warning', 'Cannot reset form while submitting')
    return
  }

  showResetDialog.value = true
}

const performReset = () => {
  typeOfCover.value = ''
  customerType.value = ''
  selectedProduct.value = ''
  premiumCalculation.value = null
  formSubmitted.value = false
  actionData.value = {}
  genericFormData.value = { name: '', description: '' }
  declarationAccepted.value = false
  termsAccepted.value = false
  resetFlag.value++

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
    professionalIndemnityPrivateForm,
    privateQuestionsForm,
    commercialQuestionsForm,
    insuranceConditionsForm,
    plateGlassForm,
    burglaryCashTransitForm,
    contractorsAllRiskForm,
    moneyInTransitForm,
    publicLiabilityForm,
    professionalIndemnityForm,
    personalAccidentForm
  ]

  forms.forEach(form => {
    if (form.value && typeof form.value.resetForm === 'function') {
      form.value.resetForm()
    }
  })

  showNotification('info', 'Form has been reset successfully')
}

watch(isTypeOfCoverValid, (newVal) => {
  sectionValidation.typeOfCover = newVal
}, { immediate: true })

watch(() => selectedProduct.value, (newProduct) => {
  if (typeOfCover.value === 'Miscellaneous' && newProduct) {
    actionData.value = {
      ...actionData.value,
      submissionType: 'Miscellaneous',
      customerType: customerType.value,
      product: newProduct,
      productName: selectedMiscellaneousFormTitle.value
    }
  }
})

watch(showAllSectionsComplete, (newVal) => {
  if (newVal) {
    showNotification('success', 'All forms completed! You can now calculate premium and proceed to submission.')
  }
})

onMounted(() => {
  setTimeout(() => {
    showNotification('info', 'Welcome to the Insurance Quotation System. Please start by selecting your cover type.')
  }, 1000)
})
</script>

<style scoped>
.q-page {
  background-color: #f5f5f5;
  font-family: 'Roboto', sans-serif;
}

h1.text-h4 {
  font-weight: 500;
  color: #1a73e8;
  letter-spacing: 0.5px;
}


.q-card {
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.3s;
}

.q-card:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}


.q-expansion-item__header {
  border-radius: 12px;
  background-color: #e3f2fd;
  color: #1a73e8;
  font-weight: 500;
  transition: background-color 0.3s;
}

.q-expansion-item__header:hover {
  background-color: #bbdefb;
}

.q-badge {
  font-weight: 500;
  text-transform: uppercase;
  border-radius: 12px;
  padding: 0 8px;
}

.q-radio__inner,
.q-checkbox__bg {
  border-radius: 50%;
}

.q-input input {
  border-radius: 12px;
  background-color: #ffffff;
  padding: 10px 12px;
  border: 1px solid #d0d0d0;
}

.q-input input:focus {
  border-color: #1a73e8;
  box-shadow: 0 0 0 3px rgba(26, 115, 232, 0.2);
}

.q-btn {
  border-radius: 12px;
  text-transform: none;
  font-weight: 500;
  padding: 10px 24px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
}

.q-btn:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.12);
}

.q-btn[color="primary"] {
  background-color: #1a73e8;
  color: white;
}

.q-btn[color="positive"] {
  background-color: #00c853;
  color: white;
}

.q-btn[color="grey"] {
  background-color: #e0e0e0;
  color: #424242;
}

.q-banner {
  border-radius: 12px;
  font-weight: 500;
  padding: 16px;
}

.text-primary {
  color: #1a73e8;
}

.text-positive {
  color: #00c853;
}
</style>
