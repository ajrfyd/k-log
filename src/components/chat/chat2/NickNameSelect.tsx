import { ChangeEvent, useRef } from 'react';
import { useUserState2 } from '@/lib/hooks/useStore';
import { createNickName } from '@lib/api';
import useUser2 from '@/lib/hooks/useUser2';
import Flex from '@/components/shared/Flex';
import TextField from '@/components/shared/TextField';
import styled from 'styled-components';
import Button from '@/components/shared/Button';
// import { useDispatch } from 'react-redux';
// import { notify } from '@/store/notify/actions';

type NickNameSelectProps = {
  nickName: string;
};

const NickNameSelect = ({ nickName }: NickNameSelectProps) => {
  // const [value, setValue] = useState('');
  const { loginHandler } = useUser2();
  const { socketId } = useUserState2();
  const inputRef = useRef<HTMLInputElement>(null);

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    if (!inputRef.current) return;
    inputRef.current.value = e.target.value;
  };

  const reqNickNameHandler = async (nickName: string) => {
    try {
      const { result } = await createNickName(nickName, socketId as string);
      loginHandler({
        nickName: result.nickName,
        role: result.role,
        roomId: result.roomId,
        isLogin: true,
        id: result.id,
        socketId: socketId as string
      });
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmit = async () => {
    if (!inputRef.current) return;
    const { value } = inputRef.current;
    if (value.length === 0 || value.length >= 3) {
      reqNickNameHandler(
        value.length === 0 ? nickName : inputRef.current.value
      );
      return;
    }
    let v = value;
    if (value.length > 0 && value.length <= 2) {
      inputRef.current.value = '3자 이상 입력해 주세요.';
      setTimeout(() => (inputRef.current!.value = v), 1000);
      return;
    }
    // await reqNickNameHandler(inputRef.current.value);
  };

  return (
    <Flex
      align="center"
      justify="center"
      direction="column"
      style={{ padding: '0 .5rem', height: '100%' }}
    >
      <Title>닉 네 임</Title>
      <TextField
        label="채팅에 사용할 닉네임을 입력해 주세요."
        helpMsg="입력하지 않으면 위의 닉네임이 사용 됩니다."
        placeholder={nickName}
        // value={value}
        ref={inputRef}
        onChange={onChangeValue}
      />
      <ButtonContainer>
        <Button $full onClick={onSubmit}>
          확 인
        </Button>
      </ButtonContainer>
    </Flex>
  );
};

export default NickNameSelect;

const Title = styled.h4`
  /* margin: 3rem 0; */
`;

const ButtonContainer = styled.div`
  width: 100%;
  background-color: #eee;
  margin-top: 4rem;
`;
