/** @jsx jsx */
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import * as store from 'store';
import * as _ from 'lodash';
import { jsx } from '@emotion/core';
import { Paper, Grid, TextField, Button } from '@material-ui/core';
import { ALL_THINGS_QUERY } from './ListThings';
import { loadGetInitialProps } from 'next/dist/next-server/lib/utils';

const CREATE_THING_MUTATION = gql`
  mutation createThing($title: String!, $quantity: String) {
    createThing(title: $title, quantity: $quantity) {
      id
      uuid
      title
      quantity
      timers {
        id
        name
        started_at
        ended_at
      }
    }
  }
`;

const CreateThing = (props) => {

  const [createThing] = useMutation(CREATE_THING_MUTATION, {
    onCompleted: (data) => {
      let uuids = store.get('uuids') || [];
      let updatedCurrentUuids = _.union(uuids, [data.createThing.uuid]);
      store.set('uuids', updatedCurrentUuids);
      uuids = store.get('uuids') || [];
      props.refetch({variables: {uuids}});
    }
  });

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    const formData = new window.FormData(form);
    const title = formData.get('title');
    const quantity = formData.get('quantity');
    form.reset();

    createThing({variables: { title, quantity }});
  };

  return (
    <Paper css={{
      padding: '20px',
      marginTop: '20px'
    }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={6} alignItems="flex-end">
          <Grid item md={4} sm={6} xs={12}>
            <TextField id="title" label="Title" name="title" fullWidth autoFocus required />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <TextField id="quantity"
              label="Quantity"
              type="number"
              name="quantity"
              fullWidth
               />
          </Grid>
          <Grid item md={4} sm={12} xs={12}>
            <Button type="submit" variant="outlined" color="primary" fullWidth>
              Create thing
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default CreateThing;
