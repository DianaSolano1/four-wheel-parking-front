<template>
  <div>
    <h1>Registrar vehículo</h1>

    <v-card class="mt-5 py-4 px-12 elevation-0 mx-auto" max-width="1000">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row class="mt-1">
          <v-col cols="12" md="4">
            <v-text-field
              v-model="form.plate"
              class="elevation-0"
              label="Placa"
              placeholder="Escribir la placa"
              outlined
              :rules="rules.plate"
              @change="findVehicle"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="form.brand"
              class="elevation-0"
              label="Marca"
              placeholder="Escribir el nombre de la marca"
              outlined
              :disabled="Object.keys(detail.vehicle).length > 0"
              :rules="rules.brand"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="form.typeVehicle"
              class="elevation-0"
              label="Tipo de vehículo"
              placeholder="Escribir el tipo de vehículo"
              outlined
              :disabled="Object.keys(detail.vehicle).length > 0"
              :rules="rules.typeVehicle"
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="pb-0"
            ><v-divider class="mb-4"></v-divider
            ><small>Datos del propietario</small></v-col
          >
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.documentId"
              class="elevation-0"
              label="Documento"
              placeholder="Escribir el documento"
              outlined
              type="number"
              :disabled="Object.keys(detail.vehicle).length > 0"
              :rules="rules.documentId"
              @change="findOwner"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.ownerName"
              class="elevation-0"
              label="Nombre completo"
              placeholder="Escribir el nombre completo"
              outlined
              :disabled="
                Object.keys(detail.vehicle).length > 0 ||
                Object.keys(detail.owner).length > 0
              "
              :rules="rules.ownerName"
              @change="findOwner"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
      <div class="mt-4">
        <nuxt-link to="/vehicle" class="text-decoration-none"
          ><v-btn
            color="error"
            style="color: white"
            class="
              mr-4
              text-capitalize text-weight-bold text-space-normal
              elevation-0
            "
            >Cancelar</v-btn
          ></nuxt-link
        >
        <v-btn
          color="success"
          style="color: white"
          class="text-capitalize text-weight-bold text-space-normal elevation-0"
          :disabled="!valid"
          @click="acceptForm"
          >Registrar Ingreso</v-btn
        >
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    detail: {
      vehicle: {},
      owner: {},
    },
    form: {
      plate: '',
      brand: '',
      typeVehicle: '',
      ownerName: '',
      documentId: '',
    },
    rules: {
      plate: [
        (v) => !!v || 'Debe especificar la placa',
        (v) => v.length <= 8 || 'Debe contener máximo 8 carácteres',
      ],
      brand: [
        (v) => !!v || 'Debe especificar la marca',
        (v) => v.length <= 30 || 'Debe contener máximo 30 carácteres',
      ],
      typeVehicle: [
        (v) => !!v || 'Debe especificar el tipo de vehículo',
        (v) => v.length <= 25 || 'Debe contener máximo 25 carácteres',
      ],
      ownerName: [
        (v) => !!v || 'Debe especificar el nombre del propietario',
        (v) => v.length <= 25 || 'Debe contener máximo 50 carácteres',
      ],
      documentId: [
        (v) => !!v || 'Debe especificar el documento',
        (v) => v.length <= 25 || 'Debe contener máximo 15 carácteres',
      ],
    },
  }),
  methods: {
    async acceptForm() {
      if (this.$refs.form.validate()) {
        this.$nuxt.$loading.start()

        let owner = {
          document_id: this.form.documentId,
          name: this.form.ownerName,
        }

        if (this.detail.vehicle.owner_id) {
          owner = {
            id: this.detail.vehicle.owner_id,
          }
        } else if (this.detail.owner.id) {
          owner = {
            id: this.detail.owner.id,
          }
        }

        const form = {
          license_plate: this.form.plate,
          brand: this.detail.vehicle.brand_id || this.form.brand,
          type_vehicle:
            this.detail.vehicle.type_vehicle_id || this.form.typeVehicle,
          owner,
        }

        const result = await this.$store.dispatch('apiServices', {
          type: 'post',
          form: {
            url: 'vehicle',
            content: form,
          },
        })

        if (result.success) {
          alert('Registro exitoso')
          this.$router.push('/vehicle')
        } else {
          alert('Falló al registrar el vehículo')
        }

        this.$nuxt.$loading.finish()
      }
    },
    async findVehicle() {
      this.$nuxt.$loading.start()

      const result = await this.$store.dispatch('apiServices', {
        type: 'get',
        form: {
          url: 'vehicle/' + this.form.plate,
        },
      })

      if (result && Object.keys(result).length > 0) {
        this.detail.vehicle = result
        this.form.brand = result.brand.name
        this.form.typeVehicle = result.type_vehicle.name
        this.form.documentId = result.owner.document_id
        this.form.ownerName = result.owner.name
      } else {
        this.detail.vehicle = {}
      }

      this.$nuxt.$loading.finish()
    },
    async findOwner() {
      this.$nuxt.$loading.start()

      const result = await this.$store.dispatch('apiServices', {
        type: 'get',
        form: {
          url: 'owner/' + this.form.documentId,
        },
      })

      if (result && Object.keys(result).length > 0) {
        this.detail.owner = result
        this.form.ownerName = result.name
      } else {
        this.detail.owner = {}
      }

      this.$nuxt.$loading.finish()
    },
  },
}
</script>
