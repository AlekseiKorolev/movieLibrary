<template>
  <v-tab-item :key="menu[3]">
    <v-card flat>
      <v-form>
        <v-container>
          <v-row>
            <v-col class="col-div" cols="12" sm="5">
              <v-checkbox v-model="types.adult">
                <template v-slot:label>
                  <div>Include adult</div>
                </template>
              </v-checkbox>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="col-div" cols="12" sm="5">
              <v-checkbox v-model="types.video">
                <template v-slot:label>
                  <div>Include video</div>
                </template>
              </v-checkbox>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="col-div" cols="12" sm="5">
              <v-text-field
                v-model="types.vote"
                label="Vote range"
                hint="Use space to specify range"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </v-tab-item>
</template>

<script>
export default {
  name: "MenuOther",
  props: ["menu", "types"]
};
</script>

<style scoped>
.col-div,
.col-div div {
  padding: 0 10px;
}
</style>