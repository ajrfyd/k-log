import { Helmet } from 'react-helmet-async';

type SeoProps = {
  title: string;
  site_name?: string;
  desc: string;
  name?: string;
  url: string;
  imgUrl?: string;
  keyword?: string;
};

const Seo = ({
  title,
  desc,
  url,
  site_name = 'klog',
  imgUrl,
  keyword = ''
}: SeoProps) => {
  const rootUrl = import.meta.env.VITE_SEO_URL;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <meta
        name="keyword"
        content={`klog, blog, hkound${keyword ? ', ' + keyword : ''}`}
      />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content={site_name} />
      <meta property="og:title" content={title} />
      <meta
        property="og:url"
        content={url === '/' ? rootUrl : rootUrl + `${url}`}
      />
      <meta property="og:description" content={desc} />
      <meta
        property="og:image"
        content={imgUrl ? imgUrl : import.meta.env.VITE_SEO_URL}
      />
      <meta property="og:image:width" content="560" />
      <meta property="og:image:height" content="300" />
      <link rel="canonical" href={url === '/' ? rootUrl : rootUrl + `${url}`} />
    </Helmet>
  );
};

export default Seo;
