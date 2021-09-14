<template>
  <div>
    <h1>Dashboard - Ingresos por día</h1>

    <v-card class="mt-5 py-4 px-12 elevation-0 mx-auto" max-width="1000">
      <h2 class="mb-2">Petición:</h2>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>
            Reglas
            <template v-slot:actions>
              <v-icon color="info"> mdi-order-bool-ascending-variant </v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <ol>
              <li>
                Debes tener cuidado con las comas, las comillas y las llaves.
                Sin esto la petición te arrojará objeto mal formado
              </li>
              <li>Debes enviar un arreglo</li>
              <li>
                Cada elemento del arreglo debe ser un arreglo que contenga
                cuatro elementos
              </li>
              <li>
                Los sub arreglos deben contener la siguiente estructura: String,
                String, any, Number, any. De lo contrario no se realizará
                correctamente el conteo o la validación de los datos
              </li>
            </ol>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            Ejemplo de petición
            <template v-slot:actions>
              <v-icon color="info"> mdi-help-circle </v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <pre>{{ example }}</pre>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-form class="mt-4" ref="form" v-model="valid" lazy-validation>
        <v-textarea
          v-model="base"
          class="elevation-0"
          label="Arreglo"
          placeholder="Ingresar el arreglo"
          outlined
          :rules="baseRules"
        ></v-textarea>
      </v-form>
      <div class="mt-4">
        <v-btn
          color="success"
          style="color: white"
          class="text-capitalize text-weight-bold text-space-normal elevation-0"
          :disabled="!valid"
          @click="acceptForm"
          >Generar objeto</v-btn
        >
      </div>
    </v-card>

    <v-card class="mt-5 py-4 px-12 elevation-0 mx-auto" max-width="1000">
      <h2>Respuesta:</h2>
      <pre>{{ responseData }}</pre>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    base: '',
    baseRules: [(v) => !!v || 'Debe ingresar el arreglo base'],
    responseData: {},
    example: [
      ['2018-12-01', 'AM', 'ID123', 5000],
      ['2018-12-01', 'AM', 'ID545', 7000],
      ['2018-12-01', 'PM', 'ID545', 3000],
      ['2018-12-02', 'AM', 'ID545', 7000],
    ],
  }),
  methods: {
    acceptForm() {
      if (this.$refs.form.validate()) {
        try {
          const inputs = JSON.parse(this.base)

          if (!Array.isArray(inputs)) {
            alert('Debe escribir un array')
            return
          }

          const validLength = inputs.every((i) => i.length === 4)
          const validType = inputs.every(
            (i) =>
              typeof i[3] === 'number' &&
              typeof i[1] === 'string' &&
              typeof i[0] === 'string'
          )

          if (!(validLength && validType)) {
            alert(
              'Cada array adentro debe ser de 4 elementos. El cuarto elemento tiene que ser número y los dos primeros strings'
            )
            return
          }

          const grouped = {}

          for (const input of inputs) {
            if (grouped[input[0]]) {
              const currentDate = grouped[input[0]]

              if (currentDate[input[1]]) {
                currentDate[input[1]] += input[3]
              } else {
                currentDate[input[1]] = input[3]
              }
            } else {
              grouped[input[0]] = {
                [input[1]]: input[3],
              }
            }
          }

          this.responseData = grouped
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log('Falló al generar por:', error)

          alert(
            'Objeto mal formado. Por favor básese en el ejemplo para realizar la prueba'
          )
        }
      }
    },
  },
}
</script>

<style lang="scss">
pre {
  background-color: #2d3039;
  color: white;
}
</style>
