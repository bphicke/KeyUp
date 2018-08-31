import React from 'react';
import Service from './Service.jsx';
import Grid from '@material-ui/core/Grid';
import FilterAndSort from './filterSortServicesComponents/FilterAndSort.jsx';
import GoSignInDialog from './GoSignInDialog.jsx';
import { store } from '../store/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPageTitle } from '../actions/action';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@material-ui/core';


const styles = theme => ({
  background: {
    backgroundColor: '#CFCFCE',
    paddingBottom: '1px',
    borderRadius: '0'
  },

  grid: {
    margin: '8px auto',
    width: '97%'
  },

  popUpText: {
    color: '#88888A',
    textAlign: 'left'
  },

  popUpTitle: {
    padding: '20px 10px 20px 10px', 
    textAlign: 'left'
  },

  buttonStyle: {
    backgroundColor: '#4469FF',
    color: 'white',
    borderRadius: 0,
    padding: '5px 30px',
    borderRadius: '2px',
    marginBottom: '20px',
    textDecoration: 'none',
    outline: 'none'
  },

  buttons: {
    margin: '0 auto',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },

  createButtonStyle: {
    // float: 'left',
    fontWeight: 'bold',
    color: '#4469FF',
    borderRadius: '2px',
    padding: '5px 30px',
    marginBottom: '10px'
  },

  link: {
    textDecoration: 'none'
  },

  cancelButton: {
    float: 'right',
    fontWeight: 'bold',
    textAlign: 'right',
    padding: '0',
    // alignSelf: 'flex-end'
  }
});
class Services extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderPopUp: false
    };
  }

  componentDidMount() {
    store.dispatch(getPageTitle('Training List'));
  }

  handlePopUp = () => {
    this.setState({
      renderPopUp: true
    });
  }

  handleClose = () => {
    this.setState({
      renderPopUp: false
    });
  }


  render() {
    const { classes } = this.props;
    
    return (
      <div className={classes.background}>
        <FilterAndSort services={this.props.services} careerID={this.props.careerID}/>
        <Grid container className={classes.grid}>
          {this.props.services.map((service, index) => {
            return <Service 
              key={service.id || index} 
              service={service} 
              careerName={this.props.careerName} 
              favorites={this.props.favorites.favorites}
              removeFavorite={this.props.removeFavorite}
              addFavorite={this.props.addFavorite}
              handlePopUp={this.handlePopUp}
            />;
          })}
        </Grid>
        <GoSignInDialog 
          open={this.state.renderPopUp}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    pages: state.pages.page
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getPageTitle}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Services));
