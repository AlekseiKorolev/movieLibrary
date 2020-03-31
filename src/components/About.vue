<template>
  <div class="text-center">
    <v-dialog v-if="Object.keys(aboutData).length !== 0" v-model="about" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>{{aboutData.title}}</v-card-title>
        <v-avatar class="ma-3" size="250" tile>
          <v-img
            v-if="aboutData.backdrop_path === null && aboutData.poster_path === null"
            :src="require('../assets/noimage.png')"
          ></v-img>
          <v-img
            v-else-if="aboutData.poster_path !== null"
            :src="'https://image.tmdb.org/t/p/w500/'+aboutData.poster_path"
          ></v-img>
          <v-img
            v-else-if="aboutData.backdrop_path !== null"
            :src="'https://image.tmdb.org/t/p/w500/'+aboutData.backdrop_path"
          ></v-img>
        </v-avatar>
        <v-card-subtitle
          class="title withoutPadding brown--text"
        >{{aboutData.release_date | moment('YYYY MMMM Do')}}</v-card-subtitle>
        <v-card-subtitle class="title smallPadding">Popularity: {{aboutData.popularity}}</v-card-subtitle>
        <v-card-subtitle class="title smallPadding">Votes: {{aboutData.vote_count}}</v-card-subtitle>
        <v-card-text class="title smallPadding brown--text">{{aboutData.tagline}}</v-card-text>
        <v-card-text class="body-2 withoutPadding">Genre(s): {{getGenre(aboutData.genres)}}</v-card-text>
        <v-card-text class="body-2  withoutPadding">Original title: {{aboutData.original_title}}</v-card-text>
        <v-card-text class="body-2  withoutPadding">Company(ies): {{getCompanies(aboutData.production_companies)}}</v-card-text>
        <v-card-text class="body-2  withoutPadding">Country(ies): {{getCompanies(aboutData.production_countries)}}</v-card-text>
        <v-card-text class="body-2  withoutPadding">Budget: {{getNiceAppearance(aboutData.budget) || "N/A"}}</v-card-text>
        <v-card-text class="body-2 ">Revenue: {{getNiceAppearance(aboutData.revenue) || "N/A"}}</v-card-text>
        <v-card-text class="body-2 withoutPadding brown--text">{{aboutData.overview}}</v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text v-on:click="about = false">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "About",
  computed: {
    ...mapGetters(["aboutBox", "aboutData", "genres"])
  },
  data() {
    return {
      about: false
    };
  },
  methods: {
    ...mapActions(["getCloseAboutBox"]),
    getGenre(genres) {
      return this.genres
        .filter(item => genres.some(el => item.id === el.id))
        .map(item => item.name)
        .join(", ");
    },
    getCompanies(companies) {
      return companies.map(item => item.name).join(", ")
    },
    getNiceAppearance(number) {
      if (number === 0) return
      let data = number.toString()
      return data.split("")
        .reverse()
        .map((item, index) => (index + 1) % 3 === 0 && index !== data.length - 1 ? '.' + item : item)
        .reverse()
        .join("") + " $"
    }
  },
  watch: {
    about(val) {
      if (!val) this.getCloseAboutBox();
    },
    aboutBox(val) {
      if (val) this.about = val;
    }
  }
};
</script>

<style scoped>
.smallPadding {
  padding-bottom: 5px !important;
}
.withoutPadding {
  padding-bottom: 0px !important;
}
</style>