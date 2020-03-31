<template>
  <v-container class="d-flex flex-row justify-space-between flex-wrap" width="100%">
    <v-col dense v-for="(item, index) in searchResult" :key="index" sx="5" sm="4" md="4" lg="4" xl="4">
      <v-card color="#385F73" dark v-on:click="onClickAbout(item)" >
        <v-avatar class="ma-3" size="125" tile>
          <v-img
            v-if="item.backdrop_path === null && item.poster_path === null"
            :src="require('../assets/noimage.png')"
          ></v-img>
          <v-img
            v-else-if="item.backdrop_path !== null"
            :src="'https://image.tmdb.org/t/p/w500/'+item.backdrop_path"
          ></v-img>
          <v-img
            v-else-if="item.poster_path !== null"
            :src="'https://image.tmdb.org/t/p/w500/'+item.poster_path"
          ></v-img>
        </v-avatar>
        <div class="d-flex flex-no-wrap justify-space-between">
          <v-card width="100%">
            <v-card-title
              class="previewTitle headline yellow--text text-truncate"
              v-text="item.title"
            ></v-card-title>
            <v-card-subtitle>{{item.release_date | moment('YYYY MMMM Do')}}</v-card-subtitle>
            <v-card-text class="text-line">Vote: {{item.vote_average}}</v-card-text>
            <v-card-text class="text-line">Popularity: {{item.popularity}}</v-card-text>
          </v-card>
        </div>
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
import Vue from "vue";
import VueMoment from "vue-moment";
import { mapGetters, mapActions } from "vuex";

Vue.use(VueMoment);

export default {
  computed: {
    ...mapGetters(["searchResult"])
  },
  methods: {
    ...mapActions(["getAboutBox"]),
    onClickAbout(event) {
      this.getAboutBox(event.id);
    }
  }
};
</script>

<style>
.text-line {
  padding-bottom: 5px;
  padding-top: 5px;
}
.previewTitle {
  display: inline-block;
  max-width: 90%;
}
</style>