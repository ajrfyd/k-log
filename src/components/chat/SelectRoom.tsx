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
  const { data, isError } = useGetRooms();
  const { data: msgs } = useGetMessagesByRoomId(roomId, !!roomId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!roomId) return;
    if (!msgs) return;
    dispatch(setMessages(msgs));
    // console.log(dm);
  }, [roomId, msgs, dispatch]);

  if (isError) return <div>Opps..</div>;
  if (!data) return;

  return (
    <OvFlex>
      {roomId === '' &&
        data.map((room) => (
          <div key={room.roomId} onClick={() => setRoomId(room.roomId)}>
            <Text text={room.roomId} color="black" />
          </div>
        ))}
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
