import { Suspense, useEffect, useRef } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import Banner from './Banner';
import { ServerDefaultResponseType, PostType } from '@/lib/api/types';

const OutletBanner = () => {
  const { pathname, state } = useLocation();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const clientQuery = useQueryClient();

  useEffect(() => {
    if (!titleRef.current) return;
    const timeOut = setTimeout(() => {
      const [cache] = clientQuery.getQueriesData({
        queryKey: ['GetPostById']
      });
      const { result } = cache[1] as ServerDefaultResponseType<PostType>;
      titleRef.current!.innerText = result.title;
    }, 200);

    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  return (
    <Section>
      <Banner
        title={pathname === '/' ? "hk's Blog" : state ? state.title : ''}
        $shadow={pathname === '/'}
        subTitle={pathname === '/' ? 'Welcome my Blog 👍' : ''}
        ref={titleRef}
      />
      <Suspense fallback={<Loading>Loading...</Loading>}>
        <Outlet />
      </Suspense>
    </Section>
  );
};

export default OutletBanner;

const Section = styled.section``;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  /* margin: 0 auto; */
  font-size: 4rem;
  font-weight: bold;
  padding: 2rem 1rem;
  margin-top: 2rem;
`;
