<template>
  <div>
    <div class="text-h5 text-primary  text-center q-mb-md">
      PROPOSAL FORM FOR DOCTORS’ AND MEDICAL
      PRACTITIONERS’ PROFESSIONAL IDEMNITY
    </div>
    <div class=" q-mb-xl ">
      <p>This proposal must be signed. All questions must be answered. The completion and signature of this
        proposal does not bind the proposer or Insurer to compete a contract of Insurance </p>

      <p>The Company does not assume any liabilities until the Proposal has been accepted and premium paid.
      </p>
    </div>
    <q-form ref="formRef" @submit="handleSubmit" class="q-gutter-lg">
      <q-card flat bordered>
        <q-card-section>
          <div class="text-subtitle1 text-weight-bold q-mb-sm"> General Information</div>
        </q-card-section>
        <q-card-section>
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-input v-model="formData.section1.name" label="(i) Name of Proposer *" outlined dense
                :rules="[val => !!val || 'Name is required']" />
            </div>
            <div class="col-12">
              <q-input v-model="formData.section1.residentialAddress" label="(ii) Residential Address *" outlined dense
                type="textarea" rows="2" :rules="[val => !!val || 'Residential address is required']" />
            </div>
            <div class="col-12">
              <q-input v-model="formData.section1.clinicAddress" label="(iii) Clinic Address *" outlined dense
                type="textarea" rows="2" :rules="[val => !!val || 'Clinic address is required']" />
            </div>
          </div>
        </q-card-section>
      </q-card>

      <q-card flat bordered>
        <q-card-section>
          <div class="text-subtitle1 text-weight-bold q-mb-sm"> Date from which Company has continually been in business
          </div>
        </q-card-section>
        <q-card-section>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input v-model="formData.section2.businessStartDate"
                label="Date from which Company has continually been in business *" outlined dense type="date"
                :rules="[val => !!val || 'Business start date is required']" />
            </div>
            <div class="col-12">
              <q-input v-model="formData.section2.qualifications"
                label="Professional Qualifications and the year of such qualifications *" outlined dense type="textarea"
                rows="2" hint="e.g., MD (2005), MBBS (2000), etc."
                :rules="[val => !!val || 'Qualifications are required']" />
            </div>
            <div class="col-12 col-md-6">
              <div class="text-subtitle2 q-mb-sm"> In which branch of medicines *</div>
              <q-radio v-model="formData.section2.branchOfMedicine" val="Allopathy" label="Allopathy" />
              <q-radio v-model="formData.section2.branchOfMedicine" val="Homeopathy" label="Homeopathy" />
              <q-radio v-model="formData.section2.branchOfMedicine" val="Ayurvedic" label="Ayurvedic" />
              <div class="q-mt-sm">
                <q-radio v-model="formData.section2.branchOfMedicine" val="Other" label="Other" />
                <q-input v-if="formData.section2.branchOfMedicine === 'Other'" v-model="formData.section2.otherBranch"
                  label="Please specify other branch" outlined dense class="q-mt-sm" />
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>

      <q-card flat bordered>
        <q-card-section>
          <div class="text-subtitle1 text-weight-bold q-mb-sm">Medical Registration No.</div>
        </q-card-section>
        <q-card-section>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input v-model="formData.section3.registrationNumber" label="Medical Registration No. *" outlined dense
                :rules="[val => !!val || 'Registration number is required']" />
            </div>
            <div class="col-12 col-md-3">
              <q-input v-model="formData.section3.yearOfRegistration" label="(i) Year of Registration *" outlined dense
                type="number" :rules="[val => !!val || 'Year of registration is required']" />
            </div>
            <div class="col-12 col-md-3">
              <q-input v-model="formData.section3.yearsPracticing"
                label="(ii) How long have you been practicing (years) *" outlined dense type="number"
                :rules="[val => !!val || 'Years practicing is required']" />
            </div>
          </div>
        </q-card-section>
      </q-card>

      <q-card flat bordered>
        <q-card-section>
          <div class="text-subtitle1 text-weight-bold q-mb-sm">Are you a member of any Medical Association/Council?
          </div>
        </q-card-section>
        <q-card-section>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-2">
              <div class="q-mb-sm">Yes/No *</div>
              <q-radio v-model="formData.section4.isMember" val="Yes" label="Yes" />
              <q-radio v-model="formData.section4.isMember" val="No" label="No" />
            </div>
            <div class="col-12 col-md-10">
              <q-input v-if="formData.section4.isMember === 'Yes'" v-model="formData.section4.associationDetails"
                label="If so, please state Name and Address of such Association/Council with Membership No." outlined
                dense type="textarea" rows="3"
                :rules="[val => formData.section4.isMember !== 'Yes' || !!val || 'Association details required']" />
            </div>
          </div>
        </q-card-section>
      </q-card>

      <q-card flat bordered>
        <q-card-section>
          <div class="text-subtitle1 text-weight-bold q-mb-sm"> Are you a: *</div>
        </q-card-section>
        <q-card-section>
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-radio v-model="formData.section5.practitionerType" val="General Practitioner/General Physician"
                label="a) General Practitioner/General Physician" />
              <q-radio v-model="formData.section5.practitionerType" val="Pathologist/Radiologist"
                label="b) Pathologist/Radiologist" />


              <q-radio v-model="formData.section5.practitionerType" val="Consulting Physician"
                label="c) Consulting Physician" />
              <q-radio v-model="formData.section5.practitionerType" val="Anesthetist/Plastic Surgeon"
                label="d) Anesthetist/Plastic Surgeon" />
            </div>
            <div class="col-12 q-mt-md">
              <q-input
                v-if="formData.section5.practitionerType && !formData.section5.practitionerType.includes('General')"
                v-model="formData.section5.specialization"
                label="Note: If Specialist, please specify your line of specialization." outlined dense type="textarea"
                rows="2" />
            </div>
          </div>
        </q-card-section>
      </q-card>

      <q-card flat bordered>
        <q-card-section>
          <div class="text-subtitle1 text-weight-bold q-mb-sm">Facilities</div>
        </q-card-section>
        <q-card-section>
          <!-- 6a -->
          <div class="q-mb-md">
            <q-input v-model="formData.section6.facilitiesList"
              label="Specify facilities such as dispensing facility, X-ray radiation therapy, scanning ECG, Sonography, MRI etc. available/operated by you or under your control."
              outlined dense type="textarea" rows="3" />
          </div>

          <div class="q-mb-md">
            <div class="text-subtitle2 q-mb-sm">Are these facilities being maintained through regular service
              contracts with the manufacturers/specialized serviced Agencies? *</div>
            <q-radio v-model="formData.section6.serviceContracts" val="Yes" label="Yes" />
            <q-radio v-model="formData.section6.serviceContracts" val="No" label="No" />
          </div>

          <div class="q-mb-md">
            <q-input v-model="formData.section6.employeeDetails"
              label="c) If these facilities are operated by employees please state their i) names ii) technical qualification iii) experience and iv) name of the facility operated (please use separate sheet)"
              outlined dense type="textarea" rows="3" />
          </div>

          <div class="q-mb-md">
            <div class="text-subtitle2 q-mb-sm"> Please indicate whether you wish to extend the policy to cover, out
              of the above list, personnel who are not qualified to operate the facility mentioned against their names.
            </div>
            <q-checkbox v-model="formData.section6.extendToUnqualified"
              label="Yes, extend policy to cover unqualified personnel" />
          </div>
        </q-card-section>
      </q-card>

      <q-card flat bordered>
        <q-card-section>
          <div class="text-subtitle1 text-weight-bold q-mb-sm"> Employees</div>
        </q-card-section>
        <q-card-section>
          <q-input v-model="formData.section7.employeesDetails"
            label="Specify No. of employees, their job specifications, their experience and nature of your supervision."
            outlined dense type="textarea" rows="3" />
        </q-card-section>
      </q-card>

      <q-card flat bordered>
        <q-card-section>
          <div class="text-subtitle1 text-weight-bold q-mb-sm">Hospital/Nursing Home/Clinics Affiliation</div>
        </q-card-section>
        <q-card-section>
          <div class="q-mb-md">
            <div class="text-subtitle2 q-mb-sm">Are you attached to/or attending as a visiting physician/surgeon in
              any Hospital/Nursing Home/Clinics etc? *</div>
            <q-radio v-model="formData.section8.attachedToHospital" val="Yes" label="Yes"
              @update:model-value="handleHospitalAffiliationChange" />
            <q-radio v-model="formData.section8.attachedToHospital" val="No" label="No"
              @update:model-value="handleHospitalAffiliationChange" />
          </div>

          <div v-if="formData.section8.attachedToHospital === 'Yes'" class="q-mb-md">
            <q-input v-model="formData.section8.hospitalDetails" label="If yes, please give details:" outlined dense
              type="textarea" rows="2"
              :rules="[val => formData.section8.attachedToHospital !== 'Yes' || !!val || 'Hospital details required']" />
          </div>

          <div v-if="formData.section8.attachedToHospital === 'Yes'" class="q-mb-md">
            <div class="text-subtitle2 q-mb-sm">Are they covered under a Medical Establishment-Errors & Omissions
              policy? *</div>
            <q-radio v-model="formData.section8.coveredByPolicy" val="Yes" label="Yes" />
            <q-radio v-model="formData.section8.coveredByPolicy" val="No" label="No" />
          </div>
        </q-card-section>
      </q-card>

      <q-card flat bordered>
        <q-card-section>
          <div class="text-subtitle1 text-weight-bold q-mb-sm">Average Number of Patients</div>
        </q-card-section>
        <q-card-section>
          <q-input v-model="formData.section9.averagePatients"
            label="State the average number of patients you are attending per day *" outlined dense type="number"
            :rules="[val => !!val || 'Average patients per day is required']" />
        </q-card-section>
      </q-card>

      <q-card flat bordered>
        <q-card-section>
          <div class="text-subtitle1 text-weight-bold q-mb-sm">Claim History</div>
        </q-card-section>
        <q-card-section>
          <div class="text-subtitle2 q-mb-sm">Have any claims been made upon you or legal proceedings instituted or
            likely to be instituted against you by patients in respect of your treatment etc? *</div>
          <q-radio v-model="formData.section10.claimsMade" val="Yes" label="Yes"
            @update:model-value="handleClaimsChange" />
          <q-radio v-model="formData.section10.claimsMade" val="No" label="No"
            @update:model-value="handleClaimsChange" />

          <div v-if="formData.section10.claimsMade === 'Yes'" class="q-mt-md">
            <q-input v-model="formData.section10.claimsDetails" label="If so, please give details:" outlined dense
              type="textarea" rows="3"
              :rules="[val => formData.section10.claimsMade !== 'Yes' || !!val || 'Claim details required']" />
          </div>
        </q-card-section>
      </q-card>

      <q-card flat bordered>
        <q-card-section>
          <div class="text-subtitle1 text-weight-bold q-mb-sm">Previous Insurance</div>
        </q-card-section>
        <q-card-section>
          <div class="text-subtitle2 q-mb-sm">Have you been previously insured for the subject risk? *</div>
          <q-radio v-model="formData.section11.previouslyInsured" val="Yes" label="Yes"
            @update:model-value="handlePreviousInsuranceChange" />
          <q-radio v-model="formData.section11.previouslyInsured" val="No" label="No"
            @update:model-value="handlePreviousInsuranceChange" />

          <div v-if="formData.section11.previouslyInsured === 'Yes'" class="q-mt-md">
            <q-input v-model="formData.section11.previousInsuranceDetails" label="If so, give full particulars:"
              outlined dense type="textarea" rows="3"
              :rules="[val => formData.section11.previouslyInsured !== 'Yes' || !!val || 'Previous insurance details required']" />
          </div>
        </q-card-section>
      </q-card>

      <q-card flat bordered>
        <q-card-section>
          <div class="text-subtitle1 text-weight-bold q-mb-sm">Insurance Company History</div>
        </q-card-section>
        <q-card-section>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <div class="text-subtitle2 q-mb-sm">Declined your proposal</div>
              <q-radio v-model="formData.section12.declinedProposal" val="Yes" label="Yes" />
              <q-radio v-model="formData.section12.declinedProposal" val="No" label="No" />
            </div>
            <div class="col-12 col-md-6">
              <div class="text-subtitle2 q-mb-sm">Required an increased premium</div>
              <q-radio v-model="formData.section12.increasedPremium" val="Yes" label="Yes" />
              <q-radio v-model="formData.section12.increasedPremium" val="No" label="No" />
            </div>
            <div class="col-12 col-md-6">
              <div class="text-subtitle2 q-mb-sm">Refused to renew your policy</div>
              <q-radio v-model="formData.section12.refusedRenewal" val="Yes" label="Yes" />
              <q-radio v-model="formData.section12.refusedRenewal" val="No" label="No" />
            </div>
            <div class="col-12 col-md-6">
              <div class="text-subtitle2 q-mb-sm">Cancelled such a policy</div>
              <q-radio v-model="formData.section12.cancelledPolicy" val="Yes" label="Yes" />
              <q-radio v-model="formData.section12.cancelledPolicy" val="No" label="No" />
            </div>
          </div>
        </q-card-section>
      </q-card>

      <q-card flat bordered>
        <q-card-section>
          <div class="text-subtitle1 text-weight-bold q-mb-sm">Limit of Indemnity required</div>
        </q-card-section>
        <q-card-section>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input v-model="formData.section13.oneActLimit" label="For Any one act (AWG) *" outlined dense
                type="number" prefix="AWG" :rules="[val => !!val || 'Limit for any one act is required']" />
            </div>
            <div class="col-12 col-md-6">
              <q-input v-model="formData.section13.oneYearLimit" label="Any one year Limit (AWG) *" outlined dense
                type="number" prefix="AWG" :rules="[val => !!val || 'Yearly limit is required']" />
            </div>
          </div>
        </q-card-section>
      </q-card>

      <q-card flat bordered>
        <q-card-section>
          <div class="text-subtitle1 text-weight-bold q-mb-sm"> Period of Insurance</div>
        </q-card-section>
        <q-card-section>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input v-model="formData.section14.periodFrom" label="From *" outlined dense type="date"
                :rules="[val => !!val || 'Start date is required']" />
            </div>
            <div class="col-12 col-md-6">
              <q-input v-model="formData.section14.periodTo" label="To *" outlined dense type="date"
                :rules="[val => !!val || 'End date is required']" />
            </div>
          </div>
        </q-card-section>
      </q-card>

      <q-card flat bordered>
        <q-card-section class="bg-grey-2">
          <div class="text-body2 text-justify q-mb-md">
            <p>
              <strong>The undersigned authorized officer of the COMPANY declares, on behalf of the COMPANY for
                himself/herself and after enquiry of and with the express consent of each of the individuals proposed to
                be covered under this insurance that, to the best of his/her knowledge and belief the statements and
                declarations contained herein (and any material submitted herewith) are true.</strong>
            </p>
            <p>
              Signing of the proposal form does not bind the undersigned to complete this insurance, but it is agreed
              that this proposal form together with any material submitted herewith (which shall be retained on file
              by the insurer and shall be deemed to be attached hereto) shall be the basis of a contract should a
              policy be issued and shall be deemed to be attached to and form part of the policy.
            </p>
          </div>

          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-4">
              <q-input v-model="formData.declaration.date" label="Date *" outlined dense type="date"
                :rules="[val => !!val || 'Date is required']" />
            </div>
            <div class="col-12 col-md-4">
              <q-input v-model="formData.declaration.signature" label="Signature *" outlined dense
                :rules="[val => !!val || 'Signature is required']" />
            </div>
            <div class="col-12 col-md-4">
              <q-input v-model="formData.declaration.name" label="Name *" outlined dense
                :rules="[val => !!val || 'Name is required']" />
            </div>
            <div class="col-12">
              <q-input v-model="formData.declaration.capacity" label="Capacity *" outlined dense
                hint="e.g., Owner, Managing Director, Principal Doctor"
                :rules="[val => !!val || 'Capacity is required']" />
            </div>
          </div>
        </q-card-section>
      </q-card>
      
    </q-form>
  </div>
  <FormResetButton 
    class="q-mt-lg text-center"
      :resetFunction="handleFormReset"
      label="Reset all"
      color="negative"
      icon="cleaning_services"
      :btnClass="'q-ml-md'"
      :title="'Reset Formulary the Professional Indemnity'"
      :message="'Are you sure you want to reset all the form data? All the information entered will be lost.'"
      :notificationMessage="'Professional Indemnity form successfully restarted'"
    />
  
</template>

<script setup>
import { ref, reactive, computed, watch, defineEmits, defineExpose, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import FormResetButton from '/src/components/FormResetButton.vue' 


const emit = defineEmits(['close-form', 'submit-form', 'validation-changed', 'form-submitted']) 
const $q = useQuasar()
const formRef = ref(null)
const submitting = ref(false)

const formData = reactive({
  section1: {
    name: '',
    residentialAddress: '',
    clinicAddress: ''
  },
  section2: {
    businessStartDate: '',
    qualifications: '',
    branchOfMedicine: 'Allopathy',
    otherBranch: ''
  },
  section3: {
    registrationNumber: '',
    yearOfRegistration: '',
    yearsPracticing: ''
  },
  section4: {
    isMember: 'No',
    associationDetails: ''
  },
  section5: {
    practitionerType: '',
    specialization: ''
  },
  section6: {
    facilitiesList: '',
    serviceContracts: 'No',
    employeeDetails: '',
    extendToUnqualified: false
  },
  section7: {
    employeesDetails: ''
  },
  section8: {
    attachedToHospital: 'No',
    hospitalDetails: '',
    coveredByPolicy: 'No'
  },
  section9: {
    averagePatients: ''
  },
  section10: {
    claimsMade: 'No',
    claimsDetails: ''
  },
  section11: {
    previouslyInsured: 'No',
    previousInsuranceDetails: ''
  },
  section12: {
    declinedProposal: 'No',
    increasedPremium: 'No',
    refusedRenewal: 'No',
    cancelledPolicy: 'No'
  },
  section13: {
    oneActLimit: '',
    oneYearLimit: ''
  },
  section14: {
    periodFrom: '',
    periodTo: ''
  },
  declaration: {
    date: new Date().toISOString().split('T')[0],
    signature: '',
    name: '',
    capacity: ''
  }
})

const isFormValid = computed(() => {
  const section1Valid = !!formData.section1.name &&
    !!formData.section1.residentialAddress &&
    !!formData.section1.clinicAddress

  const section2Valid = !!formData.section2.businessStartDate &&
    !!formData.section2.qualifications

  const section3Valid = !!formData.section3.registrationNumber &&
    !!formData.section3.yearOfRegistration &&
    !!formData.section3.yearsPracticing

  const section4Valid = formData.section4.isMember !== 'Yes' ||
    !!formData.section4.associationDetails

  const section5Valid = !!formData.section5.practitionerType

  const section6Valid = true 

  const section7Valid = true 

  const section8Valid = formData.section8.attachedToHospital !== 'Yes' ||
    !!formData.section8.hospitalDetails

  const section9Valid = !!formData.section9.averagePatients

  const section10Valid = formData.section10.claimsMade !== 'Yes' ||
    !!formData.section10.claimsDetails

  const section11Valid = formData.section11.previouslyInsured !== 'Yes' ||
    !!formData.section11.previousInsuranceDetails

  const section12Valid = true 

  const section13Valid = !!formData.section13.oneActLimit &&
    !!formData.section13.oneYearLimit

  const section14Valid = !!formData.section14.periodFrom &&
    !!formData.section14.periodTo

  const declarationValid = !!formData.declaration.date &&
    !!formData.declaration.signature &&
    !!formData.declaration.name &&
    !!formData.declaration.capacity

  return section1Valid && section2Valid && section3Valid && section4Valid &&
    section5Valid && section6Valid && section7Valid && section8Valid &&
    section9Valid && section10Valid && section11Valid && section12Valid &&
    section13Valid && section14Valid && declarationValid
})

watch(isFormValid, (newVal) => {
  emit('validation-changed', newVal)
}, { immediate: true })

const validateForm = async () => {
  if (formRef.value) {
    return await formRef.value.validate()
  }
  return isFormValid.value
}

const handleSubmit = async () => {
  if (formRef.value) {
    const isValid = await formRef.value.validate()

    if (isValid) {
      submitting.value = true

      setTimeout(() => {
        submitting.value = false

        const submissionData = {
          ...formData,
          timestamp: new Date().toISOString(),
          formType: 'ProfessionalIndemnityDoctors'
        }

        emit('submit-form', submissionData)
        emit('form-submitted', submissionData)

        $q.notify({
          type: 'positive',
          message: 'Professional Indemnity proposal submitted successfully!',
          position: 'top',
          timeout: 3000
        })

        emit('close-form')
      }, 1500)
    } else {
      $q.notify({
        type: 'warning',
        message: 'Please fill in all required fields (*)',
        position: 'top',
        timeout: 3000
      })
    }
  }
}




const handleFormReset = () => {
  return new Promise((resolve) => {
    Object.keys(formData).forEach(section => {
      Object.keys(formData[section]).forEach(field => {
        if (typeof formData[section][field] === 'string') {
          formData[section][field] = ''
        } else if (typeof formData[section][field] === 'boolean') {
          formData[section][field] = false
        } else if (typeof formData[section][field] === 'number') {
          formData[section][field] = ''
        }
      })
    })

    formData.section2.branchOfMedicine = 'Allopathy'
    formData.section4.isMember = 'No'
    formData.section6.serviceContracts = 'No'
    formData.section8.attachedToHospital = 'No'
    formData.section8.coveredByPolicy = 'No'
    formData.section10.claimsMade = 'No'
    formData.section11.previouslyInsured = 'No'
    formData.section12.declinedProposal = 'No'
    formData.section12.increasedPremium = 'No'
    formData.section12.refusedRenewal = 'No'
    formData.section12.cancelledPolicy = 'No'
    formData.declaration.date = new Date().toISOString().split('T')[0]

    resolve()
  })
}


const getFormData = () => {
  return {
    ...formData,
    formType: 'ProfessionalIndemnityDoctors',
    customerType: 'Private',
    timestamp: new Date().toISOString()
  }
}

const handleHospitalAffiliationChange = (value) => {
  if (value === 'No') {
    formData.section8.hospitalDetails = ''
    formData.section8.coveredByPolicy = 'No'
  }
}

const handleClaimsChange = (value) => {
  if (value === 'No') {
    formData.section10.claimsDetails = ''
  }
}

const handlePreviousInsuranceChange = (value) => {
  if (value === 'No') {
    formData.section11.previousInsuranceDetails = ''
  }
}

const loadDraft = () => {
  const draft = localStorage.getItem('professionalIndemnityDraft')
  if (draft) {
    try {
      const draftData = JSON.parse(draft)
      Object.keys(draftData).forEach(key => {
        if (formData[key] !== undefined) {
          if (typeof formData[key] === 'object' && formData[key] !== null) {
            Object.keys(draftData[key]).forEach(subKey => {
              if (formData[key][subKey] !== undefined) {
                formData[key][subKey] = draftData[key][subKey]
              }
            })
          } else {
            formData[key] = draftData[key]
          }
        }
      })
    } catch (error) {
      console.error('Error loading draft:', error)
    }
  }
}

onMounted(() => {
  loadDraft()
})

defineExpose({
  validate: () => isFormValid.value,
  validateForm: validateForm,
  getFormData: getFormData,
  resetForm: handleFormReset,
  submitForm: handleSubmit,
  isFormValid: isFormValid.value,
  formData: formData
})
</script>

<style scoped>
.professional-indemnity-doctors-form {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
}

.text-justify {
  text-align: justify;
}

.q-field--outlined :deep(.q-field__control) {
  border-radius: 4px;
}

.q-field--dense :deep(.q-field__control) {
  min-height: 40px;
}

.q-card {
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.action-buttons {
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
}

.q-btn {
  font-weight: 500;
  letter-spacing: 0.5px;
}

.q-btn--md {
  padding: 8px 16px;
}

@media (max-width: 768px) {
  .action-buttons .q-btn {
    margin-bottom: 8px;
  }
}
</style>