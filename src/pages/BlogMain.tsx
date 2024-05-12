import { Suspense, lazy } from 'react';
import Helmet from '@shared/Helmet';
import Banner from '@shared/Banner';
import Loading from '@shared/Loading';
// import PostList from '@/components/Post/PostList';
const PostList = lazy(() => import('@components/Post/PostList'));

const BlogMain = () => {
  return (
    <main>
      <Helmet
        title="Welcome to hk's blog"
        desc="2년차 개발자의 기술 블로그 입니다."
        url="/"
        keyword="klog, blog, tech, list, posts, 포스트 목록"
      />
      {/* <Banner title="hk's Blog" subTitle="Welcome my page!" $shadow /> */}
      <Banner title="hk's Blog" subTitle="Welcome my Blog 👍" />

      <Suspense fallback={<Loading />}>
        <PostList />
      </Suspense>
    </main>
  );
};

export default BlogMain;
