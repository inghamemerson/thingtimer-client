/** @jsx jsx */
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { jsx } from '@emotion/core';
import { TextField, Button, Grid } from '@material-ui/core';
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
  const [createTimer] = useMutation(CREATE_TIMER_MUTATION);

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
            Start New Timer
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default CreateTimer; 
