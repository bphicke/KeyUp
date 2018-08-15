import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import ChatIcon from '@material-ui/icons/Chat';
import InfoIcon from '@material-ui/icons/Info';
import MenuIcon from '@material-ui/icons/Menu';
import PeopleIcon from '@material-ui/icons/People';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { store } from '../store/index';
import { getPageTitle } from '../actions/action';
class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null
    };
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState( { anchorEl: null });
  };

  handleBrowseCareersClick = () => {
    this.handleClose();
    store.dispatch(getPageTitle('Career List'));
  }

  handleHomeInsidePopUpMenuClick = () => {
    this.handleClose();
    store.dispatch(getPageTitle(''));
  }

  handleKeyUpClick = () => {
    store.dispatch(getPageTitle(''));
  }

  // handleScrollClick = section => {
  //   this.handleClose();
  //   console.log('document', document)
  //   window.onload = function() {
  //   document.getElementById(section).scrollIntoView();
  //   }
  // }



  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar className={classes.tools}>
            <IconButton 
            className={classes.menuButton} 
            color="inherit" 
            aria-label="Menu"
            aria-owns={anchorEl ? 'simple-menu' : null}
            aria-haspopup="true"
            onClick={this.handleClick}
            >
              <MenuIcon image="#"/>
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
              PopoverClasses={{paper: `${classes.menu}`}}
            >
              <MenuItem onClick={this.handleHomeInsidePopUpMenuClick}>
                <Link to="/">
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText style={{float:'right'}}inset primary="Home">
                  </ListItemText>
                </Link>
              </MenuItem>
              <MenuItem onClick={this.handleBrowseCareersClick}>
                <Link to="/careers">
                  <ListItemIcon>
                    <SearchIcon />
                  </ListItemIcon>
                  <ListItemText style={{float:'right'}}inset primary="Browse Careers">
                  </ListItemText>
                </Link>
              </MenuItem>
              <MenuItem onClick={this.handleClose}>
                <a style={{ textDecoration: 'none' }} href='https://keyup.typeform.com/to/dlfXQi'>
                  <ListItemIcon style={{ position: 'relative', top: '4px' }}>
                    <ChatIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Get Recommendations" style={{ position: 'relative', top: '-4px', display: 'inline-flex' }}>
                  </ListItemText>
                </a>
              </MenuItem>
              <MenuItem onClick={this.handleClose}>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText inset primary="About KeyUp">
                </ListItemText>
              </MenuItem>
              <MenuItem onClick={this.handleClose}>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText inset primary ="Contact KeyUp"> 
                </ListItemText>
              </MenuItem>
            </Menu>
            <Typography variant="display1" color="inherit">
              <Link to="/">
                <Button onClick={this.handleKeyUpClick} className={classes.home}>
                  <img src='https://s3.amazonaws.com/key-up-assets/KeyUp-Logo-all-white.png' height='25px'/>
                </Button>
              </Link>
            </Typography>
            <Typography variant="title" color="inherit" className={classes.flex}>
            {this.props.pages}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}


NavBar.styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1,
    textAlign: 'right'
  },
  menuButton: {
    marginLeft: -12
  },
  menu: {
    top: '0!important',
    left: '0!important',
    borderRadius: 0
  },
  tools: {
    top: 0,
    left: 0,
    borderRadius: 0,
    display: 'flex',
    backgroundColor: '2979ff'
  },
  home: {
    padding: '5px'
  }
  
};

const mapStateToProps = state => {
  return {
    pages: state.pages.page
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getPageTitle }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(NavBar.styles)(withRouter(NavBar)));
