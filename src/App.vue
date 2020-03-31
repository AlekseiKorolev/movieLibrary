<template>
  <v-app dark >
    <Navbar/>
    <v-container class="mainContainer">
      <Home/>
    </v-container>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar';
import Home from './views/Home';

export default {
  name: 'App',
  components: {
    Navbar,
    Home
  }
}
</script>

<style>
.mainContainer {
  max-width: 1000px;
}
</style>
