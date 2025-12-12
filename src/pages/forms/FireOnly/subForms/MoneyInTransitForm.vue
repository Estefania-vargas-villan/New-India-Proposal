<template>
    <div>
        <div class="text-h5 text-primary q-mb-md text-center">PROPOSAL FORM FOR MONEY INSURANCE</div>

        <q-card class="q-mb-md bg-blue-grey-1">
            <q-card-section>
                <div class="text-caption">
                    <p><strong>COVERS:</strong> This Insurance Policy provides cover against loss of money in transit,
                        by the Insured or Insured's authorised employee(s) occasioned by robbery, theft or any other
                        fortuitous cause. This Insurance Policy also covers loss by burglary or housebreaking whilst
                        money is retained at Insured's premises, in safe(s) or strong room.</p>
                    <p><strong>EXCLUSIONS:</strong> This Insurance Policy does not cover loss or damage due to Flood,
                        Cyclone, Earthquake and other Convulsions of Nature, War and Warlike Operations Civil Commotion,
                        Riot and Strikes & Terrorists Activities, Shortage due to error or omission, by use of keys to
                        safe(s) or strong room, unless such keys are obtained by force or threat, whilst being carried
                        under contract of affreightment, theft from unattended vehicle and Consequential loss.</p>
                    <p><strong>DEFINITION:</strong> Money shall mean and include Cash, Bank Notes, Currency Notes,
                        Cheques, Postal Orders & Money Orders and Postage Stamps having a monetary value (not being a
                        stamp collection or part thereof).</p>
                    <p class="text-weight-medium text-grey-9"><strong>NOTE:</strong> THE FOREGOING IS ONLY A BROAD
                        INDICATION OF THE COVER OFFERED. FOR DETAILS PLEASE REFER TO ANY OFFICE OF THE COMPANY. Ensure
                        that the sum fixed as limit of the Company's liability in respect of any one loss is adequate to
                        get full protection.</p>
                </div>
            </q-card-section>
        </q-card>

        <q-card bordered class="q-mb-md">
            <q-card-section>
                <div class="text-h6 text-grey-8 q-mb-sm">Description of Money to be insured</div>

                <div class="row q-col-gutter-md q-mb-md">
                    <div class="col-12 col-md-6">
                        <q-input v-model="totalAmountTransported"
                            label="Give an estimate of the amount of money likely to be transported during the period of insurance (AWG) *"
                            outlined dense type="number" prefix="$"
                            :rules="[val => val > 0 || 'Amount must be greater than 0']" />
                    </div>
                    <div class="col-12 col-md-6">
                        <q-input v-model="maxSingleTransport"
                            label="State the maximum amount of money likely to be transported by you at any one time (AWG) *"
                            outlined dense type="number" prefix="$"
                            :rules="[val => val > 0 || 'Amount must be greater than 0']" />
                    </div>
                </div>

                <div class="q-mb-md">
                    <div class="text-subtitle2 q-mb-xs">
                        Do you wish to insure against money by burglary from locked safe or strongroom or by hold-up
                        while on the premises?
                    </div>
                    <q-option-group v-model="burglaryCoverage" :options="yesNoOptions" type="radio" inline
                        @update:model-value="handleBurglaryCoverageChange" />

                    <div v-if="burglaryCoverage === 'yes'" class="q-mt-md bg-blue-1 q-pa-md rounded-borders">
                        <div class="row q-col-gutter-md">
                            <div class="col-12 col-md-6">
                                <q-input v-model="businessHoursAmount"
                                    label="Amount to be insured during business hours (AWG) *" outlined dense
                                    type="number" prefix="$"
                                    :rules="[val => val > 0 || 'Amount must be greater than 0']" />
                            </div>
                            <div class="col-12 col-md-6">
                                <q-input v-model="afterHoursAmount"
                                    label="Amount to be insured outside business hours (AWG) *" outlined dense
                                    type="number" prefix="$"
                                    :rules="[val => val > 0 || 'Amount must be greater than 0']" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="q-mb-md">
                    <div class="text-subtitle2 q-mb-xs">
                        Do you wish to insure against loss of money in cash counter(s)?
                    </div>
                    <q-option-group v-model="cashCounterCoverage" :options="yesNoOptions" type="radio" inline
                        @update:model-value="handleCashCounterChange" />

                    <div v-if="cashCounterCoverage === 'yes'" class="q-mt-md  bg-blue-1 q-pa-md rounded-borders">
                        <div class="row q-col-gutter-md">
                            <div class="col-12 col-md-6">
                                <q-input v-model="cashCounterAmount"
                                    label="Amount of money to be insured at cash counter(s) (AWG) *" outlined dense
                                    type="number" prefix="$"
                                    :rules="[val => val > 0 || 'Amount must be greater than 0']" />
                            </div>
                        </div>
                    </div>
                </div>
            </q-card-section>
        </q-card>

        <q-card bordered class="q-mb-md">
            <q-card-section>
                <div class="text-h6 text-grey-8 q-mb-sm">Transit and Security Details</div>

                <div class="q-mb-md">
                    <div class="text-subtitle2 q-mb-xs">How is the money carried?</div>
                    <q-select v-model="moneyContainer" :options="containerOptions" outlined dense emit-value map-options
                        :rules="[val => !!val || 'Please select how money is carried']"
                        @update:model-value="handleMoneyContainerChange" />

                    <div v-if="moneyContainer === 'other'" class="q-mt-sm">
                        <q-input v-model="otherMoneyContainer" label="Please specify other method *" outlined dense
                            :rules="[val => !!val || 'Specification is required']" />
                    </div>
                </div>

                <div class="q-mb-md">
                    <div class="text-subtitle2 q-mb-xs">Please describe how the money will be transported</div>
                    <q-select v-model="transportMethod" :options="transportOptions" outlined dense emit-value
                        map-options :rules="[val => !!val || 'Please select transport method']"
                        @update:model-value="handleTransportMethodChange" />

                    <div v-if="transportMethod === 'other'" class="q-mt-sm">
                        <q-input v-model="otherTransportMethod" label="Specify other transport method" outlined dense />
                    </div>
                </div>

                <div class="q-mb-md">
                    <div class="text-subtitle2 q-mb-xs">Does the route and time vary per transport?</div>
                    <q-option-group v-model="routeVaries" :options="yesNoOptions" type="radio" inline
                        @update:model-value="handleRouteChange" />

                    <div v-if="routeVaries === 'yes'" class="q-mt-md  bg-blue-1 q-pa-md rounded-borders">
                        <q-input v-model="routeVariationDetails" label="If yes, give details" outlined dense
                            type="textarea" rows="2" :rules="[val => !!val || 'Details are required']" />
                    </div>
                </div>
            </q-card-section>
        </q-card>

        <q-card bordered class="q-mb-md">
            <q-card-section>
                <div class="text-h6 text-grey-8 q-mb-sm">Personnel Details</div>

                <div class="row q-col-gutter-md q-mb-md">
                    <div class="col-12 col-md-6">
                        <q-input v-model="employeesToBank" label="Conveying cash and/or currency to the bank?" outlined
                            dense type="number" />
                    </div>
                    <div class="col-12 col-md-6">
                        <q-input v-model="employeesFromBank" label="Transporting cash and/or currency from the bank?"
                            outlined dense type="number" />
                    </div>
                </div>

                <div class="q-mb-md">
                    <div class="text-subtitle2 q-mb-xs">Are the persons/employees carrying the money accompanied by an
                        armed guard?</div>
                    <q-option-group v-model="armedGuard" :options="yesNoOptions" type="radio" inline
                        @update:model-value="handleArmedGuardChange" />

                    <div v-if="armedGuard === 'no'" class="q-mt-md  bg-blue-1 q-pa-md rounded-borders">
                        <q-input v-model="securityMeasures"
                            label="If no, what security measures are in place to protect the money?" outlined dense
                            type="textarea" rows="2" :rules="[val => !!val || 'Security measures are required']" />
                    </div>
                </div>

                <div class="q-mb-md">
                    <div class="text-subtitle2 q-mb-xs">Are any of the employees engaged in carrying cash covered under
                        a Fidelity Guarantee Policy?</div>
                    <q-option-group v-model="fidelityCoverage" :options="yesNoOptions" type="radio" inline
                        @update:model-value="handleFidelityChange" />

                    <div v-if="fidelityCoverage === 'yes'" class="q-mt-md  bg-blue-1 q-pa-md rounded-borders">
                        <div class="text-subtitle2 q-mb-xs">If yes, please provide employee name(s):</div>
                        <div v-for="(employee, index) in fidelityEmployees" :key="index"
                            class="row items-center q-mb-sm">
                            <div class="col-11">
                                <q-input v-model="fidelityEmployees[index]" :label="`Employee ${index + 1}`" outlined
                                    dense />
                            </div>
                            <div class="col-1 text-center">
                                <q-btn v-if="fidelityEmployees.length > 1" icon="delete" flat dense color="negative"
                                    @click="removeEmployee(index)" size="sm" round />
                            </div>
                        </div>
                        <q-btn icon="add" color="primary" outline @click="addEmployee" size="sm" class="q-mt-sm"
                            label="Add Employee" />
                    </div>
                </div>

                <div class="row q-col-gutter-md">
                    <div class="col-12 col-md-6">
                        <q-input v-model="transportDistance"
                            label="State the approximate distance over which the money will be conveyed" outlined dense
                            type="number" suffix="km" />
                    </div>
                </div>

                <div class="q-mt-md">
                    <q-input v-model="transportAddresses"
                        label="What is/are the addresses of premises between which money will be carried." outlined
                        dense type="textarea" rows="3"
                        placeholder="Please list all addresses including banks, branches, etc." />
                </div>
            </q-card-section>
        </q-card>

        <q-card bordered class="q-mb-md">
            <q-card-section>
                <div class="text-h6 text-grey-8 q-mb-sm">Details of Safe</div>

                <!-- Safe 1 -->
                <div class="bg-grey-2 q-pa-md rounded-borders q-mb-md">
                    <div class="text-subtitle2 q-mb-sm">Safe 1</div>

                    <div class="row q-col-gutter-md">
                        <div class="col-12 ">
                            <q-input v-model="safe1MakerName" label="Maker's Name " outlined dense />
                            <q-input v-model="safe1MakerNumber" label="Identification number" outlined dense
                                class="q-mt-lg" />
                        </div>
                        <div class="col-12">
                            <q-input v-model="safe1Dimensions" label="Safe Dimensions (Length x Width x Depth)" outlined
                                dense />
                        </div>
                    </div>

                    <div class="row q-col-gutter-md q-mt-sm">
                        <div class="col-12">
                            <q-input v-model="safe1Weight" label="Safe's Weight" outlined dense />
                        </div>
                    </div>

                    <div class="row q-col-gutter-md q-mt-sm">
                        <div class="col-12 col-md-6">
                            <div class="text-caption q-mb-xs">Is the safe fixed to the walls or secured to the floor?
                            </div>
                            <q-option-group v-model="safe1Fixed" :options="yesNoOptions" type="radio" inline />
                        </div>
                        <div class="col-12 col-md-6">
                            <div class="text-caption q-mb-xs">Is the safe Theft Resisting or Burglar Proof?</div>
                            <q-option-group v-model="safe1TheftResisting" :options="yesNoOptions" type="radio" inline />
                        </div>
                    </div>

                    <div class="row q-col-gutter-md q-mt-sm">
                        <div class="col-12 col-md-6">
                            <div class="text-caption q-mb-xs">Does the safe have keys or combination lock(s)?</div>
                            <q-option-group v-model="safe1HasLock" :options="yesNoOptions" type="radio" inline
                                @update:model-value="handleSafe1LockChange" />
                        </div>
                        <div class="col-12 col-md-6" v-if="safe1HasLock === 'yes'">
                            <q-input v-model="safe1KeyHolders" label="How many persons have the key(s) or combination?"
                                outlined dense type="number" />
                        </div>
                    </div>

                    <div v-if="safe1HasLock === 'yes'" class="q-mt-sm">
                        <q-input v-model="safe1KeyStorage"
                            label="Where are the key(s) or combination kept when premises are closed?" outlined dense
                            type="textarea" rows="2" />
                    </div>
                </div>

                <div class="bg-grey-2 q-pa-md rounded-borders">
                    <div class="text-subtitle2 q-mb-sm">Safe 2 (if applicable)</div>

                    <div class="row q-col-gutter-md">
                        <div class="col-12 col-md-6">
                            <q-input v-model="safe2Maker" label="Maker's Name and identification number" outlined
                                dense />
                        </div>
                        <div class="col-12 col-md-6">
                            <q-input v-model="safe2Dimensions" label="Safe Dimensions (Length x Width x Depth)" outlined
                                dense />
                        </div>
                    </div>

                    <div class="row q-col-gutter-md q-mt-sm">
                        <div class="col-12 col-md-6">
                            <q-input v-model="safe2Weight" label="Safe's Weight" outlined dense />
                        </div>
                    </div>

                    <div class="row q-col-gutter-md q-mt-sm">
                        <div class="col-12 col-md-6">
                            <div class="text-caption q-mb-xs">Is the safe fixed to the walls or secured to the floor?
                            </div>
                            <q-option-group v-model="safe2Fixed" :options="yesNoOptions" type="radio" inline />
                        </div>
                        <div class="col-12 col-md-6">
                            <div class="text-caption q-mb-xs">Is the safe Theft Resisting or Burglar Proof?</div>
                            <q-option-group v-model="safe2TheftResisting" :options="yesNoOptions" type="radio" inline />
                        </div>
                    </div>
                </div>
            </q-card-section>
        </q-card>

        <q-card bordered class="q-mb-md">
            <q-card-section>
                <div class="text-h6 text-grey-8 q-mb-sm">Loss History</div>

                <div class="q-mb-md">
                    <div class="text-subtitle2 q-mb-xs">
                        Have you ever sustained any loss of money whilst in transit or whilst on your premises?
                    </div>
                    <q-option-group v-model="previousLosses" :options="yesNoOptions" type="radio" inline
                        @update:model-value="handlePreviousLossesChange" />

                    <div v-if="previousLosses === 'yes'" class="q-mt-md  bg-blue-1 q-pa-md rounded-borders">
                        <q-input v-model="lossDetails" label="If yes, give full particulars" outlined dense
                            type="textarea" rows="3" :rules="[val => !!val || 'Loss details are required']" />
                    </div>
                </div>
            </q-card-section>
        </q-card>

        <q-card bordered class="q-mb-md">
            <q-card-section>
                <div class="text-h6 text-grey-8 q-mb-sm"> Insurance History</div>
                <div class="q-mb-md">
                    <div class="text-subtitle2 q-mb-xs"> Has any Company:</div>
                    <div class="row q-col-gutter-md">
                        <div class="col-12 col-md-6">
                            <div class="text-caption q-mb-xs">declined your proposal?</div>
                            <q-option-group v-model="proposalDeclined" :options="yesNoOptions" type="radio" inline
                                @update:model-value="handleProposalDeclinedChange" />
                            <div v-if="proposalDeclined === 'yes'" class="q-mt-xs">
                                <q-input v-model="proposalDeclinedDetails" label="If yes, give details" outlined
                                    dense />
                            </div>
                        </div>

                        <div class="col-12 col-md-6">
                            <div class="text-caption q-mb-xs">refused to renew your policy?</div>
                            <q-option-group v-model="policyNotRenewed" :options="yesNoOptions" type="radio" inline
                                @update:model-value="handlePolicyNotRenewedChange" />
                            <div v-if="policyNotRenewed === 'yes'" class="q-mt-xs">
                                <q-input v-model="policyNotRenewedDetails" label="If yes, give details" outlined
                                    dense />
                            </div>
                        </div>

                        <div class="col-12 col-md-6">
                            <div class="text-caption q-mb-xs">demanded an increased rate on renewal?</div>
                            <q-option-group v-model="increasedRateDemanded" :options="yesNoOptions" type="radio" inline
                                @update:model-value="handleIncreasedRateChange" />
                            <div v-if="increasedRateDemanded === 'yes'" class="q-mt-xs">
                                <q-input v-model="increasedRateDetails" label="If yes, give details" outlined dense />
                            </div>
                        </div>

                        <div class="col-12 col-md-6">
                            <div class="text-caption q-mb-xs">cancelled any of your policy?</div>
                            <q-option-group v-model="policyCancelled" :options="yesNoOptions" type="radio" inline
                                @update:model-value="handlePolicyCancelledChange" />
                            <div v-if="policyCancelled === 'yes'" class="q-mt-xs">
                                <q-input v-model="policyCancelledDetails" label="If yes, give details" outlined dense />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="q-mb-md">
                    <div class="text-subtitle2 q-mb-xs">
                        Has the risk been previously Insured?
                    </div>
                    <q-option-group v-model="previouslyInsured" :options="yesNoOptions" type="radio" inline
                        @update:model-value="handlePreviouslyInsuredChange" />

                    <div v-if="previouslyInsured === 'yes'" class="q-mt-md bg-blue-1 q-pa-md rounded-borders">
                        <div class="text-subtitle2 q-mb-sm">If yes, please provide the following details:</div>

                        <div class="row q-col-gutter-md">
                            <div class="col-12 col-md-6">
                                <q-input v-model="previousCompany" label="The name of the Insurance Company" outlined
                                    dense :rules="[val => !!val || 'Company name is required']" />
                            </div>
                            <div class="col-12 col-md-6">
                                <q-input v-model="previousPolicyNumber" label="Policy No." outlined dense
                                    :rules="[val => !!val || 'Policy number is required']" />
                            </div>
                        </div>

                        <div class="row q-col-gutter-md q-mt-sm">
                            <div class="col-12 col-md-6">
                                <q-input v-model="previousPeriod" label=" Period" outlined dense
                                    :rules="[val => !!val || 'Period is required']" />
                            </div>
                            <div class="col-12 col-md-6">
                                <q-input v-model="previousRate" label=" Rate charged" outlined dense suffix="%"
                                    :rules="[val => !!val || 'Rate is required']" />
                            </div>
                        </div>

                        <div class="row q-col-gutter-md q-mt-sm">
                            <div class="col-12 col-md-6">
                                <q-input v-model="specialTerms" label="Any special terms and conditions imposed"
                                    outlined dense type="textarea" rows="2" />
                            </div>
                        </div>
                    </div>
                </div>
            </q-card-section>
        </q-card>

        <q-card bordered class="q-mb-md">
            <q-card-section>
                <div class="text-h6 text-grey-8 q-mb-sm"> Declaration</div>

                <div class="bg-grey-2 q-pa-md rounded-borders q-mb-md">
                    <p class="text-body2 q-mb-md">
                        I/We hereby declare that the statements made by me/us in this Proposal Form are true to the best
                        of my/our knowledge and belief, and I/we
                        hereby agree that this declaration shall form the basis of the contract between me/us and THE
                        NEW INDIA ASSURANCE COMPANY LIMITED.
                    </p>
                    <p class="text-body2 q-mb-md">
                        I/We further agree that if any particular is filled in this proposal by any other person, such
                        person shall be deemed as my/our agent and not the
                        agent of the Company. I/We further declare that I/we have read and understood all particulars
                        entered herein and I/we have signed this after
                        verifying the same to be true and complete in all respect.
                    </p>

                    <div class="row q-col-gutter-md q-mt-md">
                        <div class="col-12 col-md-6">
                            <q-input v-model="declarationPlace" label="Dated at" outlined dense
                                :rules="[val => !!val || 'Place is required']" />
                        </div>

                        <div class="col-12 col-md-6">
                            <q-input v-model="declarationDate" label="Date" outlined dense type="date"
                                :rules="[val => !!val || 'Date is required']" />
                        </div>
                    </div>

                    <div class="q-mt-md">
                        <q-input v-model="proposerSignature" label="Proposer's Signature" outlined dense
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
                    <q-btn unelevated label="Reset" color="negative" class="btn-confirm" @click="resetForm"
                        v-close-popup />
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

const totalAmountTransported = ref(0)
const maxSingleTransport = ref(0)
const burglaryCoverage = ref('no')
const businessHoursAmount = ref(0)
const afterHoursAmount = ref(0)
const cashCounterCoverage = ref('no')
const cashCounterAmount = ref(0)

const moneyContainer = ref('bags')
const otherMoneyContainer = ref('')
const transportMethod = ref('private_car')
const otherTransportMethod = ref('')
const routeVaries = ref('no')
const routeVariationDetails = ref('')

const employeesToBank = ref(1)
const employeesFromBank = ref(1)
const armedGuard = ref('no')
const securityMeasures = ref('')
const fidelityCoverage = ref('no')
const fidelityEmployees = ref([''])
const transportDistance = ref(0)
const transportAddresses = ref('')

const safe1MakerName = ref('')
const safe1MakerNumber = ref('')
const safe1Dimensions = ref('')
const safe1Weight = ref('')
const safe1Fixed = ref('no')
const safe1TheftResisting = ref('no')
const safe1HasLock = ref('no')
const safe1KeyHolders = ref(1)
const safe1KeyStorage = ref('')

const safe2Maker = ref('')
const safe2Dimensions = ref('')
const safe2Weight = ref('')
const safe2Fixed = ref('no')
const safe2TheftResisting = ref('no')

const previousLosses = ref('no')
const lossDetails = ref('')

const proposalDeclined = ref('no')
const proposalDeclinedDetails = ref('')
const policyNotRenewed = ref('no')
const policyNotRenewedDetails = ref('')
const increasedRateDemanded = ref('no')
const increasedRateDetails = ref('')
const policyCancelled = ref('no')
const policyCancelledDetails = ref('')
const previouslyInsured = ref('no')
const previousCompany = ref('')
const previousPolicyNumber = ref('')
const previousPeriod = ref('')
const previousRate = ref('')
const specialTerms = ref('')

const declarationPlace = ref('Aruba')
const declarationDate = ref(new Date().toISOString().split('T')[0])
const proposerSignature = ref('')

const yesNoOptions = [
    { label: 'YES', value: 'yes' },
    { label: 'NO', value: 'no' }
]

const containerOptions = [
    { label: 'In bags', value: 'bags' },
    { label: 'In deposit sack', value: 'deposit_sack' },
    { label: 'In trunks', value: 'trunks' },
    { label: 'Other (please specify)', value: 'other' }
]

const transportOptions = [
    { label: 'By Private car/transport', value: 'private_car' },
    { label: 'By Company car/transport', value: 'company_car' },
    { label: 'By Security Company', value: 'security_company' },
    { label: 'Other', value: 'other' }
]

const isFormValid = computed(() => {
    const basicFieldsValid = totalAmountTransported.value > 0 &&
        maxSingleTransport.value > 0 &&
        declarationPlace.value &&
        declarationDate.value &&
        proposerSignature.value

    if (!basicFieldsValid) return false

    if (burglaryCoverage.value === 'yes') {
        if (businessHoursAmount.value <= 0 || afterHoursAmount.value <= 0) return false
    }

    if (cashCounterCoverage.value === 'yes') {
        if (cashCounterAmount.value <= 0) return false
    }

    if (moneyContainer.value === 'other' && !otherMoneyContainer.value) return false

    if (routeVaries.value === 'yes' && !routeVariationDetails.value) return false

    if (armedGuard.value === 'no' && !securityMeasures.value) return false

    if (previousLosses.value === 'yes' && !lossDetails.value) return false

    if (proposalDeclined.value === 'yes' && !proposalDeclinedDetails.value) return false

    if (policyNotRenewed.value === 'yes' && !policyNotRenewedDetails.value) return false

    if (increasedRateDemanded.value === 'yes' && !increasedRateDetails.value) return false

    if (policyCancelled.value === 'yes' && !policyCancelledDetails.value) return false

    if (previouslyInsured.value === 'yes') {
        if (!previousCompany.value || !previousPolicyNumber.value || !previousPeriod.value || !previousRate.value) return false
    }

    return true
})

const addEmployee = () => {
    fidelityEmployees.value.push('')
}

const removeEmployee = (index) => {
    if (fidelityEmployees.value.length > 1) {
        fidelityEmployees.value.splice(index, 1)
    }
}

const handleMoneyContainerChange = (value) => {
    if (value !== 'other') {
        otherMoneyContainer.value = ''
    }
}

const handleTransportMethodChange = (value) => {
    if (value !== 'other') {
        otherTransportMethod.value = ''
    }
}

const handleBurglaryCoverageChange = (value) => {
    if (value === 'no') {
        businessHoursAmount.value = 0
        afterHoursAmount.value = 0
    }
}

const handleCashCounterChange = (value) => {
    if (value === 'no') {
        cashCounterAmount.value = 0
    }
}

const handleRouteChange = (value) => {
    if (value === 'no') {
        routeVariationDetails.value = ''
    }
}

const handleArmedGuardChange = (value) => {
    if (value === 'yes') {
        securityMeasures.value = ''
    }
}

const handleFidelityChange = (value) => {
    if (value === 'no') {
        fidelityEmployees.value = ['']
    }
}

const handleSafe1LockChange = (value) => {
    if (value === 'no') {
        safe1KeyHolders.value = 1
        safe1KeyStorage.value = ''
    }
}

const handlePreviousLossesChange = (value) => {
    if (value === 'no') {
        lossDetails.value = ''
    }
}

const handleProposalDeclinedChange = (value) => {
    if (value === 'no') {
        proposalDeclinedDetails.value = ''
    }
}

const handlePolicyNotRenewedChange = (value) => {
    if (value === 'no') {
        policyNotRenewedDetails.value = ''
    }
}

const handleIncreasedRateChange = (value) => {
    if (value === 'no') {
        increasedRateDetails.value = ''
    }
}

const handlePolicyCancelledChange = (value) => {
    if (value === 'no') {
        policyCancelledDetails.value = ''
    }
}

const handlePreviouslyInsuredChange = (value) => {
    if (value === 'no') {
        previousCompany.value = ''
        previousPolicyNumber.value = ''
        previousPeriod.value = ''
        previousRate.value = ''
        specialTerms.value = ''
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
            totalAmountTransported: totalAmountTransported.value,
            maxSingleTransport: maxSingleTransport.value,
            burglaryCoverage: burglaryCoverage.value,
            businessHoursAmount: businessHoursAmount.value,
            afterHoursAmount: afterHoursAmount.value,
            cashCounterCoverage: cashCounterCoverage.value,
            cashCounterAmount: cashCounterAmount.value,
            moneyContainer: moneyContainer.value,
            otherMoneyContainer: otherMoneyContainer.value,
            transportMethod: transportMethod.value,
            otherTransportMethod: otherTransportMethod.value,
            routeVaries: routeVaries.value,
            routeVariationDetails: routeVariationDetails.value,
            employeesToBank: employeesToBank.value,
            employeesFromBank: employeesFromBank.value,
            armedGuard: armedGuard.value,
            securityMeasures: securityMeasures.value,
            fidelityCoverage: fidelityCoverage.value,
            fidelityEmployees: [...fidelityEmployees.value],
            transportDistance: transportDistance.value,
            transportAddresses: transportAddresses.value,
            safe1: {
                makerName: safe1MakerName.value,
                makerNumber: safe1MakerNumber.value,
                dimensions: safe1Dimensions.value,
                weight: safe1Weight.value,
                fixed: safe1Fixed.value,
                theftResisting: safe1TheftResisting.value,
                hasLock: safe1HasLock.value,
                keyHolders: safe1KeyHolders.value,
                keyStorage: safe1KeyStorage.value
            },
            safe2: {
                maker: safe2Maker.value,
                dimensions: safe2Dimensions.value,
                weight: safe2Weight.value,
                fixed: safe2Fixed.value,
                theftResisting: safe2TheftResisting.value
            },
            previousLosses: previousLosses.value,
            lossDetails: lossDetails.value,
            proposalDeclined: proposalDeclined.value,
            proposalDeclinedDetails: proposalDeclinedDetails.value,
            policyNotRenewed: policyNotRenewed.value,
            policyNotRenewedDetails: policyNotRenewedDetails.value,
            increasedRateDemanded: increasedRateDemanded.value,
            increasedRateDetails: increasedRateDetails.value,
            policyCancelled: policyCancelled.value,
            policyCancelledDetails: policyCancelledDetails.value,
            previouslyInsured: previouslyInsured.value,
            previousCompany: previousCompany.value,
            previousPolicyNumber: previousPolicyNumber.value,
            previousPeriod: previousPeriod.value,
            previousRate: previousRate.value,
            specialTerms: specialTerms.value,
            declarationPlace: declarationPlace.value,
            declarationDate: declarationDate.value,
            proposerSignature: proposerSignature.value,
            timestamp: new Date().toISOString(),
            formType: 'MoneyInTransit'
        }

        $q.notify({
            type: 'positive',
            message: 'Money in Transit proposal submitted successfully!',
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

    totalAmountTransported.value = 0
    maxSingleTransport.value = 0
    burglaryCoverage.value = 'no'
    businessHoursAmount.value = 0
    afterHoursAmount.value = 0
    cashCounterCoverage.value = 'no'
    cashCounterAmount.value = 0
    moneyContainer.value = 'bags'
    otherMoneyContainer.value = ''
    transportMethod.value = 'private_car'
    otherTransportMethod.value = ''
    routeVaries.value = 'no'
    routeVariationDetails.value = ''
    employeesToBank.value = 1
    employeesFromBank.value = 1
    armedGuard.value = 'no'
    securityMeasures.value = ''
    fidelityCoverage.value = 'no'
    fidelityEmployees.value = ['']
    transportDistance.value = 0
    transportAddresses.value = ''
    safe1MakerName.value = ''
    safe1MakerNumber.value = ''
    safe1Dimensions.value = ''
    safe1Weight.value = ''
    safe1Fixed.value = 'no'
    safe1TheftResisting.value = 'no'
    safe1HasLock.value = 'no'
    safe1KeyHolders.value = 1
    safe1KeyStorage.value = ''
    safe2Maker.value = ''
    safe2Dimensions.value = ''
    safe2Weight.value = ''
    safe2Fixed.value = 'no'
    safe2TheftResisting.value = 'no'
    previousLosses.value = 'no'
    lossDetails.value = ''
    proposalDeclined.value = 'no'
    proposalDeclinedDetails.value = ''
    policyNotRenewed.value = 'no'
    policyNotRenewedDetails.value = ''
    increasedRateDemanded.value = 'no'
    increasedRateDetails.value = ''
    policyCancelled.value = 'no'
    policyCancelledDetails.value = ''
    previouslyInsured.value = 'no'
    previousCompany.value = ''
    previousPolicyNumber.value = ''
    previousPeriod.value = ''
    previousRate.value = ''
    specialTerms.value = ''
    declarationPlace.value = 'Aruba'
    declarationDate.value = new Date().toISOString().split('T')[0]
    proposerSignature.value = ''

    $q.notify({
        type: 'info',
        message: 'Form has been reset',
        position: 'top',
        timeout: 1000
    })
}

const loadDraft = () => {
    const draft = localStorage.getItem('money_in_transit_draft')
    if (draft) {
        try {
            const draftData = JSON.parse(draft)

            if (draftData.formData) {
                const data = draftData.formData

                if (data.totalAmountTransported !== undefined) totalAmountTransported.value = data.totalAmountTransported
                if (data.maxSingleTransport !== undefined) maxSingleTransport.value = data.maxSingleTransport
                if (data.burglaryCoverage !== undefined) burglaryCoverage.value = data.burglaryCoverage
                if (data.businessHoursAmount !== undefined) businessHoursAmount.value = data.businessHoursAmount
                if (data.afterHoursAmount !== undefined) afterHoursAmount.value = data.afterHoursAmount
                if (data.cashCounterCoverage !== undefined) cashCounterCoverage.value = data.cashCounterCoverage
                if (data.cashCounterAmount !== undefined) cashCounterAmount.value = data.cashCounterAmount
                if (data.moneyContainer !== undefined) moneyContainer.value = data.moneyContainer
                if (data.otherMoneyContainer !== undefined) otherMoneyContainer.value = data.otherMoneyContainer
                if (data.transportMethod !== undefined) transportMethod.value = data.transportMethod
                if (data.otherTransportMethod !== undefined) otherTransportMethod.value = data.otherTransportMethod
                if (data.routeVaries !== undefined) routeVaries.value = data.routeVaries
                if (data.routeVariationDetails !== undefined) routeVariationDetails.value = data.routeVariationDetails
                if (data.employeesToBank !== undefined) employeesToBank.value = data.employeesToBank
                if (data.employeesFromBank !== undefined) employeesFromBank.value = data.employeesFromBank
                if (data.armedGuard !== undefined) armedGuard.value = data.armedGuard
                if (data.securityMeasures !== undefined) securityMeasures.value = data.securityMeasures
                if (data.fidelityCoverage !== undefined) fidelityCoverage.value = data.fidelityCoverage
                if (data.fidelityEmployees) fidelityEmployees.value = [...data.fidelityEmployees]
                if (data.transportDistance !== undefined) transportDistance.value = data.transportDistance
                if (data.transportAddresses !== undefined) transportAddresses.value = data.transportAddresses

                if (data.safe1) {
                    if (data.safe1.makerName !== undefined) safe1MakerName.value = data.safe1.makerName
                    if (data.safe1.makerNumber !== undefined) safe1MakerNumber.value = data.safe1.makerNumber
                    if (data.safe1.dimensions !== undefined) safe1Dimensions.value = data.safe1.dimensions
                    if (data.safe1.weight !== undefined) safe1Weight.value = data.safe1.weight
                    if (data.safe1.fixed !== undefined) safe1Fixed.value = data.safe1.fixed
                    if (data.safe1.theftResisting !== undefined) safe1TheftResisting.value = data.safe1.theftResisting
                    if (data.safe1.hasLock !== undefined) safe1HasLock.value = data.safe1.hasLock
                    if (data.safe1.keyHolders !== undefined) safe1KeyHolders.value = data.safe1.keyHolders
                    if (data.safe1.keyStorage !== undefined) safe1KeyStorage.value = data.safe1.keyStorage
                }

                if (data.safe2) {
                    if (data.safe2.maker !== undefined) safe2Maker.value = data.safe2.maker
                    if (data.safe2.dimensions !== undefined) safe2Dimensions.value = data.safe2.dimensions
                    if (data.safe2.weight !== undefined) safe2Weight.value = data.safe2.weight
                    if (data.safe2.fixed !== undefined) safe2Fixed.value = data.safe2.fixed
                    if (data.safe2.theftResisting !== undefined) safe2TheftResisting.value = data.safe2.theftResisting
                }

                if (data.previousLosses !== undefined) previousLosses.value = data.previousLosses
                if (data.lossDetails !== undefined) lossDetails.value = data.lossDetails
                if (data.proposalDeclined !== undefined) proposalDeclined.value = data.proposalDeclined
                if (data.proposalDeclinedDetails !== undefined) proposalDeclinedDetails.value = data.proposalDeclinedDetails
                if (data.policyNotRenewed !== undefined) policyNotRenewed.value = data.policyNotRenewed
                if (data.policyNotRenewedDetails !== undefined) policyNotRenewedDetails.value = data.policyNotRenewedDetails
                if (data.increasedRateDemanded !== undefined) increasedRateDemanded.value = data.increasedRateDemanded
                if (data.increasedRateDetails !== undefined) increasedRateDetails.value = data.increasedRateDetails
                if (data.policyCancelled !== undefined) policyCancelled.value = data.policyCancelled
                if (data.policyCancelledDetails !== undefined) policyCancelledDetails.value = data.policyCancelledDetails
                if (data.previouslyInsured !== undefined) previouslyInsured.value = data.previouslyInsured
                if (data.previousCompany !== undefined) previousCompany.value = data.previousCompany
                if (data.previousPolicyNumber !== undefined) previousPolicyNumber.value = data.previousPolicyNumber
                if (data.previousPeriod !== undefined) previousPeriod.value = data.previousPeriod
                if (data.previousRate !== undefined) previousRate.value = data.previousRate
                if (data.specialTerms !== undefined) specialTerms.value = data.specialTerms
                if (data.declarationPlace !== undefined) declarationPlace.value = data.declarationPlace
                if (data.declarationDate !== undefined) declarationDate.value = data.declarationDate
                if (data.proposerSignature !== undefined) proposerSignature.value = data.proposerSignature
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
        totalAmountTransported: totalAmountTransported.value,
        maxSingleTransport: maxSingleTransport.value,
        burglaryCoverage: burglaryCoverage.value,
        businessHoursAmount: businessHoursAmount.value,
        afterHoursAmount: afterHoursAmount.value,
        cashCounterCoverage: cashCounterCoverage.value,
        cashCounterAmount: cashCounterAmount.value,
        moneyContainer: moneyContainer.value,
        otherMoneyContainer: otherMoneyContainer.value,
        transportMethod: transportMethod.value,
        otherTransportMethod: otherTransportMethod.value,
        routeVaries: routeVaries.value,
        routeVariationDetails: routeVariationDetails.value,
        employeesToBank: employeesToBank.value,
        employeesFromBank: employeesFromBank.value,
        armedGuard: armedGuard.value,
        securityMeasures: securityMeasures.value,
        fidelityCoverage: fidelityCoverage.value,
        fidelityEmployees: [...fidelityEmployees.value],
        transportDistance: transportDistance.value,
        transportAddresses: transportAddresses.value,
        safe1: {
            makerName: safe1MakerName.value,
            makerNumber: safe1MakerNumber.value,
            dimensions: safe1Dimensions.value,
            weight: safe1Weight.value,
            fixed: safe1Fixed.value,
            theftResisting: safe1TheftResisting.value,
            hasLock: safe1HasLock.value,
            keyHolders: safe1KeyHolders.value,
            keyStorage: safe1KeyStorage.value
        },
        safe2: {
            maker: safe2Maker.value,
            dimensions: safe2Dimensions.value,
            weight: safe2Weight.value,
            fixed: safe2Fixed.value,
            theftResisting: safe2TheftResisting.value
        },
        previousLosses: previousLosses.value,
        lossDetails: lossDetails.value,
        proposalDeclined: proposalDeclined.value,
        proposalDeclinedDetails: proposalDeclinedDetails.value,
        policyNotRenewed: policyNotRenewed.value,
        policyNotRenewedDetails: policyNotRenewedDetails.value,
        increasedRateDemanded: increasedRateDemanded.value,
        increasedRateDetails: increasedRateDetails.value,
        policyCancelled: policyCancelled.value,
        policyCancelledDetails: policyCancelledDetails.value,
        previouslyInsured: previouslyInsured.value,
        previousCompany: previousCompany.value,
        previousPolicyNumber: previousPolicyNumber.value,
        previousPeriod: previousPeriod.value,
        previousRate: previousRate.value,
        specialTerms: specialTerms.value,
        declarationPlace: declarationPlace.value,
        declarationDate: declarationDate.value,
        proposerSignature: proposerSignature.value,
        timestamp: new Date().toISOString(),
        formType: 'MoneyInTransit'
    }),
    resetForm: resetForm,
    submitForm: submitForm,
    isFormValid: isFormValid.value,
    formData: {
        totalAmountTransported,
        maxSingleTransport,
        burglaryCoverage,
        businessHoursAmount,
        afterHoursAmount,
        cashCounterCoverage,
        cashCounterAmount,
        moneyContainer,
        otherMoneyContainer,
        transportMethod,
        otherTransportMethod,
        routeVaries,
        routeVariationDetails,
        employeesToBank,
        employeesFromBank,
        armedGuard,
        securityMeasures,
        fidelityCoverage,
        fidelityEmployees,
        transportDistance,
        transportAddresses,
        safe1MakerName,
        safe1MakerNumber,
        safe1Dimensions,
        safe1Weight,
        safe1Fixed,
        safe1TheftResisting,
        safe1HasLock,
        safe1KeyHolders,
        safe1KeyStorage,
        safe2Maker,
        safe2Dimensions,
        safe2Weight,
        safe2Fixed,
        safe2TheftResisting,
        previousLosses,
        lossDetails,
        proposalDeclined,
        proposalDeclinedDetails,
        policyNotRenewed,
        policyNotRenewedDetails,
        increasedRateDemanded,
        increasedRateDetails,
        policyCancelled,
        policyCancelledDetails,
        previouslyInsured,
        previousCompany,
        previousPolicyNumber,
        previousPeriod,
        previousRate,
        specialTerms,
        declarationPlace,
        declarationDate,
        proposerSignature
    }
})
</script>

<style scoped>
.money-in-transit-form {
    max-width: 1200px;
    margin: 0 auto;
}

.rounded-borders {
    border-radius: 8px;
}

.text-subtitle2 {
    font-weight: 600;
    color: #424242;
}

.q-card {
    margin-bottom: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.q-card-section {
    padding: 20px;
}

.bg-grey-2 {
    background-color: rgba(245, 245, 245, 0.8);
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