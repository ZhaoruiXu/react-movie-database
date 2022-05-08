export const appTitle = ".MovDb";
export const API_KEY = "b3ae8fbaf360bb8bec2aa030f5f38b60";
export const appStorageName = "mov-db-favs";
export const catStorageName = "mov-dv-category";
export const movieCategories = [
  "popular",
  "now_playing",
  "top_rated",
  "upcoming",
];

// https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg   get image
// https://api.themoviedb.org/3/movie/top_rated?api_key=b3ae8fbaf360bb8bec2aa030f5f38b60&language=en-US&page=2  get top-rated
// https://api.themoviedb.org/3/movie/popular?api_key=b3ae8fbaf360bb8bec2aa030f5f38b60&language=en-US&page=2  get popular
// https://api.themoviedb.org/3/search/movie?api_key=b3ae8fbaf360bb8bec2aa030f5f38b60&query=spider-man:no-way-home&primary_release_year=2021&include_adult=false // search a movie
// https://api.themoviedb.org/3/genre/movie/list?api_key=b3ae8fbaf360bb8bec2aa030f5f38b60 genre ref

export const endPointGetPoster = "https://image.tmdb.org/t/p/w500/";
export const endPointGetBackdrop = "https://image.tmdb.org/t/p/original/";
