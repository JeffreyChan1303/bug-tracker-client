import React from 'react';
import { Container, Typography, Link, List, ListItem } from '@mui/material';

const AboutPage = () => (
  <Container>
    <Typography variant="h3" fontWeight={700} marginBottom={3}>
      About Me Page
    </Typography>
    <Typography variant="h5">Hello, I am Jeffrey, the creator of Juicy Bug Tracker.</Typography>
    {/* <Typography variant="h6">Created by Jeffrey Chan</Typography> */}
    <List>
      <ListItem>
        <Link target="_blank" href="https://jeffreychan1303.github.io/">
          Come check out my portfolio website
        </Link>
      </ListItem>
      <ListItem>
        <Link target="_blank" href="https://github.com/JeffreyChan1303">
          Come check out my Github
        </Link>
      </ListItem>
    </List>
  </Container>
);

export default AboutPage;
