import React from 'react';
import { createApolloFetch } from 'apollo-fetch';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { findCareer } from '../actions/action';
import { store } from '../store/index';
import CareerProfile from './careerProfileComponents/CareerProfile.jsx';
import { getCareerQuery } from './graphql/graphql';
import { getPageTitle } from '../actions/action';


class CareerProfileContainer extends React.Component {
  constructor(props) {
    super(props);
    const career_id = +props.router.match.params.id || null;
    this.fetch = createApolloFetch({ uri: '../graphql' }).bind(this);
    this.state = {
      career_id
    };
  }

  componentDidMount() {
    this.fetch({
      query: getCareerQuery(this.state.career_id)
    }).then(res => {
      store.dispatch(findCareer(res.data));
      store.dispatch(getPageTitle(res.data.career.name))
    });
    this.props.getUser();
  }

  render() {
    const faves = (store.getState()).favorites.favorites;
    console.log('faves in career profile container', faves)
    console.log('props in career profile container', this.props)
    return (
      <CareerProfile 
        career={this.props.career} 
        careerID={this.state.career_id} 
        favorites={faves}
        removeFavorite={this.props.removeFavorite}
        addFavorite={this.props.addFavorite}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    career: state.career.career,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ findCareer }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CareerProfileContainer);