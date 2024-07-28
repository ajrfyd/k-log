import Flex from '@shared/Flex';
import Button from '@shared/Button';
import { type Menu } from '@/pages/chatView2';
import { type UserRole } from '@/store/userr/types';
// import { useDispatch } from 'react-redux';
// import { showHome, showRoom } from '@store/chat/action';
// import { useUserState } from '@lib/hooks/useStore';
// import { setMessages } from '@store/chat/action';
// import useChat from '@lib/hooks/useChat';

type NavProps = {
  menu: Menu;
  role: UserRole;
  selectHomeHandler: () => void;
  selectRoomHandler: () => void;
};

const Nav = ({
  menu,
  selectHomeHandler,
  selectRoomHandler,
  role
}: NavProps) => {
  return (
    <Flex>
      <Button
        size="large"
        $weak={menu !== 'home'}
        style={{ flex: 1 }}
        onClick={selectHomeHandler}
      >
        {role === 'admin' ? 'UserList' : 'Home'}
      </Button>
      <Button
        size="large"
        $weak={menu !== 'room'}
        style={{ flex: 1 }}
        onClick={selectRoomHandler}
      >
        ChatRoom
      </Button>
    </Flex>
  );
};

export default Nav;
