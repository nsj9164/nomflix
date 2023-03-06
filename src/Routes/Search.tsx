import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getMovies, getMovieSearch } from "../api";

function Search() {
    const location = useLocation()
    const keyword = new URLSearchParams(location.search).get("keyword")
    const {isLoading, data} = useQuery(["movieSearch"], () => getMovieSearch());
    return (null);
}

export default Search;