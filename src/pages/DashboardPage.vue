<template>
  <q-page class="dashboard-page q-pa-md">

    <div class="q-mb-xl ">
      <h4 class="text-h4 text-weight-bold q-mb-none">Dashboard</h4>
      <p class="text-subtitle1 text-grey-7 q-mt-sm">
        Access active forms quickly and manage system information.
      </p>
    </div>

    <div class="row justify-center q-col-gutter-lg">

      <div class="col-xs-12 col-sm-6 col-md-3 q-mb-md">
        <q-card class="dashboard-card">

          <q-card-section class="text-center q-pt-lg">
            <div class="icon-wrapper bg-red-1 flex flex-center" style="margin: 0 auto; width: 60px; height: 60px; border-radius: 50%;">
              <q-icon name="whatshot" size="42px" color="red-7" />
            </div>
            <div class="text-h6 q-mt-sm text-weight-bold">Fire Only</div>
            <div class="text-subtitle2 text-grey-7">
              View and fill out forms
            </div>
          </q-card-section>

          <q-separator class="card-separator" />

          <q-card-actions class="q-pa-md">
            <q-btn 
              label="Open"
              to="/FireOnly"
              icon="arrow_forward"
              color="red-6"
              unelevated
              class="full-width btn-rounded"
            />
          </q-card-actions>

        </q-card>
      </div>

    </div>

  </q-page>
</template>


<style scoped>
.dashboard-page {
  padding: 30px;
}

.dashboard-card {
  border-radius: 16px;
  box-shadow: 0 5px 18px rgba(0,0,0,0.06);
  transition: transform 0.25s ease, box-shadow 0.3s ease;
  overflow: hidden;
}

.dashboard-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 28px rgba(0,0,0,0.12);
}

.icon-wrapper {
  width: 70px;
  height: 70px;
  margin: auto;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-separator {
  background-color: rgba(0,0,0,0.08);
  margin: 5px 20px;
}

.btn-rounded {
  border-radius: 10px;
  font-weight: 600;
}
</style>
