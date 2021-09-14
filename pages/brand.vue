<template>
  <div>
    <h1>Listado de marcas</h1>
    <v-row class="mt-1">
      <v-col cols="12" xl="3" lg="4" md="5" sm="6">
        <v-text-field
          v-model="form.name"
          class="elevation-0"
          placeholder="Nombre de la marca"
          outlined
          background-color="#fff"
          dense
          hide-details
          clearable
          @change="filter"
        ></v-text-field>
      </v-col>
    </v-row>

    <div class="mt-6">
      <div v-if="loaging" class="d-flex flex-wrap">
        <v-skeleton-loader
          v-for="item in 5"
          :key="item"
          width="300"
          type="list-item-two-line"
          class="mr-4 mb-4"
        ></v-skeleton-loader>
      </div>
      <GeneralEmpty
        v-else-if="list.length <= 0"
        message="Lo sentimos, parece que no encontramos resultados para tu búsqueda"
      />
      <div v-else>
        <div class="d-flex flex-wrap">
          <GeneralBrandCard v-for="item in list" :key="item" :item="item" />
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
      name: '',
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

      if (this.form.name !== '') params.name = this.form.name

      const result = await this.$store.dispatch('apiServices', {
        type: 'get',
        form: {
          url: 'brand/vehicles',
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
