import {
  ChangeEvent,
  useState,
  useCallback,
  FormEvent,
  useEffect
} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { v4 } from 'uuid';
import { useReqSavedTagDatas } from '@/lib/api/useQueries';
import { ServerTagType } from '@/lib/api/types';
import { useDispatch } from 'react-redux';
import { notify } from '@/store/notify/actions';
import { useMutatePost } from '@/lib/api/useMutation';
import Input from '@shared/Input';
import Flex from '@shared/Flex';
import CreatableSelect from 'react-select/creatable';
import MDEditor from '@uiw/react-md-editor';
import Button from '@shared/Button';
import Spacing from '@shared/Spacing';
import { useParams } from 'react-router-dom';

type MdChangeType = (
  value?: string,
  e?: React.ChangeEvent<HTMLTextAreaElement>
) => void;

type PostType = {
  title: string;
  body: string;
  localTags: ServerTagType[];
};

const Post = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const [postData, setPostData] = useState<PostType>({
    title: '',
    body: '',
    localTags: []
  });
  const { tagList } = useReqSavedTagDatas();
  const { mutate } = useMutatePost(
    {
      title: postData.title,
      body: postData.body,
      tags: postData.localTags
    },
    (id) => navigate(`/post/${id}`, { replace: true }),
    (error) => {
      dispatch(notify(error.message));
    },
    !!id,
    id || ''
  );

  const onChangeBody = useCallback<MdChangeType>(
    (value) => setPostData((prev) => ({ ...prev, body: value as string })),
    [postData.body]
  );

  const onSubmitHandler = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { title, body } = postData;
      if (title === '' || body === '')
        return dispatch(notify('타이틀이랑 본문은 입력해야해요!'));

      mutate();
    },
    [postData, id]
  );

  useEffect(() => {
    if (!id) return;
    if (id && state && state.id) {
      setPostData((prev) => ({
        ...prev,
        title: state.title,
        body: state.body,
        localTags: [...prev.localTags, ...state.tags]
      }));
    }
  }, [id, state]);

  return (
    <form onSubmit={onSubmitHandler}>
      <Flex
        style={{
          margin: '1rem 0',
          gap: '1rem'
        }}
      >
        <Input
          placeholder={id ? '' : '제목을 입력해 주세요.'}
          style={{ flex: 2 }}
          value={postData.title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPostData((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <div style={{ flex: 1 }}>
          <CreatableSelect
            styles={{
              control: (base, _) => {
                return {
                  ...base,
                  height: '3rem'
                  // flex: '1 1 0%'
                  // width: '100%'
                };
              }
            }}
            isMulti
            options={
              tagList
                ? tagList.map((tag) => ({
                    label: tag.label,
                    value: tag.id
                  }))
                : [{ label: 'Loading...', value: 'loading...' }]
            }
            onCreateOption={(label) => {
              const newTag = { id: v4(), label };
              // setPostData(prev => [newTag,...prev]);
              setPostData((prev) => ({
                ...prev,
                localTags: [newTag, ...prev.localTags]
              }));
              // setPost(prev => ({...prev, tags: [newTag, ...prev.tags] }))
            }}
            value={postData.localTags.map((tag) => ({
              label: tag.label,
              value: tag.id
            }))}
            onChange={(_, action) => {
              //* tags: 선택한 모든 값이 배열로 들어옴
              //* action: select시 action.action === 'select-option'
              //* delete시 action.action === 'remove-value'
              //* clear시 action.action === 'clear'
              //* onChang로 들어오는 값은 단일 값이 아닌 MultiValue이다
              //* 반복문이 필요하다
              if (!action) return;
              const { action: choice } = action;

              if (choice === 'clear')
                return setPostData((prev) => ({ ...prev, localTags: [] }));
              // if(choice === "remove-value") return setPostData(prev => prev.filter(tag => action.removedValue.value !== tag.id));
              if (choice === 'remove-value')
                return setPostData((prev) => ({
                  ...prev,
                  localTags: prev.localTags.filter(
                    (tag) => action.removedValue.value !== tag.id
                  )
                }));

              if (choice === 'select-option') {
                const { option } = action;
                if (!option) return;
                option.label && option.label === 'All'
                  ? dispatch(notify('이 태그는 선택할 수 없습니다.'))
                  : setPostData((prev) => ({
                      ...prev,
                      localTags: [
                        ...prev.localTags,
                        { id: option.value, label: option.label }
                      ]
                    }));
              }
            }}
          />
        </div>
      </Flex>
      <MDEditor
        height={460}
        data-color-mode="light"
        value={postData.body}
        onChange={onChangeBody}
      />
      <Spacing size={16} />
      <Flex justify="flex-end">
        <Button size="medium" type="submit">
          {id ? '수 정' : '등 록'}
        </Button>
      </Flex>
    </form>
  );
};

export default Post;
