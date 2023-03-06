import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { makeImagePath } from "../utils";

const Slider = styled.div`
  position: relative;
  top: -50px;
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

const Button = styled.div`
    float: right;
    margin-right: 20px;
    cursor: pointer;
    font-size: 20px;
`;

const rowVariants = {
    hidden: {
        x: window.outerWidth + 5,
    },
    visible: {
        x: 0,
    },
    exit: {
        x: -window.outerWidth - 5,
    }
}

const boxVariants = {
    normal: {
        scale: 1,
    },
    hover: {
        scale: 1.3,
        y: -50,
        transition: {
            delay: 0.5,
            duration: 0.3,
            type: "tween",
        }
    },
}

const infoVariants = {
    hover: {
        opacity: 1,
        transition: {
            delay: 0.5,
            duaration: 0.1,
            type: "tween",
        },
    },
};

const offset = 6;

function HomeSlider(data: any) {
    const history = useHistory();
    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);

    const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
    const toggleLeaving = () => setLeaving((prev) => !prev);

    const onBoxClicked = (movieId: number) => {
        history.push(`/movies/${movieId}`)
    }

    const increaseIndex = () => {
        if (data.results) {
            if (leaving) return;
            toggleLeaving();
            const totalMovies = data.results.length - 1;
            const maxIndex = Math.floor(totalMovies / offset) - 1;
            setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
        }
    };
    return (
        <>
            <Slider>
                <Button onClick={increaseIndex} >Next ▶</Button>
            </Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                <Row
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ type: "tween", duration: 1 }}
                    key={index}>
                    {data?.results ?
                        data?.results
                            .slice(1)
                            .slice(offset * index, offset * index + offset)
                            .map((movie: any) => (
                                <Box
                                    key={movie.id}
                                    layoutId={bigMovieMatch?.params.movieId}
                                    whileHover="hover"
                                    initial="normal"
                                    variants={boxVariants}
                                    onClick={() => onBoxClicked(movie.id)}
                                    transition={{ type: "tween" }}
                                    bgPhoto={makeImagePath(movie.backdrop_path, "w400")}
                                >
                                    <Info variants={infoVariants}>
                                        <h4>{movie.title}</h4>
                                    </Info>
                                </Box>
                            )) : (
                            <Box
                                key={data.id}
                                layoutId={bigMovieMatch?.params.movieId}
                                whileHover="hover"
                                initial="normal"
                                variants={boxVariants}
                                onClick={() => onBoxClicked(data.id)}
                                transition={{ type: "tween" }}
                                bgPhoto={makeImagePath(data.backdrop_path, "w500")}
                            >
                                <Info variants={infoVariants}>
                                    <h4>{data.title}</h4>
                                </Info>
                            </Box>
                        )}
                </Row>
            </AnimatePresence>
        </>
    )
}

export default HomeSlider;