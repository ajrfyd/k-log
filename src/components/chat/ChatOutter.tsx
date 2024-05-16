import Home from './Home';
import Nav from './Nav';
import Flex from '../shared/Flex';
import ChatBody from './ChatBody';
import SelectRoom from './SelectRoom';
import { useUserState } from '@/lib/hooks/useStore';

type ChatOutterProps = {
  currentPage: 'home' | 'room';
};

const ChatOutter = ({ currentPage }: ChatOutterProps) => {
  const user = useUserState();

  return (
    <Flex direction="column" style={{ height: '100%' }}>
      {currentPage === 'home' ? (
        <Home />
      ) : user.role === 'user' ? (
        <ChatBody />
      ) : (
        <SelectRoom />
      )}
      <Nav />
    </Flex>
  );
};

export default ChatOutter;
