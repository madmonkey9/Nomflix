import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div``;

const ImageContainer = styled.div``;

const Image = styled.div``;

const Raiting = styled.span``;

const Title = styled.span``;

const Year = styled.span``;

const Poster = ({ id, imageUrl, title, rating, year, isMovie = false }) => (
  <Link to={isMovie ? `movie/${id}` : `show/${id}`}>
    <Container>
      <ImageContainer>
        <Image bgUrl={imageUrl} />
        <Raiting>
          <span role="img" aria-label="raiting">
            ⭐
          </span>
          {rating}/10
        </Raiting>
      </ImageContainer>
      <Title>{title}</Title>
      <Year>{year}</Year>
    </Container>
  </Link>
);

Poster.propTypes = {
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number,
  year: PropTypes.string,
  isMovie: PropTypes.bool
};

export default Poster;
