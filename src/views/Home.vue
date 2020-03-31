<template>
  <div>
    <div>
      <SearchForm />
    </div>
    <div v-if="!loading" class="text-center hint">{{ hint }}</div>
    <div v-if="!loading">
      <div v-if="searchResult.length !== 0">
        <v-pagination v-model="currentPage" :length="pages" :total-visible="7"></v-pagination>
      </div>
      <Card />
      <div v-if="searchResult.length !== 0">
        <v-pagination v-model="currentPage" :length="pages" :total-visible="7"></v-pagination>
      </div>
    </div>
    <div v-else-if="loading">
      <div>
        <v-progress-linear indeterminate></v-progress-linear>
      </div>
    </div>
    <About />
    <div v-if="loadingAbout" class="loadingAbout">
      <div class="loadingBg">
        <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SearchForm from "../components/SearchForm.vue";
import Card from "../components/Card.vue";
import About from "../components/About.vue";

export default {
  name: "Home",
  data() {
    return {
      currentPage: 1
    };
  },
  components: {
    SearchForm,
    Card,
    About
  },
  computed: {
    ...mapGetters([
      "loading",
      "loadingAbout",
      "loadingStart",
      "pages",
      "searchResult",
      "lastQuery",
      "refreshTimer",
      "hint"
    ])
  },
  methods: {
    ...mapActions(["getNextPage", "autoRefresh", "getOptions", "runTimer"])
  },
  created() {
    this.getOptions();
    this.runTimer();
  },
  watch: {
    currentPage() {
      this.getNextPage(this.currentPage);
    },
    refreshTimer(val) {
      if (val === 0) this.autoRefresh();
    }
  }
};
</script>

<style scoped>
.loadingBg {
  position: fixed;
  left: 45%;
  top: 45%;
  background-color: rgba(216, 217, 213, 0.5);
  padding: 50px;
  border-radius: 5px;
}
.hint {
  padding-bottom: 10px;
}
</style>
