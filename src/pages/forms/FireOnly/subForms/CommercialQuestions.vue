<template>
  <div>
    <div class="q-mb-md">
      <div class="text-subtitle2 q-mb-sm">12a) On main building(s) and structures *</div>
      <q-select
        v-model="selectedBuildingItems"
        :options="buildingOptions"
        label="Select building items to insure"
        multiple
        outlined
        emit-value
        map-options
        :rules="[val => val && val.length > 0 || 'Select at least one building item']"
      />
      
      <div v-for="item in selectedBuildingItems" :key="item" class="q-ml-md q-mt-sm">
        <q-input
          v-model="buildingAmounts[item]"
          :label="`Amount for ${getBuildingLabel(item)}`"
          type="number"
          prefix="$"
          outlined
          dense
          :rules="[val => val > 0 || 'Amount must be greater than 0']"
        />
      </div>
    </div>

    <div class="q-mb-md">
      <div class="text-subtitle2 q-mb-sm">12b) On business furniture, fixtures and equipment *</div>
      <q-select
        v-model="selectedBusinessItems"
        :options="businessOptions"
        label="Select business items to insure"
        multiple
        outlined
        emit-value
        map-options
        :rules="[val => val && val.length > 0 || 'Select at least one business item']"
      />
      
      <div v-for="item in selectedBusinessItems" :key="item" class="q-ml-md q-mt-sm">
        <q-input
          v-model="businessAmounts[item]"
          :label="`Amount for ${getBusinessLabel(item)}`"
          type="number"
          prefix="$"
          outlined
          dense
          :rules="[val => val > 0 || 'Amount must be greater than 0']"
        />
      </div>
    </div>

    <div class="q-mb-md">
      <div class="text-subtitle2 q-mb-sm">12c) On electronic equipment *</div>
      <q-select
        v-model="selectedElectronicItems"
        :options="electronicOptions"
        label="Select electronic items to insure"
        multiple
        outlined
        emit-value
        map-options
        :rules="[val => val && val.length > 0 || 'Select at least one electronic item']"
      />
      
      <div v-for="item in selectedElectronicItems" :key="item" class="q-ml-md q-mt-sm">
        <q-input
          v-model="electronicAmounts[item]"
          :label="`Amount for ${getElectronicLabel(item)}`"
          type="number"
          prefix="$"
          outlined
          dense
          :rules="[val => val > 0 || 'Amount must be greater than 0']"
        />
      </div>
    </div>

    <div class="q-mb-md">
      <div class="text-subtitle2 q-mb-sm">12d) On stocks *</div>
      <q-select
        v-model="selectedStockItems"
        :options="stockOptions"
        label="Select stock items to insure"
        multiple
        outlined
        emit-value
        map-options
        :rules="[val => val && val.length > 0 || 'Select at least one stock item']"
      />
      
      <div v-for="item in selectedStockItems" :key="item" class="q-ml-md q-mt-sm">
        <q-input
          v-model="stockAmounts[item]"
          :label="`Amount for ${getStockLabel(item)}`"
          type="number"
          prefix="$"
          outlined
          dense
          :rules="[val => val > 0 || 'Amount must be greater than 0']"
        />
      </div>
    </div>

    <div class="q-mb-md">
      <div class="text-subtitle2 q-mb-sm">12e) Other items *</div>
      <q-input
        v-model="otherItemsDescription"
        label="Description of other items"
        outlined
        class="q-mb-sm"
        :rules="[val => !!val || 'Description is required']"
      />
      <q-input
        v-model="otherItemsAmount"
        label="Amount for other items"
        type="number"
        prefix="$"
        outlined
        :rules="[val => val > 0 || 'Amount must be greater than 0']"
      />
    </div>

    <div class="q-mb-md">
      <div class="text-subtitle2 q-mb-sm">12f) Burglary cover Premier Risque / First Loss *</div>
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-4">
          <q-select
            v-model="burglaryCover"
            :options="yesNoOptions"
            label="Burglary Cover"
            outlined
            :rules="[val => !!val || 'This field is required']"
            @update:model-value="handleBurglaryCoverChange"
          />
        </div>
        
        <div v-if="burglaryCover === 'Yes'" class="col-12 col-md-4">
          <q-select
            v-model="burglaryPercentage"
            :options="burglaryPercentageOptions"
            label="Cover Percentage"
            outlined
            emit-value
            map-options
            :rules="[val => !!val || 'Percentage is required']"
          />
        </div>
        
        <div v-if="burglaryCover === 'Yes' && burglaryPercentage === 'other'" class="col-12 col-md-4">
          <q-input
            v-model="customBurglaryPercentage"
            label="Custom Percentage"
            suffix="%"
            outlined
            type="number"
            :rules="[val => val > 0 || 'Percentage must be greater than 0']"
          />
        </div>
      </div>

      <div v-if="burglaryCover === 'Yes'" class="q-mt-md">
        <div class="text-caption q-mb-sm">Burglary Stock Amounts:</div>
        <div v-for="item in selectedStockItems" :key="`burglary-${item}`" class="q-ml-md q-mt-sm">
          <q-input
            v-model="burglaryStockAmounts[item]"
            :label="`Burglary amount for ${getStockLabel(item)}`"
            type="number"
            prefix="$"
            outlined
            dense
            :rules="[val => val > 0 || 'Amount must be greater than 0']"
          />
        </div>
      </div>
    </div>

    <div class="q-mb-md">
      <div class="text-subtitle2 q-mb-sm">12g) Business Interruption *</div>
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-4">
          <q-select
            v-model="businessInterruption"
            :options="yesNoOptions"
            label="Business Interruption"
            outlined
            :rules="[val => !!val || 'This field is required']"
            @update:model-value="handleBusinessInterruptionChange"
          />
        </div>
      </div>

      <div v-if="businessInterruption === 'Yes'" class="q-mt-md">
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-6">
            <q-input
              v-model="annualGrossProfits"
              label="Annual Gross profits"
              type="number"
              prefix="$"
              outlined
              :rules="[val => val > 0 || 'Amount must be greater than 0']"
            />
          </div>
          <div class="col-12 col-md-6">
            <q-input
              v-model="additionalCostWorking"
              label="Additional increased cost of working"
              type="number"
              prefix="$"
              outlined
              :rules="[val => val > 0 || 'Amount must be greater than 0']"
            />
          </div>
          <div class="col-12 col-md-6">
            <q-input
              v-model="rentReceivable"
              label="Rent receivable"
              type="number"
              prefix="$"
              outlined
              :rules="[val => val > 0 || 'Amount must be greater than 0']"
            />
          </div>
          <div class="col-12 col-md-6">
            <q-input
              v-model="otherBusinessInterruption"
              label="Other (please specify)"
              outlined
              :rules="[val => !!val || 'Description is required']"
            />
          </div>
          <div class="col-12 col-md-6">
            <q-input
              v-model="otherBusinessInterruptionAmount"
              label="Amount for other"
              type="number"
              prefix="$"
              outlined
              :rules="[val => val > 0 || 'Amount must be greater than 0']"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="q-mb-md">
      <div class="text-subtitle2 q-mb-sm">12h) Plate Glass *</div>
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-4">
          <q-select
            v-model="plateGlass"
            :options="yesNoOptions"
            label="Plate Glass"
            outlined
            :rules="[val => !!val || 'This field is required']"
            @update:model-value="handlePlateGlassChange"
          />
        </div>
      </div>

      <div v-if="plateGlass === 'Yes'" class="q-mt-md">
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <q-input
              v-model="glassPosition"
              label="Position of each square/pane of glass"
              outlined
              type="textarea"
              rows="2"
              :rules="[val => !!val || 'Position is required']"
            />
          </div>
          <div class="col-12 col-md-6">
            <q-input
              v-model="glassSize"
              label="Size of each square/pane (height & width)"
              outlined
              :rules="[val => !!val || 'Size is required']"
            />
          </div>
          <div class="col-12 col-md-6">
            <q-input
              v-model="glassDescription"
              label="Description of glass"
              outlined
              :rules="[val => !!val || 'Description is required']"
            />
          </div>
          <div class="col-12 col-md-6">
            <q-input
              v-model="glassValue"
              label="Value / Sum to be insured"
              type="number"
              prefix="$"
              outlined
              :rules="[val => val > 0 || 'Amount must be greater than 0']"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="q-mb-md">
      <div class="text-subtitle2 q-mb-sm">12i) Additional Coverage *</div>
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-4">
          <q-select
            v-model="additionalCoverage"
            :options="yesNoOptions"
            label="Additional Coverage"
            outlined
            :rules="[val => !!val || 'This field is required']"
            @update:model-value="handleAdditionalCoverageChange"
          />
        </div>
      </div>

      <div v-if="additionalCoverage === 'Yes'" class="q-mt-md">
        <q-select
          v-model="selectedAdditionalCoverages"
          :options="additionalCoverageOptions"
          label="Select additional coverages"
          multiple
          outlined
          emit-value
          map-options
          :rules="[val => val && val.length > 0 || 'Select at least one additional coverage']"
        />
      </div>
    </div>

    <div class="q-mb-md">
      <div class="text-subtitle2 q-mb-sm">Premium Calculation (Commercial - Manual Rates)</div>
      <div class="text-caption text-grey-7 q-mb-sm">
        Enter rates manually as they vary for commercial policies
      </div>
      
      <q-card flat bordered class="q-mt-sm">
        <q-table
          :rows="premiumRows"
          :columns="premiumColumns"
          row-key="category"
          hide-bottom
          flat
          bordered
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="category" :props="props">
                {{ props.row.category }}
              </q-td>
              <q-td key="sumInsured" :props="props">
                {{ formatCurrency(props.row.sumInsured) }}
              </q-td>
              <q-td key="rate" :props="props">
                <q-input
                  v-model="manualRates[props.row.category]"
                  type="number"
                  suffix="‰"
                  dense
                  borderless
                  class="rate-input"
                  :rules="[val => val >= 0 || 'Rate must be positive']"
                  @update:model-value="updatePremiumCalculation()"
                />
              </q-td>
              <q-td key="premium" :props="props">
                {{ formatCurrency(props.row.premium) }}
              </q-td>
            </q-tr>
          </template>

          <template v-slot:bottom-row>
            <q-tr class="bg-grey-2">
              <q-td colspan="2" class="text-weight-bold text-right">
                Total Sum Insured:
              </q-td>
              <q-td></q-td>
              <q-td class="text-weight-bold">
                {{ formatCurrency(totalSumInsured) }}
              </q-td>
            </q-tr>
          </template>
        </q-table>

        <div class="row q-col-gutter-sm q-pa-md">
          <div class="col-12 col-md-6">
            <div class="text-weight-bold q-mb-sm">Manual Discounts & Costs</div>
            
            <div class="row items-center q-mb-xs">
              <div class="col-6">Special Discount</div>
              <div class="col-3">
                <q-input
                  v-model="manualDiscounts.specialPercentage"
                  type="number"
                  suffix="%"
                  dense
                  outlined
                  :rules="[val => val >= 0 && val <= 100 || 'Percentage must be 0-100']"
                  @update:model-value="updateDiscounts()"
                />
              </div>
              <div class="col-3 text-right text-negative">
                -{{ formatCurrency(manualDiscounts.specialAmount) }}
              </div>
            </div>
            
            <div class="row items-center q-mb-xs">
              <div class="col-6">Extra Discount</div>
              <div class="col-3">
                <q-input
                  v-model="manualDiscounts.extraPercentage"
                  type="number"
                  suffix="%"
                  dense
                  outlined
                  :rules="[val => val >= 0 && val <= 100 || 'Percentage must be 0-100']"
                  @update:model-value="updateDiscounts()"
                />
              </div>
              <div class="col-3 text-right text-negative">
                -{{ formatCurrency(manualDiscounts.extraAmount) }}
              </div>
            </div>
            
            <!-- Cost -->
            <div class="row items-center q-mb-xs">
              <div class="col-6">Cost</div>
              <div class="col-3">
                <q-input
                  v-model="manualCost"
                  type="number"
                  prefix="$"
                  dense
                  outlined
                  :rules="[val => val >= 0 || 'Cost must be positive']"
                  @update:model-value="updateDiscounts()"
                />
              </div>
              <div class="col-3 text-right">
                {{ formatCurrency(manualCost) }}
              </div>
            </div>
            
            <q-separator class="q-my-sm" />
            <div class="row items-center text-weight-bold">
              <div class="col-6">Subtotal</div>
              <div class="col-6 text-right">{{ formatCurrency(subtotalPremium) }}</div>
            </div>
          </div>

          <div class="col-12 col-md-6">
            <div class="text-weight-bold q-mb-sm">Taxes & Total</div>
            
            <div class="row items-center q-mb-xs">
              <div class="col-6">Tax Percentage</div>
              <div class="col-3">
                <q-input
                  v-model="manualTaxPercentage"
                  type="number"
                  suffix="%"
                  dense
                  outlined
                  :rules="[val => val >= 0 && val <= 100 || 'Percentage must be 0-100']"
                  @update:model-value="updateDiscounts()"
                />
              </div>
              <div class="col-3 text-right">
                {{ formatCurrency(taxAmount) }}
              </div>
            </div>
            
            <q-separator class="q-my-sm" />
            <div class="row items-center text-weight-bold text-positive">
              <div class="col-6">Total Premium</div>
              <div class="col-6 text-right">{{ formatCurrency(totalPremium) }}</div>
            </div>
          </div>
        </div>

        <q-card-section class="bg-yellow-2 text-caption">
          <q-icon name="info" class="q-mr-xs" />
          <strong>Note:</strong> For commercial policies, rates vary based on risk assessment. 
          Please enter the applicable rates manually for each category.
        </q-card-section>
      </q-card>
    </div>

    <div class="q-mb-md">
      <div class="text-subtitle2 q-mb-sm">Question 13) Business Information *</div>
      <q-card flat bordered class="bg-grey-1">
        <q-card-section>
          <div class="text-caption text-grey-7 q-mb-md">Information to be completed by the officer</div>
          
          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-12 col-md-6">
              <q-input
                v-model="businessInfo.yearsInBusiness"
                label="How long have you been in the business?"
                outlined
                suffix="years"
                type="number"
                :rules="[val => val >= 0 || 'Enter valid number of years']"
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                v-model="businessInfo.annualTurnover"
                label="Your estimated annual turnover?"
                type="number"
                prefix="$"
                outlined
                :rules="[val => val > 0 || 'Annual turnover must be greater than 0']"
              />
            </div>
          </div>

          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-12 col-md-6">
              <q-select
                v-model="businessInfo.booksMaintained"
                :options="yesNoOptions"
                label="Are your books regularly maintained and updated?"
                outlined
                :rules="[val => !!val || 'This field is required']"
              />
            </div>
            <div class="col-12 col-md-6">
              <q-select
                v-model="businessInfo.stockInventoryFrequency"
                :options="inventoryFrequencyOptions"
                label="How frequently is stock inventory taken?"
                outlined
                emit-value
                map-options
                :rules="[val => !!val || 'This field is required']"
              />
            </div>
          </div>

          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-12 col-md-6">
              <q-select
                v-model="businessInfo.booksAudited"
                :options="yesNoOptions"
                label="Are your books regularly audited?"
                outlined
                :rules="[val => !!val || 'This field is required']"
              />
            </div>
            <div class="col-12 col-md-6">
              <q-select
                v-model="businessInfo.booksSecured"
                :options="yesNoOptions"
                label="Are your accounts books secured in a Fire proof safe or removed to another building outside business hours?"
                outlined
                :rules="[val => !!val || 'This field is required']"
              />
            </div>
          </div>

          <div class="q-mt-md">
            <q-input
              v-model="businessInfo.accountantDetails"
              label="Please state the names and addresses of your Accountants & auditors during last three years."
              type="textarea"
              outlined
              rows="3"
              :rules="[val => !!val || 'This field is required']"
            />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, defineExpose } from 'vue'

const emit = defineEmits(['validation-changed'])

const buildingOptions = [
  { label: 'On main building(s)', value: 'main_building' },
  { label: 'On warehouse / storage units', value: 'warehouse' },
  { label: 'On fence / premises boundary wall / gates', value: 'fence_wall' },
  { label: 'On landscaping / pavers / garden paving', value: 'landscaping' },
  { label: 'On Apartment', value: 'apartment' },
  { label: 'On Laundry Room', value: 'laundry_room' },
  { label: 'On swimming-pool / pool-deck', value: 'swimming_pool' },
  { label: 'On Tenants interest / improvements', value: 'tenants_interest' },
  { label: 'On storage', value: 'storage' },
  { label: 'On Solar Panels', value: 'solar_panels' }
]

const businessOptions = [
  { label: 'On Business furniture, fixtures and fittings', value: 'furniture' },
  { label: 'On business plant, machinery / equipment', value: 'machinery' },
  { label: 'On advertising signs / sign board', value: 'signs' },
  { label: 'On split airco units', value: 'ac_units' }
]

const electronicOptions = [
  { label: 'On Computers and Laptops', value: 'computers' },
  { label: 'On Cameras / alarm system', value: 'cameras_alarm' },
  { label: 'Any other portable electronic equipment', value: 'other_electronics' }
]

const stockOptions = [
  { label: 'On stocks in trade', value: 'stocks_trade' },
  { label: 'On stocks in warehouse', value: 'stocks_warehouse' },
  { label: 'On stocks held in trust / custody / commission', value: 'stocks_trust' }
]

const burglaryPercentageOptions = [
  { label: '10% (1/10)', value: '10' },
  { label: '16% (1/8)', value: '16' },
  { label: '20% (1/5)', value: '20' },
  { label: '25% (1/4)', value: '25' },
  { label: '33.33% (1/3)', value: '33.33' },
  { label: '50% (1/2)', value: '50' },
  { label: 'Other', value: 'other' }
]

const additionalCoverageOptions = [
  { label: 'On loss of rent receivable (max 5% of TSI)', value: 'loss_of_rent' },
  { label: 'On removal of debris (max 10% of TSI)', value: 'removal_debris' },
  { label: 'On damage to building in burglary (max AWG 5,000)', value: 'burglary_damage' }
]

const inventoryFrequencyOptions = [
  { label: 'Monthly', value: 'monthly' },
  { label: 'Quarterly', value: 'quarterly' },
  { label: 'Semi-Annually', value: 'semi_annually' },
  { label: 'Annually', value: 'annually' },
  { label: 'Never', value: 'never' }
]

const yesNoOptions = ['Yes', 'No']

const selectedBuildingItems = ref([])
const selectedBusinessItems = ref([])
const selectedElectronicItems = ref([])
const selectedStockItems = ref([])
const selectedAdditionalCoverages = ref([])
const otherItemsDescription = ref('')
const otherItemsAmount = ref(0)

const burglaryCover = ref('')
const burglaryPercentage = ref('')
const customBurglaryPercentage = ref('')

const businessInterruption = ref('')
const annualGrossProfits = ref(0)
const additionalCostWorking = ref(0)
const rentReceivable = ref(0)
const otherBusinessInterruption = ref('')
const otherBusinessInterruptionAmount = ref(0)

const plateGlass = ref('')
const glassPosition = ref('')
const glassSize = ref('')
const glassDescription = ref('')
const glassValue = ref(0)

const additionalCoverage = ref('')

const businessInfo = reactive({
  yearsInBusiness: 0,
  annualTurnover: 0,
  booksMaintained: '',
  stockInventoryFrequency: '',
  booksAudited: '',
  booksSecured: '',
  accountantDetails: ''
})

const buildingAmounts = reactive({})
const businessAmounts = reactive({})
const electronicAmounts = reactive({})
const stockAmounts = reactive({})
const burglaryStockAmounts = reactive({})

const isFormValid = ref(false)

const manualRates = reactive({
  'Building': 2.50,
  'General Contents': 5.50,
  'Electronic Equipment': 10.00,
  'Stocks': 12.00,
  'Other Items': 8.00
})

const manualDiscounts = reactive({
  specialPercentage: 10,
  specialAmount: 0,
  extraPercentage: 10,
  extraAmount: 0
})

const manualCost = ref(23.50)
const manualTaxPercentage = ref(7.52)

const premiumColumns = [
  { name: 'category', label: 'Category', field: 'category', align: 'left', sortable: true },
  { name: 'sumInsured', label: 'Sum Insured (S.I.)', field: 'sumInsured', align: 'right', sortable: true },
  { name: 'rate', label: 'Rate (‰)', field: 'rate', align: 'center', sortable: true },
  { name: 'premium', label: 'Premium', field: 'premium', align: 'right', sortable: true }
]

const totalBuildingAmount = computed(() => {
  return selectedBuildingItems.value.reduce((sum, item) => {
    return sum + (Number(buildingAmounts[item]) || 0)
  }, 0)
})

const totalBusinessAmount = computed(() => {
  return selectedBusinessItems.value.reduce((sum, item) => {
    return sum + (Number(businessAmounts[item]) || 0)
  }, 0)
})

const totalElectronicAmount = computed(() => {
  return selectedElectronicItems.value.reduce((sum, item) => {
    return sum + (Number(electronicAmounts[item]) || 0)
  }, 0)
})

const totalStockAmount = computed(() => {
  return selectedStockItems.value.reduce((sum, item) => {
    return sum + (Number(stockAmounts[item]) || 0)
  }, 0)
})

const premiumRows = computed(() => {
  const rows = []
  
  const buildingSum = totalBuildingAmount.value
  if (buildingSum > 0) {
    const buildingRate = manualRates['Building'] || 0
    rows.push({
      category: 'Building',
      sumInsured: buildingSum,
      rate: buildingRate,
      premium: buildingSum * (buildingRate / 1000)
    })
  }
  
  const businessSum = totalBusinessAmount.value
  if (businessSum > 0) {
    const businessRate = manualRates['General Contents'] || 0
    rows.push({
      category: 'General Contents',
      sumInsured: businessSum,
      rate: businessRate,
      premium: businessSum * (businessRate / 1000)
    })
  }
  
  const electronicSum = totalElectronicAmount.value
  if (electronicSum > 0) {
    const electronicRate = manualRates['Electronic Equipment'] || 0
    rows.push({
      category: 'Electronic Equipment',
      sumInsured: electronicSum,
      rate: electronicRate,
      premium: electronicSum * (electronicRate / 1000)
    })
  }
  
  const stockSum = totalStockAmount.value
  if (stockSum > 0) {
    const stockRate = manualRates['Stocks'] || 0
    rows.push({
      category: 'Stocks',
      sumInsured: stockSum,
      rate: stockRate,
      premium: stockSum * (stockRate / 1000)
    })
  }
  
  if (otherItemsAmount.value > 0) {
    const otherSum = otherItemsAmount.value
    const otherRate = manualRates['Other Items'] || 0
    rows.push({
      category: 'Other Items',
      sumInsured: otherSum,
      rate: otherRate,
      premium: otherSum * (otherRate / 1000)
    })
  }
  
  return rows
})

const totalBasePremium = computed(() => {
  return premiumRows.value.reduce((sum, row) => sum + row.premium, 0)
})

const updateDiscounts = () => {
  const basePremium = totalBasePremium.value
  
  manualDiscounts.specialAmount = basePremium * (manualDiscounts.specialPercentage / 100)
  
  const afterSpecialDiscount = basePremium - manualDiscounts.specialAmount
  manualDiscounts.extraAmount = afterSpecialDiscount * (manualDiscounts.extraPercentage / 100)
}

const updatePremiumCalculation = () => {
  updateDiscounts()
}

const subtotalPremium = computed(() => {
  return totalBasePremium.value - manualDiscounts.specialAmount - manualDiscounts.extraAmount + manualCost.value
})

const taxAmount = computed(() => {
  return subtotalPremium.value * (manualTaxPercentage.value / 100)
})

const totalPremium = computed(() => {
  return subtotalPremium.value + taxAmount.value
})

const getBuildingLabel = (value) => {
  const option = buildingOptions.find(opt => opt.value === value)
  return option ? option.label : value
}

const getBusinessLabel = (value) => {
  const option = businessOptions.find(opt => opt.value === value)
  return option ? option.label : value
}

const getElectronicLabel = (value) => {
  const option = electronicOptions.find(opt => opt.value === value)
  return option ? option.label : value
}

const getStockLabel = (value) => {
  const option = stockOptions.find(opt => opt.value === value)
  return option ? option.label : value
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value || 0)
}

const totalSumInsured = computed(() => {
  let total = 0
  
  selectedBuildingItems.value.forEach(item => {
    total += Number(buildingAmounts[item]) || 0
  })
  
  selectedBusinessItems.value.forEach(item => {
    total += Number(businessAmounts[item]) || 0
  })
  
  selectedElectronicItems.value.forEach(item => {
    total += Number(electronicAmounts[item]) || 0
  })
  
  selectedStockItems.value.forEach(item => {
    total += Number(stockAmounts[item]) || 0
  })
  
  total += Number(otherItemsAmount.value) || 0
  
  return total
})

const handleBurglaryCoverChange = (value) => {
  if (value === 'Yes') {
    burglaryPercentage.value = burglaryPercentageOptions[0].value
  } else {
    burglaryPercentage.value = ''
    customBurglaryPercentage.value = ''
  }
}

const handleBusinessInterruptionChange = (value) => {
  if (value === 'No') {
    annualGrossProfits.value = 0
    additionalCostWorking.value = 0
    rentReceivable.value = 0
    otherBusinessInterruption.value = ''
    otherBusinessInterruptionAmount.value = 0
  }
}

const handlePlateGlassChange = (value) => {
  if (value === 'No') {
    glassPosition.value = ''
    glassSize.value = ''
    glassDescription.value = ''
    glassValue.value = 0
  }
}

const handleAdditionalCoverageChange = (value) => {
  if (value === 'No') {
    selectedAdditionalCoverages.value = []
  }
}

const combinedFormData = computed(() => ({
  selectedBuildingItems: selectedBuildingItems.value,
  selectedBusinessItems: selectedBusinessItems.value,
  selectedElectronicItems: selectedElectronicItems.value,
  selectedStockItems: selectedStockItems.value,
  selectedAdditionalCoverages: selectedAdditionalCoverages.value,
  otherItemsDescription: otherItemsDescription.value,
  otherItemsAmount: otherItemsAmount.value,
  
  burglaryCover: burglaryCover.value,
  burglaryPercentage: burglaryPercentage.value,
  customBurglaryPercentage: customBurglaryPercentage.value,
  
  businessInterruption: businessInterruption.value,
  annualGrossProfits: annualGrossProfits.value,
  additionalCostWorking: additionalCostWorking.value,
  rentReceivable: rentReceivable.value,
  otherBusinessInterruption: otherBusinessInterruption.value,
  otherBusinessInterruptionAmount: otherBusinessInterruptionAmount.value,
  
  plateGlass: plateGlass.value,
  glassPosition: glassPosition.value,
  glassSize: glassSize.value,
  glassDescription: glassDescription.value,
  glassValue: glassValue.value,
  
  additionalCoverage: additionalCoverage.value,
  
  buildingAmounts: { ...buildingAmounts },
  businessAmounts: { ...businessAmounts },
  electronicAmounts: { ...electronicAmounts },
  stockAmounts: { ...stockAmounts },
  burglaryStockAmounts: { ...burglaryStockAmounts },
  
  businessInfo: { ...businessInfo },
  
  totalSumInsured: totalSumInsured.value,
  totalBuildingAmount: totalBuildingAmount.value,
  totalBusinessAmount: totalBusinessAmount.value,
  totalElectronicAmount: totalElectronicAmount.value,
  totalStockAmount: totalStockAmount.value,
  
  premiumCalculation: {
    manualRates: { ...manualRates },
    manualDiscounts: { ...manualDiscounts },
    manualCost: manualCost.value,
    manualTaxPercentage: manualTaxPercentage.value,
    totalBasePremium: totalBasePremium.value,
    specialDiscount: manualDiscounts.specialAmount,
    extraDiscount: manualDiscounts.extraAmount,
    cost: manualCost.value,
    subtotalPremium: subtotalPremium.value,
    taxAmount: taxAmount.value,
    totalPremium: totalPremium.value
  }
}))

const validate = () => {
  console.log('=== VALIDATING COMMERCIAL QUESTIONS ===')
  
  const hasBuildingItems = selectedBuildingItems.value.length > 0
  const hasBusinessItems = selectedBusinessItems.value.length > 0
  const hasElectronicItems = selectedElectronicItems.value.length > 0
  const hasStockItems = selectedStockItems.value.length > 0
  const hasOtherItems = Number(otherItemsAmount.value) > 0 && !!otherItemsDescription.value

  if (!hasBuildingItems) {
    isFormValid.value = false
    emit('validation-changed', false)
    return false
  }

  if (!hasBusinessItems) {
    isFormValid.value = false
    emit('validation-changed', false)
    return false
  }

  if (!hasElectronicItems) {
    isFormValid.value = false
    emit('validation-changed', false)
    return false
  }

  if (!hasStockItems) {
    isFormValid.value = false
    emit('validation-changed', false)
    return false
  }

  if (!hasOtherItems) {
    isFormValid.value = false
    emit('validation-changed', false)
    return false
  }
  
  const hasValidBuildingAmounts = selectedBuildingItems.value.every(item => 
    Number(buildingAmounts[item]) > 0
  )
  
  if (!hasValidBuildingAmounts) {
    isFormValid.value = false
    emit('validation-changed', false)
    return false
  }
  
  const hasValidBusinessAmounts = selectedBusinessItems.value.every(item => 
    Number(businessAmounts[item]) > 0
  )
  if (!hasValidBusinessAmounts) {
    isFormValid.value = false
    emit('validation-changed', false)
    return false
  }
  
  const hasValidElectronicAmounts = selectedElectronicItems.value.every(item => 
    Number(electronicAmounts[item]) > 0
  )
  if (!hasValidElectronicAmounts) {
    isFormValid.value = false
    emit('validation-changed', false)
    return false
  }
  
  const hasValidStockAmounts = selectedStockItems.value.every(item => 
    Number(stockAmounts[item]) > 0
  )
  if (!hasValidStockAmounts) {
    isFormValid.value = false
    emit('validation-changed', false)
    return false
  }
  
  if (!burglaryCover.value) {
    isFormValid.value = false
    emit('validation-changed', false)
    return false
  }
  
  if (burglaryCover.value === 'Yes') {
    if (!burglaryPercentage.value) {
      isFormValid.value = false
      emit('validation-changed', false)
      return false
    }
    
    if (burglaryPercentage.value === 'other' && !customBurglaryPercentage.value) {
      isFormValid.value = false
      emit('validation-changed', false)
      return false
    }

    const hasValidBurglaryAmounts = selectedStockItems.value.every(item => 
      Number(burglaryStockAmounts[item]) > 0
    )
    if (!hasValidBurglaryAmounts) {
      isFormValid.value = false
      emit('validation-changed', false)
      return false
    }
  }
  
  if (!businessInterruption.value) {
    isFormValid.value = false
    emit('validation-changed', false)
    return false
  }
  
  if (businessInterruption.value === 'Yes') {
    if (!annualGrossProfits.value || Number(annualGrossProfits.value) <= 0) {
      isFormValid.value = false
      emit('validation-changed', false)
      return false
    }
    if (!additionalCostWorking.value || Number(additionalCostWorking.value) <= 0) {
      isFormValid.value = false
      emit('validation-changed', false)
      return false
    }
    if (!rentReceivable.value || Number(rentReceivable.value) <= 0) {
      isFormValid.value = false
      emit('validation-changed', false)
      return false
    }
    if (!otherBusinessInterruption.value) {
      isFormValid.value = false
      emit('validation-changed', false)
      return false
    }
    if (!otherBusinessInterruptionAmount.value || Number(otherBusinessInterruptionAmount.value) <= 0) {
      isFormValid.value = false
      emit('validation-changed', false)
      return false
    }
  }
  
  if (!plateGlass.value) {
    isFormValid.value = false
    emit('validation-changed', false)
    return false
  }
  
  if (plateGlass.value === 'Yes') {
    if (!glassPosition.value || !glassSize.value || !glassDescription.value || !glassValue.value || Number(glassValue.value) <= 0) {
      isFormValid.value = false
      emit('validation-changed', false)
      return false
    }
  }
  
  if (!additionalCoverage.value) {
    isFormValid.value = false
    emit('validation-changed', false)
    return false
  }
  
  if (additionalCoverage.value === 'Yes') {
    if (!selectedAdditionalCoverages.value || selectedAdditionalCoverages.value.length === 0) {
      isFormValid.value = false
      emit('validation-changed', false)
      return false
    }
  }
  
  if (!businessInfo.yearsInBusiness || Number(businessInfo.yearsInBusiness) < 0) {
    isFormValid.value = false
    emit('validation-changed', false)
    return false
  }
  
  if (!businessInfo.annualTurnover || Number(businessInfo.annualTurnover) <= 0) {
    isFormValid.value = false
    emit('validation-changed', false)
    return false
  }
  
  if (!businessInfo.booksMaintained) {
    isFormValid.value = false
    emit('validation-changed', false)
    return false
  }
  
  if (!businessInfo.stockInventoryFrequency) {
    isFormValid.value = false
    emit('validation-changed', false)
    return false
  }
  
  if (!businessInfo.booksAudited) {
    isFormValid.value = false
    emit('validation-changed', false)
    return false
  }
  
  if (!businessInfo.booksSecured) {
    isFormValid.value = false
    emit('validation-changed', false)
    return false
  }
  
  if (!businessInfo.accountantDetails) {
    isFormValid.value = false
    emit('validation-changed', false)
    return false
  }
  
  if (totalSumInsured.value > 0) {
    const categoriesWithAmount = []
    
    if (totalBuildingAmount.value > 0) categoriesWithAmount.push('Building')
    if (totalBusinessAmount.value > 0) categoriesWithAmount.push('General Contents')
    if (totalElectronicAmount.value > 0) categoriesWithAmount.push('Electronic Equipment')
    if (totalStockAmount.value > 0) categoriesWithAmount.push('Stocks')
    if (otherItemsAmount.value > 0) categoriesWithAmount.push('Other Items')
    
    const allRatesValid = categoriesWithAmount.every(category => {
      const rate = manualRates[category]
      return rate !== undefined && rate !== null && rate >= 0
    })
    
    if (!allRatesValid) {
      isFormValid.value = false
      emit('validation-changed', false)
      return false
    }
    
    if (manualDiscounts.specialPercentage < 0 || manualDiscounts.specialPercentage > 100) {
      isFormValid.value = false
      emit('validation-changed', false)
      return false
    }
    
    if (manualDiscounts.extraPercentage < 0 || manualDiscounts.extraPercentage > 100) {
      isFormValid.value = false
      emit('validation-changed', false)
      return false
    }
    
    if (manualTaxPercentage.value < 0 || manualTaxPercentage.value > 100) {
      isFormValid.value = false
      emit('validation-changed', false)
      return false
    }
  }
  
  console.log(' All validations passed')
  isFormValid.value = true
  emit('validation-changed', true)
  return true
}

watch([
  selectedBuildingItems,
  selectedBusinessItems,
  selectedElectronicItems,
  selectedStockItems,
  otherItemsAmount,
  otherItemsDescription,
  burglaryCover,
  burglaryPercentage,
  customBurglaryPercentage,
  businessInterruption,
  annualGrossProfits,
  additionalCostWorking,
  rentReceivable,
  otherBusinessInterruption,
  otherBusinessInterruptionAmount,
  plateGlass,
  glassPosition,
  glassSize,
  glassDescription,
  glassValue,
  additionalCoverage,
  selectedAdditionalCoverages,
  () => businessInfo.yearsInBusiness,
  () => businessInfo.annualTurnover,
  () => businessInfo.booksMaintained,
  () => businessInfo.stockInventoryFrequency,
  () => businessInfo.booksAudited,
  () => businessInfo.booksSecured,
  () => businessInfo.accountantDetails
], validate, { deep: true })

watch(() => buildingAmounts, validate, { deep: true })
watch(() => businessAmounts, validate, { deep: true })
watch(() => electronicAmounts, validate, { deep: true })
watch(() => stockAmounts, validate, { deep: true })
watch(() => burglaryStockAmounts, validate, { deep: true })

watch(() => manualRates, validate, { deep: true })
watch(() => manualDiscounts, () => {
  updateDiscounts()
  validate()
}, { deep: true })
watch(manualCost, () => {
  updateDiscounts()
  validate()
})
watch(manualTaxPercentage, () => {
  updateDiscounts()
  validate()
})

watch(selectedAdditionalCoverages, validate, { deep: true })

const resetForm = () => {
  console.log('Resetting CommercialQuestions form')
  
  selectedBuildingItems.value = []
  selectedBusinessItems.value = []
  selectedElectronicItems.value = []
  selectedStockItems.value = []
  selectedAdditionalCoverages.value = []
  otherItemsDescription.value = ''
  otherItemsAmount.value = 0
  
  burglaryCover.value = ''
  burglaryPercentage.value = ''
  customBurglaryPercentage.value = ''
  
  businessInterruption.value = ''
  annualGrossProfits.value = 0
  additionalCostWorking.value = 0
  rentReceivable.value = 0
  otherBusinessInterruption.value = ''
  otherBusinessInterruptionAmount.value = 0
  
  plateGlass.value = ''
  glassPosition.value = ''
  glassSize.value = ''
  glassDescription.value = ''
  glassValue.value = 0
  
  additionalCoverage.value = ''
  
  businessInfo.yearsInBusiness = 0
  businessInfo.annualTurnover = 0
  businessInfo.booksMaintained = ''
  businessInfo.stockInventoryFrequency = ''
  businessInfo.booksAudited = ''
  businessInfo.booksSecured = ''
  businessInfo.accountantDetails = ''
  
  manualRates['Building'] = 2.50
  manualRates['General Contents'] = 5.50
  manualRates['Electronic Equipment'] = 10.00
  manualRates['Stocks'] = 12.00
  manualRates['Other Items'] = 8.00
  
  manualDiscounts.specialPercentage = 10
  manualDiscounts.specialAmount = 0
  manualDiscounts.extraPercentage = 10
  manualDiscounts.extraAmount = 0
  
  manualCost.value = 23.50
  manualTaxPercentage.value = 7.52
  
  Object.keys(buildingAmounts).forEach(key => delete buildingAmounts[key])
  Object.keys(businessAmounts).forEach(key => delete businessAmounts[key])
  Object.keys(electronicAmounts).forEach(key => delete electronicAmounts[key])
  Object.keys(stockAmounts).forEach(key => delete stockAmounts[key])
  Object.keys(burglaryStockAmounts).forEach(key => delete burglaryStockAmounts[key])
  
  isFormValid.value = false
  emit('validation-changed', false)
}

updateDiscounts()

defineExpose({
  validate,
  resetForm,
  formData: combinedFormData,
  totalSumInsured,
  totalPremium,
  updateDiscounts
})
</script>

<style scoped>
.q-card {
  border-radius: 8px;
}

.text-subtitle2 {
  font-weight: 500;
}

.premium-table {
  font-size: 0.9rem;
}

.premium-table .q-table th {
  font-weight: bold;
  background-color: #f5f5f5;
}

.premium-table .q-table td {
  padding: 8px 16px;
}

.rate-input {
  max-width: 80px;
  margin: 0 auto;
}

.rate-input .q-field__control {
  min-height: 32px;
}
</style>