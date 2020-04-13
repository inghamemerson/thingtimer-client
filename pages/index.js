/** @jsx jsx */
// Combination of the examples:
// https://github.com/mui-org/material-ui/tree/master/examples/nextjs
// https://github.com/zeit/next.js/tree/master/examples/with-apollo

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { jsx } from '@emotion/core';
import { withApollo } from '../lib/apollo'
import ListThings from '../components/ListThings';

const Index = () => (
  <Container maxWidth="md">
    <Typography variant="h1" component="h2" gutterBottom css={{
      textAlign: 'center',
      marginTop: '80px'
    }}>
      Thing Timer
    </Typography>
    <Typography variant="body1" gutterBottom>
      Thing Timer estimates how long some... thing will last&mdash;its lifespan. It was inspired by toilet paper calculators during the COVID-19 pandemic with the mission of making something more flexible. Thing Timer allows you to create a "thing", add an optional quantity, then you can start and end timers for said thing.
    </Typography>
    <Typography variant="body1" gutterBottom>
      The calculation uses the average of all completed timers to calculate the length of time the thing they are related to exists. If a quantity is associated with the thing, it multiplies the average lifespan by the quantity to estimate how long it will take to exhaust the thing.
    </Typography>
    <ListThings />
  </Container>
);

export default withApollo({ ssr: true })(Index);