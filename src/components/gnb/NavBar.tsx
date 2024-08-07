import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Logo from './Logo';
import Iconbutton from '@shared/IconButton';
import EnterIcon from '@components/iconComponents/EnterIcon';
import LeaveIcon from '@components/iconComponents/LeaveIcon';
import { useNavigate } from 'react-router-dom';
import BookIcon from '../iconComponents/BookIcon';
import PenIcon from '../iconComponents/PenIcon';
import { useUserState2 } from '@/lib/hooks/useStore';
import { useDispatch } from 'react-redux';
import useUser2 from '@/lib/hooks/useUser2';
import { useCallback } from 'react';
import { logoutUser } from '@/lib/api/api';
import { notify } from '@/store/notify/actions';

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useUserState2();
  const { logoutHandler } = useUser2();

  const logoutHandler2 = useCallback(() => {
    logoutUser()
      .then((result) => {
        if (result.status === 200) {
          logoutHandler();
        }
      })
      .catch((e) => dispatch(notify(e.message)));
  }, []);

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
              <BtnContainer>
                {user && user.isLogin && user.role === 'admin' && (
                  // <Iconbutton onClick={() => reqUserInfo(user.token, 'check')}>
                  <Iconbutton onClick={() => navigate('/write')}>
                    <PenIcon />
                  </Iconbutton>
                )}
                {/* <Iconbutton onClick={() => navigate('/', { replace: true })}> */}
                <Iconbutton onClick={() => (window.location.href = '/')}>
                  <BookIcon />
                </Iconbutton>
                <Iconbutton
                  onClick={
                    user.isLogin ? logoutHandler2 : () => navigate('/login')
                  }
                >
                  {user && user.isLogin ? (
                    <LeaveIcon />
                  ) : (
                    <EnterIcon
                    // size={24}
                    />
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
  display: flex;
`;
