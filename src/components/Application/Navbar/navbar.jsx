import React from 'react';
import {
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link, useLocation } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FolderIcon from '@mui/icons-material/Folder';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import NavbarLink from './navbarLink';

const StyledAccordion = styled(Accordion)(() => ({
  '&.Mui-expanded:before': {
    opacity: '1',
    backgroundColor: '',
  },
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
  },
}));

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.common.black,
}));

const Navbar = ({ user }) => {
  const [expanded, setExpanded] = React.useState(false); // shows which nav item is expanded
  const { pathname } = useLocation();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <Toolbar>
        {/* make a logo and put it here here */}
        <Typography variant="h5">Juicy Bug Tracker</Typography>
      </Toolbar>
      <Divider sx={{ mb: '8px' }} />

      <Container>
        <Typography variant="body1" sx={{ color: 'grey.800' }}>
          welcome,
        </Typography>
        <Typography variant="body1" fontWeight={700}>
          {user.userObject.name}
        </Typography>
      </Container>

      <List>
        <Divider />

        <NavbarLink
          currentPath={pathname}
          targetPath="/dashboard"
          linkName="Dashboard"
          icon={<DashboardIcon color="primary" />}
        />

        <Divider />
        <NavbarLink
          currentPath={pathname}
          targetPath="/notifications"
          linkName="Notification Inbox"
          icon={<NotificationsIcon color="primary" />}
        />

        <Divider />

        {/* Nav Projects */}
        <StyledAccordion
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
          disableGutters
          elevation={0}
        >
          <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
            <ListItemIcon>
              <FolderIcon color="primary" />
            </ListItemIcon>
            <Typography sx={{ width: '33%', flexShrink: 0 }}>Projects</Typography>
          </StyledAccordionSummary>

          <AccordionDetails sx={{ padding: '0' }}>
            <NavbarLink
              currentPath={pathname}
              targetPath="/allProjects"
              linkName="All Projects"
              icon={<ArrowRightAltIcon color="primary" />}
            />
          </AccordionDetails>

          <AccordionDetails sx={{ padding: '0' }}>
            <NavbarLink
              currentPath={pathname}
              targetPath="/myProjects"
              linkName="My Projects"
              icon={<ArrowRightAltIcon color="primary" />}
            />
          </AccordionDetails>

          <AccordionDetails sx={{ padding: '0' }}>
            <NavbarLink
              currentPath={pathname}
              targetPath="/addProject"
              linkName="Add Project"
              icon={<ArrowRightAltIcon color="primary" />}
            />
          </AccordionDetails>

          <AccordionDetails sx={{ padding: '0' }}>
            <NavbarLink
              currentPath={pathname}
              targetPath="/projectArchive"
              linkName="Project Archive"
              icon={<ArrowRightAltIcon color="primary" />}
            />
          </AccordionDetails>
        </StyledAccordion>

        {/* Nav Tickets */}

        <StyledAccordion
          expanded={expanded === 'panel2'}
          onChange={handleChange('panel2')}
          disableGutters
          elevation={0}
        >
          <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
            <ListItemIcon>
              <ConfirmationNumberIcon color="primary" />
            </ListItemIcon>
            <Typography sx={{ width: '33%', flexShrink: 0 }}>Tickets</Typography>
          </StyledAccordionSummary>

          <AccordionDetails sx={{ padding: '0' }}>
            <NavbarLink
              currentPath={pathname}
              targetPath="/allTickets"
              linkName="All Tickets"
              icon={<ArrowRightAltIcon color="primary" />}
            />
          </AccordionDetails>

          <AccordionDetails sx={{ padding: '0' }}>
            <NavbarLink
              currentPath={pathname}
              targetPath="/myTickets"
              linkName="My Tickets"
              icon={<ArrowRightAltIcon color="primary" />}
            />
          </AccordionDetails>

          <AccordionDetails sx={{ padding: '0' }}>
            <NavbarLink
              currentPath={pathname}
              targetPath="/unassignedTickets"
              linkName="Unassigned Tickets"
              icon={<ArrowRightAltIcon color="primary" />}
            />
          </AccordionDetails>

          <AccordionDetails sx={{ padding: '0' }}>
            <NavbarLink
              currentPath={pathname}
              targetPath="/addTicket"
              linkName="Add tickets"
              icon={<ArrowRightAltIcon color="primary" />}
            />
          </AccordionDetails>

          <AccordionDetails sx={{ padding: '0' }}>
            <NavbarLink
              currentPath={pathname}
              targetPath="/ticketArchive"
              linkName="Ticket Archive"
              icon={<ArrowRightAltIcon color="primary" />}
            />
          </AccordionDetails>
        </StyledAccordion>

        {/* Nav User */}

        <StyledAccordion
          expanded={expanded === 'panel3'}
          onChange={handleChange('panel3')}
          disableGutters
          square
          elevation={0}
        >
          <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
            <ListItemIcon>
              <ArrowRightAltIcon color="primary" />
            </ListItemIcon>
            <Typography sx={{ width: '33%', flexShrink: 0 }}>Admin</Typography>
          </StyledAccordionSummary>

          <AccordionDetails sx={{ padding: '0' }}>
            <StyledLink to="/user">
              <ListItem button key="Role" sx={{ paddingLeft: '32px' }}>
                <ListItemIcon>
                  <ArrowRightAltIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Role" />
              </ListItem>
            </StyledLink>
          </AccordionDetails>

          <AccordionDetails sx={{ padding: '0' }}>
            <StyledLink to="/user">
              <ListItem button key="Role" sx={{ paddingLeft: '32px' }}>
                <ListItemIcon>
                  <ArrowRightAltIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Role" />
              </ListItem>
            </StyledLink>
          </AccordionDetails>
        </StyledAccordion>

        <Divider />

        <NavbarLink
          currentPath={pathname}
          targetPath="/support"
          linkName="Support Ticket"
          icon={<ErrorOutlineIcon color="primary" />}
        />

        <Divider />
      </List>
    </>
  );
};

export default Navbar;
