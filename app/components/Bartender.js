import React from 'react';
import { connect } from 'react-redux';
import { getCocktails, updateCocktails } from '../store/cocktails';
import { select } from '../store/selections';
import { updateTags } from '../store/tags';

class Bartender extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showResults: false };
    this.handleClick = this.handleClick.bind(this);
    this.toggleResults = this.toggleResults.bind(this);
  }
  componentDidMount() {
    this.props.getCocktails();
  }
  async handleClick(evt) {
    try {
      const preference = evt.target.name;
      const tag = this.props.tags[0];
      this.props.makeSelection(tag, preference);
      await this.props.updateCocktails();
      await this.props.updateTags();
    } catch (err) {
      console.error(err);
    }
  }
  toggleResults() {
    this.setState({ showResults: !this.state.showResults });
  }
  render() {
    const tag = this.props.tags[0] || { tag: 'Still Loading' };
    const tags = this.props.tags || Array(6);
    return (
      <div>
        <h3>
          We currently have {this.props.cocktails.length} cocktails, lets try
          narrowing it down....
        </h3>
        <br />
        <h3>How do you feel about this: {tag.tag}?</h3>
        <button
          type='button'
          name='likes'
          className='option'
          onClick={this.handleClick}
        >
          Love it!
        </button>
        <br />
        <button
          type='button'
          name='dislikes'
          className='option'
          onClick={this.handleClick}
        >
          Not today!
        </button>
        <br />
        <button
          type='button'
          name='ignores'
          className='option'
          onClick={this.handleClick}
        >
          Dont care
        </button>
        <br />
        {tags.length < 5 ? (
          <button type='button' onClick={this.toggleResults}>
            Show me my cocktails
          </button>
        ) : (
          ''
        )}
        <ul>
          {this.state.showResults
            ? this.props.cocktails.map((cocktail) => (
                <li key={cocktail.id}>{cocktail.name}</li>
              ))
            : ''}
        </ul>
      </div>
    );
  }
}

const mapState = (state) => ({
  selections: state.selections,
  cocktails: state.cocktails,
  tags: state.tags,
});

const mapDispatch = (dispatch) => ({
  makeSelection: (tag, preference) => dispatch(select(tag, preference)),
  updateTags: () => dispatch(updateTags()),
  getCocktails: () => dispatch(getCocktails()),
  updateCocktails: () => dispatch(updateCocktails()),
});

export default connect(mapState, mapDispatch)(Bartender);
