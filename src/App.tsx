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
import useSocketT from './lib/hooks/useSocketT';
import { Suspense } from 'react';

// import { useEffect } from 'react';
// import useGetPostsData from './lib/queries/useGetPosts';
// import useGetPost from './lib/queries/useGetPost';

// const PostDetail = lazy(() => import('@/pages/PostDetail'));
// const BlogMain = lazy(() => import('@pages/BlogMain'));

// import BlogMain from '@pages/BlogMain';
// import { UserStateType } from './lib/types/types';

const App = () => {
  useSocket();

  useSocketT();

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

      <ChatView />
      <NotifySection />
    </div>
  );
};

export default App;
