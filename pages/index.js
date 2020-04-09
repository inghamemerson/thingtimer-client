// Combination of the examples:
// https://github.com/mui-org/material-ui/tree/master/examples/nextjs
// https://github.com/zeit/next.js/tree/master/examples/with-apollo

import Container from '@material-ui/core/Container';
import { withApollo } from '../lib/apollo'
import CreateThing from '../components/CreateThing';
import ListThings from '../components/ListThings';

const Index = () => (
  <Container maxWidth="md">
    <CreateThing />
    <ListThings />
  </Container>
);

export default withApollo({ ssr: true })(Index);