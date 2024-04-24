import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { darken } from 'polished';
import { PropsWithChildren } from 'react';

type NavMenuItemProps = PropsWithChildren & {
  to?: string;
  onClick?: () => void;
};

const MenuItem = ({ children, to = '/', onClick }: NavMenuItemProps) => {
  return (
    <Item to={to} onClick={onClick}>
      {children}
    </Item>
  );
};

export default MenuItem;

const Item = styled(Link)`
  /* color: #f3f3f3; */
  color: var(--purple);
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  text-shadow: 2px 2px 2px rgba(255, 255, 255, 0.87);

  & + & {
    margin-left: 1rem;
  }

  &:hover {
    /* color: #f9f9f9; */
    color: ${darken(0.1, 'purple')};
  }
`;
