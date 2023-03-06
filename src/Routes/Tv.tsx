import { click } from "@testing-library/user-event/dist/click";
import { AnimatePresence, color, motion, useScroll } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useHistory, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { getAiring, getLatest, getMovieDetail, getMovies, getPopular, getTopRated, getTvLatest, getTvTopRated, getUpComing, IGetMoviesResult } from "../api";
import TvDetail from "../Components/TvDetail";
import TvSlider from "../Components/TvSlider";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  background: black;
  padding-bottom: 200px;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

const Slider = styled.div`
  position: relative;
  top: -50px;
`;

const SliderInv = styled.div`
  position: relative;
  top: -50px;
  margin-bottom: 300px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div) <{ bgPhoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;
  cursor: pointer;
  border-radius: 5px;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

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
  background-size: cover;
  background-position: center center;
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

const Content = styled.h3`
    font-size: 25px;
    margin-bottom: 20px;
`;

function Tv() {
  const history = useHistory();

  const { scrollY } = useScroll();

  const useMultipleQuery = () => {
    const latest = useQuery(["latest"], getTvLatest);
    const airing_today = useQuery(["airing_today"], getAiring);
    const popular = useQuery(["popular"], getPopular);
    const top_rated = useQuery(["top_rated"], getTvTopRated);

    return [latest, airing_today, popular, top_rated];
  }

  const [
    { isLoading: loadingLatest, data: latest },
    { isLoading: loadingAiring, data: airing_today },
    { isLoading: loadingPopular, data: popular },
    { isLoading: loadingTopRated, data: top_rated },
  ] = useMultipleQuery();
  
  return (
    <Wrapper>
      {loadingAiring ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgPhoto={makeImagePath(airing_today?.results[0].backdrop_path || "")}>
            <Title>{airing_today?.results[0].title}</Title>
            <Overview>{airing_today?.results[0].overview}</Overview>
          </Banner>

          <Slider>
            {loadingLatest ? (
              <Loader>Loading...</Loader>
            ) : (
              <SliderInv>
                <Content>현재 상영중인 Tv</Content>
                <TvSlider {...latest} />
              </SliderInv>
            )}
            {loadingAiring ? (
              <Loader>Loading...</Loader>
            ) : (
              <SliderInv>
                <Content>오늘 올라온 Tv</Content>
                <TvSlider {...airing_today} />
              </SliderInv>
            )}
            {loadingPopular ? (
              <Loader>Loading...</Loader>
            ) : (
              <SliderInv>
                <Content>인기있는 Tv</Content>
                <TvSlider {...popular} />
              </SliderInv>
            )}
            {loadingTopRated ? (
              <Loader>Loading...</Loader>
            ) : (
              <SliderInv>
                <Content>평단의 찬사를 받은 Tv</Content>
                <TvSlider {...top_rated} />
              </SliderInv>
            )}
          </Slider>

          <TvDetail />
        </>
      )}
    </Wrapper >
  );
}

export default Tv;