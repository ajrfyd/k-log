import styled from 'styled-components';
import useChat2 from '@/lib/hooks/useChat2';
import useGetRooms from '@/lib/queries/useGetRooms';
import Flex from '@shared/Flex';
import Text from '@shared/Text';

type SelectRoomProps = {
  roomSelectHandler: () => void;
};

const SelectRoom = ({ roomSelectHandler }: SelectRoomProps) => {
  const { data: rooms, isError } = useGetRooms();
  // const { data: msgs } = useGetMessagesByRoomId(roomId, !!roomId);
  // const { data: msgs } = useGetMessagesById(roomId);
  const { setRoomHandler } = useChat2();

  const selectRoomHandler = (roomId: string) => {
    setRoomHandler(roomId);
    roomSelectHandler();
  };

  if (isError) return <div>Opps..</div>;
  if (!rooms) return;

  return (
    <OvFlex>
      <ListRoomSection>
        {rooms.map((room) => (
          <ListItem
            onClick={() => selectRoomHandler(room.roomId)}
            key={room.roomId}
          >
            <Text
              text={room.nickName}
              color="black"
              // onClick={() => selectRoomHandler(room.roomId)}
            />
          </ListItem>
        ))}
      </ListRoomSection>
    </OvFlex>
  );
};

export default SelectRoom;

const OvFlex = styled(Flex)`
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  display: flex;
  /* padding-bottom: 2px; */
  /* align-items: center; */
`;

const ListRoomSection = styled.section`
  height: 550px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 1rem 0.5rem;
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
