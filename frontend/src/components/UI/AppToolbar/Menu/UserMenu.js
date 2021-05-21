import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Avatar, IconButton, makeStyles, Menu, MenuItem} from "@material-ui/core";
import {logoutRequest} from "../../../../store/actions/usersActions";
import {apiURL} from "../../../../config";
import {Link} from "react-router-dom";

const useStyles = makeStyles(theme => ({
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4)
  }
}));

const UserMenu = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        color="inherit"
      >
        {props.user.avatar ?
          <Avatar
            src={apiURL + '/' + props.user.avatar}
            className={classes.avatar}
          />
          :
          <Avatar className={classes.avatar}/>
        }
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem disabled>{props.user.displayName}</MenuItem>
        <MenuItem component={Link} to='/cocktails/new'>Add new cocktail</MenuItem>
        {props.user && props.user.role === 'user' ? (
          <MenuItem component={Link} to='/'>All cocktails</MenuItem>
        ) : null}
        {props.user && props.user.role === 'user' ? (
          <MenuItem component={Link} to='/user-cocktails'>My cocktails</MenuItem>
        ) : null}
        <MenuItem onClick={() => dispatch(logoutRequest())}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;