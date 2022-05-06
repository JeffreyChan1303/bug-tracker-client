import React from 'react';
import { Toolbar, Divider, List, ListItem, ListItemIcon, ListItemText, Typography, Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';

import useStyles from './styles';


const Navbar = () => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false); // shows which nav item is expanded

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    
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
            <Link to="/">
                <ListItem button key={"Dashboard"} className={classes.listItem}>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
            </Link>

            <Divider />
            <Link to="/notifications">
                <ListItem button key={"Notification Inbox"}>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Notification Inbox" />
                </ListItem>
            </Link>

            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} disableGutters={true} square={true}>
                <Link to="/form">
                    <ListItem button key={"Form"}>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Form" />
                    </ListItem>
                </Link>
            </Accordion>
            {/* Nav Projects */}
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} disableGutters={true} className={classes.accordion}>
                <AccordionSummary
                    className={classes.accordionSummary}
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        Projects 
                    </Typography>
                </AccordionSummary>

                <AccordionDetails className={classes.accordionDetails} style={{ padding: "0"}}

                >
                    <Link to="/projects">
                        <ListItem button key={"All Projects"} style={{ paddingLeft: "32px" }}>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="All Projects" />
                        </ListItem>
                    </Link>
                </AccordionDetails>
            </Accordion>

            {/* Nav Tickets */}

            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} disableGutters={true}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        Tickets
                    </Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <Link to="/tickets">
                        <ListItem button key={"All Tickets"}>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="All Tickets" />
                        </ListItem>
                    </Link>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} disableGutters={true} square={true} elevation={0} >
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        Admin 
                    </Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <Link to="/user">
                        <ListItem button key={"Role"}>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Role" />
                        </ListItem>
                    </Link>
                </AccordionDetails>
            </Accordion>
        </List>


        {/* <Divider /> */}
        </div>
    )
};

export default Navbar;