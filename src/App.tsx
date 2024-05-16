import { Route, Routes } from 'react-router-dom';
import Helmet from '@shared/Helmet';
import NotifySection from '@components/notification/NotifySection';
import NavBar from '@components/gnb/NavBar';
import FullScreenMessage from '@shared/FullScreenMessage';
import ManagePost from '@pages/ManagePost';
import BlogMain from '@pages/BlogMain';
import PostDetail from '@pages/PostDetail';
import Login from '@pages/Login';
import Signup from '@pages/Signup';
import ChatView from './pages/ChatView';
import useSocket from './lib/hooks/useSocket';
// const PostDetail = lazy(() => import('@/pages/PostDetail'));
// const BlogMain = lazy(() => import('@pages/BlogMain'));

// import BlogMain from '@pages/BlogMain';
// import { UserStateType } from './lib/types/types';

const App = () => {
  // const logInHandler = () =>
  //   (location.href = `https://github.com/login/oauth/authorize?client_id=${
  //     import.meta.env.VITE_GH_ID
  //   }`);
  const { socket } = useSocket();

  return (
    <div>
      <Helmet
        title="Welcome to hk's blog"
        desc="2년차 개발자의 개인 블로그입니다."
        url="/"
      />
      <NavBar />
      <Routes>
        <Route path="/" element={<BlogMain />} />
        <Route path="/post/:id" element={<PostDetail />} />
        {/* <Route path="/" element={<OutletBanner />}>
          <Route index element={<BlogMain />} />
          <Route path="/post/:id" element={<Post />} />
        </Route> */}
        <Route path="/write" element={<ManagePost />} />
        <Route path="/write/:id" element={<ManagePost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<FullScreenMessage type="404" />} />
      </Routes>

      <NotifySection />
      {socket && <ChatView />}

      {/* <Iconbutton
        $chatBtn
        // onClick={() => (show ? dispatch(close()) : dispatch(open()))}
        onClick={() => {}}
        style={{
          display: 'none'
        }}
      >
        <ChatBalloon />
      </Iconbutton> */}
    </div>
  );
};

export default App;
