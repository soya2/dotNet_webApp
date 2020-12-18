<template>
  <div id="app">
    <router-view :key="key"></router-view>
    <!-- <router-view name='detail' /> -->
  </div>
</template>

<script>
export default {
  computed: {
    key() {
      return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
    }
  },
  name: 'App'
}
</script>

<style>
</style>
