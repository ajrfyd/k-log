import { Route, Routes } from 'react-router-dom';
import GlobalStyles from '@styles/global';
import Helmet from '@shared/Helmet';
import BlogMain from './pages/BlogMain';
import NotifySection from './components/notification/NotifySection';
import NavBar from './components/gnb/NavBar';
import { useEffect, useState } from 'react';
import { UserStateType } from './lib/types/types';
import styled from 'styled-components';

const App = () => {
  // const [user, setUser] = useState();
  const logInHandler = () =>
    (location.href = `https://github.com/login/oauth/authorize?client_id=${
      import.meta.env.VITE_GH_ID
    }`);

  const logOutHandler = () => {
    localStorage.setItem('userState', 'null');
    // setUser(null);
  };

  useEffect(() => {
    const localUser = localStorage.getItem('userState');
    if (!localUser) localStorage.setItem('userState', JSON.stringify(null));
  }, []);

  return (
    <div>
      <GlobalStyles />
      <Helmet
        title="Welcome to hk's blog"
        desc="2년차 개발자의 개인 블로그입니다."
        url="/"
      />
      <NavBar
        logInHandler={logInHandler}
        logOutHandler={logOutHandler}
        // user={user}
      />
      <Routes>
        <Route path="/" element={<BlogMain />} />
      </Routes>
      <NotifySection />
    </div>
  );
};

export default App;
