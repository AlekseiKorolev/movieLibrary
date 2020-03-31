<template>
  <v-tab-item :key="menu[0]">
    <v-card flat>
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12" sm="5">
              <v-text-field
                v-model="types.title"
                label="Name, title or keyword"
                hint="Search result by movie title will not be sorted"
              ></v-text-field>
            </v-col>
            <v-radio-group class="filter-group flex-wrap" v-model="types.searchBy" row>
              <v-radio value="title" v-on:click="types.searchBy='title'">
                <template v-slot:label>
                  <div>Title</div>
                </template>
              </v-radio>
              <v-radio value="name" v-on:click="types.searchBy='name'">
                <template v-slot:label>
                  <div>Actor</div>
                </template>
              </v-radio>
              <v-radio value="people" v-on:click="types.searchBy='people'">
                <template v-slot:label>
                  <div>People</div>
                </template>
              </v-radio>
              <v-radio value="keyword" v-on:click="types.searchBy='keyword'">
                <template v-slot:label>
                  <div>Keyword</div>
                </template>
              </v-radio>
              <v-radio value="company" v-on:click="types.searchBy='company'">
                <template v-slot:label>
                  <div>Company</div>
                </template>
              </v-radio>
            </v-radio-group>
          </v-row>
          <v-row>
            <v-col class="col-div" cols="12" sm="4">
              <v-select :items="genres" item-text="name" label="Genres" solo v-model="types.genres"></v-select>
            </v-col>
            <v-col class="col-div" cols="12" sm="4">
              <v-select
                :items="certificationCountry"
                label="Certification country"
                solo
                v-model="types.certificationCountry"
              ></v-select>
            </v-col>
            <v-col class="col-div" cols="12" sm="4">
              <v-select
                :items="certifications[types.certificationCountry]"
                item-text="certification"
                label="Certification"
                solo
                v-model="types.certification"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="col-div" cols="12" sm="5">
              <v-select :items="sort" label="Sort by" solo v-model="types.filter"></v-select>
            </v-col>
            <div class="asc-div">
              <v-btn
                text
                icon
                color="blue lighten-2"
                v-on:click="types.sort = types.sort === '.desc' ? '.asc' : '.desc'"
              >
                <v-icon>{{types.sort === '.asc' ? "fas fa-arrow-up" : "fas fa-arrow-down"}}</v-icon>
              </v-btn>
              <span>{{types.sort === '.asc' ? "Ascending" : "Descending"}}</span>
            </div>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </v-tab-item>
</template>

<script>
export default {
  name: "MenuTitle",
  props: ["menu", "types", "genres", "certificationCountry", "certifications"],
  data() {
    return {
      sort: [
        "Popularity",
        "Release date",
        "Revenue",
        "Primary release date",
        "Original title",
        "Vote average",
        "Vote count"
      ]
    };
  }
};
</script>

<style scoped>
.col-div,
.col-div div {
  padding: 0 10px;
}
.asc-div {
  margin: 5px 0 0 10px;
}
</style>