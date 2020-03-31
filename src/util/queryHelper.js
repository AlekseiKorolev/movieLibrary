export const queryHelper = (originalTypes, genres, languages, countries) => {
  const types = { ...originalTypes };
  if (types.genres) {
    const genresId = genres.filter(item => item.name === types.genres);
    types.genresId = genresId[0].id;
  }
  if (types.with_original_language) {
    const original = languages.filter(
      item => item.english_name === types.with_original_language
    );
    types.with_original_language = original[0].iso_639_1;
  }
  if (types.language) {
    const presentation = languages.filter(
      item => item.english_name === types.language
    );
    types.language = presentation[0].iso_639_1;
  }
  if (types.region) {
    const region = countries.filter(item => item.english_name === types.region);
    types.region = region[0].iso_3166_1;
  }
  types.filter = types.filter.split(" ").join("_").toLowerCase();
  return types;
};
