import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Typography,
  Toolbar,
  IconButton,
  Avatar,
  Box,
  Menu,
  MenuItem,
  Button,
  Tooltip,
  Badge,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import MenuIcon from '@mui/icons-material/Menu';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import SettingsIcon from '@mui/icons-material/Settings';

import { useLocation, useNavigate } from 'react-router-dom';

import { getUnreadNotifications } from '../../services/dashboardSlice';

const Header = ({ drawerWidth, handleDrawerToggle, handleLogOut }) => {
  const [avatarOpen, setAvatarOpen] = useState(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    getUnreadNotifications: { data: numberOfUnreadNotifications },
  } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getUnreadNotifications());
  }, [numberOfUnreadNotifications]);

  const handleAvatarOpen = (event) => {
    setAvatarOpen(event.currentTarget);
  };
  const handleAvatarClose = () => {
    setAvatarOpen(null);
  };

  const handleNavigateToProfile = () => {
    navigate('/profile');
    handleAvatarClose();
  };

  return (
    <AppBar
      position="fixed"
      color="primary"
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` }, // ml == margin left
      }}
      elevation={3}
    >
      <Toolbar sx={{}}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
          <Box>
            <Typography
              variant="body1"
              noWrap
              fontWeight={500}
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              {pathname}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex' }} justifyContent="right" alignItems="center">
            <Button
              size="small"
              variant="contained"
              onClick={() => navigate('/addTicket')}
              sx={{ color: 'white', bgcolor: 'primary.light', textTransform: 'none', mr: '5px' }}
            >
              <Typography variant="body1" noWrap>
                New Ticket
              </Typography>
            </Button>

            <IconButton sx={{ color: 'white' }} onClick={() => navigate('/notifications')}>
              <Badge color="error" badgeContent={numberOfUnreadNotifications}>
                <NotificationsRoundedIcon />
              </Badge>
            </IconButton>

            <Tooltip title="settings" disableInteractive>
              <IconButton sx={{ color: 'white' }} onClick={() => navigate('/settings')}>
                <SettingsIcon />
              </IconButton>
            </Tooltip>

            <IconButton onClick={handleAvatarOpen}>
              <Avatar />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={avatarOpen}
              open={Boolean(avatarOpen)}
              onClose={handleAvatarClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleNavigateToProfile}>My Profile</MenuItem>
              <MenuItem onClick={handleLogOut}>Logout</MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
