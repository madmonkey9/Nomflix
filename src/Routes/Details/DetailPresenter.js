import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImdb, faYoutube } from "@fortawesome/free-brands-svg-icons";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import Poster from "../../Components/Poster";
import Section from "../../Components/Section";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const BackDrop = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: url(${props => props.bgUrl});
  background-size: cover;
  background-position: center center;
  filter: blur(2px);
  opacity: 0.5;
`;

const Content = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
`;

const Cover = styled.div`
  height: 100%;
  width: 30%;
  background: url(${props => props.bgUrl});
  background-position: center center;
  background-size: cover;
  border-radius: 4px;
`;

const Data = styled.div`
  height: 100%;
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
  margin-bottom: 20px;
`;

const ItemContainer = styled.div`
  margin: 20px 0px;
  width: 50%;
`;

const Item = styled.span``;
// height: 1em;

const Divider = styled.span`
  margin: 0px 10px;
`;

const IMDB = styled.a`
  font-size: 16px;
  color: #e8b708;
`;
const Youtube = styled.a`
  font-size: 16px;
  color: #ff0000;
`;

const Overview = styled.p`
  font-size: 11px;
  opacity: 0.7;
  width: 50%;
  line-height: 1.5;
`;

const CompanyTab = styled.div`
  margin-top: 30px;
  background-color: #898989;
  width: 50%;
  height: 1fr;
  opacity: 0.7;
  border-radius: 6px;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
  grid-gap: 30px;
  position: relative;
  padding-left: 20px;
  padding-top: 50px;
`;
const SeriesTab = styled.div`
  margin-top: 30px;
  background-color: #898989;
  width: 50%;
  height: 1fr;
  opacity: 0.7;
  border-radius: 6px;
  align-items: center;
  /* display: grid; */
  /* grid-template-columns: repeat(auto-fill, 100px); */
  /* grid-gap: 30px; */
  position: relative;
  padding-left: 20px;
  padding-top: 50px;
`;

const Text = styled.div`
  position: absolute;
  top: 10px;
  left: 20px;
  font-size: 15px;
  font-weight: 600;
  opacity: 0.8;
`;

const Company = styled.div`
  position: relative;
  margin: 0px;
  background: url(${props => props.bgUrl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  height: 200px;
  width: 100%;
  justify-content: center;
  display: flex;
`;

const CompanyName = styled.div`
  align-self: flex-end;
`;

const DetailPresenter = ({ result, error, loading }) =>
  loading ? (
    <>
      <Loader />

      <Helmet>
        <title>Loading | Nomflix</title>
      </Helmet>
    </>
  ) : error ? (
    <Message />
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Nomflix
        </title>
      </Helmet>
      <BackDrop
        bgUrl={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgUrl={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../Assets/no-image.png")
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date
                ? result.first_air_date.substring(0, 4)
                : "Date : ???"}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime
                ? result.runtime
                : result.episode_run_time
                ? result.episode_run_time[0]
                : "???"}{" "}
              min
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres.length !== 0
                ? result.genres.map((genre, index) =>
                    index === result.genres.length - 1
                      ? genre.name
                      : `${genre.name} / `
                  )
                : "Genre : ???"}
            </Item>
            <Item>
              {result.imdb_id ? (
                <>
                  <Divider>•</Divider>
                  <IMDB href={`https://www.imdb.com/title/${result.imdb_id}/`}>
                    <FontAwesomeIcon icon={faImdb} />
                  </IMDB>
                </>
              ) : (
                ""
              )}
            </Item>
            <Item>
              {result.videos.results &&
                result.videos.results.length > 0 &&
                result.videos.results.map(video => (
                  <>
                    <Divider>•</Divider>
                    <Youtube
                      href={`https://www.youtube.com/watch?v=${video.key}/`}
                    >
                      <FontAwesomeIcon icon={faYoutube} />
                    </Youtube>
                  </>
                ))}
            </Item>
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          <CompanyTab>
            <Text>Production Companies</Text>
            {result.production_companies &&
              result.production_companies.map(company =>
                company.logo_path ? (
                  <Company
                    bgUrl={`https://image.tmdb.org/t/p/w500/${
                      company.logo_path
                    }`}
                    key={company.id}
                  />
                ) : (
                  <Company bgUrl={""} key={company.id}>
                    <CompanyName>
                      {company.name.length > 15
                        ? `${company.name.substring(0, 15)}...`
                        : company.name}
                    </CompanyName>
                  </Company>
                )
              )}
          </CompanyTab>
          {result.belongs_to_collection || result.seasons ? (
            <SeriesTab>
              <Text>Series</Text>
              {result.belongs_to_collection && result.belongs_to_collection ? (
                <Section>
                  <Poster
                    key={result.belongs_to_collection.id}
                    id={result.belongs_to_collection.id}
                    title={result.belongs_to_collection.name}
                    imageUrl={result.belongs_to_collection.poster_path}
                    isMovie={true}
                  />
                </Section>
              ) : (
                result.seasons && (
                  <Section>
                    {result.seasons.map(seasons => (
                      <Poster
                        key={seasons.id}
                        id={seasons.id}
                        title={seasons.name}
                        imageUrl={seasons.poster_path}
                      />
                    ))}
                  </Section>
                )
              )}
            </SeriesTab>
          ) : (
            ""
          )}
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired
};

export default DetailPresenter;
