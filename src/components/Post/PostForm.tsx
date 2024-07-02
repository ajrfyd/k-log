import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { notify } from '@/store/notify/actions';
import { v4 } from 'uuid';
import { type TagType } from '@/lib/types/post';
import { type ServerTagType } from '@/lib/api/types';
import { type PostStateType } from './Post';
import Flex from '@shared/Flex';
import Input from '@shared/Input';
import CreatableSelect from 'react-select/creatable';
import MDEditor from '@uiw/react-md-editor';
import Spacing from '@shared/Spacing';
import Button from '@shared/Button';
import useMutateCreatePost from '@/lib/queries/useMutateCreatePost';
import useMutateUpdatePost from '@/lib/queries/useMutateUpdatePost';
import { messages } from '@/lib/constants/messages';

type PostFormProps = {
  state?: PostStateType;
  tagList: ServerTagType[];
};

type MdChangeType = (
  value?: string,
  e?: React.ChangeEvent<HTMLTextAreaElement>
) => void;

const PostForm = ({ state, tagList }: PostFormProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [postData, setPostData] = useState<{
    title: string;
    body: string;
    localTags: TagType[];
  }>({
    title: state ? state.title : '',
    body: state ? state.body : '',
    localTags: state ? state.tags : []
  });

  const createPost = useMutateCreatePost();
  const updatePost = useMutateUpdatePost();

  const submitHandler = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!state) {
        createPost.mutate(
          {
            title: postData.title,
            body: postData.body,
            tags: postData.localTags
          },
          {
            onSuccess: (res) => {
              const { result } = res;
              navigate(`/post/${result}`, { replace: true });
            },
            onError: (e) => {
              dispatch(notify(e.message || messages.UNEXPECTED_ERROR));
              return;
            }
          }
        );
        return;
      }
      updatePost.mutate(
        {
          id: state.id,
          title: postData.title,
          body: postData.body,
          tags: postData.localTags
        },
        {
          onSuccess: (res) => {
            const { result } = res;
            navigate(`/post/${result}`, { replace: true });
          },
          onError: (e) => {
            dispatch(notify(e.message || messages.UNEXPECTED_ERROR));
            return;
          }
        }
      );
    },
    [state, postData]
  );

  const onChangeBody = useCallback<MdChangeType>(
    (value) => setPostData((prev) => ({ ...prev, body: value as string })),
    [postData.body]
  );

  useEffect(() => {
    if (state) return;
    if (postData.title !== '' || postData.body !== '') {
      setPostData({ title: '', body: '', localTags: [] });
    }
  }, [state]);

  return (
    <form action="" onSubmit={submitHandler}>
      <Flex
        style={{
          margin: '1rem 0',
          gap: '1rem'
        }}
      >
        <Input
          placeholder={state?.id ? '' : '제목을 입력해 주세요.'}
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
            closeMenuOnSelect={false}
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
          {state?.id ? '수 정' : '등 록'}
        </Button>
      </Flex>
    </form>
  );
};

export default PostForm;
