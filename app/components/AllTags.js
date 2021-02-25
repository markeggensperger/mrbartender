import React from 'react';
import { connect } from 'react-redux';
import { getTags } from '../store/allTags';
import { select, removeSelection } from '../store/selections';
import { updateTags } from '../store/tags';
import { updateCocktails } from '../store/cocktails';

class AllTags extends React.Component {
  constructor(props) {
    super(props);
  }
  async handleClick(tag, preference) {
    try {
      if (tag.preference === preference) {
        this.props.removeSelection(tag);
      } else {
        this.props.makeSelection(tag, preference);
      }
      await this.props.updateCocktails();
      await this.props.updateTags();
    } catch (err) {
      console.error(err);
    }
  }
  render() {
    const tags = this.props.tags || [];
    return (
      <div id='allTags'>
        {tags.map((tag) => (
          <div className='tag_header' key={tag.id}>
            <div>
              <p className='tag_name'>{tag.tag}</p>
            </div>
            <div
              className={
                tag.preference === 'likes' ? 'thumb activeThumb' : 'thumb'
              }
            >
              <i
                className='fas fa-thumbs-up'
                onClick={() => this.handleClick(tag, 'likes')}
              />
            </div>
            <div
              className={
                tag.preference === 'dislikes' ? 'thumb activeThumb' : 'thumb'
              }
            >
              <i
                className='fas fa-thumbs-down'
                onClick={() => this.handleClick(tag, 'dislikes')}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }
}
const mapState = (state) => ({
  tags: state.allTags,
  selections: state.selections,
});
const mapDispatch = (dispatch) => ({
  getTags: () => dispatch(getTags()),
  makeSelection: (tag, preference) => dispatch(select(tag, preference)),
  removeSelection: (tag) => dispatch(removeSelection(tag)),
  updateTags: () => dispatch(updateTags()),
  updateCocktails: () => dispatch(updateCocktails()),
});
export default connect(mapState, mapDispatch)(AllTags);
