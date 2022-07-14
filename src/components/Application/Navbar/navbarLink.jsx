import React from 'react';
import { Link } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';

const NavbarLink = ({ currentPath, targetPath, linkName, icon }) => (
  <Link to={targetPath} style={{ textDecoration: 'none', color: 'black' }}>
    {currentPath.includes(targetPath) ? (
      <ListItem button sx={{ bgcolor: 'grey.200' }} key={linkName}>
        <ListItemIcon>
          {/* <DashboardIcon color="primary" /> */}
          {icon}
        </ListItemIcon>
        <ListItemText primary={linkName} />
      </ListItem>
    ) : (
      <ListItem button key={linkName}>
        <ListItemIcon>
          {/* <DashboardIcon color="primary" /> */}
          {icon}
        </ListItemIcon>
        <ListItemText primary={linkName} />
      </ListItem>
    )}
  </Link>
);

export default NavbarLink;
