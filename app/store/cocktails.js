import axios from 'axios';

const SET_COCKTAILS = 'SET_COCKTAILS';
const LIKE_TAG = 'LIKE_TAG';
const DISLIKE_TAG = 'DISLIKE_TAG';
const IGNORE_TAG = 'IGNORE_TAG';

const setCocktails = (cocktails) => ({
  type: SET_COCKTAILS,
  cocktails,
});

export const getCocktails = () => {
  return async (dispatch) => {
    try {
      const { data } = axios.get('/api/cocktails/');
      dispatch(setTags(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case SET_COCKTAILS:
      return action.cocktails;
    case LIKE_TAG:
      return state.filter((cocktail) =>
        cocktail.tags.some((tag) => tag.tag === action.tag)
      );
    case DISLIKE_TAG:
      return state.filter((cocktail) =>
        cocktail.tags.every((tag) => tag.tag !== action.tag)
      );
    case IGNORE_TAG:
      return state;
    default:
      return state;
  }
};
