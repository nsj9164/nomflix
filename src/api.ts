const API_KEY = "53950cdf42efa70675a9677d53021cd4";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
    id: number;
    backdrop_path: string;
    poster_path: string;
    title: string;
    overview: string;
}

export interface IGetMoviesResult {
    dates: {
        maximum: string;
        minimum: string;
    };
    page: number;
    results: IMovie[];
    total_pages: number;
    total_results: number;
}

export function getMovies() {
    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
        (response) => response.json()
    );
}

export function getLatest() {
    return fetch(`${BASE_PATH}/movie/latest?api_key=${API_KEY}`).then(
        (response) => response.json()
    );
}

export function getTopRated() {
    return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`).then(
        (response) => response.json()
    );
}

export function getUpComing() {
    return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`).then(
        (response) => response.json()
    );
}

export interface IGetMovieDetail {
    adult: boolean;
    backdrop_path: string;
    genres: [
      {
        id: number;
        name: string
      }
    ];
    id: number;
    overview: string;
    popularity: number;
    release_date: string;
    runtime: number;
    title: string;
    vote_average: number;
  }

export function getMovieDetail() {
    return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`).then(
        (response) => response.json()
    );
}

export function getTvLatest() {
    return fetch(`${BASE_PATH}/tv/latest?api_key=${API_KEY}`).then(
        (response) => response.json()
    );
}

export function getAiring() {
    return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}`).then(
        (response) => response.json()
    );
}

export function getPopular() {
    return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}`).then(
        (response) => response.json()
    );
}

export function getTvTopRated() {
    return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}`).then(
        (response) => response.json()
    );
}

export function getTvDetail() {
    return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}`).then(
        (response) => response.json()
    );
}

export function getMovieSearch() {
    return fetch(`${BASE_PATH}/search/movie?api_key=${API_KEY}&query=`).then(
        (response) => response.json()
    );
}