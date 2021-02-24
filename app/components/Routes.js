/* eslint-disable jsx-quotes */
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { updateTags } from '../store/tags';
import { updateCocktails } from '../store/cocktails';
import { getAllTags } from '../store/allTags';
import Sidebar from './SideBar';
import AllTags from './AllTags';
import Bartender from './Bartender';
import Cocktail from './Cocktail';
import Tag from './Tag';

class Routes extends React.Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    try {
      await Promise.all([
        this.props.getTags(),
        this.props.getCocktails(),
        this.props.getAllTags(),
      ]);
    } catch (err) {
      console.error(err);
    }
  }
  render() {
    return (
      <Router>
        <div id='main' className='container'>
          <Route component={Sidebar} />
          <div>
            {/* <Navbar /> */}
            <Switch>
              <Route exact path='/' component={Bartender} />
              <Route exact path='/tags' component={AllTags} />
              <Route
                path='/cocktails/:id'
                render={(props) => <Cocktail {...props} />}
              />
              <Route path='/tags/:id' render={(props) => <Tag {...props} />} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    getTags: () => dispatch(updateTags()),
    getCocktails: () => dispatch(updateCocktails()),
    getAllTags: () => dispatch(getAllTags()),
  };
};

export default connect(null, mapDispatch)(Routes);
