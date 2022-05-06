import React from 'react';
import { Toolbar, Divider, List, ListItem, ListItemIcon, ListItemText, Typography, Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';

import { styled } from '@mui/system';

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

const Navbar = () => {
    const [expanded, setExpanded] = React.useState(false); // shows which nav item is expanded

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    // 1. link url 2. link text 3. 

    
    return ( // this should be changed to navbar 
        <div>
        <Toolbar>
            <Typography variant="h5">Juicy Bug Tracker</Typography>
        </Toolbar>
        <Divider />

        <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
                <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
            </ListItem>
            ))}
        </List>




        <List>
            <Divider />
            <StyledLink to="/">
                <ListItem button key={"Dashboard"} >
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
            </StyledLink>

            <Divider />
            <StyledLink to="/notifications">
                <ListItem button key={"Notification Inbox"}>
                    <ListItemIcon>
                        <InboxIcon />
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
                        <InboxIcon />
                    </ListItemIcon>
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        Projects 
                    </Typography>
                </StyledAccordionSummary>

                <AccordionDetails sx={{ padding: "0"}} >
                    <StyledLink to="/projects">
                        <ListItem button key={"All Projects"} sx={{ paddingLeft: "32px" }}>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="All Projects" />
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
                        <InboxIcon />
                    </ListItemIcon>
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        Tickets
                    </Typography>
                </StyledAccordionSummary>

                <AccordionDetails sx={{ padding: "0" }}>
                    <StyledLink to="/tickets">
                        <ListItem button key={"All Tickets"} sx={{ paddingLeft: "32px" }}>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="All Tickets" />
                        </ListItem>
                    </StyledLink>
                </AccordionDetails>
            </StyledAccordion>

            <StyledAccordion 
                expanded={expanded === 'panel3'} 
                onChange={handleChange('panel3')} 
                disableGutters={true} 
                square={true} 
                elevation={0} 
            >
                <StyledAccordionSummary expandIcon={<ExpandMoreIcon />} >
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        Admin 
                    </Typography>
                </StyledAccordionSummary>

                <AccordionDetails sx={{ padding: "0" }}>
                    <StyledLink to="/user">
                        <ListItem button key={"Role"} sx={{ paddingLeft: "32px" }}>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Role" />
                        </ListItem>
                    </StyledLink>
                </AccordionDetails>

                <AccordionDetails sx={{ padding: "0" }}>
                    <StyledLink to="/user">
                        <ListItem button key={"Role"} sx={{ paddingLeft: "32px" }}>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Role" />
                        </ListItem>
                    </StyledLink>
                </AccordionDetails>
            </StyledAccordion>
            <Divider />
        </List>


        {/* <Divider /> */}
        </div>
    )
};

export default Navbar;