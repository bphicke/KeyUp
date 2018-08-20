import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

const styles = theme => ({
  headerStyle: {
    textAlign: 'center'
  }
});

class Sort extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('inside sort component', this.props.label)
    const { classes } = this.props;
    return (
      <FormControlLabel control={
        <Radio 
          color = "default"
          value={this.props.label}
          onClick={this.props.select}
          checked={this.props.sortSelection === this.props.label}
        />
      } label={this.props.label} />
    );
  }
}

export default withStyles(styles)(Sort);