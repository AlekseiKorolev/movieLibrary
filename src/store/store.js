import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import {
  genresURL,
  certificationsURL,
  languagesURL,
  countriesURL,
  aboutMovieURL,
  defaultURL
} from '../util/queryMaker';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    genres: [],
    certifications: [],
    languages: [],
    countries: [],
    searchResult: [],
    page: 0,
    pages: 0,
    lastQuery: defaultURL,
    loading: false,
    loadingAbout: false,
    loadingStart: true,
    aboutBox: false,
    aboutData: {},
    refreshTimer: 0,
    hint: ''
  },

  getters: {
    genres: state => state.genres,
    certifications: state => state.certifications,
    certificationCountry: state => Object.keys(state.certifications),
    languages: state => state.languages,
    countries: state => state.countries,
    searchResult: state => state.searchResult,
    loading: state => state.loading,
    loadingAbout: state => state.loadingAbout,
    loadingStart: state => state.loadingStart,
    page: state => state.page,
    pages: state => state.pages,
    aboutBox: state => state.aboutBox,
    aboutData: state => state.aboutData,
    lastQuery: state => state.lastQuery,
    refreshTimer: state => state.refreshTimer,
    hint: state => state.hint
  },

  mutations: {
    setGenres: (state, payload) => {
      state.genres = payload.genres;
    },
    setCertifications: (state, payload) => {
      state.certifications = payload.certifications;
    },
    setLanguages: (state, payload) => {
      state.languages = payload;
    },
    setCountries: (state, payload) => {
      state.countries = payload;
    },
    setSearchResult: (state, payload) => {
      state.searchResult = payload.results;
      state.page = payload.page;
      state.pages = payload.total_pages;
      state.hint = payload.total_results
        ? `Total found ${payload.total_results} movie(s)`
        : 'Nothing found';
    },
    setLoading: (state, key) => {
      state[key] = true;
    },
    saveLastQuery: (state, lastQuery) => {
      state.lastQuery = lastQuery;
    },
    changeCurrentPage: (state, currentPage) => {
      state.page = currentPage;
    },
    setAboutBox: (state, payload) => {
      state.aboutData = payload.data;
      state.aboutBox = true;
    },
    setCloseAboutBox: state => {
      state.aboutBox = false;
    },
    changeTimer: state => {
      setInterval(() => {
        if (state.refreshTimer >= 100) {
          state.refreshTimer = 0;
        } else {
          state.refreshTimer += 100 / 300;
        }
      }, 100);
    },
    setOrCleanErrors: (state, err) => {
      err ? (state.hint = 'Something went wrong. Please, try again') : null;
      if (state.loadingStart) state.hint = 'Ready to search';
      state.loading = false;
      state.loadingAbout = false;
      state.loadingStart = false;
    }
  },

  actions: {
    specificGetRequest: (context, query) => {
      context.commit('setLoading', 'loading');
      return axios
        .get(query)
        .then(async res => {
          let results = [...res.data.results];
          let page = res.data.page + 1;
          const pages = res.data.total_pages > 10 ? 10 : res.data.total_pages;
          for (page; page <= pages; page++) {
            let result = await axios.get(`${query}&page=${page}`);
            results.push(...result.data.results);
          }
          context.commit('setOrCleanErrors');
          return results.map(item => item.id).join('|');
        })
        .catch(err => context.commit('setOrCleanErrors', err));
    },
    commonGetRequest: (context, query) => {
      context.commit('setLoading', 'loading');
      context.commit('saveLastQuery', query);
      return axios
        .get(query)
        .then(res => {
          context.commit('setSearchResult', res.data);
          context.commit('setOrCleanErrors');
        })
        .catch(err => context.commit('setOrCleanErrors', err));
    },
    getNextPage: (context, currentPage) => {
      context.commit('setLoading', 'loading');
      context.commit('saveLastQuery', context.state.lastQuery + `&page=${currentPage}`);
      return axios
        .get(context.state.lastQuery + `&page=${currentPage}`)
        .then(res => {
          context.commit('setSearchResult', res.data);
          context.commit('changeCurrentPage', currentPage);
          context.commit('setOrCleanErrors');
        })
        .catch(err => context.commit('setOrCleanErrors', err));
    },
    getOptions: context => {
      const getGenres = axios.get(genresURL);
      const getCertifications = axios.get(certificationsURL);
      const getLanguages = axios.get(languagesURL);
      const getCountries = axios.get(countriesURL);
      return axios
        .all([getGenres, getCertifications, getLanguages, getCountries])
        .then(
          axios.spread((...res) => {
            context.commit('setGenres', res[0].data);
            context.commit('setCertifications', res[1].data);
            context.commit('setLanguages', res[2].data);
            context.commit('setCountries', res[3].data);
            context.commit('setOrCleanErrors');
          })
        )
        .catch(err => context.commit('setOrCleanErrors', err));
    },
    getAboutBox: (context, id) => {
      const apiKey = context.state.lastQuery.substr(
        context.state.lastQuery.indexOf('?api_key='),
        41
      );
      let language;
      if (context.state.lastQuery.indexOf('&language=') === -1) {
        language = '&language=en';
      } else {
        language = context.state.lastQuery.substr(
          context.state.lastQuery.indexOf('&language='),
          12
        );
      }
      const query = aboutMovieURL + id + apiKey + language;
      context.commit('setLoading', 'loadingAbout');
      return axios
        .get(query)
        .then(res => {
          context.commit('setAboutBox', res);
          context.commit('setOrCleanErrors');
        })
        .catch(err => context.commit('setOrCleanErrors', err));
    },
    getCloseAboutBox: context => context.commit('setCloseAboutBox'),
    autoRefresh: context => {
      if (!context.state.loading) {
        return axios
          .get(context.state.lastQuery)
          .then(res => {
            context.commit('setSearchResult', res.data);
            context.commit('setOrCleanErrors');
          })
          .catch(err => context.commit('setOrCleanErrors', err));
      }
    },
    runTimer: context => {
      context.commit('changeTimer');
    }
  }
});
