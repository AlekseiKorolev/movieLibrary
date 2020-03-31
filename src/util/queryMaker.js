const apiKey = '14365e2446844154e6d419f590b2eb09';

export const defaultURL = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc`
export const genresURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;
export const certificationsURL = `https://api.themoviedb.org/3/certification/movie/list?api_key=${apiKey}`;
export const countriesURL = `https://api.themoviedb.org/3/configuration/countries?api_key=${apiKey}`;
export const languagesURL = `https://api.themoviedb.org/3/configuration/languages?api_key=${apiKey}`;
export const aboutMovieURL = `https://api.themoviedb.org/3/movie/`;

const searchURL = [`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}`,    // 0 movie title
                   `https://api.themoviedb.org/3/search/person?api_key=${apiKey}`,   // 1 actor name
                   `https://api.themoviedb.org/3/search/keyword?api_key=${apiKey}`,  // 2 keyword
                   `https://api.themoviedb.org/3/search/company?api_key=${apiKey}`,  // 3 company
                   `https://api.themoviedb.org/3/search/person?api_key=${apiKey}`,   // 4 people
                   `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`]; // 5 search
const queryString = [`&query=`,
                     `&with_cast=`,
                     `&with_keywords=`,
                     `&with_companies=`, 
                     `&with_people=`,    // same
                     ``]                 // empty title

export const searchQuery = (types, index, specificQuery) =>
  `${index === 0 ? searchURL[0] : searchURL[5]}` +
  `${queryString[index]}${specificQuery ? specificQuery : types.title}` +
  (types.language ? `&language=${types.language}` : "") +
  (types.with_original_language ? `&with_original_language=${types.with_original_language}` : "") +
  (types.adult ? `&include_adult=${types.adult}` : "") +
  (types.video ? `&include_video=${types.video}` : "") +
  (types.region ? `&region=${types.region}` : "") +
  (types.year ? `${yearRange(types.year)}` : "") +
  (types.primary_release_year ? `${primaryReleaseYearRange(types.primary_release_year)}` : "") +
  (types.vote ? `${voteRange(types.vote)}` : "") +
  (types.genresId ? `&with_genres=${types.genresId}` : "") +
  ((types.certificationCountry && types.certification) ? `&certification_country=${types.certificationCountry}&certification=${types.certification}` : "") +
  `&sort_by=${types.filter}${types.sort}`;

export const searchSpecificId = (types, index) => `${searchURL[index]}&query=${types.title}`;

const yearRange = yearString => {
  const year = yearString.split(' ');
  if (year.length === 1) return `&year=${yearString}`
  return `&release_date.gte=${year[0]}&release_date.lte=${year[1]}`
}

const primaryReleaseYearRange = (yearString) => {
  const year = yearString.split(' ');
  if (year.length === 1) return `&primary_release_year=${yearString}`
  return `&primary_release_date.gte=${year[0]}&primary_release_date.lte=${year[1]}`
}

const voteRange = (voteString) => {
  const vote = voteString.split(' ');
  if (vote.length === 1) return ""
  return `&vote_average.gte=${vote[0]}&vote_average.lte=${vote[1]}`
}