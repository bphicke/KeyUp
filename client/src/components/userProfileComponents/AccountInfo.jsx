import React from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';

const styles = theme => ({
  background: {
    padding: '25px 15px'
  },

  section: {
    padding: '20px 15px'
  },

  item: {
    color: '88888A',
    paddingRight: '10px'
  },

  buttonSection: {
    textAlign: 'center'
  },

  button: {
    backgroundColor: '#4469FF',
    borderRadius: '0'
  },

  password: {
    textAlign: 'center',
    padding: '20px'
  }
});

class AccountInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.background}>
          <Typography variant='title'>Account Information</Typography>
          <div className={classes.section}>
            <Typography variant='body1'><span className={classes.item}>First Name:</span>{this.props.user.first_name}</Typography>
            <Typography variant='body1'><span className={classes.item}>Last Name:</span>{this.props.user.last_name}</Typography>
            <Typography variant='body1'><span className={classes.item}>Email:</span>{this.props.user.email}</Typography>
            <Typography variant='body1'><span className={classes.item}>Phone Number:</span>{this.props.user.phone_number}</Typography>
            <Typography variant='body1'><span className={classes.item}>Zip Code:</span>PLACEHOLDER</Typography>
          </div>
          <div className={classes.buttonSection}>
            <Button
              variant='contained'
              color='primary'
              className={classes.button}
            >Edit Account Info</Button>
          </div>
        </div>
        <div className={classes.background}>
          <Typography variant='title'>Password</Typography>
          <div className={classes.password}>
            <Button
              variant='contained'
              color='primary'
              className={classes.button}
            >Reset Password</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(AccountInfo);