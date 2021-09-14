<template>
  <v-card class="vehicle-card mr-4 mb-4 elevation-0" width="300">
    <div class="information">
      <p>
        <span class="information--title">Marca:</span>
        <span class="information--data">{{ item.name }}</span>
      </p>
      <p>
        <span class="information--title">Cantidad de vehículos:</span>
        <span class="information--data">{{ item.vehicles_count }}</span>
      </p>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.vehicle-card {
  .information {
    border: 1px solid #e9e9e9;
    padding: 10px 20px;
    p {
      margin-bottom: 0;
      font-size: 0.9em;
      color: #08262f;
    }
    &--title {
      text-transform: uppercase;
      font-weight: bold;
    }
  }
}
</style>
