<template>
  <div>
    <h1>Listado de vehículos</h1>
    <v-row class="mt-1">
      <v-col cols="12" xl="3" lg="4" md="5" sm="6">
        <v-text-field
          v-model="form.owner"
          class="elevation-0"
          placeholder="Nombre o documento del propietario"
          outlined
          background-color="#fff"
          dense
          hide-details
          clearable
          @change="filter"
        ></v-text-field>
      </v-col>
      <v-col cols="12" lg="2" md="3" sm="3">
        <v-text-field
          v-model="form.plate"
          class="elevation-0"
          placeholder="Placa"
          outlined
          background-color="#fff"
          dense
          hide-details
          clearable
          @change="filter"
        ></v-text-field>
      </v-col>
      <v-spacer />
      <v-col cols="12" md="3" sm="3" class="d-flex justify-end">
        <nuxt-link to="/vehicle/create" class="button-primary"
          ><v-btn elevation="0" rounded class="button-primary"
            >Registrar Vehículo</v-btn
          ></nuxt-link
        >
      </v-col>
    </v-row>

    <div class="mt-6">
      <div v-if="loaging" class="d-flex flex-wrap">
        <v-skeleton-loader
          v-for="item in 10"
          :key="item"
          width="270"
          type="image, article"
          class="mr-4 mb-4"
        ></v-skeleton-loader>
      </div>
      <GeneralEmpty
        v-else-if="list.length <= 0"
        message="Lo sentimos, parece que no encontramos resultados para tu búsqueda"
      />
      <div v-else>
        <div class="d-flex flex-wrap">
          <GeneralVehicleCard v-for="item in list" :key="item" :item="item" />
        </div>
        <v-pagination
          v-if="form.totalPages > 1"
          v-model="form.page"
          class="mx-auto"
          :length="form.totalPages"
          :total-visible="5"
          circle
        ></v-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    loaging: false,
    form: {
      owner: '',
      plate: '',
      page: 1,
      totalPages: 0,
    },
    list: [],
  }),
  watch: {
    'form.page'(oldVal, newVal) {
      this.getList()
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.getList()
    })
  },
  methods: {
    filter() {
      this.form.page = 1

      this.getList()
    },
    async getList() {
      this.setLoading(true)

      const params = {
        page: this.form.page,
      }

      if (this.form.owner !== '') params.owner = this.form.owner
      if (this.form.plate !== null) params.plate = this.form.plate

      const result = await this.$store.dispatch('apiServices', {
        type: 'get',
        form: {
          url: 'vehicle/all',
          config: { params },
        },
      })

      if (result && result.data) {
        this.list = result.data.data
        this.form.totalPages = result.data.last_page
      } else {
        this.list = []
        this.form.totalPages = 0
      }

      this.setLoading(false)
    },
    setLoading(_open) {
      if (_open) {
        this.$nuxt.$loading.start()
        this.loaging = true
      } else {
        this.$nuxt.$loading.finish()
        this.loaging = false
      }
    },
  },
}
</script>
