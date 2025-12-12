<template>
  <div>
    <div class="text-h5 text-primary q-mb-md text-center">
      PROPOSAL FORM FOR INDIVIDUAL PERSONAL ACCIDENT INSURANCE / GROUP PERSONAL ACCIDENT INSURANCE
    </div>
    <p class="text-center">(to be completed by the Proposer / Group / Association / Institution / Corporate Body)</p>
    <p class="text-center text-weight-bold">IMPORTANT</p>
    <p class="text-center q-mb-lg">The Company will not be on risk until the Proposal has been accepted by Company and
      the full premium paid.</p>

    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-subtitle1 text-weight-bold q-mb-sm">Required Cover</div>
        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-12 col-md-6">
            <div class="text-subtitle2 q-mb-sm">Individual Personal Accident</div>
            <div>
              <q-radio v-model="coverType" val="individual" label="Yes" class="q-mr-md" />
              <q-radio v-model="coverType" val="none" label="No" />
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="text-subtitle2 q-mb-sm">Group Personal Accident</div>
            <div>
              <q-radio v-model="coverType" val="group" label="Yes" class="q-mr-md" />
              <q-radio v-model="coverType" val="none" label="No" />
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <template v-if="coverType === 'individual'">
      <q-card flat bordered class="q-mb-md">
        <q-card-section>
          <div class="text-subtitle1 text-weight-bold q-mb-sm">Occupation Details</div>
          <div class="q-mb-md">
            <div class="text-subtitle2 q-mb-sm">Profession, Occupation, Trade or Business *</div>
            <q-input v-model="occupation.description" label="Describe fully with nature of duties *" outlined
              type="textarea" rows="3" :rules="[val => !!val || 'Description is required']" />
          </div>
          <div class="q-mb-md">
            <div class="text-subtitle2 q-mb-sm">b) Primary engagement *</div>
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-4">
                <q-checkbox v-model="occupation.primaryEngagement" val="administration"
                  label="Administration/Office functions" />
              </div>
              <div class="col-12 col-md-4">
                <q-checkbox v-model="occupation.primaryEngagement" val="manual" label="Manual Labour" />
              </div>
              <div class="col-12 col-md-4">
                <q-checkbox v-model="occupation.primaryEngagement" val="other" label="Other" />
              </div>
            </div>
            <q-input v-if="occupation.primaryEngagement.includes('other')" v-model="occupation.otherSpecify"
              label="Please specify *" outlined class="q-mt-sm"
              :rules="[val => !!val || 'Specification is required']" />
          </div>
        </q-card-section>
      </q-card>

      <q-card flat bordered class="q-mb-md">
        <q-card-section>
          <div class="text-subtitle1 text-weight-bold q-mb-sm">Personal Details</div>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-4">
              <q-input v-model="personal.dateOfBirth" label="a) Date of birth *" outlined type="date"
                :rules="[val => !!val || 'Date of birth is required']" />
            </div>
            <div class="col-12 col-md-4">
              <q-input v-model="personal.height" label="b) Height (meters)" outlined type="number" step="0.01"
                suffix="m" />
            </div>
            <div class="col-12 col-md-4">
              <q-input v-model="personal.weight" label="c) Weight (kgs)" outlined type="number" suffix="kgs" />
            </div>
          </div>
        </q-card-section>
      </q-card>

      <q-card flat bordered class="q-mb-md">
        <q-card-section>
          <div class="text-subtitle1 text-weight-bold q-mb-sm">Individual/Family Cover Details</div>
          <div class="q-mb-md">
            <div class="text-subtitle2 q-mb-sm">Please select requested cover:</div>
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-6">
                <q-checkbox v-model="coverDetails.individualCover" label="Individual Cover (Private)" />
              </div>
              <div class="col-12 col-md-6">
                <q-checkbox v-model="coverDetails.familyPackage" label="Family Package Required" />
              </div>
            </div>
          </div>

          <div v-if="coverDetails.familyPackage" class="q-mb-lg">
            <div class="text-subtitle2 q-mb-sm">Family Members Details</div>
            <q-table :rows="familyMembers" :columns="familyColumns" row-key="id" dense flat bordered class="bg-grey-1">
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td>
                    <q-select v-model="props.row.relationship" :options="familyRelationshipOptions" dense outlined />
                  </q-td>
                  <q-td>
                    <q-input v-model="props.row.name" dense outlined />
                  </q-td>
                  <q-td>
                    <q-input v-model="props.row.age" dense outlined type="number" />
                  </q-td>
                  <q-td>
                    <q-input v-model="props.row.profession" dense outlined />
                  </q-td>
                  <q-td>
                    <q-input v-model="props.row.sumInsured" dense outlined type="number" prefix="$" />
                  </q-td>
                </q-tr>
              </template>
            </q-table>
            <div class="text-caption text-grey q-mt-xs">
              Note: Additional sheet to be attached, if space not sufficient to complete the details.
            </div>
          </div>

          <div class="q-mb-md">
            <div class="text-subtitle2 q-mb-sm">Sum Insured</div>
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-4">
                <q-input v-model="sumInsured.death" label="Death: AWG" outlined type="number" />
              </div>
              <div class="col-12 col-md-4">
                <q-input v-model="sumInsured.permanentDisability" label="Permanent Disability: AWG" outlined
                  type="number" />
              </div>
              <div class="col-12 col-md-4">
                <q-input v-model="sumInsured.medicalExpenses" label="Medical Expenses: AWG" outlined type="number" />
              </div>
            </div>
            <div class="text-caption text-grey q-mt-xs">
              (Medical expenses can be Awg. 1,000.00 or Max. Awg. 2,000.00, which shall be payable over and above
              AZV/SVB)
            </div>
          </div>

          <div class="q-mb-md">
            <div class="text-subtitle2 q-mb-sm">Beneficiary (if desired/applicable)</div>
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-6">
                <q-input v-model="beneficiaries[0]" label="Name of beneficiary 1 + relationship" outlined />
              </div>
              <div class="col-12 col-md-6">
                <q-input v-model="beneficiaries[1]" label="Name of beneficiary 2 + relationship" outlined />
              </div>
            </div>
          </div>

          <div class="q-mb-md">
            <div class="text-subtitle2 q-mb-sm">Mortgage (if desired/applicable)</div>
            <q-input v-model="mortgage.bankName" label="Name of Bank" outlined />
          </div>
        </q-card-section>
      </q-card>
    </template>

    <template v-if="coverType === 'group'">
      <q-card flat bordered class="q-mb-md">
        <q-card-section>
          <div class="text-subtitle1 text-weight-bold q-mb-sm">Group Cover Details</div>
          <div class="q-mb-md">
            <div class="text-subtitle2 q-mb-sm">Group Cover (Business)</div>
            <q-input v-model="groupCover.totalPersons" label="Total No. of persons to be covered" outlined type="number"
              class="q-mb-sm" />
            <div class="text-caption text-grey">
              (List of persons/employees, together with beneficiary information must be submitted, see spreadsheet)
            </div>
          </div>

          <div class="q-mb-md bg-blue-1 q-pa-md rounded-borders">
            <div class="text-subtitle2 q-mb-sm">General Employees</div>
            <div class="row q-col-gutter-md q-mb-sm">
              <div class="col-12 col-md-6">
                <q-input v-model="groupCover.generalEmployees.total" label="Total No. of General Employees" outlined
                  type="number" />
              </div>
            </div>
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-4">
                <q-input v-model="groupCover.generalEmployees.death" label="Death: AWG" outlined type="number" />
              </div>
              <div class="col-12 col-md-4">
                <q-input v-model="groupCover.generalEmployees.permanentDisability" label="Permanent Disability: AWG"
                  outlined type="number" />
              </div>
              <div class="col-12 col-md-4">
                <q-input v-model="groupCover.generalEmployees.medicalExpenses" label="Medical Expenses: AWG" outlined
                  type="number" />
              </div>
            </div>
          </div>

          <div class="q-mb-md bg-blue-1 q-pa-md rounded-borders">
            <div class="text-subtitle2 q-mb-sm">Management</div>
            <div class="row q-col-gutter-md q-mb-sm">
              <div class="col-12 col-md-6">
                <q-input v-model="groupCover.management.total" label="Total No. of Management" outlined type="number" />
              </div>
            </div>
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-4">
                <q-input v-model="groupCover.management.death" label="Death: AWG" outlined type="number" />
              </div>
              <div class="col-12 col-md-4">
                <q-input v-model="groupCover.management.permanentDisability" label="Permanent Disability: AWG" outlined
                  type="number" />
              </div>
              <div class="col-12 col-md-4">
                <q-input v-model="groupCover.management.medicalExpenses" label="Medical Expenses: AWG" outlined
                  type="number" />
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>

      <q-card flat bordered class="q-mb-md">
        <q-card-section>
          <div class="text-subtitle1 text-weight-bold q-mb-sm">Employee List</div>
          <div class="text-caption q-mb-sm">
            Note: 1. This list will be attached to and forming part of the proposal form and policy to be issued<br>
            Note: 2. Separate list should be attached in respect of persons proposed to be covered under each Sum
            Insured.
          </div>

          <q-table :rows="employees" :columns="employeeColumns" row-key="id" dense flat bordered class="bg-grey-1"
            :pagination="{ rowsPerPage: 10 }">
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td>
                  <q-input v-model="props.row.name" dense outlined />
                </q-td>
                <q-td>
                  <q-select v-model="props.row.sex" :options="sexOptions" dense outlined />
                </q-td>
                <q-td>
                  <q-input v-model="props.row.age" dense outlined type="number" />
                </q-td>
                <q-td>
                  <q-input v-model="props.row.dob" dense outlined type="date" />
                </q-td>
                <q-td>
                  <q-input v-model="props.row.occupation" dense outlined />
                </q-td>
                <q-td>
                  <q-input v-model="props.row.sumInsured" dense outlined type="number" prefix="$" />
                </q-td>
                <q-td>
                  <q-input v-model="props.row.beneficiary" dense outlined />
                </q-td>
              </q-tr>
            </template>
          </q-table>

          <div class="text-center q-mt-md">
            <q-btn label="Add Employee" color="secondary" icon="person_add" @click="addEmployee" />
          </div>
        </q-card-section>
      </q-card>
    </template>

    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-subtitle1 text-weight-bold q-mb-sm">Medical History</div>
        <div class="text-caption q-mb-md">(Full particulars must be given in case the answer is 'Yes' to any of the
          following queries)</div>

        <div class="q-mb-md">
          <div class="text-subtitle2 q-mb-sm">Any physical defect or infirmity?</div>
          <div class="row items-center q-mb-sm">
            <div class="col-auto">
              <q-radio v-model="medical.physicalDefect" val="yes" label="Yes" class="q-mr-md" />
              <q-radio v-model="medical.physicalDefect" val="no" label="No" />
            </div>
            <div class="col">
              <q-input v-if="medical.physicalDefect === 'yes'" v-model="medical.physicalDefectDetails"
                label="Please specify *" outlined class="q-ml-md"
                :rules="[val => !!val || 'Specification is required']" />
            </div>
          </div>
        </div>

        <div class="q-mb-md">
          <div class="text-subtitle2 q-mb-sm">Gout, Arthritis or Diabetes, Paralysis, Fits of any kind or any other
            chronic
            disease?</div>
          <div class="row items-center q-mb-sm">
            <div class="col-auto">
              <q-radio v-model="medical.chronicDisease" val="yes" label="Yes" class="q-mr-md" />
              <q-radio v-model="medical.chronicDisease" val="no" label="No" />
            </div>
            <div class="col">
              <q-input v-if="medical.chronicDisease === 'yes'" v-model="medical.chronicDiseaseDetails"
                label="Please specify *" outlined class="q-ml-md"
                :rules="[val => !!val || 'Specification is required']" />
            </div>
          </div>
        </div>

        <div class="q-mb-md">
          <div class="text-subtitle2 q-mb-sm">Any other disability/impairment?</div>
          <div class="row items-center">
            <div class="col-auto">
              <q-radio v-model="medical.otherDisability" val="yes" label="Yes" class="q-mr-md" />
              <q-radio v-model="medical.otherDisability" val="no" label="No" />
            </div>
            <div class="col">
              <q-input v-if="medical.otherDisability === 'yes'" v-model="medical.otherDisabilityDetails"
                label="Please specify *" outlined class="q-ml-md"
                :rules="[val => !!val || 'Specification is required']" />
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-subtitle1 text-weight-bold q-mb-sm">Athletics/Sports Participation</div>
        <div class="q-mb-sm">
          <div class="text-subtitle2 q-mb-sm">Do you take part in any athletics or sports?</div>
          <div class="row items-center">
            <div class="col-auto">
              <q-radio v-model="sports.participate" val="yes" label="Yes" class="q-mr-md" />
              <q-radio v-model="sports.participate" val="no" label="No" />
            </div>
            <div class="col">
              <q-input v-if="sports.participate === 'yes'" v-model="sports.details" label="Indicate details thereof *"
                outlined class="q-ml-md" :rules="[val => !!val || 'Details are required']" />
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-subtitle1 text-weight-bold q-mb-sm">High-Risk Activities</div>
        <div class="text-subtitle2 q-mb-sm">Do you engage in:</div>
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-6">
            <q-checkbox v-model="highRiskActivities" val="racing" label="Racing on wheels or horseback" />
          </div>
          <div class="col-12 col-md-6">
            <q-checkbox v-model="highRiskActivities" val="hunting" label="Big game hunting" />
          </div>
          <div class="col-12 col-md-6">
            <q-checkbox v-model="highRiskActivities" val="mountaineering" label="Mountaineering" />
          </div>
          <div class="col-12 col-md-6">
            <q-checkbox v-model="highRiskActivities" val="winterSports" label="Winter sports, Skiing or Ice Hockey" />
          </div>
          <div class="col-12 col-md-6">
            <q-checkbox v-model="highRiskActivities" val="ballooning"
              label="Ballooning, Polo or Sports of similar nature" />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-subtitle1 text-weight-bold q-mb-sm">Previous Insurance History</div>

        <div class="q-mb-md">
          <div class="text-subtitle2 q-mb-sm">Have you ever claimed or received compensation under any Accident or
            Sickness
            Policy?</div>
          <div class="row items-center q-mb-sm">
            <div class="col-auto">
              <q-radio v-model="insuranceHistory.claimed" val="yes" label="Yes" class="q-mr-md" />
              <q-radio v-model="insuranceHistory.claimed" val="no" label="No" />
            </div>
            <div class="col">
              <q-input v-if="insuranceHistory.claimed === 'yes'" v-model="insuranceHistory.claimedDetails"
                label="Give full particulars name of insurer, amount and dates *" outlined class="q-ml-md"
                type="textarea" rows="2" :rules="[val => !!val || 'Details are required']" />
            </div>
          </div>
        </div>

        <div class="q-mb-md">
          <div class="text-subtitle2 q-mb-sm">Has any Insurance Company:</div>
          <div class="q-ml-md">
            <div class="q-mb-sm">
              <div class="text-subtitle2 q-mb-xs">Declined your proposal?</div>
              <div class="row items-center">
                <div class="col-auto">
                  <q-radio v-model="insuranceHistory.declined" val="yes" label="Yes" class="q-mr-md" />
                  <q-radio v-model="insuranceHistory.declined" val="no" label="No" />
                </div>
                <div class="col">
                  <q-input v-if="insuranceHistory.declined === 'yes'" v-model="insuranceHistory.declinedDetails"
                    label="Please specify *" outlined class="q-ml-md"
                    :rules="[val => !!val || 'Specification is required']" />
                </div>
              </div>
            </div>

            <div class="q-mb-sm">
              <div class="text-subtitle2 q-mb-xs">Refused to renew your policy?</div>
              <div class="row items-center">
                <div class="col-auto">
                  <q-radio v-model="insuranceHistory.refusedRenewal" val="yes" label="Yes" class="q-mr-md" />
                  <q-radio v-model="insuranceHistory.refusedRenewal" val="no" label="No" />
                </div>
                <div class="col">
                  <q-input v-if="insuranceHistory.refusedRenewal === 'yes'"
                    v-model="insuranceHistory.refusedRenewalDetails" label="Please specify *" outlined class="q-ml-md"
                    :rules="[val => !!val || 'Specification is required']" />
                </div>
              </div>
            </div>

            <div class="q-mb-sm">
              <div class="text-subtitle2 q-mb-xs">Cancelled any of your Insurances?</div>
              <div class="row items-center">
                <div class="col-auto">
                  <q-radio v-model="insuranceHistory.cancelled" val="yes" label="Yes" class="q-mr-md" />
                  <q-radio v-model="insuranceHistory.cancelled" val="no" label="No" />
                </div>
                <div class="col">
                  <q-input v-if="insuranceHistory.cancelled === 'yes'" v-model="insuranceHistory.cancelledDetails"
                    label="Please specify *" outlined class="q-ml-md"
                    :rules="[val => !!val || 'Specification is required']" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-subtitle1 text-weight-bold q-mb-sm">Declaration</div>
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
            <q-input v-model="declaration.location" label="Dated at" outlined class="q-mb-md" />
          </div>
          <div class="col-12 col-md-6">
            <q-input v-model="declaration.date" label="on" outlined type="date" class="q-mb-md"
              :rules="[val => !!val || 'Date is required']" />
          </div>
          <div class="col-12 col-md-12">
            <q-input v-model="declaration.signature" label="Proposer's Signature" outlined
              :rules="[val => !!val || 'Signature is required']" />
          </div>
        </div>
      </q-card-section>
    </q-card>

<FormResetButton 
    class="q-mt-lg text-center"
      :resetFunction="handleFormReset"
      label="Reset all"
      color="negative"
      icon="cleaning_services"
      :btnClass="'q-ml-md'"
      :title="'Reset Formulary the Personal Accident'"
      :message="'Are you sure you want to reset all the form data? All the information entered will be lost.'"
      :notificationMessage="'Personal Accident form successfully restarted'"
    />
  </div>
</template>

<script setup>
import { ref, reactive, computed, defineEmits, onMounted, watch } from 'vue'
import { useQuasar } from 'quasar'
import FormResetButton from '/src/components/FormResetButton.vue'


const $q = useQuasar()
const emit = defineEmits(['validation-changed', 'form-submitted'])

const coverType = ref('none')

const occupation = reactive({
  description: '',
  primaryEngagement: [],
  otherSpecify: ''
})

const personal = reactive({
  dateOfBirth: '',
  height: '',
  weight: ''
})

const coverDetails = reactive({
  individualCover: false,
  familyPackage: false
})

const sumInsured = reactive({
  death: 0,
  permanentDisability: 0,
  medicalExpenses: 0
})

const beneficiaries = ref(['', ''])
const mortgage = reactive({
  bankName: ''
})

const groupCover = reactive({
  totalPersons: 0,
  generalEmployees: {
    total: 0,
    death: 0,
    permanentDisability: 0,
    medicalExpenses: 0
  },
  management: {
    total: 0,
    death: 0,
    permanentDisability: 0,
    medicalExpenses: 0
  }
})

const medical = reactive({
  physicalDefect: 'no',
  physicalDefectDetails: '',
  chronicDisease: 'no',
  chronicDiseaseDetails: '',
  otherDisability: 'no',
  otherDisabilityDetails: ''
})

const sports = reactive({
  participate: 'no',
  details: ''
})

const highRiskActivities = ref([])

const insuranceHistory = reactive({
  claimed: 'no',
  claimedDetails: '',
  declined: 'no',
  declinedDetails: '',
  refusedRenewal: 'no',
  refusedRenewalDetails: '',
  cancelled: 'no',
  cancelledDetails: ''
})

const declaration = reactive({
  location: '',
  date: new Date().toISOString().split('T')[0],
  signature: ''
})


const familyMembers = ref([])
const familyColumns = [
  { name: 'relationship', label: 'Relationship', field: 'relationship', align: 'left' },
  { name: 'name', label: 'Name', field: 'name', align: 'left' },
  { name: 'age', label: 'Age', field: 'age', align: 'left' },
  { name: 'profession', label: 'Profession', field: 'profession', align: 'left' },
  { name: 'sumInsured', label: 'Sum Insured ($)', field: 'sumInsured', align: 'left' }
]

const employees = ref([])
const employeeColumns = [
  { name: 'name', label: 'Name of Employee', field: 'name', align: 'left' },
  { name: 'sex', label: 'Sex', field: 'sex', align: 'left' },
  { name: 'age', label: 'Age', field: 'age', align: 'left' },
  { name: 'dob', label: 'Date of Birth', field: 'dob', align: 'left' },
  { name: 'occupation', label: 'Occupation', field: 'occupation', align: 'left' },
  { name: 'sumInsured', label: 'Sum Insured ($)', field: 'sumInsured', align: 'left' },
  { name: 'beneficiary', label: 'Beneficiary', field: 'beneficiary', align: 'left' }
]

const familyRelationshipOptions = ['Spouse', 'Child', 'Parent', 'Sibling', 'Other']
const sexOptions = ['Male', 'Female', 'Other']

const isFormValid = computed(() => {
  if (!declaration.location || !declaration.date || !declaration.signature) {
    return false
  }

  if (coverType.value === 'individual') {
    if (!occupation.description || occupation.primaryEngagement.length === 0) {
      return false
    }

    if (occupation.primaryEngagement.includes('other') && !occupation.otherSpecify) {
      return false
    }

    if (!personal.dateOfBirth) {
      return false
    }

    if (medical.physicalDefect === 'yes' && !medical.physicalDefectDetails) return false
    if (medical.chronicDisease === 'yes' && !medical.chronicDiseaseDetails) return false
    if (medical.otherDisability === 'yes' && !medical.otherDisabilityDetails) return false

    if (sports.participate === 'yes' && !sports.details) return false

    if (insuranceHistory.claimed === 'yes' && !insuranceHistory.claimedDetails) return false
    if (insuranceHistory.declined === 'yes' && !insuranceHistory.declinedDetails) return false
    if (insuranceHistory.refusedRenewal === 'yes' && !insuranceHistory.refusedRenewalDetails) return false
    if (insuranceHistory.cancelled === 'yes' && !insuranceHistory.cancelledDetails) return false

    if (sumInsured.death === 0 && sumInsured.permanentDisability === 0 && sumInsured.medicalExpenses === 0) {
      return false
    }
  }

  if (coverType.value === 'group') {
    if (groupCover.totalPersons <= 0) return false

    if (employees.value.length === 0) return false
  }

  return true
})

const addEmployee = () => {
  employees.value.push({
    id: employees.value.length + 1,
    name: '',
    sex: 'Male',
    age: '',
    dob: '',
    occupation: '',
    sumInsured: 0,
    beneficiary: ''
  })
}

const addFamilyMember = () => {
  familyMembers.value.push({
    id: familyMembers.value.length + 1,
    relationship: '',
    name: '',
    age: '',
    profession: '',
    sumInsured: 0
  })
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

  try {
    const formData = {
      coverType: coverType.value,
      occupation: { ...occupation },
      personal: { ...personal },
      coverDetails: { ...coverDetails },
      sumInsured: { ...sumInsured },
      beneficiaries: [...beneficiaries.value],
      mortgage: { ...mortgage },
      medical: { ...medical },
      sports: { ...sports },
      highRiskActivities: [...highRiskActivities.value],
      insuranceHistory: { ...insuranceHistory },
      declaration: { ...declaration },
      timestamp: new Date().toISOString(),
      formType: 'PersonalAccident',
      productName: 'Personal Accident Insurance'
    }

    if (coverType.value === 'individual' && coverDetails.familyPackage) {
      formData.familyMembers = [...familyMembers.value]
    }

    if (coverType.value === 'group') {
      formData.groupCover = { ...groupCover }
      formData.employees = [...employees.value]
    }

    $q.notify({
      type: 'positive',
      message: 'Personal Accident proposal submitted successfully!',
      position: 'top',
      timeout: 1500
    })

    emit('form-submitted', formData)
    return formData

  } catch (error) {
    console.error('Error submitting form:', error)
    $q.notify({
      type: 'negative',
      message: 'Error submitting proposal. Please try again.',
      position: 'top'
    })
    return null
  }
}
const handleFormReset = () => {
  console.log('Ejecutando handleFormReset...')

  coverType.value = 'none'

  Object.assign(occupation, {
    description: '',
    primaryEngagement: [],
    otherSpecify: ''
  })

  Object.assign(personal, {
    dateOfBirth: '',
    height: '',
    weight: ''
  })

  Object.assign(coverDetails, {
    individualCover: false,
    familyPackage: false
  })

  Object.assign(sumInsured, {
    death: 0,
    permanentDisability: 0,
    medicalExpenses: 0
  })

  beneficiaries.value = ['', '']

  Object.assign(mortgage, {
    bankName: ''
  })

  Object.assign(groupCover, {
    totalPersons: 0,
    generalEmployees: {
      total: 0,
      death: 0,
      permanentDisability: 0,
      medicalExpenses: 0
    },
    management: {
      total: 0,
      death: 0,
      permanentDisability: 0,
      medicalExpenses: 0
    }
  })

  Object.assign(medical, {
    physicalDefect: 'no',
    physicalDefectDetails: '',
    chronicDisease: 'no',
    chronicDiseaseDetails: '',
    otherDisability: 'no',
    otherDisabilityDetails: ''
  })

  Object.assign(sports, {
    participate: 'no',
    details: ''
  })

  highRiskActivities.value = []

  Object.assign(insuranceHistory, {
    claimed: 'no',
    claimedDetails: '',
    declined: 'no',
    declinedDetails: '',
    refusedRenewal: 'no',
    refusedRenewalDetails: '',
    cancelled: 'no',
    cancelledDetails: ''
  })

  Object.assign(declaration, {
    location: '',
    date: new Date().toISOString().split('T')[0],
    signature: ''
  })

  familyMembers.value = []
  employees.value = []
  emit('validation-changed', false)

  console.log('Formulario reseteado exitosamente')
}

const resetForm = () => {
  console.log('Ejecutando resetForm...')
  handleFormReset()

  $q.notify({
    type: 'info',
    message: 'Formulario reiniciado',
    position: 'top',
    timeout: 1000
  })
}

const loadDraft = () => {
  const draft = localStorage.getItem('personal_accident_draft')
  if (draft) {
    try {
      const draftData = JSON.parse(draft)
      coverType.value = draftData.coverType || 'none'
      Object.assign(occupation, draftData.occupation || {})
      Object.assign(personal, draftData.personal || {})
      Object.assign(coverDetails, draftData.coverDetails || {})
      Object.assign(sumInsured, draftData.sumInsured || {})
      beneficiaries.value = draftData.beneficiaries || ['', '']
      Object.assign(mortgage, draftData.mortgage || {})
      Object.assign(groupCover, draftData.groupCover || {})
      Object.assign(medical, draftData.medical || {})
      Object.assign(sports, draftData.sports || {})
      highRiskActivities.value = draftData.highRiskActivities || []
      Object.assign(insuranceHistory, draftData.insuranceHistory || {})
      Object.assign(declaration, draftData.declaration || {})
      familyMembers.value = draftData.familyMembers || []
      employees.value = draftData.employees || []
    } catch (error) {
      console.error('Error loading draft:', error)
    }
  }
}

watch(isFormValid, (newVal) => {
  emit('validation-changed', newVal)
}, { immediate: true })

onMounted(() => {
  loadDraft()

  if (coverType.value === 'group' && employees.value.length === 0) {
    addEmployee()
  }

  if (coverType.value === 'individual' && coverDetails.familyPackage && familyMembers.value.length === 0) {
    addFamilyMember()
  }
})

defineExpose({
  validate: () => isFormValid.value,
  validateForm: () => isFormValid.value,
  getFormData: () => {
    const formData = {
      coverType: coverType.value,
      occupation: { ...occupation },
      personal: { ...personal },
      coverDetails: { ...coverDetails },
      sumInsured: { ...sumInsured },
      beneficiaries: [...beneficiaries.value],
      mortgage: { ...mortgage },
      medical: { ...medical },
      sports: { ...sports },
      highRiskActivities: [...highRiskActivities.value],
      insuranceHistory: { ...insuranceHistory },
      declaration: { ...declaration },
      timestamp: new Date().toISOString(),
      formType: 'PersonalAccident',
      productName: 'Personal Accident Insurance',
      isFormValid: isFormValid.value
    }

    if (coverType.value === 'individual' && coverDetails.familyPackage) {
      formData.familyMembers = [...familyMembers.value]
    }

    if (coverType.value === 'group') {
      formData.groupCover = { ...groupCover }
      formData.employees = [...employees.value]
    }

    return formData
  },
  resetForm,
  handleFormReset,
})
</script>

<style scoped>
.personal-accident-form {
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

.text-caption {
  font-size: 0.875rem;
  line-height: 1.4;
}
</style>