import axios from 'axios';
import store from './index';

const SET_TAGS = 'SET_TAGS';
const SORT_TAGS = 'SORT_TAGS';

const setTags = (tags) => ({
  type: SET_TAGS,
  tags,
});

const popNext = () => ({
  type: popNext,
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

export const updateTags = (state) => {
  return async (dispatch) => {
    try {
      const { data } = axios.get('/api/tags/', tags);
      dispatch(setTags(data));
    } catch (err) {
      console.error(err);
    }
  };
};
export const sortTags = () => ({
  type: SORT_TAGS,
});

export default (state = [], action) => {
  switch (action.type) {
    case SET_TAGS:
      return action.tags;
    case LIKE_TAG:
      let newState = state;
      newState.pop();
      return newState;
    case DISLIKE_TAG:
      let newState = state;
      newState.pop();
      return newState;
    case IGNORE_TAG:
      let newState = state;
      newState.pop();
      return newState;
    default:
      return state;
  }
};
