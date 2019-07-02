import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "665aaa966f65adc4a30d17445ce982d5",
    language: "en-US"
  }
});

export const tvApi = {
  popular: () => api.get("tv/popular"),
  topRated: () => api.get("tv/top_rated"),
  airingToday: () => api.get("tv/airing_today"),
  search: term =>
    api.get("search/tv", {
      params: {
        query: encodeURI(term)
      }
    }),
  showDetail: id =>
    api.get(`tv/${id}`, {
      params: {
        append_to_respose: "videos"
      }
    })
};

export const moviesApi = {
  nowPlaying: () => api.get("movie/now_playing"),
  upcoming: () => api.get("movie/upcoming"),
  popular: () => api.get("movie/popular"),
  search: term =>
    api.get("search/movie", {
      params: {
        query: encodeURI(term)
      }
    }),
  movieDetail: id =>
    api.get(`movie/${id}`, {
      params: {
        append_to_respose: "videos"
      }
    })
};
