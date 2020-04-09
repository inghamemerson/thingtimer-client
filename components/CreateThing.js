/** @jsx jsx */
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { jsx } from '@emotion/core';
import { Paper, Grid, TextField, Button } from '@material-ui/core';
import { ALL_THINGS_QUERY } from './ListThings';

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

const CreateThing = () => {
  const [createThing] = useMutation(CREATE_THING_MUTATION);

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    const formData = new window.FormData(form);
    const title = formData.get('title');
    const quantity = formData.get('quantity');
    form.reset();

    createThing({
      variables: { title, quantity },
      update: (cache, { data: { createThing } }) => {
        const data = cache.readQuery({
          query: ALL_THINGS_QUERY
        });
        // Update the cache with the new thing at the top
        cache.writeQuery({
          query: ALL_THINGS_QUERY,
          data: {
            ...data,
            things: [createThing, ...data.things],
          }
        });
      },
    });
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
