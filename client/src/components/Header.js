import React, { useState } from 'react';
import {
  makeStyles,
  AppBar,
  Button,
  Typography,
  IconButton,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  Drawer,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Menu as MenuIcon, AccountCircle } from '@material-ui/icons';
import { userLogout } from '../actions/userActions';
import { adminLogout } from '../actions/adminActions';
import logo from '../images/forese_logo.png';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  headerTitle: {
    flexGrow: 1,
    fontFamily: "'Andada Pro', serif",
  },
  userTitle: {
    fontFamily: "'Andada Pro', serif",
  },
  listItem: {
    fontFamily: "'Andada Pro', serif",
    fontWeight: '900',
  },
  appBar: {
    backgroundColor: '#000000',
  },
  menuButton: {
    marginLeft: 0,
    marginRight: 20,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  logo: {
    width: '80px',
    padding: '8px 0',
  },
});

const Header = () => {
  const classes = useStyles();

  const history = useHistory();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  const [state, setState] = useState({ bottom: false });
  const [anchorEl, setAnchorE1] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const toggleDrawer = (side, open) => () => {
    setState({
      [side]: open,
    });
  };

  const handleMenuClose = () => {
    setAnchorE1(null);
  };

  const handleProfileMenuOpen = (e) => {
    setAnchorE1(e.currentTarget);
  };

  const handleProfileLogout = () => {
    if (adminInfo) {
      dispatch(adminLogout());
    } else if (userInfo) {
      dispatch(userLogout());
    }
    setAnchorE1(null);
  };

  const sideVolunteerList = (
    <div>
      <List>
        <ListItem button onClick={() => history.push('/volunteer/create')}>
          <ListItemText>Create</ListItemText>
        </ListItem>
        <ListItem button onClick={() => history.push('/volunteer/profile')}>
          <ListItemText>Profile</ListItemText>
        </ListItem>
      </List>
    </div>
  );

  const sideAdminList = (
    <div>
      <List>
        <ListItem button onClick={() => history.push('/admin/profile')}>
          <ListItemText>Profile</ListItemText>
        </ListItem>
        <ListItem button onClick={() => history.push('/admin/create')}>
          <ListItemText>Create</ListItemText>
        </ListItem>
        <ListItem button onClick={() => history.push('/admin/questions')}>
          <ListItemText>Questions</ListItemText>
        </ListItem>
        <ListItem button onClick={() => history.push('/admin/leaderboard')}>
          <ListItemText>LeaderBoard</ListItemText>
        </ListItem>
      </List>
    </div>
  );

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      open={isMenuOpen}
      onClose={handleMenuClose}
      style={{ top: '2.1rem' }}
    >
      <MenuItem onClick={handleMenuClose}>
        {userInfo && userInfo.regNo}
      </MenuItem>
      <MenuItem onClick={handleProfileLogout}>Logout</MenuItem>
    </Menu>
  );

  const renderAdminMenu = (
    <Menu
      anchorEl={anchorEl}
      open={isMenuOpen}
      onClose={handleMenuClose}
      style={{ top: '2.1rem' }}
    >
      <MenuItem onClick={handleMenuClose}>
        {adminInfo && adminInfo.email}
      </MenuItem>
      <MenuItem onClick={handleProfileLogout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.root}>
      <AppBar position='static' className={classes.appBar}>
        <Toolbar>
          {(userInfo && userInfo.isVolunteer) || (adminInfo && adminInfo) ? (
            <IconButton
              className={classes.menuButton}
              color='inherit'
              aria-label='Menu'
              onClick={toggleDrawer('bottom', true)}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Typography
              className={classes.headerTitle}
              variant='h6'
              color='inherit'
            >
              <img src={logo} alt='logo' className={classes.logo} />
            </Typography>
          )}

          <Typography
            variant='h6'
            color='inherit'
            className={classes.headerTitle}
          >
            {userInfo && userInfo.isVolunteer
              ? 'Forese Volunteer'
              : adminInfo && adminInfo
              ? 'ADMIN'
              : null}
          </Typography>
          {userInfo || adminInfo ? (
            <>
              <Button className={classes.userTitle} color='inherit'>
                {(userInfo && userInfo.name) || (adminInfo && adminInfo.name)}
              </Button>
              <IconButton color='inherit' onClick={handleProfileMenuOpen}>
                <AccountCircle />
              </IconButton>
            </>
          ) : (
            ''
          )}
        </Toolbar>
        {userInfo ? renderMenu : adminInfo ? renderAdminMenu : null}
      </AppBar>
      <Drawer
        anchor='bottom'
        open={state.bottom}
        onClose={toggleDrawer('bottom', false)}
      >
        <div
          tabIndex={0}
          role='button'
          onClick={toggleDrawer('bottom', false)}
          onKeyDown={toggleDrawer('bottom', false)}
        >
          {userInfo ? sideVolunteerList : adminInfo ? sideAdminList : null}
        </div>
      </Drawer>
    </div>
  );
};

export default Header;
