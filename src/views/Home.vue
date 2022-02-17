<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/img/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <div class="img"></div>
  </div>
</template>
<script>
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
  mounted() {
    console.log("test");
  },
  methods: {},
};
</script>
<style lang="scss">

</style>
