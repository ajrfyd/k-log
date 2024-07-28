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
// import ChatView from './pages/ChatView';
import { useChatTState } from './lib/hooks/useStore';
import { Suspense, useEffect } from 'react';
import ChatButton from '@components/chat/ChatButton';
import { useDispatch } from 'react-redux';
import { initSocket, socketDisconnect } from './store/socket/action';
import { close, open } from './store/chatt/action';
// import useUser2 from './lib/hooks/useUser2';
// import { useUserState2 } from './lib/hooks/useStore';
// import { useEffect } from 'react';
// import useGetPostsData from './lib/queries/useGetPosts';
// import useGetPost from './lib/queries/useGetPost';

// const PostDetail = lazy(() => import('@/pages/PostDetail'));
// const BlogMain = lazy(() => import('@pages/BlogMain'));

// import BlogMain from '@pages/BlogMain';
// import { UserStateType } from './lib/types/types';
import ChatView2 from './pages/chatView2';

const App = () => {
  const { show } = useChatTState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initSocket());

    return () => {
      dispatch(socketDisconnect());
    };
  }, [dispatch]);

  return (
    <div>
      <Helmet
        title="Welcome to hk's blog"
        desc="2년차 개발자의 개인 블로그입니다."
        url="/"
        keywords="klog, blog, tech, list, posts, 포스트 목록, react, 개발, 블로그"
      />
      <NavBar />

      <Routes>
        <Route path="/" element={<BlogMain />} />
        <Route
          path="/post/:id"
          element={
            <Suspense fallback={<FullScreenMessage type="info" />}>
              <PostDetail />
            </Suspense>
          }
        />

        <Route path="/write" element={<ManagePost />} />
        <Route path="/write/:id" element={<ManagePost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<FullScreenMessage title="404 NotFound!" />} />
      </Routes>

      {/* <ChatView /> */}
      <ChatButton
        onClick={() => (show ? dispatch(close()) : dispatch(open()))}
      />
      {show && <ChatView2 show={show} />}
      {/* <ChatView2 show={show} /> */}
      <NotifySection />
    </div>
  );
};

export default App;
