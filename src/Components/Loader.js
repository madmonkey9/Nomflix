import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  font-size: 32px;
  margin-top: 30px;
`;

const Loader = () => (
  <Container>
    <span role="img" aria-label="Loading">
      <FontAwesomeIcon icon={faSpinner} />
    </span>
  </Container>
);

export default Loader;
