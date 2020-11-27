import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

import { Avatar, Button, Menu, MenuItem } from '@material-ui/core';
import {connect} from 'react-redux'
import { logout } from '../../store/actions/user'

import './index.css'

function Header(props) {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  function handleLogout(){
    props.onLogout();
    history.push("/");
}

  const MenuDrop = () => {
    return (
    <Menu
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClose} disabled >Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
    )

  }


  return (
    <div className="Header">
      <div className="headerSide" />
      <p className="title">Food Menu</p>
      <Button className="headerSide" aria-haspopup="true" onClick={handleClick}>
        <Avatar src="/broken-image.jpg" />
      </Button>
      <MenuDrop />

    </div>
  );
}


const mapStateToProps = ({user}) => {
  return {
      email: user.email,
      name: user.name
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(logout())
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Header);
