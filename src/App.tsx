import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Helmet from '@shared/Helmet';
import BlogMain from '@pages/BlogMain';
import NotifySection from '@components/notification/NotifySection';
import NavBar from '@components/gnb/NavBar';
import NotFound from '@shared/NotFound';
import Post from '@pages/Post';
import OutletBanner from '@shared/OutletBanner';
// import { UserStateType } from './lib/types/types';

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
        {/* <Route path="/" element={<BlogMain />} /> */}
        {/* <Route path="/post/:id" element={<Post />} /> */}
        <Route path="/" element={<OutletBanner />}>
          <Route index element={<BlogMain />} />
          <Route path="/post/:id" element={<Post />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <NotifySection />
    </div>
  );
};

export default App;
