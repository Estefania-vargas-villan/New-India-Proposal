<template>
  <div>
    <div class="q-mb-md">
      <div class="text-subtitle2 q-mb-sm">Existing Customer? *</div>
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-4">
          <q-radio v-model="existingCustomer" val="yes" label="Yes"
            @update:model-value="handleExistingCustomerChange" />
        </div>
        <div class="col-12 col-md-6">
          <q-radio v-model="existingCustomer" val="no" label="No" @update:model-value="handleExistingCustomerChange" />
        </div>
      </div>
    </div>

    <div v-if="existingCustomer === 'yes'" class="q-mb-md">
      <div class="text-subtitle2 q-mb-sm">Select Existing Customer *</div>
      <q-select ref="customerSelectRef" v-model="selectedCustomer" :options="filteredCustomers"
        label="Type customer name to search" use-input outlined emit-value map-options option-label="fullName"
        option-value="id" @filter="filterCustomers" @update:model-value="handleCustomerSelect"
        @clear="handleClearCustomer" clearable
        :rules="existingCustomer === 'yes' ? [val => !!val || 'Customer selection is required'] : []">
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section>
              <q-item-label>{{ scope.opt.fullName }}</q-item-label>
              <q-item-label caption>{{ scope.opt.code }} - {{ scope.opt.email }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No customers found
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>

    <div v-if="existingCustomer === 'no'" class="q-mb-md">
      <q-card class="q-mt-md bg-blue-1">
        <q-card-section>
          <div class="text-subtitle2 q-mb-sm">Create New Customer</div>
          <div class="text-caption text-grey q-mb-sm">
            Customer ID will be auto-generated upon creation
          </div>

          <q-form @submit="createNewCustomer" class="q-gutter-md">
            <q-input v-model="newCustomer.fullName" label="Name of proposer (in full) *" outlined
              :rules="[val => !!val || 'Full name is required']" />
            <q-input v-model="newCustomer.fullMailingAddress" label="Full mailing address *" outlined type="textarea"
              rows="2" :rules="[val => !!val || 'Mailing address is required']" />

            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-6">
                <q-input v-model="newCustomer.homeOrWorkTel" label="Home/Work Tel # *" outlined
                  :rules="[val => !!val || 'Phone is required']" />
              </div>
              <div class="col-12 col-md-6">
                <q-input v-model="newCustomer.cellMobile" label="Cell/Mobile # *" outlined
                  :rules="[val => !!val || 'Mobile number is required']" />
              </div>
            </div>

            <q-input v-model="newCustomer.email" label="Email *" outlined type="email"
              :rules="[val => !!val || 'Email is required']" />

            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-6">
                <q-input v-model="newCustomer.persoonsNumber" label="Persoons #" outlined />
              </div>
              <div class="col-12 col-md-6">
                <q-input v-model="newCustomer.businessProfession" label="Proposer's Business or Profession *" outlined
                  :rules="[val => !!val || 'Business/Profession is required']" />
              </div>
            </div>

            <div class="insurance-period-section q-mt-lg">
              <div class="text-subtitle2 q-mb-sm">Period of Insurance</div>
              <div class="text-caption text-grey q-mb-sm">
                (Which cannot be before the proposal is accepted by the company)
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-4">
                  <q-select v-model="newCustomer.insurancePeriodMonths" :options="insurancePeriodOptions"
                    label="Months *" outlined emit-value map-options
                    :rules="[val => !!val || 'Insurance period is required']" />
                </div>
                <div class="col-12 col-md-4">
                  <q-input v-model="newCustomer.insuranceDateFrom" label="Date From *" outlined
                    :rules="[val => !!val || 'Start date is required']">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                          <q-date v-model="newCustomer.insuranceDateFrom" mask="YYYY-MM-DD">
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup label="Close" color="primary" flat />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                <div class="col-12 col-md-4">
                  <q-input v-model="newCustomer.insuranceDateUntil" label="Until 23:59:59 *" outlined
                    :rules="[val => !!val || 'End date is required']">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                          <q-date v-model="newCustomer.insuranceDateUntil" mask="YYYY-MM-DD">
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup label="Close" color="primary" flat />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>
            </div>

            <div class="premises-section q-mt-lg">
              <div class="text-subtitle2 q-mb-sm">Location of Premises Proposed for Insurance</div>
              <div class="text-caption text-grey q-mb-sm">
                (Any change of location after the proposal is submitted, must be brought to the notice of the insurance
                company immediately)
              </div>

              <q-input v-model="newCustomer.premisesSituation" label="Situation *" outlined type="textarea" rows="3"
                hint="Give full address, i.e. name of building, street, town, etc"
                :rules="[val => !!val || 'Premises situation is required']" />
            </div>

            <div class="row q-gutter-sm">
              <q-btn label="Save Customer" color="primary" type="submit" :loading="savingCustomer" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>

    <div class="q-mb-md">
      <div class="text-subtitle2 q-mb-sm">1Select Broker *</div>
      <q-select v-model="selectedBroker" :options="brokerOptions" label="Select broker" outlined emit-value map-options
        option-label="label" option-value="value" :rules="[val => !!val || 'Broker selection is required']" />
    </div>

    <div class="q-mb-md">
      <div class="text-subtitle2 q-mb-sm">Select On Account Code (if applicable)</div>
      <q-select v-model="selectedAccountCode" :options="accountCodeOptions" label="Select account code" outlined
        emit-value map-options option-label="label" option-value="value"
        @update:model-value="handleAccountCodeChange" />
    </div>


    <div class="q-mb-md">
      <div class="text-subtitle2 q-mb-sm">Policy Period *</div>

      <div class="row q-col-gutter-md q-mb-md">
        <div class="col-12 col-md-4">
          <q-radio v-model="selectedPolicyPeriod" val="1_YEAR" label="1 Year"
            @update:model-value="handlePolicyPeriodChange" />
        </div>
        <div class="col-12 col-md-4">
          <q-radio v-model="selectedPolicyPeriod" val="6_MONTHS" label="6 Months"
            @update:model-value="handlePolicyPeriodChange" />
        </div>
        <!-- <div class="col-12 col-md-4">
          <q-radio 
            v-model="selectedPolicyPeriod" 
            val="QUARTERLY" 
            label="Quarterly"
            @update:model-value="handlePolicyPeriodChange"
          />
        </div> -->
      </div>

      <div v-if="selectedPolicyPeriod" class="q-mb-md">
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-6">
            <q-input v-model="policyPeriodStartDate" label="Start Date *" outlined
              :rules="[val => !!val || 'Start date is required']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="policyPeriodStartDate" mask="YYYY-MM-DD"
                      @update:model-value="handlePolicyDateChange('start')">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md-6">
            <q-input v-model="policyPeriodEndDate" label="End Date *" outlined
              :rules="[val => !!val || 'End date is required']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="policyPeriodEndDate" mask="YYYY-MM-DD"
                      @update:model-value="handlePolicyDateChange('end')">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>
      </div>

      <div v-if="selectedAccountCode === 'NEW_PART_PAYMENT'" class="q-mt-md bg-yellow-1 q-pa-md rounded-borders">
        <div class="text-subtitle2 q-mb-sm">Grant covernote for 1 month</div>
        <div class="text-caption text-grey q-mb-sm">
          Available for New Part Payment
        </div>
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-6">
            <q-input v-model="covernoteStartDate" label="Start Date" outlined placeholder="YYYY-MM-DD"
              :rules="[val => !!val || 'Start date is required']" hint="Enter date manually (YYYY-MM-DD)" />
          </div>
          <div class="col-12 col-md-6">
            <q-input v-model="covernoteEndDate" label="End Date" outlined placeholder="YYYY-MM-DD"
              :rules="[val => !!val || 'End date is required']" hint="Enter date manually (YYYY-MM-DD)" />
          </div>
        </div>
        <div class="text-caption text-grey q-mt-sm">
          Manual date entry required for 1-month covernote period
        </div>
      </div>

      <!-- Quarterly Confirmation -->
      <!-- <div v-if="selectedPolicyPeriod === 'QUARTERLY'" class="q-mt-md bg-orange-1 q-pa-md rounded-borders">
        <div class="text-subtitle2 q-mb-sm">Quarterly Policy Confirmation</div>
        <div class="text-caption text-grey q-mb-sm">
          Check with MT if quarterly policy is available for this case
        </div>
        <q-checkbox v-model="quarterlyConfirmed" label="I confirm that MT has approved quarterly policy for this client"
          :rules="[val => !!val || 'Quarterly confirmation is required']" />
      </div> -->
    </div>


    <div class="q-mb-md">
      <div class="text-subtitle2 q-mb-sm">Invoice Date *</div>
      <q-input v-model="invoiceDate" label="Invoice Date" outlined
        :rules="[val => !!val || 'Invoice date is required']">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="invoiceDate" mask="YYYY-MM-DD">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, defineEmits, defineProps } from 'vue'

const emit = defineEmits(['update:modelValue', 'validation-changed'])

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  }
})

const existingCustomer = ref(null)
const selectedCustomer = ref(null)
const selectedBroker = ref(null)
const selectedAccountCode = ref(null)
const selectedPolicyPeriod = ref(null)
const policyPeriodStartDate = ref(null)
const policyPeriodEndDate = ref(null)
const invoiceDate = ref(null)
const covernoteStartDate = ref(null)
const covernoteEndDate = ref(null)
const quarterlyConfirmed = ref(false)

const savingCustomer = ref(false)
const filteredCustomers = ref([])
const customerSelectRef = ref(null)

const insurancePeriodOptions = [
  { label: '1 Month', value: 1 },
  { label: '3 Months', value: 3 },
  { label: '6 Months', value: 6 },
  { label: '12 Months', value: 12 },
  { label: '24 Months', value: 24 },
  { label: '36 Months', value: 36 }
]

const brokerOptions = [
  { label: 'Broker A', value: 'A' },
  { label: 'Broker B', value: 'B' },
  { label: 'Broker C', value: 'C' }
]

const accountCodeOptions = [
  { label: 'Standard Payment', value: 'STANDARD' },
  { label: 'New Part Payment', value: 'NEW_PART_PAYMENT' },
  { label: 'Corporate Account', value: 'CORPORATE' }
]

const mockCustomers = [
  {
    id: 1,
    code: 'CUST001',
    fullName: 'John Smith',
    fullMailingAddress: '123 Main St, New York, NY 10001',
    homeOrWorkTel: '+1234567890',
    cellMobile: '+1234567890',
    email: 'john.smith@email.com',
    persoonsNumber: 'P123456',
    businessProfession: 'Software Engineer',
    insurancePeriodMonths: 12,
    insuranceDateFrom: '2024-01-01',
    insuranceDateUntil: '2024-12-31',
    premisesSituation: 'Office Building A, 123 Main Street, New York, NY'
  },
  {
    id: 2,
    code: 'CUST002',
    fullName: 'Maria Garcia',
    fullMailingAddress: '456 Oak Ave, Los Angeles, CA 90001',
    homeOrWorkTel: '+1987654321',
    cellMobile: '+1987654321',
    email: 'maria.garcia@email.com',
    persoonsNumber: 'P654321',
    businessProfession: 'Business Owner',
    insurancePeriodMonths: 6,
    insuranceDateFrom: '2024-01-01',
    insuranceDateUntil: '2024-06-30',
    premisesSituation: 'Retail Store, 456 Oak Avenue, Los Angeles, CA'
  }
]

const newCustomer = reactive({
  fullName: '',
  fullMailingAddress: '',
  homeOrWorkTel: '',
  cellMobile: '',
  email: '',
  persoonsNumber: '',
  businessProfession: '',
  insurancePeriodMonths: null,
  insuranceDateFrom: '',
  insuranceDateUntil: '',
  premisesSituation: ''
})

const isStepValid = computed(() => {
  if (!existingCustomer.value) return false

  if (existingCustomer.value === 'yes' && !selectedCustomer.value) return false
  if (existingCustomer.value === 'no' && !newCustomer.fullName) return false

  const baseValidation = selectedBroker.value &&
    invoiceDate.value

  if (!baseValidation) return false

  if (!selectedPolicyPeriod.value) return false

  if (!policyPeriodStartDate.value || !policyPeriodEndDate.value) return false

  if (selectedPolicyPeriod.value === 'QUARTERLY' && !quarterlyConfirmed.value) return false

  if (selectedAccountCode.value === 'NEW_PART_PAYMENT') {
    if (!covernoteStartDate.value || !covernoteEndDate.value) return false
  }

  return true
})

watch(isStepValid, (newVal) => {
  emit('validation-changed', newVal)
}, { immediate: true })

watch(() => ({
  existingCustomer: existingCustomer.value,
  customer: selectedCustomer.value,
  broker: selectedBroker.value,
  accountCode: selectedAccountCode.value,
  policyPeriod: selectedPolicyPeriod.value,
  policyPeriodDates: {
    start: policyPeriodStartDate.value,
    end: policyPeriodEndDate.value
  },
  quarterlyConfirmed: quarterlyConfirmed.value,
  covernote: {
    enabled: selectedAccountCode.value === 'NEW_PART_PAYMENT',
    start: covernoteStartDate.value,
    end: covernoteEndDate.value
  },
  invoiceDate: invoiceDate.value,
  newCustomer: existingCustomer.value === 'no' ? { ...newCustomer } : null
}), (newVal) => {
  emit('update:modelValue', newVal)
}, { deep: true, immediate: true })

const handleExistingCustomerChange = (value) => {
  console.log('Existing customer selection:', value)

  if (value === 'yes') {
    Object.keys(newCustomer).forEach(key => {
      newCustomer[key] = ''
    })
    filteredCustomers.value = [...mockCustomers]
  } else if (value === 'no') {
    selectedCustomer.value = null
  }
}

const filterCustomers = (val, update) => {
  update(() => {
    if (val === '') {
      filteredCustomers.value = mockCustomers
    } else {
      const needle = val.toLowerCase()
      filteredCustomers.value = mockCustomers.filter(
        customer => customer.fullName.toLowerCase().includes(needle)
      )
    }
  })
}

const handleCustomerSelect = (customer) => {
  console.log('Customer selected:', customer)
  if (customer) {
    if (!invoiceDate.value) {
      invoiceDate.value = new Date().toISOString().split('T')[0]
    }
  }
}

const handleClearCustomer = () => {
  selectedCustomer.value = null
}

const handlePolicyPeriodChange = (policyPeriod) => {
  console.log('Policy period selected:', policyPeriod)

  if (policyPeriod !== 'QUARTERLY') {
    quarterlyConfirmed.value = false
  }

  if (!policyPeriodStartDate.value) {
    policyPeriodStartDate.value = new Date().toISOString().split('T')[0]
  }

  calculatePolicyEndDate(policyPeriod)
}

const calculatePolicyEndDate = (period) => {
  if (!policyPeriodStartDate.value) return

  const startDate = new Date(policyPeriodStartDate.value)
  let endDate = new Date(startDate)

  switch (period) {
    case '1_YEAR':
      endDate.setFullYear(startDate.getFullYear() + 1)
      break
    case '6_MONTHS':
      endDate.setMonth(startDate.getMonth() + 6)
      break
    case 'QUARTERLY':
      endDate.setMonth(startDate.getMonth() + 3)
      break
  }

  endDate.setDate(endDate.getDate() - 1)

  policyPeriodEndDate.value = endDate.toISOString().split('T')[0]
}

const handlePolicyDateChange = (type) => {
  console.log(`${type} date changed:`, type === 'start' ? policyPeriodStartDate.value : policyPeriodEndDate.value)

  if (type === 'start' && selectedPolicyPeriod.value) {
    calculatePolicyEndDate(selectedPolicyPeriod.value)
  }
}

const handleAccountCodeChange = (accountCode) => {
  console.log('Account code selected:', accountCode)

  if (accountCode === 'NEW_PART_PAYMENT') {
    suggestCovernoteDates()
  } else {
    covernoteStartDate.value = null
    covernoteEndDate.value = null
  }
}

const suggestCovernoteDates = () => {
  if (policyPeriodStartDate.value) {
    if (!covernoteStartDate.value) {
      covernoteStartDate.value = policyPeriodStartDate.value
    }
    if (!covernoteEndDate.value) {
      const endDate = new Date(policyPeriodStartDate.value)
      endDate.setMonth(endDate.getMonth() + 1)
      covernoteEndDate.value = endDate.toISOString().split('T')[0]
    }
  }
}

const createNewCustomer = async () => {
  const requiredFields = ['fullName', 'fullMailingAddress', 'homeOrWorkTel',
    'cellMobile', 'email', 'businessProfession',
    'insurancePeriodMonths', 'insuranceDateFrom',
    'insuranceDateUntil', 'premisesSituation']

  for (const field of requiredFields) {
    if (!newCustomer[field]) {
      console.error(`Field ${field} is required`)
      return
    }
  }

  savingCustomer.value = true

  try {
    await new Promise(resolve => setTimeout(resolve, 1000))

    const newCustomerCode = `CUST${String(mockCustomers.length + 1).padStart(3, '0')}`

    const newCustomerObj = {
      id: mockCustomers.length + 1,
      code: newCustomerCode,
      fullName: newCustomer.fullName,
      fullMailingAddress: newCustomer.fullMailingAddress,
      homeOrWorkTel: newCustomer.homeOrWorkTel,
      cellMobile: newCustomer.cellMobile,
      email: newCustomer.email,
      persoonsNumber: newCustomer.persoonsNumber,
      businessProfession: newCustomer.businessProfession,
      insurancePeriodMonths: newCustomer.insurancePeriodMonths,
      insuranceDateFrom: newCustomer.insuranceDateFrom,
      insuranceDateUntil: newCustomer.insuranceDateUntil,
      premisesSituation: newCustomer.premisesSituation
    }

    mockCustomers.push(newCustomerObj)
    filteredCustomers.value = [...mockCustomers]

    selectedCustomer.value = newCustomerObj
    existingCustomer.value = 'yes'

    Object.keys(newCustomer).forEach(key => {
      newCustomer[key] = ''
    })

    console.log('New customer created:', newCustomerObj)

  } catch (error) {
    console.error('Error creating customer:', error)
  } finally {
    savingCustomer.value = false
  }
}

const validate = () => {
  return isStepValid.value
}

const resetForm = () => {
  existingCustomer.value = null
  selectedCustomer.value = null
  selectedBroker.value = null
  selectedAccountCode.value = null
  selectedPolicyPeriod.value = null
  policyPeriodStartDate.value = null
  policyPeriodEndDate.value = null
  invoiceDate.value = today.toISOString().split('T')[0]
  covernoteStartDate.value = null
  covernoteEndDate.value = null
  quarterlyConfirmed.value = false

  Object.keys(newCustomer).forEach(key => {
    newCustomer[key] = ''
  })
}

const today = new Date()
invoiceDate.value = today.toISOString().split('T')[0]

watch(() => props.modelValue, (newVal) => {
  if (newVal.existingCustomer) existingCustomer.value = newVal.existingCustomer
  if (newVal.customer) selectedCustomer.value = newVal.customer
  if (newVal.broker) selectedBroker.value = newVal.broker
  if (newVal.accountCode) selectedAccountCode.value = newVal.accountCode
  if (newVal.policyPeriod) selectedPolicyPeriod.value = newVal.policyPeriod
  if (newVal.policyPeriodDates) {
    policyPeriodStartDate.value = newVal.policyPeriodDates.start
    policyPeriodEndDate.value = newVal.policyPeriodDates.end
  }
  if (newVal.invoiceDate) invoiceDate.value = newVal.invoiceDate
  if (newVal.quarterlyConfirmed) quarterlyConfirmed.value = newVal.quarterlyConfirmed
  if (newVal.covernote) {
    covernoteStartDate.value = newVal.covernote.start
    covernoteEndDate.value = newVal.covernote.end
  }
}, { immediate: true })

defineExpose({
  validate,
  resetForm
})
</script>

<style scoped>
.step1-container {
  max-width: 600px;
}

.rounded-borders {
  border-radius: 8px;
}

.insurance-period-section,
.premises-section {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  background-color: #fafafa;
}

.insurance-period-section {
  background-color: #fff8e1;
}

.premises-section {
  background-color: #e8f5e8;
}

.q-radio {
  padding: 8px 0;
}

.q-radio {
  margin-bottom: 8px;
}

.q-radio__label {
  font-size: 1rem;
}
</style>