import { NavbarBrand } from 'react-bootstrap';
import styled from 'styled-components';

const Logo = () => <LogoComponent href="/">Klog</LogoComponent>;

export default Logo;

const LogoComponent = styled(NavbarBrand)`
  font-weight: 700;
  font-size: 2.5rem;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4);

  color: var(--white);
`;
