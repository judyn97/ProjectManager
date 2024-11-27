import { Link } from "react-router-dom";
import { Avatar, Menu, MenuItem } from '@mui/material';  // Import Material UI components
import { memo, useState } from 'react';
import './ProfileDropdown.css';

const UserProfileDropdown = ({ handleLogOut, memoizedUserMetadata }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getUserInitials = (firstName, lastName) => {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
  };
  return (
    <div className="user-profile-dropdown">
      
      <button className="dropdown-toggle" onClick={handleClick}>
        <Avatar className="avatar">
        {getUserInitials(
          memoizedUserMetadata?.metadata?.preferences?.firstName || 'U',  // Default to 'U'
          memoizedUserMetadata?.metadata?.preferences?.lastName || 'S'   // Default to 'S'
        )}
        </Avatar>
        <span className="user-name">  
          {memoizedUserMetadata?.metadata?.preferences?.firstName || 'User'}
        </span>
      </button>
      
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link to="/user-settings" className="dropdown-item">Profile Settings</Link>
        </MenuItem>
        <MenuItem onClick={() => { handleLogOut(); handleClose(); }}>
          <p className="dropdown-item">Log Out</p>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserProfileDropdown;
