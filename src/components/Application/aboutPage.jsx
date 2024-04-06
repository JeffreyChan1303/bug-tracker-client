import React from 'react';
import { Container, Typography, Link, List, ListItem } from '@mui/material';

const AboutPage = () => (
  <Container>
    <Typography variant='h3' fontWeight={700} marginBottom={2}>
      About Me Page
    </Typography>
    <Typography variant='h5'>Hello, I am Jeffrey, the creator of this application.</Typography>

    <List>
      <ListItem>
        <Link target='_blank' href='https://jeffreychan.dev/'>
          Come check out my portfolio website
        </Link>
      </ListItem>
      <ListItem>
        <Link target='_blank' href='https://github.com/JeffreyChan1303'>
          Come check out my Github
        </Link>
      </ListItem>
    </List>
  </Container>
);

export default AboutPage;
