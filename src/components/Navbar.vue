<template>
  <div>
    <v-app-bar color="primary" dark>
      <v-toolbar-title>Movie library</v-toolbar-title>
    </v-app-bar>
    <div>
      <v-progress-linear v-model="refreshTimer" fullWidth="{true}"></v-progress-linear>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Navbar",
  computed: {
    ...mapGetters([
      "refreshTimer"
    ])
  }
};
</script>

<style scoped>
</style>