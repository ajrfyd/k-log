import { PropsWithChildren } from 'react';
import { Row } from 'react-bootstrap';

type GridItemContainerProps = PropsWithChildren & {};

const GridItemContainer = ({ children }: GridItemContainerProps) => {
  return (
    <Row sm={2} md={3} lg={4} className="g-4 my-3">
      {children}
    </Row>
  );
};

export default GridItemContainer;
