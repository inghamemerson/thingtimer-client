/** @jsx jsx */
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { jsx } from '@emotion/core';
import { TextField, Button, Grid, Typography } from '@material-ui/core';
import * as moment from 'moment';

const CREATE_TIMER_MUTATION = gql`
  mutation createTimer($name: String!, $thingId: String! $startedAt: DateTime!) {
    createTimer(name: $name, thing_id: $thingId, started_at: $startedAt) {
      id
      name
      started_at
      ended_at
    }
  }
`;

const CreateTimer = (props) => {
  const [createTimer, { loading }] = useMutation(CREATE_TIMER_MUTATION);

  const handleSubmit = event => {
    event.preventDefault();
    const thingId = props.thing.id;
    const form = event.target;
    const formData = new window.FormData(form);
    const name = formData.get('name');
    const startedAt = moment().utc().format('YYYY-MM-DD HH:mm:ss');
    form.reset();

    createTimer({variables: { name, thingId, startedAt }});
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={6} alignItems="flex-start">
        <Grid item xs={12}>
          <TextField id="name" label="New Timer Name" name="name" variant="outlined" size="small" fullWidth required />
        </Grid>
      </Grid>
      <Grid container spacing={6} alignItems="flex-start">
        <Grid item xs={12}>
          <Button size="small" type="submit" variant="outlined" color="primary" fullWidth>
            Start Timer
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default CreateTimer; 

{/* <Paper css={{
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
</Paper> */}