<template>
  <q-expansion-item
    group="form-sections"
    icon="info"
    label="General Information"
    header-class="text-primary text-weight-bold"
    default-opened
  >
    <q-card>
      <q-card-section>
        <q-form class="q-gutter-md">
          <!-- Step 1: Select broker -->
          <q-select
            filled
            v-model="form.broker"
            :options="brokerOptions"
            label="Select broker"
            dense
            standout
          />

          <!-- Step 2: Select on acc. Code -->
          <q-select
            filled
            v-model="form.accCode"
            :options="accCodeOptions"
            label="Select on acc. Code"
            dense
            standout
          />

          <!-- Step 3: Select Insurance Cover -->
          <q-select
            filled
            v-model="form.insuranceCover"
            :options="insuranceCoverOptions"
            label="Select Insurance Cover"
            dense
            standout
          />

          <!-- Step 5: Location of Premises -->
          <q-input
            filled
            v-model="form.premisesLocation"
            label="Location of Premises Proposed for Insurance"
            dense
            standout
          />

          <!-- Step 6: Occupation of the entire building -->
          <q-select
            filled
            v-model="form.buildingOccupation"
            :options="buildingOccupationOptions"
            label="Occupation of the entire building"
            dense
            standout
          />

          <!-- Question 6a: Owner/Tenant Radio -->
          <div class="q-pa-sm">
            <p class="q-mb-sm text-weight-medium">Property Relationship:</p>
            <q-option-group
              v-model="form.propertyRelationship"
              :options="propertyRelationshipOptions"
              type="radio"
              inline
              dense
            />
          </div>

          <!-- Question 6b + 6c: Residence types Radio -->
          <div class="q-pa-sm">
            <p class="q-mb-sm text-weight-medium">Residence Type:</p>
            <div class="row items-center">
              <q-option-group
                v-model="form.residenceType"
                :options="residenceTypeOptions"
                type="radio"
                inline
                dense
                @update:model-value="handleResidenceTypeChange"
              />
            </div>
            
            <!-- Commercial Activity Type (condicional) -->
            <div v-if="form.residenceType === 'commercial'" class="q-mt-md">
              <q-select
                filled
                v-model="form.commercialActivityType"
                :options="commercialActivityOptions"
                label="Select Commercial Activity Type"
                dense
                standout
                class="full-width"
              />
            </div>
          </div>

          <!-- Home options -->
          <q-select
            filled
            v-model="form.homeOption"
            :options="homeOptions"
            label="Select home option"
            dense
            standout
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script setup>
import { reactive } from 'vue';

// Form data
const form = reactive({
  broker: '',
  accCode: '',
  insuranceCover: '',
  premisesLocation: '',
  buildingOccupation: '',
  propertyRelationship: 'owner',
  residenceType: 'only',
  commercialActivityType: '',
  homeOption: ''
});

// Options
const brokerOptions = ['ASD', 'AYD', 'ASH'];
const accCodeOptions = ['ATR', 'ACS', 'AMN'];
const insuranceCoverOptions = ['Inception Date', 'Policy period', 'Invoice Date'];
const buildingOccupationOptions = ['Fire only', 'Other option 1', 'Other option 2'];
const propertyRelationshipOptions = [
  { label: 'Owner', value: 'owner' },
  { label: 'Tenant', value: 'tenant' }
];
const residenceTypeOptions = [
  { label: 'Residence Only', value: 'only' },
  { label: 'Residence & Commercial Activity', value: 'commercial' }
];
const commercialActivityOptions = [
  'Short Term Rental',
  'Long Term Rental',
  'AirBnB',
  'Home Office',
  'Small Business',
  'Other (please specify)'
];
const homeOptions = [
  'Home (building) only',
  'Contents only',
  'Home + Contents'
];

const handleResidenceTypeChange = (value) => {
  if (value !== 'commercial') {
    form.commercialActivityType = '';
  }
};

// Exponer datos del formulario
defineExpose({
  formData: form,
  resetForm: () => {
    Object.assign(form, {
      broker: '',
      accCode: '',
      insuranceCover: '',
      premisesLocation: '',
      buildingOccupation: '',
      propertyRelationship: 'owner',
      residenceType: 'only',
      commercialActivityType: '',
      homeOption: ''
    });
  }
});
</script>

<style scoped>
.full-width {
  width: 100%;
}
</style>