<template>
  <v-app dark >
    <Navbar/>
    <v-container class="mainContainer">
      <router-view/>
    </v-container>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar';

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
.mainContainer {
  max-width: 1000px;
}
</style>
