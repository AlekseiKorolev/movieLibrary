<template>
  <v-tab-item :key="menu[1]">
    <v-card flat>
      <v-form>
        <v-container>
          <v-row>
            <v-col class="col-div" cols="12" sm="5">
              <v-text-field v-model="types.year" label="Year or range" hint="Use space to specify range: YYYY-MM-DD YYYY-MM-DD"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="col-div" cols="12" sm="5">
              <v-text-field v-model="types.primary_release_year" label="Primary release year or range" hint="Use space to specify range: YYYY-MM-DD YYYY-MM-DD"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </v-tab-item>
</template>

<script>
export default {
  name: "MenuDate",
  props: ["menu", "types"]
};
</script>

<style scoped>
.col-div,
.col-div div {
  padding: 0 10px;
}
</style>