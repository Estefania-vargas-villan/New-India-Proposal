<template>
  <div >
    <div class="text-h6 text-primary q-mb-md">
      {{ isMiscellaneous ? ' Select Insurance Cover' : ' Product Selection' }}
    </div>

    <div class="q-mb-lg">
      <div class="text-subtitle2 q-mb-sm">
        {{ isMiscellaneous ? 'Select Insurance Cover *' : 'Select Product *' }}
      </div>
      <q-select v-model="selectedProduct" :options="filteredProductOptions" label="Select insurance product" outlined 
        emit-value map-options option-label="label" option-value="value" @update:model-value="handleProductChange"
        :rules="[val => !!val || 'Product selection is required']" />
    </div>

    <div v-if="selectedProduct === 'PLC'" class="q-mb-lg bg-blue-1 q-pa-md rounded-borders">
      <div class="text-subtitle2 q-mb-sm">Public Liability Type *</div>
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-4" v-for="option in publicLiabilityOptions" :key="option.value">
          <q-radio v-model="selectedPublicLiabilityType" :val="option.value" :label="option.label" />
        </div>
      </div>
      
      <div v-if="selectedPublicLiabilityType" class="q-mt-md">
        <div class="text-caption text-grey">
          <q-icon name="info" size="sm" />
          <span v-if="selectedPublicLiabilityType === 'premises'">Covers liability arising from the premises</span>
          <span v-if="selectedPublicLiabilityType === 'operations'">Covers liability arising from business operations</span>
          <span v-if="selectedPublicLiabilityType === 'employers'">Covers liability to employees</span>
          <span v-if="selectedPublicLiabilityType === 'products'">Covers liability from products sold</span>
        </div>
      </div>
    </div>

    <div class="q-mb-lg">
      <div class="text-subtitle2 q-mb-sm">
        {{ isMiscellaneous ? 'Location of Premises Proposed for Insurance *' : 'Location of Premises Proposed for Insurance *' }}
      </div>
      <q-input v-model="premisesLocation" label="Risk Address *" outlined type="textarea" rows="2"
        :rules="[val => !!val || 'Premises location is required']"
        placeholder="Enter the complete address of the property/location to be insured" />
    </div>

    <div v-if="!isMiscellaneous" class="q-mb-lg">
      <div class="text-subtitle2 q-mb-sm">Mortgage Clause Required *</div>

      <div class="row q-col-gutter-md q-mb-md">
        <div class="col-12 col-sm-6">
          <q-radio v-model="mortgageRequired" val="yes" label="Yes" />
        </div>
        <div class="col-12 col-sm-6">
          <q-radio v-model="mortgageRequired" val="no" label="No" />
        </div>
      </div>

      <div v-if="mortgageRequired === 'yes'" class="bank-selection-section bg-grey-2 q-pa-md rounded-borders">
        <div class="text-subtitle2 q-mb-sm">Select Banks* (Multiple selection allowed)</div>

        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-12 col-md-6" v-for="bank in bankOptions" :key="bank.value">
            <q-checkbox v-model="selectedBanks" :val="bank.value" :label="bank.label" />
          </div>
        </div>

        <div v-if="selectedBanks.includes('other')" class="custom-bank-section q-mt-md">
          <q-input v-model="customBankName" label="Other Bank Name *" outlined
            placeholder="Enter bank name not listed above" :rules="[val => !!val || 'Bank name is required']" />
        </div>

        <div v-if="selectedBanks.length > 0" class="mortgage-document-preview q-mt-md bg-blue-1 q-pa-md rounded-borders">
          <div class="text-subtitle2 q-mb-sm">Mortgage Clause Document Preview</div>
          <div class="document-content">
            <p><strong>Client:</strong> {{ customerName }}</p>
            <p><strong>Policy Number:</strong> {{ policyNumber }}</p>
            <p><strong>Banks:</strong> {{ getBankDisplayNames() }}</p>
            <p><strong>Date:</strong> {{ currentDate }}</p>
            <p class="text-caption">
              This document confirms that mortgage clauses have been added to the insurance policy
              for the benefit of {{ getBankDisplayNames() }}. The banks will be notified of any changes
              or cancellations to this policy.
            </p>
          </div>
          <div class="q-mt-md">
            <q-btn label="Print Document" color="primary" icon="print" @click="printMortgageDocument" />
            <q-btn label="Download PDF" color="secondary" icon="download" @click="downloadMortgageDocument"
              class="q-ml-sm" />
          </div>
        </div>
      </div>
    </div>

    <div v-if="selectedProduct && !isMiscellaneous" class="product-questions-section">
      <div class="text-h6 text-primary q-mb-md">Product Specific Questions</div>

      <div class="q-mb-lg">
        <div class="text-subtitle2 q-mb-sm"> Owner or Tenant *</div>
        <q-select v-model="ownerTenant" :options="ownerTenantOptions" label="Select option" outlined
          :rules="[val => !!val || 'This field is required']" />
      </div>

      <div v-if="showHomeContentsSection" class="q-mb-lg bg-green-1 q-pa-md rounded-borders">
        <div class="text-subtitle2 q-mb-sm">Home + Contents Coverage *</div>
        <q-select v-model="homeContentsCoverage" :options="homeContentsOptions" label="Select coverage type" outlined
          :rules="[val => !!val || 'Coverage type is required']" />
      </div>

      <div class="q-mb-lg">
        <div class="text-subtitle2 q-mb-sm"> Property Usage *</div>

        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-4">
            <q-radio v-model="propertyUsage" val="residence_only" label="Residence Only" />
          </div>

          <div class="col-12 col-md-4">
            <q-radio v-model="propertyUsage" val="residence_commercial" label="Residence & Commercial Activity" />
          </div>

          <div class="col-12 col-md-4">
            <q-radio v-model="propertyUsage" val="commercial_only" label="Commercial Activities Only" />
          </div>
        </div>

        <div v-if="propertyUsage === 'residence_commercial'" class="q-mt-md bg-orange-1 q-pa-md rounded-borders">
          <div class="text-subtitle2 q-mb-sm">Residence & Commercial Activity Details *</div>

          <q-select v-model="commercialActivityType" :options="residentialCommercialOptions"
            label="Select activity type" outlined :rules="[val => !!val || 'Activity type is required']" />

          <div v-if="commercialActivityType" class="q-mt-sm">
            <q-input v-if="commercialActivityType === 'other'" v-model="customActivityType"
              label="Specify other activity *" outlined
              :rules="[val => !!val || 'Activity specification is required']" />

            <div class="text-caption text-grey q-mt-sm">
              <q-icon name="info" size="sm" />
              <span v-if="['FIR', 'FIRA', 'FIC', 'FICA', 'LOP'].includes(selectedProduct)">
                Below mentioned rates are then increased / to be reviewed by MT
              </span>
              <span v-else-if="['SCAS', 'SECAS', 'SCOM', 'SECOM'].includes(selectedProduct)">
                Rates: MT review
              </span>
              <span v-else>
                Rates to be reviewed
              </span>
            </div>
          </div>
        </div>

        <div v-if="propertyUsage === 'commercial_only'" class="q-mt-md bg-blue-1 q-pa-md rounded-borders">
          <div class="text-subtitle2 q-mb-sm">Commercial Activities Details *</div>

          <q-select v-model="commercialBusinessType" :options="commercialBusinessOptions" label="Select business type"
            outlined :rules="[val => !!val || 'Business type is required']" />

          <div v-if="commercialBusinessType" class="q-mt-sm">
            <q-input v-if="commercialBusinessType === 'other'" v-model="customBusinessType"
              label="Specify other business *" outlined
              :rules="[val => !!val || 'Business specification is required']" />

            <div class="text-caption text-grey q-mt-sm">
              <q-icon name="info" size="sm" />
              <span v-if="['FIR', 'FIRA', 'FIC', 'FICA'].includes(selectedProduct)">
                Rates: Officer will have to insert manually
              </span>
              <span v-else-if="['SCAS', 'SECAS', 'SCOM', 'SECOM', 'LOP'].includes(selectedProduct)">
                Rates: manual input
              </span>
              <span v-else>
                Rates require manual input
              </span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="selectedProduct === 'LOP' && propertyUsage !== 'residence_only'"
        class="q-mb-lg bg-purple-1 q-pa-md rounded-borders">
        <div class="text-subtitle2 q-mb-sm">Loss of Profit Additional Information *</div>

        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-6">
            <q-input v-model="lopAnnualTurnover" label="Annual Turnover *" outlined type="number" prefix="$"
              :rules="[val => !!val || 'Annual turnover is required']" />
          </div>

          <div class="col-12 col-md-6">
            <q-select v-model="lopIndemnityPeriod" :options="lopIndemnityOptions" label="Indemnity Period *" outlined
              :rules="[val => !!val || 'Indemnity period is required']" />
          </div>
        </div>

        <div class="row q-col-gutter-md q-mt-md">
          <div class="col-12 col-md-6">
            <q-input v-model="lopGrossProfit" label="Gross Profit Percentage *" outlined type="number" suffix="%"
              :rules="[val => !!val || 'Gross profit percentage is required']" />
          </div>

          <div class="col-12 col-md-6">
            <div class="text-subtitle2 q-mb-sm">Previous Claims? *</div>
            <div class="row">
              <div class="col-6">
                <q-radio v-model="lopPreviousClaims" val="yes" label="Yes" />
              </div>
              <div class="col-6">
                <q-radio v-model="lopPreviousClaims" val="no" label="No" />
              </div>
            </div>
          </div>
        </div>

        <div class="q-mt-md">
          <q-input v-model="lopStandingCharges" label="Standing Charges *" outlined type="textarea" rows="2"
            :rules="[val => !!val || 'Standing charges are required']"
            placeholder="Describe ongoing business expenses" />
        </div>

        <div v-if="lopPreviousClaims === 'yes'" class="q-mt-md">
          <q-input v-model="lopClaimDescription" label="Describe previous claims *" outlined type="textarea" rows="2"
            :rules="[val => !!val || 'Claim description is required']" />
        </div>
      </div>

      <div v-if="selectedProductInfo" class="q-mt-lg bg-grey-2 q-pa-md rounded-borders">
        <div class="text-subtitle2 q-mb-sm">Product Information: {{ selectedProductInfo.name }}</div>
        <div class="text-caption">{{ selectedProductInfo.description }}</div>
        <div v-if="selectedProductInfo.coverage" class="q-mt-sm">
          <strong>Coverage Includes:</strong>
          <ul class="q-pl-md">
            <li v-for="(item, index) in selectedProductInfo.coverage" :key="index">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>

    <div v-if="selectedProduct && isMiscellaneous" class="miscellaneous-questions-section">
      <div class="text-h6 text-primary q-mb-md">Product Specific Details</div>
      <div class="q-mt-lg bg-grey-2 q-pa-md rounded-borders">
        <div class="text-subtitle2 q-mb-sm">Product Information: {{ selectedProductInfo.name }}</div>
        <div class="text-caption">{{ selectedProductInfo.description }}</div>
        <div v-if="selectedProductInfo.coverage" class="q-mt-sm">
          <strong>Coverage Includes:</strong>
          <ul class="q-pl-md">
            <li v-for="(item, index) in selectedProductInfo.coverage" :key="index">{{ item }}</li>
          </ul>
        </div>
      </div>

     
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, defineEmits, defineProps } from 'vue'
import { Notify } from 'quasar'

const emit = defineEmits(['update:modelValue', 'validation-changed', 'product-selected'])


const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  },
  customerType: {
    type: String,
    default: ''
  },
  typeOfCover: {
    type: String,
    default: ''
  }
})

const isMiscellaneous = computed(() => {
  return props.typeOfCover === 'Miscellaneous'
})

const miscellaneousProductOptions = [
  { label: 'Burglary hold up (BUHU)', value: 'BUHU' },
  { label: 'Burglary (BUR)', value: 'BUR' },
  { label: 'Contractors all risk (CAR)', value: 'CAR' },
  { label: 'Combined fire and theft (CFT)', value: 'CFT' },
  { label: 'Combined fire and theft all extended (CFTE)', value: 'CFTE' },
  { label: 'Money in transit (MIT)', value: 'MIT' },
  { label: 'Personal accident (PA)', value: 'PA' },
  { label: 'Professional indemnity (PI)', value: 'PI' },
  { label: 'Public liability (PLC)', value: 'PLC' },
  { label: 'Tour Operators Liability (TOL)', value: 'TOL' },
  { label: 'Plate glass (PLG)', value: 'PLG' },
  { label: 'Personal liability individual (PLI)', value: 'PLI' }
]

const publicLiabilityOptions = [
  { label: 'Public Liability Premises', value: 'premises' },
  { label: 'Public Liability Operations', value: 'operations' },
  { label: 'Employers Liability', value: 'employers' },
  { label: 'Products Liability', value: 'products' }
]

const allProductOptions = {
  private: [
    { label: 'Fire only (FIR)', value: 'FIR' },
    { label: 'Fire All Extended (FIRA)', value: 'FIRA' },
    { label: 'Smart Cas', value: 'SCAS' },
    { label: 'Smart Economy Cas', value: 'SECAS' }
  ],
  commercial: [
    { label: 'Fire only (FIC)', value: 'FIC' },
    { label: 'Fire All Extended (FICA)', value: 'FICA' },
    { label: 'Smart Com (SCOM)', value: 'SCOM' },
    { label: 'Smart Economy Com (SECOM)', value: 'SECOM' },
    { label: 'Loss of profit (LOP)', value: 'LOP' }
  ],
  miscellaneous: miscellaneousProductOptions
}

const productInfo = {
  // Fire products
  FIR: { name: 'Fire Only (FIR)', description: 'Basic fire insurance coverage for residential properties.', coverage: ['Fire damage', 'Lightning strike', 'Explosion'] },
  FIRA: { name: 'Fire All Extended (FIRA)', description: 'Extended fire insurance with additional coverage options.', coverage: ['Fire damage', 'Lightning strike', 'Explosion', 'Aircraft damage', 'Vehicle impact'] },
  SCAS: { name: 'Smart Cas (SCAS)', description: 'Comprehensive insurance package for residential properties.', coverage: ['Fire damage', 'Theft', 'Water damage', 'Natural disasters'] },
  SECAS: { name: 'Smart Economy Cas (SECAS)', description: 'Economical insurance package for residential properties.', coverage: ['Fire damage', 'Theft', 'Basic water damage'] },
  FIC: { name: 'Fire Only (FIC)', description: 'Basic fire insurance coverage for commercial properties.', coverage: ['Fire damage', 'Lightning strike', 'Explosion'] },
  FICA: { name: 'Fire All Extended (FICA)', description: 'Extended fire insurance for commercial properties with comprehensive coverage.', coverage: ['Fire damage', 'Lightning strike', 'Explosion', 'Aircraft damage', 'Vehicle impact'] },
  SCOM: { name: 'Smart Com (SCOM)', description: 'Comprehensive insurance package for commercial properties.', coverage: ['Fire damage', 'Business interruption', 'Theft', 'Liability coverage'] },
  SECOM: { name: 'Smart Economy Com (SECOM)', description: 'Economical insurance package for commercial properties.', coverage: ['Fire damage', 'Basic business interruption', 'Theft'] },
  LOP: { name: 'Loss of Profit (LOP)', description: 'Coverage for loss of business income due to insured events.', coverage: ['Business interruption', 'Loss of income', 'Extra expenses'] },
  
  // Miscellaneous products
  BUHU: { name: 'Burglary Hold Up (BUHU)', description: 'Coverage for burglary and hold-up incidents.', coverage: ['Burglary', 'Robbery', 'Theft by force', 'Damage during break-in'] },
  BUR: { name: 'Burglary (BUR)', description: 'Coverage for burglary incidents.', coverage: ['Theft', 'Damage to property', 'Forced entry'] },
  CAR: { name: 'Contractors All Risk (CAR)', description: 'Comprehensive coverage for construction projects.', coverage: ['Material damage', 'Third party liability', 'Construction plant', 'Delay in completion'] },
  CFT: { name: 'Combined Fire and Theft (CFT)', description: 'Combined coverage for fire and theft risks.', coverage: ['Fire damage', 'Theft', 'Lightning strike'] },
  CFTE: { name: 'Combined Fire and Theft All Extended (CFTE)', description: 'Extended coverage for fire and theft risks.', coverage: ['Fire damage', 'Theft', 'Explosion', 'Aircraft damage'] },
  MIT: { name: 'Money in Transit (MIT)', description: 'Coverage for cash and valuables during transit.', coverage: ['Cash in transit', 'Cheques', 'Securities', 'Bullion'] },
  PA: { name: 'Personal Accident (PA)', description: 'Coverage for accidental injury or death.', coverage: ['Accidental death', 'Permanent disability', 'Medical expenses', 'Temporary disability'] },
  PI: { name: 'Professional Indemnity (PI)', description: 'Coverage for professional negligence.', coverage: ['Legal costs', 'Damages', 'Negligence claims', 'Defense costs'] },
  PLC: { name: 'Public Liability (PLC)', description: 'Coverage for third-party injury or property damage.', coverage: ['Bodily injury', 'Property damage', 'Legal liability', 'Defense costs'] },
  TOL: { name: 'Tour Operators Liability (TOL)', description: 'Specialized liability coverage for tour operators.', coverage: ['Passenger injury', 'Property damage', 'Travel delays', 'Cancellation costs'] },
  PLG: { name: 'Plate Glass (PLG)', description: 'Coverage for breakage of glass.', coverage: ['Plate glass breakage', 'Signs', 'Mirrors', 'Showcases'] },
  PLI: { name: 'Personal Liability Individual (PLI)', description: 'Personal liability coverage for individuals.', coverage: ['Personal liability', 'Property damage', 'Accidental injury'] }
}

const bankOptions = [
  { label: 'Aruba Bank N.V.', value: 'aruba_bank' },
  { label: 'Banco di Caribe N.V.', value: 'banco_di_caribe' },
  { label: 'Caribbean Mercantile Bank N.V.', value: 'caribbean_mercantile' },
  { label: 'CIBC FirstCaribbean International Bank Aruba', value: 'cibc' },
  { label: 'RBC Royal Bank (Aruba) N.V.', value: 'rbc' },
  { label: 'Algemeen Pensioenfonds Aruba', value: 'apfa' },
  { label: 'Aruba Investment Bank', value: 'aib' },
  { label: 'Other', value: 'other' }
]

const ownerTenantOptions = [
  { label: 'Owner', value: 'owner' },
  { label: 'Tenant', value: 'tenant' }
]

const homeContentsOptions = [
  { label: 'Home (building) only', value: 'home_only' },
  { label: 'Contents only', value: 'contents_only' },
  { label: 'Home + Contents', value: 'home_contents' }
]

const residentialCommercialOptions = [
  { label: 'Short Term Rental', value: 'short_term_rental' },
  { label: 'Long Term Rental', value: 'long_term_rental' },
  { label: 'AirBnB', value: 'airbnb' },
  { label: 'Other', value: 'other' }
]

const commercialBusinessOptions = [
  { label: 'Office', value: 'office' },
  { label: 'Restaurant', value: 'restaurant' },
  { label: 'Supermarket', value: 'supermarket' },
  { label: 'Multi-Purpose building (Mall)', value: 'mall' },
  { label: 'School', value: 'school' },
  { label: 'Other', value: 'other' }
]

const lopIndemnityOptions = [
  { label: '3 months', value: '3' },
  { label: '6 months', value: '6' },
  { label: '12 months', value: '12' }
]

const selectedProduct = ref('')
const selectedPublicLiabilityType = ref('')
const premisesLocation = ref('')

const mortgageRequired = ref('no')
const selectedBanks = ref([])
const customBankName = ref('')
const ownerTenant = ref('')
const homeContentsCoverage = ref('')
const propertyUsage = ref('')
const commercialActivityType = ref('')
const customActivityType = ref('')
const commercialBusinessType = ref('')
const customBusinessType = ref('')
const lopAnnualTurnover = ref('')
const lopIndemnityPeriod = ref('')
const lopGrossProfit = ref('')
const lopStandingCharges = ref('')
const lopPreviousClaims = ref('no')
const lopClaimDescription = ref('')

// Miscellaneous-specific variables
const securityMeasures = ref('')
const maxCashOnPremises = ref(0)
const previousBreakIns = ref('no')
const breakInDetails = ref('')
const contractValue = ref(0)
const contractDuration = ref(0)
const contractDescription = ref('')
const maxTransitAmount = ref(0)
const transitFrequency = ref('')
const securityVehicles = ref('no')

const filteredProductOptions = computed(() => {
  const type = props.customerType?.toLowerCase() || ''
  const coverType = props.typeOfCover || ''
  
  console.log('Filtering products:', { type, coverType })
  
  if (coverType === 'Miscellaneous') {
    if (type === 'private') {
      console.log('Showing Miscellaneous/Private products')
      return miscellaneousProductOptions.filter(product => 
        ['CAR', 'PA', 'PI', 'PLC', 'TOL'].includes(product.value)
      )
    } else if (type === 'commercial') {
      console.log('Showing Miscellaneous/Commercial products')
      return miscellaneousProductOptions.filter(product => 
        ['BUHU', 'BUR', 'CFT', 'CFTE','MIT','PI', 'PLG', 'PLI'].includes(product.value)
      )
    } else {
      console.log('No customer type selected for Miscellaneous')
      return []
    }
  } 
  else if (coverType === 'Fire') {
    console.log('Showing Fire insurance products')
    if (type === 'private') {
      return allProductOptions.private
    } else if (type === 'commercial') {
      return allProductOptions.commercial
    } else {
      return []
    }
  }
  
  console.log('No cover type selected')
  return []
})

const selectedProductInfo = computed(() => {
  return selectedProduct.value ? productInfo[selectedProduct.value] : null
})

const customerName = computed(() => {
  return props.modelValue.customer?.fullName || 'Client Name'
})

const policyNumber = computed(() => {
  return `POL-${Math.floor(100000 + Math.random() * 900000)}`
})

const currentDate = computed(() => {
  return new Date().toLocaleDateString()
})

const showHomeContentsSection = computed(() => {
  return selectedProduct.value === 'SECAS' || selectedProduct.value === 'SECOM'
})

const isStepValid = computed(() => {
  if (!selectedProduct.value) return false
  if (!premisesLocation.value) return false

  

  if (isMiscellaneous.value) {
    return true
  }

  if (mortgageRequired.value === 'yes') {
    if (selectedBanks.value.length === 0) return false
    if (selectedBanks.value.includes('other') && !customBankName.value) return false
  }

  if (!ownerTenant.value) return false

  if (showHomeContentsSection.value && !homeContentsCoverage.value) return false

  if (!propertyUsage.value) return false

  if (propertyUsage.value === 'residence_commercial') {
    if (!commercialActivityType.value) return false
    if (commercialActivityType.value === 'other' && !customActivityType.value) return false
  }

  if (propertyUsage.value === 'commercial_only') {
    if (!commercialBusinessType.value) return false
    if (commercialBusinessType.value === 'other' && !customBusinessType.value) return false
  }

  if (selectedProduct.value === 'LOP' && propertyUsage.value !== 'residence_only') {
    if (
      !lopAnnualTurnover.value ||
      !lopIndemnityPeriod.value ||
      !lopGrossProfit.value ||
      !lopStandingCharges.value
    ) return false

    if (lopPreviousClaims.value === 'yes' && !lopClaimDescription.value) return false
  }

  return true
})

const getBankDisplayNames = () => {
  const bankNames = selectedBanks.value.map(bankValue => {
    if (bankValue === 'other') {
      return customBankName.value
    }
    const bank = bankOptions.find(b => b.value === bankValue)
    return bank ? bank.label : bankValue
  })
  return bankNames.join(', ')
}

const handleProductChange = (product) => {
  console.log('Product selected:', product)
  emit('product-selected', product)
  emitValidation()
}

const resetDependentProductFields = () => {
  selectedPublicLiabilityType.value = ''
  
  ownerTenant.value = ''
  homeContentsCoverage.value = ''
  propertyUsage.value = ''
  commercialActivityType.value = ''
  customActivityType.value = ''
  commercialBusinessType.value = ''
  customBusinessType.value = ''
  lopAnnualTurnover.value = ''
  lopIndemnityPeriod.value = ''
  lopGrossProfit.value = ''
  lopStandingCharges.value = ''
  lopPreviousClaims.value = 'no'
  lopClaimDescription.value = ''
  
  securityMeasures.value = ''
  maxCashOnPremises.value = 0
  previousBreakIns.value = 'no'
  breakInDetails.value = ''
  contractValue.value = 0
  contractDuration.value = 0
  contractDescription.value = ''
  maxTransitAmount.value = 0
  transitFrequency.value = ''
  securityVehicles.value = 'no'
}

const handleMortgageChange = (value) => {
  if (value === 'no') {
    selectedBanks.value = []
    customBankName.value = ''
  }
  emitValidation()
}

const showCustomNotification = (message, color = 'primary', icon = 'info') => {
  Notify.create({
    message,
    color,
    textColor: 'white',
    icon,
    position: 'center',
    timeout: 4000,
    actions: [{ label: '✖', color: 'white', handler: () => {} }],
    classes: 'material-notify',
    html: true,
    style: `
      font-size: 20px; 
      font-weight: 600; 
      padding: 24px 32px; 
      border-radius: 24px; 
      min-width: 360px; 
      max-width: 50px;
      box-shadow: 0 16px 36px rgba(0,0,0,0.28);
      text-align: center;
    `
  })
}

const printMortgageDocument = () => {
  const bankNames = getBankDisplayNames()
  const documentContent = `Client: ${customerName.value}\nPolicy: ${policyNumber.value}\nBanks: ${bankNames}`
  console.log('Printing mortgage document:', documentContent)

  showCustomNotification('Mortgage document sent to printer', 'primary', 'print')
}

const downloadMortgageDocument = () => {
  const bankNames = getBankDisplayNames()
  const documentContent = `Mortgage Clause Document\n\nClient: ${customerName.value}\nBanks: ${bankNames}`
  console.log('Downloading mortgage document:', documentContent)

  showCustomNotification('Mortgage document downloaded as PDF', 'positive', 'download')
}


const emitValidation = () => {
  emit('validation-changed', isStepValid.value)
}

const validate = () => {
  return isStepValid.value
}

const resetForm = () => {
  selectedProduct.value = ''
  selectedPublicLiabilityType.value = ''
  premisesLocation.value = ''
  
  mortgageRequired.value = 'no'
  selectedBanks.value = []
  customBankName.value = ''
  
  resetDependentProductFields()
}

watch(isStepValid, (newVal) => {
  emit('validation-changed', newVal)
}, { immediate: true })

watch(() => ({
  selectedProduct: selectedProduct.value,
  selectedPublicLiabilityType: selectedPublicLiabilityType.value,
  premisesLocation: premisesLocation.value,
  
  // Fire fields
  mortgageRequired: mortgageRequired.value,
  selectedBanks: selectedBanks.value,
  customBankName: customBankName.value,
  ownerTenant: ownerTenant.value,
  homeContentsCoverage: homeContentsCoverage.value,
  propertyUsage: propertyUsage.value,
  commercialActivityType: commercialActivityType.value,
  customActivityType: customActivityType.value,
  commercialBusinessType: commercialBusinessType.value,
  customBusinessType: customBusinessType.value,
  lopAnnualTurnover: lopAnnualTurnover.value,
  lopIndemnityPeriod: lopIndemnityPeriod.value,
  lopGrossProfit: lopGrossProfit.value,
  lopStandingCharges: lopStandingCharges.value,
  lopPreviousClaims: lopPreviousClaims.value,
  lopClaimDescription: lopClaimDescription.value,
  
  // Miscellaneous fields
  securityMeasures: securityMeasures.value,
  maxCashOnPremises: maxCashOnPremises.value,
  previousBreakIns: previousBreakIns.value,
  breakInDetails: breakInDetails.value,
  contractValue: contractValue.value,
  contractDuration: contractDuration.value,
  contractDescription: contractDescription.value,
  maxTransitAmount: maxTransitAmount.value,
  transitFrequency: transitFrequency.value,
  securityVehicles: securityVehicles.value
}), (newVal) => {
  emit('update:modelValue', newVal)
}, { deep: true })

watch(() => props.modelValue, (newVal) => {
  if (newVal.selectedProduct) selectedProduct.value = newVal.selectedProduct
  if (newVal.selectedPublicLiabilityType) selectedPublicLiabilityType.value = newVal.selectedPublicLiabilityType
  if (newVal.premisesLocation) premisesLocation.value = newVal.premisesLocation
  
  // Fire fields
  if (newVal.mortgageRequired) mortgageRequired.value = newVal.mortgageRequired
  if (newVal.selectedBanks) selectedBanks.value = newVal.selectedBanks
  if (newVal.customBankName) customBankName.value = newVal.customBankName
  if (newVal.ownerTenant) ownerTenant.value = newVal.ownerTenant
  if (newVal.homeContentsCoverage) homeContentsCoverage.value = newVal.homeContentsCoverage
  if (newVal.propertyUsage) propertyUsage.value = newVal.propertyUsage
  if (newVal.commercialActivityType) commercialActivityType.value = newVal.commercialActivityType
  if (newVal.customActivityType) customActivityType.value = newVal.customActivityType
  if (newVal.commercialBusinessType) commercialBusinessType.value = newVal.commercialBusinessType
  if (newVal.customBusinessType) customBusinessType.value = newVal.customBusinessType
  if (newVal.lopAnnualTurnover) lopAnnualTurnover.value = newVal.lopAnnualTurnover
  if (newVal.lopIndemnityPeriod) lopIndemnityPeriod.value = newVal.lopIndemnityPeriod
  if (newVal.lopGrossProfit) lopGrossProfit.value = newVal.lopGrossProfit
  if (newVal.lopStandingCharges) lopStandingCharges.value = newVal.lopStandingCharges
  if (newVal.lopPreviousClaims) lopPreviousClaims.value = newVal.lopPreviousClaims
  if (newVal.lopClaimDescription) lopClaimDescription.value = newVal.lopClaimDescription
  
  // Miscellaneous fields
  if (newVal.securityMeasures) securityMeasures.value = newVal.securityMeasures
  if (newVal.maxCashOnPremises) maxCashOnPremises.value = newVal.maxCashOnPremises
  if (newVal.previousBreakIns) previousBreakIns.value = newVal.previousBreakIns
  if (newVal.breakInDetails) breakInDetails.value = newVal.breakInDetails
  if (newVal.contractValue) contractValue.value = newVal.contractValue
  if (newVal.contractDuration) contractDuration.value = newVal.contractDuration
  if (newVal.contractDescription) contractDescription.value = newVal.contractDescription
  if (newVal.maxTransitAmount) maxTransitAmount.value = newVal.maxTransitAmount
  if (newVal.transitFrequency) transitFrequency.value = newVal.transitFrequency
  if (newVal.securityVehicles) securityVehicles.value = newVal.securityVehicles
}, { immediate: true })

watch(selectedProduct, (newProduct, oldProduct) => {
  if (newProduct !== oldProduct) {
    resetDependentProductFields()
  }
})

defineExpose({
  validate,
  resetForm
})
</script>

<style scoped>
.product-selection-container {
  max-width: 800px;
}

.rounded-borders {
  border-radius: 8px;
}

.product-questions-section,
.miscellaneous-questions-section {
  border-top: 2px solid #e0e0e0;
  padding-top: 20px;
  margin-top: 20px;
}

.bg-green-1 {
  background-color: rgba(200, 230, 200, 0.3);
}

.bg-orange-1 {
  background-color: rgba(255, 224, 178, 0.3);
}

.bg-blue-1 {
  background-color: rgba(187, 222, 251, 0.3);
}

.bg-purple-1 {
  background-color: rgba(225, 190, 231, 0.3);
}

.bg-grey-2 {
  background-color: rgba(245, 245, 245, 0.8);
}

.document-content p {
  margin-bottom: 8px;
}

@keyframes materialFadeBounce {
  0% {
    opacity: 0;
    transform: scale(0.6);
  }
  60% {
    opacity: 1;
    transform: scale(1.08);
  }
  80% {
    transform: scale(0.97);
  }
  100% {
    transform: scale(1);
  }
}

.material-notify {
  animation: materialFadeBounce 0.5s ease forwards;
}
</style>