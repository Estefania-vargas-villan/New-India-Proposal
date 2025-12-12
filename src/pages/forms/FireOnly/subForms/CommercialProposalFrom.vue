<template>
    <div>
        <div class="text-center q-mb-md">
            <div class="text-h5 text-primary q-mb-md text-center">COMMERCIAL PROPOSAL FORM FOR FIRE, BURGLARY, BUSINESS
                INTERRUPTION & PLATE GLASS</div>
            <div class="text-subtitle1  q-mb-sm">
                The questions in this form are material to underwriting your proposal and we expect that you answer them
                fully and honestly.
                Failure to do so may invalidate your Insurance & may have a bearing on any liability arising out of this
                contract.
                A specimen copy of the relevant Policy Clause is available on request which you should read before
                filling up this form.
                The property is not covered until the risk is accepted by the Company.
            </div>
        </div>

        <q-card bordered class="q-mb-md">
            <q-card-section>
                <div class="text-h6 text-grey-8 q-mb-sm">Location of Premises Proposed for Insurance</div>
                <div class="q-mb-md">
                    <div class="text-subtitle2 q-mb-xs">Situation:</div>
                    <q-input v-model="premisesAddress"
                        label="Give full address, i.e. name of building, street, town, etc. *" outlined dense
                        type="textarea" rows="3" :rules="[val => !!val || 'Premises address is required']" />
                    <div class="text-caption text-grey">
                        (Any change of location after the Proposal is submitted, must be brought to the notice of the
                        Insurance Company immediately).
                    </div>
                </div>

                <div class="text-subtitle2 q-mb-sm">Occupation of the entire building:</div>

                <div class="q-mb-md">
                    <div class="text-caption q-mb-xs">Are you insuring as owner or tenant of the property? *</div>
                    <q-option-group v-model="insuringAs" :options="insuringAsOptions" type="radio" inline
                        :rules="[val => !!val || 'Please select owner or tenant']" />
                </div>

                <div class="q-mb-md">
                    <div class="text-caption q-mb-xs">Used for: *</div>
                    <q-select v-model="premisesUse" :options="premisesUseOptions" outlined dense multiple emit-value
                        map-options :rules="[val => val.length > 0 || 'Please select premises use']" />
                    <div class="text-caption text-grey">
                        (Your premises can be an Office, Workshop, Clinic, Hospital, School, Shop, Store, Factory,
                        Warehouse, Restaurant, Hotel, Bar or a multi Commercial occupancy etc.)
                    </div>
                </div>

                <div class="q-mb-md">
                    <q-input v-model="goodsStored"
                        label=" If used as a Store / Shop or a Warehouse, please state the nature of goods stored"
                        outlined dense type="textarea" rows="2" />
                </div>

                <div class="q-mb-md">
                    <q-input v-model="manufacturingProcesses"
                        label=" If used as factory / workshop / manufacturing give details of the processes carried out"
                        outlined dense type="textarea" rows="2" />
                </div>

                <div class="q-mb-md">
                    <div class="text-caption q-mb-xs">
                        Does your business involve use / storage of hazardous materials like bulk oils, paints, fuel,
                        acids, gases, chemicals, or any other hazardous material?
                    </div>
                    <q-option-group v-model="hazardousMaterials" :options="yesNoOptions" type="radio" inline
                        @update:model-value="val => val === 'no' ? hazardousMaterialsDetails = '' : null" />
                    <div v-if="hazardousMaterials === 'yes'" class="q-mt-sm">
                        <q-input v-model="hazardousMaterialsDetails"
                            label="if yes, please then specify the material and the quantity stored / used *" outlined
                            dense type="textarea" rows="2" :rules="[val => !!val || 'Details are required']" />
                    </div>
                </div>

                <div class="q-mb-md">
                    <div class="text-caption q-mb-xs">
                        Does your business involve any activity like welding material or use of explosives?
                    </div>
                    <q-option-group v-model="hazardousActivities" :options="yesNoOptions" type="radio" inline
                        @update:model-value="val => val === 'no' ? hazardousActivitiesDetails = '' : null" />
                    <div v-if="hazardousActivities === 'yes'" class="q-mt-sm">
                        <q-input v-model="hazardousActivitiesDetails" label="if yes, please then specify the activity *"
                            outlined dense type="textarea" rows="2" :rules="[val => !!val || 'Details are required']" />
                    </div>
                </div>

                <div class="q-mb-md">
                    <q-input v-model="adjoiningBuildingDetails"
                        label=" If the building is not detached, construction & occupation particulars of adjoining building."
                        outlined dense type="textarea" rows="2" />
                </div>

                <div class="q-mb-md">
                    <div class="text-caption q-mb-xs">Are you the sole occupants of premises?</div>
                    <q-option-group v-model="soleOccupants" :options="yesNoOptions" type="radio" inline
                        @update:model-value="val => val === 'yes' ? otherOccupantsDetails = '' : null" />
                    <div v-if="soleOccupants === 'no'" class="q-mt-sm">
                        <q-input v-model="otherOccupantsDetails" label="if no, please then specify *" outlined dense
                            type="textarea" rows="2" :rules="[val => !!val || 'Details are required']" />
                    </div>
                </div>

                <div class="q-mb-md">
                    <q-input v-model="otherCircumstances" label="Any other circumstances material to the risk." outlined
                        dense type="textarea" rows="2" />
                </div>
            </q-card-section>
        </q-card>

        <q-card class="q-mb-md">
            <q-card-section>
                <div class="text-h6 text-grey-8 q-mb-sm"> Building Construction Details:</div>

                <div class="row q-col-gutter-md q-mb-md">
                    <div class="col-12 col-md-6">
                        <q-input v-model="yearOfConstruction" label="Year of Construction" outlined dense
                            type="number" />
                    </div>
                    <div class="col-12 col-md-6">
                        <q-input v-model="numberOfStoreys" label=" No. of storeys" outlined dense type="number" />
                    </div>
                </div>

                <div class="text-subtitle2 q-mb-sm">Please specify below the material used for construction:</div>

                <div class="row q-col-gutter-md q-mt-sm">
                    <div class="col-12 col-md-6">
                        <q-input v-model="externalWalls" label="External walls" outlined dense />
                    </div>
                    <div class="col-12 col-md-6">
                        <q-input v-model="internalWalls" label="Internal partition walls" outlined dense />
                    </div>
                </div>

                <div class="row q-col-gutter-md q-mt-sm">
                    <div class="col-12 col-md-6">
                        <q-input v-model="roof" label="Roof" outlined dense />
                    </div>
                    <div class="col-12 col-md-6">
                        <q-input v-model="ceiling" label="Ceiling" outlined dense />
                    </div>
                </div>

                <div class="row q-col-gutter-md q-mt-sm">
                    <div class="col-12 col-md-6">
                        <q-input v-model="floor" label="Floor" outlined dense />
                    </div>
                </div>

                <div class="text-caption text-grey q-mt-xs">
                    (Your building can be : Masonry, Concrete, R.C.C., Bricks, Stucco, Wood, G.I. Sheets, Asbestos
                    Tiles, Terrazzo etc.)
                </div>
            </q-card-section>
        </q-card>

        <q-card class="q-mb-md">
            <q-card-section>
                <div class="text-h6 text-grey-8 q-mb-sm">Precautions:</div>

                <div class="row q-col-gutter-md">
                    <div class="col-12 col-md-6" v-for="(precaution, index) in precautions" :key="index">
                        <div class="text-caption q-mb-xs">{{ precaution.label }}</div>
                        <q-option-group v-model="precautionsValues[precaution.key]" :options="yesNoOptions" type="radio"
                            inline />
                    </div>
                </div>

                <div class="q-mt-md">
                    <q-input v-model="precautionsRemarks" label="Observations / Remarks about precautions:" outlined
                        dense type="textarea" rows="2"
                        placeholder="Any additional information about the precautions taken" />
                </div>

                <div v-if="precautionsValues.fireExtinguishing === 'yes'" class="q-mt-md">
                    <q-input v-model="fireExtinguishingDetails" label="If yes, please specify" outlined dense
                        type="textarea" rows="2" />
                </div>
            </q-card-section>
        </q-card>

        <q-card class="q-mb-md">
            <q-card-section>
                <div class="text-h6 text-grey-8 q-mb-sm">Cover Required</div>

                <div class="q-mb-md">
                    <div class="text-subtitle2 q-mb-xs">Select cover type *</div>
                    <q-select v-model="coverType" :options="coverTypeOptions" outlined dense emit-value map-options
                        :rules="[val => !!val || 'Please select cover type']" />
                </div>

                <div v-if="['fire_only', 'fire_extended'].includes(coverType)" class="q-mb-md">
                    <div class="text-subtitle2 q-mb-xs">Burglary Cover needed?</div>
                    <q-option-group v-model="burglaryCoverNeeded" :options="yesNoOptions" type="radio" inline />
                </div>

                <div v-if="['fire_only', 'fire_extended'].includes(coverType)"
                    class="q-mb-md bg-blue-2 q-pa-md rounded-borders">
                    <div class="text-subtitle2 q-mb-xs">
                        For 9a) or 9b) please specify whether you require Reinstatement Value Clause
                    </div>
                    <q-option-group v-model="reinstatementClause" :options="yesNoOptions" type="radio" inline />
                    <div class="text-caption text-grey q-mt-xs">
                        By this Clause we mean that your property is insured at the new replacement cost. It is
                        important that when you opt for this clause the amount of Insurance proposed by you is placed on
                        the full new Replacement Value of the property. Inadequate Sum Insured will attract provisions
                        of under Insurance as per the Policy.
                    </div>
                </div>

                <div class="q-mb-md">
                    <div class="text-subtitle2 q-mb-xs">Is index clause required?</div>
                    <q-option-group v-model="indexClause" :options="yesNoOptions" type="radio" inline />
                </div>

                <div class="q-mb-md">
                    <div class="text-subtitle2 q-mb-xs">Is Mortgage clause required?</div>
                    <q-option-group v-model="mortgageClause" :options="yesNoOptions" type="radio" inline
                        @update:model-value="val => val === 'no' ? bankName = '' : null" />

                    <div v-if="mortgageClause === 'yes'" class="q-mt-sm">
                        <q-input v-model="bankName" label="Name of Bank *" outlined dense
                            :rules="[val => !!val || 'Bank name is required']" />
                    </div>
                </div>
            </q-card-section>
        </q-card>

        <q-card bordered="" class="q-mb-md">
            <q-card-section>
                <div class="text-h6 text-grey-8 q-mb-md">Amounts and description of insurance required: (each item
                    should be answered separately)</div>

                <div class="q-mb-md bg-blue-1 q-pa-md rounded-borders">
                    <div class="text-subtitle2 q-mb-sm">Property</div>

                    <div v-for="(item, index) in propertyItems" :key="index" class="row items-center q-mb-sm">
                        <div class="col-8">
                            <div class="text-caption">{{ item.label }}</div>
                        </div>
                        <div class="col-4">
                            <q-input v-model="insuranceAmountsProperty[item.key]" outlined dense type="number"
                                prefix="AWG" :label="`${item.letter})`" />
                        </div>
                    </div>

                    <div class="row items-center q-mt-sm border-top-grey q-pt-sm">
                        <div class="col-8">
                            <div class="text-subtitle2">Total </div>
                        </div>
                        <div class="col-4">
                            <q-input v-model="totalProperty" outlined dense type="number" prefix="AWG" readonly
                                class="bg-grey-3" />
                        </div>
                    </div>
                </div>

                <div class="q-mb-md bg-blue-1 q-pa-md rounded-borders">
                    <div class="text-subtitle2 q-mb-sm">Inventory</div>

                    <div v-for="(item, index) in inventoryItems" :key="index" class="row items-center q-mb-sm">
                        <div class="col-8">
                            <div class="text-caption">{{ item.label }}</div>
                        </div>
                        <div class="col-4">
                            <q-input v-model="insuranceAmountsInventory[item.key]" outlined dense type="number"
                                prefix="AWG" :label="`${item.letter})`" />
                        </div>
                    </div>

                    <div class="text-caption text-grey q-mt-xs">
                        (These items are covered only if they are secured to the base)
                    </div>

                    <div class="row items-center q-mt-sm border-top-grey q-pt-sm">
                        <div class="col-8">
                            <div class="text-subtitle2">Total </div>
                        </div>
                        <div class="col-4">
                            <q-input v-model="totalInventory" outlined dense type="number" prefix="AWG" readonly
                                class="bg-grey-3" />
                        </div>
                    </div>
                </div>

                <div class="q-mb-md bg-blue-1 q-pa-md rounded-borders">
                    <div class="text-subtitle2 q-mb-sm"> High Risk Items</div>

                    <div v-for="(item, index) in highRiskItems" :key="index" class="row items-center q-mb-sm">
                        <div class="col-8">
                            <div class="text-caption">{{ item.label }}</div>
                        </div>
                        <div class="col-4">
                            <q-input v-model="insuranceAmountsHighRisk[item.key]" outlined dense type="number"
                                prefix="AWG" :label="`${item.letter})`" />
                        </div>
                    </div>

                    <div class="row items-center q-mt-sm border-top-grey q-pt-sm">
                        <div class="col-8">
                            <div class="text-subtitle2">Total</div>
                        </div>
                        <div class="col-4">
                            <q-input v-model="totalHighRisk" outlined dense type="number" prefix="AWG" readonly
                                class="bg-grey-3" />
                        </div>
                    </div>
                </div>

                <div class="q-mb-md bg-blue-1 q-pa-md rounded-borders">
                    <div class="text-subtitle2 q-mb-sm"> Merchandise</div>

                    <div v-for="(item, index) in merchandiseItems" :key="index" class="row items-center q-mb-sm">
                        <div class="col-8">
                            <div class="text-caption">{{ item.label }}</div>
                        </div>
                        <div class="col-4">
                            <q-input v-model="insuranceAmountsMerchandise[item.key]" outlined dense type="number"
                                prefix="AWG" :label="`${item.letter})`" />
                        </div>
                    </div>

                    <div class="row items-center q-mt-sm border-top-grey q-pt-sm">
                        <div class="col-8">
                            <div class="text-subtitle2">Total</div>
                        </div>
                        <div class="col-4">
                            <q-input v-model="totalMerchandise" outlined dense type="number" prefix="AWG" readonly
                                class="bg-grey-3" />
                        </div>
                    </div>
                </div>

                <div class="q-mb-md bg-blue-1 q-pa-md rounded-borders">
                    <div class="text-subtitle2 q-mb-sm">Any other items (please specify)</div>

                    <div v-for="(item, index) in otherItems" :key="index" class="row items-center q-mb-sm">
                        <div class="col-8">
                            <q-input v-model="item.description" outlined dense :label="`${index + 1})`" />
                        </div>
                        <div class="col-4">
                            <q-input v-model="item.amount" outlined dense type="number" prefix="AWG"
                                :label="`Amount ${index + 1}`" />
                        </div>
                        <div class="col-12 text-right" v-if="index > 0">
                            <q-btn icon="delete" flat dense color="negative" @click="removeOtherItem(index)"
                                size="sm" />
                        </div>
                    </div>

                    <q-btn icon="add" color="primary" outline @click="addOtherItem" size="sm" class="q-mt-sm"
                        label="Add Other Item" />

                    <div class="row items-center q-mt-sm border-top-grey q-pt-sm">
                        <div class="col-8">
                            <div class="text-subtitle2">Total</div>
                        </div>
                        <div class="col-4">
                            <q-input v-model="totalOtherItems" outlined dense type="number" prefix="AWG" readonly
                                class="bg-grey-3" />
                        </div>
                    </div>
                </div>

                <div class="q-mb-md bg-blue-2 q-pa-md rounded-borders">
                    <div class="row items-center">
                        <div class="col-8">
                            <div class="text-h6">TOTAL SUM INSURED</div>
                        </div>
                        <div class="col-4">
                            <q-input v-model="totalABCDE" outlined dense type="number" prefix="AWG" readonly
                                class="bg-white" />
                        </div>
                    </div>
                </div>

                <div class="q-mb-md bg-blue-1 q-pa-md rounded-borders">
                    <div class="text-subtitle2 q-mb-sm">Burglary Cover - Premier risque or first loss</div>

                    <div class="q-mb-sm">
                        <div class="text-caption q-mb-xs">Do you wish to insure your merchandise on first loss basis
                            (premier risque)?</div>
                        <q-option-group v-model="firstLossBasis" :options="yesNoOptions" type="radio" inline
                            @update:model-value="val => {
                                if (val === 'no') {
                                    firstLossPercentage = ''
                                    firstLossMerchandiseStocksTrade = 0
                                    firstLossMerchandiseStocksWarehouse = 0
                                    firstLossMerchandiseStocksTrust = 0
                                }
                            }" />
                    </div>

                    <div v-if="firstLossBasis === 'yes'" class="q-mt-md">
                        <div class="text-caption q-mb-xs">
                            If Yes, please specify percentage of full value opted 10% (⅒) / 16% (⅙) / 20% (⅕) /
                            33.33% (⅓) / 50% (½) other amount, please specify:
                        </div>
                        <q-input v-model="firstLossPercentage" outlined dense placeholder="e.g., 10% or specify other"
                            class="q-mb-md" />

                        <div class="text-subtitle2 q-mb-sm">Merchandise (First Loss Basis)</div>

                        <div v-for="(item, index) in firstLossMerchandiseItems" :key="index"
                            class="row items-center q-mb-sm">
                            <div class="col-8">
                                <div class="text-caption">{{ item.label }}</div>
                            </div>
                            <div class="col-4">
                                <q-input v-model="firstLossMerchandise[item.key]" outlined dense type="number"
                                    prefix="AWG" :label="`${item.letter})`" />
                            </div>
                        </div>

                        <div class="row items-center q-mt-sm border-top-grey q-pt-sm">
                            <div class="col-8">
                                <div class="text-subtitle2">Total</div>
                            </div>
                            <div class="col-4">
                                <q-input v-model="totalFirstLoss" outlined dense type="number" prefix="AWG" readonly
                                    class="bg-grey-3" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="q-mb-md q-mt-md bg-blue-2 q-pa-md rounded-borders">
                    <div class="text-bold">N.B. -1. Deeds, Bonds, Bills of Exchange, Promissory Notes,
                        Coined or Paper Money, Securities for money, Stamps, Cheques, Documents of any kind,
                        Manuscripts, Medals & Coins, Unset Precious stones, Curios, Sculptures, Rare Books, Planos,
                        Patterns, Models, Design, Motor Vehicles and Accessories, cycles and Live Stock are not covered
                        unless the item is specifically accepted by the Company in which case such articles must be
                        described and valued separately.</div>
                </div>

                <div class="q-mb-md bg-blue-1 q-pa-md rounded-borders">
                    <div class="text-subtitle2 q-mb-sm">Business Interruption</div>

                    <div class="q-mb-md">
                        <div class="text-caption q-mb-xs">Do you want to insure this section?</div>
                        <q-option-group v-model="businessInterruption" :options="yesNoOptions" type="radio" inline />
                    </div>

                    <div v-if="businessInterruption === 'yes'" class="q-mt-md">
                        <div class="text-subtitle2 q-mb-xs">Sums to be insured:</div>

                        <div class="row q-col-gutter-sm q-mb-sm">
                            <div class="col-8">
                                <div class="text-caption">Annual Gross profits (net profit + standing charges).
                                </div>
                            </div>
                            <div class="col-4">
                                <q-input v-model="grossProfits" outlined dense type="number" prefix="AWG" />
                            </div>
                        </div>

                        <div class="row q-col-gutter-sm q-mb-sm">
                            <div class="col-8">
                                <div class="text-caption">Additional increased cost of working</div>
                            </div>
                            <div class="col-4">
                                <q-input v-model="increasedCostWorking" outlined dense type="number" prefix="AWG" />
                            </div>
                        </div>

                        <div class="row q-col-gutter-sm q-mb-sm">
                            <div class="col-8">
                                <div class="text-caption">Rent receivable</div>
                            </div>
                            <div class="col-4">
                                <q-input v-model="rentReceivable" outlined dense type="number" prefix="AWG" />
                            </div>
                        </div>

                        <div class="row q-col-gutter-sm q-mb-sm">
                            <div class="col-8">
                                <div class="text-caption">Other (please specify)</div>
                            </div>
                            <div class="col-4">
                                <q-input v-model="otherBusinessInterruption" outlined dense type="number"
                                    prefix="AWG" />
                            </div>
                        </div>

                        <div class="row items-center q-mt-sm border-top-grey q-pt-sm">
                            <div class="col-8">
                                <div class="text-subtitle2">Total</div>
                            </div>
                            <div class="col-4">
                                <q-input v-model="totalBusinessInterruptionI" outlined dense type="number" prefix="AWG"
                                    readonly class="bg-grey-3" />
                            </div>
                        </div>

                        <div class="row q-col-gutter-sm q-mt-md">
                            <div class="col-12 col-md-6">
                                <q-input v-model="indemnityPeriod" label="Indemnity period (6, 12, 18 or 24 Months):"
                                    outlined dense type="number" suffix="Months" />
                            </div>
                            <div class="col-12 col-md-6">
                                <q-input v-model="uninsuredVariableCosts" label="Uninsured variable costs" outlined
                                    dense type="number" prefix="AWG" />
                            </div>
                        </div>

                        <div class="row items-center q-mt-md border-top-grey q-pt-sm">
                            <div class="col-8">
                                <div class="text-subtitle2">Total</div>
                            </div>
                            <div class="col-4">
                                <q-input v-model="totalBusinessInterruptionAll" outlined dense type="number"
                                    prefix="AWG" readonly class="bg-grey-3" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="q-mb-md bg-blue-1 q-pa-md rounded-borders">
                    <div class="text-subtitle2 q-mb-sm">Plate Glass</div>

                    <div class="q-mb-md">
                        <div class="text-caption q-mb-xs">Do you want to insure this section?</div>
                        <q-option-group v-model="plateGlassCoverage" :options="yesNoOptions" type="radio" inline />
                    </div>

                    <div v-if="plateGlassCoverage === 'yes'" class="q-mt-md">
                        <div class="text-subtitle2 q-mb-sm">Please provide particulars of glass to be insured:</div>

                        <div v-for="(glass, index) in plateGlassItems" :key="index"
                            class="q-mb-md border-grey rounded-borders q-pa-sm">
                            <div class="text-subtitle2">Glass Panel {{ index + 1 }}</div>

                            <div class="row q-col-gutter-sm">
                                <div class="col-12 col-md-6">
                                    <q-input v-model="glass.position"
                                        :label="` Position of each square of pane of glass ${index + 1}`" outlined dense
                                        placeholder="e.g., Front window, Door, Display case" />
                                </div>
                                <div class="col-12 col-md-6">
                                    <q-input v-model="glass.size"
                                        :label="`Size of each square of pane. (height & Width) ${index + 1}`" outlined
                                        dense placeholder="e.g., 1.5m x 2m" />
                                </div>
                            </div>

                            <div class="row q-col-gutter-sm q-mt-sm">
                                <div class="col-12 col-md-6">
                                    <q-input v-model="glass.description"
                                        :label="` Description of glass. Is it plain, painted, silvered, embossed, stained, bent, or decorative ${index + 1}`"
                                        outlined dense />
                                </div>
                                <div class="col-12 col-md-6">
                                    <q-input v-model="glass.value"
                                        :label="`Value / Sum to be insured Awg. ${index + 1}`" outlined dense
                                        type="number" prefix="AWG" />
                                </div>
                            </div>

                            <q-btn v-if="index > 0" icon="delete" flat dense color="negative"
                                @click="removeGlassPanel(index)" class="q-mt-sm">
                                Remove Panel
                            </q-btn>
                        </div>

                        <q-btn icon="add" color="primary" outline @click="addGlassPanel" class="q-mt-sm">
                            Add Another Glass Panel
                        </q-btn>

                        <div class="row items-center q-mt-md border-top-grey q-pt-sm">
                            <div class="col-8">
                                <div class="text-subtitle2">Total </div>
                            </div>
                            <div class="col-4">
                                <q-input v-model="totalPlateGlassValue" outlined dense type="number" prefix="AWG"
                                    readonly class="bg-grey-3" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="q-mb-md bg-blue-1 q-pa-md rounded-borders">
                    <div class="text-subtitle2 q-mb-sm"> Additional Coverage: available only when building is also
                        covered</div>

                    <div class="row q-col-gutter-sm q-mb-sm">
                        <div class="col-8">
                            <div class="text-caption">On loss of rent receivable _____ weeks. (subject to maximum of
                                5% of T.S.I.)</div>
                        </div>
                        <div class="col-4">
                            <q-input v-model="lossOfRentWeeks" outlined dense type="number" suffix="weeks" />
                        </div>
                    </div>

                    <div class="row q-col-gutter-sm q-mb-sm">
                        <div class="col-8">
                            <div class="text-caption">On removal of debris (subject to maximum of 10% of T.S.I.)
                            </div>
                        </div>
                        <div class="col-4">
                            <q-input v-model="removalOfDebris" outlined dense type="number" prefix="AWG" />
                        </div>
                    </div>

                    <div class="row q-col-gutter-sm q-mb-sm">
                        <div class="col-8">
                            <div class="text-caption">On damage to building in the course of a committed Burglary
                                (Subject to a maximum of Awg. 5,000.00)</div>
                        </div>
                        <div class="col-4">
                            <q-input v-model="burglaryDamage" outlined dense type="number" prefix="AWG" max="5000" />
                        </div>
                    </div>

                    <div class="row items-center q-mt-sm border-top-grey q-pt-sm">
                        <div class="col-8">
                            <div class="text-subtitle2">Total </div>
                        </div>
                        <div class="col-4">
                            <q-input v-model="totalAdditionalCoverage" outlined dense type="number" prefix="AWG"
                                readonly class="bg-grey-3" />
                        </div>
                    </div>
                </div>

                <div class="q-mt-md bg-blue-2 q-pa-md rounded-borders">
                    <div class="text-subtitle2 q-mb-sm">TOTAL SUM INSURED</div>
                    <div class="row items-center">
                        <div class="col-8">
                            <div class="text-h6">TOTAL SUM INSURED</div>
                        </div>
                        <div class="col-4">
                            <q-input v-model="totalSumInsured" outlined dense type="number" prefix="AWG" readonly
                                class="bg-white text-h6" />
                        </div>
                    </div>
                    <div class="text-caption text-red q-mt-xs">
                        Please be informed that an inadequate Sum Insured will result in the application of
                        underinsurance provisions as per the policy.
                    </div>
                </div>

                <div class="q-mt-md">
                    <q-input v-model="insuranceRemarks" label="Remarks, if any:" outlined dense type="textarea"
                        rows="2" />
                </div>
            </q-card-section>
        </q-card>

        <q-card class="q-mb-md">
            <q-card-section>
                <div class="text-h6 text-grey-8 q-mb-sm">Books of Accounts:</div>

                <div class="row q-col-gutter-md q-mb-md">
                    <div class="col-12 col-md-6">
                        <q-input v-model="yearsInBusiness" label="How long have you been in the business? (years)"
                            outlined dense type="number" />
                    </div>
                    <div class="col-12 col-md-6">
                        <q-input v-model="annualTurnover" label="Your estimated annual turnover? (AWG)" outlined dense
                            type="number" prefix="AWG" />
                    </div>
                </div>

                <div class="row q-col-gutter-md q-mb-md">
                    <div class="col-12 col-md-6">
                        <div class="text-caption q-mb-xs">Are your books regularly maintained and updated?</div>
                        <q-option-group v-model="booksMaintained" :options="yesNoOptions" type="radio" inline />
                    </div>
                    <div class="col-12 col-md-6">
                        <q-input v-model="inventoryFrequency" label="How frequently is stock inventory taken?" outlined
                            dense />
                    </div>
                </div>

                <div class="row q-col-gutter-md">
                    <div class="col-12 col-md-4">
                        <div class="text-caption q-mb-xs"> Are your books regularly audited?</div>
                        <q-option-group v-model="booksAudited" :options="yesNoOptions" type="radio" inline />
                    </div>
                    <div class="col-12 col-md-4">
                        <div class="text-caption q-mb-xs">
                            Are your accounts books secured in a Fire proof safe or removed to another building
                            outside business hours?
                        </div>
                        <q-option-group v-model="accountsSecured" :options="yesNoOptions" type="radio" inline />
                    </div>
                </div>

                <div v-if="booksAudited === 'yes'" class="q-mt-md">
                    <q-input v-model="accountantsDetails"
                        label="Please state the names and addresses of your Accountants & auditors during last three years."
                        outlined dense type="textarea" rows="3" />
                </div>
            </q-card-section>
        </q-card>

        <q-card class="q-mb-md">
            <q-card-section>
                <div class="text-h6 text-grey-8 q-mb-sm">Previous Insurance History</div>

                <div class="q-mb-md">
                    <div class="text-subtitle2 q-mb-xs">Any other insurances on the same property?</div>
                    <q-option-group v-model="otherInsurances" :options="yesNoOptions" type="radio" inline
                        @update:model-value="val => val === 'no' ? otherInsurancesDetails = '' : null" />

                    <div v-if="otherInsurances === 'yes'" class="q-mt-sm">
                        <q-input v-model="otherInsurancesDetails" label="if yes, give details." outlined dense
                            type="textarea" rows="2" />
                    </div>
                </div>

                <div class="q-mb-md">
                    <div class="text-subtitle2 q-mb-xs">Insured in the past or at present time?</div>
                    <q-option-group v-model="previouslyInsured" :options="yesNoOptions" type="radio" inline
                        @update:model-value="val => {
                            if (val === 'no') {
                                previousInsurer = ''
                                previousPeriodFrom = ''
                                previousPeriodTo = ''
                            }
                        }" />

                    <div v-if="previouslyInsured === 'yes'" class="q-mt-sm">
                        <div class="row q-col-gutter-sm">
                            <div class="col-12 col-md-4">
                                <q-input v-model="previousInsurer" label="Yes, at" outlined dense
                                    placeholder="Insurance Company" />
                            </div>
                            <div class="col-12 col-md-4">
                                <q-input v-model="previousPeriodFrom" label="from" outlined dense type="date" />
                            </div>
                            <div class="col-12 col-md-4">
                                <q-input v-model="previousPeriodTo" label="to" outlined dense type="date" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="q-mb-md">
                    <div class="text-subtitle2 q-mb-xs"> Any loss suffered by insured in the past 5 years?</div>

                    <q-table :rows="lossHistory" :columns="lossHistoryColumns" row-key="year" dense flat bordered
                        class="bg-grey-1">
                        <template v-slot:body="props">
                            <q-tr :props="props">
                                <q-td>{{ props.row.year }}</q-td>
                                <q-td>
                                    <q-input v-model="props.row.amount" dense outlined type="number" prefix="AWG"
                                        placeholder="Amount" />
                                </q-td>
                                <q-td>
                                    <q-input v-model="props.row.cause" dense outlined placeholder="due to" />
                                </q-td>
                            </q-tr>
                        </template>
                    </q-table>
                </div>

                <div class="q-mb-md">
                    <div class="text-subtitle2 q-mb-xs">Has any Insurance Company:</div>

                    <div class="row q-col-gutter-md q-mb-sm">
                        <div class="col-12 col-md-4">
                            <div class="text-caption q-mb-xs">Declined your proposal?</div>
                            <q-option-group v-model="proposalDeclined" :options="yesNoOptions" type="radio" inline
                                @update:model-value="val => val === 'no' ? proposalDeclinedDetails = '' : null" />
                            <div v-if="proposalDeclined === 'yes'" class="q-mt-xs">
                                <q-input v-model="proposalDeclinedDetails" label="if yes please specify" outlined
                                    dense />
                            </div>
                        </div>

                        <div class="col-12 col-md-4">
                            <div class="text-caption q-mb-xs">Refused to renew your policy?</div>
                            <q-option-group v-model="policyNotRenewed" :options="yesNoOptions" type="radio" inline
                                @update:model-value="val => val === 'no' ? policyNotRenewedDetails = '' : null" />
                            <div v-if="policyNotRenewed === 'yes'" class="q-mt-xs">
                                <q-input v-model="policyNotRenewedDetails" label="if yes please specify" outlined
                                    dense />
                            </div>
                        </div>

                        <div class="col-12 col-md-4">
                            <div class="text-caption q-mb-xs">Cancelled any of your Insurances?</div>
                            <q-option-group v-model="insuranceCancelled" :options="yesNoOptions" type="radio" inline
                                @update:model-value="val => val === 'no' ? insuranceCancelledDetails = '' : null" />
                            <div v-if="insuranceCancelled === 'yes'" class="q-mt-xs">
                                <q-input v-model="insuranceCancelledDetails" label="if yes please specify" outlined
                                    dense />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="q-mb-md">
                    <div class="text-subtitle2 q-mb-xs">
                        Have you or any partner or director in the business ever been convicted of any criminal
                        offence other than a
                        motor traffic offence?
                    </div>
                    <q-option-group v-model="criminalConviction" :options="yesNoOptions" type="radio" inline
                        @update:model-value="val => val === 'no' ? criminalConvictionDetails = '' : null" />

                    <div v-if="criminalConviction === 'yes'" class="q-mt-sm">
                        <q-input v-model="criminalConvictionDetails" label="If yes, please give details" outlined dense
                            type="textarea" rows="2" />
                    </div>
                </div>
            </q-card-section>
        </q-card>

        <q-card class="q-mb-md">
            <q-card-section>
                <div class="bg-grey-2 q-pa-md rounded-borders q-mb-md">
                    <p class="text-body2 q-mb-md">
                        I/We hereby declare that the statements made by me/us in this Proposal Form are true to the best
                        of
                        my/our knowledge and belief, and I/we hereby agree that this declaration shall form the basis of
                        the
                        contract between me/us and THE NEW INDIA ASSURANCE COMPANY LIMITED.
                    </p>
                    <p class="text-body2 q-mb-md">
                        I/We further agree that if any particular is filled in this proposal by any other person, such
                        person
                        shall be deemed as my/our agent and not the agent of the Company. I/We further declare that I/we
                        have
                        read and understood all particulars entered herein and I/we have signed this after verifying the
                        same to
                        be true and complete in all respect.
                    </p>

                    <div class="row q-col-gutter-md q-mt-md">
                        <div class="col-12 col-md-6">
                            <q-input v-model="declarationPlace" label="Dated at" outlined dense
                                :rules="[val => !!val || 'Place is required']" />
                        </div>

                        <div class="col-12 col-md-6">
                            <q-input v-model="declarationDate" label="on" outlined dense type="date"
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

const premisesAddress = ref('')
const insuringAs = ref('')
const premisesUse = ref([])
const goodsStored = ref('')
const manufacturingProcesses = ref('')
const hazardousMaterials = ref('no')
const hazardousMaterialsDetails = ref('')
const hazardousActivities = ref('no')
const hazardousActivitiesDetails = ref('')
const adjoiningBuildingDetails = ref('')
const soleOccupants = ref('no')
const otherOccupantsDetails = ref('')
const otherCircumstances = ref('')

const yearOfConstruction = ref('')
const numberOfStoreys = ref('')
const externalWalls = ref('')
const internalWalls = ref('')
const roof = ref('')
const ceiling = ref('')
const floor = ref('')

const precautionsValues = ref({
    deadboltLocks: 'no',
    metalGrills: 'no',
    aircoFrames: 'no',
    fireAlarm: 'no',
    burglaryAlarm: 'no',
    sprinklerSystem: 'no',
    fireExtinguishing: 'no',
    goodsStorage: 'no',
    kitchenExhaust: 'no'
})
const fireExtinguishingDetails = ref('')
const precautionsRemarks = ref('')

const coverType = ref('')
const burglaryCoverNeeded = ref('no')
const reinstatementClause = ref('no')
const indexClause = ref('no')
const mortgageClause = ref('no')
const bankName = ref('')

const insuranceAmountsProperty = ref({
    mainBuilding: 0,
    warehouse: 0,
    fence: 0,
    landscaping: 0,
    apartment: 0,
    laundryRoom: 0,
    pool: 0,
    tenantsInterest: 0,
    solarPanels: 0
})

const insuranceAmountsInventory = ref({
    furniture: 0,
    machinery: 0,
    signs: 0,
    aircoUnits: 0
})

const insuranceAmountsHighRisk = ref({
    computers: 0,
    cameras: 0,
    otherElectronics: 0
})

const insuranceAmountsMerchandise = ref({
    stocksTrade: 0,
    stocksWarehouse: 0,
    stocksTrust: 0
})

const otherItems = ref([{ description: '', amount: 0 }])
const firstLossBasis = ref('no')
const firstLossPercentage = ref('')
const firstLossMerchandise = ref({
    stocksTrade: 0,
    stocksWarehouse: 0,
    stocksTrust: 0
})

const businessInterruption = ref('no')
const grossProfits = ref(0)
const increasedCostWorking = ref(0)
const rentReceivable = ref(0)
const otherBusinessInterruption = ref(0)
const indemnityPeriod = ref('')
const uninsuredVariableCosts = ref(0)

const plateGlassCoverage = ref('no')
const plateGlassItems = ref([
    { position: '', size: '', description: '', value: 0 }
])

const lossOfRentWeeks = ref(0)
const removalOfDebris = ref(0)
const burglaryDamage = ref(0)

const insuranceRemarks = ref('')

const yearsInBusiness = ref('')
const annualTurnover = ref(0)
const booksMaintained = ref('no')
const inventoryFrequency = ref('')
const booksAudited = ref('no')
const accountantsDetails = ref('')
const accountsSecured = ref('no')

const otherInsurances = ref('no')
const otherInsurancesDetails = ref('')
const previouslyInsured = ref('no')
const previousInsurer = ref('')
const previousPeriodFrom = ref('')
const previousPeriodTo = ref('')
const proposalDeclined = ref('no')
const proposalDeclinedDetails = ref('')
const policyNotRenewed = ref('no')
const policyNotRenewedDetails = ref('')
const insuranceCancelled = ref('no')
const insuranceCancelledDetails = ref('')
const criminalConviction = ref('no')
const criminalConvictionDetails = ref('')

const declarationPlace = ref('Aruba')
const declarationDate = ref(new Date().toISOString().split('T')[0])
const proposerSignature = ref('')

const lossHistory = ref([
    { year: 'Year 1', amount: '', cause: '' },
    { year: 'Year 2', amount: '', cause: '' },
    { year: 'Year 3', amount: '', cause: '' },
    { year: 'Year 4', amount: '', cause: '' },
    { year: 'Year 5', amount: '', cause: '' }
])

const yesNoOptions = [
    { label: 'YES', value: 'yes' },
    { label: 'NO', value: 'no' }
]

const insuringAsOptions = [
    { label: 'Owner', value: 'owner' },
    { label: 'Tenant', value: 'tenant' }
]

const premisesUseOptions = [
    { label: 'Office', value: 'office' },
    { label: 'Workshop', value: 'workshop' },
    { label: 'Clinic', value: 'clinic' },
    { label: 'Hospital', value: 'hospital' },
    { label: 'School', value: 'school' },
    { label: 'Shop', value: 'shop' },
    { label: 'Store', value: 'store' },
    { label: 'Factory', value: 'factory' },
    { label: 'Warehouse', value: 'warehouse' },
    { label: 'Restaurant', value: 'restaurant' },
    { label: 'Hotel', value: 'hotel' },
    { label: 'Bar', value: 'bar' },
    { label: 'Multi Commercial Occupancy', value: 'multi' }
]

const coverTypeOptions = [
    { label: 'Fire & Lightning only', value: 'fire_only' },
    { label: 'Fire & Lightning All Extended', value: 'fire_extended' },
    { label: 'Smart Com (available only when building is also covered)', value: 'smart_com' },
    { label: 'Smart Economy Cas (available only when building & contents are also covered)', value: 'smart_economy' }
]

const precautions = [
    { label: 'i) Deadbolt locks / pad locks on entrance & exits', key: 'deadboltLocks' },
    { label: 'ii) Metal grills / shutters covering plate glass', key: 'metalGrills' },
    { label: 'iii) Split airco frames are fastened to the base', key: 'aircoFrames' },
    { label: 'iv) Fire Alarm a/o Smoke detectors connected to a Security Agency', key: 'fireAlarm' },
    { label: 'v) Burglary Alarm connected to a Security Agency', key: 'burglaryAlarm' },
    { label: 'vi) Sprinkler system installed', key: 'sprinklerSystem' },
    { label: 'vii) Fire extinguishing appliances / system', key: 'fireExtinguishing' },
    { label: 'viii) Goods / Stocks stored at least 25 cm from the ground', key: 'goodsStorage' },
    { label: 'ix) Kitchen exhaust system cleaned on a regular basis', key: 'kitchenExhaust' }
]

const propertyItems = [
    { label: 'i) On main building(s)', key: 'mainBuilding', letter: 'i' },
    { label: 'ii) On warehouse / storage units', key: 'warehouse', letter: 'ii' },
    { label: 'iii) On fence / premises boundary wall / gates', key: 'fence', letter: 'iii' },
    { label: 'iv) On landscaping / pavers / garden paving', key: 'landscaping', letter: 'iv' },
    { label: 'v) On Apartment', key: 'apartment', letter: 'v' },
    { label: 'vi) On Laundry Room', key: 'laundryRoom', letter: 'vi' },
    { label: 'vii) On swimming-pool / pool-deck', key: 'pool', letter: 'vii' },
    { label: 'viii) Tenants interest / improvements', key: 'tenantsInterest', letter: 'viii' },
    { label: 'ix) On Solar Panels', key: 'solarPanels', letter: 'ix' }
]

const inventoryItems = [
    { label: 'i) On Business furniture, fixtures and fittings', key: 'furniture', letter: 'i' },
    { label: 'ii) On business plant, machinery / equipment', key: 'machinery', letter: 'ii' },
    { label: 'iii) On advertising signs / sign board', key: 'signs', letter: 'iii' },
    { label: 'iv) On split airco units', key: 'aircoUnits', letter: 'iv' }
]

const highRiskItems = [
    { label: 'i) On Computers and Laptops', key: 'computers', letter: 'i' },
    { label: 'ii) On Cameras / alarm system', key: 'cameras', letter: 'ii' },
    { label: 'iii) Any other portable electronic equipment', key: 'otherElectronics', letter: 'iii' }
]

const merchandiseItems = [
    { label: 'i) On stocks in trade', key: 'stocksTrade', letter: 'i' },
    { label: 'ii) On stocks in warehouse', key: 'stocksWarehouse', letter: 'ii' },
    { label: 'iii) On stocks held in trust / custody / commission', key: 'stocksTrust', letter: 'iii' }
]

const firstLossMerchandiseItems = [
    { label: 'i) On stocks in trade', key: 'stocksTrade', letter: 'i' },
    { label: 'ii) On stocks in warehouse', key: 'stocksWarehouse', letter: 'ii' },
    { label: 'iii) On stocks held in trust/custody/commission', key: 'stocksTrust', letter: 'iii' }
]

const lossHistoryColumns = [
    { name: 'year', label: 'Year', field: 'year', align: 'left' },
    { name: 'amount', label: 'Amount', field: 'amount', align: 'center' },
    { name: 'cause', label: 'due to', field: 'cause', align: 'left' }
]

const totalProperty = computed(() => {
    return Object.values(insuranceAmountsProperty.value).reduce((sum, val) => sum + (parseFloat(val) || 0), 0)
})

const totalInventory = computed(() => {
    return Object.values(insuranceAmountsInventory.value).reduce((sum, val) => sum + (parseFloat(val) || 0), 0)
})

const totalHighRisk = computed(() => {
    return Object.values(insuranceAmountsHighRisk.value).reduce((sum, val) => sum + (parseFloat(val) || 0), 0)
})

const totalMerchandise = computed(() => {
    return Object.values(insuranceAmountsMerchandise.value).reduce((sum, val) => sum + (parseFloat(val) || 0), 0)
})

const totalOtherItems = computed(() => {
    return otherItems.value.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0)
})

const totalABCDE = computed(() => {
    return totalProperty.value + totalInventory.value + totalHighRisk.value + totalMerchandise.value + totalOtherItems.value
})

const totalFirstLoss = computed(() => {
    if (firstLossBasis.value === 'yes') {
        return Object.values(firstLossMerchandise.value).reduce((sum, val) => sum + (parseFloat(val) || 0), 0)
    }
    return 0
})

const totalBusinessInterruptionI = computed(() => {
    return (parseFloat(grossProfits.value) || 0) +
        (parseFloat(increasedCostWorking.value) || 0) +
        (parseFloat(rentReceivable.value) || 0) +
        (parseFloat(otherBusinessInterruption.value) || 0)
})

const totalBusinessInterruptionAll = computed(() => {
    return totalBusinessInterruptionI.value + (parseFloat(uninsuredVariableCosts.value) || 0)
})

const totalPlateGlassValue = computed(() => {
    return plateGlassItems.value.reduce((sum, item) => sum + (parseFloat(item.value) || 0), 0)
})

const totalAdditionalCoverage = computed(() => {
    return (parseFloat(lossOfRentWeeks.value) || 0) +
        (parseFloat(removalOfDebris.value) || 0) +
        (parseFloat(burglaryDamage.value) || 0)
})

const totalSumInsured = computed(() => {
    return totalABCDE.value +
        totalFirstLoss.value +
        totalBusinessInterruptionAll.value +
        totalPlateGlassValue.value +
        totalAdditionalCoverage.value
})

const isFormValid = computed(() => {
    const basicFieldsValid = premisesAddress.value &&
        insuringAs.value &&
        premisesUse.value.length > 0 &&
        declarationPlace.value &&
        declarationDate.value &&
        proposerSignature.value &&
        coverType.value

    if (!basicFieldsValid) return false

    if (hazardousMaterials.value === 'yes' && !hazardousMaterialsDetails.value) return false
    if (hazardousActivities.value === 'yes' && !hazardousActivitiesDetails.value) return false
    if (soleOccupants.value === 'no' && !otherOccupantsDetails.value) return false

    if (mortgageClause.value === 'yes' && !bankName.value) return false

    if (plateGlassCoverage.value === 'yes') {
        const hasInvalidGlass = plateGlassItems.value.some(item =>
            !item.position || !item.size || !item.description || !item.value || item.value <= 0
        )
        if (hasInvalidGlass) return false
    }

    const hasInvalidOtherItem = otherItems.value.some(item =>
        item.description && (item.amount <= 0 || !item.amount)
    )
    if (hasInvalidOtherItem) return false

    return true
})

const addGlassPanel = () => {
    plateGlassItems.value.push({ position: '', size: '', description: '', value: 0 })
}

const removeGlassPanel = (index) => {
    if (plateGlassItems.value.length > 1) {
        plateGlassItems.value.splice(index, 1)
    }
}

const addOtherItem = () => {
    otherItems.value.push({ description: '', amount: 0 })
}

const removeOtherItem = (index) => {
    if (otherItems.value.length > 1) {
        otherItems.value.splice(index, 1)
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
            premisesAddress: premisesAddress.value,
            insuringAs: insuringAs.value,
            premisesUse: [...premisesUse.value],
            goodsStored: goodsStored.value,
            manufacturingProcesses: manufacturingProcesses.value,
            hazardousMaterials: hazardousMaterials.value,
            hazardousMaterialsDetails: hazardousMaterialsDetails.value,
            hazardousActivities: hazardousActivities.value,
            hazardousActivitiesDetails: hazardousActivitiesDetails.value,
            adjoiningBuildingDetails: adjoiningBuildingDetails.value,
            soleOccupants: soleOccupants.value,
            otherOccupantsDetails: otherOccupantsDetails.value,
            otherCircumstances: otherCircumstances.value,
            yearOfConstruction: yearOfConstruction.value,
            numberOfStoreys: numberOfStoreys.value,
            externalWalls: externalWalls.value,
            internalWalls: internalWalls.value,
            roof: roof.value,
            ceiling: ceiling.value,
            floor: floor.value,
            precautions: { ...precautionsValues.value },
            fireExtinguishingDetails: fireExtinguishingDetails.value,
            precautionsRemarks: precautionsRemarks.value,
            coverType: coverType.value,
            burglaryCoverNeeded: burglaryCoverNeeded.value,
            reinstatementClause: reinstatementClause.value,
            indexClause: indexClause.value,
            mortgageClause: mortgageClause.value,
            bankName: bankName.value,
            insuranceAmounts: {
                property: { ...insuranceAmountsProperty.value },
                inventory: { ...insuranceAmountsInventory.value },
                highRisk: { ...insuranceAmountsHighRisk.value },
                merchandise: { ...insuranceAmountsMerchandise.value }
            },
            otherItems: [...otherItems.value],
            firstLossBasis: firstLossBasis.value,
            firstLossPercentage: firstLossPercentage.value,
            firstLossMerchandise: { ...firstLossMerchandise.value },
            businessInterruption: businessInterruption.value,
            grossProfits: grossProfits.value,
            increasedCostWorking: increasedCostWorking.value,
            rentReceivable: rentReceivable.value,
            otherBusinessInterruption: otherBusinessInterruption.value,
            indemnityPeriod: indemnityPeriod.value,
            uninsuredVariableCosts: uninsuredVariableCosts.value,
            plateGlassCoverage: plateGlassCoverage.value,
            plateGlassItems: [...plateGlassItems.value],
            lossOfRentWeeks: lossOfRentWeeks.value,
            removalOfDebris: removalOfDebris.value,
            burglaryDamage: burglaryDamage.value,
            insuranceRemarks: insuranceRemarks.value,
            yearsInBusiness: yearsInBusiness.value,
            annualTurnover: annualTurnover.value,
            booksMaintained: booksMaintained.value,
            inventoryFrequency: inventoryFrequency.value,
            booksAudited: booksAudited.value,
            accountantsDetails: accountantsDetails.value,
            accountsSecured: accountsSecured.value,
            otherInsurances: otherInsurances.value,
            otherInsurancesDetails: otherInsurancesDetails.value,
            previouslyInsured: previouslyInsured.value,
            previousInsurer: previousInsurer.value,
            previousPeriodFrom: previousPeriodFrom.value,
            previousPeriodTo: previousPeriodTo.value,
            proposalDeclined: proposalDeclined.value,
            proposalDeclinedDetails: proposalDeclinedDetails.value,
            policyNotRenewed: policyNotRenewed.value,
            policyNotRenewedDetails: policyNotRenewedDetails.value,
            insuranceCancelled: insuranceCancelled.value,
            insuranceCancelledDetails: insuranceCancelledDetails.value,
            criminalConviction: criminalConviction.value,
            criminalConvictionDetails: criminalConvictionDetails.value,
            declarationPlace: declarationPlace.value,
            declarationDate: declarationDate.value,
            proposerSignature: proposerSignature.value,
            timestamp: new Date().toISOString(),
            formType: 'CommercialFireBurglary',
            totals: {
                property: totalProperty.value,
                inventory: totalInventory.value,
                highRisk: totalHighRisk.value,
                merchandise: totalMerchandise.value,
                otherItems: totalOtherItems.value,
                ABCDE: totalABCDE.value,
                firstLoss: totalFirstLoss.value,
                businessInterruptionI: totalBusinessInterruptionI.value,
                businessInterruptionAll: totalBusinessInterruptionAll.value,
                plateGlass: totalPlateGlassValue.value,
                additionalCoverage: totalAdditionalCoverage.value,
                totalSumInsured: totalSumInsured.value
            }
        }

        $q.notify({
            type: 'positive',
            message: 'Commercial proposal submitted successfully!',
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

    premisesAddress.value = ''
    insuringAs.value = ''
    premisesUse.value = []
    goodsStored.value = ''
    manufacturingProcesses.value = ''
    hazardousMaterials.value = 'no'
    hazardousMaterialsDetails.value = ''
    hazardousActivities.value = 'no'
    hazardousActivitiesDetails.value = ''
    adjoiningBuildingDetails.value = ''
    soleOccupants.value = 'no'
    otherOccupantsDetails.value = ''
    otherCircumstances.value = ''
    yearOfConstruction.value = ''
    numberOfStoreys.value = ''
    externalWalls.value = ''
    internalWalls.value = ''
    roof.value = ''
    ceiling.value = ''
    floor.value = ''
    precautionsValues.value = {
        deadboltLocks: 'no',
        metalGrills: 'no',
        aircoFrames: 'no',
        fireAlarm: 'no',
        burglaryAlarm: 'no',
        sprinklerSystem: 'no',
        fireExtinguishing: 'no',
        goodsStorage: 'no',
        kitchenExhaust: 'no'
    }
    fireExtinguishingDetails.value = ''
    precautionsRemarks.value = ''
    coverType.value = ''
    burglaryCoverNeeded.value = 'no'
    reinstatementClause.value = 'no'
    indexClause.value = 'no'
    mortgageClause.value = 'no'
    bankName.value = ''
    insuranceAmountsProperty.value = {
        mainBuilding: 0,
        warehouse: 0,
        fence: 0,
        landscaping: 0,
        apartment: 0,
        laundryRoom: 0,
        pool: 0,
        tenantsInterest: 0,
        solarPanels: 0
    }
    insuranceAmountsInventory.value = {
        furniture: 0,
        machinery: 0,
        signs: 0,
        aircoUnits: 0
    }
    insuranceAmountsHighRisk.value = {
        computers: 0,
        cameras: 0,
        otherElectronics: 0
    }
    insuranceAmountsMerchandise.value = {
        stocksTrade: 0,
        stocksWarehouse: 0,
        stocksTrust: 0
    }
    otherItems.value = [{ description: '', amount: 0 }]
    firstLossBasis.value = 'no'
    firstLossPercentage.value = ''
    firstLossMerchandise.value = {
        stocksTrade: 0,
        stocksWarehouse: 0,
        stocksTrust: 0
    }
    businessInterruption.value = 'no'
    grossProfits.value = 0
    increasedCostWorking.value = 0
    rentReceivable.value = 0
    otherBusinessInterruption.value = 0
    indemnityPeriod.value = ''
    uninsuredVariableCosts.value = 0
    plateGlassCoverage.value = 'no'
    plateGlassItems.value = [{ position: '', size: '', description: '', value: 0 }]
    lossOfRentWeeks.value = 0
    removalOfDebris.value = 0
    burglaryDamage.value = 0
    insuranceRemarks.value = ''
    yearsInBusiness.value = ''
    annualTurnover.value = 0
    booksMaintained.value = 'no'
    inventoryFrequency.value = ''
    booksAudited.value = 'no'
    accountantsDetails.value = ''
    accountsSecured.value = 'no'
    otherInsurances.value = 'no'
    otherInsurancesDetails.value = ''
    previouslyInsured.value = 'no'
    previousInsurer.value = ''
    previousPeriodFrom.value = ''
    previousPeriodTo.value = ''
    proposalDeclined.value = 'no'
    proposalDeclinedDetails.value = ''
    policyNotRenewed.value = 'no'
    policyNotRenewedDetails.value = ''
    insuranceCancelled.value = 'no'
    insuranceCancelledDetails.value = ''
    criminalConviction.value = 'no'
    criminalConvictionDetails.value = ''
    declarationPlace.value = 'Aruba'
    declarationDate.value = new Date().toISOString().split('T')[0]
    proposerSignature.value = ''
    lossHistory.value = [
        { year: 'Year 1', amount: '', cause: '' },
        { year: 'Year 2', amount: '', cause: '' },
        { year: 'Year 3', amount: '', cause: '' },
        { year: 'Year 4', amount: '', cause: '' },
        { year: 'Year 5', amount: '', cause: '' }
    ]

    $q.notify({
        type: 'info',
        message: 'Form has been reset',
        position: 'top',
        timeout: 1000
    })
}

// FUNCIÓN LOAD DRAFT CORREGIDA
const loadDraft = () => {
    const draft = localStorage.getItem('commercial_fire_draft')
    if (draft) {
        try {
            const draftData = JSON.parse(draft)

            // Si el draft tiene la antigua estructura (con formData)
            if (draftData.formData) {
                const data = draftData.formData

                if (data.premisesAddress !== undefined) premisesAddress.value = data.premisesAddress
                if (data.insuringAs !== undefined) insuringAs.value = data.insuringAs
                if (data.premisesUse) premisesUse.value = [...data.premisesUse]
                if (data.goodsStored !== undefined) goodsStored.value = data.goodsStored
                if (data.manufacturingProcesses !== undefined) manufacturingProcesses.value = data.manufacturingProcesses
                if (data.hazardousMaterials !== undefined) hazardousMaterials.value = data.hazardousMaterials
                if (data.hazardousMaterialsDetails !== undefined) hazardousMaterialsDetails.value = data.hazardousMaterialsDetails
                if (data.hazardousActivities !== undefined) hazardousActivities.value = data.hazardousActivities
                if (data.hazardousActivitiesDetails !== undefined) hazardousActivitiesDetails.value = data.hazardousActivitiesDetails
                if (data.adjoiningBuildingDetails !== undefined) adjoiningBuildingDetails.value = data.adjoiningBuildingDetails
                if (data.soleOccupants !== undefined) soleOccupants.value = data.soleOccupants
                if (data.otherOccupantsDetails !== undefined) otherOccupantsDetails.value = data.otherOccupantsDetails
                if (data.otherCircumstances !== undefined) otherCircumstances.value = data.otherCircumstances
                if (data.yearOfConstruction !== undefined) yearOfConstruction.value = data.yearOfConstruction
                if (data.numberOfStoreys !== undefined) numberOfStoreys.value = data.numberOfStoreys
                if (data.externalWalls !== undefined) externalWalls.value = data.externalWalls
                if (data.internalWalls !== undefined) internalWalls.value = data.internalWalls
                if (data.roof !== undefined) roof.value = data.roof
                if (data.ceiling !== undefined) ceiling.value = data.ceiling
                if (data.floor !== undefined) floor.value = data.floor
                if (data.precautions) precautionsValues.value = { ...data.precautions }
                if (data.fireExtinguishingDetails !== undefined) fireExtinguishingDetails.value = data.fireExtinguishingDetails
                if (data.precautionsRemarks !== undefined) precautionsRemarks.value = data.precautionsRemarks
                if (data.coverType !== undefined) coverType.value = data.coverType
                if (data.burglaryCoverNeeded !== undefined) burglaryCoverNeeded.value = data.burglaryCoverNeeded
                if (data.reinstatementClause !== undefined) reinstatementClause.value = data.reinstatementClause
                if (data.indexClause !== undefined) indexClause.value = data.indexClause
                if (data.mortgageClause !== undefined) mortgageClause.value = data.mortgageClause
                if (data.bankName !== undefined) bankName.value = data.bankName
                if (data.insuranceAmounts) {
                    if (data.insuranceAmounts.property) insuranceAmountsProperty.value = { ...data.insuranceAmounts.property }
                    if (data.insuranceAmounts.inventory) insuranceAmountsInventory.value = { ...data.insuranceAmounts.inventory }
                    if (data.insuranceAmounts.highRisk) insuranceAmountsHighRisk.value = { ...data.insuranceAmounts.highRisk }
                    if (data.insuranceAmounts.merchandise) insuranceAmountsMerchandise.value = { ...data.insuranceAmounts.merchandise }
                }
                if (data.otherItems) otherItems.value = [...data.otherItems]
                if (data.firstLossBasis !== undefined) firstLossBasis.value = data.firstLossBasis
                if (data.firstLossPercentage !== undefined) firstLossPercentage.value = data.firstLossPercentage
                if (data.firstLossMerchandise) firstLossMerchandise.value = { ...data.firstLossMerchandise }
                if (data.businessInterruption !== undefined) businessInterruption.value = data.businessInterruption
                if (data.grossProfits !== undefined) grossProfits.value = data.grossProfits
                if (data.increasedCostWorking !== undefined) increasedCostWorking.value = data.increasedCostWorking
                if (data.rentReceivable !== undefined) rentReceivable.value = data.rentReceivable
                if (data.otherBusinessInterruption !== undefined) otherBusinessInterruption.value = data.otherBusinessInterruption
                if (data.indemnityPeriod !== undefined) indemnityPeriod.value = data.indemnityPeriod
                if (data.uninsuredVariableCosts !== undefined) uninsuredVariableCosts.value = data.uninsuredVariableCosts
                if (data.plateGlassCoverage !== undefined) plateGlassCoverage.value = data.plateGlassCoverage
                if (data.plateGlassItems) plateGlassItems.value = [...data.plateGlassItems]
                if (data.lossOfRentWeeks !== undefined) lossOfRentWeeks.value = data.lossOfRentWeeks
                if (data.removalOfDebris !== undefined) removalOfDebris.value = data.removalOfDebris
                if (data.burglaryDamage !== undefined) burglaryDamage.value = data.burglaryDamage
                if (data.insuranceRemarks !== undefined) insuranceRemarks.value = data.insuranceRemarks
                if (data.yearsInBusiness !== undefined) yearsInBusiness.value = data.yearsInBusiness
                if (data.annualTurnover !== undefined) annualTurnover.value = data.annualTurnover
                if (data.booksMaintained !== undefined) booksMaintained.value = data.booksMaintained
                if (data.inventoryFrequency !== undefined) inventoryFrequency.value = data.inventoryFrequency
                if (data.booksAudited !== undefined) booksAudited.value = data.booksAudited
                if (data.accountantsDetails !== undefined) accountantsDetails.value = data.accountantsDetails
                if (data.accountsSecured !== undefined) accountsSecured.value = data.accountsSecured
                if (data.otherInsurances !== undefined) otherInsurances.value = data.otherInsurances
                if (data.otherInsurancesDetails !== undefined) otherInsurancesDetails.value = data.otherInsurancesDetails
                if (data.previouslyInsured !== undefined) previouslyInsured.value = data.previouslyInsured
                if (data.previousInsurer !== undefined) previousInsurer.value = data.previousInsurer
                if (data.previousPeriodFrom !== undefined) previousPeriodFrom.value = data.previousPeriodFrom
                if (data.previousPeriodTo !== undefined) previousPeriodTo.value = data.previousPeriodTo
                if (data.proposalDeclined !== undefined) proposalDeclined.value = data.proposalDeclined
                if (data.proposalDeclinedDetails !== undefined) proposalDeclinedDetails.value = data.proposalDeclinedDetails
                if (data.policyNotRenewed !== undefined) policyNotRenewed.value = data.policyNotRenewed
                if (data.policyNotRenewedDetails !== undefined) policyNotRenewedDetails.value = data.policyNotRenewedDetails
                if (data.insuranceCancelled !== undefined) insuranceCancelled.value = data.insuranceCancelled
                if (data.insuranceCancelledDetails !== undefined) insuranceCancelledDetails.value = data.insuranceCancelledDetails
                if (data.criminalConviction !== undefined) criminalConviction.value = data.criminalConviction
                if (data.criminalConvictionDetails !== undefined) criminalConvictionDetails.value = data.criminalConvictionDetails
                if (data.declarationPlace !== undefined) declarationPlace.value = data.declarationPlace
                if (data.declarationDate !== undefined) declarationDate.value = data.declarationDate
                if (data.proposerSignature !== undefined) proposerSignature.value = data.proposerSignature
            }
        } catch (error) {
            console.error('Error loading draft:', error)
        }
    }
}

// Watch para emitir cambios de validación
watch(isFormValid, (newVal) => {
    emit('validation-changed', newVal)
}, { immediate: true })

loadDraft()

// Exposición
defineExpose({
    validate: () => isFormValid.value,
    getFormData: () => ({
        premisesAddress: premisesAddress.value,
        insuringAs: insuringAs.value,
        premisesUse: [...premisesUse.value],
        goodsStored: goodsStored.value,
        manufacturingProcesses: manufacturingProcesses.value,
        hazardousMaterials: hazardousMaterials.value,
        hazardousMaterialsDetails: hazardousMaterialsDetails.value,
        hazardousActivities: hazardousActivities.value,
        hazardousActivitiesDetails: hazardousActivitiesDetails.value,
        adjoiningBuildingDetails: adjoiningBuildingDetails.value,
        soleOccupants: soleOccupants.value,
        otherOccupantsDetails: otherOccupantsDetails.value,
        otherCircumstances: otherCircumstances.value,
        yearOfConstruction: yearOfConstruction.value,
        numberOfStoreys: numberOfStoreys.value,
        externalWalls: externalWalls.value,
        internalWalls: internalWalls.value,
        roof: roof.value,
        ceiling: ceiling.value,
        floor: floor.value,
        precautions: { ...precautionsValues.value },
        fireExtinguishingDetails: fireExtinguishingDetails.value,
        precautionsRemarks: precautionsRemarks.value,
        coverType: coverType.value,
        burglaryCoverNeeded: burglaryCoverNeeded.value,
        reinstatementClause: reinstatementClause.value,
        indexClause: indexClause.value,
        mortgageClause: mortgageClause.value,
        bankName: bankName.value,
        insuranceAmounts: {
            property: { ...insuranceAmountsProperty.value },
            inventory: { ...insuranceAmountsInventory.value },
            highRisk: { ...insuranceAmountsHighRisk.value },
            merchandise: { ...insuranceAmountsMerchandise.value }
        },
        otherItems: [...otherItems.value],
        firstLossBasis: firstLossBasis.value,
        firstLossPercentage: firstLossPercentage.value,
        firstLossMerchandise: { ...firstLossMerchandise.value },
        businessInterruption: businessInterruption.value,
        grossProfits: grossProfits.value,
        increasedCostWorking: increasedCostWorking.value,
        rentReceivable: rentReceivable.value,
        otherBusinessInterruption: otherBusinessInterruption.value,
        indemnityPeriod: indemnityPeriod.value,
        uninsuredVariableCosts: uninsuredVariableCosts.value,
        plateGlassCoverage: plateGlassCoverage.value,
        plateGlassItems: [...plateGlassItems.value],
        lossOfRentWeeks: lossOfRentWeeks.value,
        removalOfDebris: removalOfDebris.value,
        burglaryDamage: burglaryDamage.value,
        insuranceRemarks: insuranceRemarks.value,
        yearsInBusiness: yearsInBusiness.value,
        annualTurnover: annualTurnover.value,
        booksMaintained: booksMaintained.value,
        inventoryFrequency: inventoryFrequency.value,
        booksAudited: booksAudited.value,
        accountantsDetails: accountantsDetails.value,
        accountsSecured: accountsSecured.value,
        otherInsurances: otherInsurances.value,
        otherInsurancesDetails: otherInsurancesDetails.value,
        previouslyInsured: previouslyInsured.value,
        previousInsurer: previousInsurer.value,
        previousPeriodFrom: previousPeriodFrom.value,
        previousPeriodTo: previousPeriodTo.value,
        proposalDeclined: proposalDeclined.value,
        proposalDeclinedDetails: proposalDeclinedDetails.value,
        policyNotRenewed: policyNotRenewed.value,
        policyNotRenewedDetails: policyNotRenewedDetails.value,
        insuranceCancelled: insuranceCancelled.value,
        insuranceCancelledDetails: insuranceCancelledDetails.value,
        criminalConviction: criminalConviction.value,
        criminalConvictionDetails: criminalConvictionDetails.value,
        declarationPlace: declarationPlace.value,
        declarationDate: declarationDate.value,
        proposerSignature: proposerSignature.value,
        timestamp: new Date().toISOString(),
        formType: 'CommercialFireBurglary',
        totals: {
            property: totalProperty.value,
            inventory: totalInventory.value,
            highRisk: totalHighRisk.value,
            merchandise: totalMerchandise.value,
            otherItems: totalOtherItems.value,
            ABCDE: totalABCDE.value,
            firstLoss: totalFirstLoss.value,
            businessInterruptionI: totalBusinessInterruptionI.value,
            businessInterruptionAll: totalBusinessInterruptionAll.value,
            plateGlass: totalPlateGlassValue.value,
            additionalCoverage: totalAdditionalCoverage.value,
            totalSumInsured: totalSumInsured.value
        }
    }),
    resetForm: resetForm,
    submitForm: submitForm,
    isFormValid: isFormValid.value,
    formData: {
        premisesAddress,
        insuringAs,
        premisesUse,
        goodsStored,
        manufacturingProcesses,
        hazardousMaterials,
        hazardousMaterialsDetails,
        hazardousActivities,
        hazardousActivitiesDetails,
        adjoiningBuildingDetails,
        soleOccupants,
        otherOccupantsDetails,
        otherCircumstances,
        yearOfConstruction,
        numberOfStoreys,
        externalWalls,
        internalWalls,
        roof,
        ceiling,
        floor,
        precautionsValues,
        fireExtinguishingDetails,
        precautionsRemarks,
        coverType,
        burglaryCoverNeeded,
        reinstatementClause,
        indexClause,
        mortgageClause,
        bankName,
        insuranceAmountsProperty,
        insuranceAmountsInventory,
        insuranceAmountsHighRisk,
        insuranceAmountsMerchandise,
        otherItems,
        firstLossBasis,
        firstLossPercentage,
        firstLossMerchandise,
        businessInterruption,
        grossProfits,
        increasedCostWorking,
        rentReceivable,
        otherBusinessInterruption,
        indemnityPeriod,
        uninsuredVariableCosts,
        plateGlassCoverage,
        plateGlassItems,
        lossOfRentWeeks,
        removalOfDebris,
        burglaryDamage,
        insuranceRemarks,
        yearsInBusiness,
        annualTurnover,
        booksMaintained,
        inventoryFrequency,
        booksAudited,
        accountantsDetails,
        accountsSecured,
        otherInsurances,
        otherInsurancesDetails,
        previouslyInsured,
        previousInsurer,
        previousPeriodFrom,
        previousPeriodTo,
        proposalDeclined,
        proposalDeclinedDetails,
        policyNotRenewed,
        policyNotRenewedDetails,
        insuranceCancelled,
        insuranceCancelledDetails,
        criminalConviction,
        criminalConvictionDetails,
        declarationPlace,
        declarationDate,
        proposerSignature
    }
})
</script>

<style scoped>
.rounded-borders {
    border-radius: 8px;
}

.border-grey {
    border: 1px solid #e0e0e0;
}

.border-top-grey {
    border-top: 1px solid #e0e0e0;
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

.bg-grey-3 {
    background-color: rgba(238, 238, 238, 0.8);
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