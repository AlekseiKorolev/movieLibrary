<template>
  <v-tab-item :key="menu[2]">
    <v-card flat>
      <v-form>
        <v-container>
          <v-row>
            <v-col class="col-div" cols="12" sm="4">
              <v-select :items="languages" item-text="english_name" label="Original language" solo v-model="types.with_original_language"></v-select>
            </v-col>
          </v-row>
          <v-row>
              <v-col class="col-div" cols="12" sm="4">
              <v-select :items="languages" item-text="english_name" label="Presentation language" solo v-model="types.language"></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="col-div" cols="12" sm="4">
              <v-select :items="countries" item-text="english_name" label="Region" solo v-model="types.region"></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </v-tab-item>
</template>

<script>
export default {
  name: "MenuLanguage",
  props: ["menu", "types", "languages", "countries"]
};
</script>

<style scoped>
.col-div,
.col-div div {
  padding: 0 10px;
}
</style>