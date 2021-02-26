import React from 'react';
import { connect } from 'react-redux';
import { getTags } from '../store/allTags';
import { select, removeSelection } from '../store/selections';
import { updateTags } from '../store/tags';
import { updateCocktails } from '../store/cocktails';
import { getCocktail } from '../store/singleCocktail';

class AllTags extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.toggleResults = this.toggleResults.bind(this);
  }
  async handleClick(tag) {
    try {
      switch (tag.preference) {
        case 'likes':
          this.props.makeSelection(tag, 'dislikes');
          break;
        case 'dislikes':
          this.props.removeSelection(tag);
          break;
        default:
          this.props.makeSelection(tag, 'likes');
          break;
      }
      await this.props.updateCocktails();
      await this.props.updateTags();
    } catch (err) {
      console.error(err);
    }
  }
  async toggleResults() {
    try {
      const { cocktails } = this.props;
      const count = cocktails.length;
      const id = cocktails[Math.floor(Math.random() * count)].id;
      await this.props.getCocktail(id);
      this.props.history.push('/cocktails/' + id);
    } catch (err) {
      console.error(err);
    }
  }
  render() {
    const tags = this.props.tags || [];
    const cocktails = this.props.cocktails || Array(6).fill(0);
    return (
      <div id='allTags'>
        {tags.map((tag) => (
          <div className={`tag_header ${tag.preference}`} key={tag.id}>
            <p className='tag_name' onClick={() => this.handleClick(tag)}>
              {tag.tag}
            </p>
          </div>
        ))}
        {cocktails.length < 6 && cocktails.length > 0 ? (
          <img
            src='/media/thirsty.svg'
            onClick={this.toggleResults}
            id='results'
          />
        ) : (
          ''
        )}
      </div>
    );
  }
}
const mapState = (state) => ({
  tags: state.allTags,
  selections: state.selections,
  cocktails: state.cocktails,
});
const mapDispatch = (dispatch) => ({
  getTags: () => dispatch(getTags()),
  makeSelection: (tag, preference) => dispatch(select(tag, preference)),
  removeSelection: (tag) => dispatch(removeSelection(tag)),
  updateTags: () => dispatch(updateTags()),
  updateCocktails: () => dispatch(updateCocktails()),
  getCocktail: (id) => dispatch(getCocktail(id)),
});
export default connect(mapState, mapDispatch)(AllTags);
