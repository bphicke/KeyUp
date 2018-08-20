import React from 'react';
import Filter from './Filter.jsx';
import Sort from './Sort.jsx';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { store } from '../../store/index';
import { findServices } from '../../actions/action';


const styles = theme => ({
  headerStyle: {
    textAlign: 'center'
  },
  groupStyle: {
    fontSize: '12px'
  },
  formStyle: {
    padding: '10px',
    maxWidth: '400px'
  }
});

class FilterAndSortForm extends React.Component {
  constructor(props) {
    super(props);
    this.sortOptions = [
      'Affordability',
      'Shortest Training'
    ];
    this.filterOptions = [
      'Get paid to learn',
      'Can apply for federal loans'
    ];
    this.state = {
      sortSelection: 'Affordability',
      paidToLearn: false,
      freeTraining: false
    };
  }

  handlePaidClick = (e) => {
    e.preventDefault();
    this.setState({
      paidToLearn: !this.state.paidToLearn
    })
  }

  handleFreeClick = (e) => {
    e.preventDefault();
    this.setState({
      freeTraining: !this.state.freeTraining
    })
  }

  handleFormSubmission = (paidServices, loanServices, services) => {
    if (this.state.paidToLearn && !this.state.freeTraining) {
      let temp = {trainings: paidServices, career: this.props.careerName}
      store.dispatch(findServices(temp))
    } else if (this.state.freeTraining && !this.state.paidToLearn) {
      let temp = {trainings: loanServices, career: this.props.careerName}
      store.dispatch(findServices(temp))
    } else {
      let temp = {trainings: services, career: this.props.careerName}
      store.dispatch(findServices(temp))
    }
  }

  setSort = (e) => {
    this.setState({
      sortSelection: e.target.value
    }, ()=>console.log(this.state));
  }

  filterServicesByGetPaidToLearn = (services) => {
    const filteredPaidServices = [];
    if (services[0].id) {
      services.forEach(service => {
        if (service.paid_to_learn) {
          filteredPaidServices.push(service);
        }
      })
      return filteredPaidServices;
    }
  }

  filterServicesByFederalLoans = (services) => {
    const filteredLoanServices = [];
    if (services[0].id) {
      services.forEach(service => {
        if (service.federal_student_aid) {
          filteredLoanServices.push(service);
        }
      })
      return filteredLoanServices;
    }
  }

  sortByAffordability = () => {
    
  }

  render() {
    const { classes } = this.props;
    const filteredPaidServices = this.filterServicesByGetPaidToLearn(this.props.services);
    const filteredLoanServices = this.filterServicesByFederalLoans(this.props.services);
    return (
      <FormGroup className={classes.formStyle}>
        <Typography variant="headline" className={classes.headerStyle}>
          Filter and Sort Training
          <br />
        </Typography>
        <Typography className={classes.groupStyle}>
          FILTER
        </Typography>
        {this.filterOptions.map((label, index) => {
          return (<Filter 
            key={index}
            label={label}
            handlePaidClick={this.handlePaidClick}
            handleFreeClick={this.handleFreeClick}
          />
          )
        })}
        <Typography className={classes.groupStyle}>
          SORT BY
        </Typography>
        <RadioGroup name="sort">
          {this.sortOptions.map((label, index)=>{
            return (<Sort 
              key={index} 
              label={label}
              select={this.setSort}
              sortSelection={this.state.sortSelection}
            />);
          })}
        </RadioGroup>
        <Grid container>
          <Grid item xs={6}>
            <Button 
              variant="contained" 
              color="primary"
              onClick={()=>{
                this.props.hideFilter();
                this.handleFormSubmission(filteredPaidServices, filteredLoanServices, this.props.services)
              }}
            >See Training Results</Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              onClick={this.props.hideFilter}
            >CANCEL</Button>
          </Grid>
        </Grid>
      </FormGroup>
    );
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


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FilterAndSortForm));