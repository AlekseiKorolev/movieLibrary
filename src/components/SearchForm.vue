<template>
  <div>
    <span class="headline">Search by</span>
    <v-tabs v-model="item" background-color="primary" dark>
      <v-tab v-for="item in menu" :key="item">{{ item }}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="item">
      <MenuTitle
        v-bind:menu="menu"
        v-bind:types="types"
        v-bind:genres="genres"
        v-bind:certificationCountry="certificationCountry"
        v-bind:certifications="certifications"
      />
      <MenuDate v-bind:menu="menu" v-bind:types="types" />
      <MenuLanguage
        v-bind:menu="menu"
        v-bind:types="types"
        v-bind:languages="languages"
        v-bind:countries="countries"
      />
      <MenuOther v-bind:menu="menu" v-bind:types="types" />
    </v-tabs-items>
    <div class="button-container">
      <v-btn
        class="search-button"
        color="primary"
        :disabled="loadingStart"
        v-on:click="onSubmit"
        focus
      >Search</v-btn>
      <v-progress-circular v-if="loadingStart" :size="25" color="primary" indeterminate class="loadingStart"></v-progress-circular>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { searchQuery, searchSpecificId } from "../util/queryMaker";
import { queryHelper } from "../util/queryHelper";
import MenuTitle from "../components/MenuTitle";
import MenuDate from "../components/MenuDate";
import MenuLanguage from "../components/MenuLanguage";
import MenuOther from "../components/MenuOther";

export default {
  name: "SearchForm",
  components: {
    MenuTitle,
    MenuDate,
    MenuLanguage,
    MenuOther
  },
  data() {
    return {
      item: null,
      menu: ["Titles or names", "Date", "Region and language", "Other"],
      types: {
        title: "",
        searchBy: "title",
        genres: "",
        genresId: "",
        year: "",
        primary_release_year: "",
        with_original_language: "",
        language: "",
        region: "",
        adult: false,
        video: false,
        certificationCountry: "",
        certification: "",
        vote: "",
        filter: "Popularity",
        sort: ".desc"
      }
    };
  },
  computed: {
    ...mapGetters([
      "loadingStart",
      "genres",
      "certificationCountry",
      "certifications",
      "languages",
      "countries"
    ])
  },
  methods: {
    ...mapActions([
      "commonGetRequest",
      "specificGetRequest"
    ]),
    onSubmit() {
      const queryType = queryHelper(
        this.types,
        this.genres,
        this.languages,
        this.countries
      );
      if (this.types.title.length !== 0) {
        if (this.types.searchBy === "title") {
          this.commonGetRequest(searchQuery(queryType, 0));
        } else if (this.types.searchBy === "name") {
          this.specificGetRequest(searchSpecificId(queryType, 1)).then(
            specificQuery => {
              this.commonGetRequest(searchQuery(queryType, 1, specificQuery));
            }
          );
        } else if (this.types.searchBy === "keyword") {
          this.specificGetRequest(searchSpecificId(queryType, 2)).then(
            specificQuery => {
              this.commonGetRequest(searchQuery(queryType, 2, specificQuery));
            }
          );
        } else if (this.types.searchBy === "company") {
          this.specificGetRequest(searchSpecificId(queryType, 3)).then(
            specificQuery => {
              this.commonGetRequest(searchQuery(queryType, 3, specificQuery));
            }
          );
        } else if (this.types.searchBy === "people") {
          this.specificGetRequest(searchSpecificId(queryType, 4)).then(
            specificQuery => {
              this.commonGetRequest(searchQuery(queryType, 4, specificQuery));
            }
          );
        }
      } else {
        this.commonGetRequest(searchQuery(queryType, 5));
      }
    }
  }
};
</script>

<style scoped>
.search-button {
  margin: 0px 0px 20px;
}
.button-container{
  position: relative;
}
.loadingStart {
  position: absolute;
  left: 35px;
  top: 5px;
}
</style>