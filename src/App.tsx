import GlobalStyles from '@styles/global';
import Helmet from '@shared/Helmet';

const App = () => {
  return (
    <div>
      <GlobalStyles />
      <Helmet
        title="Welcome to hk's blog"
        desc="2년차 개발자의 개인 블로그입니다."
        url="/"
      />
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis,
        recusandae.
      </p>
      <p>아ㄴ녕하십니가/</p>
      <ul>
        <li>1</li>
        <li>3</li>
      </ul>
    </div>
  );
};

export default App;
