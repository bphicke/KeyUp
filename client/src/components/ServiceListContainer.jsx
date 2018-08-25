import React from 'react';
import { createApolloFetch } from 'apollo-fetch';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { findServices } from '../actions/action';
import { store } from '../store/index';
import Services from './Services.jsx';
import { getServicesQuery } from './graphql/graphql';

class ServiceListContainer extends React.Component {
  constructor(props) {
    super(props);
    const career_id = +props.router.match.params.id || null;
    this.fetch = createApolloFetch({ uri: '../graphql' }).bind(this);
    this.state = {
      career_id,
    };
  }
  
  componentDidMount() {
    this.getServices();
  }

  getServices = () => {
    this.fetch({
      query: getServicesQuery(this.state.career_id)
    }).then(res => {
      store.dispatch(findServices(res.data));
    });
  }
  
  render() {
    if (!this.props.services) {
      return <div>Loading...</div>
    } else {
      return <Services 
      services={this.props.services} 
      careerID={this.state.career_id}
      favorites={this.props.favorites}
      />;
    }
  }
}

const mapStateToProps = state => {
  return {
    services: state.services.services
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ findServices }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceListContainer);
