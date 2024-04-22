import styled from 'styled-components';

type NoResultProps = {
  isError?: boolean;
};

const NoResults = ({ isError }: NoResultProps) => {
  return (
    <Container>
      <p>{!isError ? 'No Results' : 'Server Closed'}</p>
    </Container>
  );
};

export default NoResults;

const Container = styled.div`
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  p {
    font-size: 5rem;
    font-weight: 700;
    color: var(--purple);
  }
`;
