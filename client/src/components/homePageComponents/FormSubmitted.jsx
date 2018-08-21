import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
class FormSubmitted extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {    
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Message Sent"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            One of our KeyUp Guides will get back to you within 24 hours
            </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose} color="primary" autoFocus>
            Okay
            </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default FormSubmitted;
