import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGetRooms, useGetMessagesByRoomId } from '@/lib/api/useQueries';
import { useDispatch } from 'react-redux';
import { setMessages } from '@/store/chat/action';
import ChatBody from './ChatBody';
import Flex from '../shared/Flex';
import Text from '../shared/Text';

const SelectRoom = () => {
  const [roomId, setRoomId] = useState('');
  const { data: rooms, isError } = useGetRooms();
  const { data: msgs } = useGetMessagesByRoomId(roomId, !!roomId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!roomId) return;
    if (!msgs) return;
    dispatch(setMessages(msgs));
  }, [roomId, msgs, dispatch]);

  if (isError) return <div>Opps..</div>;
  if (!rooms) return;

  // console.log('select Rooom');
  return (
    <OvFlex>
      {roomId === '' && (
        <ListRoomSection>
          {rooms.map((room) => (
            <ListItem onClick={() => setRoomId(room.roomId)} key={room.roomId}>
              <Text
                text={room.nickName}
                color="black"
                onClick={() => setRoomId(room.roomId)}
              />
            </ListItem>
          ))}
        </ListRoomSection>
      )}
      {roomId && <ChatBody roomId={roomId} />}
    </OvFlex>
  );
};

export default SelectRoom;

const OvFlex = styled(Flex)`
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  display: flex;
  padding-bottom: 2px;
  /* align-items: center; */
`;

const ListRoomSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 1rem 0;
  overflow-y: scroll;

  &:hover {
    color: var(--purple);
  }
`;

const ListItem = styled.div`
  cursor: pointer;
  /* border: 1px solid red; */
  padding: 1rem 0;
  width: 100%;
`;
