<template>
  <div>
    <div class="text-h5 text-primary q-mb-md text-center">
      Questionnaire and Proposal for Contractor's All Risks Insurance
    </div>

    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-subtitle1 text-weight-bold">Parties Involved</div>
        <div class="q-mb-lg">
          <div class="text-subtitle2 q-mb-sm">Name and address of Contractor *</div>
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-input v-model="contractor.companyName" label="Name *" outlined
                :rules="[val => !!val || 'Company name is required']" />
            </div>
          </div>
          <q-input v-model="contractor.address" label="Address *" outlined class="q-mt-md" type="textarea" rows="2"
            :rules="[val => !!val || 'Address is required']" />
        </div>

        <div class="q-mb-xl">
          <div class="text-subtitle2 q-mb-sm">Name(s) and address(es) of Sub-Contractor(s)</div>
          <div v-for="(sub, index) in subcontractors" :key="index" class="q-mb-md bg-grey-2 q-pa-md rounded-borders">
            <div class="row items-center q-mb-sm">
              <div class="text-subtitle2">Sub-Contractor {{ index + 1 }}</div>
              <q-space />
              <q-btn v-if="subcontractors.length > 1" icon="delete" flat dense color="negative" size="sm"
                @click="removeSubcontractor(index)" />
            </div>
            <div class="row q-col-gutter-md">
              <div class="col-12">
                <q-input v-model="sub.contactPerson" label="Name" outlined />
              </div>
            </div>
            <q-input v-model="sub.address" label="Address" outlined class="q-mt-sm" type="textarea" rows="1" />
          </div>
          <q-btn label="Add Sub-Contractor" icon="add" color="primary" outline class="q-mt-md"
            @click="addSubcontractor" />
        </div>

        <div class="q-mb-lg">
          <div class="text-subtitle2 q-mb-sm">Name and address of Consulting Engineer</div>
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-input v-model="consultingEngineer.name" label="Name" outlined />
            </div>
          </div>
          <q-input v-model="consultingEngineer.address" label="Address" outlined class="q-mt-md" type="textarea"
            rows="2" />
        </div>
      </q-card-section>
    </q-card>

    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-subtitle1 text-weight-bold q-mb-sm">Project Details</div>
        <div>
          <div class="text-subtitle2 q-mb-sm">Location of Site *</div>
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-input v-model="project.location.address" label="Site Address *" outlined type="textarea" rows="2"
                :rules="[val => !!val || 'Site address is required']" />
            </div>
          </div>
        </div>

        <div class="q-mb-lg">
          <div class="text-subtitle2 q-mb-sm">Title and description of contract *</div>
          <q-input v-model="project.title" label="Contract Title *" outlined
            :rules="[val => !!val || 'Contract title is required']" />
          <q-input v-model="project.description" label="Detailed Description *" outlined type="textarea" rows="3"
            :rules="[val => !!val || 'Description is required']" />
          <div>
            <q-file v-model="project.documents" label="Attach documents/plans" outlined multiple
              accept=".pdf,.doc,.docx,.jpg,.png">
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
            <div class="text-caption text-grey q-mt-xs">
              Supported formats: PDF, Word, JPG, PNG. Please attach necessary informative documents and plans.
            </div>
          </div>
        </div>

        <div class="q-mb-lg bg-blue-1 q-pa-md rounded-borders">
          <div class="text-subtitle2 q-mb-sm">Design and Materials</div>

          <div class="q-mb-md">
            <div class="text-subtitle2 q-mb-sm">Have the plans, design and material been already tested in any
              previous construction?</div>
            <div>
              <q-radio v-model="design.testedBefore" val="yes" label="Yes" class="q-mr-md" />
              <q-radio v-model="design.testedBefore" val="no" label="No" />
            </div>
            <q-input v-if="design.testedBefore === 'yes'" v-model="design.testingDetails" label="Testing Details *"
              outlined class="q-mt-md" type="textarea" rows="2"
              :rules="[val => !!val || 'Testing details required when yes']" />
          </div>

          <div class="q-mt-md">
            <div class="text-subtitle2 q-mb-sm">Is the installation or part thereof being built for the first time?
            </div>
            <div>
              <q-radio v-model="design.firstTimeBuild" val="yes" label="Yes" class="q-mr-md" />
              <q-radio v-model="design.firstTimeBuild" val="no" label="No" />
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-subtitle1 text-weight-bold q-mb-sm">Financial Details</div>

        <div class="q-mb-lg">
          <div class="text-subtitle2 q-mb-sm">Contract Value *</div>

          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input v-model="financial.contractPrice" label="Contract Price (AWG) *" outlined type="number"
                :rules="[val => val > 0 || 'Contract price is required']" />
            </div>
            <div class="col-12 col-md-6">
              <q-input v-model="financial.materialSuppliedByPrincipal" label="Material supplied by Principal" outlined
                type="string" />
            </div>
          </div>

          <div class="q-mt-md">
            <div class="text-subtitle2 q-mb-sm">Construction Equipment and Machinery (if coverage required)</div>

            <div class="row q-col-gutter-md q-mt-sm">
              <div class="col-12 col-md-6">
                <q-input v-model="financial.equipmentValue" label="Replacement value of construction equipment (AWG)"
                  outlined type="number" />
              </div>
              <div class="col-12 col-md-6">
                <q-input v-model="financial.machineryValue" label="Replacement value of construction machinery (AWG)"
                  outlined type="number" />
              </div>
            </div>

            <div class="row q-col-gutter-md q-mt-sm">
              <div class="col-12 col-md-6">
                <q-input v-model="financial.debrisRemovalAmount" label="Debris removal amount required (AWG)" outlined
                  type="number" />
              </div>
              <div class="col-12 col-md-6">
                <q-input v-model="financial.wagesExpenditure" label="Estimated expenditure on wages (AWG)" outlined
                  type="number" />
              </div>
            </div>
          </div>

          <div class="q-mt-md">
            <q-file v-model="financial.quantitiesSchedule" label="Attach Schedule of Quantities" outlined
              accept=".pdf,.xlsx,.xls">
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
            <div class="text-caption text-grey q-mt-xs">
              Please attach Schedule of Quantities if available
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-subtitle1 text-weight-bold q-mb-sm">Schedule and Sub-Contractors</div>

        <div class="q-mb-lg">
          <div class="text-subtitle2 q-mb-sm">Work to be carried out by Sub-Contractors</div>
          <q-input v-model="schedule.subcontractorWork" label="Description of Sub-Contractor Work" outlined
            type="textarea" rows="3" />
        </div>

        <div class="q-mb-lg">
          <div class="text-subtitle2 q-mb-sm">Construction and Maintenance Periods *</div>

          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <div class="text-subtitle2 q-mb-xs">Estimated construction period</div>
              <div class="row q-col-gutter-sm">
                <div class="col-6">
                  <q-input v-model="schedule.constructionStart" label="From *" outlined type="date"
                    :rules="[val => !!val || 'Start date required']" />
                </div>
                <div class="col-6">
                  <q-input v-model="schedule.constructionEnd" label="To *" outlined type="date"
                    :rules="[val => !!val || 'End date required']" />
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="text-subtitle2 q-mb-xs">Maintenance period coverage required</div>
              <div>
                <q-radio v-model="schedule.maintenanceCoverageRadio" val="yes" label="Yes" class="q-mr-md" />
                <q-radio v-model="schedule.maintenanceCoverageRadio" val="no" label="No" />
              </div>
              <div v-if="schedule.maintenanceCoverageRadio === 'yes'" class="row q-col-gutter-sm q-mt-xs">
                <div class="col-6">
                  <q-input v-model="schedule.maintenanceStart" label="From *" outlined type="date"
                    :rules="[val => !!val || 'Start date required']" />
                </div>
                <div class="col-6">
                  <q-input v-model="schedule.maintenanceEnd" label="To *" outlined type="date"
                    :rules="[val => !!val || 'End date required']" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-subtitle1 text-weight-bold q-mb-sm">Technical Details</div>

        <div class="q-mb-lg">
          <div class="text-subtitle2 q-mb-sm">Nature and depth of excavations if any</div>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input v-model="technical.excavationType" label="Type of Excavation" outlined />
            </div>
            <div class="col-12 col-md-6">
              <q-input v-model="technical.excavationDepth" label="Maximum Depth (m)" outlined type="number"
                suffix="m" />
            </div>
          </div>
          <q-input v-model="technical.excavationDetails" label="Additional Details" outlined class="q-mt-sm"
            type="textarea" rows="2" />
        </div>

        <div class="q-mb-lg bg-blue-1 q-pa-md rounded-borders">
          <div class="text-subtitle2 q-mb-sm">Blasting Details</div>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input v-model="technical.blastingShots" label="Approximate number of shots" outlined type="number" />
            </div>
            <div class="col-12 col-md-6">
              <q-input v-model="technical.blastingProximity" label="Proximity to roads/buildings (m)" outlined
                type="number" suffix="m" />
            </div>
          </div>
        </div>

        <div class="q-mb-lg">
          <div class="text-subtitle2 q-mb-sm">Pile Driving Details</div>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-4">
              <q-input v-model="technical.pilesNumber" label="Number of piles" outlined type="number" />
            </div>
            <div class="col-12 col-md-4">
              <q-input v-model="technical.pilesDepth" label="Depth per pile (m)" outlined type="number" suffix="m" />
            </div>
            <div class="col-12 col-md-4">
              <q-input v-model="technical.pilesSystem" label="Pile system/method" outlined />
            </div>
          </div>
        </div>

        <div class="q-mb-lg">
          <div class="text-subtitle2 q-mb-sm">Site Location and Adjacent Properties</div>

          <div class="q-mb-md">
            <div class="text-subtitle2 q-mb-sm">Is the site isolated from other buildings?</div>
            <div>
              <q-radio v-model="technical.siteIsolated" val="yes" label="Yes" class="q-mr-md" />
              <q-radio v-model="technical.siteIsolated" val="no" label="No" />
            </div>
          </div>

          <div v-if="technical.siteIsolated === 'no'" class="q-mb-md">
            <div class="text-subtitle2 q-mb-sm">Minimum distance from adjacent properties *</div>
            <q-input v-model="technical.minimumDistance" label="Distance (m)" outlined type="number" suffix="m"
              :rules="[val => val >= 0 || 'Distance must be positive']" />
          </div>

          <div class="q-mt-md">
            <div class="text-subtitle2 q-mb-sm">Coverage for damages to surrounding properties</div>
            <q-checkbox v-model="technical.surroundingPropertyCoverage"
              label="Include coverage for damages to surrounding properties during construction" />
          </div>
        </div>

        <div class="q-mb-lg">
          <div class="text-subtitle2 q-mb-sm">What are the risks of subsidence?</div>
          <q-input v-model="technical.subsidenceRisks" label="Subsidence Risk Assessment" outlined type="textarea"
            rows="2" />
        </div>

        <div class="q-mb-lg">
          <div class="text-subtitle2 q-mb-sm">Are there any special risks required to be insured?</div>
          <q-input v-model="technical.specialRisks" label="Special Risks Description" outlined type="textarea"
            rows="2" />
        </div>

        <div class="q-mb-lg">
          <div class="text-subtitle2 q-mb-sm">To what extent is total or partial destruction possible?</div>
          <q-input v-model="technical.destructionExtent" label="Extent of Possible Destruction" outlined type="textarea"
            rows="2" placeholder="Describe the potential extent of destruction from a single occurrence" />
        </div>
      </q-card-section>
    </q-card>

    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-subtitle1 text-weight-bold q-mb-sm">Environmental and Geological Conditions</div>

        <div class="q-mb-lg">
          <div class="text-subtitle2 q-mb-sm">Environmental and Geological Conditions</div>

          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-12 col-md-6">
              <q-input v-model="environmental.earthquakeHazard" label="Earthquake hazard assessment" outlined />
            </div>
            <div class="col-12 col-md-6">
              <q-input v-model="environmental.geologicalConditions" label="Geological conditions and subsoil"
                outlined />
            </div>
          </div>

          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-12 col-md-6">
              <q-input v-model="environmental.subsidenceHazard" label="Subsidence hazard" outlined />
            </div>
            <div class="col-12 col-md-6">
              <q-input v-model="environmental.groundWaterLevel" label="Ground-water level" outlined />
            </div>
          </div>

          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-12 col-md-6">
              <q-input v-model="environmental.nearestWaterBody" label="Nearest water body and distance" outlined />
            </div>
            <div class="col-12 col-md-6">
              <q-input v-model="environmental.deepestExcavation" label="Level of deepest excavation (m)" outlined
                type="number" suffix="m" />
            </div>
          </div>

          <div class="q-mb-md bg-blue-1 q-pa-md rounded-borders">
            <div class="text-subtitle2 q-mb-sm">Water Levels (if applicable)</div>
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-4">
                <q-input v-model="environmental.waterLevelLow" label="Low water level" outlined />
              </div>
              <div class="col-12 col-md-4">
                <q-input v-model="environmental.waterLevelMean" label="Mean water level" outlined />
              </div>
              <div class="col-12 col-md-4">
                <q-input v-model="environmental.waterLevelHighest" label="Highest recorded level" outlined />
              </div>
            </div>
          </div>

          <div class="q-mb-md">
            <div class="text-subtitle2 q-mb-sm">Flood Risk Assessment</div>
            <div class="row q-col-gutter-md q-mb-sm">
              <div class="col-12 col-md-6">
                <div class="text-subtitle2 q-mb-xs">Is there any risk of flood?</div>
                <div>
                  <q-radio v-model="environmental.floodRisk" val="yes" label="Yes" class="q-mr-md" />
                  <q-radio v-model="environmental.floodRisk" val="no" label="No" />
                </div>
              </div>
              <div class="col-12 col-md-6" v-if="environmental.floodRisk === 'yes'">
                <q-input v-model="environmental.floodPrecautions" label="Precautions taken" outlined />
              </div>
            </div>
          </div>

          <div class="q-mb-md">
            <div class="text-subtitle2 q-mb-sm">Meteorological Conditions</div>
            <q-input v-model="environmental.meteorologicalConditions"
              label="Rainy season, storm patterns, rainfall data" outlined type="textarea" rows="2" />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-subtitle1 text-weight-bold q-mb-sm">Existing Buildings and Additional Coverage</div>

        <div class="q-mb-lg">
          <div class="text-subtitle2 q-mb-sm">Existing buildings affected by the work</div>
          <q-input v-model="coverage.existingBuildingsAffected"
            label="Details of affected buildings (extensions, changes, underpinning, etc.)" outlined type="textarea"
            rows="3" />
        </div>

        <div class="q-mb-lg bg-blue-1 q-pa-md rounded-borders">
          <div class="text-subtitle2 q-mb-sm">Additional Charges Coverage</div>
          <q-checkbox v-model="coverage.includeExtraCharges"
            label="Include coverage for extra charges (overtime, night work, holidays, express freight, etc.)" />
          <div v-if="coverage.includeExtraCharges" class="q-mt-md">
            <q-input v-model="coverage.extraChargesDetails" label="Details of extra charges to be covered" outlined
              type="textarea" rows="2" />
          </div>
        </div>

        <div class="q-mb-lg q-pa-md rounded-borders">
          <div class="text-subtitle2 q-mb-sm">Third Party Liability Coverage</div>

          <div class="q-mb-md">
            <div class="text-subtitle2 q-mb-sm">Include Third Party Liability coverage?</div>
            <div>
              <q-radio v-model="coverage.includeThirdPartyLiability" val="yes" label="Yes" class="q-mr-md" />
              <q-radio v-model="coverage.includeThirdPartyLiability" val="no" label="No" />
            </div>
          </div>

          <div v-if="coverage.includeThirdPartyLiability === 'yes'" class="q-mt-md">
            <div class="text-subtitle2 q-mb-sm">Limits of Indemnity Required *</div>

            <div class="row q-col-gutter-md q-mb-md">
              <div class="col-12 col-md-6">
                <q-input v-model="coverage.bodilyInjuryLimit" label="Bodily injury per person (AWG)" outlined
                  type="number" :rules="[val => val > 0 || 'Limit required']" />
              </div>
              <div class="col-12 col-md-6">
                <q-input v-model="coverage.propertyDamageLimit" label="Property damage (AWG)" outlined type="number"
                  :rules="[val => val > 0 || 'Limit required']" />
              </div>
            </div>

            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-6">
                <q-input v-model="coverage.totalIndemnityLimit" label="Total limit of indemnity (AWG) *" outlined
                  type="number" :rules="[val => val > 0 || 'Total limit required']" />
              </div>
            </div>
          </div>
        </div>

        <div class="q-mb-lg">
          <div class="text-subtitle2 q-mb-sm">Existing Buildings/Structures Coverage</div>

          <div class="q-mb-md">
            <div class="text-subtitle2 q-mb-sm">Include coverage for existing buildings on/adjacent to site?</div>
            <div>
              <q-radio v-model="coverage.includeExistingBuildings" val="yes" label="Yes" class="q-mr-md" />
              <q-radio v-model="coverage.includeExistingBuildings" val="no" label="No" />
            </div>
          </div>

          <div v-if="coverage.includeExistingBuildings === 'yes'" class="q-mt-md">
            <q-input v-model="coverage.existingBuildingsLimit" label="Limit of indemnity for existing buildings (AWG)"
              outlined type="number" :rules="[val => val > 0 || 'Limit required']" />

            <q-input v-model="coverage.existingBuildingsDescription"
              label="Description of existing buildings/structures to be insured *" outlined type="textarea" rows="3"
              :rules="[val => !!val || 'Description required']" />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-subtitle1 text-weight-bold q-mb-sm">Declaration and Signature</div>

        <div class="q-mt-lg">
          <q-checkbox v-model="declaration.agreed"
            label="We hereby declare that the statements made by us in this Questionnaire are true to the best of our knowledge and belief and we hereby agree that this Questionnaire shall form the basis and part of the Policy."
            :rules="[val => val === true || 'You must agree to the declaration']" />
        </div>

        <div class="row q-col-gutter-md q-mt-lg">
          <div class="col-12 col-md-6">
            <q-input v-model="declaration.date" label="Date *" outlined type="date"
              :rules="[val => !!val || 'Date is required']" />
          </div>
          <div class="col-12 col-md-6">
            <q-input v-model="declaration.signatoryName" label="Signature of Applicant *" outlined
              :rules="[val => !!val || 'Signatory name is required']" />
          </div>
        </div>

        <div class="bg-grey-2 q-pa-md rounded-borders q-mt-md">
          <div class="text-subtitle2 q-mb-sm">Notes:</div>
          <ul class="q-pl-md">
            <li>If a copy of the contract is available it should be supplied to the Company with this application.</li>
            <li>It is helpful if a rough plan of the layout of the area concerned with an indication of the position of
              the
              main and temporary works can be supplied.</li>
            <li>Section 41 of Insurance Act, 1938 as amended prohibits any rebates or commissions not specified in
              published
              prospectuses.</li>
          </ul>
        </div>

        <div class="bg-grey-2 q-pa-md q-mt-lg rounded-borders">
          <div class="text-subtitle2 q-mb-sm">PROHIBITION OF REBATES</div>
          <ul class="q-pl-md">
            <li>No person shall allow, or offer to allow, either directly or indirectly as an inducement to any person
              to
              take out or renew or continue an Insurance in respect of any kind of risk relating to lives or property in
              India, any rebate of the whole or part of the commission, payable or any rebate of the premium shown on
              the
              Policy, nor shall any person taking out or renewing or continuing a Policy accept any rebate, except such
              rebate as may be allowed in accordance with the published prospectuses or tables of the Insurer.</li>
            <li>Any person making default in complying with the provisions of this section shall be punishable with fine
              which may extend to five hundred rupees.</li>
          </ul>
        </div>
      </q-card-section>
    </q-card>

    <FormResetButton 
    class="q-mt-lg text-center"
      :resetFunction="handleReset"
      label="Reset all"
      color="negative"
      icon="cleaning_services"
      :btnClass="'q-ml-md'"
      :title="'Reset Formulary the Contractors All Risk'"
      :message="'Are you sure you want to reset all the form data? All the information entered will be lost.'"
      :notificationMessage="'Contractors All Risk form successfully restarted'"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch, defineEmits, defineExpose } from 'vue'
import { useQuasar } from 'quasar'
import FormResetButton from '/src/components/FormResetButton.vue' 

const $q = useQuasar()
const emit = defineEmits(['validation-changed', 'form-submitted', 'close-form'])

const showResetConfirm = ref(false)

const contractor = ref({
  companyName: '',
  address: '',
  phone: ''
})

const subcontractors = ref([
  { contactPerson: '', address: '', phone: '' }
])

const consultingEngineer = ref({
  name: '',
  address: '',
  phone: ''
})

const project = ref({
  location: {
    address: ''
  },
  title: '',
  description: '',
  documents: null
})

const design = ref({
  testedBefore: 'no',
  testingDetails: '',
  firstTimeBuild: 'no'
})

const financial = ref({
  contractPrice: 0,
  materialSuppliedByPrincipal: 0,
  equipmentValue: 0,
  machineryValue: 0,
  debrisRemovalAmount: 0,
  wagesExpenditure: 0,
  quantitiesSchedule: null
})

const schedule = ref({
  subcontractorWork: '',
  constructionStart: '',
  constructionEnd: '',
  maintenanceCoverageRadio: 'no',
  maintenanceStart: '',
  maintenanceEnd: ''
})

const technical = ref({
  excavationType: '',
  excavationDepth: 0,
  excavationDetails: '',
  blastingShots: 0,
  blastingProximity: 0,
  pilesNumber: 0,
  pilesDepth: 0,
  pilesSystem: '',
  siteIsolated: 'no',
  minimumDistance: 0,
  surroundingPropertyCoverage: false,
  subsidenceRisks: '',
  specialRisks: '',
  destructionExtent: ''
})

const environmental = ref({
  earthquakeHazard: '',
  geologicalConditions: '',
  subsidenceHazard: '',
  groundWaterLevel: '',
  nearestWaterBody: '',
  waterLevelLow: '',
  waterLevelMean: '',
  waterLevelHighest: '',
  deepestExcavation: 0,
  floodRisk: 'no',
  floodPrecautions: '',
  meteorologicalConditions: ''
})

const coverage = ref({
  existingBuildingsAffected: '',
  includeExtraCharges: false,
  extraChargesDetails: '',
  includeThirdPartyLiability: 'no',
  bodilyInjuryLimit: 0,
  propertyDamageLimit: 0,
  totalIndemnityLimit: 0,
  includeExistingBuildings: 'no',
  existingBuildingsLimit: 0,
  existingBuildingsDescription: ''
})

const declaration = ref({
  agreed: false,
  date: new Date().toISOString().split('T')[0],
  signatoryName: ''
})

const submitting = ref(false)

const isFormValid = computed(() => {
  const requiredFieldsValid =
    contractor.value.companyName &&
    contractor.value.address &&
    project.value.location.address &&
    project.value.title &&
    project.value.description &&
    financial.value.contractPrice > 0 &&
    schedule.value.constructionStart &&
    schedule.value.constructionEnd &&
    declaration.value.agreed &&
    declaration.value.signatoryName

  const maintenanceValid = schedule.value.maintenanceCoverageRadio === 'no' ||
    (schedule.value.maintenanceCoverageRadio === 'yes' &&
      schedule.value.maintenanceStart &&
      schedule.value.maintenanceEnd)

  const thirdPartyLiabilityValid = coverage.value.includeThirdPartyLiability === 'no' ||
    (coverage.value.includeThirdPartyLiability === 'yes' &&
      coverage.value.bodilyInjuryLimit > 0 &&
      coverage.value.propertyDamageLimit > 0 &&
      coverage.value.totalIndemnityLimit > 0)

  const existingBuildingsValid = coverage.value.includeExistingBuildings === 'no' ||
    (coverage.value.includeExistingBuildings === 'yes' &&
      coverage.value.existingBuildingsLimit > 0 &&
      coverage.value.existingBuildingsDescription)

  const testingDetailsValid = design.value.testedBefore === 'no' ||
    (design.value.testedBefore === 'yes' && design.value.testingDetails)

  const minimumDistanceValid = technical.value.siteIsolated === 'yes' ||
    (technical.value.siteIsolated === 'no' && technical.value.minimumDistance >= 0)

  return requiredFieldsValid && maintenanceValid && thirdPartyLiabilityValid &&
    existingBuildingsValid && testingDetailsValid && minimumDistanceValid
})

const addSubcontractor = () => {
  subcontractors.value.push({ contactPerson: '', address: '', phone: '' })
}

const removeSubcontractor = (index) => {
  if (subcontractors.value.length > 1) {
    subcontractors.value.splice(index, 1)
  }
}

const submitForm = async () => {
  submitting.value = true

  try {
    await new Promise(resolve => setTimeout(resolve, 1500))

    const formData = {
      contractor: { ...contractor.value },
      subcontractors: [...subcontractors.value],
      consultingEngineer: { ...consultingEngineer.value },
      project: { ...project.value },
      design: { ...design.value },
      financial: { ...financial.value },
      schedule: { ...schedule.value },
      technical: { ...technical.value },
      environmental: { ...environmental.value },
      coverage: { ...coverage.value },
      declaration: { ...declaration.value },
      timestamp: new Date().toISOString()
    }

    $q.notify({
      type: 'positive',
      message: 'Contractors All Risk proposal submitted successfully!',
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

  localStorage.removeItem('car_proposal_draft')

  contractor.value = { companyName: '', address: '', phone: '' }
  subcontractors.value = [{ contactPerson: '', address: '', phone: '' }]
  consultingEngineer.value = { name: '', address: '', phone: '' }
  project.value = { location: { address: '' }, title: '', description: '', documents: null }
  design.value = { testedBefore: 'no', testingDetails: '', firstTimeBuild: 'no' }
  financial.value = {
    contractPrice: 0,
    materialSuppliedByPrincipal: 0,
    equipmentValue: 0,
    machineryValue: 0,
    debrisRemovalAmount: 0,
    wagesExpenditure: 0,
    quantitiesSchedule: null
  }
  schedule.value = {
    subcontractorWork: '',
    constructionStart: '',
    constructionEnd: '',
    maintenanceCoverageRadio: 'no',
    maintenanceStart: '',
    maintenanceEnd: ''
  }
  technical.value = {
    excavationType: '',
    excavationDepth: 0,
    excavationDetails: '',
    blastingShots: 0,
    blastingProximity: 0,
    pilesNumber: 0,
    pilesDepth: 0,
    pilesSystem: '',
    siteIsolated: 'no',
    minimumDistance: 0,
    surroundingPropertyCoverage: false,
    subsidenceRisks: '',
    specialRisks: '',
    destructionExtent: ''
  }
  environmental.value = {
    earthquakeHazard: '',
    geologicalConditions: '',
    subsidenceHazard: '',
    groundWaterLevel: '',
    nearestWaterBody: '',
    waterLevelLow: '',
    waterLevelMean: '',
    waterLevelHighest: '',
    deepestExcavation: 0,
    floodRisk: 'no',
    floodPrecautions: '',
    meteorologicalConditions: ''
  }
  coverage.value = {
    existingBuildingsAffected: '',
    includeExtraCharges: false,
    extraChargesDetails: '',
    includeThirdPartyLiability: 'no',
    bodilyInjuryLimit: 0,
    propertyDamageLimit: 0,
    totalIndemnityLimit: 0,
    includeExistingBuildings: 'no',
    existingBuildingsLimit: 0,
    existingBuildingsDescription: ''
  }
  declaration.value = {
    agreed: false,
    date: new Date().toISOString().split('T')[0],
    signatoryName: ''
  }
emit('validation-changed', false)

  $q.notify({
    type: 'info',
    message: 'Form has been completely reset and draft removed',
    position: 'top',
    timeout: 1500
  })
}
const handleReset = () => {
  console.log('Ejecutando reseteo de Contractors All Risk...')
  resetForm()
}

const loadDraft = () => {
  const draft = localStorage.getItem('car_proposal_draft')
  if (draft) {
    try {
      const draftData = JSON.parse(draft)
      contractor.value = draftData.contractor || contractor.value
      subcontractors.value = draftData.subcontractors || subcontractors.value
      consultingEngineer.value = draftData.consultingEngineer || consultingEngineer.value
      project.value = draftData.project || project.value
      design.value = draftData.design || design.value
      financial.value = draftData.financial || financial.value
      schedule.value = draftData.schedule || schedule.value
      technical.value = draftData.technical || technical.value
      environmental.value = draftData.environmental || environmental.value
      coverage.value = draftData.coverage || coverage.value
      declaration.value = draftData.declaration || declaration.value
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
    contractor: { ...contractor.value },
    subcontractors: [...subcontractors.value],
    consultingEngineer: { ...consultingEngineer.value },
    project: { ...project.value },
    design: { ...design.value },
    financial: { ...financial.value },
    schedule: { ...schedule.value },
    technical: { ...technical.value },
    environmental: { ...environmental.value },
    coverage: { ...coverage.value },
    declaration: { ...declaration.value }
  }),
  resetForm: resetForm,  
  handleReset: handleReset,
  isFormValid: isFormValid.value,
  formData: {
    contractor,
    subcontractors,
    consultingEngineer,
    project,
    design,
    financial,
    schedule,
    technical,
    environmental,
    coverage,
    declaration
  }
})
</script>

<style scoped>
.contractors-all-risk-form {
  max-width: 1200px;
  margin: 0 auto;
}

.rounded-borders {
  border-radius: 8px;
}

.q-card {
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.bg-blue-1 {
  background-color: rgba(187, 222, 251, 0.3);
}

.bg-grey-2 {
  background-color: rgba(245, 245, 245, 0.8);
}

@media print {
  .q-btn {
    display: none !important;
  }

  .contractors-all-risk-form {
    max-width: none;
  }
}
</style>