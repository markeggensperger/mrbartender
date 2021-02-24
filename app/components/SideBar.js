import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { getTag } from '../store/singleTag';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.selectTag = this.selectTag.bind(this);
  }
  async selectTag(evt) {
    try {
      const id = evt.target.id;
      await this.props.getTag(id);
      this.props.history.push('/tags/' + id);
    } catch (err) {
      console.error(err);
    }
  }
  render() {
    const count = this.props.cocktails.length || 0;
    const selectionList = this.props.selections.all || [];
    return (
      <div id='sidebar'>
        <div id='side_navigation'>
          <h3>Home</h3>
          <h3>
            <NavLink to='/'>Talk to the bartender</NavLink>
          </h3>
          <h3>
            <NavLink to='/tags'>All cocktail tags</NavLink>
          </h3>
        </div>
        <div id='side_results'>
          <h5>Found {count} cocktails</h5>
          {selectionList.map((selection) => (
            <h6 key={selection.id} className={selection.preference}>
              <a id={selection.id} onClick={this.selectTag}>
                {selection.tag} ({selection.preference})
              </a>
            </h6>
          ))}
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  selections: state.selections,
  cocktails: state.cocktails,
});
const mapDispatch = (dispatch) => ({
  getTag: (id) => dispatch(getTag(id)),
});

export default connect(mapState, mapDispatch)(Sidebar);
