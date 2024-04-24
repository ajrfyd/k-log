import styled from 'styled-components';

const NotFound = () => {
  return (
    <Container>
      <p>404 Not Found!</p>
    </Container>
  );
};

export default NotFound;

const Container = styled.div`
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-size: 5rem;
    font-weight: 700;
    color: var(--purple);
  }
`;
