import axios from 'axios';

const LIKE_TAG = 'LIKE_TAG';
const DISLIKE_TAG = 'DISLIKE_TAG';
const IGNORE_TAG = 'IGNORE_TAG';

const likeTag = (tag) => ({
  type: LIKE_TAG,
  tag,
});

const dislikeTag = (tag) => ({
  type: DISLIKE_TAG,
  tag,
});

const ignoreTag = (tag) => ({
  type: IGNORE_TAG,
  tag,
});

export const getTags = () => {
  return async (dispatch) => {
    try {
      const { data } = axios.get('/api/tags/');
      dispatch(setTags(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export default (state = { likes: [], dislikes: [], ignores: [] }, action) => {
  switch (action.type) {
    case LIKE_TAG:
      return { ...state, likes: [...state.likes, action.tag] };
    case DISLIKE_TAG:
      return { ...state, dislikes: [...state.dislikes, action.tag] };
    case IGNORE_TAG:
      return { ...state, ignores: [...state.ignores, action.tag] };
    default:
      return state;
  }
};
