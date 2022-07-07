import React from 'react';
import { Toolbar, Divider, List, ListItem, ListItemIcon, ListItemText, Typography, Accordion, AccordionDetails, AccordionSummary, Box, Container } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';

import { styled } from '@mui/system';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FolderIcon from '@mui/icons-material/Folder';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const StyledAccordion = styled(Accordion)(({ theme }) => ({
    "&.Mui-expanded:before": {
        opacity: '1',
        backgroundColor: '',
    },
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
    "&:hover": {
        backgroundColor: theme.palette.grey[100],
    }
}));

const StyledLink = styled(Link)(({ theme }) => ({
    textDecoration: "none",
    color: theme.palette.common.black,
}));

const Navbar = ({ user }) => {
    const [expanded, setExpanded] = React.useState(false); // shows which nav item is expanded

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    
    return ( 
        <>
            <Toolbar >
                {/* make a logo and put it here here */}
                <Typography variant="h5">Juicy Bug Tracker</Typography>
            </Toolbar>
            <Divider sx={{ mb: "8px" }}/>

            <Container >
                <Typography variant="body1" sx={{ color: 'grey.800' }}>
                    welcome,
                </Typography>
                <Typography variant="body1" fontWeight={700} >
                    {user.userObject.name}
                </Typography>
            </Container>

            <List>
                <Divider />
                <StyledLink to="/dashboard">
                    <ListItem button key={"Dashboard"} >
                        <ListItemIcon>
                            <DashboardIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                </StyledLink>

                <Divider />
                <StyledLink to="/notifications">
                    <ListItem button key={"Notification Inbox"}>
                        <ListItemIcon>
                            <NotificationsIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Notification Inbox" />
                    </ListItem>
                </StyledLink>

                <Divider />

                {/* Nav Projects */}
                <StyledAccordion 
                    expanded={expanded === 'panel1'} 
                    onChange={handleChange('panel1')} 
                    disableGutters={true}
                    elevation={0}
                >
                    <StyledAccordionSummary expandIcon={<ExpandMoreIcon />} >
                        <ListItemIcon>
                            <FolderIcon color="primary" />
                        </ListItemIcon>
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            Projects 
                        </Typography>
                    </StyledAccordionSummary>

                    <AccordionDetails sx={{ padding: "0"}} >
                        <StyledLink to="/allProjects">
                            <ListItem button key={"All Projects"} sx={{ paddingLeft: "32px" }}>
                                <ListItemIcon>
                                    <ArrowRightAltIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="All Projects" />
                            </ListItem>
                        </StyledLink>
                    </AccordionDetails>

                    <AccordionDetails sx={{ padding: "0"}} >
                        <StyledLink to="/myProjects">
                            <ListItem button key={"My Projects"} sx={{ paddingLeft: "32px" }}>
                                <ListItemIcon>
                                    <ArrowRightAltIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="My Projects" />
                            </ListItem>
                        </StyledLink>
                    </AccordionDetails>

                    <AccordionDetails sx={{ padding: "0"}} >
                        <StyledLink to="/addProject">
                            <ListItem button key={"Add Project"} sx={{ paddingLeft: "32px" }}>
                                <ListItemIcon>
                                    <ArrowRightAltIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="Add Project" />
                            </ListItem>
                        </StyledLink>
                    </AccordionDetails>

                    <AccordionDetails sx={{ padding: "0"}} >
                        <StyledLink to="/projectArchive">
                            <ListItem button key={"Project Archive"} sx={{ paddingLeft: "32px" }}>
                                <ListItemIcon>
                                    <ArrowRightAltIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="Project Archive" />
                            </ListItem>
                        </StyledLink>
                    </AccordionDetails>
                </StyledAccordion>

                {/* Nav Tickets */}

                <StyledAccordion 
                    expanded={expanded === 'panel2'} 
                    onChange={handleChange('panel2')} 
                    disableGutters={true}
                    elevation={0}
                >
                    <StyledAccordionSummary expandIcon={<ExpandMoreIcon />} >
                        <ListItemIcon>
                            <ConfirmationNumberIcon color="primary" />
                        </ListItemIcon>
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            Tickets
                        </Typography>
                    </StyledAccordionSummary>

                    <AccordionDetails sx={{ padding: "0" }}>
                        <StyledLink to="/allTickets">
                            <ListItem button key={"All Tickets"} sx={{ paddingLeft: "32px" }}>
                                <ListItemIcon>
                                    <ArrowRightAltIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="All Tickets" />
                            </ListItem>
                        </StyledLink>
                    </AccordionDetails>

                    <AccordionDetails sx={{ padding: "0" }}>
                        <StyledLink to="/myTickets">
                            <ListItem button key={"My Tickets"} sx={{ paddingLeft: "32px" }}>
                                <ListItemIcon>
                                    <ArrowRightAltIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="My Tickets" />
                            </ListItem>
                        </StyledLink>
                    </AccordionDetails>

                    <AccordionDetails sx={{ padding: "0" }}>
                        <StyledLink to="/addTicket">
                            <ListItem button key={"Add Ticket"} sx={{ paddingLeft: "32px" }}>
                                <ListItemIcon>
                                    <ArrowRightAltIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="Add Ticket" />
                            </ListItem>
                        </StyledLink>
                    </AccordionDetails>

                    <AccordionDetails sx={{ padding: "0" }}>
                        <StyledLink to="/ticketArchive">
                            <ListItem button key={"Ticket Archive"} sx={{ paddingLeft: "32px" }}>
                                <ListItemIcon>
                                    <ArrowRightAltIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="Ticket Archive" />
                            </ListItem>
                        </StyledLink>
                    </AccordionDetails>

                </StyledAccordion>
                

                {/* Nav User */}

                <StyledAccordion 
                    expanded={expanded === 'panel3'} 
                    onChange={handleChange('panel3')} 
                    disableGutters={true} 
                    square={true} 
                    elevation={0} 
                >
                    <StyledAccordionSummary expandIcon={<ExpandMoreIcon />} >
                        <ListItemIcon>
                            <ArrowRightAltIcon color="primary" />
                        </ListItemIcon>
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            Admin 
                        </Typography>
                    </StyledAccordionSummary>

                    <AccordionDetails sx={{ padding: "0" }}>
                        <StyledLink to="/user">
                            <ListItem button key={"Role"} sx={{ paddingLeft: "32px" }}>
                                <ListItemIcon>
                                    <ArrowRightAltIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="Role" />
                            </ListItem>
                        </StyledLink>
                    </AccordionDetails>

                    <AccordionDetails sx={{ padding: "0" }}>
                        <StyledLink to="/user">
                            <ListItem button key={"Role"} sx={{ paddingLeft: "32px" }}>
                                <ListItemIcon>
                                    <ArrowRightAltIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="Role" />
                            </ListItem>
                        </StyledLink>
                    </AccordionDetails>
                </StyledAccordion>

                <Divider />

                <StyledLink to="/support" sx={{ justifySelf: 'flex-end' }}>
                    <ListItem button key={"Support Ticket"} >
                        <ListItemIcon>
                            <ErrorOutlineIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Support Ticket" />
                    </ListItem>
                </StyledLink>

                <Divider />
            </List>

        </>
    )
};

export default Navbar;