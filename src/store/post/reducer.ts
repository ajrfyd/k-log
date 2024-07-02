import { InitialState, ActionType } from './type';

const initialState: InitialState = {
  posts: [],
  tags: []
};

const postReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case 'post_SET_ALL':
      return {
        ...state,
        posts: action.payload.posts,
        tags: action.payload.tags
      };
    case 'post_GET_TAGS':
      return state.tags;
    case 'post_SET_TAGS':
      return {
        ...state,
        tags: action.payload
      };
    default:
      return state;
  }
};

export default postReducer;
