import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Logo from './Logo';
import MenuItem from './MenuItem';
import Iconbutton from '@shared/IconBotton';
import { UnplugIcon, GithubIcon } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { notify } from '@/store/notify/actions';
import { UserStateType } from '@/lib/types/types';

type NavBarProps = {
  logInHandler: () => void;
  logOutHandler: () => void;
  user?: UserStateType;
};

const NavBar = ({ logInHandler, logOutHandler, user }: NavBarProps) => {
  const dispatch = useDispatch();

  return (
    <NavContainer>
      <Container>
        <Logo />
        <Navbar.Toggle aria-controls={'offcanvasNavbar-expand}'} />
        <Navbar.Offcanvas
          id={'offcanvasNavbar-expand}'}
          aria-labelledby={'offcanvasNavbarLabel-expand}'}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={'offcanvasNavbarLabel-expand-}'}>
              klog
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              {/* <Nav.Link href="#action1">Posts</Nav.Link> */}
              <MenuItem
                to="/"
                onClick={() =>
                  dispatch(notify('블로그 페이지 입니다.', 'info'))
                }
              >
                Posts
              </MenuItem>

              <BtnContainer>
                <Iconbutton>
                  {user ? (
                    <UnplugIcon onClick={logOutHandler} />
                  ) : (
                    <GithubIcon onClick={logInHandler} />
                  )}
                </Iconbutton>
              </BtnContainer>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </NavContainer>
  );
};

export default NavBar;

const NavContainer = styled(Navbar)`
  background: var(--brown);
`;

const BtnContainer = styled.div`
  margin: 0 1rem;
`;
