import axios from 'axios';

const SELECT = 'SELECT';

export const select = (tag, preference) => ({
  type: SELECT,
  tag,
  preference,
});

export default (
  state = { likes: [], dislikes: [], ignores: [], all: [] },
  action
) => {
  switch (action.type) {
    case SELECT:
      const { tag, preference } = action;
      return {
        ...state,
        [preference]: [...state[preference], tag],
        all: [...state.all, { ...tag, preference }],
      };
    default:
      return state;
  }
};
