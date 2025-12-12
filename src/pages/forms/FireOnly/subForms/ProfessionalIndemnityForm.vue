<template>
  <div>
    <div class="text-h5 text-primary q-mb-md text-center">
      PROPOSAL FORM FOR PROFESSIONAL INDEMNITY
    </div>
    <div class="text-h5 text-primary q-mb-md text-center">ACCOUNTANTS/SOLICITORS/LAWYERS/COUNSELS/FINANCIAL CONSULTANTS
    </div>
    <p>This proposal must be signed. All questions must be answered. The completion and signature ofthis proposal does
      not bind the proposer
      or Insurer to complete a contract of Insurance. </p>
    <p> The Company does not assume any liabilities until the proposal has been accepted and premium paid.</p>

    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-subtitle1 text-weight-bold q-mb-sm">Please describe your Business Operation(s):</div>

        <div class="q-mb-md">
          <div class="text-subtitle2 q-mb-sm">Full details of work carried on *</div>
          <q-input v-model="businessOperationsDetails" label="Describe your business operations in detail *" outlined
            type="textarea" rows="4" :rules="[val => !!val || 'Business operations details are required']" />
          <div class="text-caption text-grey q-mt-xs">
            Please attach brochure, information booklet, etc. if any & specimen copy of contracts entered into
          </div>
        </div>

        <div class="q-mt-md">
          <q-file v-model="businessOperationsDocuments" label="Attach supporting documents" outlined multiple
            accept=".pdf,.doc,.docx,.jpg,.png">
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file>
        </div>
      </q-card-section>
    </q-card>

    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-subtitle1 text-weight-bold q-mb-sm"> When established</div>

        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-6">
            <q-input v-model="establishmentDate" label="Date Established *" outlined type="date"
              :rules="[val => !!val || 'Date established is required']" />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-subtitle1 text-weight-bold q-mb-sm">Names in full of all Partners/Directors/Principals</div>

        <div v-for="(principal, index) in principals" :key="index" class="q-mb-md bg-grey-2 q-pa-md rounded-borders">
          <div class="row items-center q-mb-sm">
            <div class="text-subtitle2">Principal {{ index + 1 }}</div>
            <q-space />
            <q-btn v-if="principals.length > 1" icon="delete" flat dense color="negative" size="sm"
              @click="removePrincipal(index)" />
          </div>

          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input v-model="principal.fullName" :label="`Full Name ${index + 1} *`" outlined
                :rules="[val => !!val || 'Full name is required']" />
            </div>
            <div class="col-12 col-md-6">
              <q-input v-model="principal.qualifications" :label="`Qualifications in full ${index + 1} *`" outlined
                :rules="[val => !!val || 'Qualifications are required']" />
            </div>
          </div>

          <div class="row q-col-gutter-md q-mt-sm">
            <div class="col-12 col-md-6">
              <q-input v-model="principal.dateQualified" :label="`Date qualified ${index + 1}`" outlined type="date" />
            </div>
            <div class="col-12 col-md-6">
              <q-input v-model="principal.yearsInPractice"
                :label="`How long principal in this practice (years) ${index + 1}`" outlined type="number"
                suffix="years" />
            </div>
          </div>
        </div>

        <q-btn label="Add Principal" color="secondary" icon="person_add" @click="addPrincipal" />
      </q-card-section>
    </q-card>

    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-subtitle1 text-weight-bold q-mb-sm">Coverage for Past Work</div>

        <div class="q-mb-md">
          <div class="text-subtitle2 q-mb-sm">Is coverage required in respect of past work for any Partner/Principal who
            has
            left, retired or died?</div>
          <div>
            <q-radio v-model="pastWorkCoverageRequired" val="yes" label="Yes" class="q-mr-md" />
            <q-radio v-model="pastWorkCoverageRequired" val="no" label="No" />
          </div>
        </div>

        <div v-if="pastWorkCoverageRequired === 'yes'" class="bg-blue-1 q-pa-md rounded-borders">
          <div class="text-subtitle2 q-mb-sm">If yes, please give the following:</div>

          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input v-model="pastWorkCoverageFullName" label="Full Name *" outlined
                :rules="[val => !!val || 'Full name is required']" />
            </div>
            <div class="col-12 col-md-6">
              <q-input v-model="pastWorkCoverageQualifications" label="Qualifications *" outlined
                :rules="[val => !!val || 'Qualifications are required']" />
            </div>
          </div>

          <div class="row q-col-gutter-md q-mt-sm">
            <div class="col-12 col-md-6">
              <q-input v-model="pastWorkCoverageYearsInPractice" label="How long principal in this practice (years) *"
                outlined type="number" suffix="years" :rules="[val => val > 0 || 'Years in practice required']" />
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-subtitle1 text-weight-bold q-mb-sm">State:</div>

        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-12 col-md-6">
            <q-input v-model="staffQualifiedAccountantsLawyers" label="No. of qualified accountants/lawyers" outlined
              type="number" />
          </div>
          <div class="col-12 col-md-6">
            <q-input v-model="staffProfessionals" label="No. of Professionals" outlined type="number" />
          </div>
        </div>

        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-12 col-md-6">
            <q-input v-model="staffAdministrativePersonnel"
              label="No. of administrative personnel including clerks, typists, office boys, etc." outlined
              type="number" />
          </div>
          <div class="col-12 col-md-6">
            <q-input v-model="staffApprentices" label="No. of apprentices" outlined type="number" />
          </div>
        </div>

        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-6">
            <q-input v-model="staffTotalAnnualWages" label=" Total amount of annual wages payable (AWG)" outlined
              type="number" prefix="$" />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-subtitle1 text-weight-bold q-mb-sm">External Engagement</div>

        <div class="q-mb-md">
          <div class="text-subtitle2 q-mb-sm">Do you engage persons outside your organisation?</div>
          <div>
            <q-radio v-model="externalEngagementEngagesExternal" val="yes" label="Yes" class="q-mr-md" />
            <q-radio v-model="externalEngagementEngagesExternal" val="no" label="No" />
          </div>
        </div>

        <div v-if="externalEngagementEngagesExternal === 'yes'" class="bg-blue-1 q-pa-md rounded-borders">
          <div class="text-subtitle2 q-mb-sm">If Yes, specify the details of purpose and nature of control exercised by
            you
            over them</div>
          <q-input v-model="externalEngagementDetails" label="Details of external engagement *" outlined type="textarea"
            rows="3" :rules="[val => !!val || 'Details are required']" />
          <div class="text-caption text-grey q-mt-xs">
            Specimen contract to be enclosed
          </div>

          <div class="q-mt-md">
            <q-file v-model="externalEngagementContracts" label="Attach specimen contracts" outlined multiple
              accept=".pdf,.doc,.docx">
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-subtitle1 text-weight-bold q-mb-sm">Loss Record for 5 Years</div>

        <q-table :rows="lossRecords" :columns="lossRecordColumns" row-key="id" dense flat bordered class="bg-grey-1">
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td>{{ props.row.year }}</q-td>
              <q-td>
                <q-input v-model="props.row.cause" dense outlined type="textarea" autogrow />
              </q-td>
              <q-td>
                <q-input v-model="props.row.kindOfLoss" dense outlined />
              </q-td>
              <q-td>
                <q-input v-model="props.row.amount" dense outlined type="number" prefix="$" />
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
    </q-card>

    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-subtitle1 text-weight-bold q-mb-sm">Dismissal of Staff</div>

        <div class="q-mb-md">
          <div class="text-subtitle2 q-mb-sm">
            Have you during the past 12 months dismissed or do you contemplate dismissal of any member of staff on
            account
            of any omission, neglect, error or for like?
          </div>
          <div>
            <q-radio v-model="dismissalsHasDismissals" val="yes" label="Yes" class="q-mr-md" />
            <q-radio v-model="dismissalsHasDismissals" val="no" label="No" />
          </div>
        </div>

        <div v-if="dismissalsHasDismissals === 'yes'" class="bg-blue-1 q-pa-md rounded-borders">
          <div class="text-subtitle2 q-mb-sm">If yes, please give full details:</div>
          <q-input v-model="dismissalsDetails" label="Details of dismissals *" outlined type="textarea" rows="3"
            :rules="[val => !!val || 'Details are required']" />
        </div>
      </q-card-section>
    </q-card>

    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-subtitle1 text-weight-bold q-mb-sm">Potential Claims</div>

        <div class="q-mb-md">
          <div class="text-subtitle2 q-mb-sm">
            Are you aware of any neglect, omission or error or existence of any circumstances likely to give rise to a
            claim?
          </div>
          <div>
            <q-radio v-model="potentialClaimsHasPotentialClaims" val="yes" label="Yes" class="q-mr-md" />
            <q-radio v-model="potentialClaimsHasPotentialClaims" val="no" label="No" />
          </div>
        </div>

        <div v-if="potentialClaimsHasPotentialClaims === 'yes'" class="bg-blue-1 q-pa-md rounded-borders">
          <div class="text-subtitle2 q-mb-sm">If yes, give details:</div>
          <q-input v-model="potentialClaimsDetails" label="Details of potential claims *" outlined type="textarea"
            rows="3" :rules="[val => !!val || 'Details are required']" />
        </div>
      </q-card-section>
    </q-card>

    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-subtitle1 text-weight-bold q-mb-sm">Annual Fees</div>

        <div class="q-mb-md">
          <div class="text-subtitle2 q-mb-sm">Annual fees earned during the last five years</div>

          <q-table :rows="annualFees" :columns="annualFeesColumns" row-key="id" dense flat bordered class="bg-grey-1">
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td>{{ props.row.year }}</q-td>
                <q-td>
                  <q-input v-model="props.row.fee" dense outlined type="number" prefix="$" />
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>

        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-6">
            <q-input v-model="annualFeesCurrentYearEstimate" label="Estimated fees for the current year (AWG)" outlined
              type="number" prefix="$" />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-subtitle1 text-weight-bold q-mb-sm">Previous Insurance History</div>

        <div class="q-mb-md">
          <q-input v-model="insuranceHistoryDetails" label="Details of previous insurance coverage" outlined
            type="textarea" rows="3" />
        </div>
      </q-card-section>
    </q-card>

    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-subtitle1 text-weight-bold q-mb-sm">Insurance Limits</div>

        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-12 col-md-6">
            <q-input v-model="insuranceLimitsIndemnityLimit" label="Limits of Indemnity required (AWG) *" outlined
              type="number" prefix="$" :rules="[val => val > 0 || 'Indemnity limit is required']" />
          </div>
          <div class="col-12 col-md-6">
            <q-input v-model="insuranceLimitsVoluntaryExcess" label="Voluntary Excess (AWG)" outlined type="number"
              prefix="$" />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="bg-grey-2 q-pa-md rounded-borders q-mb-md">
          <p class="q-mb-sm">
            I/We hereby declare that the statements made by me/us in this Proposal Form are true to the best of my/our
            knowledge and belief, and I/we hereby agree that this declaration shall form the basis of the contract
            between
            me/us and THE NEW INDIA ASSURANCE COMPANY LIMITED.
          </p>
          <p class="q-mb-sm">
            I/We further agree that if any particular is filled in this proposal by any other person, such person shall
            be
            deemed as my/our agent and not the agent of the Company. I/We further declare that I/we have read and
            understood
            all particulars entered herein and I/we have signed this after verifying the same to be true and complete in
            all
            respect.
          </p>
        </div>

        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-6">
            <q-input v-model="declarationLocation" label="Dated at" outlined />
          </div>
          <div class="col-12 col-md-6">
            <q-input v-model="declarationDate" label="on" outlined type="date"
              :rules="[val => !!val || 'Date is required']" />
          </div>
        </div>

        <div class="row q-col-gutter-md q-mt-md">
          <div class="col-12">
            <q-input v-model="declarationSignature" label="Proposer's Signature *" outlined
              :rules="[val => !!val || 'Signature is required']" />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <div class="q-mt-lg text-center">
      <q-btn label="Reset Form" color="negative" icon="cleaning_services" class="q-ml-md"
        @click="showResetConfirm = true" />
    </div>
    <q-dialog v-model="showResetConfirm">
      <q-card class="reset-card">

        <q-card-section class="row items-center q-pb-none">
          <q-icon name="warning" size="40px" color="orange-7" class="q-mr-sm" />
          <div class="text-h6 text-weight-bold">Reset Formulary the Commercial proposal</div>
        </q-card-section>

        <q-card-section>
          <div class="text-body1 text-grey-8 q-mt-sm">
            Are you sure you want to reset all the form data? All the information entered will be lost.
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right" class="q-pa-md">
          <q-btn flat label="Cancel" color="grey-7" class="btn-cancel" v-close-popup />
          <q-btn unelevated label="Reset" color="negative" class="btn-confirm" @click="resetForm" v-close-popup />
        </q-card-actions>

      </q-card>
    </q-dialog>


  </div>
</template>

<script setup>
import { ref, computed, watch, defineEmits, defineExpose } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const emit = defineEmits(['validation-changed', 'form-submitted', 'close-form'])

const showResetConfirm = ref(false)
const submitting = ref(false)

const businessOperationsDetails = ref('')
const businessOperationsDocuments = ref(null)
const establishmentDate = ref('')
const principals = ref([
  {
    fullName: '',
    qualifications: '',
    dateQualified: '',
    yearsInPractice: ''
  }
])

const pastWorkCoverageRequired = ref('no')
const pastWorkCoverageFullName = ref('')
const pastWorkCoverageQualifications = ref('')
const pastWorkCoverageYearsInPractice = ref('')

const staffQualifiedAccountantsLawyers = ref('')
const staffProfessionals = ref('')
const staffAdministrativePersonnel = ref('')
const staffApprentices = ref('')
const staffTotalAnnualWages = ref('')

const externalEngagementEngagesExternal = ref('no')
const externalEngagementDetails = ref('')
const externalEngagementContracts = ref(null)

const lossRecords = ref([
  { id: 1, year: 'Year 1', amount: '', kindOfLoss: '', cause: '' },
  { id: 2, year: 'Year 2', amount: '', kindOfLoss: '', cause: '' },
  { id: 3, year: 'Year 3', amount: '', kindOfLoss: '', cause: '' },
  { id: 4, year: 'Year 4', amount: '', kindOfLoss: '', cause: '' },
  { id: 5, year: 'Year 5', amount: '', kindOfLoss: '', cause: '' }
])

const lossRecordColumns = [
  { name: 'year', label: 'Year', field: 'year', align: 'left' },
  { name: 'cause', label: 'Cause', field: 'cause', align: 'center' },
  { name: 'kindOfLoss', label: 'Kind of Loss', field: 'kindOfLoss', align: 'center' },
  { name: 'amount', label: 'Amount of Loss (AWG)', field: 'amount', align: 'center' },
]

const dismissalsHasDismissals = ref('no')
const dismissalsDetails = ref('')

const potentialClaimsHasPotentialClaims = ref('no')
const potentialClaimsDetails = ref('')

const annualFees = ref([
  { id: 1, year: 'Year 1', fee: '' },
  { id: 2, year: 'Year 2', fee: '' },
  { id: 3, year: 'Year 3', fee: '' },
  { id: 4, year: 'Year 4', fee: '' },
  { id: 5, year: 'Year 5', fee: '' }
])

const annualFeesColumns = [
  { name: 'year', label: 'Year', field: 'year', align: 'left' },
  { name: 'fee', label: 'Fee (AWG)', field: 'fee', align: 'center' }
]

const annualFeesCurrentYearEstimate = ref('')

const insuranceHistoryDetails = ref('')

const insuranceLimitsIndemnityLimit = ref('')
const insuranceLimitsVoluntaryExcess = ref('')

const declarationLocation = ref('Aruba')
const declarationDate = ref(new Date().toISOString().split('T')[0])
const declarationSignature = ref('')

const isFormValid = computed(() => {
  const hasBusinessDetails = !!businessOperationsDetails.value
  const hasEstablishmentDate = !!establishmentDate.value
  const hasAtLeastOnePrincipal = principals.value.some(p => p.fullName && p.qualifications)
  const hasSignature = !!declarationSignature.value
  const hasIndemnityLimit = !!insuranceLimitsIndemnityLimit.value && insuranceLimitsIndemnityLimit.value > 0

  const pastWorkValid = pastWorkCoverageRequired.value === 'no' ||
    (pastWorkCoverageRequired.value === 'yes' &&
      pastWorkCoverageFullName.value &&
      pastWorkCoverageQualifications.value &&
      pastWorkCoverageYearsInPractice.value)

  const externalEngagementValid = externalEngagementEngagesExternal.value === 'no' ||
    (externalEngagementEngagesExternal.value === 'yes' && externalEngagementDetails.value)

  const dismissalsValid = dismissalsHasDismissals.value === 'no' ||
    (dismissalsHasDismissals.value === 'yes' && dismissalsDetails.value)

  const potentialClaimsValid = potentialClaimsHasPotentialClaims.value === 'no' ||
    (potentialClaimsHasPotentialClaims.value === 'yes' && potentialClaimsDetails.value)

  return hasBusinessDetails &&
    hasEstablishmentDate &&
    hasAtLeastOnePrincipal &&
    hasSignature &&
    hasIndemnityLimit &&
    pastWorkValid &&
    externalEngagementValid &&
    dismissalsValid &&
    potentialClaimsValid
})

const addPrincipal = () => {
  principals.value.push({
    fullName: '',
    qualifications: '',
    dateQualified: '',
    yearsInPractice: ''
  })
}

const removePrincipal = (index) => {
  if (principals.value.length > 1) {
    principals.value.splice(index, 1)
  }
}

const submitForm = async () => {
  if (!isFormValid.value) {
    $q.notify({
      type: 'warning',
      message: 'Please fill in all required fields before submitting.',
      position: 'top',
      timeout: 2000
    })
    return
  }

  submitting.value = true

  try {
    await new Promise(resolve => setTimeout(resolve, 1500))

    const formData = {
      businessOperationsDetails: businessOperationsDetails.value,
      businessOperationsDocuments: businessOperationsDocuments.value,
      establishmentDate: establishmentDate.value,
      principals: [...principals.value],
      pastWorkCoverageRequired: pastWorkCoverageRequired.value,
      pastWorkCoverageFullName: pastWorkCoverageFullName.value,
      pastWorkCoverageQualifications: pastWorkCoverageQualifications.value,
      pastWorkCoverageYearsInPractice: pastWorkCoverageYearsInPractice.value,
      staffQualifiedAccountantsLawyers: staffQualifiedAccountantsLawyers.value,
      staffProfessionals: staffProfessionals.value,
      staffAdministrativePersonnel: staffAdministrativePersonnel.value,
      staffApprentices: staffApprentices.value,
      staffTotalAnnualWages: staffTotalAnnualWages.value,
      externalEngagementEngagesExternal: externalEngagementEngagesExternal.value,
      externalEngagementDetails: externalEngagementDetails.value,
      externalEngagementContracts: externalEngagementContracts.value,
      lossRecords: [...lossRecords.value],
      dismissalsHasDismissals: dismissalsHasDismissals.value,
      dismissalsDetails: dismissalsDetails.value,
      potentialClaimsHasPotentialClaims: potentialClaimsHasPotentialClaims.value,
      potentialClaimsDetails: potentialClaimsDetails.value,
      annualFees: [...annualFees.value],
      annualFeesCurrentYearEstimate: annualFeesCurrentYearEstimate.value,
      insuranceHistoryDetails: insuranceHistoryDetails.value,
      insuranceLimitsIndemnityLimit: insuranceLimitsIndemnityLimit.value,
      insuranceLimitsVoluntaryExcess: insuranceLimitsVoluntaryExcess.value,
      declarationLocation: declarationLocation.value,
      declarationDate: declarationDate.value,
      declarationSignature: declarationSignature.value,
      timestamp: new Date().toISOString(),
      formType: 'ProfessionalIndemnity'
    }

    $q.notify({
      type: 'positive',
      message: 'Professional Indemnity proposal submitted successfully!',
      position: 'top',
      timeout: 2000
    })

    emit('form-submitted', formData)

  } catch (error) {
    console.error(error)
    $q.notify({
      type: 'negative',
      message: 'Error submitting proposal. Please try again.',
      position: 'top'
    })
  } finally {
    submitting.value = false
  }
}

const resetForm = () => {
  showResetConfirm.value = false

  businessOperationsDetails.value = ''
  businessOperationsDocuments.value = null
  establishmentDate.value = ''
  principals.value = [{
    fullName: '',
    qualifications: '',
    dateQualified: '',
    yearsInPractice: ''
  }]
  pastWorkCoverageRequired.value = 'no'
  pastWorkCoverageFullName.value = ''
  pastWorkCoverageQualifications.value = ''
  pastWorkCoverageYearsInPractice.value = ''
  staffQualifiedAccountantsLawyers.value = ''
  staffProfessionals.value = ''
  staffAdministrativePersonnel.value = ''
  staffApprentices.value = ''
  staffTotalAnnualWages.value = ''
  externalEngagementEngagesExternal.value = 'no'
  externalEngagementDetails.value = ''
  externalEngagementContracts.value = null
  lossRecords.value = [
    { id: 1, year: 'Year 1', amount: '', kindOfLoss: '', cause: '' },
    { id: 2, year: 'Year 2', amount: '', kindOfLoss: '', cause: '' },
    { id: 3, year: 'Year 3', amount: '', kindOfLoss: '', cause: '' },
    { id: 4, year: 'Year 4', amount: '', kindOfLoss: '', cause: '' },
    { id: 5, year: 'Year 5', amount: '', kindOfLoss: '', cause: '' }
  ]
  dismissalsHasDismissals.value = 'no'
  dismissalsDetails.value = ''
  potentialClaimsHasPotentialClaims.value = 'no'
  potentialClaimsDetails.value = ''
  annualFees.value = [
    { id: 1, year: 'Year 1', fee: '' },
    { id: 2, year: 'Year 2', fee: '' },
    { id: 3, year: 'Year 3', fee: '' },
    { id: 4, year: 'Year 4', fee: '' },
    { id: 5, year: 'Year 5', fee: '' }
  ]
  annualFeesCurrentYearEstimate.value = ''
  insuranceHistoryDetails.value = ''
  insuranceLimitsIndemnityLimit.value = ''
  insuranceLimitsVoluntaryExcess.value = ''
  declarationLocation.value = 'Aruba'
  declarationDate.value = new Date().toISOString().split('T')[0]
  declarationSignature.value = ''

  $q.notify({
    type: 'info',
    message: 'Form has been reset',
    position: 'top',
    timeout: 1000
  })
}

const loadDraft = () => {
  const draft = localStorage.getItem('pi_proposal_draft')
  if (draft) {
    try {
      const draftData = JSON.parse(draft)

      if (draftData.businessOperations) {
        if (draftData.businessOperations.details !== undefined) businessOperationsDetails.value = draftData.businessOperations.details
        if (draftData.businessOperations.documents !== undefined) businessOperationsDocuments.value = draftData.businessOperations.documents
        if (draftData.establishment && draftData.establishment.date !== undefined) establishmentDate.value = draftData.establishment.date
        if (draftData.principals) principals.value = [...draftData.principals]
        if (draftData.pastWorkCoverage) {
          if (draftData.pastWorkCoverage.required !== undefined) pastWorkCoverageRequired.value = draftData.pastWorkCoverage.required
          if (draftData.pastWorkCoverage.fullName !== undefined) pastWorkCoverageFullName.value = draftData.pastWorkCoverage.fullName
          if (draftData.pastWorkCoverage.qualifications !== undefined) pastWorkCoverageQualifications.value = draftData.pastWorkCoverage.qualifications
          if (draftData.pastWorkCoverage.yearsInPractice !== undefined) pastWorkCoverageYearsInPractice.value = draftData.pastWorkCoverage.yearsInPractice
        }
        if (draftData.staff) {
          if (draftData.staff.qualifiedAccountantsLawyers !== undefined) staffQualifiedAccountantsLawyers.value = draftData.staff.qualifiedAccountantsLawyers
          if (draftData.staff.professionals !== undefined) staffProfessionals.value = draftData.staff.professionals
          if (draftData.staff.administrativePersonnel !== undefined) staffAdministrativePersonnel.value = draftData.staff.administrativePersonnel
          if (draftData.staff.apprentices !== undefined) staffApprentices.value = draftData.staff.apprentices
          if (draftData.staff.totalAnnualWages !== undefined) staffTotalAnnualWages.value = draftData.staff.totalAnnualWages
        }
        if (draftData.externalEngagement) {
          if (draftData.externalEngagement.engagesExternal !== undefined) externalEngagementEngagesExternal.value = draftData.externalEngagement.engagesExternal
          if (draftData.externalEngagement.details !== undefined) externalEngagementDetails.value = draftData.externalEngagement.details
          if (draftData.externalEngagement.contracts !== undefined) externalEngagementContracts.value = draftData.externalEngagement.contracts
        }
        if (draftData.lossRecords) lossRecords.value = [...draftData.lossRecords]
        if (draftData.dismissals) {
          if (draftData.dismissals.hasDismissals !== undefined) dismissalsHasDismissals.value = draftData.dismissals.hasDismissals
          if (draftData.dismissals.details !== undefined) dismissalsDetails.value = draftData.dismissals.details
        }
        if (draftData.potentialClaims) {
          if (draftData.potentialClaims.hasPotentialClaims !== undefined) potentialClaimsHasPotentialClaims.value = draftData.potentialClaims.hasPotentialClaims
          if (draftData.potentialClaims.details !== undefined) potentialClaimsDetails.value = draftData.potentialClaims.details
        }
        if (draftData.annualFees) annualFees.value = [...draftData.annualFees]
        if (draftData.annualFeesCurrentYearEstimate !== undefined) annualFeesCurrentYearEstimate.value = draftData.annualFeesCurrentYearEstimate
        if (draftData.insuranceHistory && draftData.insuranceHistory.details !== undefined) insuranceHistoryDetails.value = draftData.insuranceHistory.details
        if (draftData.insuranceLimits) {
          if (draftData.insuranceLimits.indemnityLimit !== undefined) insuranceLimitsIndemnityLimit.value = draftData.insuranceLimits.indemnityLimit
          if (draftData.insuranceLimits.voluntaryExcess !== undefined) insuranceLimitsVoluntaryExcess.value = draftData.insuranceLimits.voluntaryExcess
        }
        if (draftData.declaration) {
          if (draftData.declaration.location !== undefined) declarationLocation.value = draftData.declaration.location
          if (draftData.declaration.date !== undefined) declarationDate.value = draftData.declaration.date
          if (draftData.declaration.signature !== undefined) declarationSignature.value = draftData.declaration.signature
        }
      } else {

        if (draftData.businessOperationsDetails !== undefined) businessOperationsDetails.value = draftData.businessOperationsDetails
        if (draftData.establishmentDate !== undefined) establishmentDate.value = draftData.establishmentDate

      }
    } catch (error) {
      console.error('Error loading draft:', error)
    }
  }
}

watch(isFormValid, (newVal) => {
  emit('validation-changed', newVal)
}, { immediate: true })

loadDraft()

defineExpose({
  validate: () => isFormValid.value,
  getFormData: () => ({
    businessOperationsDetails: businessOperationsDetails.value,
    businessOperationsDocuments: businessOperationsDocuments.value,
    establishmentDate: establishmentDate.value,
    principals: [...principals.value],
    pastWorkCoverageRequired: pastWorkCoverageRequired.value,
    pastWorkCoverageFullName: pastWorkCoverageFullName.value,
    pastWorkCoverageQualifications: pastWorkCoverageQualifications.value,
    pastWorkCoverageYearsInPractice: pastWorkCoverageYearsInPractice.value,
    staffQualifiedAccountantsLawyers: staffQualifiedAccountantsLawyers.value,
    staffProfessionals: staffProfessionals.value,
    staffAdministrativePersonnel: staffAdministrativePersonnel.value,
    staffApprentices: staffApprentices.value,
    staffTotalAnnualWages: staffTotalAnnualWages.value,
    externalEngagementEngagesExternal: externalEngagementEngagesExternal.value,
    externalEngagementDetails: externalEngagementDetails.value,
    externalEngagementContracts: externalEngagementContracts.value,
    lossRecords: [...lossRecords.value],
    dismissalsHasDismissals: dismissalsHasDismissals.value,
    dismissalsDetails: dismissalsDetails.value,
    potentialClaimsHasPotentialClaims: potentialClaimsHasPotentialClaims.value,
    potentialClaimsDetails: potentialClaimsDetails.value,
    annualFees: [...annualFees.value],
    annualFeesCurrentYearEstimate: annualFeesCurrentYearEstimate.value,
    insuranceHistoryDetails: insuranceHistoryDetails.value,
    insuranceLimitsIndemnityLimit: insuranceLimitsIndemnityLimit.value,
    insuranceLimitsVoluntaryExcess: insuranceLimitsVoluntaryExcess.value,
    declarationLocation: declarationLocation.value,
    declarationDate: declarationDate.value,
    declarationSignature: declarationSignature.value,
    timestamp: new Date().toISOString(),
    formType: 'ProfessionalIndemnity'
  }),
  resetForm: resetForm,
  submitForm: submitForm,
  isFormValid: isFormValid.value,
  formData: {
    businessOperationsDetails,
    businessOperationsDocuments,
    establishmentDate,
    principals,
    pastWorkCoverageRequired,
    pastWorkCoverageFullName,
    pastWorkCoverageQualifications,
    pastWorkCoverageYearsInPractice,
    staffQualifiedAccountantsLawyers,
    staffProfessionals,
    staffAdministrativePersonnel,
    staffApprentices,
    staffTotalAnnualWages,
    externalEngagementEngagesExternal,
    externalEngagementDetails,
    externalEngagementContracts,
    lossRecords,
    dismissalsHasDismissals,
    dismissalsDetails,
    potentialClaimsHasPotentialClaims,
    potentialClaimsDetails,
    annualFees,
    annualFeesCurrentYearEstimate,
    insuranceHistoryDetails,
    insuranceLimitsIndemnityLimit,
    insuranceLimitsVoluntaryExcess,
    declarationLocation,
    declarationDate,
    declarationSignature
  }
})
</script>

<style scoped>
.professional-indemnity-form {
  max-width: 1200px;
  margin: 0 auto;
}

.rounded-borders {
  border-radius: 8px;
}

.bg-blue-1 {
  background-color: rgba(187, 222, 251, 0.3);
}

.bg-grey-1 {
  background-color: rgba(250, 250, 250, 0.8);
}

.bg-grey-2 {
  background-color: rgba(245, 245, 245, 0.8);
}

.q-card {
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.reset-card {
  width: 420px;
  border-radius: 20px;
  box-shadow: 0px 8px 25px rgba(0, 0, 0, 0.18);
  padding: 10px;
  animation: popup 0.22s ease-out;
}

.btn-cancel {
  font-weight: 500;
}

.btn-confirm {
  font-weight: 600;
  border-radius: 10px;
  padding: 6px 18px;
}

@keyframes popup {
  from {
    opacity: 0;
    transform: scale(0.92);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>