/* eslint-disable jsx-quotes */
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { getTags } from '../store/tags';
import Sidebar from './SideBar';
import AllTags from './AllTags';
import Bartender from './Bartender';

class Routes extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getTags();
  }
  render() {
    return (
      <Router>
        <div id='main' className='container'>
          <Sidebar />
          <div>
            {/* <Navbar /> */}
            <Switch>
              <Route path='/' component={Bartender} />
              <Route path='/tags' component={AllTags} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    getTags: () => dispatch(getTags()),
  };
};

export default connect(null, mapDispatch)(Routes);
