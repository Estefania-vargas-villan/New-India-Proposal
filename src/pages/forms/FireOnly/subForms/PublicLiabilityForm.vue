<template>
    <div>
        <div class="text-h5 text-primary q-mb-md text-center">
            PROPOSAL FOR PUBLIC LIABILITY INSURANCE
        </div>

        <q-card bordered class="q-mb-md">
            <q-card-section>
                <div class="text-h6 text-grey-8 q-mb-sm">Business Information</div>

                <div class="row q-col-gutter-md q-mb-md">
                    <div class="col-12">
                        <div class="text-subtitle2 q-mb-xs">Type of Cover *</div>
                        <div class="row q-col-gutter-sm">
                            <div class="col-12 col-md-4" v-for="option in coverTypeOptions" :key="option.value">
                                <q-radio v-model="coverType" :val="option.value" :label="option.label"
                                    class="q-mb-sm" />
                            </div>
                        </div>
                    </div>
                </div>
            </q-card-section>
        </q-card>

        <q-card bordered class="q-mb-md">
            <q-card-section>
                <div class="text-h6 text-grey-8 q-mb-sm">Business Operations</div>

                <div class="q-mb-md">
                    <div class="text-subtitle2 q-mb-xs">Please describe your Business Operation(s)</div>
                    <q-input v-model="businessOperations" outlined dense type="textarea" rows="3"
                        :rules="[val => !!val || 'Business operations description is required']" />
                </div>

                <div class="q-mb-md">
                    <div class="text-subtitle2 q-mb-xs">Particulars of the Business and Property</div>

                    <div class="q-mb-sm">
                        <div class="text-caption q-mb-xs">Are you insuring as:</div>
                        <q-option-group v-model="insuringAs" :options="insuringAsOptions" type="radio" inline />
                    </div>

                    <div class="q-mb-sm">
                        <div class="text-caption q-mb-xs">Description of premises:</div>
                        <q-select v-model="premisesType" :options="premisesTypeOptions" outlined dense multiple
                            emit-value map-options />
                    </div>

                    <div class="q-mt-sm">
                        <div class="text-caption q-mb-xs">Full risk address:</div>
                        <q-input v-model="riskAddress" outlined dense type="textarea" rows="2"
                            :rules="[val => !!val || 'Risk address is required']" />
                    </div>
                </div>
            </q-card-section>
        </q-card>

        <q-card bordered class="q-mb-md">
            <q-card-section>
                <div class="text-h6 text-grey-8 q-mb-sm"> Property Maintenance & Security</div>

                <div class="q-mb-md">
                    <div class="text-subtitle2 q-mb-xs">
                        Is the Property kept and maintained in good order, repair and condition both externally and
                        internally?
                    </div>
                    <q-option-group v-model="propertyMaintained" :options="yesNoOptions" type="radio" inline />
                    <div v-if="propertyMaintained === 'no'" class="q-mt-sm">
                        <q-input v-model="propertyMaintainedDetails" label="If no, please specify" outlined dense
                            type="textarea" rows="2" />
                    </div>
                </div>

                <div class="q-mb-md">
                    <div class="text-subtitle2 q-mb-xs">
                        Is the Property fenced and/or guarded by security guard(s)?
                    </div>
                    <q-option-group v-model="propertyFenced" :options="yesNoOptions" type="radio" inline />
                    <div v-if="propertyFenced === 'yes'" class="q-mt-sm">
                        <q-input v-model="propertyFencedDetails" label="If yes, please specify" outlined dense
                            type="textarea" rows="2" />
                    </div>
                </div>

                <div class="q-mb-md">
                    <div class="text-subtitle2 q-mb-xs">
                        Is the property outfitted with safety equipment(s) (Fire Alarm, Fire Extinguishers, etc.)?
                    </div>
                    <q-option-group v-model="safetyEquipment" :options="yesNoOptions" type="radio" inline />
                    <div v-if="safetyEquipment === 'yes'" class="q-mt-sm">
                        <q-input v-model="safetyEquipmentDetails" label="If yes, please specify" outlined dense
                            type="textarea" rows="2" />
                    </div>
                </div>

                <div class="q-mb-md">
                    <div class="text-subtitle2 q-mb-xs">
                        Do you undertake any manual work away from your premise?
                    </div>
                    <q-option-group v-model="manualWorkAway" :options="yesNoOptions" type="radio" inline />
                    <div v-if="manualWorkAway === 'yes'" class="q-mt-sm">
                        <q-input v-model="manualWorkAwayDetails" label="If yes, please specify" outlined dense
                            type="textarea" rows="2" />
                    </div>
                </div>
            </q-card-section>
        </q-card>

        <q-card bordered class="q-mb-md">
            <q-card-section>
                <div class="text-h6 text-grey-8 q-mb-sm">Specific Work Details</div>

                <div class="q-mb-md">
                    <div class="text-subtitle2 q-mb-xs">
                        Does any work performed by your business involve heat or flame (welding, torches, etc.)?
                    </div>
                    <q-option-group v-model="heatWork" :options="yesNoOptions" type="radio" inline />
                    <div v-if="heatWork === 'yes'" class="q-mt-sm">
                        <q-input v-model="heatWorkDetails" label="If yes, please specify" outlined dense type="textarea"
                            rows="2" />
                    </div>
                </div>

                <div class="q-mb-md">
                    <div class="text-subtitle2 q-mb-xs">
                        Excavation, tunneling or earth moving?
                    </div>
                    <q-option-group v-model="excavationWork" :options="yesNoOptions" type="radio" inline />
                    <div v-if="excavationWork === 'yes'" class="q-mt-sm">
                        <q-input v-model="excavationWorkDetails" label="If yes, please specify" outlined dense />
                    </div>
                </div>

                <div class="q-mb-md">
                    <div class="text-subtitle2 q-mb-xs">
                        Hazardous substances (gases, chemicals, paint, asbestos or explosives)?
                    </div>
                    <q-option-group v-model="hazardousSubstances" :options="yesNoOptions" type="radio" inline />
                    <div v-if="hazardousSubstances === 'yes'" class="q-mt-sm">
                        <q-input v-model="hazardousSubstancesDetails" label="If yes, please specify" outlined dense
                            type="textarea" rows="2" />
                    </div>
                </div>

                <div class="q-mb-md">
                    <div class="text-subtitle2 q-mb-xs">
                        Any works on airport premises, refinery premises, ships?
                    </div>
                    <q-option-group v-model="specialPremisesWork" :options="yesNoOptions" type="radio" inline />
                    <div v-if="specialPremisesWork === 'yes'" class="q-mt-sm">
                        <q-input v-model="specialPremisesWorkDetails" label="If yes, please specify" outlined dense />
                    </div>
                </div>

                <div class="q-mb-md">
                    <div class="text-subtitle2 q-mb-xs">
                        Any work with machinery or rental of equipment/machinery to third parties?
                    </div>
                    <q-option-group v-model="machineryWork" :options="yesNoOptions" type="radio" inline />
                </div>

                <div v-if="machineryWork === 'yes'" class="q-mb-md">
                    <div class="text-subtitle2 q-mb-xs">
                        Give full description of Machinery and/or Equipment in use:
                    </div>
                    <q-input v-model="machineryDescription" outlined dense type="textarea" rows="3" />

                    <div class="q-mt-md">
                        <div class="text-subtitle2 q-mb-xs">
                            Are these equipments/machinery in good order and condition?
                        </div>
                        <q-option-group v-model="machineryGoodCondition" :options="yesNoOptions" type="radio" inline />
                        <div v-if="machineryGoodCondition === 'no'" class="q-mt-sm">
                            <q-input v-model="machineryConditionDetails" label="If no, please specify" outlined dense />
                        </div>
                    </div>
                </div>

                <div class="row q-col-gutter-md q-mt-md">
                    <div class="col-12 col-md-6">
                        <div class="text-subtitle2 q-mb-xs">
                            Any use of fork-lifts, cranes, lifts?
                        </div>
                        <q-option-group v-model="heavyEquipmentUse" :options="yesNoOptions" type="radio" inline />
                        <div v-if="heavyEquipmentUse === 'yes'" class="q-mt-sm">
                            <q-input v-model="heavyEquipmentDetails" label="If yes, please specify" outlined dense />
                        </div>
                    </div>

                    <div class="col-12 col-md-6">
                        <div class="text-subtitle2 q-mb-xs">
                            Any works at a height above 5 meters?
                        </div>
                        <q-option-group v-model="heightWork" :options="yesNoOptions" type="radio" inline />
                        <div v-if="heightWork === 'yes'" class="q-mt-sm">
                            <q-input v-model="heightWorkDetails" label="If yes, please specify" outlined dense />
                        </div>
                    </div>
                </div>
            </q-card-section>
        </q-card>

        <q-card bordered class="q-mb-md">
            <q-card-section>
                <div class="text-h6 text-grey-8 q-mb-sm"> Products Liability</div>
                <p>Products Liability insurance protects your business from claims related to the manufacturing or sale
                    of products or other goods in the public.
                    It also covers the manufacturer's or seller's liability for losses or injuries to a buyer caused by
                    a defect or malfunction.</p>
                <div class="q-mb-md">
                    <div class="text-subtitle2 q-mb-xs">
                        Do you wish to insure this section?
                    </div>
                    <q-option-group v-model="productsLiabilityInsure" :options="yesNoOptions" type="radio" inline
                        @update:model-value="handleProductsLiabilityChange" />
                </div>

                <div v-if="productsLiabilityInsure === 'yes'" class="q-mb-md">
                    <div class="text-subtitle2 q-mb-xs">
                        If yes, please give details of product(s) and purpose of use
                    </div>

                    <div class="bg-grey-1 q-pa-md rounded-borders">
                        <div class="text-subtitle2 q-mb-sm">Products and Purpose of use:</div>

                        <table class="full-width q-table q-table--cell-separator q-table--flat">
                            <thead>
                                <tr class="text-weight-medium">
                                    <th class="text-left" style="width: 3%">#</th>
                                    <th class="text-left" style="width: 60%">Products and Purpose of use:</th>
                                    <th class="text-center" style="width: 30%">Estimated Turnover per Product</th>
                                    <th class="text-center" style="width: 2%"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(product, index) in products" :key="index">
                                    <td class="text-right">{{ index + 1 }}.</td>
                                    <td>
                                        <q-input v-model="product.description" borderless dense type="textarea" rows="2"
                                            placeholder="Describe product and its purpose" class="full-width" />
                                    </td>
                                    <td>
                                        <div class="row justify-center items-center">
                                            <div class="col-auto q-pr-xs">AWG</div>
                                            <div class="col">
                                                <q-input v-model="product.estimatedTurnover" borderless dense
                                                    type="number" placeholder="0" class="full-width text-right" />
                                            </div>
                                        </div>
                                    </td>
                                    <td class="text-center">
                                        <q-btn v-if="products.length > 1" icon="delete" flat dense color="negative"
                                            @click="removeProduct(index)" size="xs" round />
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div class="text-right q-mt-md">
                            <q-btn icon="add" color="primary" outline @click="addProduct" size="sm"
                                label="Add Product Row" />
                        </div>
                    </div>
                </div>

                <div v-if="productsLiabilityInsure === 'yes'" class="q-mb-md">
                    <div class="text-subtitle2 q-mb-xs">
                        Please indicate in what capacity you are operating?
                    </div>
                    <q-select v-model="operatingCapacity" :options="operatingCapacityOptions" outlined dense multiple
                        emit-value map-options />
                </div>

                <div v-if="productsLiabilityInsure === 'yes'" class="q-mb-md">
                    <div class="text-subtitle2 q-mb-xs">
                        Do you supply any product(s) you do not manufacture?
                    </div>
                    <q-option-group v-model="supplyNonManufactured" :options="yesNoOptions" type="radio" inline />

                    <div v-if="supplyNonManufactured === 'yes'" class="q-mt-md">
                        <div class="text-caption q-mb-xs">
                            Do you retain the right of recovery against the manufacturers?
                        </div>
                        <q-option-group v-model="recoveryRight" :options="yesNoOptions" type="radio" inline />

                        <div class="text-caption q-mt-sm q-mb-xs">
                            Do you alter, adapt or change the form of any product which you do not manufacture?
                        </div>
                        <q-option-group v-model="alterProducts" :options="yesNoOptions" type="radio" inline />

                        <div v-if="alterProducts === 'yes'" class="q-mt-sm">
                            <q-input v-model="alterProductsDetails" label="If yes, please describe:" outlined dense
                                type="textarea" rows="2" />
                        </div>
                    </div>
                </div>

                <div v-if="productsLiabilityInsure === 'yes'" class="q-mb-md">
                    <div class="text-subtitle2 q-mb-xs">
                        Has any of the products been recalled or discontinued in the last 5 years?
                    </div>
                    <q-option-group v-model="productsRecalled" :options="yesNoOptions" type="radio" inline />
                    <div v-if="productsRecalled === 'yes'" class="q-mt-sm">
                        <q-input v-model="productsRecalledDetails" label="If yes, please give details" outlined dense
                            type="textarea" rows="3" />
                    </div>
                </div>
            </q-card-section>
        </q-card>

        <q-card bordered class="q-mb-md">
            <q-card-section>
                <div class="text-h6 text-grey-8 q-mb-sm">Food & Drinks Poisoning Extension</div>

                <div class="q-mb-md">
                    <div class="text-subtitle2 q-mb-xs">
                        If food and drinks poisoning extension is required?
                    </div>
                    <q-option-group v-model="foodPoisoningExtension" :options="yesNoOptions" type="radio" inline
                        @update:model-value="handleFoodPoisoningChange" />
                </div>

                <div v-if="foodPoisoningExtension === 'yes'" class="q-mb-md">
                    <div class="row q-col-gutter-md">
                        <div class="col-12 col-md-12">
                            <div class="text-caption q-mb-xs">
                                Is it a restaurant or snacks counter?
                            </div>
                            <q-select v-model="facilityType" :options="facilityTypeOptions" outlined dense />
                        </div>

                        <div class="col-12 col-md-6">
                            <q-input v-model="cateringEmployees" label=" Number of catering employees" outlined dense
                                type="number" />
                        </div>

                        <div class="col-12 col-md-6">
                            <q-input v-model="annualWages" label=" Annual wages of such employees (AWG)" outlined dense
                                type="number" prefix="AWG" />
                        </div>

                        <div class="col-12 col-md-6">
                            <q-input v-model="restaurantSeats" label="Number of seats in the restaurant" outlined dense
                                type="number" />
                        </div>

                        <div class="col-12 col-md-6">
                            <q-input v-model="restaurantTurnover" label="Annual turnover of restaurant (AWG)" outlined
                                dense type="number" prefix="AWG" />
                        </div>
                    </div>
                </div>
            </q-card-section>
        </q-card>

        <q-card bordered class="q-mb-md">
            <q-card-section>
                <div class="text-h6 text-grey-8 q-mb-sm">Employers Liability</div>

                <div class="q-mb-md">
                    <div class="text-subtitle2 q-mb-xs">
                        Do you wish to insure this section?
                    </div>
                    <q-option-group v-model="employersLiabilityInsure" :options="yesNoOptions" type="radio" inline
                        @update:model-value="handleEmployersLiabilityChange" />
                </div>

                <div v-if="employersLiabilityInsure === 'yes'" class="q-mb-md">
                    <div class="row q-col-gutter-md">
                        <div class="col-12 col-md-6">
                            <q-input v-model="numberOfEmployees"
                                label=" What is the number of Employees employed by your company?" outlined dense
                                type="number" />
                        </div>

                        <div class="col-12 col-md-6">
                            <q-input v-model="annualSalaries"
                                label=" What is the annual wages/salaries for the next 12 months? (AWG)" outlined dense
                                type="number" prefix="AWG" />
                        </div>
                    </div>
                </div>
            </q-card-section>
        </q-card>

        <q-card bordered class="q-mb-md">
            <q-card-section>
                <div class="text-h6 text-grey-8 q-mb-sm">Business Turnover</div>

                <div class="row q-col-gutter-md">
                    <div class="col-12 col-md-6">
                        <q-input v-model="lastYearTurnover"
                            label="Estimated turnover for the last 12 months for business described under question 5 (AWG)"
                            outlined dense type="number" prefix="AWG" />
                    </div>

                    <div class="col-12 col-md-6">
                        <q-input v-model="nextYearTurnover"
                            label="Estimated turnover for the next 12 months for business described under question 5 (AWG)"
                            outlined dense type="number" prefix="AWG" />
                    </div>

                    <div v-if="productsLiabilityInsure === 'yes'" class="col-12 col-md-6">
                        <q-input v-model="lastYearProductsTurnover"
                            label="Estimated turnover for the last 12 months for business described under question 12 (AWG)"
                            outlined dense type="number" prefix="AWG" />
                    </div>

                    <div v-if="productsLiabilityInsure === 'yes'" class="col-12 col-md-6">
                        <q-input v-model="nextYearProductsTurnover"
                            label="Estimated turnover for the next 12 months for business described under question 12 (AWG)"
                            outlined dense type="number" prefix="AWG" />
                    </div>
                </div>
            </q-card-section>
        </q-card>

        <q-card bordered class="q-mb-md">
            <q-card-section>
                <div class="text-h6 text-grey-8 q-mb-sm">Claims History</div>

                <div class="q-mb-md">
                    <div class="text-subtitle2 q-mb-xs">
                        Have any claims been made against you in the last five years in respect of accidents
                        occurring on or about the premises?
                    </div>
                    <q-option-group v-model="previousClaims" :options="yesNoOptions" type="radio" inline />
                    <div v-if="previousClaims === 'yes'" class="q-mt-sm">
                        <q-input v-model="previousClaimsDetails" label="If yes, give full particulars" outlined dense
                            type="textarea" rows="3" />
                    </div>
                </div>

                <div class="q-mb-md">
                    <div class="text-subtitle2 q-mb-xs">
                        Has any Company:
                    </div>
                    <div class="row q-col-gutter-md">
                        <div class="col-12 col-md-6">
                            <div class="text-caption q-mb-xs">declined your proposal?</div>
                            <q-option-group v-model="proposalDeclined" :options="yesNoOptions" type="radio" inline />
                            <div v-if="proposalDeclined === 'yes'" class="q-mt-xs">
                                <q-input v-model="proposalDeclinedDetails" label="If yes, give details" outlined
                                    dense />
                            </div>
                        </div>

                        <div class="col-12 col-md-6">
                            <div class="text-caption q-mb-xs"> refused to renew your policy?</div>
                            <q-option-group v-model="policyNotRenewed" :options="yesNoOptions" type="radio" inline />
                            <div v-if="policyNotRenewed === 'yes'" class="q-mt-xs">
                                <q-input v-model="policyNotRenewedDetails" label="If yes, give details" outlined
                                    dense />
                            </div>
                        </div>

                        <div class="col-12 col-md-6">
                            <div class="text-caption q-mb-xs">demanded an increased rate on renewal?</div>
                            <q-option-group v-model="increasedRateDemanded" :options="yesNoOptions" type="radio"
                                inline />
                            <div v-if="increasedRateDemanded === 'yes'" class="q-mt-xs">
                                <q-input v-model="increasedRateDemandedDetails" label="If yes, give details" outlined
                                    dense />
                            </div>
                        </div>

                        <div class="col-12 col-md-6">
                            <div class="text-caption q-mb-xs">cancelled any of your policy?</div>
                            <q-option-group v-model="policyCancelled" :options="yesNoOptions" type="radio" inline />
                            <div v-if="policyCancelled === 'yes'" class="q-mt-xs">
                                <q-input v-model="policyCancelledDetails" label="If yes, give details" outlined dense />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="q-mb-md">
                    <div class="text-subtitle2 q-mb-xs">
                        Have you received any notice from any person or authority regarding any defect in any of the
                        properties and/or products?
                    </div>
                    <q-option-group v-model="defectNotices" :options="yesNoOptions" type="radio" inline />
                    <div v-if="defectNotices === 'yes'" class="q-mt-sm">
                        <q-input v-model="defectNoticesDetails" label="If yes, give full particulars" outlined dense
                            type="textarea" rows="3" />
                    </div>
                </div>
            </q-card-section>
        </q-card>

        <q-card bordered class="q-mb-md">
            <q-card-section>
                <div class="text-h6 text-grey-8 q-mb-sm"> Indemnity Amount / Sum Insured</div>

                <div class="row q-col-gutter-md">
                    <div class="col-12 col-md-4">
                        <q-input v-model="publicLiabilityAmount"
                            label="a) Public Liability per occurrence/annual aggregate (AWG)" outlined dense
                            type="number" prefix="AWG" :rules="[val => val > 0 || 'Amount must be greater than 0']" />
                    </div>

                    <div v-if="employersLiabilityInsure === 'yes'" class="col-12 col-md-4">
                        <q-input v-model="employersLiabilityAmount" label="b) Employers Liability (AWG)" outlined dense
                            type="number" prefix="AWG" :rules="[val => val > 0 || 'Amount must be greater than 0']" />
                    </div>

                    <div v-if="productsLiabilityInsure === 'yes'" class="col-12 col-md-4">
                        <q-input v-model="productsLiabilityAmount" label="c) Products Liability (AWG)" outlined dense
                            type="number" prefix="AWG" :rules="[val => val > 0 || 'Amount must be greater than 0']" />
                    </div>
                </div>
            </q-card-section>
        </q-card>

        <q-card bordered class="q-mb-md">
            <q-card-section>
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
        <FormResetButton class="q-mt-lg text-center" :resetFunction="handleFormReset" label="Reset all" color="negative"
            icon="cleaning_services" :btnClass="'q-ml-md'" :title="'Reset Formulary the Public Liability'"
            :message="'Are you sure you want to reset all the form data? All the information entered will be lost.'"
            :notificationMessage="'Public Liability form successfully restarted'" />
    </div>
</template>

<script setup>
import { ref, computed, watch, defineEmits, defineExpose, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import FormResetButton from '/src/components/FormResetButton.vue'

const $q = useQuasar()
const emit = defineEmits(['validation-changed', 'form-submitted', 'close-form'])

const submitting = ref(false)

const coverType = ref(['public'])
const businessOperations = ref('')
const insuringAs = ref('owner')
const premisesType = ref([])
const riskAddress = ref('')
const propertyMaintained = ref('yes')
const propertyMaintainedDetails = ref('')
const propertyFenced = ref('no')
const propertyFencedDetails = ref('')
const safetyEquipment = ref('yes')
const safetyEquipmentDetails = ref('')
const manualWorkAway = ref('no')
const manualWorkAwayDetails = ref('')
const heatWork = ref('no')
const heatWorkDetails = ref('')
const excavationWork = ref('no')
const excavationWorkDetails = ref('')
const hazardousSubstances = ref('no')
const hazardousSubstancesDetails = ref('')
const specialPremisesWork = ref('no')
const specialPremisesWorkDetails = ref('')
const machineryWork = ref('no')
const machineryDescription = ref('')
const machineryGoodCondition = ref('yes')
const machineryConditionDetails = ref('')
const heavyEquipmentUse = ref('no')
const heavyEquipmentDetails = ref('')
const heightWork = ref('no')
const heightWorkDetails = ref('')
const productsLiabilityInsure = ref('no')
const products = ref([{ description: '', estimatedTurnover: 0 }])
const operatingCapacity = ref([])
const supplyNonManufactured = ref('no')
const recoveryRight = ref('no')
const alterProducts = ref('no')
const alterProductsDetails = ref('')
const productsRecalled = ref('no')
const productsRecalledDetails = ref('')
const foodPoisoningExtension = ref('no')
const facilityType = ref('restaurant')
const cateringEmployees = ref(0)
const annualWages = ref(0)
const restaurantSeats = ref(0)
const restaurantTurnover = ref(0)
const employersLiabilityInsure = ref('no')
const numberOfEmployees = ref(0)
const annualSalaries = ref(0)
const lastYearTurnover = ref(0)
const nextYearTurnover = ref(0)
const lastYearProductsTurnover = ref(0)
const nextYearProductsTurnover = ref(0)
const previousClaims = ref('no')
const previousClaimsDetails = ref('')
const proposalDeclined = ref('no')
const proposalDeclinedDetails = ref('')
const policyNotRenewed = ref('no')
const policyNotRenewedDetails = ref('')
const increasedRateDemanded = ref('no')
const increasedRateDemandedDetails = ref('')
const policyCancelled = ref('no')
const policyCancelledDetails = ref('')
const defectNotices = ref('no')
const defectNoticesDetails = ref('')
const publicLiabilityAmount = ref(0)
const employersLiabilityAmount = ref(0)
const productsLiabilityAmount = ref(0)
const declarationPlace = ref('Aruba')
const declarationDate = ref(new Date().toISOString().split('T')[0])
const proposerSignature = ref('')

const coverTypeOptions = [
    { label: 'Public Liability', value: 'public' },
    { label: 'Employers Liability', value: 'employers' },
    { label: 'Products Liability', value: 'products' }
]

const insuringAsOptions = [
    { label: 'Owner', value: 'owner' },
    { label: 'Tenant', value: 'tenant' },
    { label: 'Trustee of the property', value: 'trustee' }
]

const premisesTypeOptions = [
    { label: 'Rented Home or Condominium Unit', value: 'rented_home' },
    { label: 'Office', value: 'office' },
    { label: 'Retail Store', value: 'retail' },
    { label: 'Hotel', value: 'hotel' },
    { label: 'Warehouse', value: 'warehouse' },
    { label: 'Other', value: 'other' }
]

const yesNoOptions = [
    { label: 'YES', value: 'yes' },
    { label: 'NO', value: 'no' }
]

const operatingCapacityOptions = [
    { label: 'Manufacturer', value: 'manufacturer' },
    { label: 'Wholesaler', value: 'wholesaler' },
    { label: 'Importer', value: 'importer' },
    { label: 'Retailer', value: 'retailer' }
]

const facilityTypeOptions = [
    { label: 'Restaurant', value: 'restaurant' },
    { label: 'Snacks Counter', value: 'snacks_counter' }
]

const isFormValid = computed(() => {
    const basicFieldsValid = businessOperations.value &&
        riskAddress.value &&
        publicLiabilityAmount.value > 0 &&
        declarationPlace.value &&
        declarationDate.value &&
        proposerSignature.value

    if (!basicFieldsValid) return false

    if (productsLiabilityInsure.value === 'yes') {
        if (productsLiabilityAmount.value <= 0) return false

        const hasValidProduct = products.value.some(product =>
            product.description && product.description.trim() !== ''
        )
        if (!hasValidProduct) return false

        if (alterProducts.value === 'yes' && !alterProductsDetails.value) return false
        if (productsRecalled.value === 'yes' && !productsRecalledDetails.value) return false
    }

    if (employersLiabilityInsure.value === 'yes') {
        if (employersLiabilityAmount.value <= 0 ||
            numberOfEmployees.value <= 0 ||
            annualSalaries.value <= 0) {
            return false
        }
    }

    if (foodPoisoningExtension.value === 'yes') {
        if (!facilityType.value ||
            cateringEmployees.value < 0 ||
            annualWages.value < 0 ||
            restaurantSeats.value < 0 ||
            restaurantTurnover.value < 0) {
            return false
        }
    }

    if (propertyMaintained.value === 'no' && !propertyMaintainedDetails.value) return false
    if (propertyFenced.value === 'yes' && !propertyFencedDetails.value) return false
    if (safetyEquipment.value === 'yes' && !safetyEquipmentDetails.value) return false
    if (manualWorkAway.value === 'yes' && !manualWorkAwayDetails.value) return false
    if (heatWork.value === 'yes' && !heatWorkDetails.value) return false
    if (excavationWork.value === 'yes' && !excavationWorkDetails.value) return false
    if (hazardousSubstances.value === 'yes' && !hazardousSubstancesDetails.value) return false
    if (specialPremisesWork.value === 'yes' && !specialPremisesWorkDetails.value) return false
    if (machineryWork.value === 'yes') {
        if (!machineryDescription.value) return false
        if (machineryGoodCondition.value === 'no' && !machineryConditionDetails.value) return false
    }
    if (heavyEquipmentUse.value === 'yes' && !heavyEquipmentDetails.value) return false
    if (heightWork.value === 'yes' && !heightWorkDetails.value) return false
    if (previousClaims.value === 'yes' && !previousClaimsDetails.value) return false
    if (proposalDeclined.value === 'yes' && !proposalDeclinedDetails.value) return false
    if (policyNotRenewed.value === 'yes' && !policyNotRenewedDetails.value) return false
    if (increasedRateDemanded.value === 'yes' && !increasedRateDemandedDetails.value) return false
    if (policyCancelled.value === 'yes' && !policyCancelledDetails.value) return false
    if (defectNotices.value === 'yes' && !defectNoticesDetails.value) return false

    return true
})

const addProduct = () => {
    products.value.push({ description: '', estimatedTurnover: 0 })
}

const removeProduct = (index) => {
    if (products.value.length > 1) {
        products.value.splice(index, 1)
    }
}

const handleProductsLiabilityChange = (value) => {
    if (value === 'no') {
        products.value = [{ description: '', estimatedTurnover: 0 }]
        operatingCapacity.value = []
        supplyNonManufactured.value = 'no'
        recoveryRight.value = 'no'
        alterProducts.value = 'no'
        alterProductsDetails.value = ''
        productsRecalled.value = 'no'
        productsRecalledDetails.value = ''
        lastYearProductsTurnover.value = 0
        nextYearProductsTurnover.value = 0
        productsLiabilityAmount.value = 0
    }
}

const handleFoodPoisoningChange = (value) => {
    if (value === 'no') {
        facilityType.value = 'restaurant'
        cateringEmployees.value = 0
        annualWages.value = 0
        restaurantSeats.value = 0
        restaurantTurnover.value = 0
    }
}

const handleEmployersLiabilityChange = (value) => {
    if (value === 'no') {
        numberOfEmployees.value = 0
        annualSalaries.value = 0
        employersLiabilityAmount.value = 0
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
            coverType: [...coverType.value],
            businessOperations: businessOperations.value,
            insuringAs: insuringAs.value,
            premisesType: [...premisesType.value],
            riskAddress: riskAddress.value,
            propertyMaintained: propertyMaintained.value,
            propertyMaintainedDetails: propertyMaintainedDetails.value,
            propertyFenced: propertyFenced.value,
            propertyFencedDetails: propertyFencedDetails.value,
            safetyEquipment: safetyEquipment.value,
            safetyEquipmentDetails: safetyEquipmentDetails.value,
            manualWorkAway: manualWorkAway.value,
            manualWorkAwayDetails: manualWorkAwayDetails.value,
            heatWork: heatWork.value,
            heatWorkDetails: heatWorkDetails.value,
            excavationWork: excavationWork.value,
            excavationWorkDetails: excavationWorkDetails.value,
            hazardousSubstances: hazardousSubstances.value,
            hazardousSubstancesDetails: hazardousSubstancesDetails.value,
            specialPremisesWork: specialPremisesWork.value,
            specialPremisesWorkDetails: specialPremisesWorkDetails.value,
            machineryWork: machineryWork.value,
            machineryDescription: machineryDescription.value,
            machineryGoodCondition: machineryGoodCondition.value,
            machineryConditionDetails: machineryConditionDetails.value,
            heavyEquipmentUse: heavyEquipmentUse.value,
            heavyEquipmentDetails: heavyEquipmentDetails.value,
            heightWork: heightWork.value,
            heightWorkDetails: heightWorkDetails.value,
            productsLiabilityInsure: productsLiabilityInsure.value,
            products: [...products.value],
            operatingCapacity: [...operatingCapacity.value],
            supplyNonManufactured: supplyNonManufactured.value,
            recoveryRight: recoveryRight.value,
            alterProducts: alterProducts.value,
            alterProductsDetails: alterProductsDetails.value,
            productsRecalled: productsRecalled.value,
            productsRecalledDetails: productsRecalledDetails.value,
            foodPoisoningExtension: foodPoisoningExtension.value,
            facilityType: facilityType.value,
            cateringEmployees: cateringEmployees.value,
            annualWages: annualWages.value,
            restaurantSeats: restaurantSeats.value,
            restaurantTurnover: restaurantTurnover.value,
            employersLiabilityInsure: employersLiabilityInsure.value,
            numberOfEmployees: numberOfEmployees.value,
            annualSalaries: annualSalaries.value,
            lastYearTurnover: lastYearTurnover.value,
            nextYearTurnover: nextYearTurnover.value,
            lastYearProductsTurnover: lastYearProductsTurnover.value,
            nextYearProductsTurnover: nextYearProductsTurnover.value,
            previousClaims: previousClaims.value,
            previousClaimsDetails: previousClaimsDetails.value,
            proposalDeclined: proposalDeclined.value,
            proposalDeclinedDetails: proposalDeclinedDetails.value,
            policyNotRenewed: policyNotRenewed.value,
            policyNotRenewedDetails: policyNotRenewedDetails.value,
            increasedRateDemanded: increasedRateDemanded.value,
            increasedRateDemandedDetails: increasedRateDemandedDetails.value,
            policyCancelled: policyCancelled.value,
            policyCancelledDetails: policyCancelledDetails.value,
            defectNotices: defectNotices.value,
            defectNoticesDetails: defectNoticesDetails.value,
            publicLiabilityAmount: publicLiabilityAmount.value,
            employersLiabilityAmount: employersLiabilityAmount.value,
            productsLiabilityAmount: productsLiabilityAmount.value,
            declarationPlace: declarationPlace.value,
            declarationDate: declarationDate.value,
            proposerSignature: proposerSignature.value,
            timestamp: new Date().toISOString(),
            formType: 'PublicLiability'
        }

        $q.notify({
            type: 'positive',
            message: 'Public Liability proposal submitted successfully!',
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

const handleFormReset = () => {
    return new Promise((resolve) => {
        coverType.value = ['public']
        businessOperations.value = ''
        insuringAs.value = 'owner'
        premisesType.value = []
        riskAddress.value = ''
        propertyMaintained.value = 'yes'
        propertyMaintainedDetails.value = ''
        propertyFenced.value = 'no'
        propertyFencedDetails.value = ''
        safetyEquipment.value = 'yes'
        safetyEquipmentDetails.value = ''
        manualWorkAway.value = 'no'
        manualWorkAwayDetails.value = ''
        heatWork.value = 'no'
        heatWorkDetails.value = ''
        excavationWork.value = 'no'
        excavationWorkDetails.value = ''
        hazardousSubstances.value = 'no'
        hazardousSubstancesDetails.value = ''
        specialPremisesWork.value = 'no'
        specialPremisesWorkDetails.value = ''
        machineryWork.value = 'no'
        machineryDescription.value = ''
        machineryGoodCondition.value = 'yes'
        machineryConditionDetails.value = ''
        heavyEquipmentUse.value = 'no'
        heavyEquipmentDetails.value = ''
        heightWork.value = 'no'
        heightWorkDetails.value = ''
        productsLiabilityInsure.value = 'no'
        products.value = [{ description: '', estimatedTurnover: 0 }]
        operatingCapacity.value = []
        supplyNonManufactured.value = 'no'
        recoveryRight.value = 'no'
        alterProducts.value = 'no'
        alterProductsDetails.value = ''
        productsRecalled.value = 'no'
        productsRecalledDetails.value = ''
        foodPoisoningExtension.value = 'no'
        facilityType.value = 'restaurant'
        cateringEmployees.value = 0
        annualWages.value = 0
        restaurantSeats.value = 0
        restaurantTurnover.value = 0
        employersLiabilityInsure.value = 'no'
        numberOfEmployees.value = 0
        annualSalaries.value = 0
        lastYearTurnover.value = 0
        nextYearTurnover.value = 0
        lastYearProductsTurnover.value = 0
        nextYearProductsTurnover.value = 0
        previousClaims.value = 'no'
        previousClaimsDetails.value = ''
        proposalDeclined.value = 'no'
        proposalDeclinedDetails.value = ''
        policyNotRenewed.value = 'no'
        policyNotRenewedDetails.value = ''
        increasedRateDemanded.value = 'no'
        increasedRateDemandedDetails.value = ''
        policyCancelled.value = 'no'
        policyCancelledDetails.value = ''
        defectNotices.value = 'no'
        defectNoticesDetails.value = ''
        publicLiabilityAmount.value = 0
        employersLiabilityAmount.value = 0
        productsLiabilityAmount.value = 0
        declarationPlace.value = 'Aruba'
        declarationDate.value = new Date().toISOString().split('T')[0]
        proposerSignature.value = ''

        resolve()
    })
}
const resetForm = () => {
    handleFormReset()

    $q.notify({
        type: 'info',
        message: 'Form has been reset',
        position: 'top',
        timeout: 1000
    })
}

const loadDraft = () => {
    const draft = localStorage.getItem('public_liability_draft')
    if (draft) {
        try {
            const draftData = JSON.parse(draft)

            if (draftData.formData) {
                const data = draftData.formData

                if (data.coverType) coverType.value = [...data.coverType]
                if (data.businessOperations !== undefined) businessOperations.value = data.businessOperations
                if (data.insuringAs !== undefined) insuringAs.value = data.insuringAs
                if (data.premisesType) premisesType.value = [...data.premisesType]
                if (data.riskAddress !== undefined) riskAddress.value = data.riskAddress
                if (data.propertyMaintained !== undefined) propertyMaintained.value = data.propertyMaintained
                if (data.propertyMaintainedDetails !== undefined) propertyMaintainedDetails.value = data.propertyMaintainedDetails
                if (data.propertyFenced !== undefined) propertyFenced.value = data.propertyFenced
                if (data.propertyFencedDetails !== undefined) propertyFencedDetails.value = data.propertyFencedDetails
                if (data.safetyEquipment !== undefined) safetyEquipment.value = data.safetyEquipment
                if (data.safetyEquipmentDetails !== undefined) safetyEquipmentDetails.value = data.safetyEquipmentDetails
                if (data.manualWorkAway !== undefined) manualWorkAway.value = data.manualWorkAway
                if (data.manualWorkAwayDetails !== undefined) manualWorkAwayDetails.value = data.manualWorkAwayDetails
                if (data.heatWork !== undefined) heatWork.value = data.heatWork
                if (data.heatWorkDetails !== undefined) heatWorkDetails.value = data.heatWorkDetails
                if (data.excavationWork !== undefined) excavationWork.value = data.excavationWork
                if (data.excavationWorkDetails !== undefined) excavationWorkDetails.value = data.excavationWorkDetails
                if (data.hazardousSubstances !== undefined) hazardousSubstances.value = data.hazardousSubstances
                if (data.hazardousSubstancesDetails !== undefined) hazardousSubstancesDetails.value = data.hazardousSubstancesDetails
                if (data.specialPremisesWork !== undefined) specialPremisesWork.value = data.specialPremisesWork
                if (data.specialPremisesWorkDetails !== undefined) specialPremisesWorkDetails.value = data.specialPremisesWorkDetails
                if (data.machineryWork !== undefined) machineryWork.value = data.machineryWork
                if (data.machineryDescription !== undefined) machineryDescription.value = data.machineryDescription
                if (data.machineryGoodCondition !== undefined) machineryGoodCondition.value = data.machineryGoodCondition
                if (data.machineryConditionDetails !== undefined) machineryConditionDetails.value = data.machineryConditionDetails
                if (data.heavyEquipmentUse !== undefined) heavyEquipmentUse.value = data.heavyEquipmentUse
                if (data.heavyEquipmentDetails !== undefined) heavyEquipmentDetails.value = data.heavyEquipmentDetails
                if (data.heightWork !== undefined) heightWork.value = data.heightWork
                if (data.heightWorkDetails !== undefined) heightWorkDetails.value = data.heightWorkDetails
                if (data.productsLiabilityInsure !== undefined) productsLiabilityInsure.value = data.productsLiabilityInsure
                if (data.operatingCapacity) operatingCapacity.value = [...data.operatingCapacity]
                if (data.supplyNonManufactured !== undefined) supplyNonManufactured.value = data.supplyNonManufactured
                if (data.recoveryRight !== undefined) recoveryRight.value = data.recoveryRight
                if (data.alterProducts !== undefined) alterProducts.value = data.alterProducts
                if (data.alterProductsDetails !== undefined) alterProductsDetails.value = data.alterProductsDetails
                if (data.productsRecalled !== undefined) productsRecalled.value = data.productsRecalled
                if (data.productsRecalledDetails !== undefined) productsRecalledDetails.value = data.productsRecalledDetails
                if (data.foodPoisoningExtension !== undefined) foodPoisoningExtension.value = data.foodPoisoningExtension
                if (data.facilityType !== undefined) facilityType.value = data.facilityType
                if (data.cateringEmployees !== undefined) cateringEmployees.value = data.cateringEmployees
                if (data.annualWages !== undefined) annualWages.value = data.annualWages
                if (data.restaurantSeats !== undefined) restaurantSeats.value = data.restaurantSeats
                if (data.restaurantTurnover !== undefined) restaurantTurnover.value = data.restaurantTurnover
                if (data.employersLiabilityInsure !== undefined) employersLiabilityInsure.value = data.employersLiabilityInsure
                if (data.numberOfEmployees !== undefined) numberOfEmployees.value = data.numberOfEmployees
                if (data.annualSalaries !== undefined) annualSalaries.value = data.annualSalaries
                if (data.lastYearTurnover !== undefined) lastYearTurnover.value = data.lastYearTurnover
                if (data.nextYearTurnover !== undefined) nextYearTurnover.value = data.nextYearTurnover
                if (data.lastYearProductsTurnover !== undefined) lastYearProductsTurnover.value = data.lastYearProductsTurnover
                if (data.nextYearProductsTurnover !== undefined) nextYearProductsTurnover.value = data.nextYearProductsTurnover
                if (data.previousClaims !== undefined) previousClaims.value = data.previousClaims
                if (data.previousClaimsDetails !== undefined) previousClaimsDetails.value = data.previousClaimsDetails
                if (data.proposalDeclined !== undefined) proposalDeclined.value = data.proposalDeclined
                if (data.proposalDeclinedDetails !== undefined) proposalDeclinedDetails.value = data.proposalDeclinedDetails
                if (data.policyNotRenewed !== undefined) policyNotRenewed.value = data.policyNotRenewed
                if (data.policyNotRenewedDetails !== undefined) policyNotRenewedDetails.value = data.policyNotRenewedDetails
                if (data.increasedRateDemanded !== undefined) increasedRateDemanded.value = data.increasedRateDemanded
                if (data.increasedRateDemandedDetails !== undefined) increasedRateDemandedDetails.value = data.increasedRateDemandedDetails
                if (data.policyCancelled !== undefined) policyCancelled.value = data.policyCancelled
                if (data.policyCancelledDetails !== undefined) policyCancelledDetails.value = data.policyCancelledDetails
                if (data.defectNotices !== undefined) defectNotices.value = data.defectNotices
                if (data.defectNoticesDetails !== undefined) defectNoticesDetails.value = data.defectNoticesDetails
                if (data.publicLiabilityAmount !== undefined) publicLiabilityAmount.value = data.publicLiabilityAmount
                if (data.employersLiabilityAmount !== undefined) employersLiabilityAmount.value = data.employersLiabilityAmount
                if (data.productsLiabilityAmount !== undefined) productsLiabilityAmount.value = data.productsLiabilityAmount
                if (data.declarationPlace !== undefined) declarationPlace.value = data.declarationPlace
                if (data.declarationDate !== undefined) declarationDate.value = data.declarationDate
                if (data.proposerSignature !== undefined) proposerSignature.value = data.proposerSignature

                if (draftData.products && Array.isArray(draftData.products)) {
                    products.value = [...draftData.products]
                } else if (data.products && Array.isArray(data.products)) {
                    products.value = [...data.products]
                }
            } else if (draftData.coverType !== undefined) {
                if (draftData.coverType !== undefined) coverType.value = [...draftData.coverType]
                if (draftData.businessOperations !== undefined) businessOperations.value = draftData.businessOperations
                if (draftData.insuringAs !== undefined) insuringAs.value = draftData.insuringAs
                if (draftData.premisesType !== undefined) premisesType.value = [...draftData.premisesType]
                if (draftData.riskAddress !== undefined) riskAddress.value = draftData.riskAddress
            }
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
})

defineExpose({
    validate: () => isFormValid.value,
    getFormData: () => ({
        coverType: [...coverType.value],
        businessOperations: businessOperations.value,
        insuringAs: insuringAs.value,
        premisesType: [...premisesType.value],
        riskAddress: riskAddress.value,
        propertyMaintained: propertyMaintained.value,
        propertyMaintainedDetails: propertyMaintainedDetails.value,
        propertyFenced: propertyFenced.value,
        propertyFencedDetails: propertyFencedDetails.value,
        safetyEquipment: safetyEquipment.value,
        safetyEquipmentDetails: safetyEquipmentDetails.value,
        manualWorkAway: manualWorkAway.value,
        manualWorkAwayDetails: manualWorkAwayDetails.value,
        heatWork: heatWork.value,
        heatWorkDetails: heatWorkDetails.value,
        excavationWork: excavationWork.value,
        excavationWorkDetails: excavationWorkDetails.value,
        hazardousSubstances: hazardousSubstances.value,
        hazardousSubstancesDetails: hazardousSubstancesDetails.value,
        specialPremisesWork: specialPremisesWork.value,
        specialPremisesWorkDetails: specialPremisesWorkDetails.value,
        machineryWork: machineryWork.value,
        machineryDescription: machineryDescription.value,
        machineryGoodCondition: machineryGoodCondition.value,
        machineryConditionDetails: machineryConditionDetails.value,
        heavyEquipmentUse: heavyEquipmentUse.value,
        heavyEquipmentDetails: heavyEquipmentDetails.value,
        heightWork: heightWork.value,
        heightWorkDetails: heightWorkDetails.value,
        productsLiabilityInsure: productsLiabilityInsure.value,
        products: [...products.value],
        operatingCapacity: [...operatingCapacity.value],
        supplyNonManufactured: supplyNonManufactured.value,
        recoveryRight: recoveryRight.value,
        alterProducts: alterProducts.value,
        alterProductsDetails: alterProductsDetails.value,
        productsRecalled: productsRecalled.value,
        productsRecalledDetails: productsRecalledDetails.value,
        foodPoisoningExtension: foodPoisoningExtension.value,
        facilityType: facilityType.value,
        cateringEmployees: cateringEmployees.value,
        annualWages: annualWages.value,
        restaurantSeats: restaurantSeats.value,
        restaurantTurnover: restaurantTurnover.value,
        employersLiabilityInsure: employersLiabilityInsure.value,
        numberOfEmployees: numberOfEmployees.value,
        annualSalaries: annualSalaries.value,
        lastYearTurnover: lastYearTurnover.value,
        nextYearTurnover: nextYearTurnover.value,
        lastYearProductsTurnover: lastYearProductsTurnover.value,
        nextYearProductsTurnover: nextYearProductsTurnover.value,
        previousClaims: previousClaims.value,
        previousClaimsDetails: previousClaimsDetails.value,
        proposalDeclined: proposalDeclined.value,
        proposalDeclinedDetails: proposalDeclinedDetails.value,
        policyNotRenewed: policyNotRenewed.value,
        policyNotRenewedDetails: policyNotRenewedDetails.value,
        increasedRateDemanded: increasedRateDemanded.value,
        increasedRateDemandedDetails: increasedRateDemandedDetails.value,
        policyCancelled: policyCancelled.value,
        policyCancelledDetails: policyCancelledDetails.value,
        defectNotices: defectNotices.value,
        defectNoticesDetails: defectNoticesDetails.value,
        publicLiabilityAmount: publicLiabilityAmount.value,
        employersLiabilityAmount: employersLiabilityAmount.value,
        productsLiabilityAmount: productsLiabilityAmount.value,
        declarationPlace: declarationPlace.value,
        declarationDate: declarationDate.value,
        proposerSignature: proposerSignature.value,
        timestamp: new Date().toISOString(),
        formType: 'PublicLiability'
    }),
    resetForm: resetForm,
    submitForm: submitForm,
    isFormValid: isFormValid.value,
    formData: {
        coverType,
        businessOperations,
        insuringAs,
        premisesType,
        riskAddress,
        propertyMaintained,
        propertyMaintainedDetails,
        propertyFenced,
        propertyFencedDetails,
        safetyEquipment,
        safetyEquipmentDetails,
        manualWorkAway,
        manualWorkAwayDetails,
        heatWork,
        heatWorkDetails,
        excavationWork,
        excavationWorkDetails,
        hazardousSubstances,
        hazardousSubstancesDetails,
        specialPremisesWork,
        specialPremisesWorkDetails,
        machineryWork,
        machineryDescription,
        machineryGoodCondition,
        machineryConditionDetails,
        heavyEquipmentUse,
        heavyEquipmentDetails,
        heightWork,
        heightWorkDetails,
        productsLiabilityInsure,
        products,
        operatingCapacity,
        supplyNonManufactured,
        recoveryRight,
        alterProducts,
        alterProductsDetails,
        productsRecalled,
        productsRecalledDetails,
        foodPoisoningExtension,
        facilityType,
        cateringEmployees,
        annualWages,
        restaurantSeats,
        restaurantTurnover,
        employersLiabilityInsure,
        numberOfEmployees,
        annualSalaries,
        lastYearTurnover,
        nextYearTurnover,
        lastYearProductsTurnover,
        nextYearProductsTurnover,
        previousClaims,
        previousClaimsDetails,
        proposalDeclined,
        proposalDeclinedDetails,
        policyNotRenewed,
        policyNotRenewedDetails,
        increasedRateDemanded,
        increasedRateDemandedDetails,
        policyCancelled,
        policyCancelledDetails,
        defectNotices,
        defectNoticesDetails,
        publicLiabilityAmount,
        employersLiabilityAmount,
        productsLiabilityAmount,
        declarationPlace,
        declarationDate,
        proposerSignature
    }
})
</script>
<style scoped>
.public-liability-form {
    max-width: 1200px;
    margin: 0 auto;
}

.rounded-borders {
    border-radius: 8px;
}

.border-grey {
    border: 1px solid #e0e0e0;
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

.border-bottom-grey {
    border-bottom: 1px solid #e0e0e0;
}

.rounded-borders {
    border-radius: 4px;
}

.bg-grey-1 {
    background-color: #f5f5f5;
}

.text-weight-medium {
    font-weight: 500;
}

.bg-white {
    background-color: white;
}
</style>