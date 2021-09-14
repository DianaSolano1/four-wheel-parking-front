<template>
  <v-card class="vehicle-card mr-4 mb-4 elevation-0" width="270">
    <div class="plate">
      <div class="plate--content">{{ plate }}</div>
    </div>
    <div class="information">
      <p v-if="item.brand">
        <span class="information--title">Marca:</span>
        <span class="information--data">{{ item.brand.name }}</span>
      </p>
      <p v-if="item.type_vehicle">
        <span class="information--title">Tipo:</span>
        <span class="information--data">{{ item.type_vehicle.name }}</span>
      </p>
      <v-divider />
      <small>Propietario</small>
      <p v-if="item.owner">
        <span class="information--data">{{ item.owner.name }}</span>
      </p>
      <p v-if="item.owner">CC. {{ item.owner.document_id }}</p>
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
  computed: {
    plate() {
      return (
        this.item.license_plate.substring(0, 3) +
        ' - ' +
        this.item.license_plate.substring(3, 6)
      )
    },
  },
}
</script>

<style lang="scss">
.vehicle-card {
  .plate {
    padding: 10px 20px;
    background-color: #e9e9e9;
    &--content {
      margin: 0 auto;
      width: 150px;
      background-color: #fcba07;
      border-radius: 4px;
      text-align: center;
      padding: 10px;
      font-size: 1.3em;
      letter-spacing: 1.3px;
      font-weight: bold;
      text-transform: uppercase;
      text-shadow: -1px -1px 3px rgba($color: #fdd43d, $alpha: 1);
      position: relative;
      color: black;
      &::after {
        content: '';
        border: 1px solid black;
        border-radius: 4px;
        position: absolute;
        width: calc(100% - 6px);
        height: calc(100% - 6px);
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  .information {
    border: 1px solid #e9e9e9;
    padding: 10px 20px;
    small {
      font-weight: bold;
      color: #7173fd;
    }
    p {
      margin-bottom: 0;
      font-size: 0.9em;
      color: #08262f;
    }
    &--title {
      text-transform: uppercase;
      font-weight: bold;
    }
    hr {
      margin: 10px 5px;
    }
  }
}
</style>
