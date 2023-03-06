import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useHistory, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { getMovieDetail, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;

const offset = 6;

function HomeDetail() {
    const history = useHistory();
    const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
    const { scrollY } = useScroll();
    const { data, isLoading } = useQuery<IGetMoviesResult>(["movies", "movieDetail"], getMovieDetail);
    const onBoxClicked = (movieId: number) => {
        history.push(`/movies/${movieId}`)
    }
    const onOverlayClick = () => history.push("/");
    const clickedMovie = bigMovieMatch?.params.movieId && data?.results.find(movie => movie.id === +bigMovieMatch.params.movieId);
    return (
        <AnimatePresence>
            {bigMovieMatch ? (
                <>
                    <Overlay onClick={onOverlayClick} exit={{ opacity: 0 }} animate={{ opacity: 1 }} />
                    <BigMovie style={{ top: scrollY.get() + 100 }} layoutId={bigMovieMatch.params.movieId}>
                        {clickedMovie && (
                            <>
                                <BigCover
                                    style={{
                                        backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                                            clickedMovie.backdrop_path,
                                            "w500"
                                        )}`,
                                    }}
                                />
                                <BigTitle>{clickedMovie.title}</BigTitle>
                                <BigOverview>{clickedMovie.overview}</BigOverview>
                            </>
                        )}
                    </BigMovie>
                </>
            ) : null
            }
        </AnimatePresence >
    );
}

export default HomeDetail;