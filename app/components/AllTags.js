import React from 'react';
import { connect } from 'react-redux';

class AllTags extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <ul>
          {this.props.tags.map((tag) => (
            <li key={tag.id}>{tag.tag}</li>
          ))}
        </ul>
      </div>
    );
  }
}
const mapState = (state) => ({
  tags: state.tags,
});
export default connect(mapState)(AllTags);
