<template>
  <div v-if="loading" class="viewLoading">
    <p>Cargando, por favor espere...</p>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
  }),
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    },
  },
}
</script>

<style lang="scss">
.viewLoading {
  position: fixed;
  z-index: 1020;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  cursor: default;
  p {
    color: white;
    font-size: 1.1em;
  }
}
</style>
