<template>
  <div class="empty-view">
    <v-img
      class="mx-auto"
      src="/empty.svg"
      width="350px"
      alt="Sin resultados"
    />
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.empty-view {
  p {
    font-size: 1.4em;
    text-align: center;
    margin-top: 40px;
  }
}
</style>
